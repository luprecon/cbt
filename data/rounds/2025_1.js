/**
 * 2025년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2025_1"] = {
  id: "2025_1",
  title: "2025년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void reverse(char *str, int len) {
    char *start = str;
    char *end = str + len - 1;
    while (start < end) {
        char temp = *start;
        *start = *end;
        *end = temp;
        start++;
        end--;
    }
}

int main() {
    char s[] = "ENGINEER";
    reverse(s, 8);
    printf("%s", s);
    return 0;
}`,
      answer: "REENIGNE",
      aliases: ["REENIGNE"],
      explanation: "문자열 \"ENGINEER\"의 양 끝 포인터 start와 end를 마주보며 전진/후진시켜 문자를 맞바꾸는 문자열 뒤집기 알고리즘입니다.\n'E' <-> 'R' -> 'R' ... 'E'\n'N' <-> 'E' -> 'E' ... 'N'\n'G' <-> 'E' -> 'E' ... 'G'\n'I' <-> 'N' -> 'N' ... 'I'\n뒤집힌 결과는 \"REENIGNE\"가 됩니다.",
      trapPoint: "start < end까지 교환되므로 정확히 역순으로 뒤집힙니다.",
      traceTable: {
        headers: ["반복", "*start 교환 전", "*end 교환 전", "문자열 중간 상태"],
        rows: [
          ["1회", "'E'", "'R'", "R N G I N E E E"],
          ["2회", "'N'", "'E'", "R E G I N E N E"],
          ["3회", "'G'", "'E'", "R E E I N G N E"],
          ["4회", "'I'", "'N'", "R E E N I G N E (완료)"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int a;
    Parent(int a) {
        this.a = a;
    }
}

class Child extends Parent {
    int b;
    Child(int a, int b) {
        super(a);
        this.b = b;
    }
    void print() {
        System.out.println(a + b);
    }
}

public class Main {
    public static void main(String[] args) {
        Child c = new Child(10, 20);
        c.print();
    }
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "super(a)를 통해 부모 클래스의 생성자 `Parent(int a)`를 명시적으로 호출하여 a = 10이 저장되고, this.b = 20이 저장됩니다.\nc.print()에서 a + b = 10 + 20 = 30이 출력됩니다.",
      trapPoint: "자식 생성자에서 super(...)를 통해 부모 멤버를 정상 초기화하는 표준적인 상속 문법입니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def test(val, lst=[]):
    lst.append(val)
    return lst

print(test(1))
print(test(2))`,
      answer: "[1, 2]",
      aliases: ["[1, 2]", "[1,2]", "[1]\n[1, 2]", "[1], [1, 2]"],
      explanation: "파이썬에서 가변 객체(리스트)를 기본 매개변수(default parameter)로 사용할 경우 함수 정의 시점에 단 한 번만 생성되어 모든 호출 간에 공유됩니다.\n1. test(1) 호출 시 lst에 1이 추가되어 [1]이 되고 출력됩니다.\n2. test(2) 호출 시 동일한 lst에 2가 추가되어 [1, 2]가 반환되어 출력됩니다.\n최종 출력(두 번째 줄 기준 또는 전체): [1, 2]",
      trapPoint: "파이썬의 가장 유명한 함정 중 하나인 '가변 기본 매개변수 공유(Mutable Default Argument)' 특성입니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 20; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            sum += i;
        }
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "1부터 20 사이의 정수 중 3의 배수이면서 동시에 5의 배수인 공배수(15의 배수)는 15 하나뿐입니다.\n따라서 sum = 15가 됩니다.",
      trapPoint: "3과 5의 공배수는 최소공배수인 15의 배수임을 이용해 빠르게 계산할 수 있습니다."
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 권한을 회수할 때 사용하는 키워드와 누구로부터 회수하는지 지정하는 절의 키워드를 각각 쓰시오.",
      passage: `(  1  ) SELECT, INSERT ON EMP (  2  ) USER1;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["REVOKE", "revoke"],
        "2": ["FROM", "from"]
      },
      answer: "(1) REVOKE, (2) FROM",
      aliases: ["REVOKE FROM", "REVOKE, FROM", "revoke from"],
      explanation: "DCL에서 권한 부여는 `GRANT 권한 ON 객체 TO 사용자;`, 권한 회수는 `REVOKE 권한 ON 객체 FROM 사용자;`를 사용합니다.",
      trapPoint: "GRANT는 TO와 짝을 이루고, REVOKE는 FROM과 짝을 이룹니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "관계 데이터베이스 정규화 단계 중 제2정규형(2NF)을 만족하기 위해 제거해야 하는 종속성의 명칭을 쓰시오.",
      answer: "부분 함수 종속",
      aliases: ["부분 함수 종속", "부분함수종속", "부분 함수적 종속", "부분함수종속성", "Partial Functional Dependency"],
      explanation: "정규화 단계:\n- 1NF: 도메인이 원자값\n- 2NF: 부분 함수 종속 제거 (완전 함수 종속 만족)\n- 3NF: 이행적 함수 종속 제거\n- BCNF: 모든 결정자가 후보키",
      trapPoint: "2NF는 '부분 함수 종속', 3NF는 '이행 함수 종속' 제거입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        System.out.println(n > 0 ? "Positive" : "Non-positive");
    }
}`,
      answer: "Positive",
      aliases: ["Positive", "positive"],
      explanation: "10 > 0은 참이므로 \"Positive\"가 출력됩니다.",
      trapPoint: "삼항 연산자 평가 결과 문자열 출력 문제입니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "분산 서비스 거부 공격(DDoS)의 유형 중 공격자가 출발지 IP 주소를 피해자의 IP 주소로 위조(IP Spoofing)하여 불특정 다수의 반사 서버로 ICMP Echo Request를 브로드캐스트함으로써 대량의 응답이 피해자에게 집중되게 만드는 공격의 명칭을 쓰시오.",
      answer: "스머핑",
      aliases: ["스머핑", "스머프", "스머프 공격", "Smurfing", "smurfing", "Smurf Attack"],
      explanation: "스머핑(Smurfing)은 ICMP 패킷의 출발지 IP를 피해자 IP로 변조하여 다이렉트 브로드캐스트 망으로 전송함으로써 다수의 호스트가 피해자에게 동시에 응답(Echo Reply)을 보내 다운시키는 DDoS 증폭 공격입니다.",
      trapPoint: "출발지 IP 변조 + ICMP Echo 브로드캐스트 = 스머핑(Smurfing)."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 7;
    int b = 3;
    printf("%d", a % b * 2);
    return 0;
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "산술 연산자 중 나머지(%)와 곱셈(*)은 우선순위가 동일하므로 좌측에서 우측으로 결합합니다.\n1. 7 % 3 = 1\n2. 1 * 2 = 2\n따라서 2가 출력됩니다.",
      trapPoint: "동일한 우선순위의 연산자 결합 방향(좌->우)을 따릅니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "디자인 패턴 중 기존 클래스의 인터페이스가 클라이언트가 요구하는 인터페이스와 호환되지 않을 때, 중간에서 인터페이스를 변환하여 함께 동작할 수 있도록 해주는 구조(Structural) 패턴의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "어댑터",
      aliases: ["어댑터", "어댑터 패턴", "어답터", "Adapter", "Adapter Pattern", "adapter"],
      explanation: "어댑터(Adapter) 패턴은 일종의 220V-110V 돼지코 변환기처럼 서로 다른 인터페이스를 가진 두 객체가 함께 작동할 수 있도록 감싸서 중개해 주는 구조 패턴입니다.",
      trapPoint: "인터페이스 호환 및 변환 = 어댑터(Adapter) 패턴."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `nums = [1, 2, 3, 4]
res = list(map(lambda x: x ** 2, nums))
print(sum(res))`,
      answer: "30",
      aliases: ["30"],
      explanation: "map과 lambda를 통해 nums의 각 원소를 제곱합니다: [1, 4, 9, 16].\nsum(res)는 이들의 총합이므로 1 + 4 + 9 + 16 = 30이 됩니다.",
      trapPoint: "1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30 입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "데이터베이스 트랜잭션의 연산 중 트랜잭션의 처리가 성공적으로 완료되어 데이터베이스의 일관성 있는 상태를 영구히 반영시키는 명령어를 쓰시오.",
      answer: "COMMIT",
      aliases: ["COMMIT", "commit", "커밋"],
      explanation: "COMMIT 명령어는 트랜잭션이 성공적으로 끝났음을 선언하고 갱신된 내용을 DB에 영구 반영합니다 (실패 시 취소는 ROLLBACK).",
      trapPoint: "완료 및 영구 반영은 COMMIT, 취소 및 원상복구는 ROLLBACK입니다."
    },
    {
      id: 13,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[4] = {10, 20, 30, 40};
    int *p = arr;
    p += 2;
    printf("%d", *p);
    return 0;
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "p가 arr[0]을 가리키는 상태에서 p += 2를 수행하면 p는 arr[2]의 주소를 가리키게 됩니다.\n역참조 *p는 arr[2]의 값이므로 30이 출력됩니다.",
      trapPoint: "포인터 덧셈에서 p += 2는 2개 요소만큼 뒤로 이동합니다."
    },
    {
      id: 14,
      category: "단답형",
      prompt: "소프트웨어 형상 관리(SCM) 도구 중 리눅스 토발즈가 개발하였으며, 중앙 서버 없이 각 개발자가 전체 저장소 복사본을 로컬에 보유하는 대표적인 분산 버전 관리 시스템의 명칭을 쓰시오.",
      answer: "Git",
      aliases: ["Git", "git", "깃"],
      explanation: "Git은 분산 버전 관리 시스템(DVCS)으로 SVN이나 CVS와 같은 중앙 집중식과 달리 로컬 저장소에서 브랜치 생성, 커밋 등의 작업을 독립적으로 수행할 수 있습니다.",
      trapPoint: "중앙 집중식이 아닌 '분산' 버전 관리 시스템의 대표격은 Git입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        System.out.println(x << 2);
    }
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "왼쪽 시프트 연산자(<<)는 비트를 왼쪽으로 이동시키며 1회 이동 시마다 2배씩 증가합니다.\n5 << 2 = 5 * 2^2 = 5 * 4 = 20.\n출력: 20",
      trapPoint: "x << n 은 x * 2^n 과 같습니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "네트워크 통신에서 전송 계층의 TCP와 UDP의 가장 핵심적인 차이점으로, TCP는 연결 지향적이고 신뢰성을 보장하기 위해 패킷 송수신 전 맺는 연결 수립 과정의 명칭(영문 또는 한글)을 쓰시오.",
      answer: "3-Way Handshake",
      aliases: ["3-Way Handshake", "3-way handshake", "3웨이 핸드셰이크", "3방향 핸드셰이크", "3 way handshake"],
      explanation: "TCP는 신뢰성 있는 연결을 위해 SYN, SYN+ACK, ACK의 3단계를 거치는 3-Way Handshake를 통해 세션을 수립합니다.",
      trapPoint: "연결 수립은 3-Way Handshake, 연결 종료는 4-Way Handshake입니다."
    },
    {
      id: 17,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 1;
    switch(a) {
        case 1: printf("A");
        case 2: printf("B"); break;
        case 3: printf("C");
        default: printf("D");
    }
    return 0;
}`,
      answer: "AB",
      aliases: ["AB", "A B"],
      explanation: "a가 1이므로 case 1로 진입하여 \"A\"를 출력합니다.\ncase 1에 break문이 없으므로 아래 case 2로 계속 진행(Fall-through)하여 \"B\"를 출력하고 break를 만나 탈출합니다.\n따라서 \"AB\"가 출력됩니다.",
      trapPoint: "switch-case문에서 break가 누락되었을 때의 Fall-through 동작을 놓치지 마세요.",
      traceTable: {
        headers: ["단계", "분기", "실행 내용", "누적 출력"],
        rows: [
          ["진입", "case 1:", "printf('A'); break 없음", "A"],
          ["폴스루", "case 2:", "printf('B'); break 탈출", "AB"]
        ]
      }
    },
    {
      id: 18,
      category: "단답형",
      prompt: "소프트웨어 테스팅 검증 기준(Test Coverage) 중 프로그램의 제어 흐름 그래프 상에서 나타날 수 있는 모든 결정문(조건문)의 True와 False 분기를 적어도 한 번씩 수행하도록 보장하는 화이트박스 테스트 커버리지의 명칭을 쓰시오.",
      answer: "분기 커버리지",
      aliases: ["분기 커버리지", "분기커버리지", "결정 커버리지", "결정커버리지", "Branch Coverage", "Decision Coverage"],
      explanation: "분기 커버리지(Branch Coverage, 결정 커버리지)는 조건문의 전체 결과가 참(True)과 거짓(False)이 되는 모든 경우를 적어도 한 번 이상 테스트하는 검증 기준입니다.",
      trapPoint: "구문 커버리지(모든 문장 1회), 분기 커버리지(결정문의 참/거짓 1회), 조건 커버리지(개별 조건식의 참/거짓 1회)의 차이점을 숙지하세요."
    },
    {
      id: 19,
      category: "SQL",
      prompt: "다음 [GRADE] 테이블에서 점수(SCORE)가 90 이상인 학생들의 이름(NAME)을 중복 없이 조회하는 SQL 문의 빈칸을 쓰시오.",
      passage: `SELECT (        ) NAME FROM GRADE WHERE SCORE >= 90;`,
      answer: "DISTINCT",
      aliases: ["DISTINCT", "distinct"],
      explanation: "조회 결과에서 중복된 행을 제거하고 고유한 값만 출력하기 위해 SELECT 절 바로 뒤에 DISTINCT 키워드를 사용합니다.",
      trapPoint: "중복 제거 키워드는 DISTINCT입니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "침해 사고 분석 및 보안 분야에서 컴퓨터나 모바일 기기, 네트워크 등 디지털 기기에 저장된 전자적 증거를 사법 절차에 사용할 수 있도록 과학적이고 체계적으로 수집, 분석, 보존하는 일련의 수사 기법을 일컫는 용어의 명칭을 쓰시오.",
      answer: "디지털 포렌식",
      aliases: ["디지털 포렌식", "디지털포렌식", "포렌식", "Digital Forensics", "forensics"],
      explanation: "디지털 포렌식(Digital Forensics)은 전자적 증거물의 무결성, 정당성, 연계보관성(Chain of Custody)을 유지하며 증거를 분석하는 기법입니다.",
      trapPoint: "디지털 증거 수집 및 분석 기술 = 디지털 포렌식."
    }
  ]
};
