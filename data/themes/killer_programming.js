/**
 * [테마] 프로그래밍 코드 추적 20문항 (C / Java / Python 주요 출제 유형)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["killer_programming"] = {
  id: "killer_programming",
  title: "[테마] 프로그래밍 코드 추적 20문항",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("%d", *(*(arr + 1) + 2));
    return 0;
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "*(*(arr + i) + j)는 arr[i][j]와 동일합니다.\ni = 1, j = 2이므로 arr[1][2]의 값인 6이 출력됩니다.",
      trapPoint: "arr[1][2]는 2번째 행, 3번째 열의 원소인 6입니다.",
      traceTable: {
        headers: ["포인터 식", "배열 첨자 표기", "가리키는 원소 값"],
        rows: [
          ["arr + 1", "&arr[1][0]", "1행 시작 주소"],
          ["*(arr + 1) + 2", "&arr[1][2]", "arr[1][2] 주소"],
          ["*(*(arr + 1) + 2)", "arr[1][2]", "6"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    public void print() {
        System.out.print("P");
    }
}

class Child extends Parent {
    public void print() {
        System.out.print("C");
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        p.print();
    }
}`,
      answer: "C",
      aliases: ["C"],
      explanation: "Parent 타입의 참조 변수 p가 Child 인스턴스를 참조하고 있으나, 자바는 동적 바인딩(가상 메서드 테이블)을 지원하므로 자식 클래스에서 오버라이딩된 `Child.print()`가 실행됩니다.\n출력: C",
      trapPoint: "부모 타입 변수라도 실제 런타임 객체의 오버라이딩 메서드가 우선 호출됩니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3, 4, 5]
print(a[-3:5])`,
      answer: "[3, 4, 5]",
      aliases: ["[3, 4, 5]", "[3,4,5]", "3, 4, 5"],
      explanation: "음수 인덱스 -3은 뒤에서 3번째 원소인 3(인덱스 2)을 의미합니다.\na[-3:5]는 인덱스 2부터 4(5 미만)까지 추출하므로 [3, 4, 5]가 출력됩니다.",
      trapPoint: "파이썬 음수 인덱스 계산: -1(5), -2(4), -3(3)."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n + f(n - 1);
}

int main() {
    printf("%d", f(5));
    return 0;
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "1부터 5까지의 합을 재귀적으로 구합니다: 5 + 4 + 3 + 2 + 1 = 15.\n출력: 15",
      trapPoint: "재귀 호출의 기저 조건(n <= 1)까지의 누적합입니다."
    },
    {
      id: 5,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = a++;
        int c = ++a;
        System.out.println(b + c);
    }
}`,
      answer: "22",
      aliases: ["22"],
      explanation: "1. a = 10\n2. b = a++: b = 10, a는 11이 됨\n3. c = ++a: a가 먼저 12가 된 후 c = 12\n4. b + c = 10 + 12 = 22\n출력: 22",
      trapPoint: "후증가와 선증가가 연달아 발생할 때의 변수 상태 변화를 정확히 추적해야 합니다.",
      traceTable: {
        headers: ["연산", "대입된 값", "a의 변화"],
        rows: [
          ["b = a++", "b = 10", "a: 10 -> 11"],
          ["c = ++a", "c = 12", "a: 11 -> 12"],
          ["b + c", "10 + 12 = 22", "a = 12"]
        ]
      }
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char str[] = "ABCD";
    char *p = str + 1;
    printf("%c %c", *p, *(p + 2));
    return 0;
}`,
      answer: "B D",
      aliases: ["B D", "B, D", "B,D"],
      explanation: "p는 str + 1이므로 'B'를 가리킵니다 (*p = 'B').\np + 2는 'D'를 가리킵니다 (*(p + 2) = 'D').\n출력: B D",
      trapPoint: "포인터 위치 이동에 따른 문자 역참조입니다."
    },
    {
      id: 7,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `nums = [1, 2, 3, 4]
res = [x for x in nums if x % 2 == 1]
print(sum(res))`,
      answer: "4",
      aliases: ["4"],
      explanation: "홀수는 1과 3입니다.\nres = [1, 3]이며, sum(res) = 1 + 3 = 4입니다.",
      trapPoint: "1과 3의 합 = 4."
    },
    {
      id: 8,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int x = 10;
}
class Child extends Parent {
    int x = 20;
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.x);
    }
}`,
      answer: "10",
      aliases: ["10"],
      explanation: "자바에서 필드(멤버 변수)는 다형성이 적용되지 않으며, 참조 변수의 타입(Parent)에 의해 정적으로 결정됩니다.\n따라서 p.x는 Parent의 x인 10이 출력됩니다.",
      trapPoint: "메서드는 오버라이딩되어 자식 것이 실행되지만, 변수는 선언 타입(부모)의 것이 참조됩니다!"
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 16;
    printf("%d", a >> 3);
    return 0;
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "우측 시프트 a >> 3은 a를 2^3(8)로 나눈 몫입니다.\n16 / 8 = 2가 출력됩니다.",
      trapPoint: "16 >> 3 = 16 / 8 = 2."
    },
    {
      id: 10,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def f(x, y=[]):
    y.append(x)
    return len(y)

f(1)
f(2)
print(f(3))`,
      answer: "3",
      aliases: ["3"],
      explanation: "가변 기본 인자 y=[]는 모든 호출 간에 유지됩니다.\n1번째 호출: y = [1] (길이 1)\n2번째 호출: y = [1, 2] (길이 2)\n3번째 호출: y = [1, 2, 3] (길이 3)\n따라서 3이 출력됩니다.",
      trapPoint: "파이썬 디폴트 리스트 인자의 지속성입니다."
    },
    {
      id: 11,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    printf("%d", ++*p);
    return 0;
}`,
      answer: "11",
      aliases: ["11"],
      explanation: "연산자 우선순위에서 `++*p`는 역참조 `*p`가 먼저 평가되어 arr[0]의 값인 10을 가져온 후, 전위 증가 연산자가 적용되어 11로 증가합니다.\n따라서 11이 출력됩니다.",
      trapPoint: "++*p는 포인터가 가리키는 값을 1 증가시킵니다."
    },
    {
      id: 12,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s1 = "abc";
        String s2 = "abc";
        System.out.println(s1 == s2);
    }
}`,
      answer: "true",
      aliases: ["true", "True"],
      explanation: "문자열 리터럴로 생성된 \"abc\"는 자바의 문자열 상수 풀(String Constant Pool)에 저장되어 동일한 객체를 재사용합니다.\n따라서 s1과 s2는 동일한 주소를 참조하므로 s1 == s2는 true입니다.",
      trapPoint: "new String()은 새 객체를 만들지만 리터럴 \"abc\"는 String Pool에서 공유되어 == 비교 시 true가 됩니다."
    },
    {
      id: 13,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3]
b = [x * 10 for x in a]
print(b[1])`,
      answer: "20",
      aliases: ["20"],
      explanation: "b = [10, 20, 30] 입니다.\nb[1]은 20입니다.",
      trapPoint: "1번 인덱스는 두 번째 원소인 20입니다."
    },
    {
      id: 14,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[3] = {1, 2, 3};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum += i[arr];
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "i[arr]은 arr[i]와 완전히 동일합니다!\n1 + 2 + 3 = 6이 출력됩니다.",
      trapPoint: "i[arr] == arr[i] 문법을 알면 1초 만에 풀 수 있는 문제입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 0;
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i == j) x++;
            }
        }
        System.out.println(x);
    }
}`,
      answer: "3",
      aliases: ["3"],
      explanation: "i == j인 쌍은 (0,0), (1,1), (2,2)로 총 3회입니다.\n따라서 x = 3이 출력됩니다.",
      trapPoint: "대각선 일치 조건의 반복 횟수 3입니다."
    },
    {
      id: 16,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    int *p1 = &a;
    int *p2 = &b;
    p1 = p2;
    *p1 = 30;
    printf("%d %d", a, b);
    return 0;
}`,
      answer: "10 30",
      aliases: ["10 30", "10, 30", "10,30"],
      explanation: "1. p1 = p2에 의해 p1도 변수 b의 주소를 가리키게 됩니다.\n2. *p1 = 30은 변수 b의 값을 30으로 변경합니다.\n3. a의 값은 변경되지 않고 그대로 10입니다.\n출력: 10 30",
      trapPoint: "포인터 변수 자체에 주소를 덮어쓴 후 역참조하는 흐름입니다."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def func(a, b=2, c=3):
    return a + b * c

print(func(4, c=5))`,
      answer: "14",
      aliases: ["14"],
      explanation: "a=4, b는 기본값 2, c는 키워드 인자로 5가 전달됩니다.\nfunc = 4 + 2 * 5 = 4 + 10 = 14 입니다.",
      trapPoint: "키워드 인자 지정과 기본 매개변수 혼합 계산입니다."
    },
    {
      id: 18,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 1;
        while (a <= 10) {
            a *= 2;
        }
        System.out.println(a);
    }
}`,
      answer: "16",
      aliases: ["16"],
      explanation: "a = 1 -> 2 -> 4 -> 8 -> 16\n16 <= 10은 거짓이므로 탈출합니다.\n출력: 16",
      trapPoint: "탈출 시점의 a값은 16입니다."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {5, 10, 15};
    int *p = arr + 1;
    printf("%d", p[1]);
    return 0;
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "p가 arr[1](10)을 가리킬 때, p[1]은 *(p + 1)이므로 arr[2]의 값인 15가 됩니다.",
      trapPoint: "포인터 기준 상대 인덱스 1은 arr[2]입니다."
    },
    {
      id: 20,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s = "a-b-c-d"
print(len(s.split('-')))`,
      answer: "4",
      aliases: ["4"],
      explanation: "s.split('-')는 ['a', 'b', 'c', 'd'] 리스트를 반환합니다.\n리스트의 길이는 4입니다.",
      trapPoint: "구분자로 분할된 요소의 개수는 4개입니다."
    }
  ]
};
