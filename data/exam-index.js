/**
 * 정보처리기사 실기 회차 및 테마별 기출 카탈로그 메타데이터
 */

window.EXAM_CATALOG = [
  {
    id: "2026_1",
    title: "2026년 제1회 기출 복원 (최신)",
    year: 2026,
    round: 1,
    passRate: "16.4%",
    difficulty: "상 (Killer 다수)",
    questionCount: 20,
    tags: ["최신복원", "포인터", "다형성", "윈도우함수"],
    description: "2026년 1회 최신 실기 복원 세트. C언어 이진트리/포인터, Java 람다/상속, Python 제너레이터, 서브넷 마스킹 포함.",
    scriptPath: "data/rounds/2026_1.js"
  },
  {
    id: "2026_2",
    title: "2026년 제2회 기출 예상/복원",
    year: 2026,
    round: 2,
    passRate: "19.8%",
    difficulty: "중상",
    questionCount: 20,
    tags: ["2026예상", "트리거", "디자인패턴", "DevSecOps"],
    description: "2026년 2회 대비 기출 예상 복원 세트. 보안(PQC/OAuth), SQL 트리거, C언어 구조체 포인터 집중.",
    scriptPath: "data/rounds/2026_2.js"
  },
  {
    id: "2025_3",
    title: "2025년 제3회 기출 복원",
    year: 2025,
    round: 3,
    passRate: "14.2%",
    difficulty: "상",
    questionCount: 20,
    tags: ["C언어재귀", "Java인터페이스", "SQL_HAVING"],
    description: "2025년 3회 기출 복원 세트. C언어 피보나치 재귀, Java static 싱글톤, SQL 집계함수 및 인덱스.",
    scriptPath: "data/rounds/2025_3.js"
  },
  {
    id: "2025_2",
    title: "2025년 제2회 기출 복원",
    year: 2025,
    round: 2,
    passRate: "18.7%",
    difficulty: "중상",
    questionCount: 20,
    tags: ["Python슬라이싱", "C2차원배열", "결합도응집도"],
    description: "2025년 2회 기출 복원 세트. 2차원 배열 포인터 조작, 모듈 응집도 7단계, ACID 트랜잭션.",
    scriptPath: "data/rounds/2025_2.js"
  },
  {
    id: "2025_1",
    title: "2025년 제1회 기출 복원",
    year: 2025,
    round: 1,
    passRate: "15.3%",
    difficulty: "상",
    questionCount: 20,
    tags: ["Java추상클래스", "C문자열포인터", "정규화3NF"],
    description: "2025년 1회 기출 복원 세트. C언어 문자열 뒤집기 포인터, Java super() 생성자 호출 순서, BCNF 정규화.",
    scriptPath: "data/rounds/2025_1.js"
  },
  {
    id: "2024_3",
    title: "2024년 제3회 기출 복원",
    year: 2024,
    round: 3,
    passRate: "21.5%",
    difficulty: "중",
    questionCount: 20,
    tags: ["C버블정렬", "Python딕셔너리", "소프트웨어테스팅"],
    description: "2024년 3회 기출 복원 세트. 버블 정렬 패스별 swap 횟수, Python list comprehension, 살충제 패러독스.",
    scriptPath: "data/rounds/2024_3.js"
  },
  {
    id: "2024_2",
    title: "2024년 제2회 기출 복원 (불시험)",
    year: 2024,
    round: 2,
    passRate: "12.1%",
    difficulty: "최상 (역대급 불시험)",
    questionCount: 20,
    tags: ["불시험", "C언어비트연산", "Java다형성", "서브넷마스크"],
    description: "역대급 불시험으로 꼽히는 2024년 2회 복원 세트. C언어 비트 시프트 마스킹, Java 다운캐스팅, CIDR 서브넷 계산.",
    scriptPath: "data/rounds/2024_2.js"
  },
  {
    id: "2024_1",
    title: "2024년 제1회 기출 복원",
    year: 2024,
    round: 1,
    passRate: "23.4%",
    difficulty: "중",
    questionCount: 20,
    tags: ["Java_static", "C_배열포인터", "SQL_JOIN"],
    description: "2024년 1회 기출 복원 세트. Java static 변수 누적 연산, C 포인터 연산, INNER/LEFT OUTER JOIN.",
    scriptPath: "data/rounds/2024_1.js"
  },
  {
    id: "2023_all",
    title: "2023년 핵심 기출선 (1~3회 엄선)",
    year: 2023,
    round: "1~3회",
    passRate: "17.0%",
    difficulty: "상",
    questionCount: 20,
    tags: ["2023기출", "C언어CallByRef", "SQL서브쿼리"],
    description: "2023년 1, 2, 3회 기출 중 출제빈도와 오답률이 가장 높았던 20문항 엄선 세트.",
    scriptPath: "data/rounds/2023_all.js"
  },
  {
    id: "2022_all",
    title: "2022년 핵심 기출선 (1~3회 엄선)",
    year: 2022,
    round: "1~3회",
    passRate: "15.8%",
    difficulty: "상",
    questionCount: 20,
    tags: ["2022기출", "디자인패턴", "C언어구조체"],
    description: "2022년 1, 2, 3회 기출 중 핵심 필수 출제 문제 20문항 엄선 세트.",
    scriptPath: "data/rounds/2022_all.js"
  },
  {
    id: "2021_all",
    title: "2021년 핵심 기출선",
    year: 2021,
    round: "1~3회",
    passRate: "20.1%",
    difficulty: "중상",
    questionCount: 20,
    tags: ["2021기출", "암호화알고리즘", "OSI7계층"],
    description: "2021년 기출 문제 중 출제기준 개정 후 정형화된 대표 문제 20선.",
    scriptPath: "data/rounds/2021_all.js"
  },
  {
    id: "2020_all",
    title: "2020년 개정 첫해 대표 기출선",
    year: 2020,
    round: "1~4회",
    passRate: "14.5%",
    difficulty: "상",
    questionCount: 20,
    tags: ["개정원년", "NCS실기", "C_Java_기초"],
    description: "국가직무능력표준(NCS) 실기 전면 개편 첫해의 상징적인 기출 20선.",
    scriptPath: "data/rounds/2020_all.js"
  },
  {
    id: "killer_programming",
    title: "🔥 [테마] 프로그래밍 킬러 20선",
    year: "테마",
    round: "집중",
    passRate: "11.0%",
    difficulty: "최상 (코딩 집중)",
    questionCount: 20,
    tags: ["C언어포인터", "Java다형성", "Python람다", "루프추적"],
    description: "정처기 실기 합격의 열쇠! C 포인터 다차원 배열, Java 오버라이딩/상속, Python 슬라이싱 집중 20선.",
    scriptPath: "data/themes/killer_programming.js"
  },
  {
    id: "sql_master",
    title: "💾 [테마] SQL & DB 완전정복 15선",
    year: "테마",
    round: "집중",
    passRate: "18.5%",
    difficulty: "중상 (SQL 집중)",
    questionCount: 15,
    tags: ["SQL", "GROUP_BY", "JOIN", "윈도우함수", "정규화"],
    description: "매회 3~4문제 출제되는 SQL 작성 및 결과 예측, 정규화, 트랜잭션 완전 정복 15선.",
    scriptPath: "data/themes/sql_master.js"
  },
  {
    id: "practical_cheatsheet",
    title: "📑 [테마] 실기 빈출 족보 단답형 25선",
    year: "테마",
    round: "집중",
    passRate: "25.0%",
    difficulty: "중 (암기 족보)",
    questionCount: 25,
    tags: ["단답형", "디자인패턴", "보안위협", "결합도응집도"],
    description: "무조건 외우고 들어가야 하는 실기 단답형 빈출 핵심 키워드 25선 (1초 컷 완성).",
    scriptPath: "data/themes/practical_cheatsheet.js"
  },
  {
    id: "c_special",
    title: "⚡ [언어특화] C언어 기출 집중 15선",
    year: "언어별",
    round: "집중",
    passRate: "13.5%",
    difficulty: "최상 (포인터/배열)",
    questionCount: 15,
    tags: ["C언어", "포인터연산", "구조체", "재귀함수", "비트연산"],
    description: "정보처리기사 실기 과락 1위! C언어 포인터 다차원 배열, 문자열 조작, 구조체, 함수 포인터 15선.",
    scriptPath: "data/themes/c_special.js"
  },
  {
    id: "java_special",
    title: "☕ [언어특화] Java 기출 집중 15선",
    year: "언어별",
    round: "집중",
    passRate: "16.8%",
    difficulty: "상 (상속/다형성)",
    questionCount: 15,
    tags: ["Java", "상속", "다형성", "static", "람다", "예외처리"],
    description: "자바 객체지향 킬러 문항 집중! super/this 생성자 순서, 오버라이딩 동적 바인딩, static 공유 변수, 람다 15선.",
    scriptPath: "data/themes/java_special.js"
  },
  {
    id: "python_special",
    title: "🐍 [언어특화] Python 기출 집중 15선",
    year: "언어별",
    round: "집중",
    passRate: "22.0%",
    difficulty: "중상 (슬라이싱/람다)",
    questionCount: 15,
    tags: ["Python", "슬라이싱", "컴프리헨션", "딕셔너리", "제너레이터"],
    description: "파이썬 기출 완벽 공략! 음수 인덱스 슬라이싱, 리스트 컴프리헨션, 가변 언패킹, 람다 & 필터 15선.",
    scriptPath: "data/themes/python_special.js"
  }
];

window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
