/**
 * 2025년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2025_3"] = {
  id: "2025_3",
  title: "2025년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int fibo(int n) {
    if (n <= 1) return n;
    return fibo(n - 1) + fibo(n - 2);
}

int main() {
    printf("%d", fibo(6));
    return 0;
}`,
      answer: "8",
      aliases: ["8"],
      explanation: "피보나치 수열 재귀함수입니다.\nfibo(0)=0, fibo(1)=1, fibo(2)=1, fibo(3)=2, fibo(4)=3, fibo(5)=5, fibo(6)=8.\n따라서 8이 출력됩니다.",
      trapPoint: "fibo(0)=0, fibo(1)=1부터 시작하여 N번째 항의 값을 차례로 도출합니다.",
      traceTable: {
        headers: ["n", "fibo(n) 전개", "값"],
        rows: [
          ["0", "fibo(0)", "0"],
          ["1", "fibo(1)", "1"],
          ["2", "fibo(1) + fibo(0)", "1"],
          ["3", "fibo(2) + fibo(1)", "2"],
          ["4", "fibo(3) + fibo(2)", "3"],
          ["5", "fibo(4) + fibo(3)", "5"],
          ["6", "fibo(5) + fibo(4)", "8"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Base {
    public void print() {
        System.out.print("Base ");
    }
}

class Derived extends Base {
    @Override
    public void print() {
        System.out.print("Derived ");
    }
    public void print(String msg) {
        System.out.print(msg + " ");
    }
}

public class Main {
    public static void main(String[] args) {
        Base b = new Derived();
        b.print();
        Derived d = (Derived) b;
        d.print("Hello");
    }
}`,
      answer: "Derived Hello",
      aliases: ["Derived Hello", "Derived Hello ", "Derived, Hello"],
      explanation: "1. Base b = new Derived(): b.print()는 오버라이딩된 Derived의 print()가 호출되어 \"Derived \"를 출력합니다.\n2. Derived d = (Derived) b: 다운캐스팅 후 오버로딩된 print(\"Hello\")가 호출되어 \"Hello \"를 출력합니다.\n3. 결과: \"Derived Hello \"",
      trapPoint: "다형성 오버라이딩 메서드 호출과 오버로딩 메서드의 차이를 이해해야 합니다.",
      traceTable: {
        headers: ["단계", "호출 메서드", "출력"],
        rows: [
          ["1", "b.print() (오버라이딩)", "Derived "],
          ["2", "d.print('Hello') (오버로딩)", "Hello "]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [10, 20, 30, 40, 50]
a.pop(1)
a.append(60)
print(len(a), a[-1])`,
      answer: "5 60",
      aliases: ["5 60", "5, 60", "5,60"],
      explanation: "1. a.pop(1)은 1번 인덱스 원소인 20을 삭제하여 a = [10, 30, 40, 50]이 됩니다.\n2. a.append(60)으로 맨 끝에 60이 추가되어 a = [10, 30, 40, 50, 60]이 됩니다.\n3. len(a)는 5이고, 맨 마지막 원소 a[-1]은 60입니다.\n출력: 5 60",
      trapPoint: "pop(1)은 인덱스 1의 값을 삭제한다는 점과 append는 맨 끝에 추가한다는 점을 확인합니다.",
      traceTable: {
        headers: ["단계", "수행 연산", "리스트 상태", "길이 len(a)"],
        rows: [
          ["초기", "초기화", "[10, 20, 30, 40, 50]", "5"],
          ["1", "pop(1)", "[10, 30, 40, 50]", "4"],
          ["2", "append(60)", "[10, 30, 40, 50, 60]", "5"]
        ]
      }
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {4, 2, 8, 5, 1};
    int len = sizeof(arr) / sizeof(arr[0]);
    int max = arr[0];
    
    for (int i = 1; i < len; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    printf("%d", max);
    return 0;
}`,
      answer: "8",
      aliases: ["8"],
      explanation: "배열에서 최댓값을 찾는 전형적인 선형 탐색 알고리즘입니다.\n원소: 4, 2, 8, 5, 1 중 가장 큰 값은 8이므로 8이 출력됩니다.",
      trapPoint: "기본적인 최댓값 갱신 루프입니다.",
      traceTable: {
        headers: ["인덱스 i", "원소 arr[i]", "arr[i] > max 조건", "max 갱신"],
        rows: [
          ["초기", "arr[0] = 4", "-", "4"],
          ["i = 1", "2", "거짓 (2 > 4)", "4"],
          ["i = 2", "8", "참 (8 > 4)", "8"],
          ["i = 3", "5", "거짓 (5 > 8)", "8"],
          ["i = 4", "1", "거짓 (1 > 8)", "8"]
        ]
      }
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 [EMP] 테이블에서 부서(DEPT)별 급여(SALARY)의 합계를 구하는 SQL 문이다. 빈칸 (1), (2)에 들어갈 올바른 키워드를 쓰시오.",
      passage: `SELECT DEPT, (  1  )(SALARY) 
FROM EMP 
(  2  ) DEPT;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["SUM", "sum"],
        "2": ["GROUP BY", "group by"]
      },
      answer: "(1) SUM, (2) GROUP BY",
      aliases: ["SUM, GROUP BY", "SUM GROUP BY", "sum group by"],
      explanation: "합계를 구하는 집계 함수는 SUM()이며, 그룹화할 때 사용하는 절은 GROUP BY입니다.",
      trapPoint: "합계는 SUM, 평균은 AVG입니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "네트워크 통신망에서 패킷이 지나치게 많아져 통신망의 성능이 저하되는 현상을 방지하기 위해 데이터 전송량을 제어하는 기법의 명칭을 쓰시오.",
      answer: "혼잡 제어",
      aliases: ["혼잡 제어", "혼잡제어", "Congestion Control", "흐름제어"],
      explanation: "혼잡 제어(Congestion Control)는 네트워크 내의 모든 패킷 수를 조절하여 네트워크 오버플로우나 지연을 방지하는 기술입니다 (Slow Start, Congestion Avoidance 등).",
      trapPoint: "송신측과 수신측 간의 속도 차이를 조절하는 것은 '흐름 제어(Flow Control)', 네트워크 전체의 트래픽을 조절하는 것은 '혼잡 제어'입니다."
    },
    {
      id: 7,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        for (int j = 1; j <= i; j++) {
            sum += 1;
        }
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "이중 루프로 i가 1일 때 1번, 2일 때 2번, 3일 때 3번, 4일 때 4번, 5일 때 5번 반복됩니다.\n총 실행 횟수 = 1 + 2 + 3 + 4 + 5 = 15.\n따라서 sum = 15입니다.",
      trapPoint: "1부터 n까지의 합 공식 n(n+1)/2 = 5 * 6 / 2 = 15와 동일합니다.",
      traceTable: {
        headers: ["i 값", "j 반복 범위", "j 반복 횟수", "sum 누적"],
        rows: [
          ["i = 1", "j = 1", "1회", "1"],
          ["i = 2", "j = 1, 2", "2회", "3"],
          ["i = 3", "j = 1, 2, 3", "3회", "6"],
          ["i = 4", "j = 1..4", "4회", "10"],
          ["i = 5", "j = 1..5", "5회", "15"]
        ]
      }
    },
    {
      id: 8,
      category: "단답형",
      prompt: "암호화 기술 중 암호화 키와 복호화 키가 서로 동일하여 처리 속도가 빠르지만 키 분배 및 관리가 어려운 대칭키 암호화 알고리즘의 대표적인 표준(128비트 블록 암호)의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "AES",
      aliases: ["AES", "aes", "Advanced Encryption Standard"],
      explanation: "AES(Advanced Encryption Standard)는 미국 NIST에서 DES를 대체하기 위해 제정한 현대 대표 대칭키 블록 암호화 알고리즘입니다.",
      trapPoint: "비대칭키는 RSA, ECC이고, 대칭키의 대표 표준은 AES, DES, ARIA, SEED입니다."
    },
    {
      id: 9,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 15;
        int b = 4;
        System.out.println(a % b + a / b);
    }
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "1. 15 % 4는 15를 4로 나눈 나머지이므로 3입니다.\n2. 15 / 4는 정수 나눗셈의 몫이므로 3입니다.\n3. 3 + 3 = 6이 출력됩니다.",
      trapPoint: "자바 정수 나눗셈에서 소수점이 버려진다는 점을 주의하세요."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "데이터베이스 설계 4단계(개념적 설계 -> 논리적 설계 -> 물리적 설계 -> 구현) 중 트랜잭션 인터페이스 설계 및 목표 DBMS에 맞는 스키마(테이블, 정규화 등)를 설계하는 단계의 명칭을 쓰시오.",
      answer: "논리적 설계",
      aliases: ["논리적 설계", "논리적설계", "논리적 설계 단계", "Logical Design"],
      explanation: "논리적 설계 단계에서는 개념적 설계에서 도출된 E-R 다이어그램을 관계형 테이블 스키마로 매핑하고, 정규화를 수행하며, 트랜잭션 인터페이스를 설계합니다.",
      trapPoint: "개념적(E-R 모델) -> 논리적(정규화, 테이블 매핑) -> 물리적(인덱스, 파티션, 저장구조) 흐름을 기억하세요."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def add(x, y=10):
    return x + y

print(add(5), add(5, 20))`,
      answer: "15 25",
      aliases: ["15 25", "15, 25", "15,25"],
      explanation: "1. add(5): y 기본값(default value) 10이 사용되어 5 + 10 = 15가 됩니다.\n2. add(5, 20): y에 20이 명시되어 5 + 20 = 25가 됩니다.\n출력: 15 25",
      trapPoint: "디폴트 매개변수의 동작 방식을 파악합니다."
    },
    {
      id: 12,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = ++a + 2;
    int c = a++ + 2;
    printf("%d %d %d", a, b, c);
    return 0;
}`,
      answer: "7 8 8",
      aliases: ["7 8 8", "7, 8, 8", "7,8,8"],
      explanation: "1. a = 5\n2. ++a: a가 먼저 6이 되고, 6 + 2 = 8이 되어 b = 8\n3. a++ + 2: 현재 a(6) + 2 = 8이 되어 c = 8이 된 후 a가 7로 증가함\n4. 최종 a = 7, b = 8, c = 8\n출력: 7 8 8",
      trapPoint: "전위 증감자(++a)와 후위 증감자(a++)의 평가 시점 차이를 명확히 구분해야 합니다.",
      traceTable: {
        headers: ["연산식", "a의 변화", "계산된 대입값"],
        rows: [
          ["초기상태", "a = 5", "-"],
          ["b = ++a + 2", "a: 5 -> 6 (선증가)", "b = 6 + 2 = 8"],
          ["c = a++ + 2", "a: 6 -> 7 (후증가)", "c = 6 + 2 = 8"],
          ["출력", "a=7, b=8, c=8", "7 8 8"]
        ]
      }
    },
    {
      id: 13,
      category: "단답형",
      prompt: "소프트웨어 개발 보안 용어로, 악의적인 사용자가 웹 브라우저 주소창이나 입력 양식에 SQL 특수문자를 주입하여 비인가된 데이터베이스 조작을 수행하는 대표적인 웹 취약점의 명칭을 쓰시오.",
      answer: "SQL 삽입",
      aliases: ["SQL 삽입", "SQL Injection", "sql injection", "SQL 인젝션", "sql 인젝션"],
      explanation: "SQL 삽입(SQL Injection) 공격은 사용자의 입력값을 검증하지 않고 동적 SQL을 조합할 때 악의적인 쿼리를 삽입하여 데이터 유출이나 테이블 삭제를 유발하는 공격입니다.",
      trapPoint: "PreparedStatement(매개변수화된 쿼리)를 사용하여 방어합니다."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "기존 [MEMBER] 테이블에서 나이(AGE)가 20세 미만인 회원을 완전히 삭제하는 SQL DML 문을 완성하시오.",
      code: `(  1  ) FROM MEMBER WHERE AGE < 20;`,
      answer: "DELETE",
      aliases: ["DELETE", "delete"],
      explanation: "테이블의 데이터를 삭제하는 DML 문법은 `DELETE FROM 테이블명 WHERE 조건;` 입니다.",
      trapPoint: "테이블 자체를 삭제하는 DDL은 DROP TABLE이고, 행(레코드) 데이터를 삭제하는 DML은 DELETE입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3};
        try {
            System.out.print(arr[3]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.print("Error");
        } finally {
            System.out.print("Done");
        }
    }
}`,
      answer: "ErrorDone",
      aliases: ["ErrorDone", "Error Done", "Error, Done"],
      explanation: "arr의 유효 인덱스는 0, 1, 2입니다. arr[3] 접근 시 ArrayIndexOutOfBoundsException이 발생하여 catch 블록의 \"Error\"가 출력됩니다.\nfinally 블록은 예외 발생 여부와 상관없이 항상 실행되므로 \"Done\"이 출력됩니다.\n최종 출력: ErrorDone",
      trapPoint: "finally 블록은 예외 발생 및 처리 후에도 반드시 실행된다는 점을 잊지 마세요."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "라우팅 프로토콜 중 최단 경로 우선(Shortest Path First) 알고리즘인 다익스트라(Dijkstra) 알고리즘을 사용하며, 링크 상태(Link State) 기반으로 동작하는 대표적인 내부 라우팅 프로토콜의 명칭(영문 약어 4글자)을 쓰시오.",
      answer: "OSPF",
      aliases: ["OSPF", "ospf", "Open Shortest Path First"],
      explanation: "OSPF(Open Shortest Path First)는 대규모 자율시스템(AS) 내부에서 사용되는 링크 상태 라우팅 프로토콜로, 다익스트라 알고리즘으로 최단 경로 트리를 구성합니다.",
      trapPoint: "거리 벡터 프로토콜인 RIP(Hop count 기반)와 링크 상태 프로토콜인 OSPF(Dijkstra 기반)를 구분해야 합니다."
    },
    {
      id: 17,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10, b = 20;
    int max = (a > b) ? a : b;
    printf("%d", max);
    return 0;
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "삼항 조건 연산자 (조건) ? 참일때 : 거짓일때 입니다.\n10 > 20은 거짓이므로 b(20)가 선택되어 max에 대입됩니다.\n출력: 20",
      trapPoint: "삼항 조건 연산자의 기본 구조입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "인터넷 계층의 프로토콜로 호스트가 자신의 IP 주소는 알고 있으나 상대방의 MAC 주소(하드웨어 주소)를 모를 때, IP 주소로부터 MAC 주소를 조회하기 위해 브로드캐스트로 질의하는 프로토콜의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "ARP",
      aliases: ["ARP", "arp", "Address Resolution Protocol"],
      explanation: "ARP(Address Resolution Protocol)는 논리적 IP 주소를 물리적 MAC 주소로 변환하는 프로토콜입니다 (반대는 RARP).",
      trapPoint: "IP -> MAC 변환은 ARP이고, MAC -> IP 변환은 RARP입니다."
    },
    {
      id: 19,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def calc(n):
    if n <= 0:
        return 0
    return n + calc(n - 2)

print(calc(5))`,
      answer: "9",
      aliases: ["9"],
      explanation: "calc(5) = 5 + calc(3)\ncalc(3) = 3 + calc(1)\ncalc(1) = 1 + calc(-1)\ncalc(-1) = 0 (종료 조건)\n따라서 calc(5) = 5 + 3 + 1 + 0 = 9 입니다.",
      trapPoint: "재귀 호출 인자가 n - 2로 2씩 감소한다는 점에 주의합니다.",
      traceTable: {
        headers: ["함수 호출", "전개 식", "결과"],
        rows: [
          ["calc(5)", "5 + calc(3)", "5 + 4 = 9"],
          ["calc(3)", "3 + calc(1)", "3 + 1 = 4"],
          ["calc(1)", "1 + calc(-1)", "1 + 0 = 1"],
          ["calc(-1)", "종료조건 (n<=0)", "0"]
        ]
      }
    },
    {
      id: 20,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 가장 결합도가 강하여 품질 측면에서 가장 바람직하지 않은 것으로, 한 모듈이 다른 모듈의 내부 논리나 데이터를 직접 참조하거나 수정할 때 발생하는 결합도의 명칭을 쓰시오.",
      answer: "내용 결합도",
      aliases: ["내용 결합도", "내용결합도", "Content Coupling", "content coupling"],
      explanation: "결합도 강도 순서 (낮을수록 좋음):\n자료(Data) < 스탬프(Stamp) < 제어(Control) < 외부(External) < 공통(Common) < 내용(Content)\n내용 결합도는 최고 강도로 가장 나쁩니다.",
      trapPoint: "모듈의 내부 자료나 코드를 직접 조작하는 최고 강도의 결합도는 '내용 결합도'입니다."
    }
  ]
};
