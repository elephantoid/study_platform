"""Runs the Python code printed on algorithm cards that review had to fix or add."""

import random
import re
import subprocess
import sys

import pytest

from study_pipeline.config import CONTENT


def blocks(card: str) -> list[str]:
    return re.findall(r"```python\n(.*?)```", (CONTENT / "questions" / "algorithm" / f"{card}.md").read_text(), re.S)


def run(card: str, i: int = 0) -> dict:
    ns: dict = {}
    exec(compile(blocks(card)[i], card, "exec"), ns)
    return ns


SORTS = {
    "boost-algo-002": "bubbleSort", "boost-algo-003": "selectionSort", "boost-algo-004": "insertion_sort",
    "boost-algo-005": "merge_sort", "boost-algo-006": "heap_sort", "boost-algo-007": "quickSort",
    "boost-algo-008": "counting_sort", "boost-algo-009": "radix_sort",
}
NON_NEGATIVE_ONLY = {"boost-algo-009"}


@pytest.mark.parametrize("card,fn", SORTS.items())
def test_sort_cards(card, fn):
    f, rng = run(card)[fn], random.Random(0)
    lo = 0 if card in NON_NEGATIVE_ONLY else -30
    cases = [[rng.randint(lo, 30) for _ in range(rng.randint(0, 12))] for _ in range(1000)]
    cases += [[], [0], [0, 0], [1000, 999, 1], [10**6, 10**6 - 1, 5], list(range(50)), list(range(50))[::-1]]
    for case in cases:
        a = list(case)
        out = f(a)
        assert (a if out is None else out) == sorted(case), case


def test_radix_sort_rejects_negatives():
    with pytest.raises(ValueError):
        run("boost-algo-009")["radix_sort"]([1, -1])


@pytest.mark.parametrize("a", [list(range(20000)), list(range(20000))[::-1], [7] * 20000, [1, 2] * 10000])
def test_quick_sort_survives_sorted_and_duplicate_inputs(a):
    ns = run("boost-algo-007")
    calls = 0
    partition = ns["partition"]

    def counted(alist, first, last):
        nonlocal calls
        calls += last - first + 1
        return partition(alist, first, last)

    ns["partition"] = counted
    out = list(a)
    ns["quickSort"](out)
    assert out == sorted(a)
    assert calls < 2_000_000  # N log N is about 290k, N^2 / 2 is 200M


class Key(int):
    """Equal as a number, distinct as an object: shows whether a sort is stable."""


@pytest.mark.parametrize("card", ["boost-algo-002", "boost-algo-004", "boost-algo-005", "boost-algo-008", "boost-algo-009"])
def test_stable_sorts_keep_the_order_of_equal_keys(card):
    rng = random.Random(1)
    for _ in range(200):
        src = [Key(rng.randint(0, 4)) for _ in range(12)]
        a = list(src)
        out = run(card)[SORTS[card]](a)
        assert [id(x) for x in (a if out is None else out)] == [id(x) for x in sorted(src)]


def test_dp_cards_agree():
    up, down = run("boost-algo-011", 0)["fibb"], run("boost-algo-011", 1)["fibb"]
    assert [up(n) for n in range(1, 30)] == [down(n) for n in range(1, 30)]
    assert up(5) == 8


def test_bfs_dfs_card():
    ns = run("boost-algo-014")
    rng = random.Random(2)

    def recursive(g, v, seen):
        seen.append(v)
        for w in g[v]:
            if w not in seen:
                recursive(g, w, seen)
        return seen

    for _ in range(300):
        n = rng.randint(1, 8)
        g = [rng.sample(range(n), rng.randint(0, n)) for _ in range(n)]
        assert ns["dfs"](g, 0) == recursive(g, 0, [])
        order, dist = ns["bfs"](g, 0)
        assert set(order) == set(recursive(g, 0, [])) and len(order) == len(set(order))
        assert [dist[v] for v in order] == sorted(dist.values())
        for v in dist:
            assert all(dist[w] <= dist[v] + 1 for w in g[v])
            assert v == 0 or any(v in g[u] and dist[u] == dist[v] - 1 for u in dist)


def test_dijkstra_card_runs_as_printed():
    stdin = "5 5\n1\n1 2 4\n1 3 1\n3 2 2\n2 4 5\n3 4 9\n"
    r = subprocess.run([sys.executable, "-c", blocks("boost-algo-016")[0]], input=stdin, capture_output=True, text=True)
    assert (r.returncode, r.stdout.split()) == (0, ["0", "3", "1", "8", "INFINITY"]), r.stderr


def test_kruskal_and_union_find_cards():
    from itertools import combinations
    kruskal, UF = run("boost-algo-021")["kruskal"], run("boost-algo-022")["UnionFind"]
    rng = random.Random(3)
    for _ in range(100):
        n = rng.randint(1, 5)
        edges = [(rng.randint(1, 9), u, v) for u, v in combinations(range(n), 2) if rng.random() < 0.7]

        def spans(sub):
            uf = UF(n)
            return all(uf.union(u, v) for _, u, v in sub) and uf.count == 1

        best = min((sum(e[0] for e in s) for s in combinations(edges, n - 1) if spans(s)), default=None)
        mst, total = kruskal(n, edges)
        assert (len(mst) == n - 1) == (best is not None)
        if best is not None:
            assert total == best
    uf = UF(100_000)  # a long chain must not hit the recursion limit
    uf.parent = [max(i - 1, 0) for i in range(100_000)]
    assert uf.find(99_999) == 0 and uf.parent[99_999] == 0


def test_topological_sort_card():
    f = run("boost-algo-023")["topological_sort"]
    rng = random.Random(4)
    for _ in range(200):
        n = rng.randint(0, 8)
        label = rng.sample(range(n), n)
        g = [[] for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                if rng.random() < 0.4:
                    g[label[i]].append(label[j])
        pos = {v: i for i, v in enumerate(f(g))}
        assert len(pos) == n and all(pos[v] < pos[w] for v in range(n) for w in g[v])
    with pytest.raises(ValueError):
        f([[1], [2], [1]])
