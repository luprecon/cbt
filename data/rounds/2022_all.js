/**
 * 2022년 핵심 기출선 (1~3회 엄선 20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2022_all"] = {
  id: "2022_all",
  title: "2022년 핵심 기출선 (1~3회 엄선)",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10, b = 20, c = 30;
    int *arr[3] = {&a, &b, &c};
    printf("%d", *arr[0] + *arr[2]);
    return 0;
}`,
      answer: "40",
      aliases: ["40"],
      explanation: "*arr[0]은 a의 값 10이고, *arr[2]는 c의 값 30입니다.\n10 + 30 = 40이 출력됩니다.",
      trapPoint: "포인터 배열의 첫 번째와 세 번째 요소 역참조 합산입니다."
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        int y = x++ + ++x;
        System.out.println(y);
    }
}`,
      answer: "12",
      aliases: ["12"],
      explanation: "1. x++: 5로 평가된 후 x는 6이 됨\n2. ++x: x가 먼저 7로 증가된 후 7로 평가됨\n3. y = 5 + 7 = 12\n출력: 12",
      trapPoint: "증감 연산자의 선증가/후증가 평가 순서입니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [10, 20, 30]
b = a.copy()
b[0] = 99
print(a[0], b[0])`,
      answer: "10 99",
      aliases: ["10 99", "10, 99", "10,99"],
      explanation: "copy() 메서드로 얕은 복사를 수행하여 b는 독립된 새 리스트 객체를 참조합니다.\nb[0]을 99로 수정해도 원본 a[0]은 여전히 10입니다.\n출력: 10 99",
      trapPoint: "copy() 메서드는 새 리스트를 생성하므로 원본에 영향을 주지 않습니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 [STUDENT] 테이블에 학번 100, 이름 '홍길동'인 새로운 행을 삽입하는 표준 SQL 문의 빈칸을 채우시오.",
      passage: `INSERT (        ) STUDENT (학번, 이름) VALUES (100, '홍길동');`,
      answer: "INTO",
      aliases: ["INTO", "into"],
      explanation: "데이터 삽입 DML 문법은 `INSERT INTO 테이블명 (...) VALUES (...);` 입니다.",
      trapPoint: "INSERT문에는 반드시 INTO 키워드가 수반됩니다."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "GoF 디자인 패턴 중 객체의 인터페이스나 구현을 분리하여 상호 독립적으로 확장할 수 있도록, 기능 계층과 구현 계층을 연결하는 다리 역할을 하는 구조 패턴의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "브리지",
      aliases: ["브리지", "브릿지", "브리지 패턴", "Bridge", "bridge", "Bridge Pattern"],
      explanation: "브리지(Bridge) 패턴은 구현부에서 추상층을 분리하여 각자 독립적으로 변형할 수 있게 결합도를 낮추는 패턴입니다.",
      trapPoint: "기능 계층과 구현 계층의 독립적 분리 = 브리지(Bridge) 패턴."
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int i = 0, sum = 0;
    do {
        sum += i;
        i += 2;
    } while (i <= 6);
    printf("%d", sum);
    return 0;
}`,
      answer: "12",
      aliases: ["12"],
      explanation: "i는 0, 2, 4, 6까지 증가하며 sum에 누적됩니다.\nsum = 0 + 2 + 4 + 6 = 12.\ni가 8이 되는 순간 i <= 6 거짓으로 루프를 탈출합니다.\n출력: 12",
      trapPoint: "do-while 문에서 i가 6일 때까지 실행되어 12가 됩니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 8;
        System.out.println(a >> 2);
    }
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "오른쪽 시프트 연산자(>>)는 1비트 이동할 때마다 2로 나누어집니다.\n8 >> 2 = 8 / (2^2) = 8 / 4 = 2.\n출력: 2",
      trapPoint: "우측 시프트(>>)는 나눗셈 효과입니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "소프트웨어 응집도(Cohesion) 중 모듈 내의 모든 기능들이 특정 순서에 따라 처리되지만, 앞선 작업의 출력 결과가 다음 작업의 입력 데이터로 직접 사용되는 형태의 높은 응집도의 명칭을 쓰시오.",
      answer: "순차적 응집도",
      aliases: ["순차적 응집도", "순차적응집도", "Sequential Cohesion", "sequential"],
      explanation: "순차적 응집도(Sequential Cohesion)는 한 활동의 출력 데이터를 다음 활동의 입력 데이터로 넘겨받아 사용하는 구조입니다.",
      trapPoint: "앞 작업의 출력이 뒷 작업의 입력 = 순차적 응집도(Sequential Cohesion)."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `tup = (1, 2, 3, 4, 5)
print(tup[1::2])`,
      answer: "(2, 4)",
      aliases: ["(2, 4)", "(2,4)", "2, 4"],
      explanation: "튜플 슬라이싱 [1::2]는 1번 인덱스부터 끝까지 2칸 간격으로 추출합니다.\n인덱스 1(2), 인덱스 3(4).\n출력: (2, 4)",
      trapPoint: "튜플 슬라이싱 결과는 튜플 소괄호 () 형태로 출력됩니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "데이터베이스 정규화 단계 중 제3정규형(3NF)에서 제거해야 하는 함수 종속성의 명칭을 쓰시오 (A -> B 이고 B -> C 일 때 A -> C 가 성립하는 종속성).",
      answer: "이행 함수 종속",
      aliases: ["이행 함수 종속", "이행함수종속", "이행적 함수 종속", "이행적함수종속", "Transitive Functional Dependency"],
      explanation: "이행적 함수 종속(Transitive Functional Dependency)은 X -> Y, Y -> Z 일 때 X -> Z 가 성립하는 관계로, 이를 제거하는 것이 3정규형(3NF)입니다.",
      trapPoint: "X -> Y -> Z 건너뛰기 종속 = 이행 함수 종속."
    },
    {
      id: 11,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    *p = 50;
    *(p + 1) = 60;
    printf("%d %d", arr[0], arr[1]);
    return 0;
}`,
      answer: "50 60",
      aliases: ["50 60", "50, 60", "50,60"],
      explanation: "포인터 역참조로 arr[0]이 50으로 변경되고, arr[1]이 60으로 변경됩니다.\n출력: 50 60",
      trapPoint: "포인터를 통한 배열 요소 직접 수정입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "네트워크에서 브로드캐스트 패킷이 계속해서 복제되어 네트워크 대역폭을 모두 고갈시키고 통신 불능 상태에 빠뜨리는 현상의 명칭을 쓰시오.",
      answer: "브로드캐스트 스톰",
      aliases: ["브로드캐스트 스톰", "브로드캐스트스톰", "Broadcast Storm", "브로드캐스트 폭풍"],
      explanation: "브로드캐스트 스톰(Broadcast Storm)은 루핑(Looping) 구조 등에서 브로드캐스트 프레임이 무한 순환하면서 네트워크를 마비시키는 현상입니다 (STP로 방지).",
      trapPoint: "브로드캐스트 무한 순환 현상 = 브로드캐스트 스톰."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        int temp = a;
        a = b;
        b = temp;
        System.out.println(a + " " + b);
    }
}`,
      answer: "20 10",
      aliases: ["20 10", "20, 10", "20,10"],
      explanation: "temp 변수를 이용한 표준 값 교환(swap)입니다.\na는 20, b는 10이 됩니다.\n출력: 20 10",
      trapPoint: "기본적인 두 변수의 값 교환 로직입니다."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "데이터베이스 테이블에서 전체 컬럼이 아닌 특정 컬럼만을 선택하여 조회하는 관계 대수 연산자의 명칭을 쓰시오.",
      answer: "프로젝트",
      aliases: ["프로젝트", "프로젝션", "Project", "Projection", "π"],
      explanation: "프로젝트(Project, π) 연산자는 릴레이션에서 주어진 속성들의 수직적 부분집합(원하는 컬럼들)을 추출합니다.",
      trapPoint: "수평적 추출(행)은 셀렉트(σ), 수직적 추출(열)은 프로젝트(π)입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int n = 7;
    if (n % 2 == 0) {
        printf("EVEN");
    } else {
        printf("ODD");
    }
    return 0;
}`,
      answer: "ODD",
      aliases: ["ODD", "odd"],
      explanation: "7 % 2 = 1(홀수)이므로 else문이 실행되어 \"ODD\"가 출력됩니다.",
      trapPoint: "홀짝 판별 기본 분기입니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 한 모듈이 다른 모듈 내부의 지역 변수나 코드를 직접 조작하지 않고, 단지 두 모듈이 공통된 파일(디스크 상의 파일 등)을 공유하여 입출력할 때 발생하는 결합도의 명칭을 쓰시오.",
      answer: "외부 결합도",
      aliases: ["외부 결합도", "외부결합도", "External Coupling"],
      explanation: "외부 결합도는 외부 통신 프로토콜, 공유 파일, 장치 인터페이스 등을 공유할 때 발생합니다.",
      trapPoint: "공유 파일 및 장비 공유 = 외부 결합도."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3]
print(a * 2)`,
      answer: "[1, 2, 3, 1, 2, 3]",
      aliases: ["[1, 2, 3, 1, 2, 3]", "[1,2,3,1,2,3]", "1, 2, 3, 1, 2, 3"],
      explanation: "파이썬에서 리스트에 정수를 곱하면(`a * 2`) 리스트의 내용이 n번 반복 복제됩니다.\n[1, 2, 3, 1, 2, 3]이 출력됩니다.",
      trapPoint: "각 원소에 2를 곱하는 것이 아니라 리스트 자체가 2번 반복 복제된다는 점에 유의하세요."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "IP 패킷 헤더에서 패킷이 네트워크 상에서 무한 루프를 돌며 영원히 떠돌아다니는 것을 방지하기 위해, 라우터를 하나 통과(Hop)할 때마다 1씩 감소하여 0이 되면 패킷이 폐기되도록 설정된 필드의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "TTL",
      aliases: ["TTL", "ttl", "Time To Live"],
      explanation: "TTL(Time To Live, 수명)은 패킷이 무한 순환하는 것을 방지하기 위한 카운터 필드입니다.",
      trapPoint: "라우터 통과 시마다 1씩 감소하는 IP 필드 = TTL."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String a = "100";
        String b = "200";
        int sum = Integer.parseInt(a) + Integer.parseInt(b);
        System.out.println(sum);
    }
}`,
      answer: "300",
      aliases: ["300"],
      explanation: "Integer.parseInt()를 통해 문자열 \"100\"과 \"200\"이 정수 100과 200으로 변환되어 더해지므로 300이 출력됩니다.",
      trapPoint: "문자열 결합 \"100200\"이 아니라 parseInt로 정수 덧셈이 수행됩니다."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "객체지향 설계 5대 원칙(SOLID) 중 '클라이언트는 자신이 사용하지 않는 메서드에 의존하지 않아야 한다(인터페이스를 거대하게 만들지 말고 작게 분리하라)'는 원칙의 명칭을 쓰시오.",
      answer: "인터페이스 분리 원칙",
      aliases: ["인터페이스 분리 원칙", "인터페이스분리원칙", "ISP", "Interface Segregation Principle"],
      explanation: "ISP(Interface Segregation Principle)는 범용적인 거대 인터페이스 하나보다 특정 클라이언트를 위한 여러 개의 구체적인 인터페이스가 낫다는 원칙입니다.",
      trapPoint: "인터페이스 세분화 원칙 = ISP(인터페이스 분리 원칙)."
    }
  ]
};
