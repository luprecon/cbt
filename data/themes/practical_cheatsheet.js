/**
 * [테마] 실기 빈출 족보 단답형 25선 (합격 직결 핵심 암기 키워드)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["practical_cheatsheet"] = {
  id: "practical_cheatsheet",
  title: "📑 [테마] 실기 빈출 족보 단답형 25선",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "단답형",
      prompt: "동일한 테스트 케이스로 반복 실행하면 더 이상 새로운 결함을 발견할 수 없으므로 주기적으로 테스트 케이스를 개선해야 한다는 소프트웨어 테스트의 기본 원리를 쓰시오.",
      answer: "살충제 패러독스",
      aliases: ["살충제 패러독스", "살충제패러독스", "Pesticide Paradox", "살충제 역설"],
      explanation: "동일한 테스트 케이스로 반복 실행하면 더 이상 새로운 결함을 발견하기 어렵다는 원리입니다. 주기적으로 테스트 케이스를 리뷰하고 새로운 시각에서 갱신해야 합니다."
    },
    {
      id: 2,
      category: "단답형",
      prompt: "GoF 디자인 패턴 중 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고 이에 대한 전역적인 접근점을 제공하는 생성 패턴의 명칭을 쓰시오.",
      answer: "싱글톤",
      aliases: ["싱글톤", "싱글톤 패턴", "Singleton", "Singleton Pattern"],
      explanation: "GoF 디자인 패턴의 생성 패턴 중 하나로, 어떤 클래스의 인스턴스가 오직 하나만 생성됨을 보장하고, 어디서든 이 인스턴스에 접근할 수 있도록 전역적인 접근점을 제공합니다."
    },
    {
      id: 3,
      category: "단답형",
      prompt: "객체의 상태 변화가 발생했을 때 연관된 다른 관찰자 객체들에게 통보하고 자동으로 갱신되도록 1:N 의존성을 정의하는 GoF 행위 패턴의 명칭을 쓰시오.",
      answer: "옵저버",
      aliases: ["옵저버", "옵저버 패턴", "옵서버", "Observer", "Observer Pattern"],
      explanation: "GoF 디자인 패턴의 행위 패턴 중 하나로, 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에게 자동으로 내용이 갱신되는 1:N 의존 관계를 정의합니다."
    },
    {
      id: 4,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 가장 결합도가 낮고 독립성이 우수한 이상적인 결합도의 명칭을 쓰시오 (두 모듈이 단순 데이터 파라미터만 교환).",
      answer: "자료 결합도",
      aliases: ["자료 결합도", "자료결합도", "Data Coupling"],
      explanation: "모듈 간의 인터페이스가 단순한 자료 요소(파라미터)로만 구성되어 가장 결합도가 낮고 독립성이 높은 가장 이상적인 결합도입니다."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 가장 결합도가 강하여 최악의 품질을 갖는 결합도의 명칭을 쓰시오 (다른 모듈의 내부 데이터나 코드를 직접 조작).",
      answer: "내용 결합도",
      aliases: ["내용 결합도", "내용결합도", "Content Coupling"],
      explanation: "한 모듈이 다른 모듈의 내부 데이터나 코드를 직접 참조하거나 수정하는 형태로, 결합도가 가장 높아 유지보수성이 가장 나쁜 결합도입니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "소프트웨어 응집도(Cohesion) 중 가장 응집도가 높아 가장 바람직한 유형으로, 모듈 내의 모든 요소가 단 하나의 고유 기능을 완벽히 수행하는 응집도를 쓰시오.",
      answer: "기능적 응집도",
      aliases: ["기능적 응집도", "기능적응집도", "Functional Cohesion"],
      explanation: "모듈 내부의 모든 요소들이 단 하나의 고유하고 명확한 기능을 수행하기 위해 구성된 응집도로, 응집도 유형 중 가장 높고 가장 이상적입니다."
    },
    {
      id: 7,
      category: "단답형",
      prompt: "소프트웨어 응집도(Cohesion) 중 모듈 내 요소들이 아무런 의미적 연관성 없이 우연히 모여 있는 가장 낮은 품질의 응집도를 쓰시오.",
      answer: "우연적 응집도",
      aliases: ["우연적 응집도", "우연적응집도", "Coincidental Cohesion"],
      explanation: "모듈 내부의 요소들이 아무런 의미적, 논리적 연관성 없이 우연히 같은 모듈에 모여 있는 형태로, 응집도가 가장 낮아 품질이 가장 나쁩니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "관계 데이터베이스 정규화 과정에서 1NF, 2NF, 3NF를 거칠 때 각각 제거해야 하는 대상을 순서대로 나열하시오: 1NF=( 1 ), 2NF=( 2 ), 3NF=( 3 ).",
      passage: `1NF: (  1  ) 제거 (도메인이 원자값)
2NF: (  2  ) 제거 (완전 함수 종속 만족)
3NF: (  3  ) 제거`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["도메인 원자값", "비원자값", "원자값"],
        "2": ["부분 함수 종속", "부분함수종속"],
        "3": ["이행 함수 종속", "이행함수종속", "이행적 함수 종속"]
      },
      answer: "(1) 비원자값, (2) 부분 함수 종속, (3) 이행 함수 종속",
      aliases: ["비원자값, 부분 함수 종속, 이행 함수 종속"],
      explanation: "관계 데이터베이스 정규화 단계:\n- 1NF: 도메인이 원자값만 갖도록 비원자값 제거\n- 2NF: 기본키에 완전 함수 종속되도록 부분 함수 종속 제거\n- 3NF: 기본키가 아닌 일반 컬럼 간의 종속을 없애기 위해 이행 함수 종속 제거"
    },
    {
      id: 9,
      category: "단답형",
      prompt: "트랜잭션의 4대 특징(ACID) 중 트랜잭션의 모든 연산이 데이터베이스에 완전히 반영되거나 아니면 전혀 반영되지 않아야 한다는 특성(All or Nothing)의 명칭을 쓰시오.",
      answer: "원자성",
      aliases: ["원자성", "Atomicity", "atomicity"],
      explanation: "트랜잭션 4대 특성(ACID) 중 하나로, 트랜잭션 내의 모든 연산이 데이터베이스에 완전히 반영(Commit)되거나, 실패 시 전혀 반영되지 않고 원상 복구(Rollback)되어야 한다는 All-or-Nothing 원칙입니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "소프트웨어 테스트 기법 중 프로그램 내부 코드를 보지 않고 오직 요구사항 명세서를 기반으로 입출력의 정확성을 검증하는 테스트 기법의 명칭을 쓰시오.",
      answer: "블랙박스 테스트",
      aliases: ["블랙박스 테스트", "블랙박스테스트", "Black Box Test", "Black-box Testing"],
      explanation: "소프트웨어 내부 구조나 소스 코드를 보지 않고, 요구사항 명세서를 기반으로 프로그램의 기능이 명세서대로 동작하는지 입력값에 따른 출력값을 검증하는 테스트 기법입니다."
    },
    {
      id: 11,
      category: "단답형",
      prompt: "오류 수정이나 기능 변경 후 기존의 정상 작동하던 기능에 부작용(사이드 이펙트)이나 새로운 결함이 발생하지 않았는지 확인하기 위해 반복 수행하는 재테스트의 명칭을 쓰시오.",
      answer: "회귀 테스트",
      aliases: ["회귀 테스트", "회귀테스트", "Regression Test", "Regression Testing"],
      explanation: "오류 수정, 기능 개선 또는 변경 작업 후, 이전에 정상 작동하던 다른 기능이나 모듈에 예상치 못한 부작용(사이드 이펙트)이나 새로운 결함이 발생하지 않았는지 검증하기 위해 기존 테스트 케이스를 재수행하는 테스트입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "공격자가 신뢰할 수 있는 사용자로 위장하여 사용자의 브라우저를 통해 악의적인 요청을 서버로 전송하도록 유도하는 웹 취약점의 영문 약어(4글자)를 쓰시오.",
      answer: "CSRF",
      aliases: ["CSRF", "csrf", "Cross-Site Request Forgery", "크로스 사이트 요청 변조"],
      explanation: "크로스 사이트 요청 변조(Cross-Site Request Forgery)는 공격자가 사용자의 브라우저 세션 권한을 도용하여 사용자가 의도하지 않은 악의적 요청(송금, 정보 수정 등)을 서버로 전송하게 만드는 웹 취약점입니다."
    },
    {
      id: 13,
      category: "단답형",
      prompt: "웹 페이지의 입력 폼에 악의적인 자바스크립트 코드를 삽입하여 방문자의 세션 토큰이나 쿠키를 탈취하는 웹 보안 취약점의 영문 약어(3글자)를 쓰시오.",
      answer: "XSS",
      aliases: ["XSS", "xss", "Cross-Site Scripting", "크로스 사이트 스크립팅"],
      explanation: "크로스 사이트 스크립팅(Cross-Site Scripting)은 게시판이나 입력 폼에 악의적인 자바스크립트 코드를 삽입하여, 이를 열람하는 피해자의 브라우저에서 스크립트가 실행되어 세션 쿠키 탈취, 악성코드 유포 등을 유발하는 취약점입니다."
    },
    {
      id: 14,
      category: "단답형",
      prompt: "동적 쿼리를 생성할 때 사용자 입력값 검증 부재를 악용하여 데이터베이스를 무단 조작하거나 탈취하는 대표적인 취약점의 명칭을 쓰시오.",
      answer: "SQL 삽입",
      aliases: ["SQL 삽입", "SQL Injection", "sql injection", "SQL 인젝션"],
      explanation: "SQL 인젝션(SQL Injection)은 사용자 입력값에 대한 유효성 검증(입력 필터링 및 Prepared Statement 미사용)이 부재할 때 악의적인 SQL 구문을 삽입하여 데이터베이스를 무단 열람, 조작, 삭제하는 대표적인 공격입니다."
    },
    {
      id: 15,
      category: "단답형",
      prompt: "네트워크 상을 지나가는 패킷을 수동적으로 엿듣고 가로채어 정보를 탈취하는 도청 행위의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "스니핑",
      aliases: ["스니핑", "Sniffing", "sniffing"],
      explanation: "스니핑(Sniffing)은 네트워크 상을 지나가는 패킷을 수동적으로 엿듣고 가로채어 암호화되지 않은 계정 정보, 패스워드 등을 탈취하는 수동적(Passive) 도청 공격 기법입니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "OSI 7계층 중 종단 간(End-to-End)의 신뢰성 있는 데이터 전송을 담당하며 전송 단위가 세그먼트(Segment)인 4계층의 명칭을 쓰시오.",
      answer: "전송 계층",
      aliases: ["전송 계층", "전송계층", "Transport Layer", "4계층"],
      explanation: "OSI 7계층 중 4계층으로, 송신자와 수신자 간의 종단(End-to-End) 프로세스 간 신뢰성 있는 데이터 전송을 담당합니다. 데이터 단위는 세그먼트(Segment)이며 대표 프로토콜로 TCP, UDP가 있습니다."
    },
    {
      id: 17,
      category: "단답형",
      prompt: "논리적 IP 주소를 기반으로 물리적 MAC 주소를 알아내기 위해 브로드캐스트로 질의하는 프로토콜의 영문 약어(3글자)를 쓰시오.",
      answer: "ARP",
      aliases: ["ARP", "arp", "Address Resolution Protocol"],
      explanation: "ARP(Address Resolution Protocol, 주소 결정 프로토콜)는 네트워크 통신을 위해 3계층 논리적 IP 주소를 2계층 물리적 MAC 주소로 변환(매핑)하는 프로토콜입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "TCP 연결 수립을 위해 클라이언트와 서버 간에 수행하는 SYN, SYN+ACK, ACK 3단계 절차의 명칭을 쓰시오.",
      answer: "3-Way Handshake",
      aliases: ["3-Way Handshake", "3-way handshake", "3웨이 핸드셰이크", "3 way handshake"],
      explanation: "TCP 프로토콜에서 신뢰성 있는 연결을 수립하기 위해 사용하는 3단계 절차로, SYN(동기화 요청) -> SYN+ACK(수락 및 요청) -> ACK(확인 응답)의 순서로 진행됩니다."
    },
    {
      id: 19,
      category: "단답형",
      prompt: "링크 상태 기반 라우팅 프로토콜로, 다익스트라(Dijkstra) 최단 경로 알고리즘을 사용하는 대표적인 내부 라우팅 프로토콜의 영문 약어(4글자)를 쓰시오.",
      answer: "OSPF",
      aliases: ["OSPF", "ospf", "Open Shortest Path First"],
      explanation: "OSPF(Open Shortest Path First)는 링크 상태(Link-State) 알고리즘을 사용하며, 다익스트라(Dijkstra) 최단 경로 알고리즘을 기반으로 대규모 자율 시스템(AS) 내부에서 최적의 경로를 찾는 대표적인 IGP 라우팅 프로토콜입니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "양자 컴퓨터의 쇼어 알고리즘 공격에도 안전성을 보장할 수 있도록 격자 기반 등의 수학적 난제로 설계된 차세대 암호 체계의 영문 약어(3글자)를 쓰시오.",
      answer: "PQC",
      aliases: ["PQC", "pqc", "양자내성암호", "Post-Quantum Cryptography"],
      explanation: "양자내성암호(Post-Quantum Cryptography)는 양자 컴퓨터의 쇼어(Shor) 알고리즘 등으로 기존 RSA, ECC 등 공개키 암호가 무력화되는 위협에 대응하여 격자 기반, 다변수 기반 등 양자 컴퓨터로도 풀기 어려운 수학적 난제를 이용해 설계된 차세대 암호 체계입니다."
    },
    {
      id: 21,
      category: "단답형",
      prompt: "제3자 애플리케이션에 비밀번호를 노출하지 않고 사용자 자원에 대한 접근 권한을 위임할 수 있도록 정의된 표준 인가 프레임워크의 명칭을 쓰시오.",
      answer: "OAuth 2.0",
      aliases: ["OAuth 2.0", "OAuth", "oauth", "OAuth2.0"],
      explanation: "OAuth 2.0은 제3자 애플리케이션이 사용자의 비밀번호를 직접 보거나 저장하지 않고도 접근 토큰(Access Token)을 발급받아 사용자의 제한된 자원에 접근할 수 있도록 권한을 위임하는 업계 표준 인가(Authorization) 프레임워크입니다."
    },
    {
      id: 22,
      category: "단답형",
      prompt: "객체지향 설계 원칙(SOLID) 중 '하위 클래스는 상위 클래스의 기능을 온전히 대체할 수 있어야 한다'는 원칙의 명칭을 쓰시오.",
      answer: "리스코프 치환 원칙",
      aliases: ["리스코프 치환 원칙", "리스코프치환원칙", "LSP", "Liskov Substitution Principle"],
      explanation: "SOLID 객체지향 설계 원칙 중 L에 해당하며, 자식 클래스(하위 타입)는 언제나 자신의 부모 클래스(상위 타입)를 대체할 수 있어야 한다는 원칙입니다. 즉 하위 클래스는 상위 클래스의 명세와 규약을 위배하지 않아야 합니다."
    },
    {
      id: 23,
      category: "단답형",
      prompt: "객체지향 설계 원칙(SOLID) 중 '소프트웨어 개체는 확장에 열려 있고, 수정에는 닫혀 있어야 한다'는 원칙의 명칭을 쓰시오.",
      answer: "개방 폐쇄 원칙",
      aliases: ["개방 폐쇄 원칙", "개방폐쇄원칙", "OCP", "Open-Closed Principle"],
      explanation: "SOLID 객체지향 설계 원칙 중 O에 해당하며, 소프트웨어의 구성 요소(클래스, 모듈 등)는 기능의 확장에는 열려 있어야 하고(Open), 기존 코드의 수정에는 닫혀 있어야(Closed) 한다는 원칙입니다. 주로 인터페이스와 다형성을 통해 실현합니다."
    },
    {
      id: 24,
      category: "단답형",
      prompt: "데이터베이스에서 둘 이상의 트랜잭션이 서로가 점유한 자원의 잠금 해제를 무한정 대기하는 상태를 일컫는 용어의 명칭을 쓰시오.",
      answer: "교착 상태",
      aliases: ["교착 상태", "교착상태", "Deadlock", "deadlock", "데드락"],
      explanation: "교착 상태(Deadlock)는 다중 프로세스 또는 트랜잭션 환경에서 둘 이상의 작업이 서로가 가진 자원의 잠금(Lock) 해제를 무한정 기다리며 진행이 멈춰버리는 현상입니다. 상호 배제, 점유와 대기, 비선점, 환형 대기 4대 조건이 모두 충족될 때 발생합니다."
    },
    {
      id: 25,
      category: "단답형",
      prompt: "객체지향 설계 원칙(SOLID) 중 '고수준 모듈은 저수준 모듈의 구현에 의존해서는 안 되며, 둘 모두 추상화(인터페이스)에 의존해야 한다'는 원칙의 명칭을 쓰시오.",
      answer: "의존 역전 원칙",
      aliases: ["의존 역전 원칙", "의존역전원칙", "DIP", "Dependency Inversion Principle"],
      explanation: "SOLID 객체지향 설계 원칙 중 D에 해당하며, 고수준 모듈은 저수준 모듈의 구체적인 구현에 의존해서는 안 되며 둘 다 추상화(인터페이스)에 의존해야 한다는 원칙입니다. 구체 클래스보다 인터페이스에 의존함으로써 결합도를 낮춥니다."
    }
  ]
};
