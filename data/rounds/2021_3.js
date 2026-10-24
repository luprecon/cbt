/**
 * 2021년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2021_3"] = {
  id: "2021_3",
  title: "2021년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Connection {
    private static Connection _inst = null;
    private int count = 0;

    static public Connection get() {
        if (_inst == null) {
            _inst = new Connection();
            return _inst;
        }
        return _inst;
    }

    public void count() { count++; }
    public int getCount() { return count; }
}

public class Main {
    public static void main(String[] args) {
        Connection conn1 = Connection.get();
        conn1.count();
        Connection conn2 = Connection.get();
        conn2.count();
        Connection conn3 = Connection.get();
        conn3.count();

        System.out.print(conn1.getCount());
    }
}`,
      answer: "3",
      aliases: ["3"],
      explanation: "싱글톤(Singleton) 패턴 추적:\n1. `Connection.get()`은 `_inst`가 null일 때 단 한 번만 새 인스턴스를 생성하고 이후에는 동일한 인스턴스를 반환합니다.\n2. conn1, conn2, conn3는 모두 동일한 단 하나의 Connection 인스턴스를 가리킵니다.\n3. count()가 3회 호출되어 단일 인스턴스의 count 변수가 0 -> 1 -> 2 -> 3으로 누적 증가합니다.\n4. conn1.getCount()는 3을 반환하여 출력됩니다.",
      trapPoint: "싱글톤 패턴이므로 객체가 3개 생성되는 것이 아니라 단 하나의 객체 공간을 공유하여 count가 3이 됩니다."
    },
    {
      id: 2,
      category: "보안",
      prompt: "보안 서비스 관리 프레임워크인 AAA의 3가지 핵심 기능에 대한 설명에 알맞은 영문 명칭을 각각 쓰시오.",
      passage: `( 1 ) 시스템이나 서비스에 접근을 시도하는 사용자의 신원을 검증하고 확인하는 기능
( 2 ) 검증된 사용자에게 시스템 자원이나 서비스에 대한 적절한 권한을 부여하는 기능
( 3 ) 사용자가 시스템 자원을 이용한 내역(시간, 사용량 등)을 측정하고 기록/수집하는 기능`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Authentication", "authentication", "인증"],
        "2": ["Authorization", "authorization", "인가"],
        "3": ["Accounting", "accounting", "계정", "계정관리"]
      },
      answer: "(1) Authentication, (2) Authorization, (3) Accounting",
      aliases: [
        "Authentication, Authorization, Accounting",
        "인증, 인가, 계정관리",
        "인증, 인가, 과금"
      ],
      explanation: "AAA 프레임워크 3요소:\n1. Authentication(인증): 신원 확인 (패스워드, 인증서)\n2. Authorization(인가): 권한 부여 (접근 권한 통제)\n3. Accounting(계정/과금): 자원 사용량 측정 및 감사 로그 기록",
      trapPoint: "신원 확인은 Authentication(인증), 권한 허용은 Authorization(인가), 사용량 기록은 Accounting(계정)입니다."
    },
    {
      id: 3,
      category: "SQL",
      prompt: "데이터 제어어(DCL) 중 GRANT 명령어의 기능에 대해 간략히 서술하시오.",
      answer: "데이터베이스 사용자에게 특정 권한(객체 접근 권한, 관리자 권한 등)을 부여하는 명령어",
      aliases: [
        "데이터베이스 사용자에게 특정 권한(객체 접근 권한, 관리자 권한 등)을 부여하는 명령어",
        "사용자에게 권한을 부여하는 명령어",
        "사용자에게 접속권한, 오브젝트 생성권한 등을 부여하는 명령어",
        "데이터베이스 권한 부여"
      ],
      explanation: "GRANT는 데이터베이스 관리자(DBA)가 특정 사용자에게 릴레이션에 대한 SELECT, INSERT, UPDATE, DELETE 권한이나 시스템 관리 권한을 부여(Grant)할 때 사용하는 DCL 명령어입니다. (권한 회수는 REVOKE).",
      trapPoint: "사용자에게 권한을 부여하는 명령어가 핵심입니다."
    },
    {
      id: 4,
      category: "보안",
      prompt: "다음 설명에서 빈칸에 공통으로 들어갈 프로토콜의 영문 약어를 쓰시오.",
      passage: `(      ) 스푸핑은 로컬 근거리 통신망(LAN) 환경에서 (      ) 응답 메시지를 희생자에게 위조하여 발송함으로써, 공격자의 MAC 주소를 게이트웨이의 MAC 주소로 변조하여 희생자의 모든 네트워크 트래픽을 가로채는 중간자(MITM) 공격 기법이다.`,
      answer: "ARP",
      aliases: ["ARP", "arp", "Address Resolution Protocol"],
      explanation: "ARP 스푸핑(ARP Spoofing)은 LAN 상에서 공격자가 자신의 MAC 주소를 게이트웨이 또는 다른 호스트의 IP 주소와 매핑되도록 속이는 공격입니다.",
      trapPoint: "IP-MAC 매핑을 변조하는 로컬 스푸핑 공격은 ARP 스푸핑입니다."
    },
    {
      id: 5,
      category: "소프트웨어공학",
      prompt: "한 모듈이 다른 모듈의 내부 논리 조직을 제어하기 위한 목적으로 제어 신호나 플래그(Flag)를 매개변수로 전달하여 통신할 때 나타나는 결합도(Coupling)의 영문 명칭을 쓰시오.",
      answer: "Control Coupling",
      aliases: [
        "Control Coupling",
        "Control",
        "control",
        "control coupling",
        "제어 결합도",
        "제어결합도"
      ],
      explanation: "제어 결합도(Control Coupling)는 상위 모듈이 하위 모듈에 무엇을 처리할지뿐 아니라 '어떻게 처리할지' 제어 플래그를 넘겨주어 하위 모듈의 처리 흐름을 통제할 때 발생하는 결합도입니다.",
      trapPoint: "제어 신호나 플래그를 전달하는 결합도는 Control Coupling(제어 결합도)입니다."
    },
    {
      id: 6,
      category: "네트워크",
      prompt: "다음 설명에 해당하는 OSI 7계층의 명칭을 각각 쓰시오.",
      passage: `( 1 ) 물리 계층을 통해 송수신되는 프레임의 에러 검출, 흐름 제어, 회선 제어를 수행하여 신뢰성 있는 전송을 보장하는 계층 (MAC 주소 사용)
( 2 ) 패킷을 발신지로부터 목적지까지 가장 안전하고 빠른 최적의 경로(라우팅)를 선택하여 전달하는 계층 (IP 주소 사용)
( 3 ) 송수신자 간에 서로 다른 데이터 표현 방식을 상호 변환하고, 데이터 암호화 및 압축을 수행하는 계층`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["데이터링크 계층", "데이터링크", "Data Link", "데이터 링크"],
        "2": ["네트워크 계층", "네트워크", "Network"],
        "3": ["표현 계층", "표현", "Presentation"]
      },
      answer: "(1) 데이터링크 계층, (2) 네트워크 계층, (3) 표현 계층",
      aliases: [
        "데이터링크 계층, 네트워크 계층, 표현 계층",
        "데이터링크, 네트워크, 표현"
      ],
      explanation: "OSI 7계층:\n1. 2계층 데이터링크: 오류/흐름 제어, MAC 주소\n2. 3계층 네트워크: 최적 경로 라우팅, IP 패킷\n3. 6계층 표현: 암호화, 압축, 코드 변환",
      trapPoint: "MAC 주소 오류/흐름 제어 = 데이터링크, 라우팅 = 네트워크, 암호화/압축 = 표현 계층입니다."
    },
    {
      id: 7,
      category: "소프트웨어공학",
      prompt: "UML 클래스 다이어그램에서 클래스 간의 관계에 대한 설명으로 빈칸 (1), (2)에 알맞은 영문 명칭을 보기에서 찾아 쓰시오.",
      passage: `( 1 ) 클래스들 간에 전체(Whole)와 부분(Part)의 포함 관계를 나타내며, 전체 객체가 소멸되어도 부분 객체는 독립적으로 유지될 수 있는 집합 관계 (빈 마름모)
( 2 ) 한 클래스가 다른 클래스를 포함하는 상위 개념(IS-A)일 때의 상속 관계를 나타내는 일반화 관계 (빈 삼각형 실선)

[보기: Aggregation, Generalization, Realization, Dependency, Composition]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Aggregation", "aggregation", "집약"],
        "2": ["Generalization", "generalization", "일반화"]
      },
      answer: "(1) Aggregation, (2) Generalization",
      aliases: ["Aggregation, Generalization", "집약, 일반화", "Aggregation Generalization"],
      explanation: "1. Aggregation(집약 관계): 전체-부분 관계이면서 부분 객체가 독립적 수명을 가짐 (빈 마름모).\n2. Generalization(일반화 관계): 상위 클래스와 하위 클래스의 IS-A 상속 관계 (빈 삼각형 화살표).",
      trapPoint: "독립적 수명의 전체-부분 관계는 Aggregation(집약), 상속 관계는 Generalization(일반화)입니다."
    },
    {
      id: 8,
      category: "소프트웨어공학",
      prompt: "IEEE 829 표준 테스트 케이스 명세서의 필수 구성 요소 3가지를 보기에서 찾아 쓰시오.",
      passage: `( 1 ) 테스트를 수행하기 위해 사전에 충족되어야 하는 시스템의 상태나 전제 조건
( 2 ) 테스트 대상 프로그램에 실제로 입력하는 구체적인 입력값
( 3 ) 테스트 입력값을 적용했을 때 프로그램이 출력해야 할 올바른 기대 출력값

[보기: 테스트 조건, 테스트 데이터, 예상 결과, 테스트 스크립트, 결함 보고서]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["테스트 조건", "전제 조건", "Test Condition"],
        "2": ["테스트 데이터", "입력 데이터", "Test Data"],
        "3": ["예상 결과", "기대 결과", "Expected Result"]
      },
      answer: "(1) 테스트 조건, (2) 테스트 데이터, (3) 예상 결과",
      aliases: [
        "테스트 조건, 테스트 데이터, 예상 결과",
        "테스트조건, 테스트데이터, 예상결과"
      ],
      explanation: "테스트 케이스 구성 요소: 식별자, 테스트 항목, 전제 조건(테스트 조건), 입력 데이터(테스트 데이터), 예상 결과(기대값).",
      trapPoint: "전제 조건, 입력 데이터, 예상 결과가 테스트 케이스의 3대 핵심입니다."
    },
    {
      id: 9,
      category: "소프트웨어공학",
      prompt: "소프트웨어 요구사항 명세서의 입력 조건(원인)과 출력 결과(효과) 간의 논리적 관계를 체계적으로 분석하여 Boolean 그래프로 표현한 후, 이를 의사결정표로 변환하여 테스트 케이스를 도출하는 블랙박스 테스트 기법의 영문 명칭을 쓰시오.",
      answer: "Cause-Effect Graphing",
      aliases: [
        "Cause-Effect Graphing",
        "cause-effect graph",
        "Cause Effect Graph",
        "원인-효과 그래프",
        "원인 효과 그래프"
      ],
      explanation: "원인-효과 그래프(Cause-Effect Graphing)는 입력 조건(Cause)과 출력 효과(Effect) 간의 논리적 관계(AND, OR, NOT)를 불리언 그래프로 표현하여 높은 품질의 테스트 케이스를 설계하는 명세 기반 기법입니다.",
      trapPoint: "원인과 결과의 논리적 Boolean 관계 그래프는 Cause-Effect Graph입니다."
    },
    {
      id: 10,
      category: "보안",
      prompt: "1977년 미국 NBS에서 표준으로 제정한 대칭키 블록 암호 알고리즘으로, 64비트 평문 블록을 56비트의 유효 키를 사용하여 16라운드의 Feistel 네트워크 구조로 암호화하는 알고리즘의 영문 약어를 쓰시오.",
      answer: "DES",
      aliases: ["DES", "des", "Data Encryption Standard"],
      explanation: "DES(Data Encryption Standard)는 64비트 블록, 56비트 유효키(8비트 패리티), 16라운드 페이스텔 구조를 사용하는 미국 표준 대칭 암호 알고리즘입니다.",
      trapPoint: "56비트 유효키, 64비트 블록 크기의 고전 대칭키 암호는 DES입니다."
    },
    {
      id: 11,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 3, b = 4, c = 3, d = 5;
        if ((a == 2 | a == c) & !(c > d) & (1 == b ^ c != d)) {
            a = b + c;
            if (7 == b ^ c != a) {
                System.out.println(a);
            } else {
                System.out.println(b);
            }
        } else {
            a = c + d;
            if (7 == c ^ d != a) {
                System.out.println(a);
            } else {
                System.out.println(d);
            }
        }
    }
}`,
      answer: "7",
      aliases: ["7"],
      explanation: "조건문 논리 및 비트 연산 추적:\n1. 첫 번째 if 조건 검사:\n   - `(a == 2 | a == c)`: (false | true) = true\n   - `!(c > d)`: !(3 > 5) = !(false) = true\n   - `(1 == b ^ c != d)`: (false ^ true) = true (XOR: 서로 다르면 true)\n   - true & true & true -> 조건문 참!\n2. if 블록 내부 실행:\n   - `a = b + c` = 4 + 3 = 7\n   - 중첩 if: `(7 == b ^ c != a)`\n     * 7 == 4 -> false\n     * c != a -> 3 != 7 -> true\n     * false ^ true = true\n   - 중첩 if가 참이므로 `System.out.println(a);` 실행 -> 7 출력.",
      trapPoint: "XOR(^) 연산자는 두 피연산자의 참/거짓 값이 다를 때 true를 반환합니다.",
      traceTable: {
        headers: ["항목", "평가 식", "결과"],
        rows: [
          ["조건 1", "a == 2 | a == c", "false | true -> true"],
          ["조건 2", "!(c > d)", "!(3 > 5) -> true"],
          ["조건 3", "1 == b ^ c != d", "false ^ true -> true"],
          ["첫 if 결과", "true & true & true", "true (if문 진입)"],
          ["변수 갱신", "a = b + c", "a = 4 + 3 = 7"],
          ["중첩 if", "7 == b ^ c != a", "false ^ true -> true"],
          ["출력", "System.out.println(a)", "7"]
        ]
      }
    },
    {
      id: 12,
      category: "C",
      prompt: "다음 C언어 포인터 배열 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int *arr[3];
    int a = 12, b = 24, c = 36;
    arr[0] = &a;
    arr[1] = &b;
    arr[2] = &c;

    printf("%d\\n", *arr[1] + **arr + 1);
    return 0;
}`,
      answer: "37",
      aliases: ["37"],
      explanation: "포인터 배열 역참조:\n1. arr[1]은 b의 주소(&b)이므로 `*arr[1]`은 b의 값인 24입니다.\n2. arr은 포인터 배열의 시작 주소이므로 `*arr`은 arr[0](&a)이고, `**arr`은 a의 값인 12입니다.\n3. `*arr[1] + **arr + 1` = 24 + 12 + 1 = 37이 출력됩니다.",
      trapPoint: "**arr은 arr[0]이 가리키는 실제 정수값인 a(12)를 의미합니다."
    },
    {
      id: 13,
      category: "SQL",
      prompt: "다음 두 릴레이션에 대해 CROSS JOIN을 수행할 때 결과로 생성되는 전체 튜플의 수를 쓰시오.",
      passage: `[조건]
- 테이블 A에서 이름이 'S'로 시작하는 사원은 2명이다.
- 테이블 B에서 직무에 'T'가 포함된 직무는 2개이다.
- 이 두 서브셋 간에 CROSS JOIN을 수행한다.`,
      answer: "4",
      aliases: ["4", "4개", "4건"],
      explanation: "교차 조인(CROSS JOIN, 카티션 프로덕트)의 결과 튜플 수는 두 테이블의 행 수를 곱한 값입니다.\n2 * 2 = 4건이 생성됩니다.",
      trapPoint: "CROSS JOIN의 행 수는 n * m = 2 * 2 = 4입니다."
    },
    {
      id: 14,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a, b = 100, 200
print(a == b)`,
      answer: "False",
      aliases: ["False"],
      explanation: "a(100)와 b(200)의 동등 비교 `a == b`는 거짓이므로 불리언 상수 `False`가 출력됩니다.\n파이썬의 불리언 값은 첫 글자가 대문자인 `False`로 출력됩니다.",
      trapPoint: "파이썬 불리언 출력은 소문자 false가 아니라 대문자 'False'입니다."
    },
    {
      id: 15,
      category: "소프트웨어공학",
      prompt: "UML 구조 다이어그램 중 시스템을 구성하는 객체들의 타입(이름, 속성, 연산)과 객체들 간의 정적 관계를 표현하는 가장 대표적인 다이어그램의 명칭을 쓰시오.",
      answer: "클래스 다이어그램",
      aliases: ["클래스 다이어그램", "클래스다이어그램", "Class Diagram", "클래스"],
      explanation: "클래스 다이어그램(Class Diagram)은 시스템의 정적 구조를 표현하기 위해 클래스(이름, 속성, 메소드)와 그들 간의 관계(연관, 일반화, 의존 등)를 모델링하는 다이어그램입니다.",
      trapPoint: "클래스 구조와 정적 관계를 나타내는 것은 클래스 다이어그램입니다."
    },
    {
      id: 16,
      category: "소프트웨어공학",
      prompt: "GoF 디자인 패턴 중 객체 생성을 위한 인터페이스를 정의하지만, 어떤 클래스의 인스턴스를 생성할지는 서브클래스(하위 클래스)가 결정하도록 위임하는 생성 패턴의 명칭을 쓰시오.",
      answer: "Factory Method",
      aliases: [
        "Factory Method",
        "factory method",
        "팩토리 메소드",
        "팩토리 메서드",
        "팩토리메소드",
        "Factory Method 패턴"
      ],
      explanation: "팩토리 메소드(Factory Method) 패턴은 상위 클래스에서 객체 생성 인터페이스만 정의하고, 실제 어떤 구체 클래스를 생성할지는 하위 서브클래스에서 팩토리 메소드를 오버라이딩하여 결정하도록 하는 패턴입니다.",
      trapPoint: "인스턴스 생성 책임을 서브클래스에 위임하는 패턴은 Factory Method(팩토리 메소드)입니다."
    },
    {
      id: 17,
      category: "C",
      prompt: "다음 C언어 구조체 포인터 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

struct jsu {
    char name[12];
    int os, db, hab, hhab;
};

int main() {
    struct jsu st[3] = {
        {"데이터1", 95, 88},
        {"데이터2", 84, 91},
        {"데이터3", 86, 75}
    };
    struct jsu* p;
    p = &st[0];

    (p + 1)->hab = (p + 1)->os + (p + 2)->db;
    (p + 1)->hhab = (p + 1)->hab + p->os + p->db;

    printf("%d\\n", (p + 1)->hab + (p + 1)->hhab);
    return 0;
}`,
      answer: "501",
      aliases: ["501"],
      explanation: "구조체 포인터 연산 추적:\n- p는 st[0]을 가리킴\n- (p + 1)은 st[1]: os = 84, db = 91\n- (p + 2)는 st[2]: os = 86, db = 75\n1. `(p + 1)->hab = (p + 1)->os + (p + 2)->db` = 84 + 75 = 159\n2. `(p + 1)->hhab = (p + 1)->hab + p->os + p->db` = 159 + 95 + 88 = 342\n3. `(p + 1)->hab + (p + 1)->hhab` = 159 + 342 = 501 출력.",
      trapPoint: "st[1]->hab(159)과 st[1]->hhab(342)를 더하여 최종 501이 됩니다.",
      traceTable: {
        headers: ["연산 식", "참조 값", "결과 값"],
        rows: [
          ["(p+1)->os + (p+2)->db", "84 + 75", "hab = 159"],
          ["hab + p->os + p->db", "159 + 95 + 88", "hhab = 342"],
          ["hab + hhab", "159 + 342", "501"]
        ]
      }
    },
    {
      id: 18,
      category: "데이터베이스",
      prompt: "파일 구조(File Structure)에서 레코드들을 순차적으로 저장하면서, 키-주소 쌍을 별도로 구성하여 데이터의 빠른 검색과 직접 접근을 지원하는 편성 기법의 명칭을 쓰시오.",
      answer: "인덱스",
      aliases: ["인덱스", "색인", "Index", "index", "인덱스 순차"],
      explanation: "인덱스(Index, 색인)는 데이터 레코드에 빠르게 접근하기 위해 <키, 주소> 쌍의 포인터 목록을 구성하는 자료구조입니다.",
      trapPoint: "키-주소 쌍을 모아 구성하여 직접 접근을 가능케 하는 것은 인덱스(색인)입니다."
    },
    {
      id: 19,
      category: "소프트웨어공학",
      prompt: "마우스나 터치스크린을 이용하여 화면의 그래픽 아이콘, 메뉴, 창 등을 시각적으로 조작하여 컴퓨터와 상호작용하는 사용자 인터페이스의 영문 약어를 쓰시오.",
      answer: "GUI",
      aliases: ["GUI", "gui", "Graphical User Interface"],
      explanation: "GUI(Graphical User Interface, 그래픽 사용자 인터페이스)는 텍스트 명령어 기반의 CLI와 달리 윈도우, 아이콘, 메뉴, 포인터(WIMP)를 이용한 직관적인 시각적 조작 환경입니다.",
      trapPoint: "아이콘과 마우스 중심의 그래픽 인터페이스는 GUI입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "소프트웨어 점증적 통합 테스트에서 하위 모듈부터 시작하여 상위 모듈 방향으로 구축해 나가는 방식을 ( 1 ) 테스트라고 하며, 아직 개발되지 않은 상위 모듈의 역할을 대신하여 입출력을 제어하는 시험 도구를 ( 2 )라고 한다. 빈칸에 들어갈 용어를 순서대로 쓰시오.",
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["상향식", "상향식 통합 테스트", "Bottom-Up", "Bottom Up"],
        "2": ["테스트 드라이버", "드라이버", "Driver", "Test Driver"]
      },
      answer: "(1) 상향식, (2) 테스트 드라이버",
      aliases: [
        "(1) 상향식, (2) 테스트 드라이버",
        "상향식, 테스트 드라이버",
        "상향식, 드라이버",
        "Bottom-Up, Driver"
      ],
      explanation: "통합 테스트 방향:\n- 상향식(Bottom-Up): 하위 -> 상위 구축, 상위 더미 모듈로 '테스트 드라이버' 필요\n- 하향식(Top-Down): 상위 -> 하위 구축, 하위 더미 모듈로 '테스트 스텁' 필요",
      trapPoint: "상향식에는 드라이버(Driver), 하향식에는 스텁(Stub)이 필요합니다."
    }
  ]
};

