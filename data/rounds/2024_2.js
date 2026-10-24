/**
 * 2024년 제2회 정보처리기사 실기 기출 복원 (12.1% 합격률 세트)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2024_2"] = {
  id: "2024_2",
  title: "2024년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    unsigned char a = 0x55; // 01010101
    unsigned char b = 0xAA; // 10101010
    unsigned char c = (a & 0x0F) | (b & 0xF0);
    printf("%X", c);
    return 0;
}`,
      answer: "A5",
      aliases: ["A5", "0xA5", "a5"],
      explanation: "1. a = 0x55: 0x55 & 0x0F = 0x05 (하위 4비트 마스킹: 0101)\n2. b = 0xAA: 0xAA & 0xF0 = 0xA0 (상위 4비트 마스킹: 1010 0000)\n3. c = 0x05 | 0xA0 = 0xA5 (1010 0101)\n4. printf(\"%X\", c)는 16진수 대문자로 출력하므로 'A5'가 출력됩니다.",
      trapPoint: "비트 마스킹 연산과 16진수 출력 포맷(%X)에 주의해야 합니다.",
      traceTable: {
        headers: ["연산식", "2진수 비트", "16진수 값"],
        rows: [
          ["a & 0x0F", "0000 0101", "0x05"],
          ["b & 0xF0", "1010 0000", "0xA0"],
          ["c = 0x05 | 0xA0", "1010 0101", "0xA5"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int x = 100;
    void msg() {
        System.out.print("P" + x);
    }
}

class Child extends Parent {
    int x = 200;
    void msg() {
        System.out.print("C" + x);
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.print(p.x + " ");
        p.msg();
    }
}`,
      answer: "100 C200",
      aliases: ["100 C200", "100, C200", "100,C200"],
      explanation: "1. 멤버 변수 접근(p.x): 자바에서 인스턴스 변수는 다형성(오버라이딩)이 적용되지 않고 '참조 변수의 타입(Parent)'을 따릅니다. 따라서 p.x는 Parent의 x인 100이 출력됩니다.\n2. 메서드 호출(p.msg()): 인스턴스 메서드는 동적 바인딩에 의해 '실제 생성된 인스턴스 타입(Child)'의 오버라이딩 메서드가 실행됩니다. 따라서 Child의 msg()가 실행되어 \"C200\"이 출력됩니다.\n최종 출력: 100 C200",
      trapPoint: "멤버 변수는 선언된 타입 기준(정적 바인딩), 메서드는 실제 객체 기준(동적 바인딩)으로 동작합니다.",
      traceTable: {
        headers: ["표현식", "바인딩 종류", "참조 기준", "결과"],
        rows: [
          ["p.x", "정적 바인딩 (컴파일 타입)", "Parent.x", "100"],
          ["p.msg()", "동적 바인딩 (런타임 타입)", "Child.msg()", "C200"]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
trans = [[row[i] for row in matrix] for i in range(3)]
print(trans[1])`,
      answer: "[2, 5, 8]",
      aliases: ["[2, 5, 8]", "[2,5,8]", "2, 5, 8"],
      explanation: "이중 리스트 컴프리헨션을 이용한 전치행렬(Transpose) 연산입니다.\ni = 1일 때, [row[1] for row in matrix]는 각 행(row)의 1번 인덱스 원소를 추출합니다.\n- [1, 2, 3]에서 2\n- [4, 5, 6]에서 5\n- [7, 8, 9]에서 8\n따라서 trans[1]은 [2, 5, 8]이 됩니다.",
      trapPoint: "열(column)을 행(row)으로 바꾸는 2차원 리스트 전치 알고리즘입니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10, b = 20, c = 30;
    int *arr[3] = {&a, &b, &c};
    *arr[1] += 5;
    printf("%d", b);
    return 0;
}`,
      answer: "25",
      aliases: ["25"],
      explanation: "arr은 int형 포인터들을 저장하는 포인터 배열(int *arr[3])입니다.\narr[1]은 변수 b의 주소(&b)를 가집니다.\n*arr[1] += 5는 변수 b의 값에 5를 더하는 것이므로 b는 20 + 5 = 25가 됩니다.",
      trapPoint: "포인터 배열의 각 원소가 가리키는 실제 변수의 값이 수정됩니다."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "IP 주소 210.100.50.0/24 네트워크를 서브넷 마스크 255.255.255.224로 서브넷팅할 때 생성되는 서브넷의 총 개수를 숫자로 쓰시오.",
      answer: "8",
      aliases: ["8", "8개"],
      explanation: "1. 기존 네트워크는 /24 (서브넷 마스크: 255.255.255.0)입니다.\n2. 새 서브넷 마스크의 마지막 옥텟은 224이며, 이는 2진수로 11100000(2)입니다.\n3. 추가로 빌려온 서브넷 비트 수가 3비트이므로 생성되는 서브넷의 수는 2^3 = 8개입니다.",
      trapPoint: "빌려온 서브넷 비트 n = 3이므로 서브넷 개수는 2^n = 8개입니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "보안 공격 기법 중 통신선에 몰래 도청 장치를 설치하거나 네트워크 패킷을 무단으로 엿듣는 수동적 공격(Passive Attack)의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "스니핑",
      aliases: ["스니핑", "Sniffing", "sniffing"],
      explanation: "스니핑(Sniffing)은 네트워크 상을 지나가는 패킷을 수동적으로 엿듣고 가로채어 비밀번호, 계정 정보 등을 탈취하는 도청 행위입니다.",
      trapPoint: "내용을 훔쳐보는 도청은 스니핑(Sniffing), 신분을 위장하여 속이는 공격은 스푸핑(Spoofing)입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 3;
        int y = 5;
        System.out.println(x & y | 2);
    }
}`,
      answer: "3",
      aliases: ["3"],
      explanation: "1. 연산자 우선순위: 비트 AND(&)가 비트 OR(|)보다 우선순위가 높습니다.\n2. x & y: 3(0011) & 5(0101) = 0001(2) = 1\n3. 1 | 2: 0001 | 0010 = 0011(2) = 3\n출력: 3",
      trapPoint: "& 연산자가 | 연산자보다 먼저 계산된다는 비트 연산자 우선순위를 숙지해야 합니다.",
      traceTable: {
        headers: ["연산 순서", "식", "2진수 비트", "10진수 결과"],
        rows: [
          ["1단계", "3 & 5", "0011 & 0101", "1 (0001)"],
          ["2단계", "1 | 2", "0001 | 0010", "3 (0011)"]
        ]
      }
    },
    {
      id: 8,
      category: "단답형",
      prompt: "데이터베이스 동시성 제어 기법 중 트랜잭션들이 자원에 접근하기 전 잠금(Lock)을 획득하는 단계(확장 단계)와 점유했던 잠금을 해제하는 단계(축소 단계)로 엄격히 구분하여 직렬가능성을 보장하는 규약의 명칭(영문 약어 또는 한글)을 쓰시오.",
      answer: "2단계 로킹 규약",
      aliases: ["2단계 로킹 규약", "2단계 로킹", "2단계로킹규약", "2PL", "Two-Phase Locking"],
      explanation: "2단계 로킹 규약(2PL, Two-Phase Locking)은 확장 단계(Growing Phase, 잠금 획득만 가능)와 축소 단계(Shrinking Phase, 잠금 해제만 가능)를 거쳐 직렬성을 보장하지만 교착상태(Deadlock)는 발생할 수 있습니다.",
      trapPoint: "확장 단계와 축소 단계로 나뉘는 규약 = 2단계 로킹 규약(2PL)."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int f(int n) {
    if (n <= 0) return 0;
    return n % 10 + f(n / 10);
}

int main() {
    printf("%d", f(456));
    return 0;
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "각 자릿수를 재귀적으로 더하는 함수입니다.\nf(456) = 6 + f(45)\nf(45) = 5 + f(4)\nf(4) = 4 + f(0)\nf(0) = 0\n합계 = 6 + 5 + 4 + 0 = 15 입니다.",
      trapPoint: "자릿수 합을 구하는 재귀 호출입니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "개방형 시스템 상호 연결(OSI) 7계층 중 물리 계층의 오류 제어와 흐름 제어를 담당하며, 인접한 두 시스템 간의 신뢰성 있는 전송을 위해 전송 단위를 프레임(Frame)으로 처리하는 2계층의 명칭을 쓰시오.",
      answer: "데이터 링크 계층",
      aliases: ["데이터 링크 계층", "데이터링크 계층", "데이터링크계층", "Data Link Layer", "2계층"],
      explanation: "데이터 링크 계층(Data Link Layer)은 MAC 주소를 이용해 노드 간 프레임 전송, 에러 검출(CRC), 흐름 제어를 담당하며 스위치, 브리지가 대표 장비입니다.",
      trapPoint: "전송 단위가 '프레임(Frame)'이고 MAC 주소를 사용하는 계층은 2계층(데이터링크 계층)입니다."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3]
b = [x * 2 for x in a if x != 2]
print(b)`,
      answer: "[2, 6]",
      aliases: ["[2, 6]", "[2,6]", "2, 6"],
      explanation: "x가 2가 아닌 원소는 1과 3입니다.\n각각 x * 2를 수행하므로 1*2=2, 3*2=6이 되어 [2, 6]이 됩니다.",
      trapPoint: "조건식 x != 2에 의해 2는 제외됩니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "보안 취약점 중 소프트웨어 개발자가 시스템 점검이나 유지보수의 편의를 위해 정상적인 인증 절차를 우회하여 시스템에 접근할 수 있도록 몰래 만들어 둔 비밀 통로의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "백도어",
      aliases: ["백도어", "트랩도어", "Backdoor", "Trapdoor", "backdoor"],
      explanation: "백도어(Backdoor, 트랩도어)는 보안 인증 절차를 우회하여 시스템 관리자 권한을 획득할 수 있도록 고의로 숨겨둔 통로입니다.",
      trapPoint: "비밀 통로 = 백도어(Backdoor) 또는 트랩도어(Trapdoor)."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] a = {5, 4, 3, 2, 1};
        int count = 0;
        for (int i = 0; i < a.length - 1; i++) {
            if (a[i] > a[i + 1]) {
                int temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                count++;
            }
        }
        System.out.println(count);
    }
}`,
      answer: "4",
      aliases: ["4"],
      explanation: "배열 {5, 4, 3, 2, 1}에 대해 버블 정렬의 1회전(Pass 1)을 수행합니다.\n- i=0: 5 > 4 (교환 1회) -> {4, 5, 3, 2, 1}\n- i=1: 5 > 3 (교환 2회) -> {4, 3, 5, 2, 1}\n- i=2: 5 > 2 (교환 3회) -> {4, 3, 2, 5, 1}\n- i=3: 5 > 1 (교환 4회) -> {4, 3, 2, 1, 5}\n총 교환 횟수 count = 4 입니다.",
      trapPoint: "최대값 5가 맨 뒤로 이동하면서 인접 원소와 총 4번 연속 교환됩니다.",
      traceTable: {
        headers: ["i", "비교 (a[i] > a[i+1])", "교환 여부", "배열 상태", "count"],
        rows: [
          ["0", "5 > 4", "교환 (1회)", "{4, 5, 3, 2, 1}", "1"],
          ["1", "5 > 3", "교환 (2회)", "{4, 3, 5, 2, 1}", "2"],
          ["2", "5 > 2", "교환 (3회)", "{4, 3, 2, 5, 1}", "3"],
          ["3", "5 > 1", "교환 (4회)", "{4, 3, 2, 1, 5}", "4"]
        ]
      }
    },
    {
      id: 14,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 집계 함수 중 평균값을 구하는 함수의 이름을 쓰시오.",
      code: `SELECT (        )(SCORE) FROM EXAM;`,
      answer: "AVG",
      aliases: ["AVG", "avg"],
      explanation: "SQL에서 평균을 계산하는 표준 집계 함수는 AVG()입니다.",
      trapPoint: "AVERAGE가 아니라 3글자 AVG()입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int x = 1;
    int y = (x++) + (++x);
    printf("%d %d", x, y);
    return 0;
}`,
      answer: "3 4",
      aliases: ["3 4", "3, 4", "3,4"],
      explanation: "1. (x++)는 현재 x값인 1로 평가된 후 x가 2로 증가합니다.\n2. (++x)는 x(2)가 먼저 3으로 증가된 후 3으로 평가됩니다.\n3. y = 1 + 3 = 4가 됩니다.\n4. 최종 x는 3입니다.\n출력: 3 4",
      trapPoint: "단일 수식 내에서 전위/후위 증감자가 순서대로 평가되는 과정입니다.",
      traceTable: {
        headers: ["연산 단계", "평가 값", "x의 변화"],
        rows: [
          ["x++", "1", "x: 1 -> 2"],
          ["++x", "3", "x: 2 -> 3"],
          ["y = 1 + 3", "y = 4", "x = 3"]
        ]
      }
    },
    {
      id: 16,
      category: "단답형",
      prompt: "GoF 디자인 패턴 중 한 객체가 다른 복잡한 서브시스템 클래스들의 복합적인 인터페이스를 단순화하여 클라이언트에게 고수준의 단일 통합 인터페이스를 제공하는 구조 패턴의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "퍼사드",
      aliases: ["퍼사드", "퍼사드 패턴", "Facade", "facade", "Facade Pattern"],
      explanation: "퍼사드(Facade) 패턴은 건물의 정면 외벽처럼 복잡한 내부 서브시스템의 복잡도를 감추고 단일 진입점 인터페이스를 제공하여 사용 편의성을 높이는 구조 패턴입니다.",
      trapPoint: "복잡한 서브시스템을 단순화된 단일 창구로 래핑 = 퍼사드(Facade) 패턴."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `def outer():
    x = 10
    def inner():
        nonlocal x
        x += 5
    inner()
    return x

print(outer())`,
      answer: "15",
      aliases: ["15"],
      explanation: "nonlocal 키워드는 inner 함수 내에서 전역 변수가 아닌 바깥쪽 지역 변수(outer의 x)를 참조하고 수정하겠음을 선언합니다.\n따라서 x += 5로 outer의 x가 15로 변경되어 15가 반환됩니다.",
      trapPoint: "파이썬 클로저에서 바깥 함수의 지역 변수를 수정할 때 사용하는 nonlocal 키워드입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 두 모듈이 전역 변수(Global Variable)와 같이 공통된 데이터 영역을 함께 공유하여 참조하고 갱신할 때 발생하는 결합도의 명칭을 쓰시오.",
      answer: "공통 결합도",
      aliases: ["공통 결합도", "공통결합도", "Common Coupling", "common coupling"],
      explanation: "공통 결합도(Common Coupling)는 여러 모듈이 전역 데이터 영역을 함께 사용할 때 발생하며, 전역 변수 변경 시 연관 모듈 전체에 파급 효과를 미칩니다.",
      trapPoint: "전역 변수 공유 = 공통 결합도(Common Coupling)."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    printf("%d", 1[arr]);
    return 0;
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "C언어에서 `arr[1]`은 `*(arr + 1)`과 같으며, 덧셈의 교환법칙에 의해 `*(1 + arr)`과도 같고, 이는 `1[arr]`과 완전히 동일합니다!\n따라서 arr[1]의 값인 20이 정상 출력됩니다.",
      trapPoint: "C언어 문법의 대표적인 포인터 트릭: a[i] == *(a+i) == *(i+a) == i[a] 입니다!",
      traceTable: {
        headers: ["표현식", "포인터 역참조 식", "값"],
        rows: [
          ["1[arr]", "*(1 + arr) = *(arr + 1) = arr[1]", "20"]
        ]
      }
    },
    {
      id: 20,
      category: "단답형",
      prompt: "해시 함수(Hash Function)의 충돌 저항성과 관련하여, 어떤 입력값 x에 대해 해시값 H(x) = H(y)를 만족하는 서로 다른 y를 찾아내는 것이 계산적으로 불가능해야 한다는 보안 특성의 명칭을 쓰시오.",
      answer: "제2 역상 저항성",
      aliases: ["제2 역상 저항성", "제2역상저항성", "제2 역상 저항성(Second Preimage Resistance)", "약한 충돌 저항성", "약한 충돌회피성"],
      explanation: "암호학적 해시 함수의 성질:\n1. 역상 저항성(Preimage Resistance): 주어진 해시값 h에 대해 H(x) = h인 x를 찾기 어려움\n2. 제2 역상 저항성(Second Preimage Resistance, 약한 충돌 저항성): 주어진 x에 대해 H(x) = H(y)인 y(x!=y)를 찾기 어려움\n3. 충돌 저항성(Collision Resistance, 강한 충돌 저항성): H(x) = H(y)인 임의의 쌍 (x, y)를 찾기 어려움",
      trapPoint: "주어진 x에 대해 동일한 해시값을 갖는 y를 찾는 것은 '제2 역상 저항성'입니다."
    }
  ]
};
