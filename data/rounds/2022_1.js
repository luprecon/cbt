/**
 * 2022년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2022_1"] = {
  id: "2022_1",
  title: "2022년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "운영체제",
      prompt: "다음 설명에 해당하는 RAID(Redundant Array of Independent Disks) 단계를 아라비아 숫자로 쓰시오.",
      passage: `- 스트라이핑(Striping) 기술을 사용하여 여러 디스크에 데이터를 분할 저장한다.
- I/O 로드가 여러 디스크로 분산되어 입출력 처리 속도가 가장 빠르다.
- 패리티(Parity)나 미러링(Mirroring)을 사용하지 않아 하나의 디스크만 고장 나도 전체 데이터가 손실되는 단점이 있다.`,
      answer: "0",
      aliases: ["0", "RAID 0", "RAID0", "레벨 0", "단계 0"],
      explanation: "RAID 0은 스트라이핑(Striping)을 통해 성능을 극대화하지만 데이터 중복이나 오류 복구 기능(신뢰성)이 없는 방식입니다. (미러링은 RAID 1, 패리티 분산 저장은 RAID 5).",
      trapPoint: "신뢰성 없이 성능 향상만을 위한 단순 스트라이핑은 RAID 0입니다."
    },
    {
      id: 2,
      category: "데이터베이스",
      prompt: "데이터베이스 트랜잭션 장애 회복(Recovery) 기법에 대한 다음 설명의 빈칸에 들어갈 알맞은 용어(영문)를 각각 쓰시오.",
      passage: `( 1 ) 트랜잭션이 성공적으로 완료(Commit)되었으나 변경 내용이 디스크에 기록되지 않은 경우, 로그(Log)를 기반으로 트랜잭션의 연산을 재실행하는 회복 기법
( 2 ) 트랜잭션이 비정상적으로 종료되어 데이터베이스가 일관성을 잃은 경우, 로그를 참조하여 트랜잭션이 수행한 모든 변경 연산을 취소하고 이전 상태로 되돌리는 회복 기법`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["REDO", "redo", "Redo"],
        "2": ["UNDO", "undo", "Undo"]
      },
      answer: "(1) REDO, (2) UNDO",
      aliases: ["REDO, UNDO", "redo, undo", "REDO UNDO", "재실행, 취소"],
      explanation: "1. REDO(재실행): 커밋된 트랜잭션의 내용을 다시 실행하여 디스크에 반영.\n2. UNDO(취소): 완료되지 못한 트랜잭션의 작업을 취소하여 트랜잭션 시작 전 상태로 되돌림.",
      trapPoint: "연산 재실행은 REDO, 변경 취소는 UNDO입니다."
    },
    {
      id: 3,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class A {
    int a;
    int b;
}

public class Main {
    static void func1(A m) {
        m.a *= 10;
    }

    static void func2(A m) {
        m.a += m.b;
    }

    public static void main(String args[]) {
        A m = new A();
        m.a = 100;
        func1(m);
        m.b = m.a;
        func2(m);

        System.out.printf("%d", m.a);
    }
}`,
      answer: "2000",
      aliases: ["2000"],
      explanation: "객체 참조 전달(Call by Reference) 추적:\n1. `A m = new A(); m.a = 100;`\n2. `func1(m);`: m.a = 100 * 10 = 1000\n3. `m.b = m.a;`: m.b = 1000\n4. `func2(m);`: m.a = m.a + m.b = 1000 + 1000 = 2000\n5. `System.out.printf(\"%d\", m.a);` -> 2000 출력.",
      trapPoint: "Java에서 객체는 참조값이 전달되므로 func1, func2 내부에서의 멤버 변수 수정이 main 메소드의 객체 m에 그대로 반영됩니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 [성적] 테이블에서 score 컬럼을 기준으로 내림차순 정렬하여 name과 score를 조회하는 SQL 문의 빈칸 (1), (2), (3)을 순서대로 쓰시오.",
      passage: `SELECT name, score FROM 성적 (   1   ) BY (   2   ) (   3   );`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ORDER", "order"],
        "2": ["score", "SCORE"],
        "3": ["DESC", "desc"]
      },
      answer: "(1) ORDER, (2) score, (3) DESC",
      aliases: [
        "(1) ORDER, (2) score, (3) DESC",
        "ORDER, score, DESC",
        "ORDER score DESC"
      ],
      explanation: "SQL에서 결과를 정렬할 때는 `ORDER BY 컬럼명 [ASC|DESC]` 절을 사용합니다. 내림차순 정렬이므로 `ORDER BY score DESC`가 됩니다.",
      trapPoint: "정렬 키워드는 ORDER BY이며, 내림차순은 DESC (오름차순은 ASC)입니다."
    },
    {
      id: 5,
      category: "데이터베이스",
      prompt: "관계 데이터베이스의 이상(Anomaly) 현상 중 '삭제 이상(Deletion Anomaly)'의 개념에 대해 간략히 서술하시오.",
      answer: "튜플을 삭제할 때 삭제 의도와 무관한 필수적인 정보까지 함께 연쇄적으로 삭제되는 현상",
      aliases: [
        "튜플을 삭제할 때 삭제 의도와 무관한 필수적인 정보까지 함께 연쇄적으로 삭제되는 현상",
        "데이터를 삭제할 경우 원하지 않는 다른 데이터도 삭제되어버리는 이상",
        "어떤 정보를 삭제하면 유용한 다른 정보까지 함께 삭제되는 현상",
        "삭제 시 원치 않는 정보까지 함께 삭제되는 현상"
      ],
      explanation: "삭제 이상(Deletion Anomaly)이란 한 릴레이션에서 특정 정보를 삭제하기 위해 한 튜플을 삭제할 때, 삭제 의도와 무관한 다른 필수 정보까지 연쇄적으로 함께 유실되는 현상입니다.",
      trapPoint: "불필요한 데이터가 연쇄 삭제되어 중요한 정보가 손실되는 점이 핵심 키워드입니다."
    },
    {
      id: 6,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def exam(num1, num2=2):
    print('a=', num1, 'b=', num2)

exam(20)`,
      answer: "a= 20 b= 2",
      aliases: ["a= 20 b= 2", "a=20 b=2", "a= 20, b= 2"],
      explanation: "파이썬의 디폴트 매개변수(Default Parameter):\nexam(20) 호출 시 num1에는 20이 전달되고, 두 번째 인자가 생략되었으므로 기본값 num2=2가 사용됩니다.\nprint 함수는 인자들을 공백으로 구분하여 출력하므로 'a= 20 b= 2'가 출력됩니다.",
      trapPoint: "디폴트 매개변수 num2=2가 지정되어 있으므로 두 번째 인자가 없어도 에러 없이 기본값 2가 적용됩니다."
    },
    {
      id: 7,
      category: "Python",
      prompt: "다음 파이썬 리스트 내장 메소드 설명에 알맞은 함수명을 각각 쓰시오.",
      passage: `( 1 ) 리스트의 끝에 다른 반복 가능한 객체(Iterable)의 모든 요소를 개별적으로 추가하여 리스트를 확장하는 메소드
( 2 ) 리스트의 마지막 요소(또는 지정된 인덱스 요소)를 꺼내어 리스트에서 삭제하고 해당 값을 반환하는 메소드
( 3 ) 리스트 내부 요소들의 순서를 역순으로 뒤집는 메소드`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["extend", "extend()"],
        "2": ["pop", "pop()"],
        "3": ["reverse", "reverse()"]
      },
      answer: "(1) extend, (2) pop, (3) reverse",
      aliases: ["extend, pop, reverse", "extend pop reverse"],
      explanation: "파이썬 리스트 주요 메소드:\n1. extend(iterable): 요소들을 풀어서 확장 추가 (append는 리스트 자체를 통째로 1개 요소로 추가)\n2. pop([index]): 요소를 삭제하며 반환\n3. reverse(): 리스트 원소 순서 뒤집기",
      trapPoint: "단일 원소 추가는 append, 여러 요소를 풀어 확장하는 것은 extend입니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "무선 LAN 보안 표준인 WPA에서 WEP의 취약점을 보완하기 위해 개발된 암호화 프로토콜의 영문 약어를 쓰시오.",
      passage: `임시 키 무결성 프로토콜(Temporal Key Integrity Protocol)로, 기존 무선 통신 기기의 하드웨어 교체 없이 소프트웨어 업그레이드를 통해 패킷당 암호화 키를 동적으로 변경하는 기능을 제공한다.`,
      answer: "TKIP",
      aliases: ["TKIP", "tkip", "Temporal Key Integrity Protocol"],
      explanation: "TKIP(Temporal Key Integrity Protocol)는 취약한 WEP을 대체하기 위해 WPA에 채택된 임시 키 무결성 프로토콜로, 패킷마다 키를 변경하여 보안성을 강화했습니다.",
      trapPoint: "임시 키 무결성 프로토콜의 약자는 TKIP입니다."
    },
    {
      id: 9,
      category: "소프트웨어공학",
      prompt: "키보드, 마우스와 같은 별도의 하드웨어 장치 없이 사용자의 말, 제스처, 표정, 시선 등 자연스러운 신체 행동으로 기기를 조작할 수 있는 사용자 인터페이스의 영문 약어를 쓰시오.",
      answer: "NUI",
      aliases: ["NUI", "nui", "Natural User Interface"],
      explanation: "UI의 발전 단계:\n- CLI: 텍스트 명령어 기반\n- GUI: 마우스, 아이콘, 윈도우 그래픽 기반\n- NUI(Natural User Interface): 음성, 터치, 동작, 시선 등 인간의 자연스러운 행동 기반\n- OUI: 모든 유기적 사물 기반",
      trapPoint: "말, 행동, 제스처 등 인간의 자연스러운 동작 기반 인터페이스는 NUI입니다."
    },
    {
      id: 10,
      category: "소프트웨어공학",
      prompt: "다음 소스 코드 분석 도구의 유형에 대한 설명에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 프로그램을 실행하지 않고, 소스 코드 자체의 구조와 문법을 분석하여 코딩 표준 준수 여부, 잠재적 결함, 보안 취약점 등을 찾아내는 분석 기법
( 2 ) 프로그램을 실제로 실행하면서 메모리 누수, 스레드 결함, 실행 시간 성능, 병목 현상 등을 동적으로 추적 및 분석하는 기법`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["정적 분석", "정적", "static", "Static"],
        "2": ["동적 분석", "동적", "dynamic", "Dynamic"]
      },
      answer: "(1) 정적 분석, (2) 동적 분석",
      aliases: [
        "정적 분석, 동적 분석",
        "정적, 동적",
        "static, dynamic",
        "정적분석, 동적분석"
      ],
      explanation: "1. 정적 분석(Static Analysis): 소스 코드 미실행 상태에서 문법/결함 분석 (SonarQube 등)\n2. 동적 분석(Dynamic Analysis): 소스 코드를 실행하면서 메모리/성능/스레드 분석 (Valgrind 등)",
      trapPoint: "실행 없이 분석 = 정적 분석, 실행하며 분석 = 동적 분석입니다."
    },
    {
      id: 11,
      category: "Java",
      prompt: "다음 Java 스레드 프로그램에서 Runnable 인터페이스를 구현한 인스턴스를 Thread 생성자에 전달하기 위해 빈칸에 들어갈 클래스명을 쓰시오.",
      code: `class Car implements Runnable {
    int a;

    public void run() {
        System.out.println("message");
    }
}

public class Main {
    public static void main(String args[]) {
        Thread t1 = new Thread(new _______());
        t1.start();
    }
}`,
      answer: "Car",
      aliases: ["Car", "car"],
      explanation: "Runnable 인터페이스를 구현한 클래스가 `Car`이므로, Thread 객체를 생성할 때 `new Thread(new Car())` 형태로 Runnable 구현 객체 인스턴스를 넘겨주어야 합니다.",
      trapPoint: "Thread 생성자의 매개변수로 Runnable을 구현한 클래스인 Car의 인스턴스를 생성하여 전달합니다."
    },
    {
      id: 12,
      category: "소프트웨어공학",
      prompt: "자바 프로그래밍 언어를 위한 대표적인 단위 테스트(Unit Test) 오픈소스 프레임워크의 명칭을 쓰시오.",
      passage: `켄트 벡과 에릭 감마가 작성한 xUnit 계열의 자바 전용 테스트 프레임워크로, 어노테이션(@Test 등)을 사용하여 테스트 케이스를 쉽게 작성하고 자동화할 수 있다.`,
      answer: "JUnit",
      aliases: ["JUnit", "junit", "Junit"],
      explanation: "JUnit은 자바 기반의 단위 테스트 자동화 도구로 xUnit 계열의 대표적인 프레임워크입니다.",
      trapPoint: "자바 단위 테스트 프레임워크 = JUnit입니다."
    },
    {
      id: 13,
      category: "소프트웨어공학",
      prompt: "다음 보기 중에서 블랙박스 테스트(Black-box Test) 기법에 해당하는 항목 3가지를 골라 기호를 쓰시오.",
      passage: `[보기]
ㄱ. 구문 커버리지 (Statement Coverage)
ㄴ. 결정 커버리지 (Decision Coverage)
ㄷ. 동등 분할 (Equivalence Partitioning)
ㄹ. 경계값 분석 (Boundary Value Analysis)
ㅁ. 조건 커버리지 (Condition Coverage)
ㅂ. 원인-효과 그래프 (Cause-Effect Graphing)`,
      answer: "ㄷ, ㄹ, ㅂ",
      aliases: ["ㄷ, ㄹ, ㅂ", "ㄷ ㄹ ㅂ", "ㄷ,ㄹ,ㅂ"],
      explanation: "테스트 기법 분류:\n- 화이트박스 테스트: 구문 커버리지(ㄱ), 결정 커버리지(ㄴ), 조건 커버리지(ㅁ), 기본 경로 테스팅\n- 블랙박스 테스트: 동등 분할(ㄷ), 경계값 분석(ㄹ), 원인-효과 그래프(ㅂ), 오류 예측, 상태 전이 테스트",
      trapPoint: "커버리지(구문, 결정, 조건)가 붙은 것은 화이트박스 테스트 기법입니다."
    },
    {
      id: 14,
      category: "C",
      prompt: "다음 C언어 소스코드에서 표준 입력값으로 5가 주어졌을 때의 출력값을 쓰시오.",
      code: `#include <stdio.h>

int func(int a) {
    if (a <= 1) return 1;
    return a * func(a - 1);
}

int main() {
    int a;
    scanf("%d", &a);
    printf("%d", func(a));
    return 0;
}`,
      answer: "120",
      aliases: ["120"],
      explanation: "입력값 5에 대한 팩토리얼 func(5) 계산:\n5! = 5 * 4 * 3 * 2 * 1 = 120이 출력됩니다.",
      trapPoint: "5! = 120입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어 프로그램에서 정수 1234를 역순으로 뒤집어 4321을 출력하고자 한다. 빈칸 (1), (2), (3)에 들어갈 알맞은 연산자를 순서대로 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int number = 1234;
    int div = 10;
    int result = 0;

    while (number (  1  ) 0) {
        result = result * div;
        result = result + number (  2  ) div;
        number = number (  3  ) div;
    }

    printf("%d", result);
    return 0;
}`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": [">", ">"],
        "2": ["%", "%"],
        "3": ["/", "/"]
      },
      answer: "(1) >, (2) %, (3) /",
      aliases: ["(1) >, (2) %, (3) /", ">, %, /", "> % /"],
      explanation: "숫자 뒤집기 알고리즘:\n1. number가 0보다 클 동안 반복: `while (number > 0)`\n2. 일의 자리를 추출하여 누적: `number % div` (나머지)\n3. 일의 자리를 제거: `number / div` (몫)\n따라서 (1) `>`, (2) `%`, (3) `/` 입니다.",
      trapPoint: "일의 자리 추출은 나머지 연산자 `%`, 다음 자리로 이동은 나눗셈 연산자 `/`입니다."
    },
    {
      id: 16,
      category: "보안",
      prompt: "기업이나 기관이 보유한 정보 자산의 기밀성, 완전성, 가용성을 보호하기 위해 수립·운영하는 정보보호 관리체계의 영문 약어를 쓰시오.",
      answer: "ISMS",
      aliases: ["ISMS", "isms", "Information Security Management System"],
      explanation: "ISMS(Information Security Management System, 정보보호 관리체계)는 정보 자산의 안전성을 확보하기 위해 종합적인 관리 대책을 수립·운영하는 체계입니다. (개인정보가 결합된 것은 ISMS-P).",
      trapPoint: "정보보호 관리체계의 약어는 ISMS입니다."
    },
    {
      id: 17,
      category: "데이터베이스",
      prompt: "다음 관계 데이터베이스의 키(Key) 속성에 대한 설명에서 빈칸에 공통으로 들어갈 제약 조건 명칭을 쓰시오.",
      passage: `1. 슈퍼키(Super Key)는 릴레이션의 튜플들을 고유하게 식별할 수 있는 (   1   )을 만족한다.
2. 후보키(Candidate Key)는 유일성과 함께 불필요한 속성을 포함하지 않는 (   2   )을 모두 만족해야 한다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["유일성", "유일성(Uniqueness)", "유일"],
        "2": ["최소성", "최소성(Minimality)", "최소"]
      },
      answer: "(1) 유일성, (2) 최소성",
      aliases: ["유일성, 최소성", "유일성 최소성", "Uniqueness, Minimality"],
      explanation: "- 슈퍼키: 유일성만 만족\n- 후보키: 유일성 + 최소성 모두 만족\n- 기본키: 후보키 중 선택된 대표 키 (유일성 + 최소성 + Not Null)",
      trapPoint: "슈퍼키는 유일성만, 후보키는 유일성과 최소성을 모두 만족합니다."
    },
    {
      id: 18,
      category: "보안",
      prompt: "다음 설명에 해당하는 지능형 지속 위협(APT) 공격 기법의 명칭을 쓰시오.",
      passage: `표적으로 삼은 조직의 구성원들이 자주 방문하는 합법적인 웹사이트를 사전에 조사하여 취약점을 이용해 악성코드를 심어두고, 표적이 해당 사이트에 접속했을 때 사용자의 PC에 악성코드를 감염시키는 공격 기법이다. (사자가 물웅덩이에 매복해 먹잇감을 사냥하는 모습에 빗댐)`,
      answer: "워터링 홀",
      aliases: ["워터링 홀", "워터링홀", "Watering Hole", "watering hole"],
      explanation: "워터링 홀(Watering Hole)은 표적 대상이 자주 방문하는 웹사이트를 미리 감염시켜 잠복하고 있다가, 대상자가 접속할 때 악성코드에 감염시키는 표적형 APT 공격 방식입니다.",
      trapPoint: "물웅덩이 매복 비유와 표적 웹사이트 사전 감염 키워드는 워터링 홀(Watering Hole)입니다."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int isPrime(int number) {
    int i;
    for (i = 2; i < number; i++) {
        if (number % i == 0) return 0;
    }
    return 1;
}

int main(void) {
    int number = 13195, max_div = 0, i;
    for (i = 2; i < number; i++) {
        if (isPrime(i) == 1 && number % i == 0) max_div = i;
    }
    printf("%d", max_div);
    return 0;
}`,
      answer: "29",
      aliases: ["29"],
      explanation: "13195의 소인수(Prime Factors) 중 가장 큰 값(max_div)을 구하는 알고리즘입니다.\n13195를 소인수분해하면:\n13195 = 5 * 2639\n= 5 * 7 * 377\n= 5 * 7 * 13 * 29\n소인수는 5, 7, 13, 29이며, 이 중 가장 큰 소인수는 29입니다.",
      trapPoint: "13195의 소인수 중 최댓값을 구하는 문제로 5 * 7 * 13 * 29 = 13195에서 최대 소인수는 29입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "소프트웨어 개발 생명주기(SDLC)의 V-모델에서 폭포수 모형의 각 개발 단계에 대응하는 4단계 테스트 레벨을 순서대로 쓰시오.",
      passage: `[단위 모듈 개발] -> (     1     )
[상세 설계] -> (     2     )
[시스템 설계 / 아키텍처] -> (     3     )
[요구사항 분석] -> (     4     )`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["단위 테스트", "단위테스트", "Unit Test"],
        "2": ["통합 테스트", "통합테스트", "Integration Test"],
        "3": ["시스템 테스트", "시스템테스트", "System Test"],
        "4": ["인수 테스트", "인수테스트", "Acceptance Test"]
      },
      answer: "(1) 단위 테스트, (2) 통합 테스트, (3) 시스템 테스트, (4) 인수 테스트",
      aliases: [
        "단위 테스트, 통합 테스트, 시스템 테스트, 인수 테스트",
        "단위테스트, 통합테스트, 시스템테스트, 인수테스트",
        "단위, 통합, 시스템, 인수"
      ],
      explanation: "V-모델의 개발 단계와 테스트 레벨 대응:\n1. 구현/코드 -> 단위 테스트 (Unit Test)\n2. 상세 설계 -> 통합 테스트 (Integration Test)\n3. 시스템 설계 -> 시스템 테스트 (System Test)\n4. 요구사항 분석 -> 인수 테스트 (Acceptance Test)",
      trapPoint: "V-모델 테스트 레벨 4단계는 '단위 -> 통합 -> 시스템 -> 인수' 순서(단-통-시-인)입니다."
    }
  ]
};

