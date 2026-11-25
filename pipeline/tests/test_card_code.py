"""Runs the Python code printed on algorithm cards that review had to fix or add.

Most of that code comes from an upstream repo and the pre-commit hook runs these tests, so a
re-extraction must not be able to execute code nobody has read. Each block is pinned by hash; after
a change, read the new block and update its pin by hand.
"""

import hashlib
import random
import re
import subprocess
import sys

import pytest

from study_pipeline.config import CONTENT


PINS = {
    "boost-algo-002": [
        "c87d3ff102e52a89f54f7036c3512227411d758dd86d3c7a1bffcb9ffccb9329",
    ],
    "boost-algo-003": [
        "a84a1ad8d63174db68b85e25b473f163453b9bcdd8a2236bfe5993ba011ac385",
    ],
    "boost-algo-004": [
        "ede60e185ab5c29e5ca849a7a4a1b67eae487ea155fabebe251b1c7848f5abc2",
    ],
    "boost-algo-005": [
        "da66f6234ebedea3f35d9739278e33596227aea8705f9e633b99ab48c27921e1",
    ],
    "boost-algo-006": [
        "0514ef8161bcb0eb1585254df209b635cbb0042fc58b8c2580e72a182f1b8d32",
    ],
    "boost-algo-007": [
        "a60962b75bb9f6ce639456650d0412f40b2a6b938f6c59733ccbda7fe3a1b3e9",
    ],
    "boost-algo-008": [
        "35d293dc56cad35fc61cc0ef707c8d25f2747061962647daf2374615ea2e49c1",
    ],
    "boost-algo-009": [
        "bff579e4e18f22e4610e3ebd24e34c2cb2e5c25b2c9c3dc615c0a2c695888657",
    ],
    "boost-algo-011": [
        "d0417f96bf17cd7b82d02df1db26dd3bb9ebf3997eee30e6c47b522a3b11cd1c",
        "bf577edb84c6071cefff9cf2e4dde8a207623bb3d21ff1d4d44fb689286f7ceb",
    ],
    "boost-algo-014": [
        "3f404a2278165d4e9d5798687d913105ca27557fa74a4827871b2be448af834f",
    ],
    "boost-algo-016": [
        "f48e7969ab944f37724ab5752dd461204c9116b216b58078896598fdd7264c9d",
    ],
    "boost-algo-021": [
        "b409e57bb4e95518d57ae33ecf7dfc50da2f74080c0e64497381bbb4615fec57",
    ],
    "boost-algo-022": [
        "3f234413369e5c767b385287276a2ad1282a22914d0a86c1c9fe0f545ce7f07b",
    ],
    "boost-algo-023": [
        "3e514acda990ea7dcc60fd7ab4043d193e1d089896bfaf0543db2564a9f35383",
    ],
}


def blocks(card: str) -> list[str]:
    text = (CONTENT / "questions" / "algorithm" / f"{card}.md").read_text()
    found = re.findall(r"```python\n(.*?)```", text, re.S)
    hashes = [hashlib.sha256(b.encode()).hexdigest() for b in found]
    assert hashes == PINS[card], f"{card}: code changed; read it, then update PINS: {hashes}"
    return found


def run(card: str, i: int = 0) -> dict:
    ns: dict = {}
    exec(compile(blocks(card)[i], card, "exec"), ns)
    return ns


def test_changed_code_is_not_executed(monkeypatch, tmp_path):
    d = tmp_path / "questions" / "algorithm"
    d.mkdir(parents=True)
    (d / "boost-algo-005.md").write_text("```python\nraise SystemExit('executed')\n```\n")
    monkeypatch.setitem(globals(), "CONTENT", tmp_path)
    with pytest.raises(AssertionError, match="code changed"):
        run("boost-algo-005")


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
