/**
 * 2024년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2024_3"] = {
  id: "2024_3",
  title: "2024년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[5] = {5, 3, 8, 1, 2};
    int temp;
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    printf("%d %d", arr[0], arr[4]);
    return 0;
}`,
      answer: "1 8",
      aliases: ["1 8", "1, 8", "1,8"],
      explanation: "오름차순 버블 정렬(Bubble Sort) 알고리즘입니다.\n정렬 완료 후 배열은 {1, 2, 3, 5, 8}이 됩니다.\narr[0]은 최솟값 1이고, arr[4]는 최댓값 8입니다.\n출력: 1 8",
      trapPoint: "버블 정렬 후 최솟값과 최댓값을 순서대로 출력하는 문제입니다."
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        int i = 0;
        do {
            i++;
            sum += i;
        } while (i < 5);
        System.out.println(sum);
    }
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "do-while 문은 최소 1회 실행 후 조건을 검사합니다.\ni는 1, 2, 3, 4, 5까지 증가하며 sum에 누적됩니다.\nsum = 1 + 2 + 3 + 4 + 5 = 15.\ni가 5일 때 (5 < 5)는 거짓이 되어 루프를 탈출합니다.\n출력: 15",
      trapPoint: "do-while 문 탈출 시점의 i값과 누적합 계산입니다.",
      traceTable: {
        headers: ["반복", "i 증가", "sum 누적", "조건 검사 (i < 5)"],
        rows: [
          ["1회", "i = 1", "1", "1 < 5 (참)"],
          ["2회", "i = 2", "3", "2 < 5 (참)"],
          ["3회", "i = 3", "6", "3 < 5 (참)"],
          ["4회", "i = 4", "10", "4 < 5 (참)"],
          ["5회", "i = 5", "15", "5 < 5 (거짓, 종료)"]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `d = {'apple': 3, 'banana': 2, 'orange': 5}
total = sum(d.values())
print(total)`,
      answer: "10",
      aliases: ["10"],
      explanation: "d.values()는 딕셔너리의 모든 값 [3, 2, 5]를 반환합니다.\nsum(d.values()) = 3 + 2 + 5 = 10 입니다.",
      trapPoint: "딕셔너리 values() 메서드와 sum() 내장 함수의 결합입니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char a = 'A';
    char b = a + 3;
    printf("%c", b);
    return 0;
}`,
      answer: "D",
      aliases: ["D"],
      explanation: "문자 'A'의 아스키 코드는 65입니다.\n65 + 3 = 68이며, 아스키 코드 68은 문자 'D'에 해당합니다.\n%c 포맷이므로 'D'가 출력됩니다.",
      trapPoint: "'A' 다음 알파벳 순서: A(0), B(1), C(2), D(3)."
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 [STUDENT] 테이블에서 학년(GRADE)이 1학년이거나 3학년인 학생을 조회하는 SQL 문이다. 빈칸에 들어갈 연산자 키워드를 쓰시오.",
      passage: `SELECT NAME FROM STUDENT WHERE GRADE (        ) (1, 3);`,
      answer: "IN",
      aliases: ["IN", "in"],
      explanation: "여러 값 중 하나와 일치하는지 비교하는 다중 행 연산자는 `IN` 입니다.",
      trapPoint: "괄호 안의 목록 중 하나와 일치하는 연산자는 IN입니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 한 모듈이 다른 모듈의 제어 플래그나 스위치 값을 전달하여 내부 흐름을 제어하도록 지시할 때 발생하는 결합도의 명칭을 쓰시오.",
      answer: "제어 결합도",
      aliases: ["제어 결합도", "제어결합도", "Control Coupling", "control coupling"],
      explanation: "제어 결합도(Control Coupling)는 한 모듈이 다른 모듈 내부의 논리적 흐름을 제어하기 위한 제어 플래그를 넘겨받아 처리할 때 발생합니다.",
      trapPoint: "제어 플래그나 동작 제어 파라미터 전달 = 제어 결합도(Control Coupling)."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = a++;
        int c = ++a;
        System.out.println(a + " " + b + " " + c);
    }
}`,
      answer: "7 5 7",
      aliases: ["7 5 7", "7, 5, 7", "7,5,7"],
      explanation: "1. a = 5\n2. b = a++: b에 5가 먼저 대입된 후 a는 6이 됨\n3. c = ++a: a가 먼저 7로 증가된 후 c에 7이 대입됨\n4. 최종 a=7, b=5, c=7\n출력: 7 5 7",
      trapPoint: "a++는 후증가(b=5 대입 후 a=6), ++a는 선증가(a=7 증가 후 c=7 대입)입니다.",
      traceTable: {
        headers: ["연산식", "대입된 값", "연산 후 a 값"],
        rows: [
          ["a = 5", "-", "5"],
          ["b = a++", "b = 5", "6"],
          ["c = ++a", "c = 7", "7"],
          ["출력", "a + ' ' + b + ' ' + c", "7 5 7"]
        ]
      }
    },
    {
      id: 8,
      category: "단답형",
      prompt: "데이터베이스에서 둘 이상의 테이블에 존재하는 동일한 의미를 가진 속성을 연결하여 새로운 릴레이션을 생성하는 관계 대수 연산자의 명칭을 쓰시오.",
      answer: "조인",
      aliases: ["조인", "Join", "join", "JOIN"],
      explanation: "조인(Join, ⋈) 연산은 공통 속성을 중심으로 두 개 이상의 릴레이션을 하나로 합쳐서 새로운 릴레이션을 만듭니다.",
      trapPoint: "관계 대수 순수 관계 연산자: Select(σ), Project(π), Join(⋈), Division(÷)."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int x = 10;
    if (x == 10) {
        int x = 20;
        printf("%d ", x);
    }
    printf("%d", x);
    return 0;
}`,
      answer: "20 10",
      aliases: ["20 10", "20, 10", "20,10"],
      explanation: "블록(중괄호 `{}`) 스코프 내에서 선언된 지역 변수 `int x = 20;`은 해당 블록 내부에서 바깥의 변수를 가립니다(Shadowing).\n따라서 블록 내부에서는 20이 출력되고, 블록을 벗어나면 원래 바깥 변수인 10이 출력됩니다.\n출력: 20 10",
      trapPoint: "변수의 유효 범위(Scope)와 변수 섀도잉 문제입니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "네트워크 계층의 패킷 교환 방식 중 모든 패킷이 전송되기 전에 송수신 호스트 간에 미리 논리적인 통신 경로를 설정한 후, 설정된 경로를 따라 패킷이 순서대로 전달되는 방식의 명칭을 쓰시오.",
      answer: "가상 회선 방식",
      aliases: ["가상 회선 방식", "가상회선 방식", "가상회선방식", "가상회선", "Virtual Circuit"],
      explanation: "가상 회선(Virtual Circuit) 방식은 연결 지향형으로 패킷 전송 전 경로를 확정하므로 전송 순서가 보장됩니다 (반면 각 패킷이 독립적으로 최적 경로를 찾아가는 방식은 데이터그램(Datagram) 방식입니다).",
      trapPoint: "연결 지향형 패킷 교환 = 가상 회선 방식, 비연결형 패킷 교환 = 데이터그램 방식."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = "Python"
print(a[::-1])`,
      answer: "nohtyP",
      aliases: ["nohtyP"],
      explanation: "슬라이싱 `[::-1]`은 문자열을 역순으로 뒤집으므로 \"nohtyP\"가 출력됩니다.",
      trapPoint: "문자열 전체를 뒤집는 파이썬 전형적인 역순 슬라이싱입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "소프트웨어 결함 분석 기법 중 하나로, 한 모듈의 매개변수나 인터페이스 구조체(레코드) 전체를 불필요하게 넘겨받아 사용하는 경우 발생하는 결합도의 명칭을 쓰시오.",
      answer: "스탬프 결합도",
      aliases: ["스탬프 결합도", "스탬프결합도", "Stamp Coupling", "stamp coupling"],
      explanation: "스탬프 결합도(Stamp Coupling)는 두 모듈 간에 레코드나 배열, 구조체 등 복합 데이터 구조를 인터페이스로 교환할 때 발생합니다.",
      trapPoint: "단순 데이터는 자료 결합도, 구조체나 객체 데이터 구조 전달은 스탬프 결합도입니다."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 0;
        for (int i = 1; i <= 5; i++) {
            a += (i % 2 == 0) ? i : -i;
        }
        System.out.println(a);
    }
}`,
      answer: "-3",
      aliases: ["-3"],
      explanation: "i가 짝수이면 +i, 홀수이면 -i를 더합니다:\n- i=1 (홀): -1\n- i=2 (짝): +2 -> 1\n- i=3 (홀): -3 -> -2\n- i=4 (짝): +4 -> 2\n- i=5 (홀): -5 -> -3\n따라서 최종 a는 -3입니다.",
      trapPoint: "홀수는 음수로, 짝수는 양수로 교대 부호 합산입니다.",
      traceTable: {
        headers: ["i", "짝/홀", "연산", "a 누적"],
        rows: [
          ["1", "홀수", "-1", "-1"],
          ["2", "짝수", "+2", "1"],
          ["3", "홀수", "-3", "-2"],
          ["4", "짝수", "+4", "2"],
          ["5", "홀수", "-5", "-3"]
        ]
      }
    },
    {
      id: 14,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 조회 결과의 레코드 수를 제한하여 상위 3건만 출력하도록 지정하는 절의 키워드를 쓰시오 (MySQL/PostgreSQL 기준).",
      passage: `SELECT * FROM MEMBER ORDER BY SCORE DESC (        ) 3;`,
      answer: "LIMIT",
      aliases: ["LIMIT", "limit"],
      explanation: "출력할 행의 개수를 제한하는 절은 `LIMIT n` 입니다.",
      trapPoint: "표준 및 널리 쓰이는 행 제한 키워드는 LIMIT입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40};
    int *p = &arr[2];
    printf("%d", p[-1]);
    return 0;
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "p가 arr[2](30)의 주소를 가리키고 있을 때, p[-1]은 *(p - 1)과 같으므로 arr[1]의 값인 20이 됩니다.",
      trapPoint: "C언어에서 포인터 음수 인덱스 p[-1]은 바로 앞 요소를 가리킵니다.",
      traceTable: {
        headers: ["포인터 p 위치", "음수 인덱스 식", "역참조 결과"],
        rows: [
          ["&arr[2] (값 30)", "p[-1] = *(p - 1)", "arr[1] = 20"]
        ]
      }
    },
    {
      id: 16,
      category: "단답형",
      prompt: "소프트웨어 개발 보안 용어로, 악의적인 사용자가 웹 애플리케이션의 게시판이나 댓글에 자바스크립트 등 악성 스크립트를 삽입하여 이를 열람하는 다른 사용자의 쿠키나 세션 토큰을 탈취하는 취약점의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "XSS",
      aliases: ["XSS", "xss", "Cross-Site Scripting", "크로스 사이트 스크립팅"],
      explanation: "XSS(Cross-Site Scripting)는 검증되지 않은 외부 입력 스크립트가 피해자 웹 브라우저에서 실행되어 정보를 탈취하는 공격입니다.",
      trapPoint: "CSRF(서버로의 위조 요청)와 XSS(클라이언트 브라우저에서의 스크립트 실행)를 구분하세요."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3]
b = [4, 5, 6]
print(list(zip(a, b))[0])`,
      answer: "(1, 4)",
      aliases: ["(1, 4)", "(1,4)", "1, 4"],
      explanation: "zip(a, b)는 두 리스트의 동일한 인덱스 원소를 쌍으로 묶어 튜플을 만듭니다: [(1, 4), (2, 5), (3, 6)].\n0번 인덱스 원소는 (1, 4) 입니다.",
      trapPoint: "zip 함수의 반환 요소는 튜플 (1, 4) 형태로 출력됩니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "소프트웨어 테스트 단계 중 단위 테스트(Unit Test)를 마친 컴포넌트들을 결합하여 인터페이스 간의 결함과 상호작용을 검증하는 테스트 단계의 명칭을 쓰시오.",
      answer: "통합 테스트",
      aliases: ["통합 테스트", "통합테스트", "Integration Test", "Integration Testing"],
      explanation: "V-모델 테스트 단계:\n- 단위 테스트 (모듈/단위 기능 검증)\n- 통합 테스트 (모듈 간 인터페이스 검증)\n- 시스템 테스트 (전체 시스템 비기능/기능 검증)\n- 인수 테스트 (사용자 요구사항 충족 검증)",
      trapPoint: "모듈 간의 결합 및 인터페이스 테스트는 통합 테스트(Integration Test)입니다."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10;
    int b = 20;
    a = a + b;
    b = a - b;
    a = a - b;
    printf("%d %d", a, b);
    return 0;
}`,
      answer: "20 10",
      aliases: ["20 10", "20, 10", "20,10"],
      explanation: "임시 변수(temp) 없이 덧셈과 뺄셈만을 이용하여 두 변수 a와 b의 값을 맞바꾸는(swap) 알고리즘입니다.\n1. a = 10 + 20 = 30\n2. b = 30 - 20 = 10 (원래 a값)\n3. a = 30 - 10 = 20 (원래 b값)\n출력: 20 10",
      trapPoint: "변수 값 스왑 알고리즘입니다.",
      traceTable: {
        headers: ["연산 단계", "a 값", "b 값"],
        rows: [
          ["초기", "10", "20"],
          ["a = a + b", "30", "20"],
          ["b = a - b", "30", "10"],
          ["a = a - b", "20", "10"]
        ]
      }
    },
    {
      id: 20,
      category: "단답형",
      prompt: "데이터베이스에서 데이터 무결성을 보장하기 위한 주요 무결성 제약조건 중, 외래키 값은 참조하는 릴레이션의 기본키 값과 일치하거나 NULL이어야 한다는 제약조건의 명칭을 쓰시오.",
      answer: "참조 무결성",
      aliases: ["참조 무결성", "참조무결성", "참조 무결성 제약조건", "Referential Integrity"],
      explanation: "참조 무결성(Referential Integrity)은 릴레이션 간의 일관성을 유지하기 위해 외래키가 참조할 수 없는 존재하지 않는 값을 참조하지 못하도록 제한하는 규칙입니다.",
      trapPoint: "기본키와 NULL 금지는 개체 무결성, 외래키와 참조 대상 일치는 참조 무결성입니다."
    }
  ]
};
