/**
 * 정보처리기사 실기 족보 1탄 / 2탄 / 3탄 및 공부방법 꿀팁 종합 데이터
 * 출처 및 실기 핵심 압축 정리
 */
window.CHEATSHEET_DATA = {
  part1: {
    title: "📑 실기 족보 1탄: 소프트웨어 설계 & 개발방법론",
    category: "소프트웨어 공학",
    sections: [
      {
        heading: "1. GoF 디자인 패턴 23종 완벽 암기 공식",
        content: `• <strong>생성 패턴 (5개)</strong>: [추빌팩프싱] 추상 팩토리(Abstract Factory), 빌더(Builder), 팩토리 메서드(Factory Method), 프로토타입(Prototype), 싱글톤(Singleton)
• <strong>구조 패턴 (7개)</strong>: [어브컴데퍼플프] 어댑터(Adapter), 브리지(Bridge), 컴포지트(Composite), 데코레이터(Decorator), 퍼사드(Facade), 플라이웨이트(Flyweight), 프록시(Proxy)
• <strong>행위 패턴 (11개)</strong>: 책임 연쇄(Chain of Resp.), 커맨드(Command), 인터프리터(Interpreter), 이터레이터(Iterator), 중재자(Mediator), 메멘토(Memento), 옵저버(Observer), 상태(State), 전략(Strategy), 템플릿 메서드(Template Method), 비지터(Visitor)`
      },
      {
        heading: "2. 모듈 결합도 (Coupling) 7단계 [약함(좋음) -> 강함(나쁨)]",
        content: `• 암기 공식: <strong>[자스제외부내]</strong>
1. <strong>자료 (Data)</strong>: 가장 낮음(가장 우수). 모듈 간 파라미터로 단순 데이터 값만 교환
2. <strong>스탬프 (Stamp)</strong>: 모듈 간 배열, 구조체 등 자료구조가 전달됨
3. <strong>제어 (Control)</strong>: 어떤 모듈이 다른 모듈의 내부 논리 제어 신호를 전달
4. <strong>외부 (External)</strong>: 외부 선언 변수나 공통 데이터를 여러 모듈이 참조
5. <strong>공통 (Common)</strong>: 전역(Global) 변수 영역을 여러 모듈이 함께 사용
6. <strong>내용 (Content)</strong>: 가장 높음(가장 나쁨). 다른 모듈의 내부 기능 및 데이터를 직접 참조/수정`
      },
      {
        heading: "3. 모듈 응집도 (Cohesion) 7단계 [강함(좋음) -> 약함(나쁨)]",
        content: `• 암기 공식: <strong>[우순교절시논우]</strong> (기순교절시논우)
1. <strong>기능적 (Functional)</strong>: 가장 높음(가장 우수). 모듈 내부의 모든 요소가 단 하나의 단일 기능만 수행
2. <strong>순차적 (Sequential)</strong>: 한 요소의 출력 결과가 다음 요소의 입력값으로 사용됨
3. <strong>교환적/통신적 (Communication)</strong>: 동일한 입력 데이터나 출력 데이터를 서로 다른 기능들이 처리
4. <strong>절차적 (Procedural)</strong>: 요소들이 지정된 순서대로 순차 실행됨
5. <strong>시간적 (Temporal)</strong>: 특정 시간대(초기화, 종료 등)에 함께 실행되는 기능들을 묶음
6. <strong>논리적 (Logical)</strong>: 유사한 성격의 기능들을 한 모듈에 묶음 (예: 모든 출력 기능 모음)
7. <strong>우연적 (Coincidental)</strong>: 가장 낮음(가장 나쁨). 아무 관련 없는 요소들이 우연히 모임`
      },
      {
        heading: "4. 소프트웨어 테스트 7원리 & 테스트 기법",
        content: `• <strong>살충제 패러독스 (Pesticide Paradox)</strong>: 동일한 테스트 케이스로 반복 테스트하면 새로운 결함을 찾을 수 없으므로 정기적으로 케이스를 개선해야 함
• <strong>화이트박스 테스트</strong>: 구문(Statement), 결정(Decision/Branch), 조건(Condition), 조건/결정, 변경 조건/결정(MC/DC), 다중 조건, 경로 커버리지
• <strong>블랙박스 테스트</strong>: 동등 분할(Equivalence Partitioning), 경계값 분석(Boundary Value Analysis), 원인-효과 그래프, 오류 예측, 상태 전이 검사`
      }
    ]
  },
  part2: {
    title: "💾 실기 족보 2탄: 데이터베이스 & SQL 핵심 총정리",
    category: "데이터베이스",
    sections: [
      {
        heading: "1. 관계형 데이터베이스 정규화 단계 (Normalization)",
        content: `• 암기 공식: <strong>[원부이결다조] (두부이겨다조)</strong>
1. <strong>1NF (비정규 -> 1NF)</strong>: 원자값으로 구성 (도메인이 원자값)
2. <strong>2NF (1NF -> 2NF)</strong>: 부분 함수 종속성 제거 (완전 함수 종속 만족)
3. <strong>3NF (2NF -> 3NF)</strong>: 이행적 함수 종속성 제거 (X -> Y, Y -> Z 일 때 X -> Z 제거)
4. <strong>BCNF (3NF -> BCNF)</strong>: 결정자가 모두 후보키 (모든 결정자가 후보키)
5. <strong>4NF (BCNF -> 4NF)</strong>: 다치 종속(MVD: Multi-Valued Dependency) 제거
6. <strong>5NF (4NF -> 5NF)</strong>: 조인 종속(JD: Join Dependency) 제거 및 후보키를 통한 복원`
      },
      {
        heading: "2. 트랜잭션 4대 특성 (ACID)",
        content: `• <strong>Atomicity (원자성)</strong>: All or Nothing. 트랜잭션의 연산은 모두 반영되거나 전혀 반영되지 않아야 함 (회복 기법)
• <strong>Consistency (일관성)</strong>: 트랜잭션 성공 후에도 언제나 데이터베이스의 무결성 제약조건을 만족해야 함
• <strong>Isolation (고립성/격리성)</strong>: 둘 이상의 트랜잭션이 동시 실행될 때 다른 트랜잭션의 연산에 끼어들 수 없음 (병행 제어)
• <strong>Durability (영속성/지속성)</strong>: 성공적으로 완료된 트랜잭션 결과는 시스템 고장 시에도 영구 보존되어야 함`
      },
      {
        heading: "3. SQL 핵심 DDL / DML / DCL 문법 요약",
        content: `• <strong>DDL</strong>: CREATE, ALTER, DROP, TRUNCATE (테이블/스키마 정의)
• <strong>DML</strong>: SELECT, INSERT INTO ... VALUES, UPDATE ... SET, DELETE FROM
• <strong>DCL</strong>: GRANT 권한 ON 대상 TO 사용자, REVOKE 권한 ON 대상 FROM 사용자, COMMIT, ROLLBACK
• <strong>집계 및 그룹 함수</strong>:
  - <code>COUNT()</code>, <code>SUM()</code>, <code>AVG()</code>, <code>MAX()</code>, <code>MIN()</code>
  - <strong>HAVING</strong>: GROUP BY로 그룹핑된 결과에 대한 필터링 (WHERE에는 집계함수 불가!)
• <strong>윈도우 함수 (순위)</strong>:
  - <code>RANK()</code>: 공동 1위 2명이면 다음 순위는 3위 (1, 1, 3, 4)
  - <code>DENSE_RANK()</code>: 공동 1위 2명이어도 다음 순위는 2위 (1, 1, 2, 3)
  - <code>ROW_NUMBER()</code>: 중복 없이 고유한 일련번호 부여 (1, 2, 3, 4)`
      }
    ]
  },
  part3: {
    title: "🔒 실기 족보 3탄: 시스템 보안 & 네트워크 & 신기술",
    category: "보안 / 네트워크",
    sections: [
      {
        heading: "1. 서브넷 마스크(Subnet Mask) & CIDR 계산 비법",
        content: `• <strong>/24</strong>: 255.255.255.0 -> 호스트 256개 (사용 가능 254개, 네트워크 0, 브로드캐스트 255 제외)
• <strong>/25</strong>: 255.255.255.128 -> 블록 크기 128 (호스트 128개, 사용 가능 126개)
• <strong>/26</strong>: 255.255.255.192 -> 블록 크기 64 (호스트 64개, 사용 가능 62개)
• <strong>/27</strong>: 255.255.255.224 -> 블록 크기 32 (호스트 32개, 사용 가능 30개)
• <strong>/28</strong>: 255.255.255.240 -> 블록 크기 16 (호스트 16개, 사용 가능 14개)
• <strong>공식</strong>: 가용 호스트 수 = 2^(호스트 비트 수) - 2`
      },
      {
        heading: "2. 암호화 알고리즘 완벽 분류",
        content: `• <strong>대칭키 (비밀키) 암호화</strong>:
  - <strong>블록 암호</strong>: DES(64비트), 3-DES, AES(128/192/256비트), SEED(한국 KISA, 128비트), ARIA(국정원), IDEA
  - <strong>스트림 암호</strong>: RC4, LFSR
• <strong>비대칭키 (공개키) 암호화</strong>:
  - <strong>소인수분해 기반</strong>: RSA
  - <strong>이산대수 기반</strong>: Diffie-Hellman(키 교환), DSA, ElGamal
  - <strong>타원곡선 기반</strong>: ECC (짧은 키 길이로 RSA 동등 보안 제공)
• <strong>단방향 해시 함수</strong>: SHA-256, SHA-512, MD5, HAS-160 (복호화 불가, 무결성 검증)`
      },
      {
        heading: "3. 네트워크 공격 기법 핵심 키워드",
        content: `• <strong>스머프 (Smurf)</strong>: 공격자가 출발지 IP를 피해자 IP로 위조하여 브로드캐스트로 ICMP Echo Request를 전송, 수많은 응답 패킷이 피해자에게 집중되게 만듦
• <strong>랜드 어택 (Land Attack)</strong>: 출발지 IP와 목적지 IP를 피해자의 IP로 동일하게 위조하여 피해자 시스템이 자신에게 무한 응답하게 만들어 자원을 고갈시킴
• <strong>티어드롭 (TearDrop)</strong>: IP 패킷 단편화(Fragmentation) 시 오프셋(Offset) 값을 조작하여 재조합 과정에서 과부하 및 다운을 유발
• <strong>SYN 플러딩 (SYN Flooding)</strong>: TCP 3-Way Handshake에서 ACK를 보내지 않고 대기 큐(Backlog Queue)를 가득 채움`
      }
    ]
  },
  tips: {
    title: "⚡ 비전공자 & 직장인을 위한 실기 3주 벼락치기 전략",
    category: "공부방법 꿀팁",
    sections: [
      {
        heading: "1. 60점 합격선 타겟팅 포트폴리오",
        content: `• 실기 시험은 총 20문항, 100점 만점에 <strong>60점(12문항)</strong> 이상이면 합격입니다.
• <strong>프로그래밍(C/Java/Python)</strong>: 매회 8~9문항 출제 (40~45점). <strong>여기서 최소 6~7문항(30~35점)을 확보</strong>해야 안정권입니다.
• <strong>SQL 및 데이터베이스</strong>: 매회 3~4문항 출제 (15~20점). <strong>3문항 이상(15점) 득점 필수</strong>.
• <strong>소프트웨어 공학/보안/네트워크 단답형</strong>: 매회 7~8문항 출제 (35~40점). 빈출 족보 키워드로 <strong>최소 4문항(20점)</strong> 득점.
👉 결과: 프로그래밍 35점 + SQL 15점 + 단답형 20점 = <strong>70점 안정 합격!</strong>`
      },
      {
        heading: "2. 시험장 A4 종이 1장 200% 활용 노하우",
        content: `• 시험 시작 전 A4 용지를 <strong>세로로 1번, 가로로 1번 접어 4등분(또는 8등분)</strong> 하세요.
• 각 영역에 문항 번호를 적고, 복잡한 C/Java 코드는 머리로 암산하지 말고 <strong>반드시 표(Trace Table)를 그려 변수의 변화(i, j, sum, *p)를 한 줄씩 손으로 기록</strong>하세요.
• 정처기 실기 오답의 80%는 연산자 우선순위 착각이나 루프 종료 조건(1번 덜 돌거나 1번 더 돎)에서 발생합니다. 손으로 쓰면 실수를 100% 방지할 수 있습니다.`
      },
      {
        heading: "3. 감점 방지 주관식 답안 작성 원칙",
        content: `• <strong>영문/한글 표기</strong>: 약어(Acronym)나 영문 단어가 기억나지 않으면 확실한 한글 음차(예: '싱글톤', '옵저버')로 쓰세요. 영문 철자가 틀리면 오답 처리될 수 있습니다.
• <strong>출력 결과 포맷</strong>: 공백(' '), 줄바꿈, 쉼표(',')를 문제의 printf 포맷 스트링 그대로 지키세요. 파이썬 리스트는 대괄호 <code>[1, 2, 3]</code>를 반드시 포함해야 합니다.
• <strong>SQL 세미콜론(;)</strong>: SQL 작성 문제에서는 세미콜론을 생략해도 대부분 정답 인정되나, 가급적 완벽한 SQL 문장으로 끝내세요.`
      }
    ]
  }
};
