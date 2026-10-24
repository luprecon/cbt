/**
 * 2020년 개정 첫해 대표 기출선 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2020_all"] = {
  id: "2020_all",
  title: "2020년 개정 첫해 대표 기출선",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int c = 0;
    for (int i = 1; i <= 2020; i++) {
        if (i % 4 == 0 && i % 100 != 0 || i % 400 == 0) {
            c++;
        }
    }
    printf("%d", c);
    return 0;
}`,
      answer: "490",
      aliases: ["490"],
      explanation: "윤년(Leap Year) 판별 조건입니다.\n1부터 2020까지 윤년의 개수 계산:\n1. 4의 배수: 2020 / 4 = 505\n2. 100의 배수 제외: 2020 / 100 = 20\n3. 400의 배수 포함: 2020 / 400 = 5\n총 윤년 수 = 505 - 20 + 5 = 490개.\n출력: 490",
      trapPoint: "윤년 공식: (4의 배수 && !100의 배수) || (400의 배수) 입니다.",
      traceTable: {
        headers: ["조건 항목", "계산 수식", "개수"],
        rows: [
          ["4의 배수", "2020 / 4", "505개"],
          ["100의 배수", "2020 / 100", "20개 (제외)"],
          ["400의 배수", "2020 / 400", "5개 (재포함)"],
          ["윤년 총합", "505 - 20 + 5", "490"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int i = 0, sum = 0;
        while (i < 10) {
            i++;
            if (i % 3 == 0) sum += i;
        }
        System.out.println(sum);
    }
}`,
      answer: "18",
      aliases: ["18"],
      explanation: "i가 1부터 10까지 증가하며, 3의 배수인 3, 6, 9가 sum에 누적됩니다.\nsum = 3 + 6 + 9 = 18.\n출력: 18",
      trapPoint: "i가 1부터 10까지 순회할 때 3의 배수의 합입니다."
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = {'korea': 'seoul', 'japan': 'tokyo', 'china': 'beijing'}
a['usa'] = 'washington'
print(len(a))`,
      answer: "4",
      aliases: ["4"],
      explanation: "기존 3개의 키-값 쌍에 'usa': 'washington'이 추가되어 총 4개가 됩니다.\nlen(a) = 4가 출력됩니다.",
      trapPoint: "딕셔너리 새로운 키 할당 시 요소 개수 증가입니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "관계 데이터베이스에서 뷰(VIEW)를 생성할 때 사용하는 표준 SQL DDL 문법의 빈칸을 채우시오.",
      passage: `(  1  ) VIEW V_STUDENT (  2  ) SELECT * FROM STUDENT;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["CREATE", "create"],
        "2": ["AS", "as"]
      },
      answer: "(1) CREATE, (2) AS",
      aliases: ["CREATE AS", "CREATE, AS", "create as"],
      explanation: "뷰 생성 문법은 `CREATE VIEW 뷰명 AS SELECT ...;` 입니다.",
      trapPoint: "CREATE VIEW와 AS 키워드 쌍입니다."
    },
    {
      id: 5,
      category: "단답형",
      prompt: "소프트웨어 아키텍처 및 디자인 원칙(SOLID) 중 '어떤 클래스는 단 하나의 책임을 가져야 하며, 클래스를 변경하는 이유는 단 하나여야 한다'는 원칙의 명칭을 쓰시오.",
      answer: "단일 책임 원칙",
      aliases: ["단일 책임 원칙", "단일책임원칙", "SRP", "Single Responsibility Principle"],
      explanation: "SRP(Single Responsibility Principle)는 클래스가 오직 하나의 책임(목적)만을 가져야 응집도가 높아지고 변경에 따른 파급 효과가 적다는 객체지향 원칙입니다.",
      trapPoint: "단 하나의 책임 = 단일 책임 원칙(SRP)."
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10, b = 20;
    int *pa = &a;
    int *pb = &b;
    *pa = *pa + *pb;
    *pb = *pa - *pb;
    printf("%d %d", a, b);
    return 0;
}`,
      answer: "30 10",
      aliases: ["30 10", "30, 10", "30,10"],
      explanation: "1. *pa = *pa + *pb -> a = 10 + 20 = 30\n2. *pb = *pa - *pb -> b = 30 - 20 = 10\n3. 최종 a = 30, b = 10\n출력: 30 10",
      trapPoint: "포인터를 통한 대입 연산 과정입니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30};
        int sum = 0;
        for (int x : arr) {
            sum += x;
        }
        System.out.println(sum / arr.length);
    }
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "배열 원소 총합 = 10 + 20 + 30 = 60.\narr.length = 3.\n60 / 3 = 20이 출력됩니다.",
      trapPoint: "배열 평균 구하기 문제입니다."
    },
    {
      id: 8,
      category: "단답형",
      prompt: "데이터베이스에서 데이터의 정확성과 일관성을 유지하기 위해 데이터 조작 시 준수해야 하는 규칙으로, 개체 무결성, 참조 무결성, 도메인 무결성 등을 총칭하는 용어를 쓰시오.",
      answer: "데이터 무결성",
      aliases: ["데이터 무결성", "무결성", "데이터무결성", "Data Integrity", "무결성 제약조건"],
      explanation: "데이터 무결성(Data Integrity)은 저장된 데이터의 정확성, 일관성, 유효성이 보장되는 것을 의미합니다.",
      trapPoint: "정확성과 일관성을 보장하는 성질 = 무결성(Integrity)."
    },
    {
      id: 9,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s = "Hello World"
print(s.count('l'))`,
      answer: "3",
      aliases: ["3"],
      explanation: "문자열 \"Hello World\"에서 소문자 'l'은 He'll'o Wor'l'd 로 총 3개 존재합니다.\n출력: 3",
      trapPoint: "count() 메서드는 문자열 내에서 특정 문자의 빈도수를 계산합니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "소프트웨어 응집도(Cohesion) 중 모듈 내부의 구성요소들이 어떤 의미 있는 연관성 없이 완전히 우연히 한 모듈 내에 모여 있는 가장 낮은 품질의 응집도를 쓰시오.",
      answer: "우연적 응집도",
      aliases: ["우연적 응집도", "우연적응집도", "Coincidental Cohesion", "우연적"],
      explanation: "우연적 응집도(Coincidental Cohesion)는 구성 요소들이 서로 아무런 관련 없이 무작위로 결합되어 있는 가장 나쁜 형태의 응집도입니다.",
      trapPoint: "가장 나쁜 응집도 = 우연적 응집도(Coincidental)."
    },
    {
      id: 11,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 0;
    while (a < 5) {
        a++;
    }
    printf("%d", a);
    return 0;
}`,
      answer: "5",
      aliases: ["5"],
      explanation: "a가 0부터 1씩 증가하여 a < 5가 거짓이 되는 순간(즉 a = 5) 루프를 탈출합니다.\n출력: 5",
      trapPoint: "루프 종료 시점의 a 값입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "소프트웨어 테스팅 기법 중 프로그램 입력 조건의 유효한 값과 무효한 값의 영역을 대표하는 몇 개의 동등한 그룹(클래스)으로 나누고, 각 그룹에서 대표값을 하나씩 선택하여 테스트 케이스를 도출하는 블랙박스 테스트 기법의 명칭을 쓰시오.",
      answer: "동등 분할",
      aliases: ["동등 분할", "동등분할", "동치 분할", "동치분할", "동등 분할 기법", "Equivalence Partitioning"],
      explanation: "동등 분할(Equivalence Partitioning, 동치 분할)은 입력 영역을 타당한 입력과 비타당한 입력 그룹으로 분할하여 대표값을 테스트하는 기법입니다.",
      trapPoint: "입력 영역을 대표 그룹으로 나누어 검증 = 동등 분할(동치 분할)."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        int y = 3;
        System.out.println(x / y);
    }
}`,
      answer: "3",
      aliases: ["3"],
      explanation: "10 / 3은 정수 나눗셈이므로 몫인 3이 출력됩니다.",
      trapPoint: "정수 나눗셈의 결과는 정수(몫)입니다."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "기존 테이블 [MEMBER]의 이름(NAME) 컬럼의 값을 '이순신'으로 수정하는 SQL DML 문의 빈칸을 쓰시오.",
      passage: `UPDATE MEMBER (        ) NAME = '이순신' WHERE ID = 1;`,
      answer: "SET",
      aliases: ["SET", "set"],
      explanation: "데이터 수정 문법은 `UPDATE 테이블명 SET 컬럼명 = 변경값 WHERE 조건;` 입니다.",
      trapPoint: "UPDATE와 짝을 이루는 키워드는 SET입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    printf("%d", *(arr + 1));
    return 0;
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "*(arr + 1)은 arr[1]과 같으므로 20이 출력됩니다.",
      trapPoint: "배열 1번 인덱스 원소 접근입니다."
    },
    {
      id: 16,
      category: "단답형",
      prompt: "관계 데이터 모델의 릴레이션에서 속성(Attribute)의 총 개수를 일컫는 용어의 명칭을 한글 또는 영문으로 쓰시오.",
      answer: "차수",
      aliases: ["차수", "Degree", "degree"],
      explanation: "릴레이션의 속성(열)의 개수를 차수(Degree)라고 하며, 튜플(행)의 개수를 카디널리티(Cardinality)라고 합니다.",
      trapPoint: "열(속성) 개수 = 차수(Degree), 행(튜플) 개수 = 카디널리티(Cardinality)."
    },
    {
      id: 17,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `print(bool(0), bool(1), bool(""))`,
      answer: "False True False",
      aliases: ["False True False", "False, True, False"],
      explanation: "파이썬에서 0과 빈 문자열 \"\"은 거짓(False)으로 평가되며, 0이 아닌 정수 1은 참(True)으로 평가됩니다.\n출력: False True False",
      trapPoint: "파이썬 불리언 값의 참/거짓 평가 규칙입니다."
    },
    {
      id: 18,
      category: "단답형",
      prompt: "네트워크 통신에서 컴퓨터에 부여된 고유한 하드웨어 식별 번호로, IEEE에서 관리하며 48비트(6바이트)로 구성된 데이터링크 계층 주소의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "MAC 주소",
      aliases: ["MAC 주소", "MAC", "mac", "MAC Address", "맥 주소", "맥주소"],
      explanation: "MAC 주소(Media Access Control Address)는 네트워크 인터페이스 카드(NIC)에 부여된 48비트 하드웨어 고유 주소입니다.",
      trapPoint: "48비트 하드웨어 주소 = MAC 주소."
    },
    {
      id: 19,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s = "12345";
        System.out.println(s.charAt(2));
    }
}`,
      answer: "3",
      aliases: ["3"],
      explanation: "charAt(2)는 인덱스 2에 위치한 세 번째 문자인 '3'을 반환합니다.",
      trapPoint: "0부터 시작하는 인덱스: 0('1'), 1('2'), 2('3')."
    },
    {
      id: 20,
      category: "단답형",
      prompt: "소프트웨어 결합도(Coupling) 중 가장 이상적이고 바람직한 결합도로, 두 모듈 간의 인터페이스가 단순한 파라미터 값(값에 의한 호출)만으로 구성되어 독립성이 가장 높은 결합도의 명칭을 쓰시오.",
      answer: "자료 결합도",
      aliases: ["자료 결합도", "자료결합도", "Data Coupling"],
      explanation: "자료 결합도(Data Coupling)는 모듈 간 상호작용이 순수한 데이터 전달만으로 이루어지는 가장 낮은(바람직한) 결합도입니다.",
      trapPoint: "가장 좋은 결합도 = 자료 결합도(Data Coupling)."
    }
  ]
};
