/**
 * 2023년 핵심 기출선 (1~3회 엄선 20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2023_all"] = {
  id: "2023_all",
  title: "2023년 핵심 기출선 (1~3회 엄선)",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 120, b = 150;
    while (a != b) {
        if (a > b) a -= b;
        else b -= a;
    }
    printf("%d", a);
    return 0;
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "유클리드 호제법을 이용한 두 수의 최대공약수(GCD) 계산 알고리즘입니다.\n- 120과 150 -> b = 150 - 120 = 30\n- 120과 30 -> a = 120 - 30 = 90 -> 60 -> 30\n- a == b == 30이 되어 루프를 종료합니다.\n최대공약수 30이 출력됩니다.",
      trapPoint: "유클리드 뺄셈 방식의 최대공약수 로직입니다.",
      traceTable: {
        headers: ["단계", "a 값", "b 값", "연산"],
        rows: [
          ["초기", "120", "150", "b > a 이므로 b -= a"],
          ["1", "120", "30", "a > b 이므로 a -= b"],
          ["2", "90", "30", "a > b 이므로 a -= b"],
          ["3", "60", "30", "a > b 이므로 a -= b"],
          ["4", "30", "30", "a == b 종료"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int i = 0; i < arr.length; i += 2) {
            sum += arr[i];
        }
        System.out.println(sum);
    }
}`,
      answer: "9",
      aliases: ["9"],
      explanation: "i += 2로 2씩 건너뛰며 짝수 인덱스(0, 2, 4) 원소를 더합니다.\narr[0] = 1, arr[2] = 3, arr[4] = 5.\nsum = 1 + 3 + 5 = 9 입니다.",
      trapPoint: "i가 2씩 증가하므로 1, 3, 5가 더해집니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `lst = [10, 20, 30]
lst.insert(1, 40)
print(lst[1], lst[2])`,
      answer: "40 20",
      aliases: ["40 20", "40, 20", "40,20"],
      explanation: "lst.insert(1, 40)은 인덱스 1 위치에 40을 삽입하고 기존 원소들을 뒤로 밀어냅니다.\nlst = [10, 40, 20, 30]이 됩니다.\nlst[1]은 40, lst[2]는 20입니다.\n출력: 40 20",
      trapPoint: "insert() 메서드는 지정 인덱스에 삽입 후 기존 요소들을 우측으로 시프트합니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 NULL 값이 아닌 유효한 데이터를 필터링할 때 사용하는 올바른 조건을 쓰시오.",
      passage: `SELECT * FROM CUSTOMER WHERE PHONE (        );`,
      answer: "IS NOT NULL",
      aliases: ["IS NOT NULL", "is not null"],
      explanation: "SQL에서 NULL 값을 비교할 때는 `= NULL`이나 `!= NULL`을 사용할 수 없고 반드시 `IS NULL` 또는 `IS NOT NULL`을 사용해야 합니다.",
      trapPoint: "!= NULL이 아니라 반드시 IS NOT NULL입니다."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 한 모듈이 다른 모듈의 내부 논리적 조직이나 처리 순서에 의존하지 않고, 단지 두 모듈이 외부의 공통 데이터 포맷(통신 프로토콜, 디바이스 인터페이스 등)을 공유할 때 나타나는 결합도의 명칭을 쓰시오.",
      answer: "외부 결합도",
      aliases: ["외부 결합도", "외부결합도", "External Coupling", "external coupling"],
      explanation: "외부 결합도(External Coupling)는 두 모듈이 외부에서 도입된 데이터 포맷, 통신 프로토콜, 디바이스 인터페이스 등을 공유할 때 발생합니다.",
      trapPoint: "전역 변수 공유는 공통 결합도, 외부 프로토콜/인터페이스 공유는 외부 결합도입니다."
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 3 == 0) a += i;
    }
    printf("%d", a);
    return 0;
}`,
      answer: "18",
      aliases: ["18"],
      explanation: "1부터 10 사이에서 3의 배수는 3, 6, 9 입니다.\na = 3 + 6 + 9 = 18이 출력됩니다.",
      trapPoint: "3의 배수의 합: 3 + 6 + 9 = 18."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        int y = x > 15 ? 1 : (x > 5 ? 2 : 3);
        System.out.println(y);
    }
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "중첩 삼항 연산자:\n1. x > 15는 10 > 15로 거짓이므로 콜론 뒤의 식 `(x > 5 ? 2 : 3)`으로 넘어갑니다.\n2. x > 5는 10 > 5로 참이므로 2가 선택됩니다.\n출력: 2",
      trapPoint: "중첩 삼항 연산자의 순차적 조건 평가입니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "GoF 디자인 패턴 중 객체의 대리자(Surrogate)를 제공하여 해당 객체로의 접근을 제어하고, 초기화 지연이나 원격 객체 접근, 접근 제어 등을 수행하도록 지원하는 구조 패턴의 명칭을 영문 또는 한글로 쓰시오.",
      answer: "프록시",
      aliases: ["프록시", "프록시 패턴", "Proxy", "proxy", "Proxy Pattern"],
      explanation: "프록시(Proxy) 패턴은 실제 대상 객체 대신 대리인(Proxy) 객체를 내세워 클라이언트의 요청을 가로채고 추가적인 제어(캐싱, 보안, 지연 로딩 등)를 수행하는 구조 패턴입니다.",
      trapPoint: "대리자(Surrogate) 역할 = 프록시(Proxy) 패턴."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[2][2] = {{1, 2}, {3, 4}};
    int sum = 0;
    for (int i = 0; i < 2; i++) {
        sum += arr[i][i];
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "5",
      aliases: ["5"],
      explanation: "arr[i][i]는 대각선 원소(주대각선)의 합입니다.\narr[0][0] = 1, arr[1][1] = 4.\nsum = 1 + 4 = 5 입니다.",
      trapPoint: "주대각선 원소 합산: 1 + 4 = 5."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "보안 공격 기법 중 시스템 관리자에게 암호화폐(비트코인 등)를 요구하며 사용자 컴퓨터의 문서, 사진 등 중요 파일을 강력한 암호 알고리즘으로 무단 암호화하여 인질로 잡는 악성 소프트웨어의 명칭을 쓰시오.",
      answer: "랜섬웨어",
      aliases: ["랜섬웨어", "Ransomware", "ransomware"],
      explanation: "랜섬웨어(Ransomware)는 몸값(Ransom)과 소프트웨어(Software)의 합성어로 파일 암호화 후 복호화 대가를 요구하는 악성코드입니다.",
      trapPoint: "인질 몸값을 요구하는 악성코드 = 랜섬웨어."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = [1, 2, 3]
b = [4, 5, 6]
c = a + b
print(c[2:4])`,
      answer: "[3, 4]",
      aliases: ["[3, 4]", "[3,4]", "3, 4"],
      explanation: "리스트 덧셈 연산자로 합치면 c = [1, 2, 3, 4, 5, 6]이 됩니다.\nc[2:4]는 인덱스 2부터 3까지이므로 [3, 4]가 출력됩니다.",
      trapPoint: "c[2]는 3, c[3]은 4입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "비동기식 자바스크립트와 XML의 약자로, 전체 페이지를 다시 로드하지 않고도 웹 브라우저가 백그라운드에서 서버와 비동기적으로 데이터를 교환하여 웹 페이지의 일부분만을 동적으로 갱신할 수 있도록 해주는 웹 개발 기술의 명칭을 쓰시오.",
      answer: "AJAX",
      aliases: ["AJAX", "ajax", "에이잭스", "아약스", "Asynchronous JavaScript and XML"],
      explanation: "AJAX는 XMLHttpRequest 또는 fetch API를 통해 화면의 새로고침 없이 서버와 JSON/XML 데이터를 비동기 교환하는 기법입니다.",
      trapPoint: "비동기 웹 페이지 부분 갱신 기술 = AJAX."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int count = 0;
        for (int i = 0; i < 5; i++) {
            for (int j = i; j < 5; j++) {
                count++;
            }
        }
        System.out.println(count);
    }
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "- i=0: j는 0..4 (5회)\n- i=1: j는 1..4 (4회)\n- i=2: j는 2..4 (3회)\n- i=3: j는 3..4 (2회)\n- i=4: j는 4..4 (1회)\n총 횟수: 5 + 4 + 3 + 2 + 1 = 15.",
      trapPoint: "이중 루프의 감소형 반복 횟수 계산입니다.",
      traceTable: {
        headers: ["i 값", "j 범위", "반복 횟수", "count 누적"],
        rows: [
          ["0", "0 ~ 4", "5회", "5"],
          ["1", "1 ~ 4", "4회", "9"],
          ["2", "2 ~ 4", "3회", "12"],
          ["3", "3 ~ 4", "2회", "14"],
          ["4", "4 ~ 4", "1회", "15"]
        ]
      }
    },
    {
      id: 14,
      category: "SQL",
      prompt: "다음 [USER] 테이블에서 이름(NAME)이 '김'으로 시작하는 모든 사용자를 검색하는 SQL 조건절의 빈칸을 채우시오.",
      passage: `SELECT * FROM USER WHERE NAME (        ) '김%';`,
      answer: "LIKE",
      aliases: ["LIKE", "like"],
      explanation: "와일드카드 문자(%, _)를 사용한 패턴 매칭 연산자는 `LIKE` 입니다.",
      trapPoint: "부분 일치 패턴 검색 키워드는 LIKE입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 5, b = 2;
    printf("%f", (float)a / b);
    return 0;
}`,
      answer: "2.500000",
      aliases: ["2.500000", "2.5"],
      explanation: "a가 float 타입 5.0f로 캐스팅된 후 2로 나누어지므로 2.5가 됩니다.\nC언어의 `%f` 서식 지정자는 기본적으로 소수점 이하 6자리까지 출력하므로 '2.500000'이 출력됩니다.",
      trapPoint: "C언어 기본 %f 포맷의 소수점 6자리 기본 출력 특성입니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "소프트웨어 아키텍처에서 시스템을 독립적인 기능 단위로 쪼개고, 각 파이프라인 단계를 거치면서 데이터를 순차적으로 변환/가공하여 다음 단계로 전달하는 패턴의 명칭을 쓰시오.",
      answer: "파이프 필터",
      aliases: ["파이프 필터", "파이프-필터", "파이프 필터 패턴", "Pipe-Filter", "Pipe and Filter"],
      explanation: "파이프-필터(Pipe and Filter) 패턴은 유닉스 셸 파이프라인(|)처럼 각 필터가 데이터를 받아 가공한 후 파이프를 통해 다음 필터로 스트림 전송하는 아키텍처입니다.",
      trapPoint: "데이터 변환 컴포넌트(필터)와 연결 통로(파이프)로 구성된 패턴입니다."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `nums = [1, 2, 3, 4, 5]
print(nums[1:4:2])`,
      answer: "[2, 4]",
      aliases: ["[2, 4]", "[2,4]", "2, 4"],
      explanation: "슬라이싱 `start:stop:step` 문법입니다.\n인덱스 1부터 3까지(4 미만) 2칸씩 건너뛰므로,\n인덱스 1의 2와 인덱스 3의 4가 추출되어 [2, 4]가 됩니다.",
      trapPoint: "step 인자가 2이므로 인덱스 1, 3이 선택됩니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "인터넷 계층의 프로토콜 중 멀티캐스트 그룹에 호스트를 가입시키거나 탈퇴시키는 등 멀티캐스트 그룹 관리를 담당하는 프로토콜의 명칭(영문 약어 4글자)을 쓰시오.",
      answer: "IGMP",
      aliases: ["IGMP", "igmp", "Internet Group Management Protocol"],
      explanation: "IGMP(Internet Group Management Protocol)는 호스트 컴퓨터와 인접 라우터 간에 멀티캐스트 그룹 멤버십을 관리하는 데 사용됩니다.",
      trapPoint: "IP 제어/에러는 ICMP, 멀티캐스트 그룹 관리는 IGMP입니다."
    },
    {
      id: 19,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 3; i++) {
        switch (i) {
            case 1: sum += 10;
            case 2: sum += 20; break;
            case 3: sum += 30;
        }
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "80",
      aliases: ["80"],
      explanation: "- i=1: case 1 진입(sum+=10) -> break 없으므로 case 2로 폴스루(sum+=20) 후 break (누적 30)\n- i=2: case 2 진입(sum+=20) 후 break (누적 50)\n- i=3: case 3 진입(sum+=30) (누적 80)\n따라서 sum = 80 입니다.",
      trapPoint: "i=1일 때 case 1에서 2로 떨어져 10과 20이 모두 더해진다는 점입니다.",
      traceTable: {
        headers: ["i 값", "진입 case", "실행된 연산", "sum 누적"],
        rows: [
          ["1", "case 1 -> case 2", "10 + 20", "30"],
          ["2", "case 2", "20", "50"],
          ["3", "case 3", "30", "80"]
        ]
      }
    },
    {
      id: 20,
      category: "단답형",
      prompt: "소프트웨어 테스팅에서 테스트 대상이 되는 모든 독립적인 실행 경로(Basis Path)를 적어도 한 번씩 수행하도록 설계하기 위해, 제어 흐름 그래프에서 '간선(E) - 노드(N) + 2' 공식으로 계산하는 복잡도 지표의 명칭을 쓰시오.",
      answer: "순환 복잡도",
      aliases: ["순환 복잡도", "순환복잡도", "맥케이브 순환 복잡도", "Cyclomatic Complexity", "사이클로매틱 복잡도"],
      explanation: "맥케이브(McCabe)의 순환 복잡도(Cyclomatic Complexity) V(G) = E - N + 2 = 조건 노드(P) + 1 로 기본 경로의 수를 측정합니다.",
      trapPoint: "V(G) = E - N + 2 공식 = 순환 복잡도(Cyclomatic Complexity)."
    }
  ]
};
