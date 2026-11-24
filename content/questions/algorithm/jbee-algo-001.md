---
id: jbee-algo-001
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
  model: rule-based/extract_notes@1 + claude-opus-5-5
  at: '2026-11-25'
---

## 문제

Sorting Algorithm에 대해 설명하세요.

## 해설

Sorting 알고리즘은 크게 Comparisons 방식과 Non-Comparisons 방식으로 나눌 수 있다.

### Comparisons Sorting Algorithm (비교 방식 알고리즘)

`Bubble Sort`, `Selection Sort`, `Insertion Sort`, `Merge Sort`, `Heap Sort`, `Quick Sort` 를 소개한다.

### Bubble Sort

n 개의 원소를 가진 배열을 정렬할 때, In-place sort 로 인접한 두 개의 데이터를 비교해가면서 정렬을 진행하는 방식이다. 가장 큰 값을 배열의 맨 끝에다 이동시키면서 정렬하고자 하는 원소의 개수 만큼을 두 번 반복하게 된다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/BubbleSort.java)

### Selection Sort

n 개의 원소를 가진 배열을 정렬할 때, 계속해서 바꾸는 것이 아니라 비교하고 있는 값의 index 를 저장해둔다. 그리고 최종적으로 한 번만 바꿔준다. 하지만 여러 번 비교를 하는 것은 마찬가지이다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/SelectionSort.java)

### Insertion Sort

n 개의 원소를 가진 배열을 정렬할 때, i 번째를 정렬할 순서라고 가정하면, 0 부터 i-1 까지의 원소들은 정렬되어있다는 가정하에, i 번째 원소와 i-1 번째 원소부터 0 번째 원소까지 비교하면서 i 번째 원소가 비교하는 원소보다 작으면 서로의 위치를 바꾸고 계속 앞의 원소와 비교하며, 크거나 같으면 자리를 찾은 것이므로 멈춘다. 이 과정을 정렬하려는 배열의 마지막 원소까지 반복해준다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |     O(n^2)      |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/InsertionSort.java)

### Merge Sort

기본적인 개념으로는 n 개의 원소를 가진 배열을 정렬할 때, 정렬하고자 하는 배열의 크기를 작은 단위로 나누어 정렬하고자 하는 배열의 크기를 줄이는 원리를 사용한다. `Divide and conquer`라는, "분할하여 정복한다"의 원리인 것이다. 말 그대로 복잡한 문제를 복잡하지 않은 문제로 분할하여 정복하는 방법이다. 단 분할(divide)해서 정복했으니 정복(conquer)한 후에는 **결합(combine)** 의 과정을 거쳐야 한다.

`Merge Sort`는 더이상 나누어지지 않을 때 까지 **반 씩(1/2)** 분할하다가 더 이상 나누어지지 않은 경우(원소가 하나인 배열일 때)에는 자기 자신, 즉 원소 하나를 반환한다. 원소가 하나인 경우에는 정렬할 필요가 없기 때문이다. 이 때 반환한 값끼리 **`combine`될 때, 비교가 이뤄지며,** 비교 결과를 기반으로 정렬되어 **임시 배열에 저장된다.** 그리고 이 임시 배열에 저장된 순서를 합쳐진 값으로 반환한다. 실제 정렬은 나눈 것을 병합하는 과정에서 이뤄지는 것이다.

결국 하나씩 남을 때까지 분할하는 것이면, 바로 하나씩 분할해버리면 되지 않을까? 재귀적으로 정렬하는 원리인 것이다. 재귀적 구현을 위해 1/2 씩 분할한다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(n)       |    O(nlogn)     |

### Heap Sort

