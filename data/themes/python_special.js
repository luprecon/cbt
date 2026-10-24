/**
 * [언어별] Python 기출 15문항 (슬라이싱, 컴프리헨션, 딕셔너리/세트, 람다, 언패킹)
 * 정보처리기사 실기 Python 주요 출제 유형
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["python_special"] = {
  id: "python_special",
  title: "[언어별] Python 기출 15문항",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [10, 20, 30, 40, 50, 60]
print(a[1:5:2])`,
      answer: "[20, 40]",
      aliases: ["[20, 40]", "[20,40]", "20, 40", "20 40"],
      explanation: "슬라이싱 문법 `a[start:stop:step]`:\n- start: 1 (a[1] = 20)\n- stop: 5 (인덱스 5 이전인 4까지 탐색)\n- step: 2 (2칸씩 건너뜀)\n인덱스 1(20)과 3(40)이 선택되어 리스트 [20, 40]이 출력됩니다.",
      trapPoint: "stop 인덱스 5(원소 60)는 포함되지 않으며, step 2에 따라 인덱스 1, 3의 원소만 추출됩니다.",
      traceTable: {
        headers: ["인덱스", "원소", "선택 여부"],
        rows: [
          ["1", "20", "선택 (시작)"],
          ["2", "30", "건너뜀 (step 2)"],
          ["3", "40", "선택"],
          ["4", "50", "건너뜀 (step 2)"],
          ["5", "60", "종료 (stop 미포함)"]
        ]
      }
    },
    {
      id: 2,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `numbers = [1, 2, 3, 4, 5, 6]
result = [x * x for x in numbers if x % 2 == 1]
print(result)`,
      answer: "[1, 9, 25]",
      aliases: ["[1, 9, 25]", "[1,9,25]", "1, 9, 25", "1 9 25"],
      explanation: "리스트 컴프리헨션(List Comprehension):\n1. numbers에서 홀수(x % 2 == 1)인 원소 추출: 1, 3, 5\n2. 각각 제곱(x * x) 계산:\n   - 1 * 1 = 1\n   - 3 * 3 = 9\n   - 5 * 5 = 25\n출력: [1, 9, 25]",
      trapPoint: "조건식 if x % 2 == 1에 의해 홀수만 필터링된 후 거듭제곱됩니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `d = {"apple": 100, "banana": 200}
d["cherry"] = 300
d["apple"] = 150
print(d.get("grape", 0) + d["apple"])`,
      answer: "150",
      aliases: ["150"],
      explanation: "1. d[\"cherry\"] = 300 추가, d[\"apple\"] = 150 갱신\n2. d.get(\"grape\", 0)은 \"grape\" 키가 없으므로 기본값 0을 반환합니다.\n3. d[\"apple\"]은 150입니다.\n4. 0 + 150 = 150이 출력됩니다.",
      trapPoint: "dict.get(key, default) 메서드는 키가 존재하지 않을 때 KeyError 대신 기본값을 반환합니다."
    },
    {
      id: 4,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a, *b, c = [1, 2, 3, 4, 5]
print(b)`,
      answer: "[2, 3, 4]",
      aliases: ["[2, 3, 4]", "[2,3,4]", "2, 3, 4", "2 3 4"],
      explanation: "가변 언패킹(Starred Unpacking):\n- a에는 첫 번째 원소 1이 할당됩니다.\n- c에는 마지막 원소 5가 할당됩니다.\n- *b에는 나머지 중간 원소들이 리스트 [2, 3, 4]로 패킹되어 할당됩니다.\n출력: [2, 3, 4]",
      trapPoint: "Starred expression *b는 리스트 형태로 중간 원소들을 수집합니다."
    },
    {
      id: 5,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `data = [1, 2, 3, 4]
res = list(map(lambda x: x + 10, filter(lambda x: x > 2, data)))
print(res)`,
      answer: "[13, 14]",
      aliases: ["[13, 14]", "[13,14]", "13, 14", "13 14"],
      explanation: "1. `filter(lambda x: x > 2, data)`는 2보다 큰 원소 [3, 4]를 걸러냅니다.\n2. `map(lambda x: x + 10, ...)`은 걸러진 원소들에 10을 더하여 [13, 14]를 만듭니다.\n따라서 [13, 14]가 출력됩니다.",
      trapPoint: "filter 함수가 먼저 적용되어 [3, 4]가 되고, map 함수로 각각 10이 더해집니다."
    },
    {
      id: 6,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s1 = {1, 2, 3, 4}
s2 = {3, 4, 5, 6}
print(len(s1 & s2) + len(s1 ^ s2))`,
      answer: "6",
      aliases: ["6"],
      explanation: "1. s1 & s2 는 교집합: {3, 4} -> 길이는 2\n2. s1 ^ s2 는 대칭차집합(서로 다른 원소들의 합집합): {1, 2, 5, 6} -> 길이는 4\n3. 2 + 4 = 6 이 출력됩니다.",
      trapPoint: "집합(set) 연산자: &는 교집합, ^는 대칭차집합입니다."
    },
    {
      id: 7,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `text = "  Information Processing Engineer  "
words = text.strip().split()
print("-".join(words))`,
      answer: "Information-Processing-Engineer",
      aliases: ["Information-Processing-Engineer"],
      explanation: "1. text.strip()으로 앞뒤 공백 제거\n2. .split()으로 공백 기준 단어 분리: ['Information', 'Processing', 'Engineer']\n3. \"-\".join(words)로 각 단어를 하이픈으로 연결: 'Information-Processing-Engineer'\n출력: Information-Processing-Engineer",
      trapPoint: "split() 후 join() 연결 연산의 최종 결과 문자열을 정확히 작성합니다."
    },
    {
      id: 8,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def gen():
    for i in range(1, 4):
        yield i * 10

g = gen()
print(next(g) + next(g))`,
      answer: "30",
      aliases: ["30"],
      explanation: "제너레이터(Generator)와 yield 키워드:\n1. 첫 번째 next(g) 호출 시 i=1에서 yield 10 -> 10 반환\n2. 두 번째 next(g) 호출 시 i=2에서 yield 20 -> 20 반환\n3. 10 + 20 = 30이 출력됩니다.",
      trapPoint: "yield는 함수의 상태를 유지한 채 값을 반환하고 대기하며, next() 호출마다 다음 yield까지 진행합니다."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def append_item(val, lst=[]):
    lst.append(val)
    return lst

append_item(1)
append_item(2)
print(append_item(3))`,
      answer: "[1, 2, 3]",
      aliases: ["[1, 2, 3]", "[1,2,3]", "1, 2, 3", "1 2 3"],
      explanation: "파이썬의 가장 유명한 기본 인자 함정(Default Argument Gotcha):\n함수의 기본 매개변수 `lst=[]`는 함수 정의 시점에 단 한 번만 생성되어 공유됩니다.\n1. append_item(1) -> lst는 [1]\n2. append_item(2) -> 같은 lst에 2 추가되어 [1, 2]\n3. append_item(3) -> 같은 lst에 3 추가되어 [1, 2, 3]\n최종 반환 및 출력: [1, 2, 3]",
      trapPoint: "기본값으로 전달된 가변 객체(리스트, 딕셔너리)는 함수 호출마다 새로 생성되지 않고 계속 누적됩니다."
    },
    {
      id: 10,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `keys = ['a', 'b', 'c']
vals = [10, 20, 30]
d = dict(zip(keys, vals))
print(d['b'])`,
      answer: "20",
      aliases: ["20"],
      explanation: "zip(keys, vals)는 두 리스트의 동일 인덱스 요소를 튜플로 묶습니다: [('a', 10), ('b', 20), ('c', 30)]\ndict()로 변환하면 {'a': 10, 'b': 20, 'c': 30} 딕셔너리가 생성됩니다.\nd['b']는 20입니다.",
      trapPoint: "zip 함수를 활용한 딕셔너리 생성 패턴입니다."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `students = [("Lee", 85), ("Kim", 95), ("Park", 70)]
students.sort(key=lambda x: x[1])
print(students[0][0])`,
      answer: "Park",
      aliases: ["Park"],
      explanation: "students.sort(key=lambda x: x[1])은 튜플의 2번째 원소(점수)를 기준으로 오름차순 정렬합니다.\n정렬 후: [('Park', 70), ('Lee', 85), ('Kim', 95)]\n인덱스 0번 학생은 ('Park', 70)이며, [0][0]은 이름인 'Park'입니다.",
      trapPoint: "lambda 키 정렬 후 최하위 점수를 가진 학생의 이름을 추출합니다."
    },
    {
      id: 12,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `stack = [10, 20, 30, 40]
stack.pop()
stack.append(50)
print(stack[-1] - stack[0])`,
      answer: "40",
      aliases: ["40"],
      explanation: "1. stack.pop()으로 맨 뒤 원소 40 제거 -> [10, 20, 30]\n2. stack.append(50)으로 50 추가 -> [10, 20, 30, 50]\n3. stack[-1]은 마지막 원소 50\n4. stack[0]은 첫 번째 원소 10\n5. 50 - 10 = 40이 출력됩니다.",
      trapPoint: "음수 인덱스 stack[-1]은 리스트의 마지막 원소를 의미합니다."
    },
    {
      id: 13,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def recur(n):
    if n <= 0:
        return 0
    return n + recur(n - 2)

print(recur(7))`,
      answer: "16",
      aliases: ["16"],
      explanation: "재귀 호출 추적:\nrecur(7) = 7 + recur(5)\nrecur(5) = 5 + recur(3)\nrecur(3) = 3 + recur(1)\nrecur(1) = 1 + recur(-1)\nrecur(-1) = 0 (n <= 0 기저조건)\n합산: 7 + 5 + 3 + 1 + 0 = 16 입니다.",
      trapPoint: "n이 2씩 감소하여 7, 5, 3, 1 홀수들의 합(16)을 구하는 재귀입니다."
    },
    {
      id: 14,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `x = 0 or 10 and 20
print(x)`,
      answer: "20",
      aliases: ["20"],
      explanation: "파이썬 논리 연산자의 단락 평가(Short-circuit Evaluation)와 우선순위:\n1. 'and' 연산자가 'or'보다 우선순위가 높습니다.\n2. 10 and 20: 10이 참(truthy)이므로 뒤의 20까지 평가되어 20이 됩니다.\n3. 0 or 20: 0이 거짓(falsy)이므로 뒤의 20이 선택됩니다.\n따라서 20이 출력됩니다.",
      trapPoint: "논리 연산자 우선순위(not > and > or) 및 파이썬에서 논리 연산자는 불리언(True/False) 대신 평가된 피연산자의 실제 값을 반환한다는 점입니다."
    },
    {
      id: 15,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def move(self, dx, dy):
        self.x += dx
        self.y += dy

p = Point(3, 4)
p.move(2, -1)
print(f"{p.x}, {p.y}")`,
      answer: "5, 3",
      aliases: ["5, 3", "5,3", "5 3"],
      explanation: "1. Point(3, 4)로 p.x = 3, p.y = 4 초기화\n2. p.move(2, -1) 호출 시 p.x = 3 + 2 = 5, p.y = 4 + (-1) = 3\n3. f-string 출력: '5, 3'",
      trapPoint: "파이썬 클래스의 __init__ 생성자와 self 인스턴스 변수 조작의 기본 흐름입니다."
    }
  ]
};
