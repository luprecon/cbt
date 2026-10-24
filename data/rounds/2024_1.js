/**
 * 2024년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2024_1"] = {
  id: "2024_1",
  title: "2024년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class StaticTest {
    static int a = 10;
    int b = 20;
    
    void add() {
        a += 10;
        b += 10;
    }
}

public class Main {
    public static void main(String[] args) {
        StaticTest s1 = new StaticTest();
        StaticTest s2 = new StaticTest();
        s1.add();
        s2.add();
        System.out.println(s1.a + " " + s1.b);
    }
}`,
      answer: "30 30",
      aliases: ["30 30", "30, 30", "30,30"],
      explanation: "1. static int a는 모든 객체가 공유합니다 (초기값 10).\n2. int b는 객체마다 독립적입니다 (초기값 20).\n3. s1.add() 호출:\n   - static a: 10 -> 20\n   - s1.b: 20 -> 30\n4. s2.add() 호출:\n   - static a: 20 -> 30\n   - s2.b: 20 -> 30\n5. s1.a는 공유 변수이므로 30이고, s1.b는 30입니다.\n출력: 30 30",
      trapPoint: "static 변수는 객체 생성에 상관없이 단 하나의 메모리 공간을 공유하므로 10 -> 20 -> 30으로 누적됩니다.",
      traceTable: {
        headers: ["단계", "실행 코드", "static a", "s1.b", "s2.b"],
        rows: [
          ["초기화", "인스턴스 생성", "10", "20", "20"],
          ["1단계", "s1.add()", "20", "30", "20"],
          ["2단계", "s2.add()", "30", "30", "30"],
          ["출력", "s1.a + ' ' + s1.b", "30", "30", "-"]
        ]
      }
    },
    {
      id: 2,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p = arr;
    printf("%d", *(p + 3) + *(p + 1));
    return 0;
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "*(p + 3)은 arr[3]의 값인 4입니다.\n*(p + 1)은 arr[1]의 값인 2입니다.\n4 + 2 = 6이 출력됩니다.",
      trapPoint: "배열 인덱스는 0부터 시작하므로 arr[3]은 4번째 원소인 4, arr[1]은 2번째 원소인 2입니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def calc(x):
    return x * 2 if x > 5 else x + 5

print(calc(4), calc(7))`,
      answer: "9 14",
      aliases: ["9 14", "9, 14", "9,14"],
      explanation: "파이썬 삼항 표현식 `A if condition else B`:\n1. calc(4): 4 > 5가 거짓이므로 4 + 5 = 9\n2. calc(7): 7 > 5가 참이므로 7 * 2 = 14\n출력: 9 14",
      trapPoint: "파이썬의 인라인 if-else 조건문 평가 순서입니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 [직원] 테이블과 [부서] 테이블을 조인하여 부서코드가 일치하지 않는 직원까지 모두 포함하여 조회하기 위해 사용하는 외부 조인의 명칭(영문)을 쓰시오.",
      passage: `SELECT E.이름, D.부서명 
FROM 직원 E 
(  1  ) (  2  ) JOIN 부서 D 
ON E.부서코드 = D.부서코드;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["LEFT", "left"],
        "2": ["OUTER", "outer"]
      },
      answer: "(1) LEFT, (2) OUTER",
      aliases: ["LEFT OUTER", "left outer", "LEFT OUTER JOIN"],
      explanation: "직원(좌측 테이블)을 기준으로 부서가 매칭되지 않는 직원까지 모두 보존하여 출력하려면 LEFT OUTER JOIN을 사용합니다.",
      trapPoint: "왼쪽 기준 보존 조인은 LEFT OUTER JOIN입니다."
    },
    {
      id: 5,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 5; i++) {
        if (i == 3) continue;
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "12",
      aliases: ["12"],
      explanation: "1부터 5까지의 수 중 i가 3일 때 continue로 건너뜁니다.\n1 + 2 + 4 + 5 = 12.\n따라서 12가 출력됩니다.",
      trapPoint: "i == 3일 때의 덧셈만 제외됩니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "애자일(Agile) 소프트웨어 개발 방법론의 핵심 프레임워크 중 하나로, 스프린트(Sprint), 일일 스크럼 미팅(Daily Scrum), 백로그(Backlog), 스크럼 마스터(Scrum Master) 등의 역할을 중심으로 기민하게 개발을 진행하는 방법론의 명칭을 쓰시오.",
      answer: "스크럼",
      aliases: ["스크럼", "스크럼 방법론", "Scrum", "scrum"],
      explanation: "스크럼(Scrum)은 짧은 반복 주기(Sprint)를 통해 요구사항 변경에 유연하게 대처하며 완성도 높은 결과물을 점진적으로 출시하는 애자일 방법론입니다.",
      trapPoint: "XP, 칸반과 더불어 애자일의 가장 대표적인 프레임워크입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int res = a > b ? a - b : b - a;
        System.out.println(res);
    }
}`,
      answer: "10",
      aliases: ["10"],
      explanation: "10 > 20은 거짓이므로 b - a = 20 - 10 = 10이 계산됩니다.\n출력: 10",
      trapPoint: "두 수의 절댓값 차이를 계산하는 삼항 연산자 로직입니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "네트워크 관리 프로토콜로, 네트워크 장비(라우터, 스위치, 서버 등)의 동작 상태 및 통신 정보를 모니터링하고 제어하기 위해 UDP 161/162번 포트를 사용하는 인터넷 표준 관리 프로토콜의 명칭(영문 약어 4글자)을 쓰시오.",
      answer: "SNMP",
      aliases: ["SNMP", "snmp", "Simple Network Management Protocol"],
      explanation: "SNMP(Simple Network Management Protocol)는 네트워크 관리자(Manager)와 장비 에이전트(Agent) 간에 관리 정보(MIB)를 교환하는 프로토콜입니다.",
      trapPoint: "네트워크 관리 프로토콜 = SNMP."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int n = 5;
    int fact = 1;
    for (int i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("%d", fact);
    return 0;
}`,
      answer: "120",
      aliases: ["120"],
      explanation: "5!(팩토리얼)을 구하는 반복문입니다.\n1 * 2 * 3 * 4 * 5 = 120이 출력됩니다.",
      trapPoint: "5! = 120."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "데이터베이스에서 둘 이상의 트랜잭션이 서로가 점유하고 있는 자원의 잠금(Lock)이 해제되기를 무한정 대기하여 더 이상 처리가 진행되지 못하는 교착 상태의 영문 명칭을 쓰시오.",
      answer: "Deadlock",
      aliases: ["Deadlock", "deadlock", "데드락", "교착상태", "교착 상태"],
      explanation: "교착상태(Deadlock)는 상호 배제, 점유와 대기, 비선점, 환형 대기의 4가지 조건이 동시에 충족될 때 발생합니다.",
      trapPoint: "영문 데드락(Deadlock) 또는 한글 교착상태입니다."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = "2024-04-14"
print(a.replace("-", "/"))`,
      answer: "2024/04/14",
      aliases: ["2024/04/14"],
      explanation: "문자열 내의 모든 '-' 문자를 '/'로 치환하므로 '2024/04/14'가 출력됩니다.",
      trapPoint: "파이썬 replace 메서드는 일치하는 모든 하위 문자열을 치환합니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling)의 유형 중 두 모듈이 매개변수로 단순한 자료값(원시 타입)만을 주고받는 가장 결합도가 낮고(약하고) 독립성이 우수한 결합도의 명칭을 쓰시오.",
      answer: "자료 결합도",
      aliases: ["자료 결합도", "자료결합도", "Data Coupling", "data coupling"],
      explanation: "자료 결합도(Data Coupling)는 모듈 간 인터페이스가 단순한 데이터 파라미터로만 구성되어 모듈 간 종속성이 가장 적은 가장 바람직한 결합도입니다.",
      trapPoint: "최고의 결합도(가장 약함) = 자료 결합도, 최악의 결합도(가장 강함) = 내용 결합도."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String str = "Hello";
        str.concat(" World");
        System.out.println(str);
    }
}`,
      answer: "Hello",
      aliases: ["Hello"],
      explanation: "자바의 String 객체는 불변(Immutable) 객체입니다.\nstr.concat(\" World\")는 새로운 문자열 객체를 반환할 뿐, str 변수 자체가 가리키는 원본 객체를 수정하지 않습니다 (재할당 str = str.concat(...)을 하지 않음).\n따라서 str은 여전히 \"Hello\"입니다.",
      trapPoint: "자바 String 클래스의 불변성(Immutability)에 관한 주요 출제 포인트입니다.",
      traceTable: {
        headers: ["단계", "코드", "설명", "str 변수 값"],
        rows: [
          ["1", "str = 'Hello'", "새 String 객체 참조", "'Hello'"],
          ["2", "str.concat(' World')", "새 객체 생성되나 반환값을 받지 않음", "'Hello' 유지"],
          ["3", "System.out.println(str)", "출력", "Hello"]
        ]
      }
    },
    {
      id: 14,
      category: "SQL",
      prompt: "다음 SQL 문의 빈칸에 들어갈 키워드를 쓰시오. 테이블 구조를 삭제할 때 참조하고 있는 외래키나 연관된 뷰, 제약조건까지 연쇄적으로 함께 삭제하도록 지정하는 옵션이다.",
      passage: `DROP TABLE STUDENT (        );`,
      answer: "CASCADE",
      aliases: ["CASCADE", "cascade", "카스케이드"],
      explanation: "CASCADE 옵션은 참조하고 있는 다른 모든 객체(외래키, 뷰 등)를 연쇄적으로 함께 삭제합니다. 반대로 참조 중인 객체가 있으면 삭제를 취소하는 옵션은 RESTRICT입니다.",
      trapPoint: "연쇄 삭제 옵션은 CASCADE, 참조 시 거부 옵션은 RESTRICT입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    printf("%d ", *p++);
    printf("%d", *p);
    return 0;
}`,
      answer: "10 20",
      aliases: ["10 20", "10, 20", "10,20"],
      explanation: "1. *p++는 후위 증가 연산자가 적용되므로 먼저 현재 p가 가리키는 arr[0]의 값(10)을 역참조하여 출력한 뒤 p가 다음 위치(arr[1])로 증가합니다.\n2. 두 번째 printf에서 *p는 증가된 위치인 arr[1]의 값(20)을 출력합니다.\n출력: 10 20",
      trapPoint: "*p++와 (*p)++의 차이를 알아야 합니다. *p++는 포인터 주소가 1칸 증가합니다.",
      traceTable: {
        headers: ["순서", "표현식", "역참조 값", "연산 후 p 위치"],
        rows: [
          ["1번째 printf", "*p++", "10", "arr[1]로 이동"],
          ["2번째 printf", "*p", "20", "arr[1] 유지"]
        ]
      }
    },
    {
      id: 16,
      category: "단답형",
      prompt: "소프트웨어 아키텍처 패턴 중 대화형 애플리케이션을 세 가지 구성요소인 데이터 및 비즈니스 로직(Model), 사용자 인터페이스(View), 사용자 입력을 처리하여 모델과 뷰를 갱신하는 제어기(Controller)로 분리하는 패턴의 영문 약어(3글자)를 쓰시오.",
      answer: "MVC",
      aliases: ["MVC", "mvc", "Model-View-Controller", "MVC 패턴"],
      explanation: "MVC 패턴은 Model(데이터/로직), View(UI 화면), Controller(흐름 제어)의 독립성을 부여하여 유지보수성을 극대화하는 아키텍처 패턴입니다.",
      trapPoint: "소프트웨어 아키텍처 패턴의 기본인 MVC 패턴입니다."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
      answer: "4",
      aliases: ["4"],
      explanation: "파이썬에서 `y = x`는 리스트의 얕은 복사(참조 복사)이므로 x와 y는 동일한 힙 메모리 객체를 가리킵니다.\ny.append(4)를 하면 원본 객체에 4가 추가되므로 x도 [1, 2, 3, 4]가 됩니다.\nlen(x)는 4입니다.",
      trapPoint: "파이썬 객체 참조 할당의 특성입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "TCP/IP 프로토콜 중 IP 패킷 전송 중 발생하는 에러 보고(예: 목적지 도달 불가)나 네트워크 상태 진단(ping, traceroute 등)을 위해 사용하는 인터넷 제어 메시지 프로토콜의 명칭(영문 약어 4글자)을 쓰시오.",
      answer: "ICMP",
      aliases: ["ICMP", "icmp", "Internet Control Message Protocol"],
      explanation: "ICMP(Internet Control Message Protocol)는 IP 프로토콜의 신뢰성 부재를 보완하기 위해 제어 및 에러 메시지를 송신하는 프로토콜로 ping 명령의 기반입니다.",
      trapPoint: "ping 명령어에 사용되는 진단 프로토콜 = ICMP."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            a += 1;
        }
    }
    printf("%d", a);
    return 0;
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "외부 루프 3회 * 내부 루프 2회 = 총 6회 반복됩니다.\na에 1씩 더해지므로 최종 값은 6입니다.",
      trapPoint: "단순 이중 for문의 총 반복 횟수 계산 문제입니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "데이터베이스 보안 및 접근 제어 모델 중 주체와 객체의 보안 등급(Security Level)을 비교하여 접근을 통제하는 모델로, 군사적 기밀 유지 목적 등에 사용되는 강제적 접근 통제(MAC)의 영문 약어 풀네임을 쓰시오.",
      answer: "Mandatory Access Control",
      aliases: ["Mandatory Access Control", "MAC", "강제적 접근 통제", "강제적 접근통제"],
      explanation: "MAC(Mandatory Access Control)은 관리자만이 접근 제어 규칙을 설정할 수 있으며 주체와 객체의 보안 라벨(기밀, 대외비 등)에 따라 접근을 허가합니다 (사용자가 권한을 부여하는 것은 DAC, 역할 기반은 RBAC).",
      trapPoint: "DAC(임의적 접근 통제), MAC(강제적 접근 통제), RBAC(역할 기반 접근 통제) 3대 접근 제어 모델을 구분하세요."
    }
  ]
};
