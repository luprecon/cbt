/**
 * [언어별] Java 기출 15문항 (상속, 다형성, 생성자, static, 람다, 예외)
 * 정보처리기사 실기 Java 객체지향 주요 출제 유형
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["java_special"] = {
  id: "java_special",
  title: "[언어별] Java 기출 15문항",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class SuperClass {
    SuperClass() {
        System.out.print("A");
    }
    SuperClass(int x) {
        System.out.print("B" + x);
    }
}

class SubClass extends SuperClass {
    SubClass() {
        super(10);
        System.out.print("C");
    }
}

public class Main {
    public static void main(String[] args) {
        SubClass obj = new SubClass();
    }
}`,
      answer: "B10C",
      aliases: ["B10C", "B10 C"],
      explanation: "1. `new SubClass()` 호출 시 SubClass 생성자가 실행됩니다.\n2. SubClass 생성자의 첫 줄에 명시적으로 `super(10)`이 작성되어 있으므로 부모의 `SuperClass(int x)` 생성자가 호출되어 'B10'이 먼저 출력됩니다.\n3. 부모 생성자가 끝난 후 자식 생성자의 나머지 `System.out.print(\"C\")`가 실행되어 'C'가 출력됩니다.\n따라서 'B10C'가 출력됩니다.",
      trapPoint: "자식 생성자 첫 줄의 명시적 super(10) 호출로 인해 기본 생성자 SuperClass()('A')는 실행되지 않습니다.",
      traceTable: {
        headers: ["실행 순서", "코드", "출력", "누적 출력"],
        rows: [
          ["1단계", "super(10)", "B10", "B10"],
          ["2단계", "System.out.print(\"C\")", "C", "B10C"]
        ]
      }
    },
    {
      id: 2,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Parent {
    int x = 10;
    void print() {
        System.out.print(x);
    }
}

class Child extends Parent {
    int x = 20;
    void print() {
        System.out.print(x);
    }
}

public class Main {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.print(p.x + " ");
        p.print();
    }
}`,
      answer: "10 20",
      aliases: ["10 20", "10, 20", "10,20"],
      explanation: "자바의 핵심 다형성 규칙:\n1. 인스턴스 변수(필드)는 참조 변수의 선언 타입에 따라 결정됩니다(정적 바인딩). `p.x`에서 p는 Parent 타입이므로 `Parent.x`인 10이 참조됩니다.\n2. 인스턴스 메서드는 실제 생성된 인스턴스 객체의 오버라이딩된 메서드가 호출됩니다(동적 바인딩). `p.print()`는 Child의 `print()`가 실행되어 Child의 x인 20이 출력됩니다.\n출력: '10 20'",
      trapPoint: "멤버 변수는 오버라이딩되지 않고 참조 변수 타입(Parent)을 따르지만, 메서드는 오버라이딩되어 실제 객체(Child)의 메서드가 실행됩니다.",
      traceTable: {
        headers: ["구문", "바인딩 방식", "적용 클래스", "값"],
        rows: [
          ["p.x", "정적 바인딩 (변수)", "Parent", "10"],
          ["p.print()", "동적 바인딩 (메서드)", "Child (오버라이딩)", "20"]
        ]
      }
    },
    {
      id: 3,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Counter {
    static int count = 0;
    int num = 0;
    Counter() {
        count++;
        num++;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
        System.out.println(c3.count + ", " + c3.num);
    }
}`,
      answer: "3, 1",
      aliases: ["3, 1", "3,1", "3 1"],
      explanation: "1. static int count는 모든 Counter 객체가 공유하는 정적 클래스 변수입니다. 객체가 3번 생성(c1, c2, c3)되는 동안 count++가 3회 실행되어 3이 됩니다.\n2. int num은 각 객체마다 별도로 할당되는 인스턴스 변수입니다. c3 객체 생성 시 num++가 1회 실행되어 1이 됩니다.\n따라서 c3.count는 3, c3.num은 1입니다.",
      trapPoint: "static 변수는 인스턴스마다 별개로 존재하는 것이 아니라 클래스 로딩 시 단 하나만 생성되어 모든 인스턴스가 공유합니다."
    },
    {
      id: 4,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s1 = "Hello";
        s1.concat(" World");
        System.out.println(s1);
    }
}`,
      answer: "Hello",
      aliases: ["Hello"],
      explanation: "Java에서 String 클래스는 불변(Immutable) 객체입니다.\n`s1.concat(\" World\")`는 \"Hello World\"라는 새로운 String 객체를 생성하지만, 그 반환값을 s1에 다시 대입하지 않았으므로 s1은 여전히 원래의 \"Hello\"를 유지합니다.",
      trapPoint: "String 객체의 불변성(Immutability) 함정입니다. s1 = s1.concat(...) 처럼 재할당하지 않으면 원래 변수는 절대 변하지 않습니다."
    },
    {
      id: 5,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static int test() {
        try {
            int a = 10 / 2;
            return a;
        } catch (Exception e) {
            return 0;
        } finally {
            System.out.print("F");
        }
    }

    public static void main(String[] args) {
        System.out.print(test());
    }
}`,
      answer: "F5",
      aliases: ["F5", "F 5"],
      explanation: "1. `test()` 메서드 실행 시 `try` 블록에서 `a = 10 / 2 = 5`가 계산되고 `return a;`를 만나지만, 반환하기 전에 반드시 `finally` 블록이 먼저 실행됩니다.\n2. `finally` 블록의 `System.out.print(\"F\")`가 먼저 콘솔에 'F'를 출력합니다.\n3. 그 후 `try`에서 준비된 반환값 5가 `main`으로 반환되어 `System.out.print(5)`에 의해 '5'가 출력됩니다.\n최종 출력: F5",
      trapPoint: "try 블록에서 return이 실행되더라도 finally 블록은 무조건 실행된 후 실제 반환이 이루어집니다."
    },
    {
      id: 6,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `interface Calc {
    int operate(int a, int b);
}

public class Main {
    public static void main(String[] args) {
        Calc add = (x, y) -> x + y;
        Calc mul = (x, y) -> x * y;
        System.out.println(add.operate(mul.operate(2, 3), 4));
    }
}`,
      answer: "10",
      aliases: ["10"],
      explanation: "1. 함수형 인터페이스 Calc를 람다식으로 구현합니다.\n2. mul.operate(2, 3)은 2 * 3 = 6을 반환합니다.\n3. add.operate(6, 4)는 6 + 4 = 10을 반환하여 출력합니다.",
      trapPoint: "람다식을 활용한 중첩 호출 연산 순서(안쪽 mul.operate(2, 3) 먼저 계산)를 확인합니다."
    },
    {
      id: 7,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `abstract class Animal {
    abstract void sound();
    void sleep() {
        System.out.print("Z");
    }
}

class Dog extends Animal {
    void sound() {
        System.out.print("W");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.sound();
        a.sleep();
    }
}`,
      answer: "WZ",
      aliases: ["WZ", "W Z"],
      explanation: "1. Animal은 추상 클래스(abstract class)입니다.\n2. `Animal a = new Dog()` 다형성에 의해 `a.sound()`는 자식 클래스 Dog에서 구현된 `sound()`가 호출되어 'W'가 출력됩니다.\n3. `a.sleep()`은 부모 추상 클래스에 정의된 일반 메서드로 'Z'가 출력됩니다.\n따라서 'WZ'가 출력됩니다.",
      trapPoint: "추상 클래스의 추상 메서드 오버라이딩과 부모의 일반 상속 메서드 호출 흐름입니다."
    },
    {
      id: 8,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String s = "KOREA2026";
        System.out.print(s.substring(2, 5));
        System.out.print(s.indexOf('2'));
    }
}`,
      answer: "REA5",
      aliases: ["REA5", "REA 5"],
      explanation: "문자열 s = \"KOREA2026\"\n인덱스: 0:K, 1:O, 2:R, 3:E, 4:A, 5:2, 6:0, 7:2, 8:6\n1. `s.substring(2, 5)`는 인덱스 2부터 5 이전(2, 3, 4)까지 자르므로 \"REA\"입니다.\n2. `s.indexOf('2')`는 문자 '2'가 처음 등장하는 인덱스인 5를 반환합니다.\n따라서 REA와 5가 연속 출력되어 REA5가 됩니다.",
      trapPoint: "substring(begin, end)에서 end 인덱스는 포함되지 않는다는 점(end-1까지)에 주의합니다."
    },
    {
      id: 9,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[][] arr = {{1, 2, 3}, {4, 5, 6}};
        int sum = 0;
        for (int[] row : arr) {
            for (int val : row) {
                if (val % 2 == 0) sum += val;
            }
        }
        System.out.println(sum);
    }
}`,
      answer: "12",
      aliases: ["12"],
      explanation: "향상된 for문(Enhanced for loop)으로 2차원 배열을 순회합니다.\n짝수(val % 2 == 0)인 원소만 추출: 2, 4, 6\nsum = 2 + 4 + 6 = 12 입니다.",
      trapPoint: "2차원 배열의 행(row) 순회 후 각 행의 짝수 요소만 누적합니다."
    },
    {
      id: 10,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Vehicle {
    void drive() { System.out.print("V"); }
}

class Car extends Vehicle {
    void drive() { System.out.print("C"); }
    void turbo() { System.out.print("T"); }
}

public class Main {
    public static void main(String[] args) {
        Vehicle v = new Car();
        v.drive();
        if (v instanceof Car) {
            ((Car) v).turbo();
        }
    }
}`,
      answer: "CT",
      aliases: ["CT", "C T"],
      explanation: "1. `Vehicle v = new Car();` 에서 `v.drive()`는 동적 바인딩에 의해 Car의 `drive()`가 호출되어 'C'를 출력합니다.\n2. `v instanceof Car`는 v가 가리키는 실제 인스턴스가 Car이므로 true입니다.\n3. `((Car) v).turbo()` 다운캐스팅(Downcasting)을 통해 Car 전용 메서드 turbo()를 호출하여 'T'를 출력합니다.\n출력: CT",
      trapPoint: "부모 참조 타입 변수를 자식 타입으로 다운캐스팅하기 전 instanceof 연산자로 실제 인스턴스 타입을 안전하게 확인하는 패턴입니다."
    },
    {
      id: 11,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int a = 10, b = 20;
        int max = (a > b) ? a : b;
        System.out.println(max);
    }
}`,
      answer: "20",
      aliases: ["20"],
      explanation: "a > b (10 > 20) 조건이 거짓(false)이므로 콜론 뒤의 b(20)가 선택됩니다.\n출력: 20",
      trapPoint: "삼항 조건식의 기본 평가입니다."
    },
    {
      id: 12,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Box<T> {
    private T item;
    public void set(T item) { this.item = item; }
    public T get() { return item; }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> box = new Box<>();
        box.set(100);
        System.out.println(box.get() + 50);
    }
}`,
      answer: "150",
      aliases: ["150"],
      explanation: "제네릭 클래스 Box<T>에 타입 인자로 Integer를 지정했습니다.\nbox.set(100)으로 저장된 100을 꺼내 50을 더하므로 150이 출력됩니다.",
      trapPoint: "제네릭(Generics)의 기본 동작 및 타입 안전성 개념입니다."
    },
    {
      id: 13,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        String a = new String("test");
        String b = new String("test");
        String c = "test";
        String d = "test";
        System.out.print((a == b) + " " + (c == d) + " " + a.equals(b));
    }
}`,
      answer: "false true true",
      aliases: ["false true true", "false, true, true", "false,true,true"],
      explanation: "1. `a == b`: new 연산자로 각각 힙(Heap) 메모리에 별도 생성된 서로 다른 객체이므로 주소 비교 false입니다.\n2. `c == d`: 문자열 리터럴로 생성되어 문자열 상수 풀(String Constant Pool)의 동일한 주소를 공유하므로 true입니다.\n3. `a.equals(b)`: 문자열의 실제 내용(\"test\")을 비교하므로 true입니다.\n출력: 'false true true'",
      trapPoint: "Java의 `==` (참조 주소 비교)와 `.equals()` (내용 비교), 그리고 문자열 리터럴의 상수 풀 공유 차이를 묻는 대표적인 빈출 문제입니다."
    },
    {
      id: 14,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `class Printer {
    void print(int x) { System.out.print("INT"); }
    void print(String s) { System.out.print("STR"); }
    void print(double d) { System.out.print("DBL"); }
}

public class Main {
    public static void main(String[] args) {
        Printer p = new Printer();
        p.print(10);
        p.print("10");
        p.print(10.0);
    }
}`,
      answer: "INTSTRDBL",
      aliases: ["INTSTRDBL", "INT STR DBL"],
      explanation: "메서드 오버로딩(Method Overloading) 규칙에 따라 전달되는 인자의 타입에 가장 잘 맞는 메서드가 호출됩니다.\n1. `p.print(10)`: 정수 int -> 'INT'\n2. `p.print(\"10\")`: 문자열 String -> 'STR'\n3. `p.print(10.0)`: 실수 double -> 'DBL'\n연속 출력: INTSTRDBL",
      trapPoint: "메서드 이름은 같지만 매개변수의 타입에 따라 컴파일 타임에 호출 메서드가 결정되는 오버로딩입니다."
    },
    {
      id: 15,
      category: "Java",
      prompt: "다음 Java 프로그램의 실행 결과를 쓰시오.",
      code: `public class Main {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int sum = 0;
        for (int i = 0; i < arr.length; i += 2) {
            sum += arr[i];
        }
        System.out.println(sum);
    }
}`,
      answer: "90",
      aliases: ["90"],
      explanation: "루프 증감식이 `i += 2`이므로 짝수 인덱스 원소만 순회합니다.\ni=0: arr[0] = 10\ni=2: arr[2] = 30\ni=4: arr[4] = 50\nsum = 10 + 30 + 50 = 90 입니다.",
      trapPoint: "증감식 i += 2로 건너뛰며 인덱스 0, 2, 4 원소를 더합니다."
    }
  ]
};
