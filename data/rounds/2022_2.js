/**
 * 2022년 제2회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2022_2"] = {
  id: "2022_2",
  title: "2022년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "데이터베이스",
      prompt: "다음 설명에 해당하는 관계 데이터 모델의 연산 표현 방식을 쓰시오.",
      passage: `- 관계 데이터의 연산을 표현하는 방법으로, 원하는 정보를 정의할 때 계산 수식을 사용한다.
- 수학의 술어 해석(Predicate Calculus)에 기반을 두고 있으며, 관계 데이터 모델의 창시자인 E.F. Codd 박사가 제안하였다.
- 원하는 정보가 무엇(What)인지만 정의하고 어떻게(How) 유도하는지는 명시하지 않는 비절차적 특성을 갖는다.
- 튜플 단위와 도메인 단위의 두 가지 형태로 나뉜다.`,
      answer: "관계해석",
      aliases: ["관계해석", "관계 해석", "Relational Calculus"],
      explanation: "관계해석(Relational Calculus)은 원하는 정보가 무엇인지 비절차적으로 기술하는 방법이며, 절차적으로 어떻게 유도하는지 기술하는 것은 관계대수(Relational Algebra)입니다.",
      trapPoint: "비절차적 연산은 관계해석, 절차적 연산은 관계대수입니다."
    },
    {
      id: 2,
      category: "보안",
      prompt: "다음 설명에 해당하는 대칭키 암호화 알고리즘의 명칭을 각각 쓰시오.",
      passage: `( 1 ) 1990년 라이(Lai)와 매시(Massey)가 개발한 PES를 개선하여 1991년에 제작된 128비트 키, 64비트 블록 암호 알고리즘으로 스위스 연방공과대학에서 발표되었다.
( 2 ) 미국 NSA(국가안보국)에서 개발한 음성 암호화 칩(Clipper Chip)에 내장된 대칭키 블록 암호화 알고리즘으로, 64비트 블록에 80비트 키를 사용한다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["IDEA", "idea"],
        "2": ["SKIPJACK", "skipjack", "Skipjack", "스킵잭"]
      },
      answer: "(1) IDEA, (2) SKIPJACK",
      aliases: ["IDEA, SKIPJACK", "IDEA, 스킵잭", "IDEA 스킵잭"],
      explanation: "1. IDEA: 스위스에서 개발된 128비트 키, 64비트 블록 암호화 알고리즘.\n2. SKIPJACK: 미국 NSA에서 클리퍼 칩(Clipper Chip)에 탑재하기 위해 개발한 80비트 키 대칭 암호화 알고리즘.",
      trapPoint: "Clipper Chip에 내장된 알고리즘은 SKIPJACK입니다."
    },
    {
      id: 3,
      category: "SQL",
      prompt: "다음 [제품] 테이블에서 제조사가 'H'인 모든 제품들의 단가보다 더 큰 단가를 가진 제품을 조회하고자 한다. 빈칸에 들어갈 알맞은 SQL 다중행 비교 연산자를 쓰시오.",
      passage: `SELECT 제조사, 제품명, 단가
FROM 제품
WHERE 단가 > (     ) (SELECT 단가 FROM 제품 WHERE 제조사 = 'H');`,
      answer: "ALL",
      aliases: ["ALL", "all"],
      explanation: "서브쿼리 결과의 '모든' 값보다 커야 하므로 `ALL` 연산자를 사용합니다. (ANY나 SOME은 만족하는 값이 '하나라도' 있으면 참이 됨).",
      trapPoint: "모든 값보다 커야 하므로(최댓값보다 큼) ALL을 사용합니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 [TABLE]에 대해 SQL 쿼리를 실행한 결과(출력되는 카운트 숫자)를 쓰시오.",
      passage: `[TABLE]
| col1 | col2 |
| --- | --- |
| 1 | 2 |
| 2 | 3 |
| 3 | 4 |
| 4 | 5 |
| 5 | 5 |

[쿼리]
SELECT COUNT(col2)
FROM TABLE
WHERE col1 IN (2, 3) OR col2 IN (3, 5);`,
      answer: "4",
      aliases: ["4"],
      explanation: "WHERE 조건 검사:\n- 1행: col1=1, col2=2 -> 거짓\n- 2행: col1=2 (참) OR col2=3 (참) -> 포함\n- 3행: col1=3 (참) -> 포함\n- 4행: col2=5 (참) -> 포함\n- 5행: col2=5 (참) -> 포함\n조건을 만족하는 행은 2, 3, 4, 5행으로 총 4건입니다.\nCOUNT(col2)의 결과는 4입니다.",
      trapPoint: "OR 조건이므로 col1이 2 또는 3이거나, col2가 3 또는 5인 튜플 4개가 모두 카운트됩니다."
    },
    {
      id: 5,
      category: "네트워크",
      prompt: "공용 인터넷망을 마치 전용 사설망처럼 이용하여 안전하게 통신할 수 있도록 터널링과 암호화 기술을 적용한 가상 사설망의 영문 약어를 쓰시오.",
      answer: "VPN",
      aliases: ["VPN", "vpn", "Virtual Private Network"],
      explanation: "VPN(Virtual Private Network, 가상 사설망)은 공중 네트워크를 통해 사설 네트워크의 보안 연결을 구성하는 기술입니다.",
      trapPoint: "가상 사설 네트워크의 약자는 VPN입니다."
    },
    {
      id: 6,
      category: "소프트웨어공학",
      prompt: "객체지향 설계의 5대 원칙(SOLID) 중 '클라이언트는 자신이 사용하지 않는 메소드에 의존하지 않아야 한다'는 인터페이스 분리 원칙의 영문 약어를 쓰시오.",
      answer: "ISP",
      aliases: ["ISP", "isp", "Interface Segregation Principle"],
      explanation: "SOLID 원칙:\n- S: 단일 책임 원칙 (SRP)\n- O: 개방 폐쇄 원칙 (OCP)\n- L: 리스코프 치환 원칙 (LSP)\n- I: 인터페이스 분리 원칙 (ISP)\n- D: 의존 역전 원칙 (DIP)",
      trapPoint: "인터페이스 분리 원칙의 약자는 ISP입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String args[]) {
        int i = 3;
        int k = 1;

        switch(i) {
            case 1: k += 1;
            case 2: k++;
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
      explanation: "switch문 fall-through 연산:\n1. i = 3이므로 case 3으로 점프\n2. case 3: k = 0\n3. break가 없으므로 아래 case 계속 실행:\n   - case 4: k = 0 + 3 = 3\n   - case 5: k = 3 - 10 = -7\n   - default: k = -7 - 1 = -8\n4. 최종 k = -8이 출력됩니다.",
      trapPoint: "case 3부터 시작하여 break 문을 만나지 못하므로 default까지 연속 계산되어 최종 결과는 -8이 됩니다."
    },
    {
      id: 8,
      category: "C",
      prompt: "다음 C/C++ 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

struct A {
    int n;
    int g;
};

int main() {
    struct A a[2];
    for (int i = 0; i < 2; i++) {
        a[i].n = i;
        a[i].g = i + 1;
    }
    printf("%d", a[0].n + a[1].g);
    return 0;
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "구조체 배열 연산:\n- i = 0: a[0].n = 0, a[0].g = 1\n- i = 1: a[1].n = 1, a[1].g = 2\n`a[0].n + a[1].g` = 0 + 2 = 2가 출력됩니다.",
      trapPoint: "a[0].n은 0이고, a[1].g는 1 + 1 = 2이므로 0 + 2 = 2입니다."
    },
    {
      id: 9,
      category: "네트워크",
      prompt: "IP 주소가 139.127.19.132이고 서브넷 마스크가 255.255.255.192일 때, 다음 물음에 10진수로 답하시오.",
      passage: `( 1 ) 해당 호스트가 속한 네트워크 주소: 139.127.19.(      )
( 2 ) 해당 네트워크에서 네트워크 주소와 브로드캐스트 주소를 제외하고 실제 호스트에 할당 가능한 IP 주소의 개수`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["128", "128"],
        "2": ["62", "62"]
      },
      answer: "(1) 128, (2) 62",
      aliases: ["(1) 128, (2) 62", "128, 62", "128 62"],
      explanation: "서브넷 마스크 255.255.255.192(/26) 계산:\n1. 192 = 11000000(2) -> 서브넷 블록 크기 = 256 - 192 = 64\n   - 서브넷 구간: 0~63, 64~127, 128~191, 192~255\n   - 132는 세 번째 서브넷 128~191에 포함되므로 네트워크 주소는 `139.127.19.128` (1)\n2. 호스트 비트는 6비트(2^6 = 64개)\n   - 네트워크 주소(128)와 브로드캐스트 주소(191) 2개를 제외하면 실제 할당 가능 호스트 수는 64 - 2 = 62개 (2).",
      trapPoint: "호스트 수 계산 시 네트워크 대표 주소와 브로드캐스트 주소 2개를 반드시 제외해야 합니다."
    },
    {
      id: 10,
      category: "소프트웨어공학",
      prompt: "인수 테스트(Acceptance Test)의 유형 중 다음 설명에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 선발된 잠재 고객(사용자)으로 하여금 실제 운영 환경에서 일정 기간 무료로 사용하게 하여 오류를 발견하고 보완하는 검사로, 공식 출시 전 최종 실시하는 테스트
( 2 ) 개발자의 통제된 환경에서 사용자가 개발자 앞에서 직접 행하는 테스트로, 오류를 개발자가 즉시 기록하고 확인하는 초기 검사`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["베타 테스트", "베타", "Beta Test", "beta"],
        "2": ["알파 테스트", "알파", "Alpha Test", "alpha"]
      },
      answer: "(1) 베타 테스트, (2) 알파 테스트",
      aliases: [
        "베타 테스트, 알파 테스트",
        "베타, 알파",
        "Beta, Alpha",
        "베타테스트, 알파테스트"
      ],
      explanation: "인수 테스트의 2대 사용자 테스트:\n1. 알파 테스트(Alpha Test): 개발자의 장소(통제된 환경)에서 수행하는 테스트.\n2. 베타 테스트(Beta Test): 사용자의 실제 환경(통제되지 않은 환경)에서 다수의 사용자가 수행하는 테스트.",
      trapPoint: "개발자 환경 = 알파 테스트, 실제 사용자 환경 = 베타 테스트입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "소프트웨어의 오류를 수정하거나 기능을 변경한 후, 그 수정으로 인해 이미 정상 작동하던 다른 부분에 새로운 결함이 발생하지 않았는지 검증하기 위해 기존 테스트 케이스를 재실행하는 테스트 기법의 명칭을 쓰시오.",
      answer: "회귀 테스트",
      aliases: ["회귀 테스트", "회귀테스트", "Regression", "Regression Test", "회귀"],
      explanation: "회귀 테스트(Regression Test)는 코드 변경이나 버그 수정 후 시스템에 사이드 이펙트(부작용)나 새로운 결함이 생기지 않았음을 확인하기 위해 수행하는 반복 테스트입니다.",
      trapPoint: "수정 후 기존 기능의 정상 동작 여부를 재시험하는 것은 회귀(Regression) 테스트입니다."
    },
    {
      id: 12,
      category: "데이터베이스",
      prompt: "다음 [employee] 테이블에서 관계대수 연산 π TTL (employee) 을 수행했을 때 추출되는 직급(TTL) 결과 집합을 쓰시오. (중복을 제거하여 나열)",
      passage: `[employee 테이블]
| ID | NAME | TTL |
| --- | --- | --- |
| 101 | 김철수 | 부장 |
| 102 | 이영희 | 대리 |
| 103 | 박민수 | 과장 |
| 104 | 최동수 | 부장 |
| 105 | 정지훈 | 차장 |
| 106 | 한미나 | 대리 |`,
      answer: "부장, 대리, 과장, 차장",
      aliases: [
        "부장, 대리, 과장, 차장",
        "부장 대리 과장 차장",
        "부장, 과장, 차장, 대리"
      ],
      explanation: "관계대수의 Project 연산(π)은 특정 속성(열)만을 추출하는 연산으로, 집합 이론에 기반하므로 중복된 튜플은 자동으로 제거됩니다.\nTTL 열의 값 {'부장', '대리', '과장', '차장'} 4개가 추출됩니다.",
      trapPoint: "관계대수 연산 결과는 수학적 집합이므로 중복된 튜플(부장, 대리 중복)이 제거됩니다."
    },
    {
      id: 13,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = "REMEMBER NOVEMBER"
b = a[:3] + a[12:16]
c = "R AND %s" % "STR"
print(b + c)`,
      answer: "REMEMBER AND STR",
      aliases: ["REMEMBER AND STR", "REMEMBERAND STR"],
      explanation: "파이썬 문자열 연산:\n- a[:3] -> \"REM\"\n- a[12:16] -> \"EMBE\" (인덱스 12부터 15까지)\n- b = \"REM\" + \"EMBE\" = \"REMEMBE\"\n- c = \"R AND %s\" % \"STR\" = \"R AND STR\"\n- b + c = \"REMEMBE\" + \"R AND STR\" = \"REMEMBER AND STR\"\n출력은 \"REMEMBER AND STR\"입니다.",
      trapPoint: "슬라이싱 인덱스 계산과 문자열 포맷팅 %s 결합으로 최종 단어가 \"REMEMBER AND STR\"이 됩니다."
    },
    {
      id: 14,
      category: "네트워크",
      prompt: "다음 라우팅 프로토콜에 대한 설명에 알맞은 용어(영문 약어)를 각각 쓰시오.",
      passage: `( 1 ) 동일한 자율 시스템(AS, Autonomous System) 내부의 라우터들 간에 라우팅 정보를 교환하는 내부 게이트웨이 프로토콜
( 2 ) 서로 다른 자율 시스템(AS) 간에 라우팅 정보를 교환하는 외부 게이트웨이 프로토콜
( 3 ) 다익스트라(Dijkstra) 최단 경로 알고리즘을 사용하는 대표적인 링크 상태(Link State) 내부 라우팅 프로토콜
( 4 ) 자율 시스템(AS) 간의 라우팅에 사용되며 경로 벡터(Path Vector) 방식을 채택한 현재 인터넷의 핵심 EGP 프로토콜`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["IGP", "igp"],
        "2": ["EGP", "egp"],
        "3": ["OSPF", "ospf"],
        "4": ["BGP", "bgp"]
      },
      answer: "(1) IGP, (2) EGP, (3) OSPF, (4) BGP",
      aliases: ["IGP, EGP, OSPF, BGP", "IGP EGP OSPF BGP"],
      explanation: "1. IGP: 내부 라우팅 프로토콜 (RIP, OSPF)\n2. EGP: 외부 라우팅 프로토콜\n3. OSPF: 다익스트라 기반 링크 상태 IGP\n4. BGP: 경로 벡터 기반 대표적 EGP",
      trapPoint: "내부 게이트웨이는 IGP, 외부 게이트웨이는 EGP, 인터넷 코어 라우팅은 BGP입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int len(char* p);

int main() {
    char* p1 = "2022";
    char* p2 = "202207";

    int a = len(p1);
    int b = len(p2);

    printf("%d", a + b);
    return 0;
}

int len(char* p) {
    int r = 0;
    while (*p != '\\0') {
        p++;
        r++;
    }
    return r;
}`,
      answer: "10",
      aliases: ["10"],
      explanation: "len() 함수는 문자열의 길이(널 문자 전까지의 글자 수)를 계산합니다.\n- len(p1) = 4 (\"2022\")\n- len(p2) = 6 (\"202207\")\n- a + b = 4 + 6 = 10이 출력됩니다.",
      trapPoint: "문자열 포인터 순회를 통한 문자열 길이 측정 함수로 4 + 6 = 10입니다."
    },
    {
      id: 16,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main(int argc, char *argv[]) {
    int a[4] = {0, 2, 4, 8};
    int b[3] = {};
    int i = 1;
    int sum = 0;
    int *p1;

    for (i = 1; i < 4; i++) {
        p1 = a + i;
        b[i - 1] = *p1 - a[i - 1];
        sum = sum + b[i - 1] + a[i];
    }

    printf("%d", sum);
    return 0;
}`,
      answer: "22",
      aliases: ["22"],
      explanation: "루프 단계별 추적:\n- i = 1: p1 = a + 1 -> *p1 = 2; b[0] = 2 - 0 = 2; sum = 0 + 2 + 2 = 4\n- i = 2: p1 = a + 2 -> *p1 = 4; b[1] = 4 - 2 = 2; sum = 4 + 2 + 4 = 10\n- i = 3: p1 = a + 3 -> *p1 = 8; b[2] = 8 - 4 = 4; sum = 10 + 4 + 8 = 22\n최종 출력: 22",
      trapPoint: "배열 원소 간 차이값 b[i-1]과 현재 원소 a[i]가 함께 sum에 누적됩니다.",
      traceTable: {
        headers: ["i", "p1 (*p1)", "a[i-1]", "b[i-1]", "a[i]", "sum 누적"],
        rows: [
          ["1", "a+1 (2)", "0", "2", "2", "4"],
          ["2", "a+2 (4)", "2", "2", "4", "10"],
          ["3", "a+3 (8)", "4", "4", "8", "22"]
        ]
      }
    },
    {
      id: 17,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Conv {
    int a;

    public Conv(int a) {
        this.a = a;
    }

    int func() {
        int b = 1;
        for (int i = 1; i < a; i++) {
            b = a * i + b;
        }
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Conv obj = new Conv(3);
        obj.a = 5;
        int b = obj.func();
        System.out.print(obj.a + b);
    }
}`,
      answer: "61",
      aliases: ["61"],
      explanation: "연산 과정 추적:\n1. 생성자로 3을 넘겼으나 `obj.a = 5;`로 a가 5로 변경됨.\n2. func() 호출:\n   - 초기 b = 1, a = 5\n   - i = 1: b = 5 * 1 + 1 = 6\n   - i = 2: b = 5 * 2 + 6 = 16\n   - i = 3: b = 5 * 3 + 16 = 31\n   - i = 4: b = 5 * 4 + 31 = 51\n   - 반환값: a + b = 5 + 51 = 56\n3. main에서 `obj.a + b` 출력:\n   - 5 + 56 = 61이 출력됩니다.",
      trapPoint: "main에서 obj.a = 5로 변경되었으며, func() 반환값은 56이고 최종 출력은 obj.a(5) + 56 = 61입니다.",
      traceTable: {
        headers: ["i", "연산 식", "b 값"],
        rows: [
          ["초기", "-", "1"],
          ["1", "5 * 1 + 1", "6"],
          ["2", "5 * 2 + 6", "16"],
          ["3", "5 * 3 + 16", "31"],
          ["4", "5 * 4 + 31", "51"],
          ["func 리턴", "a + b = 5 + 51", "56"],
          ["main 출력", "obj.a + b = 5 + 56", "61"]
        ]
      }
    },
    {
      id: 18,
      category: "데이터베이스",
      prompt: "다음 데이터베이스의 함수 종속성(Functional Dependency) 유형에 알맞은 명칭을 각각 쓰시오.",
      passage: `( 1 ) 기본키를 구성하는 모든 속성에 대해 종속되는 관계로, 기본키의 진부분집합에는 종속되지 않는 관계
( 2 ) 기본키가 복합 속성일 때, 기본키의 일부 속성에만 종속되는 관계
( 3 ) X -> Y 이고 Y -> Z 일 때 X -> Z 가 성립하는 삼단논법 형태의 종속 관계`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["완전 함수 종속", "완전함수종속", "Full Functional Dependency", "Full"],
        "2": ["부분 함수 종속", "부분함수종속", "Partial Functional Dependency", "Partial"],
        "3": ["이행적 함수 종속", "이행함수종속", "Transitive Functional Dependency", "Transitive"]
      },
      answer: "(1) 완전 함수 종속, (2) 부분 함수 종속, (3) 이행적 함수 종속",
      aliases: [
        "완전 함수 종속, 부분 함수 종속, 이행적 함수 종속",
        "완전함수종속, 부분함수종속, 이행함수종속",
        "Full, Partial, Transitive"
      ],
      explanation: "정규화의 핵심 함수 종속성:\n1. 완전 함수 종속: 복합 기본키 전체에 종속 (제2정규형은 부분 함수 종속을 제거하여 완전 함수 종속 만족)\n2. 부분 함수 종속: 복합키의 일부분에 종속\n3. 이행적 함수 종속: X->Y, Y->Z -> X->Z (제3정규형은 이행적 함수 종속 제거)",
      trapPoint: "2NF는 부분 함수 종속 제거, 3NF는 이행적 함수 종속 제거입니다."
    },
    {
      id: 19,
      category: "네트워크",
      prompt: "다음 웹 기술에 대한 설명에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 웹 서버와 클라이언트(웹 브라우저) 간에 하이퍼텍스트 문서를 전송하기 위한 기본 통신 규약
( 2 ) 텍스트, 그래픽, 영상 등이 하이퍼링크를 통해 서로 거미줄처럼 연결되어 순서에 구애받지 않고 원하는 정보를 열람할 수 있는 문서 형식
( 3 ) 웹 문서를 작성하기 위해 사용하는 표준 마크업 언어`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["HTTP", "http"],
        "2": ["하이퍼텍스트", "Hypertext", "hypertext"],
        "3": ["HTML", "html"]
      },
      answer: "(1) HTTP, (2) 하이퍼텍스트, (3) HTML",
      aliases: ["HTTP, 하이퍼텍스트, HTML", "HTTP, Hypertext, HTML"],
      explanation: "1. HTTP(HyperText Transfer Protocol): 하이퍼텍스트 전송 프로토콜\n2. Hypertext: 링크를 통해 비선형적으로 연결된 문서 형식\n3. HTML(HyperText Markup Language): 웹 페이지 구조를 만드는 마크업 언어",
      trapPoint: "전송 규약은 HTTP, 문서 형식은 하이퍼텍스트, 마크업 언어는 HTML입니다."
    },
    {
      id: 20,
      category: "소프트웨어공학",
      prompt: "소프트웨어 모듈 구조에서 특정 모듈을 직접 호출하는 상위 모듈의 수를 ( 1 ), 그 모듈이 직접 호출하는 하위 모듈의 수를 ( 2 )이라고 한다. 빈칸에 들어갈 용어를 각각 쓰시오.",
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["Fan-in", "fan-in", "팬인", "Fan in"],
        "2": ["Fan-out", "fan-out", "팬아웃", "Fan out"]
      },
      answer: "(1) Fan-in, (2) Fan-out",
      aliases: ["Fan-in, Fan-out", "팬인, 팬아웃", "Fan-in Fan-out"],
      explanation: "모듈 복잡도 지표:\n- Fan-in(팬인): 해당 모듈로 들어오는 선의 개수 (자신을 호출하는 상위 모듈 수)\n- Fan-out(팬아웃): 해당 모듈에서 나가는 선의 개수 (자신이 호출하는 하위 모듈 수)\n좋은 모듈화 설계는 Fan-in은 높고 Fan-out은 낮게 유지하는 것입니다.",
      trapPoint: "들어오는 것은 Fan-in, 나가는 것은 Fan-out입니다."
    }
  ]
};

