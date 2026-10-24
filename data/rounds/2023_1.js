/**
 * 2023년 제1회 정보처리기사 실기 기출 복원 (20문항)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["2023_1"] = {
  id: "2023_1",
  title: "2023년 제1회 기출 복원",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Static {
    public int a = 20;
    static int b = 0;
}

public class Main {
    public static void main(String[] args) {
        int a;
        a = 10;
        Static.b = a;

        Static st = new Static();

        System.out.println(Static.b++);
        System.out.println(st.b);
        System.out.println(a);
        System.out.print(st.a);
    }
}`,
      answer: "10 11 10 20",
      aliases: ["10 11 10 20", "10, 11, 10, 20", "10,11,10,20", "10\n11\n10\n20"],
      explanation: "1. a = 10, Static.b = 10;\n2. Static.b++: 후위 증가이므로 10을 먼저 출력하고 Static.b는 11이 됨.\n3. st.b: static 변수이므로 11 출력.\n4. a: 지역변수 a의 값인 10 출력.\n5. st.a: 인스턴스 변수 a의 값인 20 출력.",
      trapPoint: "Static.b++는 후위 증가 연산자이므로 현재 값인 10이 먼저 출력된 후 11로 증가합니다. st.b는 static 공유 변수이므로 증가된 11이 반영됩니다.",
      traceTable: {
        headers: ["단계", "실행 코드", "출력", "Static.b", "st.a", "지역 a"],
        rows: [
          ["1", "Static.b = a (10)", "-", "10", "20", "10"],
          ["2", "println(Static.b++)", "10", "11", "20", "10"],
          ["3", "println(st.b)", "11", "11", "20", "10"],
          ["4", "println(a)", "10", "11", "20", "10"],
          ["5", "print(st.a)", "20", "11", "20", "10"]
        ]
      }
    },
    {
      id: 2,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char a[] = "Art";
    char* p = NULL;
    p = a;

    printf("%s\\n", a);
    printf("%c\\n", *p);
    printf("%c\\n", *a);
    printf("%s\\n", p);

    for (int i = 0; a[i] != '\\0'; i++)
        printf("%c", a[i]);

    return 0;
}`,
      answer: "Art A A Art Art",
      aliases: ["Art A A Art Art", "Art, A, A, Art, Art", "Art\nA\nA\nArt\nArt"],
      explanation: "1. printf(\"%s\\n\", a): 문자열 배열 a 전체 \"Art\" 출력.\n2. printf(\"%c\\n\", *p): 포인터 p가 가리키는 첫 번째 문자 'A' 출력.\n3. printf(\"%c\\n\", *a): 배열 이름 a는 첫 번째 원소 주소이므로 *a는 'A' 출력.\n4. printf(\"%s\\n\", p): 포인터 p가 가리키는 문자열 \"Art\" 출력.\n5. for 루프: NULL 문자 전까지 한 글자씩 출력하므로 \"Art\" 출력.",
      trapPoint: "%s 서식 지정자는 문자열 전체를 출력하고, %c 서식 지정자는 단일 문자 하나만 출력합니다."
    },
    {
      id: 3,
      category: "C",
      prompt: "다음 C언어로 작성된 프로그램의 실행 결과를 쓰시오.",
      code: `#include <stdio.h>

int main() {
    char* a = "qwer";
    char* b = "qwtety";

    for (int i = 0; a[i] != '\\0'; i++) {
        for (int j = 0; b[j] != '\\0'; j++) {
            if (a[i] == b[j]) printf("%c", a[i]);
        }
    }
    return 0;
}`,
      answer: "qwe",
      aliases: ["qwe", "QWE"],
      explanation: "문자열 a (\"qwer\")의 각 문자가 문자열 b (\"qwtety\")에 포함되어 있는지 검사합니다.\n- a[0] = 'q': b[0] ('q')와 일치 -> 'q' 출력\n- a[1] = 'w': b[1] ('w')와 일치 -> 'w' 출력\n- a[2] = 'e': b[3] ('e')와 일치 -> 'e' 출력\n- a[3] = 'r': b에 없음\n따라서 최종 출력은 \"qwe\"입니다.",
      trapPoint: "a 문자열 순서대로 b에 존재하는지 비교하므로 q, w, e가 순서대로 출력됩니다."
    },
    {
      id: 4,
      category: "네트워크",
      prompt: "다음 설명에서 괄호에 들어갈 알맞은 용어(Full Name 또는 약어)를 쓰시오.",
      passage: `(      )은/는 비동기적인 웹 애플리케이션 제작을 위해 JavaScript와 XML을 이용한 비동기적 정보 교환 기법이다.
(      )은/는 필요한 데이터만을 웹서버에 요청해서 받은 후 클라이언트에서 데이터에 대한 처리를 할 수 있다.
보통 SOAP이나 XML 기반 웹 서비스 프로토콜이 사용되며, 웹 서버 응답 처리를 위해 클라이언트 쪽에서는 자바스크립트를 사용한다.
Google Maps 등에서 적극 활용되어 대중화되었다.`,
      answer: "AJAX",
      aliases: ["AJAX", "Ajax", "ajax", "Asynchronous JavaScript and XML"],
      explanation: "AJAX(Asynchronous JavaScript and XML)는 웹 페이지 전체를 새로고침하지 않고도 백그라운드에서 서버와 비동기적으로 데이터를 주고받을 수 있게 하는 웹 개발 기술입니다.",
      trapPoint: "비동기(Asynchronous) 자바스크립트와 XML의 조합으로 페이지 새로고침 없는 동적 로딩이 핵심입니다."
    },
    {
      id: 5,
      category: "네트워크",
      prompt: "다음 설명을 확인하여 표 안의 빈칸 (1), (2)에 알맞은 패킷 교환 방식의 용어를 각각 쓰시오.",
      passage: `| 구분 | 설명 |
| --- | --- |
| ( 1 ) | - 회선교환 방식과 데이터그램 방식의 장점을 결합한 통신 기술이다.<br>- 첫 패킷으로 최적 경로를 설정(고정)하고, 그 이후 패킷들을 고속으로 전송한다.<br>- 연결 지향형 통신이며, 송수신 순서가 보장된다. (대표 기술: ATM, X.25) |
| ( 2 ) | - 각 전송 패킷을 미리 정해진 경로 없이 독립적으로 처리하여 교환하는 방식이다.<br>- 비연결 지향형 통신이며, 네트워크 상황에 따라 패킷마다 전송 경로가 다를 수 있다.<br>- 특정 교환기 장애 시 우회 경로를 통해 전송 가능하여 신뢰성이 높다. |`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["가상회선", "가상회선 방식", "virtual circuit", "Virtual Circuit"],
        "2": ["데이터그램", "데이터그램 방식", "datagram", "Datagram"]
      },
      answer: "(1) 가상회선, (2) 데이터그램",
      aliases: ["가상회선, 데이터그램", "가상회선 데이터그램", "Virtual Circuit, Datagram"],
      explanation: "1. 가상회선(Virtual Circuit) 방식은 연결 설정 후 고정 경로를 통해 패킷을 전송하여 순서가 보장됩니다.\n2. 데이터그램(Datagram) 방식은 독립적인 경로로 전송하는 비연결형 방식으로 순서가 바뀔 수 있어 수신측 재조립이 필요합니다.",
      trapPoint: "가상회선은 '경로 고정/순서 보장', 데이터그램은 '독립 경로/순서 보장 안 됨'으로 구별합니다."
    },
    {
      id: 6,
      category: "네트워크",
      prompt: "다음 설명에 해당하는 데이터링크 계층의 터널링 프로토콜을 쓰시오.",
      passage: `- OSI 2계층(데이터링크 계층)에서 구현되는 터널링 기술이다.
- 마이크로소프트의 PPTP와 시스코의 L2F가 결합되어 IETF 표준으로 제정된 프로토콜이다.
- 자체 암호화 기능이 없으므로 주로 IPsec과 결합하여 VPN 환경에서 사용된다.`,
      answer: "L2TP",
      aliases: ["L2TP", "l2tp", "Layer 2 Tunneling Protocol"],
      explanation: "L2TP(Layer 2 Tunneling Protocol)는 PPTP와 L2F의 장점을 결합한 2계층 터널링 프로토콜로, 암호화 기능이 없어 통상 IPsec과 함께 사용됩니다.",
      trapPoint: "PPTP + L2F 결합 2계층 터널링 프로토콜은 L2TP입니다."
    },
    {
      id: 7,
      category: "보안",
      prompt: "다음 설명에 해당하는 보안 프로토콜의 명칭을 쓰시오.",
      passage: `- 네트워크 상의 다른 컴퓨터에 안전하게 로그인하거나 원격 명령을 실행할 수 있도록 해주는 프로토콜이다.
- 기본 포트 번호는 22번이다.
- 기존의 안전하지 않은 rlogin, rsh, telnet 등을 대체하기 위해 설계되었으며, 모든 전송 데이터를 암호화한다.`,
      answer: "SSH",
      aliases: ["SSH", "ssh", "Secure Shell"],
      explanation: "SSH(Secure Shell)는 기본 포트 22번을 사용하며, 암호화되지 않은 텔넷(Telnet, 23번) 등을 대체하여 안전한 원격 터미널 접속 및 파일 전송을 제공하는 프로토콜입니다.",
      trapPoint: "기본 포트 22번과 원격 암호화 접속 키워드로 SSH를 유추할 수 있습니다."
    },
    {
      id: 8,
      category: "보안",
      prompt: "다음 설명에 해당하는 악성코드 유형을 보기에서 찾아 쓰시오.",
      passage: `[보기: 웜, 트로이 목마, 바이러스, 랜섬웨어, 스파이웨어]

( 1 ) 다른 프로그램에 기생하지 않고 독자적으로 실행되며, 네트워크를 통해 스스로 복제하여 다른 컴퓨터로 전파되는 악성 프로그램
( 2 ) 정상적인 프로그램으로 위장하여 사용자가 직접 설치하도록 유도하며, 시스템 내부에 백도어를 설치하거나 정보를 유출하지만 자기 복제 능력은 없음
( 3 ) 정상 파일에 감염되는 형태로 기생하며, 감염 대상 파일이 실행될 때 함께 실행되고 자기 복제 능력이 있음`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["웜", "worm", "Worm"],
        "2": ["트로이 목마", "트로이목마", "trojan", "Trojan", "Trojan Horse"],
        "3": ["바이러스", "virus", "Virus"]
      },
      answer: "(1) 웜, (2) 트로이 목마, (3) 바이러스",
      aliases: ["웜, 트로이 목마, 바이러스", "웜 트로이목마 바이러스"],
      explanation: "1. 웜(Worm): 독자 실행 가능, 네트워크를 통한 자가 복제/전파.\n2. 트로이 목마(Trojan Horse): 정상 프로그램 위장, 백도어 설치, 자가 복제 능력 없음.\n3. 바이러스(Virus): 숙주 파일에 기생, 감염을 통한 자가 복제.",
      trapPoint: "웜은 '독자적 실행 + 자가 복제', 트로이 목마는 '자가 복제 불가 + 위장', 바이러스는 '숙주 필요 + 자가 복제'입니다."
    },
    {
      id: 9,
      category: "C",
      prompt: "다음 C언어 코드에서 이진수 형태의 정수를 10진수로 변환하고자 한다. 빈칸 (a), (b)에 들어갈 연산자 및 숫자를 순서대로 쓰시오.",
      code: `#include <stdio.h>

int main() {
    int input = 101110;
    int di = 1;
    int sum = 0;

    while (1) {
        if (input == 0) break;
        else {
            sum = sum + (input ( a ) ( b )) * di;
            di = di * 2;
            input = input / 10;
        }
    }
    printf("%d", sum);
    return 0;
}`,
      answerType: "multi_blank",
      multiAnswers: {
        "a": ["%", "%"],
        "b": ["10", "10", "2", "5"]
      },
      answer: "(a) %, (b) 10",
      aliases: ["(a) %, (b) 10", "% 10", "%, 10", "(a) %, (b) 2"],
      explanation: "input에 저장된 이진수 모양의 십진수(101110)에서 각 자릿수의 숫자(0 또는 1)를 추출하려면 10으로 나눈 나머지 연산자 %(모듈로)와 10을 사용합니다.\ninput % 10을 통해 일의 자리(0 또는 1)를 구하고, di(1, 2, 4, 8, 16...)를 곱해 sum에 누적합니다.",
      trapPoint: "마지막 일의 자리 숫자를 추출하기 위해 input % 10을 수행하고, 이후 input = input / 10으로 다음 자릿수로 이동합니다."
    },
    {
      id: 10,
      category: "네트워크",
      prompt: "다음 설명에 해당하는 TCP/IP 프로토콜의 명칭(약어)을 쓰시오.",
      passage: `- TCP/IP 네트워크에서 IP 패킷을 처리할 때 발생하는 오류를 보고하고 제어 메시지를 전달하는 프로토콜이다.
- 호스트나 게이트웨이 간 통신 가능 여부를 점검하기 위한 목적으로 주로 사용된다.
- ping 명령어나 traceroute(tracert)의 기반이 되는 프로토콜이다.`,
      answer: "ICMP",
      aliases: ["ICMP", "icmp", "Internet Control Message Protocol"],
      explanation: "ICMP(Internet Control Message Protocol, 인터넷 제어 메시지 프로토콜)는 IP의 비연결성과 신뢰성 결여를 보완하기 위해 에러 보고 및 네트워크 상태 진단(ping) 메시지를 제공하는 프로토콜입니다.",
      trapPoint: "ping 명령어와 패킷 전송 오류 보고 프로토콜은 ICMP입니다."
    },
    {
      id: 11,
      category: "소프트웨어공학",
      prompt: "다음 설명에 해당하는 GoF 디자인 패턴의 명칭(영문 또는 한글)을 쓰시오.",
      passage: `- 다른 객체로의 접근을 제어하기 위해 대리자(대행자) 역할을 하는 객체를 제공하는 구조 패턴이다.
- 원본 객체에 대한 참조를 유지하면서, 실제 객체가 생성되기 전이나 접근하기 전/후에 부가 작업(캐싱, 보안 검사, 로깅 등)을 수행할 수 있다.
- 가상(Virtual), 원격(Remote), 보호(Protection) 등의 변형이 있다.`,
      answer: "Proxy",
      aliases: ["Proxy", "proxy", "프록시", "프록시 패턴", "Proxy Pattern"],
      explanation: "Proxy(프록시) 패턴은 어떤 객체에 대한 접근을 제어하기 위해 그 객체의 대리 객체(Proxy)를 중간에 두는 GoF 구조 패턴입니다.",
      trapPoint: "대리자, 대행자 역할을 수행하여 객체 접근을 제어하는 구조 패턴은 프록시(Proxy)입니다."
    },
    {
      id: 12,
      category: "데이터베이스",
      prompt: "다음 관계 데이터베이스 모델의 설명에 알맞은 용어를 각각 쓰시오.",
      passage: `( 1 ) 릴레이션(테이블)에서 행(Row)을 의미하며, 파일 구조에서는 레코드(Record)에 해당한다.
( 2 ) 어느 한 시점에 릴레이션에 저장되어 있는 튜플들의 집합(실제 데이터 전체)을 의미하며, 릴레이션 외연(Extension)이라고도 한다.
( 3 ) 하나의 릴레이션에서 튜플(행)의 전체 개수를 의미한다.`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["튜플", "tuple", "Tuple"],
        "2": ["릴레이션 인스턴스", "인스턴스", "릴레이션외연", "릴레이션 외연", "Relation Instance"],
        "3": ["카디널리티", "기수", "cardinality", "Cardinality"]
      },
      answer: "(1) 튜플, (2) 릴레이션 인스턴스, (3) 카디널리티",
      aliases: ["튜플, 릴레이션 인스턴스, 카디널리티", "튜플 인스턴스 카디널리티"],
      explanation: "1. 튜플(Tuple): 릴레이션의 각 행(Row).\n2. 릴레이션 인스턴스(Relation Instance): 특정 시점에 릴레이션에 존재하는 튜플들의 집합.\n3. 카디널리티(Cardinality): 튜플(행)의 수. (속성의 수는 차수/Degree).",
      trapPoint: "행의 개수는 카디널리티(기수), 열의 개수는 차수(Degree)입니다."
    },
    {
      id: 13,
      category: "SQL",
      prompt: "다음 [학생] 테이블에서 학생 이름이 '민수'인 튜플을 삭제하는 SQL 문을 작성하시오. (단, 문자열은 작은따옴표를 사용하고 세미콜론은 생략 가능)",
      passage: `[학생 테이블]
| 학번 | 이름 | 학년 | 전화번호 |
| 1001 | 민수 | 3 | 010-1111-2222 |
| 1002 | 영희 | 2 | 010-3333-4444 |
| 1003 | 철수 | 4 | 010-5555-6666 |`,
      answer: "DELETE FROM 학생 WHERE 이름 = '민수';",
      aliases: [
        "DELETE FROM 학생 WHERE 이름 = '민수';",
        "DELETE FROM 학생 WHERE 이름 = '민수'",
        "DELETE FROM 학생 WHERE 이름='민수';",
        "DELETE FROM 학생 WHERE 이름='민수'",
        "delete from 학생 where 이름 = '민수';",
        "delete from 학생 where 이름 = '민수'"
      ],
      explanation: "데이터 조작어(DML) 중 특정 튜플을 삭제할 때는 DELETE FROM 테이블명 WHERE 조건식을 사용합니다.\n`DELETE FROM 학생 WHERE 이름 = '민수';`",
      trapPoint: "DROP이나 TRUNCATE는 테이블 자체를 지우거나 전체를 비울 때 사용하며, 특정 조건의 튜플 삭제는 DELETE FROM ~ WHERE 문입니다."
    },
    {
      id: 14,
      category: "Java",
      prompt: "다음 Java로 구현된 버블 정렬 프로그램에서 빈칸 (1), (2)에 들어갈 올바른 변수명을 쓰시오.",
      code: `public class Sort {
    public static void swap(int[] arr, int idx1, int idx2) {
        int temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[(  1  )] = temp;
    }

    public static void Usort(int[] array, int length) {
        for (int i = 0; i < length; i++) {
            for (int j = 0; j < length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array, j, j + 1);
                }
            }
        }
    }

    public static void main(String[] args) {
        int[] item = new int[] { 5, 3, 8, 1, 2, 7 };
        int nx = 6;
        Usort(item, (  2  ));

        for (int data : item) {
            System.out.print(data + " ");
        }
    }
}`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["idx2", "idx2"],
        "2": ["nx", "nx"]
      },
      answer: "(1) idx2, (2) nx",
      aliases: ["(1) idx2, (2) nx", "idx2, nx", "idx2 nx"],
      explanation: "1. swap 함수에서 두 원소를 맞바꾸려면 arr[idx1]의 값을 temp에 보관한 뒤 arr[idx1]에 arr[idx2]를 넣고, arr[idx2]에 temp를 넣어야 하므로 (1)은 idx2입니다.\n2. main에서 Usort 함수에 배열 크기 6을 전달해야 하므로 6이 저장된 변수 (2)는 nx입니다.",
      trapPoint: "일반적인 swap 3단계: temp = a; a = b; b = temp; 원리입니다."
    },
    {
      id: 15,
      category: "Python",
      prompt: "다음 Python 프로그램의 실행 결과를 쓰시오.",
      code: `a = {'한국', '중국', '일본'}
a.add('베트남')
a.add('중국')
a.remove('일본')
a.update({'홍콩', '한국', '태국'})
print(sorted(list(a)))`,
      answer: "['베트남', '중국', '태국', '한국', '홍콩']",
      aliases: [
        "['베트남', '중국', '태국', '한국', '홍콩']",
        "{'한국', '중국', '베트남', '홍콩', '태국'}",
        "{'베트남', '중국', '태국', '한국', '홍콩'}",
        "베트남 중국 태국 한국 홍콩",
        "한국 중국 베트남 홍콩 태국"
      ],
      explanation: "세트(set) 자료형의 집합 연산:\n1. 초기 집합: {'한국', '중국', '일본'}\n2. add('베트남'): {'한국', '중국', '일본', '베트남'}\n3. add('중국'): 이미 존재하므로 중복 무시\n4. remove('일본'): '일본' 제거 -> {'한국', '중국', '베트남'}\n5. update({'홍콩', '한국', '태국'}): 여러 원소 추가, 중복된 '한국' 무시 -> {'한국', '중국', '베트남', '홍콩', '태국'}\n원소는 한국, 중국, 베트남, 홍콩, 태국 총 5개입니다.",
      trapPoint: "파이썬 set은 중복을 허용하지 않으므로 '중국'과 '한국'을 다시 add/update해도 원소가 1개만 유지됩니다."
    },
    {
      id: 16,
      category: "SQL",
      prompt: "다음 [성적] 테이블에서 과목별 점수의 평균이 90점 이상인 '과목이름', '최소점수', '최대점수'를 검색하는 SQL 문을 작성하시오.",
      passage: `[조건]
- WHERE 절을 사용하지 말아야 한다.
- SELECT 절에 AS 별칭('최소점수', '최대점수')을 명시해야 한다.
- GROUP BY 절과 HAVING 절을 반드시 사용해야 한다.
- 집계 함수 MIN, MAX, AVG를 사용해야 한다.`,
      answer: "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;",
      aliases: [
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90;",
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수) >= 90",
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수)>=90;",
        "SELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수 FROM 성적 GROUP BY 과목이름 HAVING AVG(점수)>=90"
      ],
      explanation: "그룹별 집계 조건은 HAVING 절에 작성합니다:\n```sql\nSELECT 과목이름, MIN(점수) AS 최소점수, MAX(점수) AS 최대점수\nFROM 성적\nGROUP BY 과목이름\nHAVING AVG(점수) >= 90;\n```",
      trapPoint: "그룹화된 결과에 대한 필터링 조건(평균 90점 이상)은 WHERE가 아니라 반드시 HAVING 절에 작성해야 합니다."
    },
    {
      id: 17,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `abstract class Vehicle {
    String name;
    abstract public String getName(String val);

    public String getName() {
        return "Vehicle name: " + name;
    }
}

class Car extends Vehicle {
    public Car(String val) {
        name = super.name = val;
    }

    public String getName(String val) {
        return "Car name:" + val;
    }

    public String getName(byte val[]) {
        return "Car name:" + val;
    }
}

public class Main {
    public static void main(String[] args) {
        Vehicle obj = new Car("Spark");
        System.out.println(obj.getName());
    }
}`,
      answer: "Vehicle name: Spark",
      aliases: ["Vehicle name: Spark", "Vehicle name:Spark"],
      explanation: "1. `Vehicle obj = new Car(\"Spark\");` 호출 시 Car 생성자에서 name = \"Spark\"로 초기화됩니다.\n2. `obj.getName()` 호출 시 인자가 없는 getName() 메소드를 찾습니다.\n3. Car 클래스에는 인자가 없는 getName()이 오버라이딩되어 있지 않으므로 부모 클래스 Vehicle의 `public String getName()`이 호출됩니다.\n4. 따라서 \"Vehicle name: Spark\"가 리턴되어 출력됩니다.",
      trapPoint: "Car 클래스에 정의된 getName은 매개변수가 있는 오버로딩 메소드이므로, 매개변수가 없는 obj.getName() 호출 시 부모 클래스 Vehicle의 getName()이 실행됩니다."
    },
    {
      id: 18,
      category: "데이터베이스",
      prompt: "다음 설명에 해당하는 데이터베이스 3단계 스키마 구조의 명칭을 각각 쓰시오.",
      passage: `| 구분 | 설명 |
| --- | --- |
| ( 1 ) 스키마 | - 사용자나 응용 프로그래머의 개인적 입장에서 필요한 데이터베이스의 논리적 구조를 정의한다.<br>- 서브 스키마(Sub Schema)라고도 부르며, 여러 개가 존재할 수 있다. |
| ( 2 ) 스키마 | - 조직 전체 입장에서 데이터베이스 전체의 논리적 구조를 정의한 것으로, 단 하나만 존재한다.<br>- 모든 응용 프로그램이나 사용자가 필요로 하는 데이터를 통합 정의하며 접근 권한, 무결성 규칙을 포함한다. |
| ( 3 ) 스키마 | - 물리적 저장장치 입장에서 데이터가 실제로 저장되는 물리적 구조를 정의한다.<br>- 레코드의 물리적 배치, 저장 형식, 인덱스 유무 등을 다룬다. |`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["외부", "외부 스키마", "외부스키마", "external", "External"],
        "2": ["개념", "개념 스키마", "개념스키마", "conceptual", "Conceptual"],
        "3": ["내부", "내부 스키마", "내부스키마", "internal", "Internal"]
      },
      answer: "(1) 외부, (2) 개념, (3) 내부",
      aliases: ["(1) 외부, (2) 개념, (3) 내부", "외부, 개념, 내부", "외부 개념 내부"],
      explanation: "ANSI/SPARC 3단계 스키마 구조:\n1. 외부 스키마(External Schema): 사용자/응용 프로그램 뷰 (서브 스키마)\n2. 개념 스키마(Conceptual Schema): 조직 전체 관점의 통합 논리적 구조 (단 1개 존재)\n3. 내부 스키마(Internal Schema): 물리적 저장장치 관점의 물리적 구조",
      trapPoint: "사용자 관점 = 외부 스키마, 기관/전체 관점 = 개념 스키마, 물리적 저장 = 내부 스키마입니다."
    },
    {
      id: 19,
      category: "소프트웨어공학",
      prompt: "다음 제어 흐름 그래프가 분기 커버리지(Branch Coverage)를 100% 만족하기 위한 테스트 경로 2가지를 쓰시오.",
      passage: `[제어 흐름 그래프]
       ┌─── ( 1 ) ───┐ <───────────┐
       │             │             │
       ▼             │             │
     ◇ ( 2 )         │             │
    /        \\       │             │
   / YES      \\ NO   │             │
  ▼            ▼     │             │
( 3 )          │     │             │
  │            │     │             │
  └───► ( 4 ) ◄┘     │             │
         │           │             │
         ▼           │             │
       ( 5 )         │             │
         │           │             │
         ▼           │             │
       ◇ ( 6 )       │             │
        / YES        │             │
       └─────────────┘             │
        \\ NO                       │
         ▼                         │
       ( 7 )                       │

※ 분기점 조건:
- 2번 노드: YES(3번 경유하여 4번 진입) / NO(4번으로 직행)
- 6번 노드: YES(1번으로 복귀 루프) / NO(7번으로 종료)
모든 분기(Decision edge)를 적어도 한 번씩 통과하는 두 경로를 쓰시오.`,
      answer: "1234561, 124567",
      aliases: [
        "1234561, 124567",
        "124567, 1234561",
        "1234567, 124561",
        "124561, 1234567",
        "1-2-3-4-5-6-1, 1-2-4-5-6-7",
        "1->2->3->4->5->6->1, 1->2->4->5->6->7",
        "1234561 124567",
        "124567 1234561"
      ],
      explanation: "분기 커버리지(Branch Coverage, 결정 커버리지)는 제어 흐름 그래프 내의 모든 분기문(조건식)이 True와 False의 모든 결과를 적어도 한 번씩 실행해야 합니다.\n- 2번 분기: True (3 경유 후 4 진입), False (4로 직행)\n- 6번 분기: True (1로 루프), False (7로 이동)\n따라서 두 분기점의 참/거짓 분기 간선을 모두 통과하는 최소 경로는 `1234561, 124567` (또는 `1234567, 124561`) 입니다.",
      trapPoint: "2번 노드에서 3번을 거쳐 4번으로 합류하는 구조이므로 3을 거치는 경로는 1->2->3->4->5... 가 됩니다.",
    },
    {
      id: 20,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int x = 100;

    Parent() {
        this(500);
    }

    Parent(int x) {
        this.x = x;
    }

    int getX() {
        return x;
    }
}

class Child extends Parent {
    int x = 4000;

    Child() {
        this(5000);
    }

    Child(int x) {
        this.x = x;
    }
}

public class Main {
    public static void main(String[] args) {
        Child obj = new Child();
        System.out.println(obj.getX());
    }
}`,
      answer: "500",
      aliases: ["500"],
      explanation: "1. `Child obj = new Child();` 호출:\n   - `this(5000)` 호출 -> `Child(int x)` 실행\n   - 부모 기본 생성자 `super()`가 묵시적으로 먼저 호출됨\n2. 부모 생성자 `Parent()` 실행:\n   - `this(500)` 호출 -> `Parent(int x)` 실행 -> 부모의 x = 500 세팅\n3. 다시 자식 생성자 `Child(int x)` 실행 -> 자식의 x = 5000 세팅\n4. `obj.getX()` 호출:\n   - getX()는 부모 클래스 Parent에만 정의되어 있음\n   - getX() 내부의 `return x;`는 Parent 클래스의 멤버 변수 x를 반환하므로 500이 반환됨.",
      trapPoint: "Child는 getX()를 오버라이딩하지 않았으므로 부모 Parent의 getX()가 호출되며, Parent의 x값인 500이 반환됩니다."
    }
  ]
};

