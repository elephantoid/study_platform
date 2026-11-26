//! `study-server --healthcheck`: the container HEALTHCHECK for a shell-less (distroless) image.
//! Sends `GET /api/health` to the server in this container and maps the answer to an exit code.
//! Plain HTTP/1.0 over `std::net`, so it adds no dependencies.

use std::io::{Read, Write};
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr, SocketAddr, TcpStream};
use std::time::Duration;

/// The address the probe connects to: the configured one, or loopback when the server binds a
/// wildcard address (`0.0.0.0` in the image).
#[must_use]
pub fn target(host: IpAddr, port: u16) -> SocketAddr {
    let ip = match host {
        IpAddr::V4(a) if a.is_unspecified() => IpAddr::V4(Ipv4Addr::LOCALHOST),
        IpAddr::V6(a) if a.is_unspecified() => IpAddr::V6(Ipv6Addr::LOCALHOST),
        ip => ip,
    };
    SocketAddr::new(ip, port)
}

/// `Ok` only for a `2xx` answer from `GET /api/health`.
pub fn probe(addr: SocketAddr, timeout: Duration) -> Result<(), String> {
    let mut stream =
        TcpStream::connect_timeout(&addr, timeout).map_err(|e| format!("connect {addr}: {e}"))?;
    stream
        .set_read_timeout(Some(timeout))
        .and_then(|()| stream.set_write_timeout(Some(timeout)))
        .map_err(|e| e.to_string())?;
    stream
        .write_all(b"GET /api/health HTTP/1.0\r\nHost: localhost\r\nConnection: close\r\n\r\n")
        .map_err(|e| format!("write: {e}"))?;
    // The status line is all we need; the body is small but is not read.
    let mut buf = [0u8; 64];
    let mut len = 0;
    while len < buf.len() && !buf[..len].contains(&b'\n') {
        match stream.read(&mut buf[len..]) {
            Ok(0) => break,
            Ok(n) => len += n,
            Err(e) => return Err(format!("read: {e}")),
        }
    }
    let line = String::from_utf8_lossy(&buf[..len]);
    let line = line.lines().next().unwrap_or_default();
    match line.split_whitespace().nth(1) {
        Some(code) if line.starts_with("HTTP/") && code.starts_with('2') && code.len() == 3 => {
            Ok(())
        }
        _ => Err(format!("unhealthy: {line:?}")),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::net::TcpListener;

    /// One-shot server that answers the first connection with `response`.
    fn serve_once(response: &'static str) -> SocketAddr {
        let listener = TcpListener::bind("127.0.0.1:0").unwrap();
        let addr = listener.local_addr().unwrap();
        std::thread::spawn(move || {
            let (mut s, _) = listener.accept().unwrap();
            let mut req = [0u8; 256];
            let n = s.read(&mut req).unwrap();
            assert!(req[..n].starts_with(b"GET /api/health HTTP/1.0\r\n"));
            s.write_all(response.as_bytes()).unwrap();
        });
        addr
    }

    const T: Duration = Duration::from_secs(2);

    #[test]
    fn ok_on_200() {
        let addr = serve_once("HTTP/1.1 200 OK\r\ncontent-length: 2\r\n\r\n{}");
        assert_eq!(probe(addr, T), Ok(()));
    }

    #[test]
    fn fails_on_503() {
        let addr = serve_once("HTTP/1.1 503 Service Unavailable\r\n\r\n");
        assert!(probe(addr, T).unwrap_err().contains("503"));
    }

    #[test]
    fn fails_on_garbage() {
        let addr = serve_once("hello 200\r\n");
        assert!(probe(addr, T).is_err());
    }

    #[test]
    fn fails_when_nothing_listens() {
        let addr = TcpListener::bind("127.0.0.1:0")
            .unwrap()
            .local_addr()
            .unwrap();
        // The listener is dropped here, so the port is closed.
        assert!(probe(addr, T).unwrap_err().starts_with("connect"));
    }

    #[test]
    fn wildcard_host_probes_loopback() {
        assert_eq!(
            target(IpAddr::from([0, 0, 0, 0]), 8080),
            "127.0.0.1:8080".parse().unwrap()
        );
        assert_eq!(
            target("::".parse().unwrap(), 8080),
            "[::1]:8080".parse().unwrap()
        );
        assert_eq!(
            target(IpAddr::from([10, 0, 0, 5]), 80),
            "10.0.0.5:80".parse().unwrap()
        );
    }
}
