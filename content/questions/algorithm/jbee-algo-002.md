---
id: jbee-algo-002
topicId: algorithm
sourceId: jbee-interview-beginner
type: concept
difficulty: intermediate
roles:
- mle
- agent
reviewTarget:
  noteId: jbee-algo-index
status: draft
generation:
  by: claude-code
  model: rule-based/extract_notes@1
  at: '2026-11-17'
---

## 문제

Prime Number Algorithm에 대해 설명하세요.

## 해설

소수란 양의 약수를 딱 두 개만 갖는 자연수를 소수라 부른다. 2, 3, 5, 7, 11, …이 그런 수들인데, 소수를 판별하는 방법으로 첫 번째로 3보다 크거나 같은 임의의 양의 정수 N이 소수인지 판별하기 위해서는 N 을 2 부터 N 보다 1 작은 수까지 나누어서 나머지가 0 인 경우가 있는지 검사하는 방법과 두 번째로 `에라토스테네스의 체`를 사용할 수 있다.  

아래 코드는 2부터 N - 1까지를 순회하며 소수인지 판별하는 코드와 2부터 √N까지 순회하며 소수인지 판별하는 코드이다.
```cpp
// Time complexity: O(N)
bool is_prime(int N) {
    if(N == 1) return false;
    for(int i = 2; i < N - 1; ++i) {
        if(N % i == 0) {
            return false;
        }
    }
    return true;
}
```

```cpp
// Time complexity: O(√N)
bool is_prime(int N) {
    if(N == 1) return false;
    for(long long i = 2; i * i <= N; ++i) { // 주의) i를 int로 선언하면 i*i를 계산할 때 overflow가 발생할 수 있다.
        if(N % i == 0) {
            return false;
        }
    }
    return true;
}
```

### 에라토스테네스의 체 [Eratosthenes’ sieve]

`에라토스테네스의 체(Eratosthenes’ sieve)`는, 임의의 자연수에 대하여, 그 자연수 이하의 `소수(prime number)`를 모두 찾아 주는 방법이다. 입자의 크기가 서로 다른 가루들을 섞어 체에 거르면 특정 크기 이하의 가루들은 다 아래로 떨어지고, 그 이상의 것들만 체 위에 남는 것처럼, 에라토스테네스의 체를 사용하면 특정 자연수 이하의 합성수는 다 지워지고 소수들만 남는 것이다. 방법은 간단하다. 만일 `100` 이하의 소수를 모두 찾고 싶다면, `1` 부터 `100` 까지의 자연수를 모두 나열한 후, 먼저 소수도 합성수도 아닌 `1`을 지우고, `2`외의 `2`의 배수들을 다 지우고, `3`외의 `3`의 배수들을 다 지우고, `5`외의 `5`의 배수들을 지우는 등의 이 과정을 의 `100`제곱근인 `10`이하의 소수들에 대해서만 반복하면, 이때 남은 수들이 구하고자 하는 소수들이다.</br>

에라토스테네스의 체를 이용하여 50 까지의 소수를 구하는 순서를 그림으로 표현하면 다음과 같다.</br>

1.  초기 상태

|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  |
| 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  | 30  |
| 31  | 32  | 33  | 34  | 35  | 36  | 37  | 38  | 39  | 40  |
| 41  | 42  | 43  | 44  | 45  | 46  | 47  | 48  | 49  | 50  |

2.  소수도 합성수도 아닌 1 제거

|  x  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  |
| 21  | 22  | 23  | 24  | 25  | 26  | 27  | 28  | 29  | 30  |
| 31  | 32  | 33  | 34  | 35  | 36  | 37  | 38  | 39  | 40  |
| 41  | 42  | 43  | 44  | 45  | 46  | 47  | 48  | 49  | 50  |

3.  2 외의 2 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  9  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  | 15  |  x  | 17  |  x  | 19  |  x  |
| 21  |  x  | 23  |  x  | 25  |  x  | 27  |  x  | 29  |  x  |
| 31  |  x  | 33  |  x  | 35  |  x  | 37  |  x  | 39  |  x  |
| 41  |  x  | 43  |  x  | 45  |  x  | 47  |  x  | 49  |  x  |

4.  3 외의 3 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  | 25  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  | 35  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  | 49  |  x  |

5.  5 외의 5 의 배수들을 제거

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  |  x  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  |  x  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  | 49  |  x  |

6.  7 외의 7 의 배수들을 제거(50 이하의 소수 판별 완료)

|  x  |  2  |  3  |  x  |  5  |  x  |  7  |  x  |  x  |  x  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| 11  |  x  | 13  |  x  |  x  |  x  | 17  |  x  | 19  |  x  |
|  x  |  x  | 23  |  x  |  x  |  x  |  x  |  x  | 29  |  x  |
| 31  |  x  |  x  |  x  |  x  |  x  | 37  |  x  |  x  |  x  |
| 41  |  x  | 43  |  x  |  x  |  x  | 47  |  x  |  x  |  x  |

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |   O(nloglogn)   |

#### [code](http://boj.kr/90930351636e46f7842b1f017eec831b)

#### Time Complexity

O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(N^3)

O(2^N) : 크기가 N 인 집합의 부분 집합

O(N!) : 크기가 N 인 순열

#### 알고리즘 문제 연습 사이트

* https://algospot.com/
* https://codeforces.com
* http://topcoder.com
* https://www.acmicpc.net/
* https://leetcode.com/problemset/algorithms/
* https://programmers.co.kr/learn/challenges
* https://www.hackerrank.com
* http://codingdojang.com/
* http://codeup.kr/JudgeOnline/index.php
* http://euler.synap.co.kr/
* http://koistudy.net
* https://www.codewars.com
* https://app.codility.com/programmers/
* http://euler.synap.co.kr/
* https://swexpertacademy.com/
* https://www.codeground.org/
* https://onlinejudge.org/

_Algorithm.end_
