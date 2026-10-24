/**
 * 2023년 제2회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2023_2"] = {
  id: "2023_2",
  title: "2023년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어 코드에서 보기의 조건에 맞도록 빈칸에 알맞은 코드를 작성하시오.",
      passage: `[보기]
입력값이 54321일 경우 출력값이 43215로 회전되어 출력되어야 한다.`,
      code: `#include <stdio.h>

int main(void) {
    int n[5];
    int i;

    for (i = 0; i < 5; i++) {
        scanf("%d", &n[i]);
    }

    for (i = 0; i < 5; i++) {
        printf("%d", (        ));
    }

    return 0;
}`,
      answer: "n[(i+1) % 5]",
      aliases: ["n[(i+1) % 5]", "n[(i + 1) % 5]", "n[(i+1)%5]", "n[(1+i)%5]"],
      explanation: "배열 요소를 왼쪽으로 1칸씩 회전(shift)하여 출력하는 문제입니다.\n- i = 0일 때: n[1]의 값(4) 출력\n- i = 1일 때: n[2]의 값(3) 출력\n- i = 2일 때: n[3]의 값(2) 출력\n- i = 3일 때: n[4]의 값(1) 출력\n- i = 4일 때: n[5 % 5] = n[0]의 값(5) 출력\n따라서 인덱스를 `(i + 1) % 5`로 순환시키는 `n[(i+1) % 5]`가 정답입니다.",
      trapPoint: "배열의 크기가 5이므로 나머지 연산자 % 5를 사용하여 마지막 인덱스 4 다음이 0번 인덱스로 순환되도록 합니다."
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램에서 총 4620원을 1000원, 500원, 100원, 10원으로 거슬러 줄 때 각 화폐의 개수를 최소 동전 개수로 계산하고자 한다. 빈칸에 들어갈 알맞은 수식을 쓰시오.",
      passage: `[사용 가능 요소: 변수 m, 연산자 /, %, 정수 1000, 500, 100, 10]`,
      code: `public class Problem {
    public static void main(String[] args) {
        int m = 4620;

        int a = (     1     ); // 천원짜리 4장
        int b = (     2     ); // 오백원짜리 1개
        int c = (     3     ); // 백원짜리 1개
        int d = (     4     ); // 십원짜리 2개

        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
        System.out.println(d);
    }
}`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["m / 1000", "m/1000"],
        "2": ["(m % 1000) / 500", "(m%1000)/500", "m % 1000 / 500"],
        "3": ["(m % 500) / 100", "(m%500)/100", "(m % 1000 % 500) / 100"],
        "4": ["(m % 100) / 10", "(m%100)/10", "(m % 1000 % 500 % 100) / 10"]
      },
      answer: "(1) m / 1000, (2) (m % 1000) / 500, (3) (m % 500) / 100, (4) (m % 100) / 10",
      aliases: [
        "m / 1000, (m % 1000) / 500, (m % 500) / 100, (m % 100) / 10",
        "m/1000, (m%1000)/500, (m%500)/100, (m%100)/10"
      ],
      explanation: "화폐 거스름돈 계산 로직:\n1. 1000원: m / 1000 = 4 (몫)\n2. 500원: (m % 1000) / 500 = 620 / 500 = 1\n3. 100원: (m % 500) / 100 = 120 / 100 = 1\n4. 10원: (m % 100) / 10 = 20 / 10 = 2",
      trapPoint: "큰 단위 화폐로 나눈 나머지를 구한 후 다음 단위 화폐로 나누는 `/` 와 `%` 연산자의 조합입니다."
    },
    {
      id: 3,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오. (단, 입력값은 홍길동, 김철수, 박영희 순서로 주어진다.)",
      code: `#include <stdio.h>
#include <stdlib.h>

char n[30];

char* test() {
    printf("입력하세요 : ");
    gets(n);
    return n;
}

int main() {
    char* test1;
    char* test2;
    char* test3;

    test1 = test();
    test2 = test();
    test3 = test();

    printf("%s\\n", test1);
    printf("%s\\n", test2);
    printf("%s", test3);

    return 0;
}`,
      answer: "박영희 박영희 박영희",
      aliases: ["박영희 박영희 박영희", "박영희, 박영희, 박영희", "박영희\n박영희\n박영희"],
      explanation: "1. char n[30]은 전역 변수로 단 하나의 메모리 공간에 할당되어 있습니다.\n2. test() 함수는 매번 전역 배열 n의 시작 주소를 반환합니다.\n3. test1, test2, test3 포인터는 모두 동일한 전역 배열 n의 주소를 가리킵니다.\n4. 마지막 입력값 \"박영희\"가 배열 n에 덮어써지므로, test1, test2, test3 모두 \"박영희\"를 가리키게 되어 3번 연속 \"박영희\"가 출력됩니다.",
      trapPoint: "test1, test2, test3가 각자 다른 문자열을 저장하는 것이 아니라 단 하나의 전역 변수 메모리 주소를 공유하므로 마지막 입력값으로 모두 덮어써집니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 [학생] 테이블에 데이터를 삽입하기 위한 표준 SQL INSERT 문을 작성하시오. (단, 문자열은 작은따옴표를 사용하고 세미콜론은 생략 가능)",
      passage: `[학생 테이블 스키마]
CREATE TABLE 학생 (
  학번 int,
  이름 varchar(20),
  학년 int,
  전공 varchar(30),
  전화번호 varchar(20)
);

[삽입할 데이터]
- 학번: 9830287
- 이름: 뉴진스
- 학년: 3
- 전공: 경영학개론
- 전화번호: 010-1234-1234`,
      answer: "INSERT INTO 학생(학번, 이름, 학년, 전공, 전화번호) VALUES(9830287, '뉴진스', 3, '경영학개론', '010-1234-1234');",
      aliases: [
        "INSERT INTO 학생(학번, 이름, 학년, 전공, 전화번호) VALUES(9830287, '뉴진스', 3, '경영학개론', '010-1234-1234');",
        "INSERT INTO 학생(학번, 이름, 학년, 전공, 전화번호) VALUES(9830287, '뉴진스', 3, '경영학개론', '010-1234-1234')",
        "INSERT INTO 학생 VALUES(9830287, '뉴진스', 3, '경영학개론', '010-1234-1234');",
        "INSERT INTO 학생 VALUES(9830287, '뉴진스', 3, '경영학개론', '010-1234-1234')",
        "insert into 학생 values (9830287, '뉴진스', 3, '경영학개론', '010-1234-1234');"
      ],
      explanation: "테이블에 새로운 레코드를 삽입하는 SQL DML 구문:\n`INSERT INTO 테이블명(컬럼1, 컬럼2, ...) VALUES (값1, 값2, ...);`",
      trapPoint: "숫자 데이터(9830287, 3)는 따옴표 없이 입력하고, 문자열('뉴진스', '경영학개론', '010-1234-1234')은 작은따옴표로 감싸야 합니다."
    },
    {
      id: 5,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void main() {
    int n[3] = {73, 95, 82};
    int sum = 0;

    for (int i = 0; i < 3; i++) {
        sum += n[i];
    }

    switch (sum / 30) {
        case 10:
        case 9: printf("A");
        case 8: printf("B");
        case 7:
        case 6: printf("C");
        default: printf("D");
    }
}`,
      answer: "BCD",
      aliases: ["BCD", "B C D"],
      explanation: "1. sum = 73 + 95 + 82 = 250\n2. sum / 30 = 250 / 30 = 8 (정수 나눗셈)\n3. switch (8) 평가:\n   - case 8로 점프 -> printf(\"B\") 실행\n   - break 문이 없으므로 아래 case들로 fall-through(계속 실행)됨\n   - case 7, case 6 -> printf(\"C\") 실행\n   - default -> printf(\"D\") 실행\n4. 따라서 \"BCD\"가 연속 출력됩니다.",
      trapPoint: "switch문에 break 문이 전혀 없으므로 case 8부터 끝까지 모두 실행되어 BCD가 출력됩니다."
    },
    {
      id: 6,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 화이트박스 테스트 커버리지를 보기에서 찾아 기호를 쓰시오.",
      passage: `- 프로그램 내에 있는 결정 포인트 내의 모든 각 개별 조건식에 대해 모든 가능한 결과(True/False)가 적어도 한 번은 수행되도록 테스트한다.
- 개별 조건식의 참/거짓 결과가 전체 조건식의 결과(결정)에 영향을 미치지 못할 수 있는 한계점을 갖는다.

[보기]
ㄱ. 구문 커버리지   ㄴ. 경로 커버리지   ㄷ. 조건/결정 커버리지   ㄹ. 변형 조건/결정 커버리지
ㅁ. 다중 조건 커버리지   ㅂ. 결정 커버리지   ㅅ. 조건 커버리지`,
      answer: "ㅅ",
      aliases: ["ㅅ", "조건 커버리지", "조건커버리지", "Condition Coverage"],
      explanation: "조건 커버리지(Condition Coverage)는 전체 결정문 결과와 상관없이, 결정문 내부의 각 '개별 조건식'이 참(True)과 거짓(False)을 적어도 한 번씩 갖도록 테스트하는 기법입니다.",
      trapPoint: "전체 결정문의 참/거짓을 다루는 것은 결정 커버리지(분기 커버리지)이고, 개별 조건식의 참/거짓을 다루는 것은 조건 커버리지입니다."
    },
    {
      id: 7,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int c = 0;
    for (int i = 1; i <= 2023; i++) {
        if (i % 4 == 0) c++;
    }
    printf("%d", c);
    return 0;
}`,
      answer: "505",
      aliases: ["505"],
      explanation: "1부터 2023까지의 정수 중 4의 배수의 개수를 구하는 문제입니다.\n2023 / 4 = 505 (나머지 3).\n따라서 c는 505가 출력됩니다.",
      trapPoint: "2023을 4로 나눈 몫인 505입니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "다음 설명에 해당하는 소프트웨어 보안 및 역공학 방지 기술의 명칭을 쓰시오.",
      passage: `- 소프트웨어가 불법적으로 변조(Unauthorized Modifications)되었을 경우 정상적으로 실행되지 않도록 방지하는 기법이다.
- 프로그램 내부에 변조 검증 코드(Tamper-proofing Code)를 삽입하여 프로그램 위변조 여부를 탐지하고, 변조가 감지되면 즉시 실행을 중단시킨다.
- 전자상거래, 디지털 콘텐츠 보호, 금융 앱 등의 무단 역공학 방지에 활용된다.`,
      answer: "템퍼프루핑",
      aliases: ["템퍼프루핑", "템퍼 프루핑", "tamper proofing", "Tamper Proofing", "Tamper-Proofing"],
      explanation: "템퍼프루핑(Tamper Proofing)은 소프트웨어의 위·변조를 방지하기 위해 프로그램에 변조 감지 코드를 삽입하여, 불법 변조가 감지되면 실행을 중단시키는 기술입니다.",
      trapPoint: "위변조 탐지 및 실행 차단 역공학 방지 기술은 템퍼프루핑(Tamper Proofing)입니다."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 스택(Stack) 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>
#define MAX_SIZE 10

int isWhat[MAX_SIZE];
int point = -1;

int isEmpty() {
    if (point == -1) return 1;
    return 0;
}

void into(int num) {
    if (point >= 10) printf("Full");
    else isWhat[++point] = num;
}

int take() {
    if (isEmpty() == 1) printf("Empty");
    else return isWhat[point--];
    return 0;
}

int main() {
    into(5);
    into(2);

    while (!isEmpty()) {
        printf("%d", take());
        into(4);
        into(1);
        printf("%d", take());
        into(3);
        printf("%d", take());
        printf("%d", take());
        into(6);
        printf("%d", take());
        printf("%d", take());
    }
    return 0;
}`,
      answer: "213465",
      aliases: ["213465"],
      explanation: "스택(LIFO) 동작 추적:\n1. into(5), into(2) -> 스택: [5, 2]\n2. while 루프 1회차:\n   - take() -> 2 팝 및 출력 (남은 스택: [5])\n   - into(4), into(1) -> 스택: [5, 4, 1]\n   - take() -> 1 팝 및 출력 (남은 스택: [5, 4])\n   - into(3) -> 스택: [5, 4, 3]\n   - take() -> 3 팝 및 출력 (남은 스택: [5, 4])\n   - take() -> 4 팝 및 출력 (남은 스택: [5])\n   - into(6) -> 스택: [5, 6]\n   - take() -> 6 팝 및 출력 (남은 스택: [5])\n   - take() -> 5 팝 및 출력 (남은 스택: [])\n3. isEmpty()가 참이 되어 while 종료.\n출력 순서: 2 -> 1 -> 3 -> 4 -> 6 -> 5 = 213465",
      trapPoint: "take()는 LIFO(후입선출) 방식으로 가장 최근에 들어간 요소를 꺼내며, into와 take 순서를 꼼꼼히 추적해야 합니다.",
      traceTable: {
        headers: ["연산", "출력", "스택 상태 (Top은 맨 오른쪽)"],
        rows: [
          ["초기", "-", "[5, 2]"],
          ["take()", "2", "[5]"],
          ["into(4), into(1)", "-", "[5, 4, 1]"],
          ["take()", "1", "[5, 4]"],
          ["into(3)", "-", "[5, 4, 3]"],
          ["take()", "3", "[5, 4]"],
          ["take()", "4", "[5]"],
          ["into(6)", "-", "[5, 6]"],
          ["take()", "6", "[5]"],
          ["take()", "5", "[]"]
        ]
      }
    },
    {
      id: 10,
      category: "데이터베이스",
      prompt: "다음 데이터베이스 설계 5단계를 올바른 순서대로 나열하시오.",
      passage: `[보기: 물리적 설계, 개념적 설계, 구현, 요구조건 분석, 논리적 설계]`,
      answer: "요구조건 분석 -> 개념적 설계 -> 논리적 설계 -> 물리적 설계 -> 구현",
      aliases: [
        "요구조건 분석, 개념적 설계, 논리적 설계, 물리적 설계, 구현",
        "요구조건 분석 -> 개념적 설계 -> 논리적 설계 -> 물리적 설계 -> 구현",
        "요구조건분석, 개념적설계, 논리적설계, 물리적설계, 구현",
        "요구조건분석 -> 개념적설계 -> 논리적설계 -> 물리적설계 -> 구현"
      ],
      explanation: "데이터베이스 설계 5단계 표준 순서:\n1. 요구조건 분석 (Requirements Analysis)\n2. 개념적 설계 (Conceptual Design, ERD 도출)\n3. 논리적 설계 (Logical Design, 정규화, 릴레이션 매핑)\n4. 물리적 설계 (Physical Design, 인덱스/성능/저장구조)\n5. 데이터베이스 구현 (Implementation, DDL 작성)",
      trapPoint: "'개념 -> 논리 -> 물리' 순서(개-논-물)를 정확히 기억해야 합니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 GoF 디자인 패턴을 보기에서 찾아 각각 쓰시오.",
      passage: `( 1 ) 객체의 생성자가 여러 차례 호출되더라도 실제로 생성되는 인스턴스는 단 하나뿐이며, 이후 호출 시 최초 생성된 객체를 반환하는 패턴 (DBCP 등에 사용)
( 2 ) 기존 코드를 변경하지 않고 호스트 객체 구조의 각 원소들에 새로운 연산을 추가하거나 기능을 확장할 수 있도록 분리하는 행위 패턴

[보기]
생성 패턴: Singleton, Factory Method, Builder
구조 패턴: Adapter, Bridge, Decorator
행위 패턴: Observer, Strategy, Visitor`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Singleton", "singleton", "싱글톤", "싱글톤 패턴"],
        "2": ["Visitor", "visitor", "방문자", "방문자 패턴"]
      },
      answer: "(1) Singleton, (2) Visitor",
      aliases: ["Singleton, Visitor", "싱글톤, 방문자", "Singleton Visitor"],
      explanation: "1. Singleton(싱글톤): 단 하나의 인스턴스만 보장하는 생성 패턴.\n2. Visitor(방문자): 데이터 구조와 연산(기능)을 분리하여 객체 구조를 변경하지 않고 새로운 연산을 적용하는 행위 패턴.",
      trapPoint: "단 하나의 인스턴스는 Singleton, 객체 구조를 유지한 채 새로운 기능을 추가/순회하는 패턴은 Visitor입니다."
    },
    {
      id: 12,
      category: "네트워크",
      prompt: "다음 오류 검출 및 제어 기술에 대한 설명에 알맞은 용어를 보기에서 찾아 각각 쓰시오.",
      passage: `( 1 ) 미국의 벨 연구소의 리처드 해밍이 고안한 코드로, 데이터 전송 시 1비트의 오류를 검출하고 스스로 정정할 수 있는 부호
( 2 ) 송신측이 부가적 오류 정정 정보를 함께 전송하여 수신측이 역방향 재전송 없이 스스로 오류를 검출하고 정정하는 방식 (순방향 오류 정정)
( 3 ) 데이터 전송 과정에서 오류가 발생하면 송신측에 재전송(ARQ)을 요청하여 오류를 복구하는 방식 (역방향 오류 정정)
( 4 ) 데이터 전송 시 데이터 비트 외에 1비트의 체크 비트를 추가하여 1의 개수가 짝수(Even) 또는 홀수(Odd)가 되도록 맞춰 1비트 오류를 검출하는 검사
( 5 ) 데이터를 다항식 코드로 나누어 나머지를 체크값(FCS)으로 프레임 끝에 붙여 전송하는 집단 오류 검출 방식

[보기: FEC, BEC, Hamming, CRC, Parity, EAC, PDS]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Hamming", "hamming", "해밍", "해밍코드"],
        "2": ["FEC", "fec"],
        "3": ["BEC", "bec"],
        "4": ["Parity", "parity", "패리티", "패리티 검사"],
        "5": ["CRC", "crc"]
      },
      answer: "(1) Hamming, (2) FEC, (3) BEC, (4) Parity, (5) CRC",
      aliases: [
        "Hamming, FEC, BEC, Parity, CRC",
        "해밍, FEC, BEC, 패리티, CRC"
      ],
      explanation: "1. Hamming Code: 1비트 오류 정정 부호\n2. FEC(Forward Error Correction): 순방향 오류 정정 (스스로 정정)\n3. BEC(Backward Error Correction): 역방향 오류 정정 (재전송 ARQ)\n4. Parity: 패리티 검사 (1의 개수 짝/홀 검사)\n5. CRC(Cyclic Redundancy Check): 순환 중복 검사 (다항식 나눗셈)",
      trapPoint: "스스로 정정은 FEC(Forward), 재전송 요구는 BEC(Backward)입니다."
    },
    {
      id: 13,
      category: "네트워크",
      prompt: "다음 HDLC(High-level Data Link Control) 프로토콜의 프레임 종류 및 통신 모드에 대한 설명에 알맞은 기호를 보기에서 찾아 쓰시오.",
      passage: `( 1 ) 사용자 데이터를 전달하는 역할을 하며, 순서 번호(Seq), 확인 응답 번호(Next), P/F 필드를 갖는 프레임
( 2 ) 사용자 데이터는 전송하지 않고 순서 제어, 에러 제어, 흐름 제어(RR, RNR, REJ 등)의 응답 기능을 수행하는 프레임
( 3 ) 프레임 순서 번호가 없으며, 링크의 설정 및 해제, 비정상 동작 복구 등 링크 제어 기능을 수행하는 프레임
( 4 ) 두 호스트가 모두 혼합국으로 동작하며, 양쪽에서 주국의 허락 없이도 대등하게 명령과 응답을 전송할 수 있는 통신 모드
( 5 ) 주국과 종국으로 나뉘어 있는 불균형 모드로, 종국이 주국의 허가 없이도 데이터를 전송할 수 있는 통신 모드

[보기]
ㄱ. 연결제어   ㄴ. 감독(S) 프레임   ㄷ. 정보(I) 프레임   ㄹ. 양방향 응답
ㅁ. 익명       ㅂ. 비번호(U) 프레임 ㅅ. 릴레이           ㅇ. 동기균형
ㅈ. 동기응답   ㅊ. 비동기 균형(ABM) ㅋ. 비동기 응답(ARM)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ㄷ", "ㄷ. 정보 프레임", "정보 프레임", "I 프레임"],
        "2": ["ㄴ", "ㄴ. 감독 프레임", "감독 프레임", "S 프레임"],
        "3": ["ㅂ", "ㅂ. 비번호 프레임", "비번호 프레임", "U 프레임"],
        "4": ["ㅊ", "ㅊ. 비동기 균형", "비동기 균형", "ABM"],
        "5": ["ㅋ", "ㅋ. 비동기 응답", "비동기 응답", "ARM"]
      },
      answer: "(1) ㄷ, (2) ㄴ, (3) ㅂ, (4) ㅊ, (5) ㅋ",
      aliases: ["ㄷ, ㄴ, ㅂ, ㅊ, ㅋ", "ㄷ ㄴ ㅂ ㅊ ㅋ"],
      explanation: "HDLC 프레임:\n- 정보(I) 프레임: 사용자 데이터 전송\n- 감독(S) 프레임: 오류/흐름 제어\n- 비번호(U) 프레임: 링크 제어\nHDLC 동작 모드:\n- NRM(정규 응답 모드): 주국의 명령이 있어야 종국 전송\n- ARM(비동기 응답 모드): 종국이 주국 허락 없이 전송 가능\n- ABM(비동기 균형 모드): 양쪽이 대등한 혼합국으로 작동",
      trapPoint: "양쪽 모두 혼합국으로 대등한 모드는 비동기 균형 모드(ABM, ㅊ)입니다."
    },
    {
      id: 14,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String str1 = "Programming";
        String str2 = "Programming";
        String str3 = new String("Programming");

        System.out.println(str1 == str2);
        System.out.println(str1 == str3);
        System.out.println(str1.equals(str3));
        System.out.print(str2.equals(str3));
    }
}`,
      answer: "true false true true",
      aliases: ["true false true true", "true, false, true, true", "true\nfalse\ntrue\ntrue"],
      explanation: "1. str1 == str2: 문자열 리터럴 \"Programming\"은 String Constant Pool에 동일한 참조 주소로 캐싱되므로 true.\n2. str1 == str3: new String()은 힙 메모리에 새로운 인스턴스를 생성하므로 주소 비교(==) 결과 false.\n3. str1.equals(str3): 문자열의 실제 내용이 \"Programming\"으로 같으므로 true.\n4. str2.equals(str3): 내용이 같으므로 true.",
      trapPoint: "Java에서 ==는 객체의 참조 주소를 비교하고, equals()는 문자열의 실제 내용을 비교합니다."
    },
    {
      id: 15,
      category: "보안",
      prompt: "다음 암호화 알고리즘 목록을 (1) 대칭키(비밀키) 암호화와 (2) 비대칭키(공개키) 암호화로 각각 분류하여 쓰시오.",
      passage: `[보기]
DES, RSA, AES, ECC, ARIA, SEED

(1) 대칭키(비밀키) 암호화 알고리즘
(2) 비대칭키(공개키) 암호화 알고리즘`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["DES, AES, ARIA, SEED", "DES, AES, SEED, ARIA", "AES, DES, ARIA, SEED"],
        "2": ["RSA, ECC", "ECC, RSA"]
      },
      answer: "대칭키: DES, AES, ARIA, SEED / 비대칭키: RSA, ECC",
      aliases: [
        "대칭키: DES, AES, ARIA, SEED, 비대칭키: RSA, ECC",
        "대칭키: DES, AES, ARIA, SEED / 비대칭키: RSA, ECC"
      ],
      explanation: "- 대칭키(비밀키) 암호화 알고리즘: DES, 3-DES, AES, SEED(한국 KISA), ARIA(한국 국정원), IDEA\n- 비대칭키(공개키) 암호화 알고리즘: RSA, ECC(타원곡선), Diffie-Hellman, ElGamal",
      trapPoint: "RSA와 ECC는 대표적인 소인수분해 및 타원곡선 이산대수 기반 비대칭키(공개키) 암호 알고리즘입니다."
    },
    {
      id: 16,
      category: "데이터베이스",
      prompt: "다음 설명에 해당하는 자료구조 및 알고리즘 기법의 명칭을 쓰시오.",
      passage: `- 임의의 길이를 가진 데이터(Key)를 고정된 길이의 고유한 값(Value)으로 매핑하여 저장하고 검색하는 기법이다.
- 키에 대한 결과값을 인덱스로 사용하여 테이블에 접근하므로 평균적인 탐색 시간 복잡도가 O(1)로 매우 빠르다.
- 동일한 인덱스로 매핑되어 발생하는 충돌(Collision)을 해결하기 위해 체이닝(Chaining)이나 개방 주소법(Open Addressing) 등을 사용한다.`,
      answer: "해시",
      aliases: ["해시", "해싱", "Hash", "hash", "Hashing", "hashing"],
      explanation: "해시(Hash)/해싱(Hashing)은 임의 길이의 데이터를 고정 길이의 해시값으로 변환하여 O(1)의 빠른 검색을 가능하게 하는 기법입니다.",
      trapPoint: "키-값 매핑, 고정 길이 변환, O(1) 검색 시간은 해시(Hash)의 핵심 특징입니다."
    },
    {
      id: 17,
      category: "SQL",
      prompt: "다음 SQL 문에서 학생 뷰를 삭제할 때, 학생 뷰를 참조하는 다른 모든 뷰나 제약 조건까지 연쇄적으로 함께 삭제하기 위한 빈칸의 키워드를 쓰시오.",
      passage: `DROP VIEW 학생 (        );`,
      answer: "CASCADE",
      aliases: ["CASCADE", "cascade"],
      explanation: "DROP 문에서 참조하는 다른 개체까지 연쇄적으로 함께 삭제할 때는 CASCADE 옵션을 사용하며, 반대로 참조하는 개체가 있을 때 삭제를 거부 취소하려면 RESTRICT 옵션을 사용합니다.",
      trapPoint: "연쇄 삭제는 CASCADE, 참조 시 삭제 거부는 RESTRICT입니다."
    },
    {
      id: 18,
      category: "C",
      prompt: "다음 C언어로 작성된 선택 정렬(Selection Sort) 프로그램에서 배열을 오름차순으로 정렬하기 위해 빈칸에 들어갈 알맞은 비교 연산자를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int E[] = {64, 25, 12, 22, 11};
    int n = sizeof(E) / sizeof(E[0]);
    int i = 0;

    do {
        int j = i + 1;
        do {
            if (E[i] (    ) E[j]) {
                int tmp = E[i];
                E[i] = E[j];
                E[j] = tmp;
            }
            j++;
        } while (j < n);
        i++;
    } while (i < n - 1);

    for (int i = 0; i < 5; i++)
        printf("%d ", E[i]);

    return 0;
}`,
      answer: ">",
      aliases: [">"],
      explanation: "선택 정렬에서 오름차순(작은 값이 앞)으로 정렬하려면, 앞쪽의 원소 E[i]가 뒤쪽 원소 E[j]보다 클 때(`E[i] > E[j]`) 두 값을 swap하여 작은 값을 앞쪽으로 이동시킵니다.\n따라서 비교 연산자는 `>`입니다.",
      trapPoint: "오름차순 정렬에서 앞의 값 E[i]가 뒤의 값 E[j]보다 크면(`>`) 자리를 바꾸어야 작은 수가 앞에 오게 됩니다."
    },
    {
      id: 19,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = "engineer information processing"
b = a[:3]
c = a[4:6]
d = a[28:]
e = b + c + d
print(e)`,
      answer: "engneing",
      aliases: ["engneing"],
      explanation: "문자열 슬라이싱:\n- a = \"engineer information processing\"\n- b = a[:3] -> 인덱스 0~2: \"eng\"\n- c = a[4:6] -> 인덱스 4~5: \"ne\"\n- d = a[28:] -> 인덱스 28부터 끝까지 (\"processing\"의 뒷부분): \"ing\"\n- e = \"eng\" + \"ne\" + \"ing\" = \"engneing\"",
      trapPoint: "슬라이싱 `[start:end]`에서 end 인덱스는 포함되지 않으므로 `a[:3]`은 0, 1, 2번째 글자입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "다음 통합 테스트에서 사용되는 테스트 모듈에 대한 설명에 알맞은 용어를 쓰시오.",
      passage: `( 1 ) 하향식(Top-Down) 통합 테스트에서 상위 모듈은 구현되어 있으나 하위 모듈이 아직 개발되지 않았을 때, 상위 모듈의 호출에 임시로 응답을 반환해 주는 가상의 더미 하위 모듈
( 2 ) 상향식(Bottom-Up) 통합 테스트에서 하위 모듈은 구현되어 있으나 이를 제어할 상위 모듈이 아직 개발되지 않았을 때, 하위 모듈에 테스트 데이터를 전달하고 실행을 구동하는 가상의 상위 모듈`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["스텁", "stub", "Stub", "테스트 스텁"],
        "2": ["드라이버", "driver", "Driver", "테스트 드라이버"]
      },
      answer: "(1) 스텁, (2) 드라이버",
      aliases: ["스텁, 드라이버", "스텁 드라이버", "Stub, Driver"],
      explanation: "1. 스텁(Stub): 하향식 테스트 시 미완성된 '하위 모듈'을 대체하는 더미 모듈 (하향식-스텁).\n2. 드라이버(Driver): 상향식 테스트 시 미완성된 '상위 모듈'을 대체하여 입출력을 제어하는 구동 모듈 (상향식-드라이버).",
      trapPoint: "하향식 통합 테스트 = 스텁(하-스), 상향식 통합 테스트 = 드라이버(상-드)로 암기합니다."
    }
  ]
};

