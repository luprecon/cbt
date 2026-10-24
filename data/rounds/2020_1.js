/**
 * 2020년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2020_1"] = {
  id: "2020_1",
  title: "2020년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "소프트웨어공학",
      prompt: "애플리케이션 테스트의 기본 원리 중 '동일한 테스트 케이스로 반복 실행하면 더 이상 새로운 결함을 찾아낼 수 없으므로 주기적으로 테스트 케이스를 점검하고 개선해야 한다'는 원리를 의미하는 용어를 쓰시오.",
      answer: "살충제 패러독스",
      aliases: ["살충제 패러독스", "살충제패러독스", "Pesticide Paradox", "살충제 패러독스(Pesticide Paradox)"],
      explanation: "살충제 패러독스(Pesticide Paradox)는 동일한 테스트 케이스로 반복 테스트하면 새로운 결함을 발견할 수 없으므로, 테스트 케이스를 지속적으로 개선하고 새로운 기법을 도입해야 한다는 소프트웨어 테스팅의 기본 원리입니다.",
      trapPoint: "살충제를 반복 사용하면 해충에 내성이 생기듯, 테스트 케이스도 갱신하지 않으면 새로운 버그를 찾지 못합니다."
    },
    {
      id: 2,
      category: "데이터베이스",
      prompt: "대규모로 저장된 데이터 안에서 통계적 기법, 기계학습 등을 활용하여 체계적이고 자동적으로 숨겨진 규칙이나 유의미한 패턴을 찾아내는 데이터 분석 기술을 쓰시오.",
      answer: "데이터 마이닝",
      aliases: ["데이터 마이닝", "데이터마이닝", "Data Mining", "DataMining"],
      explanation: "데이터 마이닝(Data Mining)은 대용량 데이터 웨어하우스나 데이터베이스로부터 유의미한 상관관계, 패턴, 추세 등을 자동으로 발견하여 의사결정에 활용하는 기술입니다.",
      trapPoint: "데이터 웨어하우스는 대용량 통합 저장소이고, 그 안에서 패턴을 발굴·분석하는 기술은 데이터 마이닝입니다."
    },
    {
      id: 3,
      category: "네트워크",
      prompt: "통신 프로토콜(Protocol)의 기본 구성 3요소를 쓰시오.",
      passage: `( 1 ) 데이터의 형식(Format), 부호화 및 신호 레벨 등을 규정
( 2 ) 전송 제어, 오류 제어 및 정보의 의미를 규정
( 3 ) 통신 개체 간의 타이밍, 통신 속도 조정 및 메시지 순서 제어를 규정`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["구문", "Syntax", "syntax"],
        "2": ["의미", "Semantics", "semantics"],
        "3": ["순서", "타이밍", "Timing", "timing"]
      },
      answer: "(1) 구문, (2) 의미, (3) 순서(타이밍)",
      aliases: [
        "구문, 의미, 타이밍",
        "구문, 의미, 순서",
        "구문 의미 타이밍",
        "구문 의미 순서",
        "Syntax, Semantics, Timing"
      ],
      explanation: "프로토콜 3대 요소:\n1. 구문(Syntax): 데이터 형식, 부호화, 신호 규격\n2. 의미(Semantics): 전송 제어, 오류 검출 및 복구\n3. 타이밍/순서(Timing): 통신 속도 조정, 메시지 송수신 순서 제어",
      trapPoint: "구문(Syntax), 의미(Semantics), 타이밍/순서(Timing) 세 가지를 정확히 구분해야 합니다."
    },
    {
      id: 4,
      category: "소프트웨어공학",
      prompt: "W3C(World Wide Web Consortium)에서 개발하였으며, 웹 브라우저 간 비호환 문제와 SGML의 복잡함을 해결하기 위해 HTML의 한계를 극복하고 사용자가 임의로 태그를 정의할 수 있도록 고안된 다목적 마크업 언어를 쓰시오.",
      answer: "XML",
      aliases: ["XML", "xml", "eXtensible Markup Language"],
      explanation: "XML(eXtensible Markup Language)은 W3C가 제안한 마크업 언어로, HTML과 달리 사용자가 커스텀 태그를 정의할 수 있어 이기종 시스템 간 구조화된 데이터 교환 표준으로 널리 사용됩니다.",
      trapPoint: "SGML의 단순화 버전이자 사용자 정의 태그를 지원하는 마크업 언어는 XML입니다."
    },
    {
      id: 5,
      category: "소프트웨어공학",
      prompt: "속성-값(Attribute-Value Pair) 쌍으로 이루어진 데이터 오브젝트를 전달하기 위해 사용하는 개방형 표준 텍스트 포맷으로, Ajax 통신에서 XML을 대체하여 널리 쓰이는 경량 데이터 포맷의 영문 약어를 쓰시오.",
      answer: "JSON",
      aliases: ["JSON", "json", "JavaScript Object Notation"],
      explanation: "JSON(JavaScript Object Notation)은 경량의 텍스트 기반 데이터 교환 형식으로, { key: value } 형태의 사람이 읽기 쉬운 구조를 가져 현대 웹 API 및 Ajax 통신의 사실상 표준으로 자리 잡았습니다.",
      trapPoint: "Ajax 및 RESTful API에서 가장 널리 사용되는 경량 키-값 데이터 포맷은 JSON입니다."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "STUDENT 테이블에 컴퓨터과 학생 50명, 인터넷과 학생 100명, 사무자동화과 학생 50명의 정보(총 200명)가 저장되어 있을 때, 다음 SQL문 (1), (2), (3)의 실행 결과에 따른 튜플 수(행 수)를 각각 쓰시오. (단, DEPT 컬럼은 학과명이다.)",
      passage: `1) SELECT DEPT FROM STUDENT;
2) SELECT DISTINCT DEPT FROM STUDENT;
3) SELECT COUNT(DISTINCT DEPT) FROM STUDENT WHERE DEPT = '컴퓨터과';`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["200"],
        "2": ["3"],
        "3": ["1"]
      },
      answer: "(1) 200, (2) 3, (3) 1",
      aliases: ["200, 3, 1", "200 3 1", "200,3,1"],
      explanation: "1) SELECT DEPT FROM STUDENT: 중복을 포함한 모든 학생의 DEPT 튜플 출력 -> 200개\n2) SELECT DISTINCT DEPT FROM STUDENT: 중복 학과 제거(컴퓨터과, 인터넷과, 사무자동화과) -> 3개\n3) SELECT COUNT(DISTINCT DEPT)... : 집계 함수 COUNT의 결과는 단일 행(1튜플)으로 출력 -> 1개",
      trapPoint: "COUNT() 집계 함수는 결과 행(튜플) 수가 1개입니다. 결과값도 1이지만 질문은 '튜플 수'이므로 1입니다."
    },
    {
      id: 7,
      category: "운영체제",
      prompt: "비선점형 프로세스 스케줄링 방식 중 SJF(Shortest Job First)의 약점인 긴 작업의 기아 현상을 보완하기 위해 고안된 HRN(Highest Response ratio Next) 스케줄링의 우선순위 계산식을 쓰시오.",
      answer: "(대기 시간 + 서비스 시간) / 서비스 시간",
      aliases: [
        "(대기 시간 + 서비스 시간) / 서비스 시간",
        "(대기시간 + 서비스시간) / 서비스시간",
        "(대기시간+서비스시간)/서비스시간",
        "(대기 시간 + 서비스 시간)/서비스 시간",
        "(대기시간 + 서비스 시간) / 서비스 시간",
        "(대기시간+서비스시간) / 서비스시간",
        "대기시간+서비스시간/서비스시간"
      ],
      explanation: "HRN 우선순위 계산식:\n우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간\n대기 시간이 길어질수록 우선순위 수치가 커져 먼저 실행될 수 있도록 보장합니다.",
      trapPoint: "분자는 (대기 시간 + 서비스 시간), 분모는 서비스 시간입니다."
    },
    {
      id: 8,
      category: "데이터베이스",
      prompt: "트랜잭션의 4대 특징(ACID) 중 일관성(Consistency)과 지속성(Durability) 외 나머지 2가지 특성을 쓰시오.",
      passage: `( 1 ) 트랜잭션의 모든 연산은 데이터베이스에 완전히 반영되거나 전혀 반영되지 않아야 한다(All or Nothing).
( 2 ) 둘 이상의 트랜잭션이 동시 실행될 때, 어느 하나의 트랜잭션도 다른 트랜잭션의 연산에 끼어들 수 없다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["원자성", "Atomicity", "atomicity"],
        "2": ["독립성", "격리성", "고립성", "Isolation", "isolation"]
      },
      answer: "(1) 원자성, (2) 독립성(격리성)",
      aliases: [
        "원자성, 독립성",
        "원자성, 격리성",
        "원자성 독립성",
        "원자성 격리성",
        "Atomicity, Isolation"
      ],
      explanation: "트랜잭션의 ACID 특성:\n- Atomicity(원자성): All or Nothing\n- Consistency(일관성): 트랜잭션 완료 후에도 무결성 제약 만족\n- Isolation(독립성/격리성): 트랜잭션 간 간섭 불가\n- Durability(지속성): 커밋된 결과 영구 보존",
      trapPoint: "All or Nothing은 원자성, 동시 실행 간섭 배제는 독립성(격리성)입니다."
    },
    {
      id: 9,
      category: "보안",
      prompt: "공격자가 패킷 전송 시 송신지(출발지) IP 주소와 수신지(목적지) IP 주소를 공격 대상의 IP 주소와 동일하게 조작하여, 대상 시스템이 자기 자신에게 응답 패킷을 반복 전송하게 만듦으로써 시스템 자원을 고갈시키는 서비스 거부(DoS) 공격 기법은 무엇인가?",
      answer: "랜드 어택",
      aliases: ["랜드 어택", "랜드어택", "Land Attack", "LAND Attack", "LAND attack"],
      explanation: "랜드 어택(LAND Attack)은 출발지 IP와 수신지 IP를 공격 대상의 IP와 동일하게 조작하여 전송함으로써, 타깃 시스템이 루프에 빠져 CPU 및 네트워크 자원을 고갈시키는 DoS 공격 기법입니다.",
      trapPoint: "출발지 IP = 목적지 IP 조작 공격은 LAND Attack입니다."
    },
    {
      id: 10,
      category: "보안",
      prompt: "RFC 1321로 지정되어 있으며, 파일의 원본 무결성 검증 등에 주로 사용되는 알고리즘으로, 1991년 로널드 라이베스트가 MD4를 보완하여 개발한 128비트 단방향 암호화 해시 함수는 무엇인가?",
      answer: "MD5",
      aliases: ["MD5", "md5", "Message-Digest algorithm 5"],
      explanation: "MD5(Message-Digest algorithm 5)는 128비트 고정 길이 해시값을 생성하는 암호학적 해시 알고리즘입니다. 현재는 해시 충돌 취약점으로 인해 SHA-256 등 더 안전한 알고리즘이 권장됩니다.",
      trapPoint: "로널드 라이베스트가 개발한 128비트 해시 함수는 MD5입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "다음은 공통 모듈 구현 및 소프트웨어 설계 원칙에 대한 설명이다. 괄호 (1), (2) 안에 알맞은 소프트웨어 공학 용어를 쓰시오.",
      passage: `- 소프트웨어 개발에 있어 기능을 분할하고 추상화하여 성능 향상 및 유지보수성을 극대화하기 위해 공통 모듈을 구현한다.
- 바람직한 모듈 설계 원칙에 따르면, 모듈 간의 상호 의존성을 나타내는 ( 1 )은/는 낮추고, 모듈 내부 요소들이 단일한 목적을 달성하기 위해 집중된 정도를 나타내는 ( 2 )은/는 높여야 한다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["결합도", "Coupling", "coupling"],
        "2": ["응집도", "Cohesion", "cohesion"]
      },
      answer: "(1) 결합도, (2) 응집도",
      aliases: [
        "결합도, 응집도",
        "결합도 응집도",
        "Coupling, Cohesion"
      ],
      explanation: "소프트웨어 모듈화의 황금 원칙은 '약한 결합도(Low Coupling), 강한 응집도(High Cohesion)'입니다. 결합도는 모듈 간 상호 의존성, 응집도는 모듈 내부 요소 간 관련성입니다.",
      trapPoint: "줄여야 하는 것은 결합도(Coupling), 높여야 하는 것은 응집도(Cohesion)입니다."
    },
    {
      id: 12,
      category: "C",
      prompt: "다음 C언어 소스 코드의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void main() {
    int i, j;
    int temp;
    int a[5] = {75, 95, 85, 100, 50};

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4 - i; j++) {
            if (a[j] > a[j + 1]) {
                temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }

    for (i = 0; i < 5; i++) {
        printf("%d", a[i]);
    }
}`,
      answer: "50758595100",
      aliases: ["50758595100"],
      explanation: "배열 {75, 95, 85, 100, 50}에 대해 버블 정렬(오름차순)을 수행합니다.\n정렬 완료 후 배열: {50, 75, 85, 95, 100}\n서식 문자 %d 뒤에 공백이나 줄바꿈이 없으므로 각 원소가 바로 이어져 출력됩니다.\n출력: 50758595100",
      trapPoint: "printf 출력 시 공백이 없으므로 50, 75, 85, 95, 100이 그대로 붙어서 50758595100으로 출력됩니다.",
      traceTable: {
        headers: ["단계", "배열 상태"],
        rows: [
          ["초기 상태", "{75, 95, 85, 100, 50}"],
          ["i=0 완료 (최댓값 뒤로)", "{75, 85, 95, 50, 100}"],
          ["i=1 완료", "{75, 85, 50, 95, 100}"],
          ["i=2 완료", "{75, 50, 85, 95, 100}"],
          ["i=3 완료 (최종 정렬)", "{50, 75, 85, 95, 100}"]
        ]
      }
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class good {
    public static void main(String[] args) {
        int i;
        int[] a = {0, 1, 2, 3};
        for (i = 0; i < 4; i++) {
            System.out.print(a[i] + " ");
        }
    }
}`,
      answer: "0 1 2 3",
      aliases: ["0 1 2 3 ", "0 1 2 3"],
      explanation: "배열 a = {0, 1, 2, 3}을 순회하며 각 원소와 공백 1칸을 출력합니다.\ni=0 -> '0 '\ni=1 -> '1 '\ni=2 -> '2 '\ni=3 -> '3 '\n전체 출력 결과: 0 1 2 3 ",
      trapPoint: "System.out.print()로 출력하며 각 숫자 뒤에 공백이 포함됩니다."
    },
    {
      id: 14,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class good {
    public static void main(String[] args) {
        int i = 3;
        int k = 1;
        switch (i) {
            case 0:
            case 1:
            case 2:
            case 3: k = 0;
            case 4: k += 3;
            case 5: k -= 10;
            default: k--;
        }
        System.out.print(k);
    }
}`,
      answer: "-8",
      aliases: ["-8"],
      explanation: "switch (i)에서 i=3이므로 case 3으로 점프합니다.\ncase문에 break문이 존재하지 않으므로 fall-through 현상으로 아래 모든 케이스가 순차 실행됩니다:\n- case 3: k = 0;\n- case 4: k += 3; (k = 3)\n- case 5: k -= 10; (k = 3 - 10 = -7)\n- default: k--; (k = -7 - 1 = -8)\n최종 출력: -8",
      trapPoint: "break가 없는 switch-case문은 일치하는 레이블부터 아래 모든 명령을 fall-through로 순차 실행합니다."
    },
    {
      id: 15,
      category: "소프트웨어공학",
      prompt: "다음 보기가 설명하는 소프트웨어 제품 패키지 릴리스 노트(Release Note)의 작성 항목은 무엇인가?",
      passage: `[보기]
문서 이름(릴리스 노트 이름), 제품 이름, 버전 번호, 릴리스 날짜, 참고 날짜, 노트 버전 등의 기본 메타 정보를 포함하는 항목`,
      answer: "헤더",
      aliases: ["헤더", "머릿말", "Header", "header", "해더"],
      explanation: "릴리스 노트의 헤더(Header) 항목에는 문서 이름, 제품 이름, 버전 번호, 릴리스 날짜, 작성자, 문서 버전 등의 기본 식별 정보가 포함됩니다.",
      trapPoint: "문서 식별 메타 정보가 들어가는 최상단 항목은 헤더(Header)입니다."
    },
    {
      id: 16,
      category: "소프트웨어공학",
      prompt: "LoC(Line of Code) 기법을 사용한 개발 비용 산정에서 개발할 전체 코드 라인 수가 30,000라인이고, 개발자가 5명 투입되며, 개발자 1인의 월평균 생산성이 300라인일 때 프로젝트의 개발 소요 기간(개월)을 구하시오.",
      answer: "20개월",
      aliases: ["20개월", "20", "20 개월", "20달"],
      explanation: "계산 공식:\n1. 총 노력(Man-Month) = 30,000라인 / 300라인 = 100인월(MM)\n2. 개발 기간 = 총 노력(MM) / 투입 인원 = 100 / 5 = 20개월",
      trapPoint: "전체 소요 인월(100인월)을 개발자 수(5명)로 나누어 기간(20개월)을 도출합니다."
    },
    {
      id: 17,
      category: "데이터베이스",
      prompt: "정규화된 엔티티, 속성, 관계에 대해 데이터베이스의 성능 향상과 시스템 개발·운영의 단순화를 목적으로 의도적으로 중복, 통합, 분리를 수행하는 데이터 모델링 기법을 쓰시오.",
      answer: "비정규화",
      aliases: ["비정규화", "반정규화", "역정규화", "De-normalization", "Denormalization", "de-normalization"],
      explanation: "비정규화(반정규화, De-normalization)는 정규화로 분해된 테이블 간 빈번한 JOIN 연산으로 인한 성능 저하를 방지하기 위해 중복 속성 추가, 테이블 통합 및 분할 등을 수행하는 물리적 설계 기법입니다.",
      trapPoint: "정규화 원칙에 위배되더라도 읽기 성능 및 운영 편의를 위해 의도적으로 중복을 허용하는 것은 비정규화(반정규화)입니다."
    },
    {
      id: 18,
      category: "네트워크",
      prompt: "OSI 7계층 중 물리적 전송 매체를 통해 비트(Bit) 스트림 형태의 전기적·광학적 신호를 전달하는 최하위 계층의 명칭을 쓰시오.",
      answer: "물리 계층",
      aliases: ["물리 계층", "물리계층", "물리", "Physical Layer", "physical layer", "Physical", "1계층"],
      explanation: "물리 계층(Physical Layer, 1계층)은 케이블, 커넥터, 전압 규격 등을 다루며 전송 매체를 통해 0과 1의 비트(Bit) 신호를 물리적으로 송수신하는 계층입니다.",
      trapPoint: "전송 단위가 '비트(Bit)'인 계층은 1계층인 물리 계층입니다."
    },
    {
      id: 19,
      category: "소프트웨어공학",
      prompt: "다음은 애플리케이션의 성능을 측정하기 위한 4대 지표에 대한 설명이다. 빈칸 (1), (2), (3)에 알맞은 지표명을 각각 쓰시오.",
      passage: `| 지표 | 설명 |
| --- | --- |
| ( 1 ) | 애플리케이션이 주어진 시간 동안 처리할 수 있는 트랜잭션의 수 (시간당 처리량) |
| ( 2 ) | 사용자 입력이 완료된 후, 시스템에서 첫 응답 출력이 시작될 때까지 걸리는 시간 |
| ( 3 ) | 사용자가 요청을 입력한 시점부터 트랜잭션 처리 후 전체 결과 출력이 완료될 때까지 걸리는 시간 |
| 자원 사용률 | 애플리케이션이 트랜잭션을 처리하는 동안 사용하는 CPU, 메모리, 네트워크 자원의 비율 |`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["처리량", "Throughput", "throughput"],
        "2": ["응답 시간", "응답시간", "Response Time", "response time"],
        "3": ["경과 시간", "경과시간", "반환 시간", "반환시간", "Turnaround Time", "turnaround time"]
      },
      answer: "(1) 처리량, (2) 응답 시간, (3) 경과 시간",
      aliases: [
        "처리량, 응답 시간, 경과 시간",
        "처리량, 응답시간, 경과시간",
        "처리량 응답시간 경과시간"
      ],
      explanation: "성능 측정 4대 지표:\n1. 처리량(Throughput): 단위 시간당 처리 트랜잭션 수\n2. 응답 시간(Response Time): 요청 후 첫 반응이 올 때까지의 지연\n3. 경과 시간(Turnaround Time): 요청부터 전체 작업 완료까지의 총 소요 시간\n4. 자원 사용률(Resource Usage): CPU, 메모리 등 하드웨어 점유율",
      trapPoint: "첫 응답 개시까지는 응답 시간, 전체 처리 완료까지는 경과 시간(Turnaround Time)입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "다음 모듈 간 호출 관계 다이어그램을 분석하여, Fan-in(팬인) 개수가 2 이상인 모듈의 명칭을 모두 쓰시오.",
      passage: `       ┌─── [ A ] ───┐
       │      │      │
       ▼      ▼      ▼
     [ B ]  [ C ]  [ D ]
      │ ╲    ╱ │     │
      │  ╲  ╱  │     │
      ▼   ▼▼   ▼     ▼
     [ E ] [ F ] [ G ] [ J ]
      │     │     │
      └──┬──┘     ▼
         ▼      [ I ]
       [ H ]

※ 모듈 호출(화살표) 관계:
- A -> B, C, D
- B -> E, F
- C -> F, G
- D -> J
- E -> H
- F -> H
- G -> I`,
      answer: "F, H",
      aliases: ["F, H", "F,H", "H, F", "H,F", "F H", "H F"],
      explanation: "Fan-in(팬인)은 해당 모듈을 호출하는 상위 모듈의 수(해당 모듈로 들어오는 화살표 수)입니다.\n- A: 0\n- B, C, D: 1 (모두 A로부터)\n- E: 1 (B로부터)\n- F: 2 (B와 C로부터 -> Fan-in >= 2 만족)\n- G: 1 (C로부터)\n- J: 1 (D로부터)\n- H: 2 (E와 F로부터 -> Fan-in >= 2 만족)\n- I: 1 (G로부터)\n따라서 Fan-in 수가 2 이상인 모듈은 F, H 입니다.",
      trapPoint: "Fan-in은 들어오는 화살표(자신을 호출하는 모듈), Fan-out은 나가는 화살표(자신이 호출하는 모듈)입니다."
    }
  ]
};

