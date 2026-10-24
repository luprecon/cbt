/**
 * 2023년 제3회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2023_3"] = {
  id: "2023_3",
  title: "2023년 제3회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class A {
    public void paint() {
        System.out.print("A");
        draw();
    }
    public void draw() {
        System.out.print("B");
        draw();
    }
}

class B extends A {
    public void paint() {
        super.draw();
        System.out.print("C");
        this.draw();
    }
    public void draw() {
        System.out.print("D");
    }
}

public class Main {
    public static void main(String[] args) {
        A b = new B();
        b.paint();
        b.draw();
    }
}`,
      answer: "BDCDD",
      aliases: ["BDCDD"],
      explanation: "다형성 및 동적 바인딩 추적:\n1. `A b = new B();` 로 인스턴스 B 생성.\n2. `b.paint();` 호출 -> 오버라이딩된 B의 paint() 실행:\n   - `super.draw()`: A의 draw() 호출 -> \"B\" 출력 후, 내부의 `draw()`는 동적 바인딩에 의해 실제 인스턴스인 B의 draw()가 호출되어 \"D\" 출력.\n   - `System.out.print(\"C\")`: \"C\" 출력.\n   - `this.draw()`: B의 draw() 호출 -> \"D\" 출력.\n   - (paint 결과: BDCD)\n3. `b.draw();` 호출 -> B의 draw() 호출 -> \"D\" 출력.\n4. 최종 누적 출력: \"BDCDD\"",
      trapPoint: "부모 클래스 A의 draw() 내부에서 다시 draw()를 호출할 때, 실제 객체 타입이 B이므로 오버라이딩된 B의 draw()가 실행됩니다."
    },
    {
      id: 2,
      category: "보안",
      prompt: "다음 설명에 해당하는 인증 및 인가 프로토콜을 보기에서 찾아 기호(또는 명칭)를 쓰시오.",
      passage: `- 사용자가 사용자 이름과 암호와 같은 자격 증명을 직접 공유하지 않고도 타사 애플리케이션이 리소스에 접근할 수 있도록 권한을 부여하는 인터넷 표준 인가 프로토콜이다.
- 액세스 토큰(Access Token)을 발급하여 타사 애플리케이션이 사용자를 대신해 데이터에 접근하도록 한다.
- Google, Facebook, Twitter, GitHub 등 소셜 로그인 기능에 널리 활용된다.

[보기]
ㄱ. NFT   ㄴ. JWT   ㄷ. SAML   ㄹ. AccessToken   ㅁ. SSO
ㅂ. OIDC  ㅅ. Authentication   ㅇ. OAuth   ㅈ. Cookie   ㅊ. Refresh Token`,
      answer: "ㅇ",
      aliases: ["ㅇ", "OAuth", "oauth", "OAuth 2.0", "OAuth2.0"],
      explanation: "OAuth(Open Authorization)는 사용자의 비밀번호 노출 없이 접근 권한을 위임하기 위해 액세스 토큰(Access Token)을 발급하는 표준 인증/인가 프로토콜입니다.",
      trapPoint: "자격 증명을 공유하지 않고 Access Token을 발급받아 타사 리소스에 접근 권한을 위임하는 프로토콜은 OAuth입니다."
    },
    {
      id: 3,
      category: "운영체제",
      prompt: "Linux 환경에서 test.txt 파일에 대해 소유자에게는 읽기/쓰기/실행 권한을, 그룹에게는 읽기/실행 권한을, 기타 사용자에게는 실행 권한만을 부여하고자 한다. 빈칸에 들어갈 명령어와 8진수 권한 숫자를 순서대로 쓰시오.",
      passage: `(     1     ) (     2     ) test.txt`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["chmod", "CHMOD"],
        "2": ["751", "751"]
      },
      answer: "(1) chmod, (2) 751",
      aliases: ["(1) chmod, (2) 751", "chmod, 751", "chmod 751"],
      explanation: "1. 파일의 접근 권한을 변경하는 리눅스 명령어는 `chmod`입니다.\n2. 8진수 권한 계산:\n   - r(읽기)=4, w(쓰기)=2, x(실행)=1\n   - 소유자: r+w+x = 4 + 2 + 1 = 7\n   - 그룹: r+x = 4 + 1 = 5\n   - 기타: x = 1\n   따라서 8진수 권한은 `751`입니다.",
      trapPoint: "소유자=7, 그룹=5, 기타=1로 순서대로 나열하여 751입니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int test(int n) {
    int i, sum = 0;
    for (i = 1; i <= n / 2; i++) {
        if (n % i == 0) sum += i;
    }
    if (n == sum) return 1;
    return 0;
}

int main() {
    int i, sum = 0;
    for (i = 2; i <= 100; i++) {
        if (test(i)) sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "34",
      aliases: ["34"],
      explanation: "test(n) 함수는 자신을 제외한 약수들의 합이 자기 자신과 같은 '완전수(Perfect Number)'인지를 판별합니다.\n2부터 100 사이의 완전수는 6과 28 두 개입니다.\n- 6의 진약수: 1, 2, 3 -> 합 = 6 (완전수)\n- 28의 진약수: 1, 2, 4, 7, 14 -> 합 = 28 (완전수)\n따라서 sum = 6 + 28 = 34가 출력됩니다.",
      trapPoint: "100 이하의 완전수는 6과 28뿐이므로, 그 합은 6 + 28 = 34입니다."
    },
    {
      id: 5,
      category: "C",
      prompt: "다음 C언어 코드에서 구조체 포인터 변수 d2를 통해 멤버 numPtr에 접근하기 위해 빈칸에 공통으로 들어갈 연산자 기호를 쓰시오.",
      code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Data {
    char c;
    int *numPtr;
} Data;

int main() {
    int num = 10;
    Data d1;
    Data *d2 = malloc(sizeof(struct Data));

    d1.numPtr = &num;
    d2(   )numPtr = &num;

    printf("%d\\n", *d1.numPtr);
    printf("%d\\n", *d2(   )numPtr);

    free(d2);
    return 0;
}`,
      answer: "->",
      aliases: ["->"],
      explanation: "일반 구조체 변수(d1)는 점(.) 연산자로 멤버에 접근하지만, 구조체 포인터 변수(d2)는 화살표(`->`) 연산자를 사용하여 멤버에 접근합니다.\n`d2->numPtr`",
      trapPoint: "구조체 포인터 변수의 멤버 참조 연산자는 `->` (하이픈 + 오른쪽 꺾쇠)입니다."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "다음 테이블 T1과 T2에 대해 UNION 연산 쿼리를 실행한 결과를 내림차순 정렬된 숫자 순서대로 쓰시오.",
      passage: `[테이블 T1]
| A |
| --- |
| 3 |
| 1 |
| 4 |

[테이블 T2]
| A |
| --- |
| 2 |
| 4 |
| 3 |

[쿼리]
SELECT A FROM T1
UNION
SELECT A FROM T2
ORDER BY A DESC;`,
      answer: "4 3 2 1",
      aliases: ["4 3 2 1", "4, 3, 2, 1", "4\n3\n2\n1", "4,3,2,1"],
      explanation: "1. UNION 연산은 합집합을 구하면서 중복된 값을 자동으로 제거합니다.\n- T1: {3, 1, 4}\n- T2: {2, 4, 3}\n- 합집합(중복 제거): {1, 2, 3, 4}\n2. ORDER BY A DESC로 내림차순 정렬하므로 결과는 4, 3, 2, 1 순서로 출력됩니다.",
      trapPoint: "UNION은 중복을 제거하므로 3과 4가 한 번씩만 포함됩니다. (UNION ALL인 경우 중복 유지)."
    },
    {
      id: 7,
      category: "보안",
      prompt: "다음 서버 접근 통제 정책의 유형에 해당하는 영문 약어를 각각 쓰시오.",
      passage: `( 1 ) 주체와 객체의 보안 등급을 비교하여 시스템이 접근 권한을 결정하는 규칙 기반(Rule-Based) 접근통제 정책
( 2 ) 사용자의 직무나 조직 내 맡은 역할(Role)에 기초하여 권한을 부여하고 접근을 제어하는 방식
( 3 ) 데이터 소유자(사용자)가 신분에 따라 객체에 대한 접근 권한을 임의로 설정하는 신분 기반(Identity-Based) 접근통제 정책`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["MAC", "mac"],
        "2": ["RBAC", "rbac"],
        "3": ["DAC", "dac"]
      },
      answer: "(1) MAC, (2) RBAC, (3) DAC",
      aliases: ["MAC, RBAC, DAC", "MAC RBAC DAC"],
      explanation: "1. MAC(Mandatory Access Control, 강제적 접근 통제): 관리자/시스템이 보안 레이블 기반 통제\n2. RBAC(Role-Based Access Control, 역할 기반 접근 통제): 직무/역할 기반 통제\n3. DAC(Discretionary Access Control, 임의적 접근 통제): 소유자가 권한 부여",
      trapPoint: "보안 등급 기반 = MAC, 역할 기반 = RBAC, 소유자 기반 = DAC입니다."
    },
    {
      id: 8,
      category: "C",
      prompt: "다음 C언어로 작성된 재귀 함수 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    else return n * f(n - 1);
}

int main() {
    printf("%d", f(7));
    return 0;
}`,
      answer: "5040",
      aliases: ["5040"],
      explanation: "팩토리얼(Factorial) 7!을 계산하는 재귀 함수입니다.\n7! = 7 * 6 * 5 * 4 * 3 * 2 * 1\n= 7 * 720 = 5040이 출력됩니다.",
      trapPoint: "f(7) = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040입니다."
    },
    {
      id: 9,
      category: "네트워크",
      prompt: "다음 설명에 해당하는 광대역 통신망 전송 기술의 영문 약어를 쓰시오.",
      passage: `- 고정 길이 53바이트(헤더 5바이트 + 페이로드 48바이트)의 셀(Cell) 단위로 데이터를 전송하는 방식이다.
- 회선 교환의 실시간성과 패킷 교환의 유연성을 결합한 비동기식 전송 모드이다.
- B-ISDN의 핵심 기술로 사용되었다.`,
      answer: "ATM",
      aliases: ["ATM", "atm", "Asynchronous Transfer Mode"],
      explanation: "ATM(Asynchronous Transfer Mode, 비동기 전송 방식)은 53바이트의 고정 길이 셀을 사용하여 고속 데이터 전송을 제공하는 통신 기술입니다.",
      trapPoint: "53바이트 고정 크기 셀 단위 전송 프로토콜은 ATM입니다."
    },
    {
      id: 10,
      category: "C",
      prompt: "다음 C언어 포인터 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char* p = "KOREA";
    printf("%s\\n", p);
    printf("%s\\n", p + 1);
    printf("%c\\n", *p);
    printf("%c\\n", *(p + 3));
    printf("%c\\n", *p + 4);
    return 0;
}`,
      answer: "KOREA OREA K E O",
      aliases: [
        "KOREA OREA K E O",
        "KOREA, OREA, K, E, O",
        "KOREA\nOREA\nK\nE\nO"
      ],
      explanation: "1. printf(\"%s\\n\", p): p가 가리키는 시작부터 전체 문자열 -> \"KOREA\"\n2. printf(\"%s\\n\", p + 1): 1번 인덱스부터 문자열 -> \"OREA\"\n3. printf(\"%c\\n\", *p): p가 가리키는 첫 글자 -> 'K'\n4. printf(\"%c\\n\", *(p + 3)): 3번 인덱스 글자 -> 'E'\n5. printf(\"%c\\n\", *p + 4): 'K'의 아스키 코드에 4를 더한 문자 -> 'K'(75) + 4 = 79 ('O')\n따라서 KOREA / OREA / K / E / O 가 순서대로 출력됩니다.",
      trapPoint: "*p + 4는 *(p + 4)가 아니라, 첫 번째 문자 'K'의 아스키 코드값에 4를 더한 것이므로 K->L->M->N->O가 되어 'O'가 출력됩니다."
    },
    {
      id: 11,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 2);
    }
}

class Child extends Parent {
    int compute(int num) {
        if (num <= 1) return num;
        return compute(num - 1) + compute(num - 3);
    }
}

public class Main {
    public static void main(String args[]) {
        Parent obj = new Child();
        System.out.print(obj.compute(7));
    }
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "Child 인스턴스가 생성되었고 compute 메소드가 오버라이딩되어 있으므로 Child의 compute(7)이 호출됩니다.\nChild의 compute(n) = compute(n-1) + compute(n-3):\n- compute(0) = 0, compute(1) = 1\n- compute(2) = compute(1) + compute(-1) = 1 + (-1) = 0\n- compute(3) = compute(2) + compute(0) = 0 + 0 = 0\n- compute(4) = compute(3) + compute(1) = 0 + 1 = 1\n- compute(5) = compute(4) + compute(2) = 1 + 0 = 1\n- compute(6) = compute(5) + compute(3) = 1 + 0 = 1\n- compute(7) = compute(6) + compute(4) = 1 + 1 = 2\n따라서 최종 출력은 2입니다.",
      trapPoint: "부모 클래스의 피보나치(n-1 + n-2)가 아니라 오버라이딩된 자식 클래스의 (n-1 + n-3) 수식이 적용됩니다."
    },
    {
      id: 12,
      category: "네트워크",
      prompt: "내부 사설 IP 주소를 외부 공인 IP 주소로 변환하여 라우터를 통해 통신하도록 지원하는 네트워크 주소 변환 기술의 영문 약어를 쓰시오.",
      answer: "NAT",
      aliases: ["NAT", "nat", "Network Address Translation"],
      explanation: "NAT(Network Address Translation, 네트워크 주소 변환)는 한정된 공인 IPv4 주소를 절약하고 내부망 보안을 강화하기 위해 사설 IP와 공인 IP를 상호 변환해 주는 기술입니다.",
      trapPoint: "사설 IP <-> 공인 IP 변환 기술은 NAT입니다."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 코드에서 컴파일 에러가 발생하는 코드 라인 번호를 숫자로 쓰시오.",
      code: `1: class Person {
2:     private String name;
3:     public Person(String val) {
4:         name = val;
5:     }
6:     public static String get() {
7:         return name;
8:     }
9:     public void print() {
10:        System.out.println(name);
11:    }
12: }
13: public class Main {
14:    public static void main(String[] args) {
15:        Person obj = new Person("Kim");
16:        obj.print();
17:    }
18: }`,
      answer: "7",
      aliases: ["7", "7번", "7행", "라인 7", "Line 7"],
      explanation: "7번 라인의 `return name;`에서 static(정적) 메소드인 `get()`은 인스턴스가 생성되기 전에 클래스 로딩 시점에 메모리에 올라가므로, 인스턴스 멤버 변수인 `name`에 직접 접근할 수 없어 컴파일 에러가 발생합니다.",
      trapPoint: "static 메소드 내에서는 인스턴스 변수(non-static)를 직접 참조할 수 없습니다."
    },
    {
      id: 14,
      category: "Python",
      prompt: "다음 Python 코드에서 공백으로 구분된 문자열을 분리하여 여러 변수에 저장하기 위해 빈칸에 들어갈 메소드명을 쓰시오.",
      code: `num1, num2 = input().______()
num1 = int(num1)
num2 = int(num2)
num3 = num1 + num2
print(num1, "+", num2, "=", num3)`,
      answer: "split",
      aliases: ["split", "split()"],
      explanation: "파이썬에서 한 줄로 입력된 문자열을 공백(기본 구분자)을 기준으로 나누어 리스트로 반환하는 메소드는 `split()`입니다.",
      trapPoint: "문자열 분리 메소드는 split입니다."
    },
    {
      id: 15,
      category: "소프트웨어공학",
      prompt: "UML 다이어그램 중 여러 모델 요소(클래스 등)들을 그룹화하여 시스템의 논리적 구조를 패키지 단위로 표현하는 다이어그램의 명칭을 쓰시오.",
      answer: "패키지 다이어그램",
      aliases: ["패키지 다이어그램", "패키지다이어그램", "Package Diagram", "패키지"],
      explanation: "패키지 다이어그램(Package Diagram)은 시스템의 서로 관련된 모델 요소들을 폴더 형태의 패키지 단위로 그룹화하고 패키지 간의 의존 관계를 표현하는 구조적 다이어그램입니다.",
      trapPoint: "요소들을 그룹화하여 표현하는 구조 다이어그램은 패키지 다이어그램입니다."
    },
    {
      id: 16,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 블랙박스 테스트 기법을 보기에서 찾아 기호를 쓰시오.",
      passage: `- 소프트웨어 프로그램의 입력 조건들을 유효한 값과 유효하지 않은 값의 그룹(동등 클래스)으로 나누어, 각 그룹에서 대표값을 하나씩 선택하여 테스트 케이스를 설계하는 기법이다.
- 같은 그룹의 모든 입력값은 시스템에 의해 동일하게 취급될 것이라는 가정에 기반한다.

[보기]
ㄱ. Equivalence Partitioning   ㄴ. Statement Coverage   ㄷ. Boundary Value Analysis
ㄹ. Branch Coverage            ㅁ. Error Guessing       ㅂ. Condition Coverage`,
      answer: "ㄱ",
      aliases: ["ㄱ", "Equivalence Partitioning", "동등분할", "동치분할", "동등 분할"],
      explanation: "동등 분할(Equivalence Partitioning, 동치 분할)은 입력 영역을 여러 개의 동등 클래스로 나누고 각 클래스의 대표값을 테스트 케이스로 선정하는 대표적인 블랙박스 테스트 기법입니다.",
      trapPoint: "대표값을 그룹별로 추출하여 테스트하는 기법은 동등 분할(Equivalence Partitioning, ㄱ)입니다."
    },
    {
      id: 17,
      category: "소프트웨어공학",
      prompt: "다음 클라우드 서비스 모델의 설명에 알맞은 영문 약어를 각각 쓰시오.",
      passage: `( 1 ) 가상 서버, 네트워크, 스토리지 등 순수 하드웨어 IT 인프라 자원을 서비스 형태로 제공하는 모델 (AWS EC2 등)
( 2 ) 개발자가 애플리케이션을 개발하고 실행할 수 있도록 실행 환경 및 개발 플랫폼(OS, 런타임, DB)을 제공하는 모델
( 3 ) 최종 사용자가 별도의 설치 없이 웹 브라우저를 통해 완전한 소프트웨어를 이용할 수 있도록 제공하는 서비스 모델 (구글 Docs 등)`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["IaaS", "iaas"],
        "2": ["PaaS", "paas"],
        "3": ["SaaS", "saas"]
      },
      answer: "(1) IaaS, (2) PaaS, (3) SaaS",
      aliases: ["IaaS, PaaS, SaaS", "IaaS PaaS SaaS"],
      explanation: "클라우드 3대 서비스 모델:\n1. IaaS(Infrastructure as a Service): 서버, 저장소 등 인프라 제공\n2. PaaS(Platform as a Service): 애플리케이션 개발/실행 플랫폼 제공\n3. SaaS(Software as a Service): 완성된 소프트웨어 애플리케이션 제공",
      trapPoint: "인프라=IaaS, 플랫폼=PaaS, 소프트웨어=SaaS입니다."
    },
    {
      id: 18,
      category: "네트워크",
      prompt: "다음 설명에 해당하는 거리 벡터(Distance Vector) 라우팅 프로토콜의 약어를 쓰시오.",
      passage: `- 최단 경로를 선택하기 위해 홉 수(Hop Count)를 거리 척도로 사용하는 대표적인 내부 라우팅 프로토콜(IGP)이다.
- 벨만-포드(Bellman-Ford) 알고리즘을 기반으로 동작한다.
- 최대 홉 수가 15로 제한되어 있어 소규모 네트워크에 적합하다.`,
      answer: "RIP",
      aliases: ["RIP", "rip", "Routing Information Protocol"],
      explanation: "RIP(Routing Information Protocol)는 거리 벡터 알고리즘을 사용하며, 홉 카운트를 기준으로 경로를 결정하고 최대 홉 수가 15인 소규모용 IGP 라우팅 프로토콜입니다.",
      trapPoint: "최대 홉 수 15 제한, 거리 벡터 라우팅 프로토콜은 RIP입니다. (다익스트라 링크 상태 프로토콜은 OSPF)."
    },
    {
      id: 19,
      category: "데이터베이스",
      prompt: "다음 순수 관계 연산자의 연산 명칭과 일치하는 관계대수 기호를 보기에서 찾아 각각 쓰시오.",
      passage: `1. Join : (   1   )
2. Project : (   2   )
3. Select : (   3   )
4. Division : (   4   )

[보기: ㄱ. σ   ㄴ. π   ㄷ. ⋈   ㄹ. ÷]`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ㄷ", "⋈"],
        "2": ["ㄴ", "π"],
        "3": ["ㄱ", "σ"],
        "4": ["ㄹ", "÷"]
      },
      answer: "(1) ㄷ, (2) ㄴ, (3) ㄱ, (4) ㄹ",
      aliases: ["ㄷ, ㄴ, ㄱ, ㄹ", "ㄷ ㄴ ㄱ ㄹ", "(1) ㄷ, (2) ㄴ, (3) ㄱ, (4) ㄹ"],
      explanation: "순수 관계대수 기호:\n- Select(행 추출): 시그마 σ (ㄱ)\n- Project(열 추출): 파이 π (ㄴ)\n- Join(조인): 보타이 ⋈ (ㄷ)\n- Division(나누기): 나누기 ÷ (ㄹ)",
      trapPoint: "Select는 σ(시그마), Project는 π(파이), Join은 ⋈입니다."
    },
    {
      id: 20,
      category: "데이터베이스",
      prompt: "관계 데이터베이스에서 두 테이블 간의 관계에서 외래 키 값은 참조하는 부모 테이블의 기본 키 값과 동일하거나 NULL이어야 한다는 제약 조건을 무슨 무결성이라고 하는지 쓰시오.",
      answer: "참조 무결성",
      aliases: ["참조 무결성", "참조무결성", "참조", "Referential Integrity"],
      explanation: "참조 무결성(Referential Integrity)은 외래 키(Foreign Key) 값이 참조하는 테이블의 기본 키(Primary Key) 값과 반드시 일치하거나, 정의에 따라 NULL이어야 함을 보장하는 제약 조건입니다.",
      trapPoint: "기본키가 NULL이나 중복이 안 되는 것은 개체 무결성, 외래키와 기본키의 일치성은 참조 무결성입니다."
    }
  ]
};

