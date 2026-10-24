/**
 * 2020년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2020_3"] = {
  id: "2020_3",
  title: "2020년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "소프트웨어공학",
      prompt: "소프트웨어 리팩토링(Refactoring)의 주요 목적을 서술하시오.",
      answer: "소프트웨어의 외부 동작은 변경하지 않고 내부 구조를 개선하여 가독성과 유지보수성을 향상시키는 활동",
      aliases: [
        "소프트웨어의 외부 동작은 변경하지 않고 내부 구조를 개선하여 가독성과 유지보수성을 향상시키는 활동",
        "소프트웨어의 외부 동작을 바꾸지 않으면서 내부 구조를 개선하여 유지보수성을 높이는 것",
        "코드의 가독성을 높이고 유지보수성을 향상시키기 위해 내부 구조를 개선하는 것",
        "가독성 향상 및 유지보수성 향상"
      ],
      explanation: "리팩토링(Refactoring)은 겉으로 드러나는 프로그램의 기능(외부 동작)은 전혀 바꾸지 않으면서, 내부 코드의 중복을 제거하고 구조를 개선하여 코드의 가독성, 유지보수성, 확장성을 높이는 작업입니다.",
      trapPoint: "새로운 기능을 추가하거나 동작을 바꾸는 것이 아니라, 오직 내부 구조 개선(클린 코드)을 통해 유지보수성을 높이는 활동입니다."
    },
    {
      id: 2,
      category: "C",
      prompt: "다음 C언어 소스 코드의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void main() {
    int i = 0, c = 0;
    while (i < 10) {
        i++;
        c *= i;
    }
    printf("%d", c);
}`,
      answer: "0",
      aliases: ["0"],
      explanation: "변수 c의 초깃값이 0입니다. while 루프 내부에서 `c *= i;` 연산을 반복하지만, 0에 어떤 숫자를 곱해도 0이므로 c의 값은 계속 0으로 유지됩니다.\n루프 종료 후 c의 값인 0이 출력됩니다.",
      trapPoint: "c의 초깃값이 0이므로 i가 아무리 커져도 c *= i의 결과는 0입니다."
    },
    {
      id: 3,
      category: "네트워크",
      prompt: "대표적인 내부 라우팅 프로토콜(IGP)로, 다익스트라(Dijkstra)의 최단 경로 알고리즘을 사용하며 대규모 네트워크에 적합한 링크 상태(Link State) 라우팅 프로토콜의 영문 약어를 쓰시오.",
      answer: "OSPF",
      aliases: ["OSPF", "ospf", "Open Shortest Path First"],
      explanation: "OSPF(Open Shortest Path First)는 링크 상태 알고리즘(다익스트라 알고리즘)을 기반으로 최단 경로를 동적으로 계산하는 대표적인 내부 게이트웨이 프로토콜(IGP)입니다. 홉 수 제한이 없어 대규모 네트워크에 적합합니다.",
      trapPoint: "거리 벡터/벨만-포드는 RIP, 링크 상태/다익스트라는 OSPF입니다."
    },
    {
      id: 4,
      category: "소프트웨어공학",
      prompt: "소프트웨어 형상 관리 절차 중 형상 항목의 기준선(Baseline)에 대한 변경 제안을 검토, 승인 또는 반려하여 변경 활동을 통제하는 활동의 명칭을 쓰시오.",
      answer: "형상 통제",
      aliases: ["형상 통제", "형상통제", "Configuration Control", "configuration control"],
      explanation: "형상 관리 활동 4단계:\n1. 형상 식별: 관리 대상 식별 및 베이스라인 지정\n2. 형상 통제: 형상통제위원회(CCB)의 승인을 거쳐 변경 제어\n3. 형상 감사: 베이스라인의 무결성 및 반영 검증\n4. 형상 기록: 변경 이력 및 현황 추적 기록",
      trapPoint: "베이스라인의 변경 여부를 심의·통제하는 것은 '형상 통제'입니다."
    },
    {
      id: 5,
      category: "네트워크",
      prompt: "서로 다른 컴퓨터 시스템이나 통신 장비 간에 원활한 데이터 교환을 수행하기 위해 사전에 정의한 통신 규약이자 규칙의 총칭을 쓰시오.",
      answer: "프로토콜",
      aliases: ["프로토콜", "통신 규약", "통신 프로토콜", "Protocol", "protocol"],
      explanation: "프로토콜(Protocol)은 컴퓨터 네트워크 환경에서 기기 간 데이터 교환을 정확하고 일관되게 수행하기 위해 정해둔 구문, 의미, 타이밍의 통신 규칙 체계입니다.",
      trapPoint: "기기 간 데이터 송수신 규약은 프로토콜(Protocol)입니다."
    },
    {
      id: 6,
      category: "네트워크",
      prompt: "TCP/IP 프로토콜 스위트에서 IP 패킷 전송 중 오류가 발생했을 때 진단 및 오류 메시지(Destination Unreachable, Time Exceeded 등)를 송신자에게 전달하기 위해 사용하는 네트워크 계층 프로토콜의 영문 약어를 쓰시오.",
      answer: "ICMP",
      aliases: ["ICMP", "icmp", "Internet Control Message Protocol"],
      explanation: "ICMP(Internet Control Message Protocol)는 IP 패킷 전송 중 발생하는 경로 이상, 패킷 폐기 등의 오류 통보 및 진단(ping, traceroute)을 수행하는 네트워크 계층의 보조 프로토콜입니다.",
      trapPoint: "IP 제어 및 오류 통지 프로토콜은 ICMP입니다."
    },
    {
      id: 7,
      category: "소프트웨어공학",
      prompt: "다음 제어 흐름 그래프에서 분기 커버리지(Branch Coverage, 결정 커버리지)를 100% 만족하기 위한 2개의 테스팅 경로 순서를 쓰시오.",
      passage: `       ┌─── ( 1 ) ───┐ <───────────┐
       │   [POINTER  │             │
       │  = FALSE]   │             │
       ▼             │             │
     ◇ ( 2 )         │             │
    /  [X > K ?]     │             │
   / YES        \ NO │             │
  ▼              ▼   │             │
( 3 )            │   │             │
[POINTER=TRUE]   │   │             │
  │              │   │             │
  └───► ( 4 ) ◄──┘   │             │
       [X = X + 2]   │             │
            │        │             │
            ▼        │             │
          ( 5 )      │             │
       [CALL SUB]    │             │
            │        │             │
            ▼        │             │
          ◇ ( 6 )    │             │
      [RESULT > 1 ?] │             │
       / YES         │             │
      └──────────────┘             │
       \ NO                        │
        ▼                          │
      ( 7 ) [PRINT RESULT]         │

※ 분기점 조건:
- 2번 노드(X > K ?): YES(3번 경유) / NO(4번으로 직행)
- 6번 노드(RESULT > 1 ?): YES(1번으로 복귀 루프) / NO(7번으로 종료)`,
      answer: "1234561, 124567",
      aliases: [
        "1234561, 124567",
        "124567, 1234561",
        "1234567, 124561",
        "124561, 1234567",
        "1-2-3-4-5-6-1, 1-2-4-5-6-7",
        "1->2->3->4->5->6->1, 1->2->4->5->6->7"
      ],
      explanation: "분기 커버리지(결정 커버리지)는 제어 흐름 그래프 내의 모든 분기문(조건식)이 True와 False의 모든 결과를 적어도 한 번씩 실행해야 합니다.\n- 2번 조건식: True (3 경유), False (직행)\n- 6번 조건식: True (1로 루프), False (7로 이동)\n따라서 두 분기점의 참과 거짓을 교차 수행하는 최소 두 경로는 `1234561, 124567` (또는 `1234567, 124561`) 입니다.",
      trapPoint: "각 분기점(2번과 6번)의 True 분기와 False 분기가 두 테스트 경로에 모두 포함되어야 합니다."
    },
    {
      id: 8,
      category: "SQL",
      prompt: "성적 테이블에서 과목별 점수의 평균이 90 이상인 과목의 과목이름, 최소점수, 최대점수를 조회하는 SQL문을 작성하시오.",
      passage: `[작성 조건]
- 대소문자를 구분하지 않는다.
- WHERE 구문을 사용하지 않는다.
- GROUP BY, HAVING 구문을 반드시 사용한다.
- 집계 함수 MIN, MAX, AVG를 사용한다.
- 최소점수, 최대점수는 별칭(AS)을 사용해야 한다.
- 세미콜론(;)은 생략 가능하다.

[성적 테이블]
| 과목코드 | 과목이름 | 학점 | 점수 |
| --- | --- | --- | --- |
| 1000 | 컴퓨터과학 | A+ | 95 |
| 2000 | 운영체제 | B+ | 85 |
| 1000 | 컴퓨터과학 | B+ | 85 |
| 2000 | 운영체제 | B | 80 |

[조회 결과]
| 과목이름 | 최소점수 | 최대점수 |
| --- | --- | --- |
| 컴퓨터과학 | 85 | 95 |`,
      answer: "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;",
      aliases: [
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;",
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90",
        "select 과목이름, min(점수) as 최소점수, max(점수) as 최대점수 from 성적 group by 과목이름 having avg(점수) >= 90;",
        "select 과목이름, min(점수) as 최소점수, max(점수) as 최대점수 from 성적 group by 과목이름 having avg(점수) >= 90"
      ],
      explanation: "과목이름별 그룹화 및 그룹 조건 질의:\n`SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;`",
      trapPoint: "그룹화된 결과에 대한 필터링 조건은 WHERE가 아닌 HAVING 절을 사용해야 합니다."
    },
    {
      id: 9,
      category: "SQL",
      prompt: "학생 테이블에서 이름이 '민수'인 학생의 튜플을 삭제하는 SQL DML 문을 작성하시오.",
      passage: `[학생 테이블]
| 학번 | 이름 | 점수 | 과목이름 |
| --- | --- | --- | --- |
| 1000 | 김정미 | 90 | 알고리즘 |
| 2000 | 강은미 | 95 | 데이터베이스 |
| 3000 | 홍길동 | 90 | 전산수학 |
| 4000 | 민수 | 95 | 운영체제 |`,
      answer: "DELETE FROM 학생 WHERE 이름 = '민수';",
      aliases: [
        "DELETE FROM 학생 WHERE 이름 = '민수';",
        "DELETE FROM 학생 WHERE 이름 = '민수'",
        "DELETE FROM 학생 WHERE 이름='민수';",
        "DELETE FROM 학생 WHERE 이름='민수'",
        "delete from 학생 where 이름 = '민수';",
        "delete from 학생 where 이름 = '민수'"
      ],
      explanation: "특정 튜플 삭제 SQL 문법: `DELETE FROM 테이블명 WHERE 조건;`\n따라서 `DELETE FROM 학생 WHERE 이름 = '민수';` 입니다.",
      trapPoint: "테이블 자체를 삭제하는 DROP과 달리 특정 행을 삭제할 때는 DELETE FROM을 사용합니다."
    },
    {
      id: 10,
      category: "데이터베이스",
      prompt: "관계 대수(Relational Algebra) 연산자 중 릴레이션 R, S가 있을 때 S의 모든 조건을 만족하는 R의 튜플들을 추출하여 분리해내는 디비전(Division) 연산의 수학 기호를 쓰시오.",
      answer: "÷",
      aliases: ["÷", "/", "디비전", "Division", "division"],
      explanation: "순수 관계 연산자의 수학 기호:\n- 셀렉션: σ (Sigma)\n- 프로젝션: π (Pi)\n- 조인: ⋈ (Bowtie)\n- 디비전: ÷ (Division)",
      trapPoint: "디비전 연산의 수학 기호는 나눗셈 기호인 ÷ 입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "변수나 함수의 식별자(Identifier) 명명 규칙 중 변수명 접두어에 해당 변수의 자료형(데이터 타입)을 축약하여 표기하는 명명법의 명칭을 쓰시오.",
      answer: "헝가리안 표기법",
      aliases: ["헝가리안 표기법", "헝가리안표기법", "헝가리안", "Hungarian Notation", "Hungarian Case"],
      explanation: "헝가리안 표기법(Hungarian Notation)은 마이크로소프트의 찰스 시모니가 제안한 명명법으로, `strName`(문자열), `nAge`(정수)처럼 변수 이름 앞에 자료형 축약형을 접두어로 붙이는 표기법입니다.",
      trapPoint: "자료형을 접두어로 붙이는 표기법은 헝가리안 표기법입니다."
    },
    {
      id: 12,
      category: "소프트웨어공학",
      prompt: "소프트웨어 테스트 기법 중 프로그램의 내부 소스 코드를 보지 않고 기능 명세서를 기반으로 입력값에 대한 출력 결과의 일치 여부를 검증하는 기법으로 동등 분할(동치 분할), 경계값 분석, 원인-결과 그래프 등이 속하는 테스트 방식을 쓰시오.",
      answer: "블랙박스 테스트",
      aliases: ["블랙박스 테스트", "블랙박스테스트", "블랙박스", "Black Box Test", "Black-box test", "명세 기반 테스트"],
      explanation: "블랙박스 테스트(Black-box Test, 명세 기반 테스트)는 소프트웨어 내부 로직을 보지 않고 요구사항 명세서에 정의된 입력에 대해 예상된 출력이 정상적으로 반환되는지를 검증하는 기능 테스트 방식입니다.",
      trapPoint: "동등 분할, 경계값 분석 등 명세 기반 테스트 기법은 블랙박스 테스트에 해당합니다."
    },
    {
      id: 13,
      category: "C",
      prompt: "다음 C언어 소스 코드의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int r1() {
    return 4;
}

int r10() {
    return (30 + r1());
}

int r100() {
    return (200 + r10());
}

int main() {
    printf("%d\n", r100());
    return 0;
}`,
      answer: "234",
      aliases: ["234"],
      explanation: "함수 호출 연쇄:\n1. r100() 호출 -> 200 + r10()\n2. r10() 호출 -> 30 + r1()\n3. r1() 호출 -> 4 반환\n4. r10() 반환값 = 30 + 4 = 34\n5. r100() 반환값 = 200 + 34 = 234\n최종 출력: 234",
      trapPoint: "함수 반환값의 중첩 계산: 200 + (30 + 4) = 234 입니다."
    },
    {
      id: 14,
      category: "데이터베이스",
      prompt: "데이터베이스의 전체적인 논리적 구조, 엔티티, 속성, 관계 및 제약조건 등을 정의한 메타데이터의 기술(Description)이자 기본적인 틀을 의미하는 용어를 쓰시오.",
      answer: "스키마",
      aliases: ["스키마", "Schema", "schema", "DB 스키마", "데이터베이스 스키마"],
      explanation: "스키마(Schema)는 데이터베이스의 구조와 제약 조건에 관한 전반적인 명세를 기술한 메타데이터로, ANSI/SPARC 3단계 구조(외부 스키마, 개념 스키마, 내부 스키마)로 나뉩니다.",
      trapPoint: "데이터베이스 구조와 제약조건을 기술한 전체적인 틀은 스키마(Schema)입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `abstract class Vehicle {
    private String name;
    abstract public String getName(String val);
    public String getName() {
        return "Vehicle name:" + name;
    }
    public void setName(String val) {
        name = val;
    }
}

class Car extends Vehicle {
    public Car(String val) {
        setName(val);
    }
    public String getName(String val) {
        return "Car name : " + val;
    }
    public String getName(byte val[]) {
        return "Car name : " + val;
    }
}

public class good {
    public static void main(String[] args) {
        Vehicle obj = new Car("Spark");
        System.out.print(obj.getName());
    }
}`,
      answer: "Vehicle name:Spark",
      aliases: ["Vehicle name:Spark", "Vehicle name: Spark", "vehicle name:Spark"],
      explanation: "1. `Vehicle obj = new Car(\"Spark\");` 호출 시 Car의 생성자가 `setName(\"Spark\")`를 실행하여 Vehicle의 name 멤버변수에 \"Spark\"를 저장합니다.\n2. `obj.getName()` 호출 시 인자가 없습니다. Car 클래스는 매개변수가 있는 `getName(String)`과 `getName(byte[])`만 오버로딩 정의하였고, 인자가 없는 `getName()`은 오버라이딩하지 않았습니다.\n3. 따라서 상속받은 부모(Vehicle)의 `getName()`이 호출되어 `\"Vehicle name:\" + name` 즉 `Vehicle name:Spark` 가 출력됩니다.",
      trapPoint: "자식 클래스가 인자 없는 getName()을 재정의(오버라이딩)하지 않았으므로 부모 클래스의 getName()이 그대로 호출됩니다."
    },
    {
      id: 16,
      category: "소프트웨어공학",
      prompt: "사용자 인터페이스(UI) 설계 원칙 중 사용자가 별도의 사전 교육이나 학습 없이도 시스템의 기능을 직관적으로 쉽게 이해하고 쉽게 조작할 수 있어야 한다는 원칙의 명칭을 쓰시오.",
      answer: "직관성",
      aliases: ["직관성", "Intuitiveness", "intuitiveness"],
      explanation: "UI 4대 원칙:\n- 직관성(Intuitiveness): 누구나 쉽게 이해하고 조작 가능\n- 유효성(Effectiveness): 사용자의 목적을 정확하고 완벽하게 달성\n- 학습성(Learnability): 누구나 쉽게 학습하고 기억\n- 유연성(Flexibility): 사용자의 요구사항을 최대한 수용",
      trapPoint: "사전 지식 없이도 쉽게 이해하고 쓸 수 있어야 한다는 원칙은 '직관성'입니다."
    },
    {
      id: 17,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class good {
    public static void main(String[] args) {
        int i = 0;
        int sum = 0;
        while (i < 10) {
            i++;
            if (i % 2 == 1)
                continue;
            sum += i;
        }
        System.out.println(sum);
    }
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "i가 1부터 10까지 1씩 증가합니다. `i % 2 == 1`인 홀수는 continue로 건너뛰고, 짝수일 때만 sum에 누적됩니다.\n누적되는 짝수: 2 + 4 + 6 + 8 + 10 = 30\n출력: 30",
      trapPoint: "1부터 10까지 짝수의 누적합(2+4+6+8+10 = 30)을 구하는 코드입니다."
    },
    {
      id: 18,
      category: "소프트웨어공학",
      prompt: "기업 애플리케이션 통합(EAI)의 4대 구축 유형 중 빈칸 (1), (2)에 들어갈 유형을 각각 쓰시오.",
      passage: `( 1 ) 가장 기초적인 연계 방식으로, 애플리케이션들을 1:1로 직접 연결하는 방식
( 2 ) 단일 접점인 중앙 허브 시스템을 두고 데이터를 전송하는 중앙 집중형 방식
- Message Bus: 미들웨어(버스)를 두어 애플리케이션 간 대용량 메시지를 중계하는 방식
- Hybrid: Hub & Spoke와 Message Bus 방식을 결합한 형태`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["포인트 투 포인트", "포인트투포인트", "Point-to-point", "point-to-point", "Point-to-Point"],
        "2": ["허브 앤 스포크", "허브앤스포크", "Hub & Spoke", "hub & spoke", "Hub and Spoke"]
      },
      answer: "(1) 포인트 투 포인트, (2) 허브 앤 스포크",
      aliases: [
        "포인트 투 포인트, 허브 앤 스포크",
        "포인트투포인트, 허브앤스포크",
        "Point-to-point, Hub & Spoke"
      ],
      explanation: "EAI의 4대 토폴로지 모델:\n1. Point-to-point: 애플리케이션 간 1:1 직접 연결\n2. Hub & Spoke: 중앙의 단일 허브를 통한 중계\n3. Message Bus: 공통 버스를 통한 비동기 메시지 교환\n4. Hybrid: 허브 앤 스포크 + 메시지 버스 혼용",
      trapPoint: "1:1 연결은 포인트 투 포인트, 중앙 허브 중계는 허브 앤 스포크입니다."
    },
    {
      id: 19,
      category: "소프트웨어공학",
      prompt: "객체지향 프로그래밍(OOP)에서 클래스로부터 객체(인스턴스)가 생성될 때 멤버 변수의 초기화 등을 위해 자동으로 호출되는 특수한 메서드를 무엇이라 하는가?",
      answer: "생성자",
      aliases: ["생성자", "Constructor", "constructor"],
      explanation: "생성자(Constructor)는 객체가 new 키워드로 인스턴스화될 때 자동으로 단 한 번 호출되어 객체의 초기 상태를 설정하는 특수 메서드입니다.",
      trapPoint: "객체 생성 시 자동 호출되는 초기화 메서드는 생성자(Constructor)입니다."
    },
    {
      id: 20,
      category: "SQL",
      prompt: "기존의 학생 테이블에 VARCHAR(20) 타입의 '주소' 속성을 새로 추가하는 SQL DDL 문의 빈칸 (1), (2)에 알맞은 키워드를 쓰시오.",
      passage: `(   1   ) TABLE 학생 (   2   ) 주소 VARCHAR(20);`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ALTER", "alter"],
        "2": ["ADD", "add"]
      },
      answer: "(1) ALTER, (2) ADD",
      aliases: ["ALTER, ADD", "alter, add", "ALTER ADD", "alter add"],
      explanation: "테이블 구조 변경(컬럼 추가) 문법: `ALTER TABLE 테이블명 ADD 컬럼명 데이터타입;`\n따라서 (1) ALTER, (2) ADD 입니다.",
      trapPoint: "테이블 수정 키워드는 ALTER, 컬럼 추가 키워드는 ADD 입니다."
    }
  ]
};

