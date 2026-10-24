/**
 * [테마] SQL & DB 완전정복 15선 (GROUP BY, HAVING, JOIN, 윈도우함수, 정규화, 트랜잭션)
 */
window.EXAM_ROUNDS = window.EXAM_ROUNDS || {};
window.EXAM_ROUNDS["sql_master"] = {
  id: "sql_master",
  title: "💾 [테마] SQL & DB 완전정복 15선",
  totalPoints: 100,
  cutoffPoints: 60,
  questions: [
    {
      id: 1,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 부서별(DEPT) 평균 급여가 3000 이상인 부서를 필터링할 때 사용하는 올바른 절의 키워드를 쓰시오.",
      passage: `SELECT DEPT, AVG(SALARY) 
FROM EMP 
GROUP BY DEPT 
(        ) AVG(SALARY) >= 3000;`,
      answer: "HAVING",
      aliases: ["HAVING", "having"],
      explanation: "GROUP BY 절로 그룹화된 결과에 집계 조건 필터링을 걸 때는 WHERE가 아닌 HAVING 절을 사용합니다.",
      trapPoint: "집계 함수 조건은 무조건 HAVING 절입니다."
    },
    {
      id: 2,
      category: "SQL",
      prompt: "다음 SQL 문의 실행 결과로 반환되는 레코드 수(행 수)를 숫자로 쓰시오.",
      passage: `[A 테이블]
| ID |
| 1 |
| 2 |
| 3 |

[B 테이블]
| ID |
| 2 |
| 3 |
| 4 |

[SQL문]
SELECT A.ID 
FROM A 
INNER JOIN B ON A.ID = B.ID;`,
      answer: "2",
      aliases: ["2", "2개", "2행"],
      explanation: "INNER JOIN은 양쪽 테이블 모두에 존재하는 공통 키만 추출합니다.\n공통 ID는 2, 3으로 총 2개의 행이 반환됩니다.",
      trapPoint: "INNER JOIN은 교집합에 해당하므로 2행입니다."
    },
    {
      id: 3,
      category: "SQL",
      prompt: "다음 [STUDENT] 테이블에서 점수(SCORE)가 가장 높은 상위 1등부터 순위를 부여하되, 동점자가 발생할 경우 동일 순위를 부여하고 그 다음 순위는 건너뛰지 않고 연속된 숫자를 부여하는 윈도우 함수의 이름을 쓰시오 (예: 1등, 2등, 2등, 3등).",
      answer: "DENSE_RANK",
      aliases: ["DENSE_RANK", "dense_rank", "DENSE_RANK()", "dense_rank()"],
      explanation: "순위 함수 비교:\n- RANK(): 1등, 2등, 2등, 4등 (중복 순위 수만큼 건너뜀)\n- DENSE_RANK(): 1등, 2등, 2등, 3등 (건너뛰지 않고 연속 부여)\n- ROW_NUMBER(): 1등, 2등, 3등, 4등 (고유 번호)",
      trapPoint: "동점 시 건너뛰지 않는 연속 순위는 DENSE_RANK입니다."
    },
    {
      id: 4,
      category: "SQL",
      prompt: "데이터베이스 테이블에서 기존 테이블 구조의 컬럼을 삭제할 때 사용하는 SQL DDL 문의 빈칸을 쓰시오.",
      passage: `ALTER TABLE EMP (  1  ) (  2  ) TEL;`,
      answerType: "multi_blank",
      multiAnswers: {
        "1": ["DROP", "drop"],
        "2": ["COLUMN", "column"]
      },
      answer: "(1) DROP, (2) COLUMN",
      aliases: ["DROP COLUMN", "DROP, COLUMN", "drop column"],
      explanation: "기존 테이블의 컬럼을 삭제하는 DDL 문법은 `ALTER TABLE 테이블명 DROP COLUMN 컬럼명;` 입니다.",
      trapPoint: "컬럼 삭제는 DROP COLUMN입니다."
    },
    {
      id: 5,
      category: "SQL",
      prompt: "관계 데이터베이스 정규화 과정 중 테이블 R의 모든 도메인이 더 이상 분해될 수 없는 원자값(Atomic Value)만으로 구성되도록 하는 정규형의 명칭을 쓰시오.",
      answer: "제1정규형",
      aliases: ["제1정규형", "1NF", "제 1 정규형", "1정규형", "First Normal Form"],
      explanation: "제1정규형(1NF)은 릴레이션에 속한 모든 속성의 도메인이 원자값이어야 한다는 규칙입니다.",
      trapPoint: "원자값 = 1NF."
    },
    {
      id: 6,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 NULL 값을 다른 기본값으로 치환할 때 사용하는 표준 SQL 함수의 명칭을 쓰시오 (Oracle의 NVL과 유사한 표준 함수).",
      passage: `SELECT (        )(COMMISSION, 0) FROM EMP;`,
      answer: "COALESCE",
      aliases: ["COALESCE", "coalesce", "NVL", "nvl", "IFNULL", "ifnull"],
      explanation: "표준 SQL에서 인자 중 첫 번째로 NULL이 아닌 값을 반환하는 함수는 `COALESCE(표현식, 기본값)` 입니다 (Oracle 전용은 NVL, MySQL은 IFNULL도 인정).",
      trapPoint: "ANSI 표준 NULL 대체 함수는 COALESCE입니다."
    },
    {
      id: 7,
      category: "SQL",
      prompt: "다음 SQL 문의 실행 결과를 쓰시오.",
      code: `SELECT COUNT(*) FROM EMP WHERE DEPT = 'IT' AND SALARY IS NULL;`,
      passage: `[EMP 테이블]
| ID | NAME | DEPT | SALARY |
| 1 | 김철수 | IT | 4000 |
| 2 | 이영희 | IT | NULL |
| 3 | 박민수 | HR | NULL |
| 4 | 최유리 | IT | NULL |`,
      answer: "2",
      aliases: ["2", "2개"],
      explanation: "DEPT = 'IT'이면서 SALARY IS NULL인 레코드는 ID 2번(이영희)과 ID 4번(최유리)으로 총 2개입니다.\n따라서 COUNT(*) 결과는 2입니다.",
      trapPoint: "NULL 비교는 IS NULL로 정상 판별됩니다."
    },
    {
      id: 8,
      category: "SQL",
      prompt: "데이터베이스 언어(SQL)를 3가지로 분류할 때 데이터 정의어(DDL), 데이터 조작어(DML), 그리고 권한 부여 및 트랜잭션 관리를 담당하는 언어의 영문 약어(3글자)를 쓰시오.",
      answer: "DCL",
      aliases: ["DCL", "dcl", "Data Control Language", "데이터 제어어"],
      explanation: "DCL(Data Control Language, 데이터 제어어)은 GRANT, REVOKE, COMMIT, ROLLBACK 등 데이터의 보안, 무결성, 회복, 병행 제어를 수행합니다.",
      trapPoint: "DDL, DML, DCL의 3대 분류입니다."
    },
    {
      id: 9,
      category: "SQL",
      prompt: "다음 SQL 문에서 서브쿼리의 결과가 하나라도 존재하는지 여부를 검사하는 조건 연산자 키워드를 쓰시오.",
      passage: `SELECT * FROM DEPT D WHERE (        ) (SELECT 1 FROM EMP E WHERE E.DEPT_ID = D.ID);`,
      answer: "EXISTS",
      aliases: ["EXISTS", "exists"],
      explanation: "EXISTS 연산자는 서브쿼리의 결과 집합에 1건 이상의 행이 존재하는지 여부를 참/거짓으로 검사합니다.",
      trapPoint: "존재 여부 판별 = EXISTS."
    },
    {
      id: 10,
      category: "SQL",
      prompt: "관계 대수 연산 중 두 릴레이션 R과 S에 대하여 R에는 속하고 S에는 속하지 않는 튜플들로 구성된 릴레이션을 구하는 순수 집합 연산자의 명칭을 쓰시오.",
      answer: "차집합",
      aliases: ["차집합", "Difference", "difference", "EXCEPT", "MINUS"],
      explanation: "차집합(Difference, R - S)은 R의 튜플 중 S와 겹치는 부분을 제거한 집합입니다.",
      trapPoint: "합집합, 교집합, 차집합, 카티션 프로덕트 4대 일반 집합 연산자 중 차집합입니다."
    },
    {
      id: 11,
      category: "SQL",
      prompt: "다음 SQL 문의 결과로 출력되는 건수를 숫자로 쓰시오.",
      code: `SELECT COUNT(COMMISSION) FROM EMP;`,
      passage: `[EMP 테이블]
| ID | NAME | COMMISSION |
| 1 | A | 100 |
| 2 | B | NULL |
| 3 | C | 200 |
| 4 | D | NULL |`,
      answer: "2",
      aliases: ["2", "2개"],
      explanation: "집계 함수 `COUNT(컬럼명)`은 NULL 값을 제외하고 카운트합니다!\nCOMMISSION 컬럼에서 NULL이 아닌 값은 100과 200으로 총 2개입니다.\n(참고: COUNT(*)는 NULL을 포함하여 4개가 됩니다).",
      trapPoint: "COUNT(*)는 NULL을 포함하지만 COUNT(컬럼명)은 NULL을 제외한다는 핵심 함정입니다!",
      traceTable: {
        headers: ["함수", "NULL 처리 방식", "결과"],
        rows: [
          ["COUNT(*)", "모든 행 카운트 (NULL 포함)", "4"],
          ["COUNT(COMMISSION)", "NULL 제외 카운트", "2"]
        ]
      }
    },
    {
      id: 12,
      category: "SQL",
      prompt: "데이터베이스에서 특정 이벤트(INSERT, UPDATE, DELETE 등)가 발생할 때마다 DBMS에 의해 자동으로 실행되도록 작성된 특수한 데이터베이스 프로시저의 명칭을 쓰시오.",
      answer: "트리거",
      aliases: ["트리거", "Trigger", "trigger"],
      explanation: "트리거(Trigger)는 테이블의 데이터가 변경될 때 연쇄적으로 무결성을 유지하거나 감사 로그를 남기기 위해 자동 실행되는 저장 서브프로그램입니다.",
      trapPoint: "자동 연쇄 실행 프로시저 = 트리거(Trigger)."
    },
    {
      id: 13,
      category: "SQL",
      prompt: "다음 SQL 문에서 사용된 키워드 중 여러 열의 소계(Subtotal)와 총계(Grand Total)를 계층적으로 한 번에 생성해 주는 다차원 집계 확장 구문의 명칭을 쓰시오.",
      passage: `SELECT DEPT, JOB, SUM(SALARY) 
FROM EMP 
GROUP BY (        )(DEPT, JOB);`,
      answer: "ROLLUP",
      aliases: ["ROLLUP", "rollup", "ROLLUP()"],
      explanation: "ROLLUP은 인자로 주어진 컬럼들의 계층적 단계별 소계 및 총합계를 자동 산출해 주는 GROUP BY 확장 절입니다.",
      trapPoint: "소계 및 총계 생성 = ROLLUP."
    },
    {
      id: 14,
      category: "SQL",
      prompt: "데이터베이스 무결성 제약조건 중 한 테이블의 컬럼에 NULL 값이 들어가지 못하도록 강제하는 제약조건의 명칭을 쓰시오.",
      answer: "NOT NULL",
      aliases: ["NOT NULL", "not null"],
      explanation: "NOT NULL 제약조건은 해당 컬럼에 공백 또는 빈 값(NULL)의 저장을 금지합니다.",
      trapPoint: "NULL 허용 안 함 = NOT NULL."
    },
    {
      id: 15,
      category: "SQL",
      prompt: "다음 SQL 문의 실행 결과를 쓰시오.",
      code: `SELECT SUBSTR('KOREA2026', 1, 5) FROM DUAL;`,
      answer: "KOREA",
      aliases: ["KOREA", "korea"],
      explanation: "SQL의 SUBSTR(문자열, 시작위치, 길이) 함수는 1번째 위치부터 5글자를 추출하므로 \"KOREA\"가 됩니다 (SQL 인덱스는 1부터 시작).",
      trapPoint: "SQL 문자열 인덱스는 프로그래밍 언어(0)와 달리 1부터 시작합니다."
    }
  ]
};
