/**
 * 2020년 제2회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2020_2"] = {
  id: "2020_2",
  title: "2020년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "소프트웨어공학",
      prompt: "정보시스템 운영 중 서버 다운, 자연재해, 시스템 장애 등의 비상사태로 업무가 중단되었을 때, 업무 중단 시점부터 시스템과 서비스가 복구되어 다시 정상 가동될 때까지의 목표 허용 시간을 뜻하는 용어 또는 영문 약어를 쓰시오.",
      answer: "RTO",
      aliases: ["RTO", "rto", "목표 복구 시간", "목표복구시간", "재해 복구 시간", "재해복구시간", "Recovery Time Objective"],
      explanation: "- RTO(Recovery Time Objective, 목표 복구 시간): 중단 시점부터 업무가 정상 재개될 때까지 허용되는 최대 시간\n- RPO(Recovery Point Objective, 목표 복구 시점): 재해 발생 시 감수할 수 있는 최대 데이터 손실 시점",
      trapPoint: "복구 소요 '시간'은 RTO(Recovery Time Objective), 데이터 복구 '시점'은 RPO(Recovery Point Objective)입니다."
    },
    {
      id: 2,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = {'일본', '중국', '한국'}
a.add('베트남')
a.add('중국')
a.remove('일본')
a.update(['홍콩', '한국', '태국'])
print(a)`,
      answer: "{'중국', '한국', '베트남', '홍콩', '태국'}",
      aliases: [
        "{'중국', '한국', '베트남', '홍콩', '태국'}",
        "{'중국', '한국', '베트남', '태국', '홍콩'}",
        "{'베트남', '중국', '한국', '홍콩', '태국'}",
        "중국, 한국, 베트남, 홍콩, 태국",
        "중국, 한국, 베트남, 태국, 홍콩"
      ],
      explanation: "파이썬 집합(set) 연산 과정:\n1. 초기: {'일본', '중국', '한국'}\n2. a.add('베트남') -> {'일본', '중국', '한국', '베트남'}\n3. a.add('중국') -> 중복이므로 변화 없음\n4. a.remove('일본') -> {'중국', '한국', '베트남'}\n5. a.update(['홍콩', '한국', '태국']) -> '한국'은 중복 무시, '홍콩', '태국' 추가 -> {'중국', '한국', '베트남', '홍콩', '태국'}\n※ set은 순서가 없으므로 5개 원소가 담긴 집합 형태로 출력됩니다.",
      trapPoint: "set 자료형은 중복을 허용하지 않으며 집합 기호 {}로 감싸져 출력됩니다."
    },
    {
      id: 3,
      category: "소프트웨어공학",
      prompt: "웹 브라우저의 XMLHttpRequest 객체를 이용하여 전체 페이지를 새로고침하지 않고도 백그라운드에서 서버와 비동기적으로 데이터를 주고받아 화면의 일부분만을 동적으로 갱신할 수 있는 웹 기술의 명칭 또는 영문 약어를 쓰시오.",
      answer: "AJAX",
      aliases: ["AJAX", "Ajax", "ajax", "Asynchronous JavaScript and XML", "비동기 통신", "비동기 자바스크립트와 XML"],
      explanation: "AJAX(Asynchronous JavaScript and XML)는 웹 페이지 전체를 다시 로드하지 않고 필요한 일부분의 데이터만 백그라운드에서 송수신하여 빠르게 화면을 갱신하는 비동기 웹 프로그래밍 기술입니다.",
      trapPoint: "XMLHttpRequest 객체를 통한 비동기 웹 통신 기술은 AJAX입니다."
    },
    {
      id: 4,
      category: "소프트웨어공학",
      prompt: "절차나 도구보다는 사람이 중심이 되어 소프트웨어 개발 과정에서 변화에 유연하고 신속하게 적응하면서 짧은 주기로 반복 개발하는 신속 적응적 경량 개발 방법론을 쓰시오.",
      answer: "애자일",
      aliases: ["애자일", "애자일 방법론", "Agile", "agile", "Agile 방법론"],
      explanation: "애자일(Agile) 방법론은 계획 중심의 전통적 폭포수(Waterfall) 모델과 대비되어, 짧은 주기(이터레이션/스프린트) 단위로 작동 가능한 소프트웨어를 지속 출시하며 고객 피드백을 신속히 반영하는 경량 개발 방식입니다.",
      trapPoint: "기민하고 신속하게 변화에 대응하는 경량 개발 방법론은 애자일(Agile)입니다."
    },
    {
      id: 5,
      category: "Java",
      prompt: "다음 Java 코드에서 Child 객체를 동적으로 생성하여 부모 클래스 참조 변수에 할당하고자 한다. 밑줄 빈칸에 들어갈 키워드를 쓰시오.",
      code: `class Parent {
    public void show() {
        System.out.println("Parent");
    }
}

class Child extends Parent {
    public void show() {
        System.out.println("Child");
    }
}

public class good {
    public static void main(String[] args) {
        Parent pa = _____ Child();
        pa.show();
    }
}`,
      answer: "new",
      aliases: ["new", "NEW"],
      explanation: "자바에서 클래스의 생성자를 호출하여 힙(Heap) 메모리에 인스턴스를 동적으로 할당할 때 사용하는 연산자는 `new` 입니다. (`Parent pa = new Child();` 다형성 할당)",
      trapPoint: "객체 인스턴스를 생성할 때 사용하는 연산자는 new 입니다."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "학생 테이블(학번, 이름, 학년, 수강과목, 점수, 연락처)에서 학년이 3학년이거나 4학년인 학생의 학번과 이름을 조회하고자 한다. 아래 조건을 만족하는 SQL문을 작성하시오.",
      passage: `[조건]
1. 학생 테이블에서 3, 4학년인 학생의 학번, 이름을 조회한다.
2. IN 연산자를 반드시 사용해야 한다.
3. 세미콜론(;)은 생략 가능하다.

[학생 테이블]
| 학번 | 이름 | 학년 | 수강과목 | 점수 | 연락처 |
| --- | --- | --- | --- | --- | --- |
| 1000 | 김이름 | 1 | 수학 | 90 | 010-1111-2222 |
| 2000 | 장이름 | 2 | 과학 | 95 | 010-2222-2222 |
| 3000 | 허이름 | 3 | 미술 | 90 | 010-3333-3333 |
| 4000 | 조이름 | 4 | 음악 | 95 | 010-4444-4444 |`,
      answer: "SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3, 4);",
      aliases: [
        "SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3, 4);",
        "SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3, 4)",
        "SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3,4);",
        "SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3,4)",
        "select 학번, 이름 from 학생 where 학년 in (3, 4);",
        "select 학번, 이름 from 학생 where 학년 in (3, 4)",
        "select 학번, 이름 from 학생 where 학년 in (3,4);",
        "select 학번, 이름 from 학생 where 학년 in (3,4)",
        "SELECT 학번,이름 FROM 학생 WHERE 학년 IN (3,4);",
        "SELECT 학번,이름 FROM 학생 WHERE 학년 IN (3,4)"
      ],
      explanation: "학년이 3 또는 4인 학생을 IN 연산자로 필터링하는 질의문:\n`SELECT 학번, 이름 FROM 학생 WHERE 학년 IN (3, 4);`",
      trapPoint: "IN 연산자 괄호 안에 대상 값들을 콤마로 나열합니다. 조회할 속성은 학번, 이름입니다."
    },
    {
      id: 7,
      category: "데이터베이스",
      prompt: "데이터베이스 트랜잭션 제어어(TCL) 중 ROLLBACK(롤백)의 개념을 서술하시오.",
      answer: "트랜잭션 실행 중 오류가 발생했을 때 변경 사항을 취소하고 이전 상태로 되돌리는 연산",
      aliases: [
        "트랜잭션 실행 중 오류가 발생했을 때 변경 사항을 취소하고 이전 상태로 되돌리는 연산",
        "트랜잭션 처리 중 오류가 발생했을 때 트랜잭션의 연산을 취소하고 이전 상태로 되돌리는 명령어",
        "트랜잭션 취소",
        "원자성을 보장하기 위해 트랜잭션의 변경사항을 취소하고 이전 상태로 복구하는 연산"
      ],
      explanation: "ROLLBACK은 트랜잭션의 비정상 종료나 오류 발생 시, 원자성(Atomicity)을 보장하기 위해 트랜잭션이 수행한 데이터베이스 변경 내용을 모두 취소하고 트랜잭션 시작 이전 또는 특정 저장점(SAVEPOINT) 상태로 되돌리는 제어어입니다.",
      trapPoint: "COMMIT은 영구 반영, ROLLBACK은 취소 및 이전 상태 복귀입니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "네트워크 계층(IP 계층)에서 무결성과 인증을 보장하는 인증 헤더(AH)와 기밀성을 보장하는 암호화(ESP)를 제공하여 통신의 보안성을 향상시키는 표준 프로토콜의 영문 약어를 쓰시오.",
      answer: "IPSec",
      aliases: ["IPSec", "IPsec", "IPSEC", "Internet Protocol Security"],
      explanation: "IPSec(IP Security)은 3계층(네트워크 계층)에서 IP 패킷을 보호하기 위한 표준 프로토콜로, 인증 헤더(AH)와 암호화 캡슐화 페이로드(ESP), 키 교환 프로토콜(IKE)을 사용합니다.",
      trapPoint: "네트워크 계층 보안 표준 프로토콜이자 AH와 ESP로 구성된 것은 IPSec입니다."
    },
    {
      id: 9,
      category: "소프트웨어공학",
      prompt: "애플리케이션 프로그램을 직접 실행하지 않고 소스 코드 자체를 분석하여 코딩 표준 준수 여부, 스타일, 복잡도 및 잠재적 결함을 사전에 검출하기 위해 사용하는 테스트 도구 유형을 쓰시오.",
      answer: "정적 분석 도구",
      aliases: ["정적 분석 도구", "정적 분석", "정적 테스트 도구", "정적 테스트", "Static Analysis Tool", "Static Analysis"],
      explanation: "정적 분석 도구(Static Analysis Tool)는 소스 코드를 실행하지 않고 구문 분석, 타입 검사, 잠재 결함 및 코딩 표준 준수 여부를 검사하는 도구입니다 (예: SonarQube, Checkstyle). 반대로 실행하면서 검사하는 것은 동적 분석 도구입니다.",
      trapPoint: "실행하지 않고 코드를 분석하는 것은 정적 분석(Static Analysis)입니다."
    },
    {
      id: 10,
      category: "소프트웨어공학",
      prompt: "GoF 디자인 패턴 중 다음 설명에 해당하는 행위 패턴의 영문 명칭(Full Name)을 쓰시오.",
      passage: `[보기]
한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 모든 객체들에게 자동으로 통지가 가고 내용이 갱신되는 1:N 의존 관계를 정의하는 패턴으로, 발행-구독(Publish-Subscribe) 모델로도 잘 알려져 있다.`,
      answer: "Observer Pattern",
      aliases: ["Observer Pattern", "Observer pattern", "observer pattern", "Observer", "옵저버 패턴", "옵서버 패턴"],
      explanation: "옵저버 패턴(Observer Pattern)은 한 객체(Subject)의 상태 변화가 있을 때 이를 등록된 모든 관찰자(Observer) 객체들에게 자동으로 알림으로써 느슨한 결합을 유지하는 행위 디자인 패턴입니다.",
      trapPoint: "영문 풀네임 요구 시 `Observer Pattern`으로 작성합니다."
    },
    {
      id: 11,
      category: "운영체제",
      prompt: "리눅스(Linux) 커널을 기반으로 모바일 기기를 위해 개발된 오픈소스 운영체제로, 자바와 코틀린으로 앱을 작성할 수 있으며 ART(Android Runtime) 라이브러리를 제공하는 구글의 대표적인 모바일 OS는 무엇인가?",
      answer: "안드로이드",
      aliases: ["안드로이드", "Android", "android"],
      explanation: "안드로이드(Android)는 구글이 주도하는 오픈 핸드셋 얼라이언스(OHA)가 개발한 모바일 운영체제로, 리눅스 커널 기반의 오픈소스 플랫폼입니다.",
      trapPoint: "리눅스 기반 모바일 운영체제는 안드로이드(Android)입니다."
    },
    {
      id: 12,
      category: "SQL",
      prompt: "학생 테이블의 NAME 속성에 대해 `IDX_NAME`이라는 이름으로 인덱스를 생성하는 표준 SQL DDL 문을 작성하시오.",
      passage: `[학생 테이블]
| STID | NAME | SCORE | DEPTID |
| --- | --- | --- | --- |
| 1000 | 김이름 | 90 | 1 |
| 2000 | 허이름 | 95 | 2 |
| 3000 | 조이름 | 90 | 3 |
| 4000 | 장이름 | 95 | 4 |`,
      answer: "CREATE INDEX IDX_NAME ON 학생(NAME);",
      aliases: [
        "CREATE INDEX IDX_NAME ON 학생(NAME);",
        "CREATE INDEX IDX_NAME ON 학생(NAME)",
        "create index idx_name on 학생(name);",
        "create index idx_name on 학생(name)",
        "CREATE INDEX IDX_NAME ON 학생 (NAME);",
        "CREATE INDEX IDX_NAME ON 학생 (NAME)"
      ],
      explanation: "인덱스 생성 DDL 문법:\n`CREATE INDEX 인덱스명 ON 테이블명(속성명);`\n따라서 `CREATE INDEX IDX_NAME ON 학생(NAME);` 입니다.",
      trapPoint: "CREATE INDEX [인덱스명] ON [테이블명]([컬럼명]); 구문을 정확히 지켜야 합니다."
    },
    {
      id: 13,
      category: "소프트웨어공학",
      prompt: "HTTP, HTTPS, SMTP 등을 통해서 XML 기반의 메시지를 네트워크상에서 교환하는 웹 서비스 표준 프로토콜로, WSDL 및 UDDI와 함께 웹 서비스 기술의 핵심을 구성하는 프로토콜의 영문 약어를 쓰시오.",
      answer: "SOAP",
      aliases: ["SOAP", "soap", "Simple Object Access Protocol"],
      explanation: "SOAP(Simple Object Access Protocol)은 분산 환경에서 이기종 시스템 간 정보 교환을 위해 XML 기반 메시지 봉투(Envelope), 헤더(Header), 바디(Body) 규격을 정의한 프로토콜입니다.",
      trapPoint: "XML 기반의 웹 서비스 통신 프로토콜은 SOAP입니다."
    },
    {
      id: 14,
      category: "보안",
      prompt: "웹 애플리케이션의 취약점을 악용하여 공격자가 사용자 입력 폼이나 URL 파라미터에 악의적인 SQL 구문을 삽입·실행시켜 데이터베이스의 정보를 무단 열람, 조작하거나 인증을 우회하는 공격 기법을 쓰시오.",
      answer: "SQL 인젝션",
      aliases: ["SQL 인젝션", "SQL인젝션", "SQL 삽입", "SQL 삽입 공격", "SQL Injection", "SQL injection"],
      explanation: "SQL 인젝션(SQL Injection, SQL 삽입 공격)은 검증되지 않은 외부 입력을 동적 쿼리에 결합할 때 발생하는 취약점으로, 이를 방어하기 위해 바인드 변수(Prepared Statement)를 사용해야 합니다.",
      trapPoint: "데이터베이스 질의문을 삽입 조작하는 공격은 SQL 인젝션(SQL 삽입)입니다."
    },
    {
      id: 15,
      category: "운영체제",
      prompt: "리눅스/유닉스 환경에서 파일 `a.txt`에 대해 파일 소유자(사용자)에게는 읽기/쓰기/실행 권한(rwx), 그룹에게는 읽기/실행 권한(r-x), 기타 사용자에게는 실행 권한(--x)을 부여하는 명령어를 8진법 숫자를 사용하여 한 줄로 작성하시오.",
      answer: "chmod 751 a.txt",
      aliases: ["chmod 751 a.txt", "chmod 751 ./a.txt"],
      explanation: "권한 8진수 계산:\n- 소유자: r(4) + w(2) + x(1) = 7\n- 그룹: r(4) + -(0) + x(1) = 5\n- 기타: -(0) + -(0) + x(1) = 1\n따라서 명령어는 `chmod 751 a.txt` 입니다.",
      trapPoint: "8진수 권한값은 (소유자, 그룹, 기타) 순서로 751 입니다."
    },
    {
      id: 16,
      category: "소프트웨어공학",
      prompt: "사용자 인터페이스(UI) 설계의 4대 기본 원칙 중 다음 설명에 해당하는 원칙의 명칭을 쓰시오.",
      passage: `[설명]
사용자가 의도하고 목표하는 바를 시스템을 통해 정확하고 완벽하게 달성할 수 있도록 보장해야 한다는 원칙`,
      answer: "유효성",
      aliases: ["유효성", "Effectiveness", "effectiveness"],
      explanation: "UI 설계 4대 원칙:\n1. 직관성(Intuitiveness): 누구나 쉽게 이해하고 사용\n2. 유효성(Effectiveness): 사용자의 목적을 정확하고 완전하게 달성\n3. 학습성(Learnability): 누구나 쉽게 학습\n4. 유연성(Flexibility): 사용자의 요구사항을 최대한 수용",
      trapPoint: "목적 달성의 정확성과 완전성을 의미하는 원칙은 '유효성'입니다."
    },
    {
      id: 17,
      category: "데이터베이스",
      prompt: "전 세계의 개방된 데이터(Open Data)들을 웹상에서 URI로 식별하고 시맨틱 웹 표준(RDF)을 통해 상호 연결(Linked Data)함으로써 거대한 지식 네트워크를 구축하는 기술의 영문 약어를 쓰시오.",
      answer: "LOD",
      aliases: ["LOD", "lod", "Linked Open Data", "연계 오픈 데이터"],
      explanation: "LOD(Linked Open Data)는 Linked Data(연결 데이터)와 Open Data(개방 데이터)의 합성어로, 전 세계의 데이터를 웹상에서 상호 연결하여 컴퓨터가 의미를 이해하고 질의할 수 있게 하는 시맨틱 웹 기술입니다.",
      trapPoint: "Linked Data + Open Data = LOD 입니다."
    },
    {
      id: 18,
      category: "데이터베이스",
      prompt: "다음은 데이터 모델링 절차이다. 빈칸 (1), (2), (3)에 들어갈 단계를 보기에서 찾아 순서대로 쓰시오.",
      passage: `요구사항 분석 > ( 1 ) > ( 2 ) > ( 3 )

[보기]
개념적 데이터 모델링, 논리적 데이터 모델링, 물리적 데이터 모델링`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["개념적 데이터 모델링", "개념적 모델링", "개념적 설계", "개념적"],
        "2": ["논리적 데이터 모델링", "논리적 모델링", "논리적 설계", "논리적"],
        "3": ["물리적 데이터 모델링", "물리적 모델링", "물리적 설계", "물리적"]
      },
      answer: "(1) 개념적 데이터 모델링, (2) 논리적 데이터 모델링, (3) 물리적 데이터 모델링",
      aliases: [
        "개념적 데이터 모델링, 논리적 데이터 모델링, 물리적 데이터 모델링",
        "개념적, 논리적, 물리적",
        "개념적 모델링, 논리적 모델링, 물리적 모델링"
      ],
      explanation: "데이터 모델링 3단계:\n1. 개념적 데이터 모델링: 핵심 엔티티와 관계 정의 (ERD)\n2. 논리적 데이터 모델링: 관계 스키마 변환, 정규화\n3. 물리적 데이터 모델링: DBMS 저장 구조 및 인덱스 설계",
      trapPoint: "개념적 -> 논리적 -> 물리적 순서입니다."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class A {
    private int a;
    public A(int a) {
        this.a = a;
    }
    public void display() {
        System.out.println("a=" + a);
    }
}

class B extends A {
    public B(int a) {
        super(a);
        super.display();
    }
}

public class good {
    public static void main(String[] args) {
        B obj = new B(10);
    }
}`,
      answer: "a=10",
      aliases: ["a=10", "a = 10"],
      explanation: "1. `new B(10);` 실행 시 자식 클래스 B의 생성자 호출\n2. `super(a);`에 의해 부모 클래스 A의 생성자 호출 -> 멤버변수 a에 10 저장\n3. `super.display();`에 의해 부모 클래스의 display() 호출 -> \"a=\" + 10 즉 `a=10` 출력",
      trapPoint: "출력 형식 \"a=\" + a 이므로 공백 없이 a=10 입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "소프트웨어 개발 수명주기 전반에 걸쳐 요구사항 명세서, 설계 문서, 소스 코드 등 모든 산출물의 변경 사항을 체계적으로 추적, 기록, 통제하는 관리 활동을 무엇이라 하는가? (CVS, SVN, Git 등이 이 활동을 지원하는 대표적 도구이다.)",
      answer: "형상 관리",
      aliases: ["형상 관리", "형상관리", "SCM", "Software Configuration Management"],
      explanation: "형상 관리(SCM, Software Configuration Management)는 소프트웨어 개발 과정에서 발생하는 각종 변경 사항을 체계적으로 관리하여 무결성과 일관성을 유지하는 소프트웨어 공학 활동입니다.",
      trapPoint: "Git, SVN과 같은 도구를 활용한 버전 및 변경 관리는 '형상 관리'입니다."
    }
  ]
};

