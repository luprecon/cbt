/**
 * 2021년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2021_1"] = {
  id: "2021_1",
  title: "2021년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "네트워크",
      prompt: "물리적 MAC 주소를 기반으로 해당 장비의 논리적 IP 주소를 알아내기 위해 사용하는 역순 주소 결정 프로토콜의 영문 약어를 쓰시오.",
      answer: "RARP",
      aliases: ["RARP", "rarp", "Reverse Address Resolution Protocol"],
      explanation: "- ARP: IP 주소를 MAC(물리) 주소로 변환\n- RARP: MAC(물리) 주소를 IP 주소로 변환 (디스크리스 호스트 부팅 시 IP 할당 요청)",
      trapPoint: "IP -> MAC은 ARP이고, MAC -> IP 역방향은 RARP입니다."
    },
    {
      id: 2,
      category: "데이터베이스",
      prompt: "다음 데이터베이스 설계 절차에 대한 설명에서 빈칸에 들어갈 알맞은 단계를 보기에서 찾아 각각 쓰시오.",
      passage: `( 1 ) 특정 DBMS의 특성과 저장 장치의 성능을 고려하여 데이터베이스 저장 구조 및 인덱스 등을 설계하는 과정
( 2 ) 현실 세계의 요구사항을 개념적 스키마(E-R 다이어그램)로 모델링하는 과정
( 3 ) 목표 DBMS의 데이터 모델에 맞추어 개념적 구조를 테이블 스키마로 변환하고 정규화를 수행하는 과정

[보기: 개념적 설계, 논리적 설계, 물리적 설계, 구현, 요구사항 분석]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["물리적 설계", "물리적설계", "물리적"],
        "2": ["개념적 설계", "개념적설계", "개념적"],
        "3": ["논리적 설계", "논리적설계", "논리적"]
      },
      answer: "(1) 물리적 설계, (2) 개념적 설계, (3) 논리적 설계",
      aliases: [
        "물리적 설계, 개념적 설계, 논리적 설계",
        "물리적, 개념적, 논리적",
        "물리적설계, 개념적설계, 논리적설계"
      ],
      explanation: "DB 설계 3단계:\n1. 개념적 설계: ERD 도출, 개념 스키마\n2. 논리적 설계: 릴레이션 매핑, 정규화, 논리 스키마\n3. 물리적 설계: 저장 레코드 양식, 인덱스, 물리 스키마",
      trapPoint: "저장 구조 설계는 물리적 설계, ERD 도출은 개념적 설계, 정규화/테이블 매핑은 논리적 설계입니다."
    },
    {
      id: 3,
      category: "소프트웨어공학",
      prompt: "소프트웨어 요구사항의 분류 중 다음 설명에 알맞은 유형을 각각 쓰시오.",
      passage: `( 1 ) 시스템이 실제로 수행해야 하는 본연의 기능이나 사용자가 요구하는 연산 및 서비스에 관한 요구사항
( 2 ) 시스템의 성능, 신뢰성, 보안성, 가용성, 품질, 제약사항 등 기능 이외의 특성에 관한 요구사항`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["기능적 요구사항", "기능적", "기능 요구사항"],
        "2": ["비기능적 요구사항", "비기능적", "비기능 요구사항"]
      },
      answer: "(1) 기능적 요구사항, (2) 비기능적 요구사항",
      aliases: [
        "기능적 요구사항, 비기능적 요구사항",
        "기능적, 비기능적",
        "기능, 비기능"
      ],
      explanation: "요구사항 분류:\n- 기능적 요구사항: 시스템이 무엇을 하는가 (입출력, 연산, 업무 기능)\n- 비기능적 요구사항: 성능, 보안, 제약조건, 품질 기준",
      trapPoint: "기능 자체는 기능적 요구사항, 품질/성능/제약은 비기능적 요구사항입니다."
    },
    {
      id: 4,
      category: "네트워크",
      prompt: "웹 서비스에 대한 서비스 명칭, 위치(URI), 전송 프로토콜, 입출력 메시지 포맷 등을 상세하게 기술한 XML 기반의 인터페이스 정의 언어의 영문 약어를 쓰시오.",
      answer: "WSDL",
      aliases: ["WSDL", "wsdl", "Web Services Description Language"],
      explanation: "WSDL(Web Services Description Language)은 웹 서비스가 제공하는 기능과 호출 방법, 메시지 형식 등을 기술한 XML 기반 표준 명세 언어입니다.",
      trapPoint: "SOAP 웹 서비스의 명세 파일 언어는 WSDL입니다."
    },
    {
      id: 5,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `class Good:
    li = ["seoul", "kyeonggi", "inchon", "daejeon", "daegu", "pusan"]

g = Good()
str01 = ''
for i in g.li:
    str01 = str01 + i[0]

print(str01)`,
      answer: "skiddp",
      aliases: ["skiddp"],
      explanation: "리스트의 각 문자열에서 0번 인덱스(첫 글자)만 추출하여 str01에 이어붙입니다.\n- 's'eoul -> 's'\n- 'k'yeonggi -> 'k'\n- 'i'nchon -> 'i'\n- 'd'aejeon -> 'd'\n- 'd'aegu -> 'd'\n- 'p'usan -> 'p'\n최종 str01 = \"skiddp\"가 출력됩니다.",
      trapPoint: "i[0]은 각 도시명 문자열의 첫 번째 문자를 의미합니다."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "다음 [급여] 테이블에 대해 SQL 문을 실행한 결과(출력되는 카운트 숫자)를 쓰시오.",
      passage: `[급여 테이블]
| EMPNO | SAL |
| --- | --- |
| 100 | 1000 |
| 200 | 3000 |
| 300 | 1500 |

[쿼리]
SELECT COUNT(*) FROM 급여
WHERE EMPNO > 100 AND SAL >= 3000 OR EMPNO = 200;`,
      answer: "1",
      aliases: ["1"],
      explanation: "SQL 연산자 우선순위: AND가 OR보다 높습니다.\n1. `EMPNO > 100 AND SAL >= 3000` 평가:\n   - 100행: EMPNO > 100 거짓\n   - 200행: 200 > 100(참) AND 3000 >= 3000(참) -> 참\n   - 300행: 300 > 100(참) AND 1500 >= 3000(거짓) -> 거짓\n2. `OR EMPNO = 200` 평가:\n   - 200행이 유일하게 참\n따라서 조건을 만족하는 튜플은 200행 1개뿐이므로 COUNT(*) 결과는 1입니다.",
      trapPoint: "AND가 OR보다 우선 평가되며, 만족하는 행은 EMPNO=200인 단 1행입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Good {
    public static void main(String[] args) {
        int[][] arr = new int[][] { {45, 50, 75}, {89} };
        System.out.println(arr[0].length);
        System.out.println(arr[1].length);
        System.out.println(arr[0][0]);
        System.out.println(arr[0][1]);
        System.out.println(arr[1][0]);
    }
}`,
      answer: "3 1 45 50 89",
      aliases: ["3 1 45 50 89", "3, 1, 45, 50, 89", "3\n1\n45\n50\n89"],
      explanation: "가변 2차원 배열 구조:\n- arr[0] = {45, 50, 75} -> 길이 3\n- arr[1] = {89} -> 길이 1\n- arr[0][0] = 45\n- arr[0][1] = 50\n- arr[1][0] = 89\n출력 순서: 3 -> 1 -> 45 -> 50 -> 89",
      trapPoint: "자바 2차원 배열은 행마다 열 길이가 다를 수 있는 가변 배열(Ragged Array)입니다."
    },
    {
      id: 8,
      category: "데이터베이스",
      prompt: "정규화된 데이터베이스에서 시스템 성능 향상과 조회 편의성을 위해 의도적으로 정규화 원칙을 위배하여 테이블 통합, 분할, 중복 컬럼 추가 등을 수행하는 기법을 무엇이라고 하는지 쓰시오.",
      answer: "반정규화",
      aliases: ["반정규화", "비정규화", "역정규화", "De-normalization", "Denormalization"],
      explanation: "반정규화(비정규화, 역정규화)는 정규화로 인해 릴레이션 간 조인이 과도하게 발생하여 성능이 저하되는 것을 방지하기 위해 중복이나 통합을 허용하는 데이터 모델링 기법입니다.",
      trapPoint: "성능 향상을 위한 정규화 역행 기법은 반정규화(비정규화)입니다."
    },
    {
      id: 9,
      category: "소프트웨어공학",
      prompt: "다음 테스트 설명에 해당하는 블랙박스 테스트 기법의 명칭을 각각 쓰시오.",
      passage: `1. 유효 범위가 0 <= x <= 10 일 때, 경계값인 -1, 0, 10, 11을 테스트 케이스로 선정하여 검사하는 기법
2. 입력 데이터의 전체 영역을 유효값 그룹과 무효값 그룹으로 분류(분할)하고, 각 그룹의 대표값을 선정하여 검사하는 기법`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["경계값 분석", "경계값분석", "Boundary Value Analysis"],
        "2": ["동등 분할", "동등분할", "동치 분할", "동치분할", "Equivalence Partitioning"]
      },
      answer: "(1) 경계값 분석, (2) 동등 분할",
      aliases: ["경계값 분석, 동등 분할", "경계값분석, 동등분할"],
      explanation: "1. 경계값 분석: 경계선 부근(-1, 0, 10, 11) 검사\n2. 동등 분할: 그룹별 대표값 선정 검사",
      trapPoint: "경계 수치 검사는 경계값 분석, 그룹별 대표값 검사는 동등 분할입니다."
    },
    {
      id: 10,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 소프트웨어 테스트 단계를 각각 쓰시오.",
      passage: `( 1 ) 소프트웨어 설계의 최소 단위인 모듈이나 컴포넌트, 함수 단위의 결함을 찾아내는 테스트
( 2 ) 모듈 간의 상호 작용 및 인터페이스가 정상적으로 연동되어 동작하는지 검증하는 테스트`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["단위 테스트", "단위테스트", "Unit Test"],
        "2": ["통합 테스트", "통합테스트", "Integration Test"]
      },
      answer: "(1) 단위 테스트, (2) 통합 테스트",
      aliases: ["단위 테스트, 통합 테스트", "단위, 통합", "단위테스트, 통합테스트"],
      explanation: "1. 단위 테스트: 개별 모듈/함수 수준의 테스트\n2. 통합 테스트: 결합된 모듈 간의 인터페이스 및 연동 테스트",
      trapPoint: "모듈 단위는 단위 테스트, 인터페이스 연동은 통합 테스트입니다."
    },
    {
      id: 11,
      category: "네트워크",
      prompt: "IP 주소 체계에 대한 다음 물음의 빈칸에 알맞은 숫자를 쓰시오.",
      passage: `- IPv6 주소 체계의 전체 비트 수는 (   1   ) 비트이다.
- IPv4 주소 체계는 전체 32비트이며, 10진수로 표기하기 위해 (   2   ) 비트씩 4개의 옥텟으로 구분한다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["128", "128bit"],
        "2": ["8", "8bit"]
      },
      answer: "(1) 128, (2) 8",
      aliases: ["(1) 128, (2) 8", "128, 8", "128 8"],
      explanation: "1. IPv6: 128비트 (16비트씩 8개 부분, 16진수 표기)\n2. IPv4: 32비트 (8비트씩 4개 옥텟, 10진수 표기)",
      trapPoint: "IPv6는 128비트이고, IPv4는 8비트씩 4마디입니다."
    },
    {
      id: 12,
      category: "운영체제",
      prompt: "운영체제에서 독립적으로 실행 중인 둘 이상의 프로세스가 공유 메모리, 파이프, 소켓, 세마포어, 메시지 큐 등을 통해 데이터를 서로 교환하고 제어하는 기술의 영문 약어를 쓰시오.",
      answer: "IPC",
      aliases: ["IPC", "ipc", "Inter-Process Communication", "Inter Process Communication"],
      explanation: "IPC(Inter-Process Communication, 프로세스 간 통신)는 프로세스 간에 서로 데이터를 주고받고 동기화를 수행하기 위한 메커니즘입니다.",
      trapPoint: "프로세스 간 통신 기술의 약자는 IPC입니다."
    },
    {
      id: 13,
      category: "소프트웨어공학",
      prompt: "기업 내의 서로 다른 플랫폼, ERP, CRM 등 다양한 이기종 애플리케이션 및 시스템을 연계·통합하여 비즈니스 프로세스를 자동화하는 엔터프라이즈 솔루션의 영문 약어를 쓰시오. (포인트 투 포인트, 허브 앤 스포크, 메시지 버스 등의 구축 유형이 있음)",
      answer: "EAI",
      aliases: ["EAI", "eai", "Enterprise Application Integration"],
      explanation: "EAI(Enterprise Application Integration)는 기업 내 다양한 시스템과 애플리케이션을 상호 연계하고 통합하는 솔루션입니다.",
      trapPoint: "Point-to-Point, Hub & Spoke, Message Bus 방식의 기업 애플리케이션 통합은 EAI입니다."
    },
    {
      id: 14,
      category: "데이터베이스",
      prompt: "다음 [학생] 릴레이션의 (1) 카디널리티(Cardinality)와 (2) 디그리(Degree, 차수)의 숫자를 각각 구하시오.",
      passage: `[학생 릴레이션]
| 학번 | 이름 | 학년 | 학과 |
| --- | --- | --- | --- |
| 20202020 | 김제원 | 3 | 무역과 |
| 20202021 | 김한국 | 1 | 통신과 |
| 20202022 | 허달력 | 4 | 영어과 |
| 20202023 | 이소파 | 2 | 영어과 |
| 20202024 | 장가위 | 3 | 중국어과 |`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["5", "5개"],
        "2": ["4", "4개"]
      },
      answer: "카디널리티: 5, 디그리: 4",
      aliases: ["카디널리티: 5, 디그리: 4", "5, 4", "5 4"],
      explanation: "- 카디널리티(Cardinality): 튜플(행)의 수 = 5행 (5)\n- 디그리(Degree, 차수): 속성(열)의 수 = {학번, 이름, 학년, 학과} 4열 (4)",
      trapPoint: "카디널리티는 행의 개수(5), 디그리는 열(속성)의 개수(4)입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

struct good {
    char name[10];
    int age;
};

int main() {
    struct good s[] = {"Kim", 28, "Lee", 38, "Seo", 50, "Park", 35};
    struct good *p;
    p = s;
    p++;
    printf("%s\\n", p->name);
    printf("%d\\n", p->age);
    return 0;
}`,
      answer: "Lee 38",
      aliases: ["Lee 38", "Lee, 38", "Lee\n38"],
      explanation: "1. `p = s;` 로 구조체 배열의 0번 원소 s[0] {\"Kim\", 28}을 가리킵니다.\n2. `p++;` 연산 시 구조체 크기만큼 포인터가 증가하여 1번 원소 s[1] {\"Lee\", 38}을 가리킵니다.\n3. `p->name`은 \"Lee\", `p->age`는 38이 출력됩니다.",
      trapPoint: "p++를 통해 s[0]에서 s[1]로 이동하므로 Lee와 38이 출력됩니다."
    },
    {
      id: 16,
      category: "데이터베이스",
      prompt: "데이터 모델의 3대 구성 요소(연산, 구조, 제약조건)에 대한 다음 설명의 빈칸에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 데이터베이스에 저장된 실제 데이터를 처리하는 작업에 대한 명세로서, 데이터 조작의 기본 도구
( 2 ) 데이터베이스에 표현될 대상인 개체 타입과 이들 간의 관계를 명세한 논리적 구조
( 3 ) 데이터베이스에 저장될 수 있는 실제 데이터 값의 유효성과 일관성을 유지하기 위한 규칙이나 조건 (개체 무결성, 참조 무결성 등)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["연산", "Operation", "operation"],
        "2": ["구조", "Structure", "structure"],
        "3": ["제약조건", "제약 조건", "Constraint", "constraint"]
      },
      answer: "(1) 연산, (2) 구조, (3) 제약조건",
      aliases: ["연산, 구조, 제약조건", "연산 구조 제약조건"],
      explanation: "데이터 모델 3대 구성 요소:\n1. 연산(Operation): 데이터 조작 및 처리 작업 명세\n2. 구조(Structure): 데이터 구조 및 정적 관계\n3. 제약조건(Constraint): 데이터 무결성 보장을 위한 제약 규칙",
      trapPoint: "데이터 모델 3요소는 '구조, 연산, 제약조건'입니다."
    },
    {
      id: 17,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Good {
    public static void main(String[] args) {
        int i, j;
        for (j = 0, i = 0; i <= 5; i++) {
            j += i;
            System.out.print(i);
            if (i == 5) {
                System.out.print("=");
                System.out.print(j);
            } else {
                System.out.print("+");
            }
        }
    }
}`,
      answer: "0+1+2+3+4+5=15",
      aliases: ["0+1+2+3+4+5=15"],
      explanation: "i가 0부터 5까지 반복하면서 i를 출력하고, j에 i를 누적합산합니다.\n- i < 5일 때는 뒤에 \"+\"를 출력\n- i == 5일 때는 \"=\"와 총합 j(15)를 출력\n따라서 \"0+1+2+3+4+5=15\"가 출력됩니다.",
      trapPoint: "0부터 시작하므로 0+1+2+3+4+5=15 형식으로 출력됩니다."
    },
    {
      id: 18,
      category: "보안",
      prompt: "시스템 객체에 대한 접근 권한을 사용자의 신분에 기반하여 통제하며, 객체의 소유자가 자신의 판단에 따라 다른 사용자에게 접근 권한을 부여하거나 회수할 수 있는 접근 제어 모델의 명칭(또는 영문 약어)을 쓰시오.",
      answer: "DAC",
      aliases: ["DAC", "dac", "임의적 접근 통제", "임의적접근통제", "Discretionary Access Control"],
      explanation: "DAC(Discretionary Access Control, 임의적 접근 통제)는 데이터의 소유자가 임의로 권한을 부여하는 신분 기반 접근 통제 방식입니다.",
      trapPoint: "소유자가 임의로 권한을 부여할 수 있는 모델은 임의적 접근 통제(DAC)입니다."
    },
    {
      id: 19,
      category: "소프트웨어공학",
      prompt: "소프트웨어 모듈의 결합도(Coupling) 유형에 대한 설명에 알맞은 용어를 보기에서 찾아 각각 쓰시오.",
      passage: `( 1 ) 한 모듈이 다른 모듈의 내부 논리 조직이나 내부 자료를 직접 참조하거나 수정하는 가장 결합도가 강한 상태
( 2 ) 모듈 간의 인터페이스로 배열이나 객체, 레코드 등 복합 자료 구조가 전달될 때의 결합도
( 3 ) 여러 모듈이 모듈 외부에 선언된 전역 변수를 공유하여 참조하거나 갱신할 때의 결합도

[보기: 자료 결합도, 스탬프 결합도, 제어 결합도, 외부 결합도, 공통 결합도, 내용 결합도]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["내용 결합도", "내용결합도", "Content Coupling"],
        "2": ["스탬프 결합도", "스탬프결합도", "Stamp Coupling"],
        "3": ["공통 결합도", "공통결합도", "Common Coupling"]
      },
      answer: "(1) 내용 결합도, (2) 스탬프 결합도, (3) 공통 결합도",
      aliases: ["내용 결합도, 스탬프 결합도, 공통 결합도", "내용, 스탬프, 공통"],
      explanation: "결합도 강도 순서 (약함/좋음 -> 강함/나쁨):\n자료(Data) < 스탬프(Stamp) < 제어(Control) < 외부(External) < 공통(Common) < 내용(Content)\n1. 내용 결합도: 타 모듈 내부 직접 침범\n2. 스탬프 결합도: 배열/객체 구조 전달\n3. 공통 결합도: 전역 변수 공유",
      trapPoint: "내부 직접 참조는 내용 결합도, 배열/자료구조 전달은 스탬프 결합도, 전역 변수는 공통 결합도입니다."
    },
    {
      id: 20,
      category: "보안",
      prompt: "TCP 연결 과정에서 송수신 측 사이의 활성화된 세션을 가로채어 정상적인 연결을 리셋(RST) 패킷으로 끊고, 공격자가 희생자의 권한을 도용하여 세션을 가로채는 공격 기법의 명칭을 쓰시오.",
      answer: "세션 하이재킹",
      aliases: ["세션 하이재킹", "세션하이재킹", "Session Hijacking", "TCP 세션 하이재킹"],
      explanation: "세션 하이재킹(Session Hijacking)은 이미 인증이 완료되어 연결 중인 TCP 세션을 가로채 공격자가 인증 없이 해당 세션의 권한을 탈취하는 공격입니다.",
      trapPoint: "세션을 가로채 권한을 도용하는 기법은 세션 하이재킹입니다."
    }
  ]
};