`binary heap` 자료구조를 활용할 Sorting 방법에는 두 가지 방법이 존재한다. 하나는 정렬의 대상인 데이터들을 힙에 넣었다가 꺼내는 원리로 Sorting 을 하게 되는 방법이고, 나머지 하나는 기존의 배열을 `heapify`(heap 으로 만들어주는 과정)을 거쳐 꺼내는 원리로 정렬하는 방법이다. `heap`에 데이터를 저장하는 시간 복잡도는 `O(log n)`이고, 삭제 시간 복잡도 또한 `O(log n)`이 된다. 때문에 정렬하려는 대상이 n 개라면 삽입·삭제를 n 번씩 하므로 time complexity 는 `O(nlogn)`이 된다. (기존 배열을 heapify 하는 방법은 힙을 만드는 데 `O(n)`, 꺼내는 데 `O(nlogn)`이다.)

`Heap`자료구조에 대한 설명은 [DataStructure - Binary Heap](https://github.com/JaeYeopHan/Interview_Question_for_Beginner/tree/master/DataStructure#binary-heap)부분을 참고하면 된다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(1)       |    O(nlogn)     |

### Quick Sort

Sorting 기법 중 가장 빠르다고 해서 quick 이라는 이름이 붙여졌다. **하지만 Worst Case 에서는 시간복잡도가 O(n^2)가 나올 수도 있다.** 하지만 `constant factor`가 작아서 속도가 빠르다.

`Quick Sort` 역시 `Divide and Conquer` 전략을 사용하여 Sorting 이 이루어진다. Divide 과정에서 `pivot`이라는 개념이 사용된다. 입력된 배열에 대해 오름차순으로 정렬한다고 하면 이 pivot 을 기준으로 좌측은 pivot 으로 설정된 값보다 작은 값이 위치하고, 우측은 큰 값이 위치하도록 `partition`된다. 이렇게 나뉜 좌, 우측 각각의 배열을 다시 재귀적으로 Quick Sort 를 시키면 또 partition 과정이 적용된다.이 때 한 가지 주의할 점은 partition 과정에서 pivot 으로 설정된 값은 다음 재귀과정에 포함시키지 않아야 한다. 이미 partition 과정에서 정렬된 자신의 위치를 찾았기 때문이다.

#### Quick Sort's worst case

그렇다면 어떤 경우가 Worst Case 일까? Quick Sort 로 오름차순 정렬을 한다고 하자. 그렇다면 Worst Case 는 partition 과정에서 pivot value 가 항상 배열 내에서 가장 작은 값 또는 가장 큰 값으로 설정되었을 때이다. 매 partition 마다 `unbalanced partition`이 이뤄지고 이렇게 partition 이 되면 비교 횟수는 원소 n 개에 대해서 n 번, (n-1)번, (n-2)번 … 이 되므로 시간 복잡도는 **O(n^2)** 이 된다.

#### Balanced-partitioning

자연스럽게 Best-Case 는 두 개의 sub-problems 의 크기가 동일한 경우가 된다. 즉 partition 과정에서 반반씩 나뉘게 되는 경우인 것이다. 그렇다면 Partition 과정에서 pivot 을 어떻게 정할 것인가가 중요해진다. 어떻게 정하면 정확히 반반의 partition 이 아니더라도 balanced-partitioning 즉, 균형 잡힌 분할을 할 수 있을까? 배열의 맨 뒤 또는 맨 앞에 있는 원소로 설정하는가? Random 으로 설정하는 것은 어떨까? 특정 위치의 원소를 pivot 으로 설정하지 않고 배열 내의 원소 중 임의의 원소를 pivot 으로 설정하면 입력에 관계없이 일정한 수준의 성능을 얻을 수 있다. 또 악의적인 입력에 대해 성능 저하를 막을 수 있다.

#### Partitioning

정작 중요한 Partition 은 어떻게 이루어지는가에 대한 이야기를 하지 않았다. 가장 마지막 원소를 pivot 으로 설정했다고 가정하자. 이 pivot 의 값을 기준으로 좌측에는 작은 값 우측에는 큰 값이 오도록 해야 하는데, 일단 pivot 은 움직이지 말자. 첫번째 원소부터 차례로 pivot 과 비교하면서, pivot 보다 작은 값을 만나면 '작은 값들이 채워진 구간'의 바로 다음 원소와 자리를 바꾸고 그 구간을 한 칸 늘린다. 크거나 같은 값은 그대로 둔다. pivot 을 뺀 모든 원소에 대해 실행한 뒤 작은 값 구간의 바로 다음 원소와 pivot 을 바꿔준다(Lomuto 방식). 즉, 최종적으로 결정될 pivot 의 인덱스를 i, pivot 이 처음 있던 마지막 인덱스를 k 라고 했을 때, 0 부터 i-1 까지는 pivot 보다 작은 값이 될 것이고 i+1 부터 k 까지는 pivot 값보다 크거나 같은 값이 될 것이다.

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|       O(log(n))       |    O(nlogn)     |

#### [code](https://github.com/JaeYeopHan/algorithm_basic_java/blob/master/src/test/java/sort/QuickSort.java)

### non-Comparisons Sorting Algorithm

`Counting Sort`, `Radix Sort` 를 소개한다.

### Counting Sort

Count Sort 는 말 그대로 몇 개인지 개수를 세어 정렬하는 방식이다. 정렬하고자 하는 값 중 **최대값 + 1 을 size 로 하는 임시 배열** 을 만든다. 만들어진 배열의 index 중 일부는 정렬하고자 하는 값들이 되므로 그 값에는 그 값들의 **개수** 를 나타낸다. 정렬하고자 하는 값들이 몇 개씩인지 파악하는 임시 배열이 만들어졌다면 이 임시 배열을 기준으로 정렬을 한다. 그 전에 임시 배열에서 한 가지 작업을 추가적으로 수행해주어야 하는데 작은 값부터 즉 작은 index 부터 시작하여 누적된 값으로 변경해주는 것이다. 이 누적된 값은 그 값 이하인 원소의 개수, 즉 같은 값들이 놓일 마지막 자리 다음의 index 를 나타내게 된다. 입력을 뒤에서부터 읽으면서 누적된 값을 1 줄이고 그 자리에 원소를 놓으면 정렬되며 안정성도 유지된다. 점수와 같이 0~100 으로 구성되는 좁은 범위에 존재하는 데이터들을 정렬할 때 유용하게 사용할 수 있다. (k 는 값의 범위 크기)

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|     O(n + k)     |    O(n + k)     |

### Radix Sort

비교 기반 정렬의 하한은 Ω(n log n)이지만, 기수 정렬은 비교하지 않으므로 이 하한에 걸리지 않는다. 단, 한 가지 단점이 존재하는데 자릿수로 나눌 수 있는 키에만 적용할 수 있고 비용이 **데이터 길이**(자릿수)에 의존한다는 것이다. 길이가 다른 데이터도 짧은 쪽을 채우거나(숫자는 앞에 0) 길이별로 나누면 정렬할 수 있지만, 일부 데이터만 아주 길면 좋은 성능을 내기 어렵다. 문자열의 경우도 마찬가지이다.

기수(radix)란 주어진 데이터를 구성하는 기본요소를 의미한다. 이 기수를 이용해서 정렬을 진행한다. 하나의 기수마다 하나의 버킷을 생성하여, 분류를 한 뒤에, 버킷 안에서 또 정렬을 하는 방식이다.

기수 정렬은 `LSD(Least Significant Digit)` 방식과 `MSD(Most Significant Digit)` 방식 두 가지로 나뉜다. LSD 는 덜 중요한 숫자부터 정렬하는 방식으로 예를 들어 숫자를 정렬한다고 했을 때, 일의 자리부터 정렬하는 방식이다. MSD 는 중요한 숫자부터 정렬하는 방식으로 세 자리 숫자면 백의 자리부터 정렬하는 방식이다.

두 가지 방식의 Big-O 는 동일하다. 하지만 주로 기수정렬을 이야기할 때는 LSD 를 이야기한다. LSD 는 중간에 정렬 결과를 볼 수 없다. 무조건 일의 자리부터 시작해서 백의 자리까지 모두 정렬이 끝나야 결과를 확인할 수 있고, 그 때서야 결과가 나온다. 하지만 MSD 는 정렬 중간에 정렬이 될 수 있다. 그러므로 정렬하는데 걸리는 시간을 줄일 수 있다. 하지만 정렬이 완료됬는지 확인하는 과정이 필요하고 이 때문에 메모리를 더 사용하게 된다. 또 상황마다 일관적인 정렬 알고리즘을 사용하여 정렬하는데 적용할 수 없으므로 불편하다. 이러한 이유들로 기수 정렬을 논할 때는 주로 LSD 에 대해서 논한다. (d 는 자릿수, b 는 기수의 크기)

| Space Complexity | Time Complexity |
| :--------------: | :-------------: |
|     O(n + b)     |   O(d(n + b))   |

#### Sorting Algorithm's Complexity 정리

|   Algorithm    | Space Complexity | (average) Time Complexity | (worst) Time Complexity |
| :------------: | :--------------: | :-----------------------: | :---------------------: |
|  Bubble sort   |       O(1)       |          O(n^2)           |         O(n^2)          |
| Selection sort |       O(1)       |          O(n^2)           |         O(n^2)          |
| Insertion sort |       O(1)       |          O(n^2)           |         O(n^2)          |
|   Merge sort   |       O(n)       |         O(nlogn)          |        O(nlogn)         |
|   Heap sort    |       O(1)       |         O(nlogn)          |        O(nlogn)         |
|   Quick sort   |     O(log n)     |         O(nlogn)          |         O(n^2)          |
|   Count sort   |     O(n + k)     |         O(n + k)          |        O(n + k)         |
|   Radix sort   |     O(n + b)     |        O(d(n + b))        |       O(d(n + b))       |

#### 더 읽을거리

* [Sorting Algorithm 을 비판적으로 바라보자](http://asfirstalways.tistory.com/338)

---

_검수에서 원문의 오류를 바로잡았다. 원문은 위 출처에 있다._

---

### 보강

_아래는 검수에서 덧붙인 내용이며 원문에 없다._

**안정성 비교**

같은 키를 가진 원소들의 원래 순서가 정렬 뒤에도 유지되면 안정 정렬이다.

| 정렬 | 안정 | 최선 | 이유 |
| --- | :---: | --- | --- |
| Bubble | O | $O(n)$ (교환이 없으면 멈출 때) | 이웃한 두 원소가 뒤집혔을 때만 바꾼다 |
| Selection | X | $O(n^2)$ | 멀리 떨어진 원소와 바꾼다. 예: `2a 2b 1` → `1 2b 2a` |
| Insertion | O | $O(n)$ | 앞의 값이 더 클 때만 민다 |
| Merge | O | $O(n \log n)$ | 같으면 왼쪽을 먼저 꺼낸다 |
| Heap | X | $O(n \log n)$ (값이 서로 다를 때) | 루트와 맨 끝을 바꾼다 |
| Quick | X | $O(n \log n)$ | 분할에서 먼 거리를 바꾼다 |
| Counting | O | $O(n + k)$ | 뒤에서부터 읽어 마지막 자리부터 채운다 |
| Radix (LSD) | O | $O(d(n + b))$ | 자릿수별 안정 정렬을 반복한다 |

안정성이 필요한 경우: 여러 키로 나누어 차례로 정렬할 때, 동점의 순서가 재현되어야 할 때, 기수 정렬의 내부 정렬. 불안정 정렬에서도 (키, 원래 인덱스)를 비교하면 안정하게 만들 수 있지만 $O(n)$의 공간이 더 든다. 흔히 쓰는 알고리즘은 안정성, $O(1)$ 공간, 최악 $O(n \log n)$ 중 하나 이상을 포기한다(모두 만족하는 block merge sort도 있으나 구현이 복잡하다).
