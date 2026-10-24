/**
 * 2026년 제2회 정보처리기사 실기 기출 예상 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2026_2"] = {
  id: "2026_2",
  title: "2026년 제2회 기출 예상/복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p1 = {10, 20};
    struct Point *ptr = &p1;
    ptr->x += 5;
    ptr->y *= 2;
    printf("%d, %d", p1.x, p1.y);
    return 0;
}`,
      answer: "15, 40",
      aliases: ["15, 40", "15,40", "15 40"],
      explanation: "ptr은 구조체 변수 p1의 메모리 주소를 가리키는 구조체 포인터입니다.\nptr->x는 p1.x를 의미하므로 p1.x = 10 + 5 = 15가 됩니다.\nptr->y는 p1.y를 의미하므로 p1.y = 20 * 2 = 40이 됩니다.\n출력 형식: '%d, %d'이므로 '15, 40'이 출력됩니다.",
      trapPoint: "구조체 포인터에서 멤버에 접근할 때 화살표 연산자(->)를 사용하는 문법과 원본 구조체 변수 p1의 값이 직접 변경된다는 점을 확인해야 합니다.",
      traceTable: {
        headers: ["연산 단계", "실행 코드", "p1.x 값", "p1.y 값"],
        rows: [
          ["초기화", "struct Point p1 = {10, 20}", "10", "20"],
          ["1단계", "ptr->x += 5", "15", "20"],
          ["2단계", "ptr->y *= 2", "15", "40"],
          ["출력", "printf('%d, %d', p1.x, p1.y)", "15", "40"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `interface A {
    int calculate(int n);
}

public class Main {
    public static void main(String[] args) {
        A obj = (n) -> n * n + 1;
        System.out.println(obj.calculate(4));
    }
}`,
      answer: "17",
      aliases: ["17"],
      explanation: "람다식 (n) -> n * n + 1은 함수형 인터페이스 A의 calculate 메서드를 구현한 것입니다.\ncalculate(4) 호출 시 n=4가 대입되어 4 * 4 + 1 = 17이 반환되어 출력됩니다.",
      trapPoint: "자바 8 이후 도입된 람다식(Lambda Expression) 기본 연산 결과를 정확히 계산합니다.",
      traceTable: {
        headers: ["인자 n", "람다 수식 n * n + 1", "반환값"],
        rows: [
          ["4", "4 * 4 + 1 = 16 + 1", "17"]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def func(a, *b):
    sum_val = a
    for x in b:
        sum_val += x * 2
    return sum_val

print(func(10, 1, 2, 3))`,
      answer: "22",
      aliases: ["22"],
      explanation: "1. 가변 인자 *b는 튜플로 패킹됩니다. a에는 첫 번째 인자 10이 들어가고, b에는 (1, 2, 3)이 들어갑니다.\n2. sum_val은 처음에 10입니다.\n3. x=1: sum_val += 1 * 2 -> 12\n4. x=2: sum_val += 2 * 2 -> 16\n5. x=3: sum_val += 3 * 2 -> 22\n따라서 22가 출력됩니다.",
      trapPoint: "가변 매개변수 *b가 첫 번째 인자(10)를 제외한 나머지 인자들(1, 2, 3)을 튜플로 받는다는 점에 유의하세요.",
      traceTable: {
        headers: ["루프 (x)", "연산 x * 2", "sum_val 누적"],
        rows: [
          ["초기", "a = 10", "10"],
          ["x = 1", "1 * 2 = 2", "12"],
          ["x = 2", "2 * 2 = 4", "16"],
          ["x = 3", "3 * 2 = 6", "22"]
        ]
      }
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int *p = &arr[0][0];
    int sum = 0;
    
    for (int i = 0; i < 6; i++) {
        if (i % 2 == 1) {
            sum += *(p + i);
        }
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "12",
      aliases: ["12"],
      explanation: "2차원 배열은 메모리 상에 1차원으로 연속 배치됩니다: {1, 2, 3, 4, 5, 6}.\np는 시작 주소(&arr[0][0])를 가리키므로 *(p + i)는 각 원소를 순서대로 접근합니다.\ni는 0부터 5까지 반복하며, i % 2 == 1인 홀수 인덱스는 i = 1, 3, 5 입니다.\n- i = 1: *(p + 1) = 2\n- i = 3: *(p + 3) = 4\n- i = 5: *(p + 5) = 6\nsum = 2 + 4 + 6 = 12 입니다.",
      trapPoint: "2차원 배열의 메모리 행 우선(Row-major) 연속 배치 구조와 홀수 인덱스(1, 3, 5)에 위치한 값의 합산임을 파악해야 합니다.",
      traceTable: {
        headers: ["인덱스 i", "홀수 조건", "원소 *(p + i)", "sum 누적"],
        rows: [
          ["i = 0", "거짓", "1", "0"],
          ["i = 1", "참", "2", "2"],
          ["i = 2", "거짓", "3", "2"],
          ["i = 3", "참", "4", "6"],
          ["i = 4", "거짓", "5", "6"],
          ["i = 5", "참", "6", "12"]
        ]
      }
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 두 테이블 [고객]과 [주문]을 고객번호를 기준으로 내부 조인(INNER JOIN)하여 고객명과 주문금액을 조회하는 SQL문을 완성하고자 한다. 빈칸 (1), (2)를 완성하시오.",
      passage: `SELECT C.고객명, O.주문금액 
FROM 고객 C 
(  1  ) JOIN 주문 O 
(  2  ) C.고객번호 = O.고객번호;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["INNER", "inner"],
        "2": ["ON", "on"]
      },
      answer: "(1) INNER, (2) ON",
      aliases: ["INNER ON", "INNER, ON", "inner on"],
      explanation: "표준 ANSI JOIN 문법은 `FROM 테이블1 INNER JOIN 테이블2 ON 조인조건` 형식입니다.",
      trapPoint: "WHERE절 대신 ANSI JOIN에서는 ON절을 사용하여 조인 조건을 명시합니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "인터넷이나 네트워크를 통해 인증 및 권한 부여를 표준화하기 위해 사용되는 개방형 표준 프로토콜로, 제3자 애플리케이션이 비밀번호를 노출하지 않고 사용자 자원에 대한 접근 권한을 위임받을 수 있도록 해주는 프로토콜의 명칭을 영문 또는 숫자를 포함하여 쓰시오.",
      answer: "OAuth 2.0",
      aliases: ["OAuth 2.0", "OAuth", "oauth", "OAuth2.0", "oauth 2.0", "오아스"],
      explanation: "OAuth(Open Authorization)는 사용자의 비밀번호 없이도 구글, 카카오, 깃허브 등 인증 제공자를 통해 안전하게 서드파티 앱에 인가 토큰(Access Token)을 발급하여 자원 접근 권한을 위임하는 프레임워크입니다.",
      trapPoint: "인증과 인가 표준 프로토콜로 현대 웹/앱에서 필수적인 개념입니다."
    },
    {
      id: 7,
      category: "단답형",
      prompt: "기존의 양자 컴퓨터 기술 발전에 따라 RSA, ECC 등 현대 공개키 암호체계가 취약해질 것에 대비하여, 양자 컴퓨터로도 해독하기 어렵도록 수학적 난제(격자, 다변수 다항식 등)를 기반으로 설계된 차세대 암호 기술의 명칭(영문 약어 3글자 또는 한글)을 쓰시오.",
      answer: "PQC",
      aliases: ["PQC", "pqc", "양자내성암호", "포스트양자암호", "Post-Quantum Cryptography"],
      explanation: "PQC(Post-Quantum Cryptography, 양자내성암호)는 쇼어(Shor) 알고리즘을 수행하는 양자 컴퓨터의 공격에도 안전성을 보장하는 차세대 암호 체계입니다.",
      trapPoint: "양자 키 분배(QKD)와 양자내성암호(PQC)의 차이점을 구별해야 합니다."
    },
    {
      id: 8,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int x : arr) {
            if (x == 30) continue;
            sum += x;
        }
        System.out.println(sum);
    }
}`,
      answer: "120",
      aliases: ["120"],
      explanation: "향상된 for문(for-each)으로 배열 arr의 원소를 순회합니다.\nx가 30일 때 continue로 건너뛰므로,\nsum = 10 + 20 + 40 + 50 = 120이 됩니다.",
      trapPoint: "x == 30일 때만 건너뛰고 나머지 원소는 모두 더해집니다.",
      traceTable: {
        headers: ["원소 x", "조건 (x == 30)", "sum 누적"],
        rows: [
          ["10", "거짓", "10"],
          ["20", "거짓", "30"],
          ["30", "참 (continue)", "30"],
          ["40", "거짓", "70"],
          ["50", "거짓", "120"]
        ]
      }
    },
    {
      id: 9,
      category: "단답형",
      prompt: "GoF 디자인 패턴 중 객체의 상태 변화가 발생했을 때 연관된 다른 객체들에게 통보하고 자동으로 갱신되도록 1:N 의존성을 정의하는 행위(Behavioral) 패턴의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "옵저버",
      aliases: ["옵저버", "옵저버 패턴", "옵서버", "Observer", "Observer Pattern", "observer"],
      explanation: "옵저버(Observer) 패턴은 발행-구독(Publish-Subscribe) 모델로 알려져 있으며, 주체 객체의 상태 변경을 감지하여 등록된 관찰자(Observer)들에게 자동으로 통보하는 패턴입니다.",
      trapPoint: "GoF 행위 패턴 중 이벤트 리스너의 기반이 되는 가장 대표적인 패턴입니다."
    },
    {
      id: 10,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char str[] = "KOREA";
    char *p = str;
    while (*p != '\\0') {
        p++;
    }
    printf("%d", (int)(p - str));
    return 0;
}`,
      answer: "5",
      aliases: ["5"],
      explanation: "1. str[]은 'K', 'O', 'R', 'E', 'A', '\\0'로 구성된 6바이트 문자열 배열입니다.\n2. p가 '\\0'(널 문자)를 만날 때까지 p++로 1바이트씩 이동합니다.\n3. '\\0'의 위치에서 멈췄을 때 p는 str + 5를 가리킵니다.\n4. 포인터 간의 뺄셈 p - str은 두 포인터 사이의 요소 개수를 계산하므로 (str + 5) - str = 5가 됩니다 (즉, 문자열의 길이 strlen과 동일).",
      trapPoint: "널 문자(\\0) 직전까지 순회한 포인터의 차이는 문자열의 순수 길이(5)를 의미합니다.",
      traceTable: {
        headers: ["포인터 p", "*p 문자", "조건 (*p != '\\0')", "p - str"],
        rows: [
          ["str + 0", "'K'", "참", "0"],
          ["str + 1", "'O'", "참", "1"],
          ["str + 2", "'R'", "참", "2"],
          ["str + 3", "'E'", "참", "3"],
          ["str + 4", "'A'", "참", "4"],
          ["str + 5", "'\\0'", "거짓 (루프 종료)", "5"]
        ]
      }
    },
    {
      id: 11,
      category: "단답형",
      prompt: "데이터베이스에서 하나의 논리적 작업 단위를 구성하는 연산들의 집합을 트랜잭션이라 한다. 트랜잭션이 가져야 할 4가지 특징(ACID) 중 '트랜잭션의 연산은 데이터베이스에 모두 반영되든지 아니면 전혀 반영되지 않아야 한다(All or Nothing)'는 특성의 명칭을 쓰시오.",
      answer: "원자성",
      aliases: ["원자성", "Atomicity", "atomicity"],
      explanation: "ACID 특징:\n- Atomicity (원자성): All or Nothing (전부 수행되거나 전부 취소)\n- Consistency (일관성): 완료 후 모순 없이 일관된 상태 유지\n- Isolation (독립성/격리성): 다른 트랜잭션이 끼어들지 못함\n- Durability (영속성): 성공 시 영구히 저장됨",
      trapPoint: "All or Nothing 키워드는 무조건 '원자성(Atomicity)'입니다."
    },
    {
      id: 12,
      category: "SQL",
      prompt: "데이터베이스 테이블에서 레코드의 중복을 허용하지 않고 고유한 값을 가져야 하며, NULL 값을 가질 수 없는 키(Key)의 명칭을 한글 또는 영문으로 쓰시오.",
      answer: "기본키",
      aliases: ["기본키", "기본 키", "Primary Key", "PRIMARY KEY", "PK"],
      explanation: "기본키(Primary Key)는 유일성(Uniqueness)과 최소성(Minimality)을 만족하며, 개체 무결성 제약조건에 의해 NULL 값을 절대 가질 수 없는 속성입니다.",
      trapPoint: "대체키나 후보키와 구별하여 테이블에서 튜플을 유일하게 식별하도록 주(Primary)로 선택된 키입니다."
    },
    {
      id: 13,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s = "Information"
print(s[2:6])`,
      answer: "form",
      aliases: ["form"],
      explanation: "파이썬 문자열 슬라이싱 s[2:6]은 인덱스 2부터 5(6 미만)까지를 추출합니다.\n인덱스: 0(I), 1(n), 2(f), 3(o), 4(r), 5(m), 6(a)...\n따라서 'form'이 출력됩니다.",
      trapPoint: "끝 인덱스 6은 포함되지 않고 5번째 문자인 'm'까지만 포함됩니다."
    },
    {
      id: 14,
      category: "단답형",
      prompt: "네트워크에서 내부 네트워크가 직접 외부 인터넷에 노출되지 않도록 사설 IP 주소를 공인 IP 주소로 상호 변환해 주는 기술의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "NAT",
      aliases: ["NAT", "nat", "Network Address Translation"],
      explanation: "NAT(Network Address Translation, 네트워크 주소 변환)는 사설 IP를 공인 IP로 변환하여 IPv4 주소 부족 문제를 완화하고 내부망 보안을 향상시키는 기술입니다.",
      trapPoint: "IP 주소를 동적으로 할당하는 프로토콜은 DHCP이고, 사설-공인 IP 변환 기술은 NAT입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 5;
        int b = 2;
        double result = (double) a / b;
        System.out.printf("%.1f", result);
    }
}`,
      answer: "2.5",
      aliases: ["2.5"],
      explanation: "(double) a / b 연산에서 a가 double 타입 5.0으로 명시적 형변환된 후 2로 나누어지므로 2.5가 됩니다.\nprintf(\"%.1f\", result)는 소수점 첫째 자리까지 출력하므로 2.5가 출력됩니다.",
      trapPoint: "정수 나눗셈 a / b는 2이지만, (double)로 캐스팅되어 실수 연산이 수행되므로 2.5가 됩니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "소프트웨어 결함 관리 프로세스에서 발생한 결함이 수정되었는지를 확인하기 위해, 수정된 소프트웨어 버전에 대해 이전에 성공했던 테스트 케이스들을 다시 실행하여 새로운 오류(사이드 이펙트)가 발생하지 않았는지 검증하는 테스트 기법의 명칭을 쓰시오.",
      answer: "회귀 테스트",
      aliases: ["회귀 테스트", "회귀테스트", "리그레션 테스트", "Regression Test", "Regression Testing"],
      explanation: "회귀 테스트(Regression Testing)는 오류 수정이나 기능 변경 후 기존에 잘 작동하던 기능에 부작용(Side Effect)이 발생하지 않았는지를 확인하기 위해 반복 수행하는 재시험입니다.",
      trapPoint: "새로운 결함 유입 여부를 재확인하는 테스트 = 회귀 테스트(Regression Test)."
    },
    {
      id: 17,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int n = 1234;
    int rev = 0;
    while (n > 0) {
        rev = rev * 10 + (n % 10);
        n /= 10;
    }
    printf("%d", rev);
    return 0;
}`,
      answer: "4321",
      aliases: ["4321"],
      explanation: "각 자릿수를 10으로 나눈 나머지(n % 10)를 구하여 rev에 10을 곱하며 누적하므로 숫자가 거꾸로 뒤집힙니다.\n1234 -> 4 -> 43 -> 432 -> 4321\n출력 결과는 4321 입니다.",
      trapPoint: "기본적인 정수 자릿수 반전 알고리즘입니다.",
      traceTable: {
        headers: ["반복", "n % 10", "rev 누적 (rev*10 + rest)", "n = n / 10"],
        rows: [
          ["1회", "4", "4", "123"],
          ["2회", "3", "43", "12"],
          ["3회", "2", "432", "1"],
          ["4회", "1", "4321", "0 (종료)"]
        ]
      }
    },
    {
      id: 18,
      category: "단답형",
      prompt: "소프트웨어 아키텍처 및 디자인 원칙(SOLID) 중 '하위 클래스는 상위 클래스의 기능을 온전히 대체할 수 있어야 한다(자식 클래스는 언제나 부모 클래스를 대체할 수 있어야 함)'는 원칙의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "리스코프 치환 원칙",
      aliases: ["리스코프 치환 원칙", "리스코프치환원칙", "LSP", "Liskov Substitution Principle"],
      explanation: "SOLID 원칙:\n- S: 단일 책임 원칙 (SRP)\n- O: 개방-폐쇄 원칙 (OCP)\n- L: 리스코프 치환 원칙 (LSP)\n- I: 인터페이스 분리 원칙 (ISP)\n- D: 의존 역전 원칙 (DIP)",
      trapPoint: "부모 클래스의 계약을 자식 클래스가 위반하지 않고 교체 가능해야 한다는 것은 LSP(리스코프 치환 원칙)입니다."
    },
    {
      id: 19,
      category: "SQL",
      prompt: "다음 [도서] 테이블에서 가격(PRICE)이 15000원 이상이고 30000원 이하인 도서명(TITLE)을 조회하는 SQL문이다. 빈칸에 들어갈 키워드를 쓰시오.",
      passage: `SELECT TITLE 
FROM 도서 
WHERE PRICE (        ) 15000 AND 30000;`,
      answer: "BETWEEN",
      aliases: ["BETWEEN", "between"],
      explanation: "범위 검색 연산자는 `BETWEEN A AND B`로 A 이상 B 이하의 범위를 조건으로 지정합니다.",
      trapPoint: "AND 연산자와 짝을 이루는 범위 연산자 키워드는 BETWEEN입니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "OSI 7계층 중 종단 간(End-to-End)의 신뢰성 있는 데이터 전송을 보장하며, 흐름 제어(Flow Control), 혼잡 제어(Congestion Control), 오류 제어를 수행하는 전송 단위가 세그먼트(Segment)인 계층의 명칭을 쓰시오.",
      answer: "전송 계층",
      aliases: ["전송 계층", "전송계층", "Transport Layer", "Transport", "4계층"],
      explanation: "전송 계층(Transport Layer)은 OSI 4계층으로 대표 프로토콜로 TCP, UDP가 있으며, 신뢰성 있는 데이터 전송과 포트 번호를 통한 프로세스 식별을 담당합니다.",
      trapPoint: "3계층 네트워크(패킷, 라우터)와 혼동하지 않도록 세그먼트 단위와 TCP/UDP 프로토콜 계층임을 확인하세요."
    }
  ]
};
