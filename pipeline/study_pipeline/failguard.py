"""Stop on the second identical failure instead of retrying into a ban."""

import re
import threading

_VIDEO_ID = re.compile(r"\b[A-Za-z0-9_-]{11}\b")


class Aborted(RuntimeError):
    pass


class FailGuard:
    def __init__(self, limit: int = 2):
        self.limit = limit
        self._seen: dict[tuple[str, str], int] = {}
        self._lock = threading.Lock()

    @staticmethod
    def _key(op: str, exc: BaseException) -> tuple[str, str]:
        # The same block error hits every video; strip ids so it counts as one error.
        msg = _VIDEO_ID.sub("<id>", str(exc))[:200]
        return op, f"{type(exc).__name__}: {msg}"

    def record(self, op: str, exc: BaseException) -> None:
        key = self._key(op, exc)
        with self._lock:
            self._seen[key] = self._seen.get(key, 0) + 1
            if self._seen[key] >= self.limit:
                raise Aborted(f"{op} failed {self._seen[key]}x with the same error: {key[1]}") from exc
