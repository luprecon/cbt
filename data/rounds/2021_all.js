/**
 * 2021년 핵심 기출선 (1~3회 엄선 20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2021_all"] = {
  id: "2021_all",
  title: "2021년 핵심 기출선",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class A {
    int a;
    A(int a) { this.a = a; }
    void display() { System.out.print("A" + a); }
}

class B extends A {
    int b;
    B(int a, int b) {
        super(a);
        this.b = b;
    }
    void display() { System.out.print("B" + b); }
}

public class Main {
    public static void main(String[] args) {
        A obj = new B(10, 20);
        obj.display();
    }
}`,
      answer: "B20",
      aliases: ["B20", "B 20"],
      explanation: "A 타입의 참조 변수 obj로 B 인스턴스를 가리키고 있습니다.\n자바의 가상 메서드 호출(다형성)에 따라 실제 런타임 객체인 B의 display() 메서드가 실행됩니다.\n따라서 \"B\" + b(20) = \"B20\"이 출력됩니다.",
      trapPoint: "부모 클래스 타입으로 참조하더라도 오버라이딩된 자식 클래스의 메서드가 호출됩니다.",
      traceTable: {
        headers: ["참조 타입", "실제 객체", "호출 메서드", "출력"],
        rows: [
          ["A obj", "new B(10, 20)", "B.display() (동적 바인딩)", "B20"]
        ]
      }
    },
    {
      id: 2,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = 10;
    int res = a < b ? a++ : b++;
    printf("%d %d", a, res);
    return 0;
}`,
      answer: "6 5",
      aliases: ["6 5", "6, 5", "6,5"],
      explanation: "1. 5 < 10은 참이므로 `a++` 식이 선택됩니다 (b++는 평가되지 않음).\n2. 후위 증가자이므로 res에는 현재 a값인 5가 먼저 대입된 후 a는 6으로 증가합니다.\n3. a = 6, res = 5\n출력: 6 5",
      trapPoint: "삼항 연산자에서 선택된 항만 증감 연산이 일어납니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def func(n):
    if n <= 1: return 1
    return n * func(n - 1)

print(func(3) + func(2))`,
      answer: "8",
      aliases: ["8"],
      explanation: "func(3) = 3 * 2 * 1 = 6\nfunc(2) = 2 * 1 = 2\n6 + 2 = 8이 출력됩니다.",
      trapPoint: "3! + 2! = 6 + 2 = 8."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 두 테이블 간의 결과 집합을 합집합(중복 포함)으로 결합할 때 사용하는 키워드를 쓰시오.",
      passage: `SELECT NAME FROM T1 (  1  ) (  2  ) SELECT NAME FROM T2;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["UNION", "union"],
        "2": ["ALL", "all"]
      },
      answer: "(1) UNION, (2) ALL",
      aliases: ["UNION ALL", "UNION, ALL", "union all"],
      explanation: "중복을 제거하는 합집합은 `UNION`, 중복을 포함하는 전체 합집합은 `UNION ALL`을 사용합니다.",
      trapPoint: "중복 포함 합집합 = UNION ALL."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 가장 바람직하지 않은 최고 강도의 결합도로, 다른 모듈의 내부 데이터나 코드를 직접 참조하거나 수정하는 결합도의 명칭을 쓰시오.",
      answer: "내용 결합도",
      aliases: ["내용 결합도", "내용결합도", "Content Coupling"],
      explanation: "내용 결합도(Content Coupling)는 모듈의 캡슐화를 완전히 파괴하는 최악의 결합도입니다.",
      trapPoint: "최악의 결합도 = 내용 결합도."
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[4] = {1, 2, 3, 4};
    int *p = arr + 2;
    printf("%d", *p + 5);
    return 0;
}`,
      answer: "8",
      aliases: ["8"],
      explanation: "arr + 2는 arr[2]의 주소(&arr[2])입니다.\n*p는 arr[2]의 값인 3입니다.\n3 + 5 = 8이 출력됩니다.",
      trapPoint: "배열 2번 인덱스의 원소 값 3에 5를 더한 값입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 1;
        int b = 2;
        int c = 3;
        System.out.println(a < b && b < c);
    }
}`,
      answer: "true",
      aliases: ["true", "True"],
      explanation: "1 < 2는 참이고 2 < 3도 참이므로, true && true = true가 출력됩니다.",
      trapPoint: "자바에서 boolean 값은 영문 소문자 'true'로 출력됩니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "국내 한국인터넷진흥원(KISA)에서 개발한 128비트 블록 암호화 표준 알고리즘으로, 금융 및 전자상거래 분야에서 널리 사용되는 대칭키 암호화 알고리즘의 명칭을 쓰시오.",
      answer: "SEED",
      aliases: ["SEED", "seed", "시드"],
      explanation: "SEED는 KISA에서 개발한 128비트 대칭키 블록 암호 알고리즘입니다 (이후 경량화를 위해 ARIA 개발).",
      trapPoint: "국산 128비트 블록 암호 알고리즘의 대명사 = SEED."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `words = ['cat', 'window', 'defenestrate']
lens = [len(w) for w in words]
print(max(lens))`,
      answer: "12",
      aliases: ["12"],
      explanation: "각 단어의 길이:\n- 'cat': 3\n- 'window': 6\n- 'defenestrate': 12\n가장 긴 단어의 길이는 12이므로 12가 출력됩니다.",
      trapPoint: "문자열 길이 계산과 max() 함수입니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "데이터베이스에서 트랜잭션 수행 도중 장애가 발생하여 비정상적으로 종료되었을 때, 장애 발생 이전의 가장 최근 일관성 있는 상태로 되돌리기 위해 취소하는 연산의 명칭을 쓰시오.",
      answer: "ROLLBACK",
      aliases: ["ROLLBACK", "rollback", "롤백"],
      explanation: "ROLLBACK은 트랜잭션 실행 중 오류가 발생했을 때 변경사항을 모두 취소하고 이전 상태로 되돌리는 명령어입니다.",
      trapPoint: "성공은 COMMIT, 취소는 ROLLBACK입니다."
    },
    {
      id: 11,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int i = 1;
    while (i <= 5) {
        if (i == 3) {
            i++;
            continue;
        }
        printf("%d", i);
        i++;
    }
    return 0;
}`,
      answer: "1245",
      aliases: ["1245", "1 2 4 5"],
      explanation: "i가 3일 때 출력을 건너뛰고 i++ 후 continue하므로 1, 2, 4, 5가 연달아 출력됩니다.",
      trapPoint: "printf에 공백이나 개행(\\n)이 없으므로 붙여서 1245로 출력됩니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 순서를 약한 것(좋은 것)부터 강한 것(나쁜 것)으로 올바르게 나열할 때: 자료 -> (  1  ) -> 제어 -> (  2  ) -> 공통 -> 내용. 빈칸 (1), (2)에 들어갈 결합도의 명칭을 쓰시오.",
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["스탬프", "스탬프 결합도", "스탬프결합도", "Stamp"],
        "2": ["외부", "외부 결합도", "외부결합도", "External"]
      },
      answer: "(1) 스탬프, (2) 외부",
      aliases: ["스탬프, 외부", "스탬프 외부"],
      explanation: "결합도 암기 순서 (자-스-제-외-공-내):\n자료(Data) -> 스탬프(Stamp) -> 제어(Control) -> 외부(External) -> 공통(Common) -> 내용(Content)",
      trapPoint: "자-스-제-외-공-내 암기 공식을 확인하세요."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30};
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            sum += arr[i] / 10;
        }
        System.out.println(sum);
    }
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "arr[0]/10 = 1, arr[1]/10 = 2, arr[2]/10 = 3.\nsum = 1 + 2 + 3 = 6이 출력됩니다.",
      trapPoint: "각 원소를 10으로 나눈 몫의 합산입니다."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 인덱스를 생성할 때 사용하는 DDL 명령어를 쓰시오.",
      passage: `(        ) INDEX IDX_NAME ON EMP (NAME);`,
      answer: "CREATE",
      aliases: ["CREATE", "create"],
      explanation: "인덱스를 생성하는 DDL 문법은 `CREATE INDEX 인덱스명 ON 테이블명 (컬럼명);` 입니다.",
      trapPoint: "인덱스 생성 DDL = CREATE INDEX."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;
    *p = *p * 2;
    printf("%d", a);
    return 0;
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "*p는 a의 메모리를 참조하므로, *p = 10 * 2 = 20이 되어 a의 값이 20으로 바뀝니다.",
      trapPoint: "포인터 역참조 연산과 원본 변수 변경입니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "웹 상에서 통신 보안을 유지하기 위해 넷스케이프사에서 개발하였으며, 전송 계층과 응용 계층 사이에서 기밀성과 무결성을 제공하는 보안 프로토콜의 명칭(영문 약어 3글자)을 쓰시오 (현재 TLS로 발전).",
      answer: "SSL",
      aliases: ["SSL", "ssl", "Secure Sockets Layer", "TLS"],
      explanation: "SSL(Secure Sockets Layer)은 웹 브라우저와 웹 서버 간의 안전한 통신을 위한 표준 암호화 통신 규약입니다 (현재는 TLS로 표준화).",
      trapPoint: "HTTPS의 기반이 되는 보안 계층 프로토콜 = SSL / TLS."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s = "Hello"
print(s.lower())`,
      answer: "hello",
      aliases: ["hello"],
      explanation: "lower() 메서드는 문자열 내의 모든 알파벳을 소문자로 변환하므로 'hello'가 출력됩니다.",
      trapPoint: "소문자 변환입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "소프트웨어 아키텍처 및 디자인 원칙(SOLID) 중 '소프트웨어 개체는 확장에 대해서는 열려 있어야 하고, 수정에 대해서는 닫혀 있어야 한다'는 원칙의 명칭을 쓰시오.",
      answer: "개방 폐쇄 원칙",
      aliases: ["개방 폐쇄 원칙", "개방폐쇄원칙", "OCP", "Open-Closed Principle", "개방-폐쇄 원칙"],
      explanation: "OCP(Open-Closed Principle)는 기존 코드를 변경하지 않으면서 새로운 기능을 추가할 수 있도록 다형성과 추상화를 활용하라는 객체지향 설계 원칙입니다.",
      trapPoint: "확장에 열려 있고 수정에 닫혀 있음 = 개방 폐쇄 원칙(OCP)."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[3] = {1, 2, 3};
    int sum = 0;
    for (int i = 0; i < 3; i++) {
        sum = sum * 10 + arr[i];
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "123",
      aliases: ["123"],
      explanation: "- i=0: sum = 0 * 10 + 1 = 1\n- i=1: sum = 1 * 10 + 2 = 12\n- i=2: sum = 12 * 10 + 3 = 123\n따라서 123이 출력됩니다.",
      trapPoint: "배열의 각 자릿수를 10진수 숫자로 조합하는 로직입니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "정규화(Normalization) 과정의 반대 개념으로, 데이터베이스의 읽기 성능을 향상시키기 위해 시스템 성능 향상과 개발 편의를 목적으로 의도적으로 정규화 원칙을 위배하여 중복을 허용하는 데이터베이스 설계 기법의 명칭을 쓰시오.",
      answer: "반정규화",
      aliases: ["반정규화", "역정규화", "비정규화", "Denormalization", "denormalization"],
      explanation: "반정규화(Denormalization, 역정규화)는 조인 연산의 횟수를 줄여 조회 성능을 향상시키기 위해 의도적으로 중복 컬럼을 추가하거나 테이블을 통합/분할하는 기법입니다.",
      trapPoint: "조회 성능 향상을 위한 의도적 중복 허용 = 반정규화(역정규화)."
    }
  ]
};
