/**
 * 2021년 제2회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2021_2"] = {
  id: "2021_2",
  title: "2021년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "네트워크",
      prompt: "별도의 유선 기반 시설(AP, 라우터 등) 없이 모바일 호스트들이 자율적으로 임시 통신망을 구성하며, 긴급 구조, 재난 현장, 군사 작전 등에 주로 활용되는 무선 분산 네트워크를 무엇이라고 하는지 쓰시오.",
      answer: "애드혹 네트워크",
      aliases: ["애드혹 네트워크", "애드혹네트워크", "애드혹", "Ad-hoc Network", "Ad-hoc", "Adhoc"],
      explanation: "애드혹 네트워크(Ad-hoc Network)는 고정된 기지국이나 유선 백본 인프라 없이 무선 단말기들이 서로 중계 역할을 하여 동적으로 형성하는 임시 자율 분산 통신망입니다.",
      trapPoint: "기반 시설 없이 단말 간 자율 구성되는 무선 네트워크는 애드혹(Ad-hoc) 네트워크입니다."
    },
    {
      id: 2,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 사용자 경험 및 인터페이스 개념을 각각 쓰시오.",
      passage: `( 1 ) 사용자가 시스템, 제품, 서비스를 직·간접적으로 이용하면서 느끼고 생각하는 총체적인 감정과 경험의 총체
( 2 ) 사용자와 컴퓨터 시스템 간의 상호작용이 원활하게 이루어지도록 돕는 매개체 (CLI, GUI 등)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["UX", "User Experience", "사용자 경험"],
        "2": ["UI", "User Interface", "사용자 인터페이스"]
      },
      answer: "(1) UX, (2) UI",
      aliases: ["UX, UI", "UX UI", "사용자 경험, 사용자 인터페이스"],
      explanation: "1. UX(User Experience): 사용자가 제품을 사용하며 느끼는 주관적 감정, 만족도, 경험\n2. UI(User Interface): 사용자와 기기 간 상호작용을 위한 시각적/물리적 조작 환경",
      trapPoint: "경험은 UX, 인터페이스 매개체는 UI입니다."
    },
    {
      id: 3,
      category: "데이터베이스",
      prompt: "데이터베이스 트랜잭션의 4대 특징(ACID) 중 '원자성(Atomicity)'의 개념에 대해 간략히 서술하시오.",
      answer: "트랜잭션에 포함된 모든 연산은 데이터베이스에 모두 반영(Commit)되거나 전혀 반영되지 않아야(Rollback) 한다.",
      aliases: [
        "트랜잭션에 포함된 모든 연산은 데이터베이스에 모두 반영(Commit)되거나 전혀 반영되지 않아야(Rollback) 한다.",
        "모두 반영되거나 아니면 전혀 반영되지 않아야 한다.",
        "트랜잭션의 연산은 전부 수행되거나 전부 취소되어야 한다.",
        "All or Nothing"
      ],
      explanation: "원자성(Atomicity, All or Nothing): 트랜잭션을 구성하는 명령들은 하나라도 오류가 발생하면 전체가 취소(Rollback)되어야 하며, 모두 정상일 때만 최종 반영(Commit)되어야 합니다.",
      trapPoint: "'전부 반영되거나 전부 취소되어야 한다(All or Nothing)'가 핵심 키워드입니다."
    },
    {
      id: 4,
      category: "데이터베이스",
      prompt: "관계 데이터베이스 정규화 과정에서 제1정규형을 만족하는 릴레이션의 기본키가 복합 속성일 때, 기본키의 진부분집합에 종속되는 '부분 함수 종속성'을 제거하여 모든 비주요 속성이 기본키에 '완전 함수 종속'되도록 분해하는 정규형은 제 몇 정규형인지 쓰시오.",
      answer: "제2정규형",
      aliases: ["제2정규형", "2정규형", "제 2정규형", "2NF"],
      explanation: "정규화 단계:\n- 1NF: 모든 도메인이 원자값\n- 2NF: 부분 함수 종속 제거 (완전 함수 종속 만족)\n- 3NF: 이행적 함수 종속 제거\n- BCNF: 모든 결정자가 후보키",
      trapPoint: "부분 함수 종속성 제거는 제2정규형(2NF)의 핵심 작업입니다."
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 테이블의 데이터를 수정하기 위한 SQL DML 문의 빈칸 (1), (2)에 들어갈 표준 SQL 키워드를 쓰시오.",
      passage: `(   1   ) 학생 (   2   ) 전공 = '인공지능' WHERE 점수 >= 90;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["UPDATE", "update"],
        "2": ["SET", "set"]
      },
      answer: "(1) UPDATE, (2) SET",
      aliases: ["(1) UPDATE, (2) SET", "UPDATE, SET", "UPDATE SET"],
      explanation: "기존 테이블의 데이터를 수정하는 표준 SQL 문법은 `UPDATE 테이블명 SET 컬럼 = 값 WHERE 조건;` 입니다.",
      trapPoint: "데이터 수정은 UPDATE ~ SET 조합입니다."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "다음 학생정보 테이블과 학과정보 테이블을 조인하는 SQL 문의 빈칸 (1), (2)에 들어갈 알맞은 단어를 쓰시오.",
      passage: `SELECT a.학번, a.이름, b.학과명
FROM 학생정보 a JOIN 학과정보 b (   1   ) a.학과 = b.(   2   );`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ON", "on"],
        "2": ["학과", "학과코드"]
      },
      answer: "(1) ON, (2) 학과",
      aliases: ["(1) ON, (2) 학과", "ON, 학과", "ON 학과"],
      explanation: "명시적 JOIN 구문에서 조인 조건을 기술할 때는 `ON` 키워드를 사용하며, 두 테이블에서 공통으로 조인 키가 되는 컬럼인 `학과`를 매칭합니다.",
      trapPoint: "JOIN 조건절 키워드는 ON입니다."
    },
    {
      id: 7,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = 100
result = 0
for i in range(1, 3):
    result = a >> i
    result = result + 1
print(result)`,
      answer: "26",
      aliases: ["26"],
      explanation: "비트 우측 시프트(>>) 추적:\n- range(1, 3)은 i = 1, 2 반복\n- i = 1:\n  a >> 1 = 100 >> 1 = 50\n  result = 50 + 1 = 51\n- i = 2:\n  a >> 2 = 100 >> 2 = 25\n  result = 25 + 1 = 26\n최종 print(result)는 26이 출력됩니다.",
      trapPoint: "루프 안에서 매번 a(100)를 기준으로 시프트 연산하므로 i=2일 때 100 >> 2 = 25에 1을 더해 26이 됩니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "미국 표준기술연구소(NIST)에서 노후화된 DES를 대체하기 위해 제정한 표준 대칭키 블록 암호 알고리즘으로, 블록 크기는 128비트이며 키 길이에 따라 128, 192, 256비트를 지원하는 알고리즘의 명칭(영문 약어)을 쓰시오.",
      answer: "AES",
      aliases: ["AES", "aes", "Advanced Encryption Standard"],
      explanation: "AES(Advanced Encryption Standard)는 벨기에의 레인달(Rijndael) 알고리즘을 기반으로 NIST가 채택한 차세대 표준 대칭키 블록 암호화 알고리즘입니다.",
      trapPoint: "DES를 대체한 128비트 블록 대칭키 표준 알고리즘은 AES입니다."
    },
    {
      id: 9,
      category: "소프트웨어공학",
      prompt: "화이트박스 테스트 검증 기준 중 다음 설명에 알맞은 커버리지 명칭을 각각 쓰시오.",
      passage: `( 1 ) 프로그램 내의 모든 실행 가능한 문장(Statement)을 최소한 한 번 이상 수행하도록 테스트하는 기준
( 2 ) 프로그램의 모든 분기 지점에서 전체 조건식의 참(True)과 거짓(False)이 적어도 한 번씩 수행되도록 테스트하는 기준
( 3 ) 전체 결정문의 참/거짓 결과와 상관없이, 결정문 내부의 각 '개별 조건식'이 참과 거짓을 적어도 한 번씩 갖도록 테스트하는 기준`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["구문 커버리지", "구문", "문장 커버리지", "문장", "Statement Coverage"],
        "2": ["결정 커버리지", "결정", "분기 커버리지", "분기", "Decision Coverage"],
        "3": ["조건 커버리지", "조건", "Condition Coverage"]
      },
      answer: "(1) 구문 커버리지, (2) 결정 커버리지, (3) 조건 커버리지",
      aliases: [
        "구문 커버리지, 결정 커버리지, 조건 커버리지",
        "구문, 결정, 조건",
        "문장, 결정, 조건"
      ],
      explanation: "화이트박스 커버리지 기준:\n1. 구문(문장) 커버리지: 모든 문장 1회 실행\n2. 결정(분기) 커버리지: 전체 조건식의 True/False 분기 1회 실행\n3. 조건 커버리지: 개별 조건식의 True/False 1회 실행",
      trapPoint: "문장은 구문 커버리지, 전체 분기는 결정 커버리지, 개별 조건은 조건 커버리지입니다."
    },
    {
      id: 10,
      category: "SQL",
      prompt: "다음 SQL 문에서 '이름' 컬럼이 '이'로 시작하는 데이터를 검색하여 특정 컬럼을 기준으로 내림차순 정렬하고자 한다. 빈칸 (1), (2)에 들어갈 알맞은 키워드를 쓰시오.",
      passage: `SELECT * FROM 사원 WHERE 이름 LIKE (   1   ) ORDER BY 사번 (   2   );`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["'이%'", "이%", "'이*'"],
        "2": ["DESC", "desc"]
      },
      answer: "(1) '이%', (2) DESC",
      aliases: ["(1) '이%', (2) DESC", "'이%', DESC", "이%, DESC"],
      explanation: "1. '이'로 시작하는 임의의 문자열 패턴: `'이%'` (와일드카드 %)\n2. 내림차순 정렬: `DESC` (오름차순은 ASC)",
      trapPoint: "SQL 문자열 패턴 매칭에서 '이'로 시작하는 문자열은 `'이%'`로 표현합니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "소프트웨어 모듈의 응집도(Cohesion) 유형 중 다음 설명에 알맞은 명칭을 각각 쓰시오.",
      passage: `( 1 ) 모듈 내부의 구성 요소들이 서로 다른 기능을 수행하지만, 정해진 순서에 따라 순차적으로 수행되는 응집도
( 2 ) 모듈 내부의 구성 요소들이 서로 다른 기능을 수행하지만 동일한 입력 자료를 사용하여 서로 다른 출력을 만들어 내거나, 동일한 출력을 만들어 내는 응집도 (통신적 응집도)
( 3 ) 모듈 내부의 모든 기능적 요소들이 단 하나의 단일한 목적이나 기능을 수행하기 위해 밀접하게 통합되어 있는 가장 이상적인 응집도`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["절차적 응집도", "절차적", "Procedural Cohesion"],
        "2": ["교환적 응집도", "교환적", "통신적 응집도", "통신적", "Communicational Cohesion"],
        "3": ["기능적 응집도", "기능적", "Functional Cohesion"]
      },
      answer: "(1) 절차적 응집도, (2) 교환적 응집도, (3) 기능적 응집도",
      aliases: [
        "절차적 응집도, 교환적 응집도, 기능적 응집도",
        "절차적, 교환적, 기능적",
        "절차, 통신, 기능"
      ],
      explanation: "응집도 강도 순서 (약함/나쁨 -> 강함/좋음):\n우연적 < 논리적 < 시간적 < 절차적 < 교환적(통신적) < 순차적 < 기능적\n1. 절차적: 실행 순서 연관\n2. 교환적(통신적): 동일 입출력 자료 공유\n3. 기능적: 단일 기능 수행",
      trapPoint: "동일 데이터 사용은 교환적(통신적) 응집도이고, 단일 목적 수행은 가장 높은 품질의 기능적 응집도입니다."
    },
    {
      id: 12,
      category: "네트워크",
      prompt: "패킷 교환 방식의 두 가지 유형에 대한 설명에 알맞은 방식을 각각 쓰시오.",
      passage: `( 1 ) 송수신 호스트 간에 가상 논리적 연결(경로)을 먼저 수립한 후 패킷을 순차적으로 전송하는 연결 지향형 교환 방식 (순서 보장)
( 2 ) 패킷 헤더의 목적지 주소를 기반으로 사전에 경로 설정 없이 각 패킷을 독립적으로 처리하여 최적 경로로 전송하는 비연결 지향형 방식 (순서 변경 가능)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["가상 회선 방식", "가상회선", "가상회선 방식", "Virtual Circuit"],
        "2": ["데이터그램 방식", "데이터그램", "Datagram"]
      },
      answer: "(1) 가상 회선 방식, (2) 데이터그램 방식",
      aliases: ["가상 회선 방식, 데이터그램 방식", "가상회선, 데이터그램"],
      explanation: "패킷 교환 방식의 분류:\n- 가상 회선(Virtual Circuit): 사전 논리 연결 수립, 순서 보장 (연결형)\n- 데이터그램(Datagram): 독립적 패킷 전송, 우회 전송 가능, 수신측 재순서화 필요 (비연결형)",
      trapPoint: "연결형은 가상 회선, 비연결형 독립 전송은 데이터그램입니다."
    },
    {
      id: 13,
      category: "소프트웨어공학",
      prompt: "GoF 디자인 패턴 중 반복적으로 사용되는 클래스나 객체 간의 상호작용 방법과 책임 분배 알고리즘을 패턴화한 것으로, Interpreter, Observer, Command, Strategy, Template Method 등이 속하는 패턴 그룹의 명칭을 쓰시오.",
      answer: "행위 패턴",
      aliases: ["행위 패턴", "행위패턴", "행위", "Behavioral Pattern", "Behavioral"],
      explanation: "GoF 디자인 패턴 3대 분류:\n- 생성 패턴(Creational): 객체 생성 과정 캡슐화\n- 구조 패턴(Structural): 클래스/객체 합성 및 구조화\n- 행위 패턴(Behavioral): 객체 간 상호작용 및 책임 분배 알고리즘",
      trapPoint: "Observer, Command, Strategy 등이 속하는 그룹은 행위(Behavioral) 패턴입니다."
    },
    {
      id: 14,
      category: "데이터베이스",
      prompt: "다중 사용자 환경에서 여러 트랜잭션이 동시에 실행될 때, 한 트랜잭션이 접근한 데이터에 대한 연산을 완료할 때까지 다른 트랜잭션이 해당 데이터를 참조하거나 수정하지 못하도록 상호 배제(Mutual Exclusion)를 제공하는 병행 제어 기법을 쓰시오.",
      answer: "로킹",
      aliases: ["로킹", "로킹 기법", "Locking", "락킹", "Lock"],
      explanation: "로킹(Locking)은 트랜잭션이 사용하는 자원에 잠금(Lock)을 설정하여 다른 트랜잭션의 접근을 제어함으로써 직렬 가능성을 보장하는 대표적인 병행 제어 기법입니다.",
      trapPoint: "트랜잭션 데이터 상호 배제 잠금 기법은 로킹(Locking)입니다."
    },
    {
      id: 15,
      category: "소프트웨어공학",
      prompt: "럼바우(Rumbaugh) 객체지향 분석 기법(OMT)의 3가지 분석 모델링 활동에 대한 설명에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 다수의 프로세스들 간의 자료 흐름을 중심으로 처리 과정을 표현하며, 자료 흐름도(DFD)를 주 도구로 사용하는 모델링
( 2 ) 시간에 따른 객체들의 상태 변화와 상호 작용을 표현하며, 상태 다이어그램(State Diagram)을 주 도구로 사용하는 모델링
( 3 ) 시스템에서 요구되는 객체를 찾아내어 속성과 연산, 객체 간의 관계를 규정하며, 객체 다이어그램(ERD)을 주 도구로 사용하는 가장 먼저 수행되는 모델링`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["기능 모델링", "기능", "Functional Modeling"],
        "2": ["동적 모델링", "동적", "Dynamic Modeling"],
        "3": ["객체 모델링", "객체", "Object Modeling"]
      },
      answer: "(1) 기능 모델링, (2) 동적 모델링, (3) 객체 모델링",
      aliases: [
        "기능 모델링, 동적 모델링, 객체 모델링",
        "기능, 동적, 객체",
        "Functional, Dynamic, Object"
      ],
      explanation: "럼바우(OMT) 분석 3단계 (순서: 객->동->기):\n1. 객체 모델링(Object): 정적 구조, 객체 다이어그램\n2. 동적 모델링(Dynamic): 상태 변화, 상태 다이어그램\n3. 기능 모델링(Functional): 자료 흐름, DFD",
      trapPoint: "자료흐름도(DFD)는 기능 모델링, 상태도는 동적 모델링, 객체 다이어그램은 객체 모델링입니다."
    },
    {
      id: 16,
      category: "C",
      prompt: "다음 C언어로 작성된 거듭제곱 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int mp(int base, int exp) {
    int res = 1;
    for (int i = 0; i < exp; i++) {
        res = res * base;
    }
    return res;
}

int main() {
    int res;
    res = mp(2, 10);
    printf("%d", res);
    return 0;
}`,
      answer: "1024",
      aliases: ["1024"],
      explanation: "mp(2, 10)은 밑 2를 10번 곱하는 거듭제곱 함수입니다.\n2^10 = 1024가 계산되어 출력됩니다.",
      trapPoint: "2의 10제곱은 1024입니다."
    },
    {
      id: 17,
      category: "Java",
      prompt: "다음 Java 프로그램에서 클래스 인스턴스 생성 없이 `클래스명.메소드명()` 형태로 호출하여 \"positive\"를 출력하고자 할 때, 빈칸에 들어갈 알맞은 제어 키워드를 쓰시오.",
      code: `public class Test {
    public static void main(String[] args) {
        System.out.print(Test.check(1));
    }

    (        ) static String check(int num) {
        return (num >= 0) ? "positive" : "negative";
    }
}`,
      answer: "public",
      aliases: ["public", "static", "public static"],
      explanation: "인스턴스 생성 없이 클래스명으로 직접 호출하려면 `static` 키워드가 필요하며, 다른 클래스 및 main 메소드에서 접근하기 위해 접근 제한자 `public static`을 선언합니다.",
      trapPoint: "객체 생성 없이 클래스 직접 호출하는 정적 메소드 키워드는 static입니다."
    },
    {
      id: 18,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int ary[3];
    int s = 0;
    *(ary + 0) = 1;
    ary[1] = *(ary + 0) + 2;
    ary[2] = *ary + 3;

    for (int i = 0; i < 3; i++) {
        s = s + ary[i];
    }

    printf("%d", s);
    return 0;
}`,
      answer: "8",
      aliases: ["8"],
      explanation: "배열과 포인터 연산 추적:\n1. *(ary + 0) = 1 -> ary[0] = 1\n2. ary[1] = *(ary + 0) + 2 = 1 + 2 = 3\n3. ary[2] = *ary + 3 = 1 + 3 = 4 (*ary는 ary[0]의 값)\n4. s = ary[0] + ary[1] + ary[2] = 1 + 3 + 4 = 8\n따라서 8이 출력됩니다.",
      trapPoint: "*ary는 ary[0]과 같으므로 ary[2]는 1 + 3 = 4가 됩니다."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Ovr1 {
    int sun(int x, int y) {
        return x + y;
    }
}

class Ovr2 extends Ovr1 {
    int sun(int x, int y) {
        return x - y + super.sun(x, y);
    }
}

public class Main {
    public static void main(String[] args) {
        Ovr1 a1 = new Ovr1();
        Ovr2 a2 = new Ovr2();
        System.out.println(a1.sun(3, 2) + a2.sun(3, 2));
    }
}`,
      answer: "11",
      aliases: ["11"],
      explanation: "메소드 오버라이딩과 super 연산:\n1. `a1.sun(3, 2)`: Ovr1의 sun 호출 -> 3 + 2 = 5\n2. `a2.sun(3, 2)`: Ovr2의 오버라이딩된 sun 호출:\n   - `3 - 2 + super.sun(3, 2)`\n   - = 1 + (3 + 2) = 1 + 5 = 6\n3. `a1.sun(3, 2) + a2.sun(3, 2)` = 5 + 6 = 11 출력.",
      trapPoint: "a2.sun(3, 2)는 3 - 2 + (3 + 2) = 1 + 5 = 6이며, a1 결과 5와 합산하여 11이 됩니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "소프트웨어 테스트 하네스(Test Harness) 구성 요소 중, 하향식(Top-Down) 통합 테스트 시 아직 개발되지 않은 하위 모듈의 역할을 임시로 대신하여 호출에 응답하도록 만들어진 더미 모듈을 무엇이라고 하는지 쓰시오.",
      answer: "스텁",
      aliases: ["스텁", "테스트 스텁", "Stub", "stub", "Test Stub"],
      explanation: "테스트 하네스 주요 구성 요소:\n- 테스트 드라이버(Driver): 상향식 테스트 시 미완성 상위 모듈 대체\n- 테스트 스텁(Stub): 하향식 테스트 시 미완성 하위 모듈 대체\n- 테스트 슈트(Suite): 테스트 케이스 집합",
      trapPoint: "하향식 테스트의 하위 더미 모듈은 스텁(Stub)입니다."
    }
  ]
};

