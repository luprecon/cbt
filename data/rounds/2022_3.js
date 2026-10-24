/**
 * 2022년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2022_3"] = {
  id: "2022_3",
  title: "2022년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어 프로그램은 지뢰찾기 맵(field)에서 주변 8방향의 지뢰 개수를 계산하여 mines 배열에 저장한다. 실행 결과로 출력되는 mines 배열의 4x4 행렬 값을 쓰시오.",
      code: `#include <stdio.h>

int calculate(int w, int h, int j, int i) {
    if (i >= 0 && i < h && j >= 0 && j < w) return 1;
    return 0;
}

int main() {
    int field[4][4] = {
        {0, 1, 0, 1},
        {0, 0, 0, 1},
        {1, 1, 1, 0},
        {0, 1, 1, 1}
    };
    int mines[4][4] = {0};
    int w = 4, h = 4;

    for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++) {
            if (field[y][x] == 0) continue;
            for (int i = y - 1; i <= y + 1; i++) {
                for (int j = x - 1; j <= x + 1; j++) {
                    if (calculate(w, h, j, i) == 1) {
                        mines[i][j] += 1;
                    }
                }
            }
        }
    }

    for (int y = 0; y < h; y++) {
        for (int x = 0; x < w; x++)
            printf("%d ", mines[y][x]);
        printf("\\n");
    }
    return 0;
}`,
      answer: "1 1 3 2\n3 4 5 3\n3 5 6 4\n3 5 5 3",
      aliases: [
        "1 1 3 2\n3 4 5 3\n3 5 6 4\n3 5 5 3",
        "1, 1, 3, 2 / 3, 4, 5, 3 / 3, 5, 6, 4 / 3, 5, 5, 3",
        "1 1 3 2 3 4 5 3 3 5 6 4 3 5 5 3"
      ],
      explanation: "지뢰 위치 field[y][x] == 1 인 칸 주변 3x3 범위(자신 포함 유효 좌표)의 mines[i][j]를 1씩 증가시킵니다.\n각 위치에 겹치는 지뢰 영향권의 합계를 계산하면:\n- 1행: 1 1 3 2\n- 2행: 3 4 5 3\n- 3행: 3 5 6 4\n- 4행: 3 5 5 3",
      trapPoint: "자신의 위치를 포함하여 주변 8방향까지 총 9개 좌표에 대해 유효한 보드 범위 내이면 1씩 카운트를 누적합니다."
    },
    {
      id: 2,
      category: "데이터베이스",
      prompt: "관계대수 연산의 다음 명칭에 해당하는 기호를 순서대로 쓰시오.",
      passage: `(1) 합집합 (Union)
(2) 차집합 (Difference)
(3) 카티션 프로덕트 (교차곱, Cartesian Product)
(4) 프로젝트 (Project)
(5) 자연 조인 (Natural Join)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["U", "∪"],
        "2": ["-", "−"],
        "3": ["X", "×", "x"],
        "4": ["π", "pi", "파이"],
        "5": ["⋈", "조인"]
      },
      answer: "(1) ∪, (2) -, (3) ×, (4) π, (5) ⋈",
      aliases: [
        "∪, -, ×, π, ⋈",
        "U, -, X, π, ⋈",
        "U - X π ⋈"
      ],
      explanation: "일반 집합 연산자 및 순수 관계 연산자 기호:\n- 합집합: ∪ (U)\n- 차집합: -\n- 교차곱: × (X)\n- 프로젝트: π\n- 조인: ⋈",
      trapPoint: "Select는 σ(시그마), Project는 π(파이), Join은 ⋈(보타이)입니다."
    },
    {
      id: 3,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 GoF 디자인 패턴을 각각 쓰시오.",
      passage: `( 1 ) 기능의 계층과 구현의 계층을 분리하여 두 계층이 독립적으로 확장할 수 있도록 연결하는 구조 패턴
( 2 ) 한 객체의 상태가 바뀌면 그 객체에 의존하는 다른 객체들에게 연락이 가고 자동으로 내용이 갱신되는 일대다(1:N) 의존성 행위 패턴 (발행/구독 모델)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Bridge", "bridge", "브릿지", "브리지", "Bridge 패턴"],
        "2": ["Observer", "observer", "옵저버", "옵서버", "Observer 패턴"]
      },
      answer: "(1) Bridge, (2) Observer",
      aliases: ["Bridge, Observer", "브릿지, 옵저버", "Bridge Observer"],
      explanation: "1. Bridge(브리지): 기능 계층과 구현 계층을 분리하여 상호 독립적 확장 지원.\n2. Observer(옵서버): 한 객체의 상태 변화를 구독자 객체들에게 통지하는 발행-구독 패턴.",
      trapPoint: "기능과 구현의 분리는 Bridge, 발행-구독 일대다 통지는 Observer입니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어 석차(순위) 알고리즘 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int result[5];
    int arr[5] = {77, 32, 10, 99, 50};

    for (int i = 0; i < 5; i++) {
        result[i] = 1;
        for (int j = 0; j < 5; j++) {
            if (arr[i] < arr[j]) result[i]++;
        }
    }

    for (int k = 0; k < 5; k++) {
        printf("%d", result[k]);
    }
    return 0;
}`,
      answer: "24513",
      aliases: ["24513", "2 4 5 1 3"],
      explanation: "배열 arr = {77, 32, 10, 99, 50}의 각 원소보다 큰 원소의 개수를 세어 석차를 매깁니다.\n- 99: 가장 크므로 1등 -> result[3] = 1\n- 77: 99보다 작으므로 2등 -> result[0] = 2\n- 50: 99, 77보다 작으므로 3등 -> result[4] = 3\n- 32: 99, 77, 50보다 작으므로 4등 -> result[1] = 4\n- 10: 가장 작으므로 5등 -> result[2] = 5\nresult 배열 순서대로 출력하면: 2, 4, 5, 1, 3 -> \"24513\"",
      trapPoint: "석차는 초기값 1에서 시작하여 나보다 큰 원소를 만날 때마다 순위가 1씩 밀려납니다."
    },
    {
      id: 5,
      category: "네트워크",
      prompt: "C클래스 네트워크 주소 192.168.1.0/24를 고정 길이 서브넷 마스크(FLSM)를 사용하여 서브넷당 동일한 크기로 3개 이상의 네트워크로 분할하고자 할 때, 서브넷 마스크를 /26으로 설정하였다. 이 때 두 번째 서브넷의 브로드캐스트 IP 주소를 10진수로 쓰시오.",
      answer: "192.168.1.127",
      aliases: ["192.168.1.127"],
      explanation: "192.168.1.0/24를 4개의 서브넷(/26, 서브넷 크기 64)으로 분할:\n- 1번째 서브넷: 192.168.1.0 ~ 192.168.1.63 (브로드캐스트: .63)\n- 2번째 서브넷: 192.168.1.64 ~ 192.168.1.127 (브로드캐스트: .127)\n- 3번째 서브넷: 192.168.1.128 ~ 192.168.1.191 (브로드캐스트: .191)\n- 4번째 서브넷: 192.168.1.192 ~ 192.168.1.255 (브로드캐스트: .255)\n두 번째 서브넷의 마지막 주소(브로드캐스트)는 `192.168.1.127`입니다.",
      trapPoint: "두 번째 서브넷의 범위는 .64 ~ .127이며, 마지막 주소가 브로드캐스트 주소입니다."
    },
    {
      id: 6,
      category: "소프트웨어공학",
      prompt: "블랙박스 테스트 기법 중 입력 조건의 경계에 있는 값(최솟값, 최댓값, 바로 위/아래 값 등)에서 오류가 발생할 확률이 높다는 점을 이용하여 테스트 케이스를 도출하는 기법의 명칭을 쓰시오.",
      answer: "경계값 분석",
      aliases: [
        "경계값 분석",
        "경계값분석",
        "Boundary Value Analysis",
        "BVA"
      ],
      explanation: "경계값 분석(Boundary Value Analysis)은 동등 분할의 경계 부분(유효 범위의 양 끝값)에서 오류가 집중적으로 발생한다는 경험적 사실에 기초한 블랙박스 테스트 기법입니다.",
      trapPoint: "입력 조건의 경계(Boundary)에 위치한 값들을 집중 테스트하는 기법은 경계값 분석입니다."
    },
    {
      id: 7,
      category: "SQL",
      prompt: "다음 트랜잭션 SQL 문들이 순차적으로 실행된 후, 마지막 두 SELECT COUNT(*) 쿼리의 실행 결과를 순서대로 쓰시오.",
      passage: `[초기 테이블 T에 데이터 3건 존재]
INSERT INTO T VALUES (4);
SAVEPOINT sp1;
INSERT INTO T VALUES (5);
ROLLBACK TO sp1;

( 1 ) SELECT COUNT(*) FROM T; -- sp1 롤백 직후 건수

INSERT INTO T VALUES (6);
COMMIT;

( 2 ) SELECT COUNT(*) FROM T; -- 최종 커밋 후 건수`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["4", "4건"],
        "2": ["5", "5건"]
      },
      answer: "(1) 4, (2) 5",
      aliases: ["(1) 4, (2) 5", "4, 5", "4 5"],
      explanation: "1. 초기 3건 + INSERT(4) -> 4건\n2. SAVEPOINT sp1 지정\n3. INSERT(5) -> 5건\n4. ROLLBACK TO sp1: 5가 취소되고 sp1 시점(4건)으로 복구 -> (1)은 4\n5. INSERT(6) -> 4건 + 1건 = 5건\n6. COMMIT 후 최종 건수 -> (2)는 5",
      trapPoint: "ROLLBACK TO sp1을 수행하면 SAVEPOINT sp1 이후의 작업(INSERT 5)만 취소됩니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "다음 설명에 해당하는 보안 용어를 각각 쓰시오.",
      passage: `( 1 ) 기술적인 해킹 기법이 아닌, 인간의 신뢰, 호기심, 동정심 등 심리적 취약점을 이용하여 패스워드나 기밀 정보를 탈취하는 비기술적 해킹 기법
( 2 ) 조직에서 수집하여 저장하고 있지만 활용되지 않고 방치되어 공간만 차지하며 보안 위협을 유발하는 구조화되지 않은 데이터`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["사회공학", "사회공학(Social Engineering)", "Social Engineering", "소셜 엔지니어링"],
        "2": ["다크 데이터", "다크데이터", "Dark Data", "dark data"]
      },
      answer: "(1) 사회공학, (2) 다크 데이터",
      aliases: ["사회공학, 다크 데이터", "사회공학 다크데이터", "Social Engineering, Dark Data"],
      explanation: "1. 사회공학(Social Engineering): 인간 상호작용의 신뢰를 악용하는 비기술적 공격.\n2. 다크 데이터(Dark Data): 수집 후 저장만 되고 분석/활용되지 않은 채 방치된 데이터.",
      trapPoint: "인간 심리 공격 = 사회공학, 방치된 미활용 데이터 = 다크 데이터입니다."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `TestList = [1, 2, 3, 4, 5]
TestList = list(map(lambda num: num + 100, TestList))
print(TestList)`,
      answer: "[101, 102, 103, 104, 105]",
      aliases: [
        "[101, 102, 103, 104, 105]",
        "[101,102,103,104,105]",
        "101 102 103 104 105"
      ],
      explanation: "map() 함수와 람다식을 이용하여 TestList의 모든 원소에 100을 더한 새로운 리스트를 생성합니다.\n[1+100, 2+100, 3+100, 4+100, 5+100] = [101, 102, 103, 104, 105]",
      trapPoint: "파이썬 리스트 출력 형식이므로 대괄호와 쉼표를 포함한 `[101, 102, 103, 104, 105]` 형태로 출력됩니다."
    },
    {
      id: 10,
      category: "보안",
      prompt: "네트워크 내의 다양한 이기종 보안 장비 및 서버에서 발생하는 방대한 로그 및 이벤트를 중앙에서 통합 수집, 상관분석하여 위협을 조기에 탐지하고 대응하는 보안 관제 솔루션의 영문 약어를 쓰시오.",
      answer: "SIEM",
      aliases: ["SIEM", "siem", "Security Information and Event Management"],
      explanation: "SIEM(Security Information and Event Management)은 SIM(정보관리)과 SEM(이벤트관리)을 결합하여 다양한 보안 로그를 실시간 수집 및 상관분석하는 통합 보안 관제 솔루션입니다.",
      trapPoint: "이기종 장비 로그 수집 및 실시간 상관분석 솔루션은 SIEM입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "소프트웨어 개발에서 소스 코드의 변경 사항을 추적하고 관리하기 위해 사용되는 형상 관리(버전 관리) 도구 3가지를 쓰시오.",
      passage: `[보기: CVS, SVN, GIT, JUnit, Docker, Jenkins]`,
      answer: "CVS, SVN, GIT",
      aliases: ["CVS, SVN, GIT", "CVS SVN GIT", "GIT, SVN, CVS"],
      explanation: "버전 관리(형상 관리) 시스템:\n- CVS: 초기 중앙 집중형 버전 관리\n- SVN(Subversion): CVS를 개선한 중앙 집중형 버전 관리\n- Git: 리누스 토르발스가 개발한 분산형 버전 관리 시스템",
      trapPoint: "JUnit은 단위 테스트 도구, Docker는 컨테이너 가상화, Jenkins는 CI/CD 도구입니다."
    },
    {
      id: 12,
      category: "SQL",
      prompt: "STUDENT 테이블에 컴퓨터과 50명, 전기과 100명, 인터넷과 50명의 학생 데이터가 있을 때, 다음 3개 SQL 문의 결과 튜플 수를 각각 쓰시오.",
      passage: `1) SELECT DEPT FROM STUDENT;
2) SELECT DISTINCT DEPT FROM STUDENT;
3) SELECT COUNT(DISTINCT DEPT) FROM STUDENT WHERE DEPT = '인터넷과';`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["200", "200건"],
        "2": ["3", "3건"],
        "3": ["1", "1건"]
      },
      answer: "(1) 200, (2) 3, (3) 1",
      aliases: ["(1) 200, (2) 3, (3) 1", "200, 3, 1", "200 3 1"],
      explanation: "1) 전체 튜플 조회: 50 + 100 + 50 = 200건\n2) 중복 제거된 학과 종류: 컴퓨터과, 전기과, 인터넷과 = 3건\n3) 인터넷과에 대해 중복 제거한 학과 수: 인터넷과 1건",
      trapPoint: "DISTINCT는 중복을 제거하여 고유값만 추출하므로 학과 종류의 수는 3개입니다."
    },
    {
      id: 13,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int n, k, s;
    int el = 0;

    for (n = 6; n <= 30; n++) {
        s = 0;
        k = n / 2;
        for (int j = 1; j <= k; j++) {
            if (n % j == 0) s += j;
        }
        if (s == n) el++;
    }

    printf("%d", el);
    return 0;
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "6부터 30까지의 정수 중 완전수(자신을 제외한 약수의 합이 자신과 같은 수)의 개수 el을 구하는 문제입니다.\n- 6의 진약수: 1, 2, 3 -> 합 = 6 (완전수 1개)\n- 28의 진약수: 1, 2, 4, 7, 14 -> 합 = 28 (완전수 2개)\n6과 28 총 2개이므로 el = 2가 출력됩니다.",
      trapPoint: "6부터 30 사이의 완전수는 6과 28 딱 2개입니다."
    },
    {
      id: 14,
      category: "보안",
      prompt: "다음 설명에 해당하는 보안 용어를 각각 쓰시오.",
      passage: `( 1 ) ARM 사에서 개발한 기술로, 하나의 프로세서 내에 일반 구역(Normal World)과 보안 구역(Secure World)을 하드웨어적으로 격리하여 결제나 생체 정보 등 중요 데이터를 안전하게 보호하는 기술
( 2 ) 사용자가 유명 사이트의 도메인 주소를 입력할 때 발생할 수 있는 오타나 철자 실수를 노리고 유사한 도메인을 미리 등록해 두는 사이버 범죄 (URL 하이재킹)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["TrustZone", "trustzone", "트러스트존", "Trust Zone"],
        "2": ["타이포스쿼팅", "typosquatting", "Typosquatting", "타이포 스쿼팅"]
      },
      answer: "(1) TrustZone, (2) 타이포스쿼팅",
      aliases: ["TrustZone, 타이포스쿼팅", "트러스트존, 타이포스쿼팅", "TrustZone typosquatting"],
      explanation: "1. TrustZone: ARM 사의 하드웨어 기반 보안 격리 환경 기술.\n2. 타이포스쿼팅(Typosquatting): URL 철자 오타를 악용하는 도메인 사칭 공격.",
      trapPoint: "ARM 보안 구역 = TrustZone, 오타 노린 도메인 등록 = 타이포스쿼팅입니다."
    },
    {
      id: 15,
      category: "보안",
      prompt: "사용자가 한 번의 로그인 인증만으로 권한을 가진 모든 시스템 및 웹 애플리케이션 서비스에 별도의 추가 로그인 없이 접근할 수 있도록 해주는 통합 인증 기술의 영문 약어를 쓰시오.",
      answer: "SSO",
      aliases: ["SSO", "sso", "Single Sign-On", "Single Sign On"],
      explanation: "SSO(Single Sign-On)는 한 번의 시스템 인증을 통해 연계된 여러 서비스 시스템을 추가 로그인 없이 이용할 수 있게 해주는 통합 인증 솔루션입니다.",
      trapPoint: "1회 로그인으로 모든 연계 시스템을 이용하는 기술은 SSO입니다."
    },
    {
      id: 16,
      category: "운영체제",
      prompt: "CPU 프로세스 스케줄링 알고리즘 중 다음 설명에 해당하는 기법의 명칭을 각각 쓰시오.",
      passage: `( 1 ) 준비 큐에 있는 프로세스 중 CPU 점유 시간이 가장 짧은 작업에 CPU를 우선 할당하는 비선점형 방식
( 2 ) 각 프로세스에 동일한 CPU 시간 할당량(Time Slice)을 부여하고, 시간 내에 완료하지 못하면 준비 큐의 맨 뒤로 보내는 선점형 방식
( 3 ) 남은 실행 시간이 가장 짧은 프로세스에게 CPU를 우선 할당하며, 새로운 프로세스가 들어왔을 때 남은 시간이 더 짧으면 CPU를 빼앗는 선점형 SJF 방식`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["SJF", "sjf", "Shortest Job First"],
        "2": ["RR", "rr", "Round Robin", "라운드로빈"],
        "3": ["SRT", "srt", "Shortest Remaining Time", "SRTF"]
      },
      answer: "(1) SJF, (2) RR, (3) SRT",
      aliases: ["SJF, RR, SRT", "SJF RR SRT"],
      explanation: "1. SJF: 최단 작업 우선 (비선점형)\n2. RR(Round Robin): 시분할 라운드 로빈 (선점형)\n3. SRT: 최소 잔여 시간 우선 (SJF의 선점형 버전)",
      trapPoint: "비선점 최단작업은 SJF, 선점형 최단잔여시간은 SRT, 시간할당량 순환은 RR입니다."
    },
    {
      id: 17,
      category: "소프트웨어공학",
      prompt: "UML 모델링의 3대 구성 요소는 사물(Things), ( 1 ), 다이어그램(Diagrams)이다. 이 중 시스템의 구조적 측면에서 객체 타입과 정적 관계를 표현하는 대표적 다이어그램은 ( 2 ) 다이어그램이며, 클래스가 반드시 구현해야 하는 오퍼레이션의 집합을 정의하는 모델 요소를 ( 3 )라고 한다. 빈칸에 들어갈 용어를 순서대로 쓰시오.",
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["관계", "Relationship"],
        "2": ["클래스", "Class", "클래스 다이어그램"],
        "3": ["인터페이스", "Interface"]
      },
      answer: "(1) 관계, (2) 클래스, (3) 인터페이스",
      aliases: ["(1) 관계, (2) 클래스, (3) 인터페이스", "관계, 클래스, 인터페이스"],
      explanation: "1. UML 3대 구성 요소: 사물(Things), 관계(Relationships), 다이어그램(Diagrams)\n2. 정적 구조 다이어그램: 클래스 다이어그램\n3. 구현 오퍼레이션 집합: 인터페이스",
      trapPoint: "사물, 관계, 다이어그램이 UML 3대 요소입니다."
    },
    {
      id: 18,
      category: "데이터베이스",
      prompt: "E-R 다이어그램(피터 첸 표기법)에서 사용되는 기호에 대한 설명으로 알맞은 명칭을 쓰시오.",
      passage: `1. 사각형(Rectangle): (     1     )
2. 마름모(Diamond): (     2     )
3. 타원(Ellipse): (     3     )
4. 밑줄 타원(Underlined Ellipse): (     4     )`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["개체", "개체 타입", "Entity"],
        "2": ["관계", "관계 타입", "Relationship"],
        "3": ["속성", "Attribute"],
        "4": ["기본키", "기본키 속성", "식별자", "Primary Key"]
      },
      answer: "(1) 개체, (2) 관계, (3) 속성, (4) 기본키",
      aliases: ["개체, 관계, 속성, 기본키", "개체 관계 속성 기본키"],
      explanation: "E-R 다이어그램 기호:\n- 사각형: 개체(Entity)\n- 마름모: 관계(Relationship)\n- 타원: 속성(Attribute)\n- 밑줄 타원: 기본키(Primary Key) 속성\n- 이중 타원: 복합 속성 / 다중값 속성",
      trapPoint: "사각형 = 개체, 마름모 = 관계, 타원 = 속성, 밑줄 = 기본키입니다."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    static int[] MakeArray() {
        int[] tempArr = new int[4];
        for (int i = 0; i < tempArr.length; i++) {
            tempArr[i] = i;
        }
        return tempArr;
    }

    public static void main(String[] args) {
        int[] intArr = MakeArray();
        for (int i = 0; i < intArr.length; i++) {
            System.out.print(intArr[i]);
        }
    }
}`,
      answer: "0123",
      aliases: ["0123"],
      explanation: "MakeArray() 함수에서 크기 4인 배열 tempArr을 생성하고 인덱스 0~3에 각각 i 값을 대입하여 반환합니다.\nmain 메소드에서 배열을 받아 출력하므로 0, 1, 2, 3이 공백 없이 연속 출력되어 \"0123\"이 됩니다.",
      trapPoint: "System.out.print는 줄바꿈 없이 출력하므로 0123이 한 줄로 출력됩니다."
    },
    {
      id: 20,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Exam {
    public static void main(String[] args) {
        int a = 0;
        for (int i = 1; i < 999; i++) {
            if (i % 3 == 0 && i % 2 != 0) {
                a = i;
            }
        }
        System.out.print(a);
    }
}`,
      answer: "993",
      aliases: ["993"],
      explanation: "1부터 998(i < 999)까지의 정수 중, 3의 배수(i % 3 == 0)이면서 홀수(i % 2 != 0)인 가장 큰 수 a를 찾는 문제입니다.\n- 998: 짝수\n- 997: 3의 배수 아님\n- 996: 3의 배수이지만 짝수\n- 995: 3의 배수 아님\n- 994: 3의 배수 아님\n- 993: 993 % 3 == 0 이고 993 % 2 != 0 (홀수) 만족!\n따라서 마지막으로 갱신되는 a의 값은 993입니다.",
      trapPoint: "i < 999이므로 999는 검사 대상이 아니며, 999 미만에서 조건을 만족하는 최댓값은 993입니다."
    }
  ]
};

