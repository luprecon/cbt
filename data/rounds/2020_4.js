/**
 * 2020년 제4회(통합) 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2020_4"] = {
  id: "2020_4",
  title: "2020년 제4회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "네트워크",
      prompt: "현재 32비트 체계인 IPv4의 주소 고갈, 보안성, 이동성 지원 등의 문제를 해결하기 위해 개발된 128비트 주소 체계를 갖는 차세대 인터넷 프로토콜의 명칭 또는 약어를 쓰시오.",
      answer: "IPv6",
      aliases: ["IPv6", "ipv6", "Internet Protocol version 6"],
      explanation: "IPv6는 IPv4의 주소 공간 고갈을 해결하기 위해 개발된 128비트 차세대 IP 주소 체계입니다. 16비트씩 8부분을 콜론(:)으로 구분하며 16진수로 표기하고, 유니캐스트·멀티캐스트·애니캐스트 전송 방식을 지원합니다.",
      trapPoint: "IPv4는 32비트, IPv6는 128비트 주소 체계입니다."
    },
    {
      id: 2,
      category: "소프트웨어공학",
      prompt: "GoF 디자인 패턴을 목적(Purpose)에 따라 3가지 유형으로 분류할 때, 생성(Creational) 패턴, 구조(Structural) 패턴 외에 나머지 한 가지 유형의 명칭을 쓰시오.",
      answer: "행위",
      aliases: ["행위", "행위 패턴", "Behavioral", "behavioral", "행동", "행동 패턴"],
      explanation: "GoF 디자인 패턴 목적별 3대 분류:\n1. 생성(Creational) 패턴 (5개): 객체 인스턴스 생성 과정 추상화\n2. 구조(Structural) 패턴 (7개): 클래스나 객체를 조합해 더 큰 구조 형성\n3. 행위(Behavioral) 패턴 (11개): 객체들 간의 상호작용 및 책임 분배 정의",
      trapPoint: "GoF 디자인 패턴 3대 목적 분류: 생성, 구조, 행위(Behavioral)."
    },
    {
      id: 3,
      category: "소프트웨어공학",
      prompt: "다음은 UML 모델 요소들을 그룹화하고 상호 의존 관계를 표현한 다이어그램이다. 해당 다이어그램의 명칭을 쓰시오.",
      passage: `   ┌───────────┐                      ┌───────────┐
   │ ordering  │ - - - - - - - - - - >│  pricing  │
   └───────────┘                      └───────────┘
         │
         │
         │   <<import>>
         ▼
   ┌───────────┐
   │ products  │
   └───────────┘

※ 다이어그램 특징:
- 탭이 달린 폴더 모양 아이콘(패키지)으로 표현
- 점선 화살표를 통한 패키지 간의 의존 관계 및 <<import>> 스테레오타입 표현`,
      answer: "패키지 다이어그램",
      aliases: ["패키지 다이어그램", "패키지다이어그램", "Package Diagram", "package diagram", "패키지"],
      explanation: "패키지 다이어그램(Package Diagram)은 시스템의 모델 요소들을 의미 있는 단위(폴더 형태의 패키지)로 그룹화하고, 패키지 간의 의존성과 포함 관계를 시각화하는 UML 구조 다이어그램입니다.",
      trapPoint: "폴더 모양의 패키지 아이콘과 의존성 점선 화살표로 구성된 것은 패키지 다이어그램입니다."
    },
    {
      id: 4,
      category: "데이터베이스",
      prompt: "데이터베이스 로그 기반 회복(Recovery) 기법 중 트랜잭션이 데이터를 변경하면 변경 연산의 결과를 즉시 데이터베이스에 반영하며, 장애 발생 시 Redo와 Undo 연산을 모두 수행하는 기법의 명칭을 쓰시오.",
      answer: "즉각 갱신 회복 기법",
      aliases: ["즉각 갱신 회복 기법", "즉각 갱신 기법", "즉각 갱신", "즉각갱신", "Immediate Update", "Immediate update"],
      explanation: "로그 기반 회복 기법:\n- 지연 갱신(Deferred Update): 부분 완료 전까지 실제 DB 변경을 지연(로그만 기록), 장애 시 REDO만 수행\n- 즉각 갱신(Immediate Update): 갱신 연산 결과를 즉시 DB에 반영, 장애 시 REDO와 UNDO 모두 수행",
      trapPoint: "연산 결과를 즉시 DB에 기록하고 REDO/UNDO 모두 수행하는 기법은 '즉각 갱신 회복 기법'입니다."
    },
    {
      id: 5,
      category: "Java",
      prompt: "다음은 10진수 n(초깃값 10)을 2진수로 변환하여 8자리로 출력하는 Java 프로그램이다. 빈칸 (1), (2)에 들어갈 알맞은 조건식 또는 연산식을 쓰시오.",
      code: `class good {
    public static void main(String[] args) {
        int[] a = new int[8];
        int i = 0;
        int n = 10;
        while (   1   ) {
            a[i++] = (   2   );
            n /= 2;
        }
        for (i = 7; i >= 0; i--) {
            System.out.print(a[i]);
        }
    }
}`,
      passage: `[출력 결과]
00001010`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["n > 0", "n>0", "n >= 1", "n>=1", "i < 8", "i<8", "i <= 7"],
        "2": ["n % 2", "n%2", "n & 1"]
      },
      answer: "(1) n > 0, (2) n % 2",
      aliases: ["n > 0, n % 2", "n>0, n%2", "n > 0, n%2"],
      explanation: "10진수를 2진수로 변환하는 원리:\n1. n이 0보다 큰 동안(`n > 0` 또는 `n >= 1`) 반복 수행\n2. n을 2로 나눈 나머지(`n % 2` 또는 `n & 1`)를 비트 배열 a에 순서대로 저장\n3. n을 2로 나눈 몫으로 갱신(`n /= 2`)",
      trapPoint: "반복 지속 조건은 n > 0, 2진수 비트 추출은 n % 2 (또는 n & 1)입니다."
    },
    {
      id: 6,
      category: "Java",
      prompt: "다음 Java 프로그램의 출력 결과를 보고 2차원 배열 선언문 빈칸 (1), (2)에 들어갈 행과 열의 크기를 각각 쓰시오.",
      code: `public class good {
    public static void main(String[] args) {
        int[][] a = new int[( 1 )][( 2 )];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 5; j++) {
                a[i][j] = j * 3 + (i + 1);
                System.out.print(a[i][j] + " ");
            }
            System.out.println();
        }
    }
}`,
      passage: `[출력 결과]
1 4 7 10 13
2 5 8 11 14
3 6 9 12 15`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["3"],
        "2": ["5"]
      },
      answer: "(1) 3, (2) 5",
      aliases: ["3, 5", "3 5", "3,5"],
      explanation: "바깥쪽 루프가 `i < 3`으로 3회 반복(행 3개)되고, 안쪽 루프가 `j < 5`로 5회 반복(열 5개)됩니다. 따라서 생성해야 하는 2차원 배열 크기는 3행 5열(`new int[3][5]`)입니다.",
      trapPoint: "출력 결과가 3개 행과 5개 열로 구성되어 있으므로 행 3, 열 5 입니다."
    },
    {
      id: 7,
      category: "보안",
      prompt: "네트워크 통신 회선 상에 흐르는 암호화되지 않은 패킷을 엿듣고 가로채어 사용자 계정 ID, 비밀번호 등 민감한 정보를 몰래 수집하는 수동적(Passive) 네트워크 공격 기법을 쓰시오.",
      answer: "스니핑",
      aliases: ["스니핑", "Sniffing", "sniffing", "패킷 스니핑"],
      explanation: "스니핑(Sniffing)은 네트워크 인터페이스 카드를 무차별 모드(Promiscuous Mode)로 설정하여 자신이 수신 대상이 아닌 패킷까지 도청하여 가로채는 수동적 공격 기법입니다.",
      trapPoint: "패킷을 도청하는 행위는 스니핑(Sniffing), 신분을 위조·변조하는 행위는 스푸핑(Spoofing)입니다."
    },
    {
      id: 8,
      category: "네트워크",
      prompt: "내부 사설 네트워크에서 사용하는 다수의 사설 IP 주소를 외부 인터넷과 통신 가능한 공인 IP 주소로 변환해 주는 네트워크 주소 변환 기술의 영문 약어를 쓰시오.",
      answer: "NAT",
      aliases: ["NAT", "nat", "Network Address Translation"],
      explanation: "NAT(Network Address Translation)는 사설 IP 주소를 공인 IP 주소로 상호 매핑·변환하여 통신을 가능하게 하는 기술로, IPv4 주소 고갈 문제를 완화하고 내부망의 보안성을 높여줍니다.",
      trapPoint: "사설 IP와 공인 IP 간의 주소 변환 기술은 NAT입니다."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `lol = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
print(lol[0])
print(lol[2][1])
for sub in lol:
    for item in sub:
        print(item, end='')
    print()`,
      answer: `[1, 2, 3]
7
123
45
6789`,
      aliases: [
        `[1, 2, 3]\n7\n123\n45\n6789`,
        `[1, 2, 3]\n 7\n 123\n 45\n 6789`,
        `[1, 2, 3] 7 123 45 6789`
      ],
      explanation: "1. `print(lol[0])` -> 0번째 원소 리스트 `[1, 2, 3]` 출력\n2. `print(lol[2][1])` -> 2번째 원소 [6, 7, 8, 9]의 1번째 인덱스인 `7` 출력\n3. 이중 루프:\n- sub = [1, 2, 3]: `123` 출력 후 개행\n- sub = [4, 5]: `45` 출력 후 개행\n- sub = [6, 7, 8, 9]: `6789` 출력 후 개행",
      trapPoint: "lol[2][1]은 [6,7,8,9]의 1번 인덱스 원소인 7입니다. print(리스트)는 대괄호 []를 포함하여 출력됩니다."
    },
    {
      id: 10,
      category: "소프트웨어공학",
      prompt: "P2P 네트워크를 기반으로 참여자 간에 거래 데이터를 암호화하여 '블록'이라는 분산 장부에 기록하고 체인 형태로 연결함으로써 임의의 위·변조를 방지하고 분산 합의를 보장하는 데이터 보안 기술을 쓰시오.",
      answer: "블록체인",
      aliases: ["블록체인", "Blockchain", "blockchain", "분산원장", "분산 원장"],
      explanation: "블록체인(Blockchain)은 중앙 집중형 중개자 없이 분산 네트워크 참여자 전원이 거래 장부를 공유하고 암호학적 해시 체인 및 합의 알고리즘을 통해 데이터의 신뢰성을 보장하는 분산 원장 기술(DLT)입니다.",
      trapPoint: "거래 정보를 블록 단위로 묶어 체인으로 연결한 분산 기술은 블록체인(Blockchain)입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "아파치(Apache) 소프트웨어 재단에서 개발한 오픈소스 분산 컴퓨팅 프레임워크로, 일반 상용 서버들을 클러스터로 구성하여 대용량 데이터 세트를 분산 파일 시스템(HDFS)에 저장하고 맵리듀스(MapReduce)를 통해 병렬 처리하는 플랫폼의 명칭을 쓰시오.",
      answer: "하둡",
      aliases: ["하둡", "Hadoop", "hadoop", "Apache Hadoop", "아파치 하둡"],
      explanation: "하둡(Apache Hadoop)은 대규모 빅데이터를 저비용 컴퓨터 클러스터 환경에서 신뢰성 있게 분산 저장(HDFS)하고 병렬 처리(MapReduce)할 수 있도록 지원하는 대표적인 오픈소스 자바 프레임워크입니다.",
      trapPoint: "HDFS와 MapReduce를 기반으로 하는 분산 빅데이터 프레임워크는 하둡(Hadoop)입니다."
    },
    {
      id: 12,
      category: "데이터베이스",
      prompt: "관계 데이터베이스 설계 시 정규화를 거치지 않아 테이블 내에 불필요한 데이터 중복이 존재할 때 발생하는 데이터 이상(Anomaly) 현상 3가지를 쓰시오.",
      answer: "삽입 이상, 삭제 이상, 갱신 이상",
      aliases: [
        "삽입 이상, 삭제 이상, 갱신 이상",
        "삽입이상, 삭제이상, 갱신이상",
        "삽입, 삭제, 갱신",
        "삽입 이상 삭제 이상 갱신 이상"
      ],
      explanation: "데이터베이스 이상의 3가지 유형:\n1. 삽입 이상(Insertion Anomaly): 불필요한 데이터를 함께 입력하지 않으면 원하는 데이터를 저장할 수 없는 현상\n2. 삭제 이상(Deletion Anomaly): 특정 튜플을 삭제할 때 의도하지 않은 연관 정보까지 연쇄 삭제되는 현상\n3. 갱신 이상(Modification/Update Anomaly): 일부 튜플만 수정되어 데이터 불일치(모순)가 발생하는 현상",
      trapPoint: "이상(Anomaly)의 3요소는 삽입 이상, 삭제 이상, 갱신 이상입니다."
    },
    {
      id: 13,
      category: "운영체제",
      prompt: "다음 프로세스 상태 전이도에서 빈칸 (1), (2), (3)에 들어갈 프로세스의 상태 명칭을 각각 쓰시오.",
      passage: `       ┌───────────────┐
       │   2. (   )    │ ──────── 종료 ───────► [ 완료 ]
       └───────────────┘
          ▲         │
  디스패치│         │ 타이머 런 아웃
          │         ▼
       ┌───────────────┐           입출력 발생
[ 생성 ]──►│   1. (   )    │◄─────── (Block)
       └───────────────┘                │
               ▲                        ▼
               │      웨이크업   ┌───────────────┐
               └─────────────────│   3. (   )    │
                                 └───────────────┘`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["준비", "Ready", "ready", "준비 상태"],
        "2": ["실행", "Running", "running", "실행 상태"],
        "3": ["대기", "블록", "보류", "Waiting", "Blocked", "waiting", "대기 상태"]
      },
      answer: "(1) 준비, (2) 실행, (3) 대기(블록)",
      aliases: [
        "준비, 실행, 대기",
        "준비, 실행, 블록",
        "준비 실행 대기",
        "Ready, Running, Waiting"
      ],
      explanation: "프로세스 3대 상태 전이:\n1. 준비(Ready): CPU 할당(디스패치)을 기다리는 대기열 상태\n2. 실행(Running): CPU를 할당받아 명령어를 실행 중인 상태\n3. 대기(Waiting/Blocked): 입출력 등 외부 이벤트 발생으로 인해 완료를 기다리는 상태",
      trapPoint: "디스패치를 받아 실행 상태로 전이하는 것은 준비(Ready), 입출력 대기 상태는 대기(Waiting/Block)입니다."
    },
    {
      id: 14,
      category: "소프트웨어공학",
      prompt: "테스트 오라클(Test Oracle)의 4가지 유형 중 모든 입력값이 아니라 사전에 선별된 특정한 몇 개의 대표적인 입력값들에 대해서만 기대하는 결과를 제공하여 검증하는 오라클은 무엇인가?",
      answer: "샘플링 오라클",
      aliases: ["샘플링 오라클", "샘플링오라클", "Sampling Oracle", "sampling oracle"],
      explanation: "테스트 오라클의 유형:\n- 참(True) 오라클: 모든 입력값에 대해 정확한 기대 결과 제공\n- 샘플링(Sampling) 오라클: 특정한 몇 개의 대표 입력값에 대해서만 기대 결과 제공\n- 휴리스틱(Heuristic) 오라클: 특정 입력값은 정확한 결과, 나머지는 추정(휴리스틱)으로 처리\n- 일관성 검사(Consistent) 오라클: 변경 전후의 결괏값이 동일한지 검사",
      trapPoint: "특정한 몇 개의 대표 입력값에 대해서만 기대 결과를 제공하는 오라클은 '샘플링 오라클'입니다."
    },
    {
      id: 15,
      category: "소프트웨어공학",
      prompt: "다음과 같이 점수 구간별로 성적을 부여하는 모듈을 테스트하기 위해 [-10, 30, 65, 75, 85, 95, 110]의 대푯값을 선정하여 검증을 수행하였다. 사용된 블랙박스 테스트 기법의 명칭을 쓰시오.",
      passage: `[점수 구간 명세]
| 점수 구간 | 부여 성적 |
| --- | --- |
| 0 ~ 59 | 가 |
| 60 ~ 69 | 양 |
| 70 ~ 79 | 미 |
| 80 ~ 89 | 우 |
| 90 ~ 100 | 수 |

[선정된 테스트 값]: -10점(무효), 30점(가), 65점(양), 75점(미), 85점(우), 95점(수), 110점(무효)`,
      answer: "동등 분할 테스트",
      aliases: [
        "동등 분할 테스트",
        "동등 분할",
        "동등분할",
        "동치 분할",
        "동치분할",
        "동등 분할 검사",
        "동치 분할 검사",
        "동치분할 테스트",
        "Equivalence Partitioning"
      ],
      explanation: "동등 분할(동치 분할, Equivalence Partitioning)은 입력 도메인을 유효/무효 영역(동치 클래스)으로 나누고 각 영역에서 대푯값을 하나씩 선정하여 테스트 케이스를 설계하는 블랙박스 테스트 기법입니다.",
      trapPoint: "경계값이 아닌 각 구간 내의 대표적인 중간값을 테스트 값으로 선정했으므로 '동등 분할(동치 분할)' 테스트입니다."
    },
    {
      id: 16,
      category: "SQL",
      prompt: "학생 테이블에서 학과별로 소속된 학생 수가 몇 명인지 구하는 SQL문을 작성하시오.",
      passage: `[작성 조건]
- 대소문자를 구분하지 않는다.
- WHERE 구문을 사용하지 않는다.
- GROUP BY 절을 사용해야 한다.
- 집계 함수를 사용해야 한다.
- 학생 수에 대해 '학과별튜플수'라는 별칭(AS)을 사용해야 한다.
- 세미콜론(;)은 생략 가능하다.

[학생 테이블]
| 학과 | 학생 |
| --- | --- |
| 전기 | 이순신 |
| 컴퓨터 | 안중근 |
| 컴퓨터 | 윤봉길 |
| 전자 | 이봉창 |
| 전자 | 강우규 |

[조회 결과]
| 학과 | 학과별튜플수 |
| --- | --- |
| 전기 | 1 |
| 컴퓨터 | 2 |
| 전자 | 2 |`,
      answer: "SELECT 학과, COUNT(*) AS 학과별튜플수 FROM 학생 GROUP BY 학과;",
      aliases: [
        "SELECT 학과, COUNT(*) AS 학과별튜플수 FROM 학생 GROUP BY 학과;",
        "SELECT 학과, COUNT(*) AS 학과별튜플수 FROM 학생 GROUP BY 학과",
        "SELECT 학과, COUNT(학과) AS 학과별튜플수 FROM 학생 GROUP BY 학과;",
        "SELECT 학과, COUNT(학과) AS 학과별튜플수 FROM 학생 GROUP BY 학과",
        "SELECT 학과, COUNT(학생) AS 학과별튜플수 FROM 학생 GROUP BY 학과;",
        "SELECT 학과, COUNT(학생) AS 학과별튜플수 FROM 학생 GROUP BY 학과",
        "select 학과, count(*) as 학과별튜플수 from 학생 group by 학과;",
        "select 학과, count(*) as 학과별튜플수 from 학생 group by 학과"
      ],
      explanation: "학과별 그룹화: `GROUP BY 학과`\n학생 수 집계 및 별칭: `COUNT(*) AS 학과별튜플수`\n전체 쿼리: `SELECT 학과, COUNT(*) AS 학과별튜플수 FROM 학생 GROUP BY 학과;`",
      trapPoint: "GROUP BY 절과 COUNT 집계 함수를 사용하고 AS 키워드로 별칭을 부여합니다."
    },
    {
      id: 17,
      category: "운영체제",
      prompt: "1969년 벨 연구소의 켄 톰슨과 데니스 리치 등이 개발한 운영체제로, 대부분 C언어로 작성되어 이식성이 뛰어나며 트리 구조의 계층적 파일 시스템과 강력한 멀티유저/멀티태스킹 환경을 제공하는 대표적인 OS는 무엇인가?",
      answer: "유닉스",
      aliases: ["유닉스", "UNIX", "unix"],
      explanation: "유닉스(UNIX)는 벨 연구소에서 개발된 시분할 다중 사용자 운영체제로, 대부분 C언어로 개발되어 뛰어난 이식성과 개방성을 지니며 현대 운영체제들의 모태가 되었습니다.",
      trapPoint: "벨 연구소에서 C언어로 개발된 이식성 뛰어난 운영체제는 유닉스(UNIX)입니다."
    },
    {
      id: 18,
      category: "C",
      prompt: "다음 C언어 소스 코드의 출력 결과를 쓰시오.",
      code: `#include <stdio.h>

void main() {
    char *p = "KOREA";
    printf("%s\n", p);
    printf("%s\n", p + 3);
    printf("%c\n", *p);
    printf("%c\n", *(p + 3));
    printf("%c\n", *p + 2);
}`,
      answer: `KOREA
EA
K
E
M`,
      aliases: [
        `KOREA\nEA\nK\nE\nM`,
        `KOREA EA K E M`
      ],
      explanation: "문자열 포인터 p (\"KOREA\")의 연산:\n1. `p`: \"KOREA\" 문자열 전체 출력 -> KOREA\n2. `p + 3`: 인덱스 3('E')부터 출력 -> EA\n3. `*p`: 0번 문자 -> K\n4. `*(p + 3)`: 3번 문자 -> E\n5. `*p + 2`: 문자 'K'의 아스키 코드에 +2 -> 'M'",
      trapPoint: "*p + 2는 문자 'K'의 아스키 코드에 2를 더한 것이므로 문자 'M'이 됩니다."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    public int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 2);
    }
}

class Child extends Parent {
    public int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 3);
    }
}

class good {
    public static void main(String[] args) {
        Parent obj = new Child();
        System.out.print(obj.compute(4));
    }
}`,
      answer: "1",
      aliases: ["1"],
      explanation: "객체 인스턴스가 Child이므로 다형성에 의해 Child의 `compute()`가 호출됩니다.\nChild.compute(num):\n- compute(4) = compute(3) + compute(1)\n  - compute(1) = 1 (1 <= 1)\n  - compute(3) = compute(2) + compute(0)\n    - compute(0) = 0 (0 <= 1)\n    - compute(2) = compute(1) + compute(-1)\n      - compute(1) = 1\n      - compute(-1) = -1 (-1 <= 1)\n      - compute(2) = 1 + (-1) = 0\n    - compute(3) = 0 + 0 = 0\n  - compute(4) = 0 + 1 = 1\n최종 출력: 1",
      trapPoint: "부모 타입 참조 변수라도 실제 인스턴스가 Child이므로 Child의 compute가 호출되며, compute(num-1) + compute(num-3) 공식을 따릅니다."
    },
    {
      id: 20,
      category: "보안",
      prompt: "정보보안의 3대 요소(기밀성, 무결성, 가용성) 중 인가된 정당한 사용자가 정보와 정보 시스템을 필요로 할 때 언제든지 지체 없이 정상적으로 사용할 수 있도록 보장하는 특성을 무엇이라 하는가?",
      answer: "가용성",
      aliases: ["가용성", "Availability", "availability"],
      explanation: "정보보안 3대 원칙(CIA Triad):\n- 기밀성(Confidentiality): 인가되지 않은 비인가자의 열람 차단\n- 무결성(Integrity): 인가되지 않은 비인가자의 위조·변조 방지\n- 가용성(Availability): 인가된 사용자가 원할 때 언제든 자원을 정상 사용할 수 있도록 보장",
      trapPoint: "필요 시 언제든 정상 사용할 수 있도록 보장하는 보안 특성은 '가용성(Availability)'입니다."
    }
  ]
};

