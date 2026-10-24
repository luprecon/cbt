/**
 * [언어별] C언어 기출 15문항 (포인터, 배열, 문자열, 구조체, 재귀, 비트연산)
 * 정보처리기사 실기 C언어 주요 출제 유형
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["c_special"] = {
  id: "c_special",
  title: "[언어별] C언어 기출 15문항",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a[5] = {10, 20, 30, 40, 50};
    int *p = a;
    printf("%d, %d", *(p + 2), *p + 2);
    return 0;
}`,
      answer: "30, 12",
      aliases: ["30, 12", "30,12", "30 12"],
      explanation: "1. p는 배열 a의 첫 번째 원소 a[0](10)의 주소를 가집니다.\n2. *(p + 2)는 p에서 2칸 이동한 주소(&a[2])의 역참조이므로 a[2]의 값 30입니다.\n3. *p + 2는 *p(즉 a[0]=10)에 정수 2를 더한 것이므로 10 + 2 = 12입니다.\n연산자 우선순위 차이: 괄호 *(p+2) vs *p + 2",
      trapPoint: "*(p + 2)는 포인터 주소 연산 후 역참조(30)이고, *p + 2는 역참조 후 2를 덧셈(12)하는 우선순위의 차이를 구별해야 합니다.",
      traceTable: {
        headers: ["수식", "연산 순서", "결과값"],
        rows: [
          ["*(p + 2)", "p+2 위치(a[2]) 참조", "30"],
          ["*p + 2", "*p(10) 참조 후 + 2", "12"]
        ]
      }
    },
    {
      id: 2,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};
    int (*p)[3] = arr;
    printf("%d", *(*(p + 1) + 1));
    return 0;
}`,
      answer: "5",
      aliases: ["5"],
      explanation: "1. p는 '크기가 3인 1차원 배열을 가리키는 포인터(배열 포인터)'입니다.\n2. p + 1은 arr[1]의 시작 주소를 가리킵니다.\n3. *(p + 1) + 1은 arr[1][1]의 주소를 가리킵니다.\n4. *(*(p + 1) + 1)은 arr[1][1]의 값인 5를 역참조합니다.",
      trapPoint: "배열 포인터 p + 1은 1행(arr[1]) 전체를 건너뛰며, 뒤의 + 1은 열 인덱스 1로 이동합니다. arr[1][1] = 5입니다.",
      traceTable: {
        headers: ["단계", "포인터 식", "가리키는 메모리", "값"],
        rows: [
          ["1단계", "p + 1", "&arr[1][0]", "arr[1]의 시작 주소"],
          ["2단계", "*(p + 1) + 1", "&arr[1][1]", "arr[1][1] 주소"],
          ["3단계", "*(*(p + 1) + 1)", "arr[1][1]", "5"]
        ]
      }
    },
    {
      id: 3,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void swap(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}

int main() {
    int a = 10, b = 20;
    swap(&a, &b);
    printf("%d %d", a, b);
    return 0;
}`,
      answer: "20 10",
      aliases: ["20 10", "20, 10", "20,10"],
      explanation: "swap 함수에 변수 a와 b의 주소(&a, &b)를 전달하는 Call by Reference(참조에 의한 호출)입니다.\n함수 내부에서 포인터 역참조를 통해 main의 a와 b의 실제 메모리 값을 맞교환하므로 a는 20, b는 10이 됩니다.",
      trapPoint: "주소(&)를 전달했으므로 원본 변수의 값이 직접 변경됩니다.",
      traceTable: {
        headers: ["시점", "변수 a", "변수 b", "비고"],
        rows: [
          ["호출 전", "10", "20", "main 지역변수"],
          ["swap 내부", "*x(20)", "*y(10)", "역참조 교환"],
          ["호출 후", "20", "10", "최종 출력"]
        ]
      }
    },
    {
      id: 4,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int f(int n) {
    if (n <= 1) return 1;
    return n * f(n - 1);
}

int main() {
    printf("%d", f(5));
    return 0;
}`,
      answer: "120",
      aliases: ["120"],
      explanation: "f(n)은 n의 팩토리얼(n!)을 계산하는 재귀 함수입니다.\nf(5) = 5 * f(4) = 5 * 4 * f(3) = 5 * 4 * 3 * f(2) = 5 * 4 * 3 * 2 * f(1) = 5 * 4 * 3 * 2 * 1 = 120 입니다.",
      trapPoint: "기저 조건(n <= 1)에서 1을 반환하며 스택이 되돌아오며 곱해집니다.",
      traceTable: {
        headers: ["호출 깊이", "함수 호출", "반환식", "계산값"],
        rows: [
          ["depth 1", "f(5)", "5 * f(4)", "5 * 24 = 120"],
          ["depth 2", "f(4)", "4 * f(3)", "4 * 6 = 24"],
          ["depth 3", "f(3)", "3 * f(2)", "3 * 2 = 6"],
          ["depth 4", "f(2)", "2 * f(1)", "2 * 1 = 2"],
          ["depth 5", "f(1)", "1 (기저조건)", "1"]
        ]
      }
    },
    {
      id: 5,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char str[] = "KOREA";
    char *p = str + 4;
    while (p >= str) {
        printf("%c", *p);
        p--;
    }
    return 0;
}`,
      answer: "AEROK",
      aliases: ["AEROK"],
      explanation: "1. str은 'KOREA' 문자열 배열로 str[0]='K', str[1]='O', str[2]='R', str[3]='E', str[4]='A'입니다.\n2. p = str + 4는 'A'의 위치를 가리킵니다.\n3. p >= str 동안 역순으로 출력하며 p를 1씩 감소시키므로 'A', 'E', 'R', 'O', 'K' 순으로 출력되어 AEROK가 됩니다.",
      trapPoint: "문자열의 끝 문자 'A'부터 시작 주소 'K'까지 역순으로 순회 출력됩니다.",
      traceTable: {
        headers: ["루프", "가리키는 주소", "*p 문자", "출력 누적"],
        rows: [
          ["1회차", "str + 4", "'A'", "A"],
          ["2회차", "str + 3", "'E'", "AE"],
          ["3회차", "str + 2", "'R'", "AER"],
          ["4회차", "str + 1", "'O'", "AERO"],
          ["5회차", "str + 0", "'K'", "AEROK"]
        ]
      }
    },
    {
      id: 6,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

void count() {
    static int x = 0;
    int y = 0;
    x++;
    y++;
    printf("%d%d", x, y);
}

int main() {
    count();
    count();
    return 0;
}`,
      answer: "1121",
      aliases: ["1121", "1 1 2 1"],
      explanation: "1. static 변수 x는 프로그램 시작 시 정적 메모리에 단 한 번 0으로 초기화되며 함수가 끝나도 값이 유지됩니다.\n2. 일반 지역변수 y는 count()가 호출될 때마다 스택에 새로 생성되어 0으로 초기화됩니다.\n3. 첫 번째 count(): x=1, y=1 -> 출력 '11'\n4. 두 번째 count(): x=2(유지된 1에서 증가), y=1(새로 초기화) -> 출력 '21'\n최종 연속 출력: 1121",
      trapPoint: "정적 변수(static)는 함수가 반환되어도 소멸하지 않고 값이 누적된다는 점이 핵심입니다.",
      traceTable: {
        headers: ["함수 호출", "static x 변화", "auto y 변화", "출력값"],
        rows: [
          ["1번째 count()", "0 -> 1", "0 -> 1", "11"],
          ["2번째 count()", "1 -> 2", "0 -> 1", "21"]
        ]
      }
    },
    {
      id: 7,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

struct Student {
    int id;
    int score;
};

int main() {
    struct Student s[2] = {{1, 80}, {2, 95}};
    struct Student *p = s;
    p++;
    printf("%d, %d", p->id, p->score);
    return 0;
}`,
      answer: "2, 95",
      aliases: ["2, 95", "2,95", "2 95"],
      explanation: "1. s는 Student 구조체 2개짜리 배열입니다. s[0]={1,80}, s[1]={2,95}\n2. p는 구조체 포인터로 s[0]을 가리키다가 p++에 의해 다음 구조체인 s[1]을 가리킵니다.\n3. p->id는 s[1].id인 2이고, p->score는 s[1].score인 95입니다.\n출력: 2, 95",
      trapPoint: "구조체 포인터 증가(p++)는 구조체 크기(sizeof(Student))만큼 주소가 증가하여 다음 원소인 s[1]을 가리킵니다."
    },
    {
      id: 8,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 12; // 2진수: 0000 1100
    int b = 10; // 2진수: 0000 1010
    int c = a ^ b;
    int d = a & b;
    printf("%d, %d", c, d);
    return 0;
}`,
      answer: "6, 8",
      aliases: ["6, 8", "6,8", "6 8"],
      explanation: "1. a = 12 (1100₂), b = 10 (1010₂)\n2. XOR 연산 (^)은 두 비트가 서로 다를 때 1: 1100 ^ 1010 = 0110₂ = 6\n3. AND 연산 (&)은 두 비트가 모두 1일 때 1: 1100 & 1010 = 1000₂ = 8\n따라서 6, 8이 출력됩니다.",
      trapPoint: "XOR(^)은 배타적 논리합으로 같으면 0, 다르면 1입니다."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int x = 5;
    int y = (x > 3) ? (x < 10 ? 100 : 200) : 300;
    printf("%d", y);
    return 0;
}`,
      answer: "100",
      aliases: ["100"],
      explanation: "삼항 조건 연산자의 중첩입니다.\n1. x > 3 은 5 > 3 이므로 참(True)입니다.\n2. 참이므로 (x < 10 ? 100 : 200)이 평가됩니다.\n3. 5 < 10 은 참이므로 100이 선택됩니다.\n결과: 100",
      trapPoint: "중첩된 삼항 연산자의 조건 평가 흐름을 차례대로 추적합니다."
    },
    {
      id: 10,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) continue;
        if (i > 7) break;
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
      answer: "16",
      aliases: ["16"],
      explanation: "1. 루프 i = 1부터 10까지:\n- i=1: 홀수, sum = 1\n- i=2: 짝수 continue\n- i=3: 홀수, sum = 1 + 3 = 4\n- i=4: 짝수 continue\n- i=5: 홀수, sum = 4 + 5 = 9\n- i=6: 짝수 continue\n- i=7: 홀수, sum = 9 + 7 = 16\n- i=8: i%2==0 continue\n- i=9: i > 7 이므로 break로 반복문 탈출!\n따라서 sum = 16 입니다.",
      trapPoint: "i=9일 때 break를 만나 루프가 즉시 종료되므로 i=9는 sum에 더해지지 않습니다.",
      traceTable: {
        headers: ["i 값", "i % 2 == 0", "i > 7", "sum 누적"],
        rows: [
          ["1", "거짓", "거짓", "1"],
          ["2", "참(continue)", "-", "1"],
          ["3", "거짓", "거짓", "4"],
          ["4", "참(continue)", "-", "4"],
          ["5", "거짓", "거짓", "9"],
          ["6", "참(continue)", "-", "9"],
          ["7", "거짓", "거짓", "16"],
          ["8", "참(continue)", "-", "16"],
          ["9", "거짓", "참(break)", "16 (탈출)"]
        ]
      }
    },
    {
      id: 11,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int add(int a, int b) { return a + b; }
int mul(int a, int b) { return a * b; }

int main() {
    int (*fp)(int, int);
    fp = add;
    int res1 = fp(3, 4);
    fp = mul;
    int res2 = fp(res1, 2);
    printf("%d", res2);
    return 0;
}`,
      answer: "14",
      aliases: ["14"],
      explanation: "1. int (*fp)(int, int)는 매개변수 두 개(int, int)를 받아 int를 반환하는 함수 포인터입니다.\n2. fp = add 일 때 fp(3, 4)는 3 + 4 = 7을 반환하여 res1 = 7이 됩니다.\n3. fp = mul 일 때 fp(7, 2)는 7 * 2 = 14를 반환하여 res2 = 14가 됩니다.\n따라서 출력은 14입니다.",
      trapPoint: "함수 포인터를 통해 동적으로 호출할 함수를 변경할 수 있습니다."
    },
    {
      id: 12,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int a = 1;
    int b = a << 3;
    int c = b >> 1;
    printf("%d, %d", b, c);
    return 0;
}`,
      answer: "8, 4",
      aliases: ["8, 4", "8,4", "8 4"],
      explanation: "1. 비트 좌측 시프트(<<)는 2를 곱하는 효과가 있습니다: 1 << 3 = 1 * 2³ = 8\n2. 비트 우측 시프트(>>)는 2로 나누는 효과가 있습니다: 8 >> 1 = 8 / 2¹ = 4\n따라서 8, 4가 출력됩니다.",
      trapPoint: "시프트 연산자: a << n은 a * 2^n, a >> n은 a / 2^n 입니다."
    },
    {
      id: 13,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int arr[5] = {5, 4, 3, 2, 1};
    int temp;
    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    printf("%d %d %d", arr[0], arr[2], arr[4]);
    return 0;
}`,
      answer: "1 3 5",
      aliases: ["1 3 5", "1, 3, 5", "1,3,5"],
      explanation: "주어진 코드는 버블 정렬(Bubble Sort)을 오름차순으로 수행하는 알고리즘입니다.\n원래 배열 {5, 4, 3, 2, 1}이 정렬된 후 {1, 2, 3, 4, 5}가 됩니다.\narr[0] = 1, arr[2] = 3, arr[4] = 5 이므로 '1 3 5'가 출력됩니다.",
      trapPoint: "버블 정렬 후 인덱스 0, 2, 4 위치의 원소를 골라 공백 구분으로 출력합니다."
    },
    {
      id: 14,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char s[] = "Information";
    printf("%c%c", *(s + 2), s[5]);
    return 0;
}`,
      answer: "fm",
      aliases: ["fm", "f m"],
      explanation: "문자열 'Information':\n인덱스: 0:I, 1:n, 2:f, 3:o, 4:r, 5:m, 6:a, 7:t, 8:i, 9:o, 10:n\n*(s + 2)는 s[2]인 'f'\ns[5]는 'm'\n따라서 fm 이 출력됩니다.",
      trapPoint: "C언어 배열 인덱스는 0부터 시작하므로 s[2]는 3번째 글자 'f', s[5]는 6번째 글자 'm'입니다."
    },
    {
      id: 15,
      category: "C",
      prompt: "다음 C언어 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

int main() {
    printf("%d", gcd(48, 18));
    return 0;
}`,
      answer: "6",
      aliases: ["6"],
      explanation: "유클리드 호제법(Euclidean Algorithm)을 이용한 최대공약수(GCD) 계산 재귀함수입니다.\n1. gcd(48, 18) -> 48 % 18 = 12 -> gcd(18, 12)\n2. gcd(18, 12) -> 18 % 12 = 6 -> gcd(12, 6)\n3. gcd(12, 6) -> 12 % 6 = 0 -> gcd(6, 0)\n4. b == 0 이므로 a인 6을 반환합니다.\n출력: 6",
      trapPoint: "유클리드 호제법의 원리 gcd(a, b) = gcd(b, a % b)와 b가 0이 될 때의 a가 최대공약수입니다."
    }
  ]
};
