/**
 * 2026년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2026_1"] = {
  id: "2026_1",
  title: "2026년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p = arr + 1;
    int sum = 0;
    
    for (int i = 0; i < 3; i++) {
        sum += *(p + i);
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "90",
      aliases: ["90"],
      explanation: "arr 배열의 시작 주소에서 arr + 1은 arr[1]의 주소(&arr[1])를 가리킵니다.\np는 arr[1](20)을 가리키므로, 루프에서 i=0일 때 *(p+0) = 20, i=1일 때 *(p+1) = 30, i=2일 때 *(p+2) = 40이 됩니다.\n따라서 sum = 20 + 30 + 40 = 90 입니다.",
      trapPoint: "p가 arr[0]이 아니라 arr+1(즉 arr[1]=20)부터 시작한다는 점을 놓치면 10+20+30=60으로 오답을 내기 쉽습니다.",
      traceTable: {
        headers: ["반복 (i)", "포인터 표현식", "가리키는 값", "sum 누적"],
        rows: [
          ["초기상태", "p = arr + 1", "arr[1] (20)", "0"],
          ["i = 0", "*(p + 0)", "20", "20"],
          ["i = 1", "*(p + 1)", "30", "50"],
          ["i = 2", "*(p + 2)", "40", "90"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int x = 10;
    Parent() {
        System.out.print("P");
    }
    void show() {
        System.out.print(x);
    }
}

class Child extends Parent {
    int x = 20;
    Child() {
        System.out.print("C");
    }
    void show() {
        System.out.print(x);
    }
}

public class Main {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.show();
    }
}`,
      answer: "PC20",
      aliases: ["PC20", "PC 20"],
      explanation: "1. new Child() 호출 시 부모 클래스 Parent의 생성자가 먼저 실행되어 'P'가 출력됩니다.\n2. 이후 Child 생성자가 실행되어 'C'가 출력됩니다.\n3. obj.show()는 부모 타입 Parent obj 참조 변수이지만, 자식 객체 Child에서 오버라이딩된 show() 메서드가 동적 바인딩(다형성)되어 호출됩니다.\n4. 따라서 Child의 show()가 실행되어 Child의 인스턴스 변수 x인 20이 출력됩니다.\n최종 출력: PC20",
      trapPoint: "자바의 인스턴스 메서드는 동적 바인딩되므로 부모 타입 변수로 참조하더라도 자식의 오버라이딩 메서드가 실행됩니다. 또한 자식 생성자 호출 전 부모 생성자가 먼저 실행됩니다.",
      traceTable: {
        headers: ["실행 순서", "실행 코드", "출력 내용", "누적 출력"],
        rows: [
          ["1단계", "super() (Parent 생성자)", "P", "P"],
          ["2단계", "Child() 생성자", "C", "PC"],
          ["3단계", "obj.show() (오버라이딩 메서드)", "20", "PC20"]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
result = [x * 2 for x in data if x % 3 == 0]
print(result[::-1])`,
      answer: "[18, 12, 6]",
      aliases: ["[18, 12, 6]", "[18,12,6]", "18, 12, 6", "18 12 6"],
      explanation: "1. 리스트 컴프리헨션: data의 원소 중 3의 배수(x % 3 == 0)인 원소는 3, 6, 9입니다.\n2. 각각 x * 2를 수행하므로 result는 [6, 12, 18]이 됩니다.\n3. [::-1] 슬라이싱은 리스트를 역순으로 뒤집으므로 [18, 12, 6]이 출력됩니다.",
      trapPoint: "파이썬의 리스트 출력 시 대괄호 []와 콤마 구분자 형태를 유지해야 합니다. 슬라이싱 [::-1]이 역순 정렬임을 확인하세요.",
      traceTable: {
        headers: ["x 값", "3의 배수 조건 (x%3==0)", "x * 2", "result 리스트 상태"],
        rows: [
          ["3", "참(True)", "6", "[6]"],
          ["6", "참(True)", "12", "[6, 12]"],
          ["9", "참(True)", "18", "[6, 12, 18]"],
          ["출력", "result[::-1]", "역순", "[18, 12, 6]"]
        ]
      }
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}

int main() {
    int res = f(4) + f(3);
    printf("%d", res);
    return 0;
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "f(n)은 팩토리얼(n!)을 계산하는 재귀함수입니다.\nf(4) = 4 * 3 * 2 * 1 = 24\nf(3) = 3 * 2 * 1 = 6\n따라서 res = 24 + 6 = 30 입니다.",
      trapPoint: "재귀함수 호출 시 종료 조건(n <= 1)에 도달할 때까지 스택 호출을 전개해야 합니다.",
      traceTable: {
        headers: ["함수 호출", "전개 식", "계산값"],
        rows: [
          ["f(4)", "4 * f(3) = 4 * 6", "24"],
          ["f(3)", "3 * f(2) = 3 * 2", "6"],
          ["f(2)", "2 * f(1) = 2 * 1", "2"],
          ["f(1)", "종료조건 (n<=1)", "1"],
          ["합계", "f(4) + f(3) = 24 + 6", "30"]
        ]
      }
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 [학생] 테이블에서 학과별 학생 수가 2명 이상인 학과명과 해당 학생 수를 구하는 SQL문을 작성하고자 한다. 빈칸 (1), (2)에 들어갈 올바른 키워드를 작성하시오.",
      passage: `[학생 테이블]
| 학번 | 이름 | 학과 | 점수 |
| 101 | 김철수 | 컴퓨터공학 | 85 |
| 102 | 이영희 | 컴퓨터공학 | 92 |
| 103 | 박민수 | 전자공학 | 78 |
| 104 | 최유리 | 전자공학 | 88 |
| 105 | 정재호 | 컴퓨터공학 | 95 |

[SQL문]
SELECT 학과, COUNT(*) 
FROM 학생 
(  1  ) 학과 
(  2  ) COUNT(*) >= 2;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["GROUP BY", "group by"],
        "2": ["HAVING", "having"]
      },
      answer: "(1) GROUP BY, (2) HAVING",
      aliases: ["GROUP BY, HAVING", "GROUP BY HAVING", "group by, having"],
      explanation: "그룹별 집계를 할 때 그룹화 기준 컬럼은 'GROUP BY'절을 사용하며, 그룹 함수(COUNT, SUM, AVG 등)에 대한 조건 필터링은 WHERE절이 아닌 'HAVING'절을 사용합니다.",
      trapPoint: "집계함수에 대한 조건절에는 WHERE가 아닌 반드시 HAVING을 사용해야 합니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "소프트웨어 디자인 패턴 중 생성(Creational) 패턴의 하나로, 어떤 클래스의 인스턴스가 오직 하나만 생성되도록 보장하고 이에 대한 전역적인 접근점을 제공하는 패턴의 이름을 영문 또는 한글로 쓰시오.",
      answer: "싱글톤",
      aliases: ["싱글톤", "싱글톤 패턴", "싱글톤패턴", "Singleton", "Singleton Pattern", "singleton"],
      explanation: "싱글톤(Singleton) 패턴은 프로그램 전역에서 단 하나의 유일한 인스턴스를 공유하여 메모리 낭비를 방지하고자 할 때 사용하는 GoF 생성 패턴입니다.",
      trapPoint: "GoF 패턴 분류 중 생성 패턴에 속하며, '단 하나(Single)의 인스턴스'가 핵심 힌트입니다."
    },
    {
      id: 7,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 12; // 1100(2)
    int b = 10; // 1010(2)
    int c = a ^ b;
    int d = a & b;
    printf("%d %d", c, d);
    return 0;
}`,
      answer: "6 8",
      aliases: ["6 8", "6, 8", "6,8"],
      explanation: "1. a = 12 = 1100(2), b = 10 = 1010(2)\n2. XOR(^) 연산: 두 비트가 다르면 1, 같으면 0\n   1100 ^ 1010 = 0110(2) = 6\n3. AND(&) 연산: 두 비트 모두 1일 때만 1\n   1100 & 1010 = 1000(2) = 8\n출력 포맷: '%d %d'이므로 공백으로 구분하여 '6 8' 입니다.",
      trapPoint: "출력 구분자가 쉼표가 아니라 공백 한 칸(%d %d)임에 유의해야 합니다.",
      traceTable: {
        headers: ["변수/연산", "2진수 비트 표현", "10진수 결과"],
        rows: [
          ["a", "1 1 0 0", "12"],
          ["b", "1 0 1 0", "10"],
          ["c (a ^ b)", "0 1 1 0", "6"],
          ["d (a & b)", "1 0 0 0", "8"]
        ]
      }
    },
    {
      id: 8,
      category: "단답형",
      prompt: "IPv4 주소 192.168.1.0/26 대역을 서브넷팅하여 네트워크를 분할하였다. 이 때 각 서브넷에서 호스트에게 할당 가능한 최대 호스트(Host) 수를 쓰시오.",
      answer: "62",
      aliases: ["62", "62개"],
      explanation: "1. 서브넷 마스크 프리픽스가 /26이므로 호스트 비트 수는 32 - 26 = 6비트입니다.\n2. 6비트로 표현 가능한 전체 주소 수는 2^6 = 64개입니다.\n3. 네트워크 주소(1개)와 브로드캐스트 주소(1개)를 제외해야 하므로, 호스트에게 할당 가능한 IP 수는 64 - 2 = 62개입니다.",
      trapPoint: "전체 주소 수(64개)가 아니라 '호스트에게 할당 가능한 주소'이므로 네트워크 ID와 브로드캐스트 ID 2개를 반드시 빼야 합니다 (2^n - 2)."
    },
    {
      id: 9,
      category: "단답형",
      prompt: "소프트웨어 테스트의 기본 원리 중 하나로, 동일한 테스트 케이스로 반복 실행하면 더 이상 새로운 결함을 찾아낼 수 없으므로 주기적으로 테스트 케이스를 점검하고 개선해야 한다는 원리의 명칭을 쓰시오.",
      answer: "살충제 패러독스",
      aliases: ["살충제 패러독스", "살충제패러독스", "살충제 역설", "Pesticide Paradox", "pesticide paradox"],
      explanation: "살충제 패러독스(Pesticide Paradox)는 동일한 살충제를 계속 사용하면 벌레에게 내성이 생기듯, 같은 테스트 케이스로는 새로운 결함을 발견하기 어렵다는 원리입니다.",
      trapPoint: "소프트웨어 테스트 7가지 원리 중 대표적인 빈출 단답형 키워드입니다."
    },
    {
      id: 10,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Counter {
    static int count = 0;
    int num = 0;
    
    void increment() {
        count++;
        num++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        c1.increment();
        c2.increment();
        System.out.println(c1.count + " " + c1.num);
    }
}`,
      answer: "2 1",
      aliases: ["2 1", "2, 1", "2,1"],
      explanation: "1. count는 static 변수로 모든 Counter 객체가 하나의 메모리 공간을 공유합니다.\n2. num은 인스턴스 변수로 각 객체(c1, c2)마다 독립적인 메모리를 갖습니다.\n3. c1.increment() 실행 시: static count는 1, c1.num은 1\n4. c2.increment() 실행 시: static count는 2, c2.num은 1\n5. c1.count는 공유되므로 2이고, c1.num은 여전히 1입니다.\n출력: 2 1",
      trapPoint: "static 변수는 클래스 전체에서 공유되지만 인스턴스 변수는 객체마다 독립적이라는 차이를 파악해야 합니다.",
      traceTable: {
        headers: ["단계", "실행 코드", "static count", "c1.num", "c2.num"],
        rows: [
          ["초기화", "new Counter() x 2", "0", "0", "0"],
          ["1단계", "c1.increment()", "1", "1", "0"],
          ["2단계", "c2.increment()", "2", "1", "1"],
          ["결과출력", "c1.count + ' ' + c1.num", "2", "1", "-"]
        ]
      }
    },
    {
      id: 11,
      category: "단답형",
      prompt: "보안 공격 기법 중 하나로, 공격자가 세션을 가로채거나 신뢰할 수 있는 사용자로 위장하여 사용자의 브라우저를 통해 악의적인 요청을 서버로 전송하게 만드는 공격의 명칭(영문 약어 4글자)을 쓰시오.",
      answer: "CSRF",
      aliases: ["CSRF", "csrf", "XSRF", "Cross-Site Request Forgery", "크로스 사이트 요청 변조"],
      explanation: "CSRF(Cross-Site Request Forgery, 크로스 사이트 요청 변조)는 사용자가 자신의 의지와 무관하게 공격자가 의도한 행위(수정, 등록, 삭제 등)를 특정 웹서버에 요청하도록 만드는 취약점입니다.",
      trapPoint: "스크립트를 피해자 브라우저에서 실행시키는 XSS와 달리, CSRF는 희생자의 권한을 도용하여 악의적 서버 요청을 발생시킵니다."
    },
    {
      id: 12,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x=%d,y=%d", x, y);
    return 0;
}`,
      answer: "x=20,y=10",
      aliases: ["x=20,y=10", "x=20, y=10"],
      explanation: "swap 함수에 x와 y의 주소(&x, &y)를 전달하는 Call by Reference(참조에 의한 호출)입니다.\n포인터 역참조 *a, *b를 통해 원본 변수 x와 y의 메모리 공간에 있는 값을 교환하므로,\nx는 20이 되고 y는 10이 됩니다.\nprintf 포맷 문자열이 'x=%d,y=%d'이므로 'x=20,y=10'이 출력됩니다.",
      trapPoint: "printf 출력 양식에 공백이 있는지 없는지 정확히 확인해야 합니다."
    },
    {
      id: 13,
      category: "SQL",
      prompt: "기존 테이블 [EMPLOYEE]에서 직급(POSITION) 컬럼의 데이터 타입을 VARCHAR(30)으로 수정하고자 한다. SQL 표준 DDL 문의 빈칸 (1), (2)를 완성하시오.",
      passage: `ALTER TABLE EMPLOYEE (  1  ) (  2  ) POSITION VARCHAR(30);`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ALTER", "alter", "MODIFY", "modify"],
        "2": ["COLUMN", "column"]
      },
      answer: "(1) ALTER 또는 MODIFY, (2) COLUMN",
      aliases: ["ALTER COLUMN", "MODIFY COLUMN"],
      explanation: "표준 SQL에서 컬럼의 속성을 변경할 때 `ALTER TABLE 테이블명 ALTER COLUMN 컬럼명 데이터타입` 또는 Oracle 계열에서는 `ALTER TABLE 테이블명 MODIFY 컬럼명 데이터타입`을 사용합니다.",
      trapPoint: "테이블 구조 변경은 ALTER TABLE 문을 사용합니다."
    },
    {
      id: 14,
      category: "단답형",
      prompt: "관계 데이터베이스 정규화 과정 중, 테이블 R의 모든 결정자가 후보키(Candidate Key)이어야 하며 제3정규형(3NF)을 만족하면서도 강한 조건을 만족하는 정규형의 명칭을 영문 약어 또는 한글로 쓰시오.",
      answer: "BCNF",
      aliases: ["BCNF", "보이스코드 정규형", "보이스-코드 정규형", "보이스코드정규형", "Boyce-Codd"],
      explanation: "BCNF(Boyce-Codd Normal Form)는 3정규형을 만족하면서 모든 결정자가 후보키가 되도록 함수 종속성을 분해한 정규형입니다.",
      trapPoint: "1NF(도메인 원자값) -> 2NF(부분함수종속 제거) -> 3NF(이행함수종속 제거) -> BCNF(모든 결정자가 후보키)."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s = "Hello World";
        String r = s.substring(6, 11);
        System.out.println(r.toUpperCase());
    }
}`,
      answer: "WORLD",
      aliases: ["WORLD", "world"],
      explanation: "1. s.substring(beginIndex, endIndex)는 beginIndex부터 endIndex-1까지를 추출합니다.\n2. 인덱스 6은 'W', 인덱스 10은 'd'이므로 substring(6, 11)은 \"World\"가 됩니다.\n3. toUpperCase()를 호출하므로 모두 대문자로 바뀌어 \"WORLD\"가 출력됩니다.",
      trapPoint: "substring의 두 번째 인자는 exclusive(미포함)이므로 11 이전인 10까지 추출된다는 점과 대문자 변환을 확인해야 합니다."
    },
    {
      id: 16,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = {'A': 90, 'B': 80, 'C': 70}
res = 0
for k, v in a.items():
    if v >= 80:
        res += v
print(res)`,
      answer: "170",
      aliases: ["170"],
      explanation: "딕셔너리 a의 key-value 쌍을 순회하면서 점수 v가 80 이상인 경우만 누적합을 구합니다.\n'A': 90 (>=80 참) -> res = 90\n'B': 80 (>=80 참) -> res = 90 + 80 = 170\n'C': 70 (>=80 거짓)\n따라서 최종 res = 170입니다.",
      trapPoint: "조건식 v >= 80에서 80이 포함(이상)되므로 90과 80이 더해집니다."
    },
    {
      id: 17,
      category: "단답형",
      prompt: "네트워크 계층 구조에서 OSI 7계층 중 물리적 전송 매체를 통해 비트(Bit) 스트림을 전송하며, 리피터(Repeater)와 허브(Hub) 등의 장비가 동작하는 최하위 계층의 명칭을 쓰시오.",
      answer: "물리 계층",
      aliases: ["물리 계층", "물리계층", "Physical Layer", "Physical", "1계층"],
      explanation: "물리 계층(Physical Layer)은 OSI 1계층으로 데이터 전송 단위는 비트(Bit)이며 리피터, 허브, 케이블 등이 작동합니다.",
      trapPoint: "데이터링크 계층(2계층, 프레임, 스위치/브리지)과 혼동하지 않도록 1계층의 단위(Bit)와 장비(허브, 리피터)를 확인하세요."
    },
    {
      id: 18,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int i = 0, sum = 0;
    while (i < 10) {
        i++;
        if (i % 2 == 0) continue;
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "25",
      aliases: ["25"],
      explanation: "i가 0에서 시작하여 루프 안에서 먼저 i++되므로 i는 1, 2, 3, 4, 5, 6, 7, 8, 9, 10이 됩니다.\ni가 짝수(i % 2 == 0)이면 continue로 건너뛰므로 홀수만 sum에 누적됩니다.\n홀수: 1 + 3 + 5 + 7 + 9 = 25\n따라서 25가 출력됩니다.",
      trapPoint: "루프 진입 후 즉시 i++가 수행되므로 첫 번째로 검사되는 i는 0이 아니라 1입니다.",
      traceTable: {
        headers: ["루프 단계", "i 증감", "짝수 여부 (i % 2 == 0)", "sum 누적"],
        rows: [
          ["1회", "i = 1", "거짓 (홀수)", "1"],
          ["2회", "i = 2", "참 (continue)", "1"],
          ["3회", "i = 3", "거짓 (홀수)", "4"],
          ["4회", "i = 4", "참 (continue)", "4"],
          ["5회", "i = 5", "거짓 (홀수)", "9"],
          ["6회", "i = 6", "참 (continue)", "9"],
          ["7회", "i = 7", "거짓 (홀수)", "16"],
          ["8회", "i = 8", "참 (continue)", "16"],
          ["9회", "i = 9", "거짓 (홀수)", "25"],
          ["10회", "i = 10", "참 (continue)", "25"]
        ]
      }
    },
    {
      id: 19,
      category: "단답형",
      prompt: "모듈의 독립성을 나타내는 지표 중 하나로, 한 모듈 내부의 처리 요소들이 서로 관련되어 있는 정도를 나타내며 '기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적' 순으로 강도가 높은 지표의 명칭을 쓰시오.",
      answer: "응집도",
      aliases: ["응집도", "Cohesion", "cohesion"],
      explanation: "응집도(Cohesion)는 모듈 내부 구성요소 간의 밀접한 정도를 나타내며, 좋은 설계는 높은 응집도(High Cohesion)와 낮은 결합도(Low Coupling)를 가집니다.",
      trapPoint: "모듈 간의 상호 의존성을 나타내는 것은 '결합도(Coupling)'이고, 모듈 내부 구성 요소 간의 밀접도를 나타내는 것은 '응집도(Cohesion)'입니다."
    },
    {
      id: 20,
      category: "SQL",
      prompt: "다음 SQL 문의 실행 결과를 쓰시오.",
      code: `SELECT COUNT(*) 
FROM (
    SELECT DISTINCT DEPT 
    FROM EMP 
    WHERE SALARY >= 3000
) AS T;`,
      passage: `[EMP 테이블]
| ID | NAME | DEPT | SALARY |
| 1 | 이순신 | 개발 | 3500 |
| 2 | 강감찬 | 기획 | 2800 |
| 3 | 을지문덕 | 개발 | 4000 |
| 4 | 유관순 | 인사 | 3200 |
| 5 | 안중근 | 기획 | 3100 |`,
      answer: "3",
      aliases: ["3"],
      explanation: "1. WHERE SALARY >= 3000 조건 필터링:\n- ID 1 (이순신, 개발, 3500) -> 포함\n- ID 3 (을지문덕, 개발, 4000) -> 포함\n- ID 4 (유관순, 인사, 3200) -> 포함\n- ID 5 (안중근, 기획, 3100) -> 포함\n2. SELECT DISTINCT DEPT 수행: 추출된 부서는 '개발', '개발', '인사', '기획'이며 DISTINCT로 중복 제거 시 '개발', '인사', '기획' 3개 부서가 남습니다.\n3. 바깥쪽 SELECT COUNT(*)는 중복 제거된 부서 개수를 세므로 결과는 3입니다.",
      trapPoint: "DISTINCT로 중복된 '개발' 부서가 1건으로 처리되므로 총 3건입니다.",
      traceTable: {
        headers: ["필터링 조건", "추출된 레코드 (DEPT)", "DISTINCT 적용 후", "COUNT(*) 결과"],
        rows: [
          ["SALARY >= 3000", "개발, 개발, 인사, 기획", "개발, 인사, 기획 (3건)", "3"]
        ]
      }
    }
  ]
};
