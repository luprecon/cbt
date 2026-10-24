/**
 * 2025년 제2회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2025_2"] = {
  id: "2025_2",
  title: "2025년 제2회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a[3][2] = {{1, 2}, {3, 4}, {5, 6}};
    int (*p)[2] = a;
    printf("%d", *(*(p + 1) + 1));
    return 0;
}`,
      answer: "4",
      aliases: ["4"],
      explanation: "1. p는 2개 크기의 int 배열을 가리키는 배열 포인터(int (*p)[2])입니다.\n2. p + 1은 1행(두 번째 행인 {3, 4})을 가리킵니다.\n3. *(p + 1)은 1행의 시작 주소(&a[1][0])입니다.\n4. *(p + 1) + 1은 a[1][1]의 주소입니다.\n5. 역참조 *(*(p + 1) + 1)은 a[1][1]의 값인 4입니다.",
      trapPoint: "a[i][j]는 *(*(a + i) + j)와 완전히 동일한 포인터 표현입니다. i=1, j=1이므로 a[1][1] = 4입니다.",
      traceTable: {
        headers: ["포인터 표현", "의미", "값 / 주소"],
        rows: [
          ["p", "a[0]의 주소", "&a[0][0]"],
          ["p + 1", "a[1]의 주소", "&a[1][0]"],
          ["*(p + 1)", "a[1] 배열의 시작 주소", "&a[1][0]"],
          ["*(p + 1) + 1", "a[1][1]의 주소", "&a[1][1]"],
          ["*(*(p + 1) + 1)", "a[1][1]의 원소 값", "4"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int x = 10;
        int y = 20;
        boolean b = (x > 5) && (y++ > 25);
        System.out.println(b + " " + y);
    }
}`,
      answer: "false 21",
      aliases: ["false 21", "false, 21", "false,21"],
      explanation: "1. (x > 5)는 10 > 5이므로 참(true)입니다.\n2. && 연산에서 앞 조건이 참이므로 단락 평가(Short-circuit)되지 않고 뒤 조건 (y++ > 25)가 실행됩니다.\n3. y(20) > 25는 거짓(false)이므로 b는 false가 됩니다.\n4. 후위 증가 연산자 y++로 인해 y는 21로 1 증가합니다.\n출력: false 21",
      trapPoint: "자바에서 boolean 값은 소문자 'false'로 출력되며, 단락 평가 여부에 따른 y의 증가를 추적해야 합니다.",
      traceTable: {
        headers: ["항목", "평가 내용", "결과"],
        rows: [
          ["x > 5", "10 > 5", "true (뒷항 평가 진행)"],
          ["y++ > 25", "20 > 25 (거짓) 후 y증가", "false, y는 21"],
          ["전체 논리곱", "true && false", "false"],
          ["최종 출력", "b + ' ' + y", "false 21"]
        ]
      }
    },
    {
      id: 3,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `s = "apple,banana,cherry"
items = s.split(',')
result = "-".join(items[1:])
print(result)`,
      answer: "banana-cherry",
      aliases: ["banana-cherry"],
      explanation: "1. split(',')에 의해 items = ['apple', 'banana', 'cherry']가 됩니다.\n2. items[1:]는 인덱스 1부터 끝까지이므로 ['banana', 'cherry']입니다.\n3. '-'.join(...)은 두 요소를 '-' 기호로 연결하므로 'banana-cherry'가 됩니다.",
      trapPoint: "슬라이싱 items[1:]에서 0번 인덱스인 'apple'이 제외된다는 점을 파악해야 합니다."
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int num = 29;
    int bin[8] = {0};
    int i = 0;
    while (num > 0) {
        bin[i++] = num % 2;
        num /= 2;
    }
    for (int j = i - 1; j >= 0; j--) {
        printf("%d", bin[j]);
    }
    return 0;
}`,
      answer: "11101",
      aliases: ["11101"],
      explanation: "10진수 29를 2진수로 변환하는 알고리즘입니다.\n29 / 2 = 14 나머지 1\n14 / 2 = 7  나머지 0\n7 / 2 = 3   나머지 1\n3 / 2 = 1   나머지 1\n1 / 2 = 0   나머지 1\n역순으로 출력하면 11101(2) 입니다.",
      trapPoint: "나머지를 배열에 넣은 후 역순(i-1부터 0까지)으로 출력하므로 정확한 2진수 비트열이 됩니다.",
      traceTable: {
        headers: ["단계", "num 값", "num % 2 (bin[i])", "num / 2 (다음 num)"],
        rows: [
          ["1회", "29", "1", "14"],
          ["2회", "14", "0", "7"],
          ["3회", "7", "1", "3"],
          ["4회", "3", "1", "1"],
          ["5회", "1", "1", "0 (종료)"],
          ["역순출력", "-", "-", "11101"]
        ]
      }
    },
    {
      id: 5,
      category: "SQL",
      prompt: "다음 [성적] 테이블에서 과목(SUBJECT)이 '데이터베이스'인 학생들의 점수(SCORE) 내림차순으로 정렬하여 조회하는 SQL 문이다. 빈칸 (1), (2)를 완성하시오.",
      passage: `SELECT NAME, SCORE 
FROM 성적 
WHERE SUBJECT = '데이터베이스' 
(  1  ) (  2  ) SCORE (  3  );`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ORDER", "order"],
        "2": ["BY", "by"],
        "3": ["DESC", "desc"]
      },
      answer: "(1) ORDER, (2) BY, (3) DESC",
      aliases: ["ORDER BY DESC", "ORDER, BY, DESC"],
      explanation: "정렬은 ORDER BY절을 사용하며 내림차순 정렬 키워드는 DESC(Descending)입니다 (오름차순은 ASC).",
      trapPoint: "내림차순은 DESC, 오름차순은 ASC입니다."
    },
    {
      id: 6,
      category: "단답형",
      prompt: "소프트웨어 응집도(Cohesion) 중 가장 응집도가 높은(가장 바람직한) 유형으로, 모듈 내부의 모든 기능 요소들이 단 하나의 명확한 고유 목적만을 수행하도록 구성된 응집도의 명칭을 쓰시오.",
      answer: "기능적 응집도",
      aliases: ["기능적 응집도", "기능적응집도", "Functional Cohesion", "기능적"],
      explanation: "기능적 응집도(Functional Cohesion)는 모듈 내의 모든 요소가 단 하나의 단일 기능을 완벽히 수행하기 위해 모여 있는 가장 이상적인 응집도입니다.",
      trapPoint: "응집도 최고봉 = 기능적(Functional), 최악 = 우연적(Coincidental)."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String str1 = new String("Java");
        String str2 = new String("Java");
        boolean b1 = (str1 == str2);
        boolean b2 = str1.equals(str2);
        System.out.println(b1 + " " + b2);
    }
}`,
      answer: "false true",
      aliases: ["false true", "false, true", "false,true"],
      explanation: "1. `new String(\"Java\")`로 생성된 두 객체는 서로 다른 힙(Heap) 메모리 주소를 가집니다.\n2. `==` 연산자는 객체의 주소값을 비교하므로 b1은 false입니다.\n3. `equals()` 메서드는 문자열의 실제 내용 값을 비교하므로 b2는 true입니다.\n출력: false true",
      trapPoint: "자바에서 객체의 참조 주소 비교(==)와 내용 비교(equals)의 차이점입니다.",
      traceTable: {
        headers: ["연산", "비교 대상", "결과"],
        rows: [
          ["str1 == str2", "메모리 힙 주소 비교 (서로 다른 new 객체)", "false"],
          ["str1.equals(str2)", "문자열 내용 비교 ('Java' == 'Java')", "true"]
        ]
      }
    },
    {
      id: 8,
      category: "단답형",
      prompt: "데이터베이스에서 데이터의 중복으로 인해 테이블을 갱신하거나 삽입, 삭제할 때 예기치 않은 부작용이나 모순이 발생하는 현상을 일컫는 용어의 명칭을 쓰시오.",
      answer: "이상 현상",
      aliases: ["이상 현상", "이상현상", "이상", "Anomaly", "anomaly"],
      explanation: "이상(Anomaly) 현상은 릴레이션 조작 시 데이터 중복으로 인해 발생하는 부작용으로 삽입 이상, 삭제 이상, 갱신 이상 3가지가 있습니다.",
      trapPoint: "정규화를 하는 근본적인 이유는 이상(Anomaly) 현상을 방지하기 위함입니다."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 10;
    int *p1 = &a;
    int **p2 = &p1;
    **p2 += 20;
    printf("%d", a);
    return 0;
}`,
      answer: "30",
      aliases: ["30"],
      explanation: "1. p1은 a의 주소를 가리키는 1차 포인터입니다.\n2. p2는 p1의 주소를 가리키는 2차(이중) 포인터입니다.\n3. *p2는 p1이고, **p2는 p1이 가리키는 a 변수 자체입니다.\n4. **p2 += 20은 a += 20을 의미하므로 a는 10 + 20 = 30이 됩니다.",
      trapPoint: "이중 포인터의 역참조(**p2)가 가리키는 원본 변수가 a임을 추적해야 합니다."
    },
    {
      id: 10,
      category: "단답형",
      prompt: "공개키(비대칭키) 암호화 알고리즘 중 큰 정수의 소인수분해의 수학적 어려움에 기반하여 설계된 전 세계적으로 널리 사용되는 암호화 알고리즘의 명칭(영문 약어 3글자)을 쓰시오.",
      answer: "RSA",
      aliases: ["RSA", "rsa", "Rivest Shamir Adleman"],
      explanation: "RSA는 로널드 라이베스트, 아디 샤미르, 레너드 애들먼 3인이 개발한 공개키 암호 알고리즘으로 큰 수의 소인수분해 난이도에 기반합니다.",
      trapPoint: "이산대수에 기반한 알고리즘은 Diffie-Hellman / DSA / ECC이며, 소인수분해 기반은 RSA입니다."
    },
    {
      id: 11,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(sorted(list(a ^ b)))`,
      answer: "[1, 2, 5, 6]",
      aliases: ["[1, 2, 5, 6]", "[1,2,5,6]", "1, 2, 5, 6"],
      explanation: "집합(set)의 `^` 연산자는 대칭 차집합(Symmetric Difference)입니다.\n두 집합의 합집합에서 교집합 {3, 4}를 제외한 나머지 원소들의 집합 {1, 2, 5, 6}이 됩니다.\nsorted()에 의해 정렬된 리스트 [1, 2, 5, 6]이 출력됩니다.",
      trapPoint: "대칭차집합 기호 `^`는 교집합을 제외한 양쪽 고유 원소들의 합집합입니다."
    },
    {
      id: 12,
      category: "단답형",
      prompt: "네트워크 토폴로지 중 중앙에 컴퓨터나 허브/스위치가 위치하고 모든 단말 장치가 중앙 장치와 1:1 포인트 투 포인트로 연결된 형태로, 설치 및 유지보수가 용이하지만 중앙 장치 고장 시 전체 통신망이 마비되는 구조의 명칭을 한글 또는 영문으로 쓰시오.",
      answer: "성형",
      aliases: ["성형", "성형 토폴로지", "스타형", "스타형 토폴로지", "Star", "star"],
      explanation: "성형(Star, 성형 구조)은 중앙 집중형 구조로 허브나 스위치가 중심이 되며 현대 LAN의 기본 형태입니다.",
      trapPoint: "버스형, 링형, 성형, 망형(Mesh)의 각 장단점을 비교하여 기억해야 합니다."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            if (i > 5) break;
            sum += i;
        }
        System.out.println(sum);
    }
}`,
      answer: "15",
      aliases: ["15"],
      explanation: "i가 1부터 5까지는 sum에 더해져 1 + 2 + 3 + 4 + 5 = 15가 됩니다.\ni가 6이 되는 순간 i > 5 조건이 참이 되어 break문으로 루프를 즉시 탈출합니다.\n따라서 15가 출력됩니다.",
      trapPoint: "break는 루프를 완전히 종료시키므로 6부터 10까지는 연산되지 않습니다."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "기존 테이블 [STUDENT]에 'EMAIL' 컬럼(데이터타입: VARCHAR(50))을 새로 추가하는 SQL 문을 완성하고자 한다. 빈칸 (1), (2)를 완성하시오.",
      passage: `ALTER TABLE STUDENT (  1  ) (  2  ) VARCHAR(50);`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["ADD", "add"],
        "2": ["EMAIL", "email"]
      },
      answer: "(1) ADD, (2) EMAIL",
      aliases: ["ADD EMAIL", "ADD, EMAIL", "add email"],
      explanation: "테이블에 새로운 컬럼을 추가하는 DDL 문법은 `ALTER TABLE 테이블명 ADD 컬럼명 데이터타입;` 입니다.",
      trapPoint: "새로운 컬럼 추가는 ADD 키워드를 사용합니다."
    },
    {
      id: 15,
      category: "단답형",
      prompt: "소프트웨어 테스트 기법 중 프로그램의 내부 논리 구조(제어 흐름, 코드 경로)를 참조하지 않고, 오직 요구사항 명세서와 입출력 인터페이스만을 기반으로 기능의 정상 동작을 검증하는 테스트 기법의 명칭을 쓰시오.",
      answer: "블랙박스 테스트",
      aliases: ["블랙박스 테스트", "블랙박스테스트", "Black Box Test", "Black-box Testing", "블랙박스"],
      explanation: "블랙박스 테스트(Black-box Test)는 내부 코드를 보지 않고 동등 분할, 경계값 분석, 원인-결과 그래프 등을 이용해 입력 대비 출력 결과를 검증합니다.",
      trapPoint: "내부 로직을 들여다보는 것은 화이트박스 테스트(White-box Test)입니다."
    },
    {
      id: 16,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char str[] = "apple";
    int cnt = 0;
    for (int i = 0; str[i] != '\\0'; i++) {
        if (str[i] == 'p') {
            cnt++;
        }
    }
    printf("%d", cnt);
    return 0;
}`,
      answer: "2",
      aliases: ["2"],
      explanation: "문자열 \"apple\"에서 문자 'p'의 등장 횟수를 셉니다.\n'a', 'p', 'p', 'l', 'e' 중 'p'는 2개이므로 cnt = 2가 됩니다.",
      trapPoint: "간단한 문자열 문자 개수 카운팅 문제입니다."
    },
    {
      id: 17,
      category: "단답형",
      prompt: "데이터 통신 프로토콜의 3대 요소를 모두 쓰시오.",
      answer: "구문, 의미, 타이밍",
      aliases: ["구문, 의미, 타이밍", "구문 의미 타이밍", "구문,의미,타이밍", "Syntax, Semantics, Timing"],
      explanation: "프로토콜의 기본 3대 요소:\n1. 구문(Syntax): 데이터 형식, 부호화, 신호 레벨\n2. 의미(Semantics): 제어 정보 및 에러 처리\n3. 타이밍(Timing): 속도 조절 및 순서 관리",
      trapPoint: "실기 시험에서 꾸준히 출제되는 프로토콜 기본 이론 단답형입니다."
    },
    {
      id: 18,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30};
        modify(arr);
        System.out.println(arr[0]);
    }
    static void modify(int[] a) {
        a[0] = 99;
    }
}`,
      answer: "99",
      aliases: ["99"],
      explanation: "Java에서 배열은 객체(참조형 타입)이므로 메서드 매개변수로 전달될 때 주소값(참조)이 복사되어 전달됩니다.\nmodify 함수 내부에서 a[0] = 99로 수정하면 원본 배열 arr[0]의 값도 99로 변경됩니다.",
      trapPoint: "배열이나 객체는 참조 전달 방식으로 인해 메서드 내에서의 변경이 원본에 반영됩니다."
    },
    {
      id: 19,
      category: "단답형",
      prompt: "관계 데이터 모델에서 하나의 속성(Attribute)이 가질 수 있는 모든 유효한 값들의 집합을 의미하는 용어의 명칭을 한글 또는 영문으로 쓰시오.",
      answer: "도메인",
      aliases: ["도메인", "Domain", "domain"],
      explanation: "도메인(Domain)은 테이블의 특정 속성이 취할 수 있는 원자값들의 범위/집합을 의미합니다 (예: 성별 속성의 도메인은 {남, 여}).",
      trapPoint: "릴레이션의 튜플 수를 카디널리티(Cardinality), 속성 수를 차수(Degree), 속성 값의 범위를 도메인(Domain)이라 합니다."
    },
    {
      id: 20,
      category: "SQL",
      prompt: "다음 SQL 문의 결과로 출력되는 행(Row)의 수를 숫자로 쓰시오.",
      code: `SELECT DISTINCT DEPT_ID FROM EMPLOYEES WHERE SALARY > 5000;`,
      passage: `[EMPLOYEES 테이블]
| EMP_ID | DEPT_ID | SALARY |
| 1 | 10 | 6000 |
| 2 | 20 | 4500 |
| 3 | 10 | 7000 |
| 4 | 30 | 5500 |
| 5 | 20 | 5200 |`,
      answer: "3",
      aliases: ["3", "3개", "3행"],
      explanation: "WHERE SALARY > 5000 조건을 만족하는 레코드는:\n- EMP_ID 1: DEPT_ID 10, SALARY 6000\n- EMP_ID 3: DEPT_ID 10, SALARY 7000\n- EMP_ID 4: DEPT_ID 30, SALARY 5500\n- EMP_ID 5: DEPT_ID 20, SALARY 5200\n추출된 DEPT_ID는 10, 10, 30, 20이며, DISTINCT에 의해 중복 제거되면 {10, 20, 30} 3개가 됩니다.\n따라서 출력되는 행의 수는 3입니다.",
      trapPoint: "DISTINCT로 인해 중복된 부서코드 10이 하나로 묶여 3개 행이 출력됩니다."
    }
  ]
};
