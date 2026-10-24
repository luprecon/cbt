#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
정처기 실기 5대 단원 핵심 개념서 & 2020~2026 기출 해설총람 통합 빌더
- 21개 회차(420문항) + 6대 특화 테마(105문항) = 총 525문항 자동 파싱 & 5대 단원 분류
- 산출물:
  1. docs/정처기_실기_핵심개념서_및_기출해설총람.md (마스터 종합본)
  2. docs/concepts/01_소프트웨어공학_설계.md ~ 05_테스팅_운영체제.md (단원별 5권)
  3. docs/rounds/2020.md ~ 2026.md (연도별 7권)
  4. data/concept-data.js (웹 뷰어용 통합 데이터셋)
"""

import os
import sys
import glob
import json
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

# ==============================================================================
# 1. JS 파서 (window.EXAM_ROUNDS 객체 리터럴 파싱)
# ==============================================================================
def parse_js_object(code_str):
    m = re.search(r'window\.EXAM_ROUNDS\[.*?\]\s*=\s*\{', code_str)
    if not m:
        return None
    brace_idx = m.end() - 1
    
    s = code_str[brace_idx:]
    pos = 0
    n = len(s)
    
    def skip_whitespace_and_comments():
        nonlocal pos
        while pos < n:
            if s[pos].isspace():
                pos += 1
            elif s[pos:pos+2] == '//':
                pos = s.find('\n', pos)
                if pos == -1: pos = n
            elif s[pos:pos+2] == '/*':
                pos = s.find('*/', pos)
                if pos == -1: pos = n
                else: pos += 2
            else:
                break
                
    def parse_value():
        nonlocal pos
        skip_whitespace_and_comments()
        if pos >= n: return None
        c = s[pos]
        if c == '{': return parse_dict()
        elif c == '[': return parse_list()
        elif c in ('"', "'"): return parse_quoted_string(c)
        elif c == '`': return parse_template_string()
        elif c.isdigit() or (c == '-' and pos + 1 < n and s[pos+1].isdigit()): return parse_number()
        elif s[pos:pos+4] == 'true': 
            pos += 4; return True
        elif s[pos:pos+5] == 'false': 
            pos += 5; return False
        elif s[pos:pos+4] == 'null': 
            pos += 4; return None
        else:
            start = pos
            while pos < n and (s[pos].isalnum() or s[pos] in '_$'):
                pos += 1
            ident = s[start:pos]
            if ident in ('true', 'false', 'null'):
                return True if ident == 'true' else (False if ident == 'false' else None)
            return ident

    def parse_quoted_string(quote):
        nonlocal pos
        pos += 1
        res = []
        while pos < n:
            c = s[pos]
            if c == quote:
                pos += 1
                return ''.join(res)
            elif c == '\\':
                pos += 1
                if pos < n:
                    nc = s[pos]
                    if nc == 'n': res.append('\n')
                    elif nc == 'r': res.append('\r')
                    elif nc == 't': res.append('\t')
                    elif nc == '\\': res.append('\\')
                    elif nc == quote: res.append(quote)
                    elif nc == '"': res.append('"')
                    elif nc == "'": res.append("'")
                    else: res.append(nc)
                    pos += 1
            else:
                res.append(c)
                pos += 1
        return ''.join(res)

    def parse_template_string():
        nonlocal pos
        pos += 1
        res = []
        while pos < n:
            c = s[pos]
            if c == '`':
                pos += 1
                return ''.join(res)
            elif c == '\\':
                pos += 1
                if pos < n:
                    nc = s[pos]
                    if nc == 'n': res.append('\n')
                    elif nc == '`': res.append('`')
                    elif nc == '\\': res.append('\\')
                    else: res.append('\\' + nc)
                    pos += 1
            else:
                res.append(c)
                pos += 1
        return ''.join(res)

    def parse_number():
        nonlocal pos
        start = pos
        if s[pos] == '-': pos += 1
        while pos < n and (s[pos].isdigit() or s[pos] == '.'):
            pos += 1
        num_str = s[start:pos]
        return float(num_str) if '.' in num_str else int(num_str)

    def parse_dict():
        nonlocal pos
        pos += 1
        d = {}
        while True:
            skip_whitespace_and_comments()
            if pos >= n: break
            if s[pos] == '}':
                pos += 1
                break
            k = None
            if s[pos] in ('"', "'"):
                k = parse_quoted_string(s[pos])
            else:
                k_start = pos
                while pos < n and (s[pos].isalnum() or s[pos] in '_$'):
                    pos += 1
                k = s[k_start:pos]
            skip_whitespace_and_comments()
            if pos < n and s[pos] == ':':
                pos += 1
            else:
                break
            v = parse_value()
            d[k] = v
            skip_whitespace_and_comments()
            if pos < n and s[pos] == ',':
                pos += 1
            elif pos < n and s[pos] == '}':
                pos += 1
                break
        return d

    def parse_list():
        nonlocal pos
        pos += 1
        arr = []
        while True:
            skip_whitespace_and_comments()
            if pos >= n: break
            if s[pos] == ']':
                pos += 1
                break
            v = parse_value()
            arr.append(v)
            skip_whitespace_and_comments()
            if pos < n and s[pos] == ',':
                pos += 1
            elif pos < n and s[pos] == ']':
                pos += 1
                break
        return arr

    return parse_value()


# ==============================================================================
# 2. 5대 단원 분류 및 토픽 추출기
# ==============================================================================
UNIT_INFO = {
    1: {
        "num": 1,
        "title": "제1단원: 소프트웨어 공학 & 아키텍처 설계",
        "short_title": "소프트웨어 공학 & 아키텍처",
        "summary": "GoF 디자인 패턴 23종, 결합도/응집도 7단계, 객체지향 SOLID 설계 원칙, 아키텍처 스타일, EAI 및 인터페이스 연계 기술 정리",
        "doc_file": "01_소프트웨어공학_설계.md"
    },
    2: {
        "num": 2,
        "title": "제2단원: 프로그래밍 언어 활용 (C / Java / Python)",
        "short_title": "프로그래밍 언어 활용",
        "summary": "C언어 포인터·배열·구조체·재귀, Java 상속·동적바인딩·static·인터페이스, Python 슬라이싱·자료구조·컴프리헨션 핵심 정리",
        "doc_file": "02_프로그래밍언어_활용.md"
    },
    3: {
        "num": 3,
        "title": "제3단원: 데이터베이스 & SQL 활용",
        "short_title": "데이터베이스 & SQL",
        "summary": "정규화 6단계(도부이결다조), 관계대수, DDL/DML/DCL, 집계·조인·서브쿼리·윈도우 함수, 트랜잭션 ACID 및 회복·병행제어 정리",
        "doc_file": "03_데이터베이스_구축.md"
    },
    4: {
        "num": 4,
        "title": "제4단원: 네트워크 & 정보 보안 구축",
        "short_title": "네트워크 & 정보 보안",
        "summary": "OSI 7계층 vs TCP/IP, IPv4 서브넷 마스킹 계산 공식, 라우팅(OSPF/RIP), 대칭키 vs 공개키 암호화, 네트워크 공격 기법 및 보안 솔루션 정리",
        "doc_file": "04_네트워크_정보보안.md"
    },
    5: {
        "num": 5,
        "title": "제5단원: 소프트웨어 테스팅 & 운영체제 관리",
        "short_title": "소프트웨어 테스팅 & 운영체제",
        "summary": "살충제 패러독스, 화이트박스 커버리지 및 맥케이브 순환복잡도 V(G), 블랙박스 기법, V-모델, CPU 스케줄링(HRN/RR), 교착상태(Deadlock) 발생 조건, 형상관리(SCM) 정리",
        "doc_file": "05_테스팅_운영체제.md"
    }
}

UNIT_SYLLABUS = {
    1: [
        "1.1 개발 방법론 & SDLC",
        "1.2 프로젝트 관리 & 비용 산정",
        "1.3 요구사항 분석 & UML",
        "1.4 GoF 디자인 패턴",
        "1.5 모듈 결합도 & 응집도",
        "1.6 객체지향 설계 원칙 (SOLID)",
        "1.7 EAI 구축 & 인터페이스 연계",
        "1.8 소프트웨어 아키텍처 & 설계"
    ],
    2: [
        "2.1 C언어 포인터 & 다차원 배열",
        "2.2 C언어 제어문 & 연산자 & 구조체",
        "2.3 Java 객체지향 & 상속 / 다형성",
        "2.4 Java static & 인터페이스 / 예외",
        "2.5 Python 슬라이싱 & 컬렉션 / 람다",
        "2.6 Python 프로그래밍 기초"
    ],
    3: [
        "3.1 데이터 모델링 & 키 / 무결성 제약조건",
        "3.2 관계대수 & 릴레이션 이론",
        "3.3 정규화 6단계 & 이상현상",
        "3.4 DDL / DML / DCL 테이블 정의 및 조작",
        "3.5 SQL 집계 · 조인 · 윈도우 함수",
        "3.6 트랜잭션 ACID & 병행제어 / 뷰(View)"
    ],
    4: [
        "4.1 OSI 7계층 & TCP/UDP 프로토콜",
        "4.2 IPv4 서브넷 마스킹 계산",
        "4.3 라우팅 프로토콜 (OSPF/RIP)",
        "4.4 암호화 알고리즘 (대칭키/공개키/해시)",
        "4.5 네트워크 공격 기법 & 보안 취약점",
        "4.6 보안 솔루션 & 침입 차단"
    ],
    5: [
        "5.1 소프트웨어 테스팅 기본 원칙",
        "5.2 화이트박스 테스팅 & 순환복잡도",
        "5.3 블랙박스 테스팅 기법",
        "5.4 V-모델 & 테스트 레벨",
        "5.5 프로세스 관리 & CPU 스케줄링",
        "5.6 교착상태 (Deadlock) 발생 조건",
        "5.7 기억장치 관리 & 페이지 교체",
        "5.8 소프트웨어 형상 관리 (SCM)"
    ]
}

def classify_question(q):
    cat = (q.get('category') or '').strip()
    prompt = q.get('prompt', '')
    exp = q.get('explanation', '')
    ans = str(q.get('answer', ''))
    passage = q.get('passage', '')
    trap = q.get('trapPoint', '')
    code = q.get('code', '')
    
    full_text = f"{cat} {prompt} {exp} {ans} {passage} {trap} {code}".lower()
    
    # Unit 2: Direct programming language categories
    if cat in ('C', 'Java', 'Python'):
        return 2, extract_topic(q, 2)
        
    # Unit 3: Direct SQL / DB categories
    if cat in ('SQL', '데이터베이스'):
        return 3, extract_topic(q, 3)
        
    # Unit 4: Direct Network / Security
    if cat in ('네트워크', '보안'):
        return 4, extract_topic(q, 4)
        
    # Unit 5: Direct OS
    if cat == '운영체제':
        return 5, extract_topic(q, 5)
        
    # Specialized overrides for LoC, Fan-in/out -> Unit 1
    if any(k in full_text for k in ['loc(', 'cocomo', '기능점수', 'fp', 'man-month', '맨먼스', '비용 산정', '개발 비용', 'fan-in', 'fan-out']):
        return 1, extract_topic(q, 1)
        
    # Unit 5 (Testing & OS) keywords
    u5_strong = [
        '살충제', '테스트', '테스팅', '커버리지', '화이트박스', '블랙박스', '동등분할', 
        '경계값', '순환복잡도', '맥케이브', 'v-모델', 'v모델', '스케줄링', 'fcfs', 
        'sjf', 'hrn', '라운드로빈', 'round robin', '프로세스 상태', '교착상태', 
        'deadlock', '은행가', '상호배제', '비선점', '환형대기', '점유와대기', '페이징', 
        '세그멘테이션', 'lru', 'lfu', '페이지 교체', '워킹셋', '쓰레싱', '형상관리', 
        '형상 관리', '형상 식별', '형상 통제', '형상 감사', 'git', 'svn', 'cvs', 
        '성능 지표', '처리량', '경과시간', '반환시간', '대기시간', '자원사용률'
    ]
    if any(k in full_text for k in u5_strong):
        return 5, extract_topic(q, 5)

    # Unit 4 (Network & Security) keywords
    u4_strong = [
        'osi', 'tcp', 'udp', '서브넷', 'cidr', '라우팅', 'rip', 'ospf', 'bgp',
        '대칭키', '비대칭키', '공개키', '암호화', 'des', 'aes', 'rsa', 'sha', 'md5',
        'seed', 'aria', '스니핑', '스푸핑', 'syn', 'ddos', 'dos', '스머프', 'smurf',
        'xss', 'csrf', '방화벽', 'ids', 'ips', 'waf', 'vpn', 'dlp', 'nac', 
        '하이재킹', 'arp', 'icmp', 'ipsec', 'ssl', 'tls', '인증', '위협', '악성코드',
        '랜섬웨어', '트로이', '웜', '백도어', '소켓', '포트번호', '접근 통제', '접근통제',
        'mandatory access control', 'discretionary access control', '혼잡 제어', '혼잡제어',
        'nat', 'oauth', 'sql 삽입', 'sql인젝션', 'sql injection', '사설 ip', '공인 ip'
    ]
    if any(k in full_text for k in u4_strong):
        return 4, extract_topic(q, 4)

    # Unit 3 (Database & SQL) keywords
    u3_strong = [
        '릴레이션', '애트리뷰트', '튜플', '도메인', '차수', '카디널리티', '정규화', 
        '1nf', '2nf', '3nf', 'bcnf', '관계대수', '셀렉트', '프로젝트', '카티션', 
        '조인', '트랜잭션', 'acid', '원자성', '일관성', '격리성', '영속성', '회복', 
        'undo', 'redo', '로킹', 'locking', '2pl', '인덱스', '뷰(view)', '무결성', 
        '개체무결성', '참조무결성', '외래키', '기본키', '후보키'
    ]
    if any(k in full_text for k in u3_strong):
        return 3, extract_topic(q, 3)

    # Default: Unit 1 (Software Engineering)
    return 1, extract_topic(q, 1)

def extract_topic(q, unit):
    text = f"{q.get('prompt', '')} {q.get('explanation', '')} {q.get('answer', '')} {q.get('category', '')}".lower()
    
    if unit == 1:
        if any(k in text for k in ['패턴', 'pattern', '싱글톤', '팩토리', '옵서버', '어댑터', '데코레이터', '전략', '스트래티지', '빌더', '프로토타입', '컴포지트', '브리지', '퍼사드', '플라이웨이트', '프록시']):
            return "1.4 GoF 디자인 패턴"
        if any(k in text for k in ['결합도', '응집도', 'coupling', 'cohesion', '자료 결합도', '스탬프', '기능적 응집도', '순차적 응집도', '제어 결합도', '외부 결합도', '공통 결합도', '내용 결합도', 'fan-in', 'fan-out']):
            return "1.5 모듈 결합도 & 응집도"
        if any(k in text for k in ['solid', '단일책임', '개방폐쇄', '리스코프', '인터페이스분리', '의존역전', 'srp', 'ocp', 'lsp', 'isp', 'dip']):
            return "1.6 객체지향 설계 원칙 (SOLID)"
        if any(k in text for k in ['eai', 'esb', 'soap', 'wsdl', 'ajax', 'rest', 'json', 'xml', '미들웨어', 'point-to-point', 'hub & spoke', 'message bus']):
            return "1.7 EAI 구축 & 인터페이스 연계"
        if any(k in text for k in ['요구사항', 'uml', '유스케이스', '시퀀스', '다이어그램', '클래스', '애그리게이션', '컴포지션']):
            return "1.3 요구사항 분석 & UML"
        if any(k in text for k in ['sdlc', '애자일', '스크럼', 'xp', '폭포수', '나선형', '프로토타입']):
            return "1.1 개발 방법론 & SDLC"
        if any(k in text for k in ['loc', '비용', 'cocomo', '기능점수', 'fp', 'man-month', '맨먼스', 'cpm', '임계 경로']):
            return "1.2 프로젝트 관리 & 비용 산정"
        return "1.8 소프트웨어 아키텍처 & 설계"

    elif unit == 2:
        cat = q.get('category', '')
        if cat == 'C':
            if any(k in text for k in ['포인터', '*', '->', '배열', '이차원', '다차원', '주소', 'malloc']):
                return "2.1 C언어 포인터 & 다차원 배열"
            return "2.2 C언어 제어문 & 연산자 & 구조체"
        elif cat == 'Java':
            if any(k in text for k in ['static', '정적', '인터페이스', 'interface', 'abstract', '추상', '예외', 'try', 'catch', 'finally']):
                return "2.4 Java static & 인터페이스 / 예외"
            return "2.3 Java 객체지향 & 상속 / 다형성"
        elif cat == 'Python':
            if any(k in text for k in ['슬라이싱', '[:]', '딕셔너리', 'dict', 'set', '집합', '컴프리헨션', 'lambda', '람다', 'map', 'filter']):
                return "2.5 Python 슬라이싱 & 컬렉션 / 람다"
            return "2.6 Python 프로그래밍 기초"
        return "2.2 C언어 제어문 & 연산자 & 구조체"

    elif unit == 3:
        if any(k in text for k in ['정규화', '1nf', '2nf', '3nf', 'bcnf', '이상현상', '도부이결다조', '결정자', '무손실']):
            return "3.3 정규화 6단계 & 이상현상"
        if any(k in text for k in ['관계대수', '셀렉트', '프로젝트', '카티션', '조인 연산', '디비전', '릴레이션 이론', '차수', '카디널리티']):
            return "3.2 관계대수 & 릴레이션 이론"
        if any(k in text for k in ['group by', 'having', 'join', '윈도우', 'count', 'sum', 'rank', 'dense_rank', 'row_number', '집계']):
            return "3.5 SQL 집계 · 조인 · 윈도우 함수"
        if any(k in text for k in ['create', 'alter', 'drop', 'truncate', 'insert', 'update', 'delete', 'grant', 'revoke']):
            return "3.4 DDL / DML / DCL 테이블 정의 및 조작"
        if any(k in text for k in ['acid', '트랜잭션', '원자성', '일관성', '격리성', '영속성', '회복', '로킹', 'view', '뷰', '가상 테이블', '인덱스']):
            return "3.6 트랜잭션 ACID & 병행제어 / 뷰(View)"
        return "3.1 데이터 모델링 & 키 / 무결성 제약조건"

    elif unit == 4:
        if any(k in text for k in ['서브넷', 'cidr', '호스트', 'ip주소', '255.255', '넷마스크']):
            return "4.2 IPv4 서브넷 마스킹 계산"
        if any(k in text for k in ['osi', '계층', 'tcp', 'udp', '3-way', 'handshake']):
            return "4.1 OSI 7계층 & TCP/UDP 프로토콜"
        if any(k in text for k in ['라우팅', 'rip', 'ospf', 'bgp', 'igp', 'egp']):
            return "4.3 라우팅 프로토콜 (OSPF/RIP)"
        if any(k in text for k in ['대칭키', '비대칭키', '공개키', 'des', 'aes', 'rsa', 'sha', 'md5', 'seed', 'aria', '해시', '암호']):
            return "4.4 암호화 알고리즘 (대칭키/공개키/해시)"
        if any(k in text for k in ['스니핑', '스푸핑', 'ddos', 'syn', 'smurf', 'xss', 'csrf', '인젝션', '악성코드', '랜섬웨어', '트로이', '웜', '백도어', '공격', '취약점']):
            return "4.5 네트워크 공격 기법 & 보안 취약점"
        if any(k in text for k in ['방화벽', 'ids', 'ips', 'waf', 'vpn', 'nac', 'dlp', '접근 통제', '접근통제']):
            return "4.6 보안 솔루션 & 침입 차단"
        return "4.1 OSI 7계층 & TCP/UDP 프로토콜"

    elif unit == 5:
        if any(k in text for k in ['살충제', '테스팅 원칙', '결함 집중', '오류-부재', '조기 테스팅', '테스트 오라클', '테스트 케이스', '정적 분석', '성능 지표', '처리량']):
            return "5.1 소프트웨어 테스팅 기본 원칙"
        if any(k in text for k in ['커버리지', '화이트박스', '문장 커버리지', '분기 커버리지', '맥케이브', '순환복잡도', '구문 커버리지', '제어 흐름']):
            return "5.2 화이트박스 테스팅 & 순환복잡도"
        if any(k in text for k in ['동등분할', '동등 분할', '경계값', '블랙박스', '원인-결과', '의사결정 테이블', '동치', 'cause-effect']):
            return "5.3 블랙박스 테스팅 기법"
        if any(k in text for k in ['v-모델', 'v모델', '단위 테스트', '통합 테스트', '스텁', '드라이버', '인수 테스트', '알파 테스트', '베타 테스트', '회귀 테스트', '하네스', 'junit']):
            return "5.4 V-모델 & 테스트 레벨"
        if any(k in text for k in ['스케줄링', 'hrn', 'fcfs', 'sjf', 'rr', '라운드로빈', 'srt', '프로세스 상태', '디스패치', 'ipc', '공유 메모리', '세마포어']):
            return "5.5 프로세스 관리 & CPU 스케줄링"
        if any(k in text for k in ['교착상태', 'deadlock', '상호배제', '비선점', '환형대기', '점유와대기', '은행가', '로킹', '동시성 제어']):
            return "5.6 교착상태 (Deadlock) 발생 조건"
        if any(k in text for k in ['형상관리', '형상 관리', '형상 통제', '형상 식별', '형상 감사', 'scm', 'git', 'svn', 'cvs', 'ccb']):
            return "5.8 소프트웨어 형상 관리 (SCM)"
        if any(k in text for k in ['페이징', '세그멘테이션', 'lru', 'lfu', 'fifo', '페이지 교체', '쓰레싱', '워킹셋', '국부성', '단편화', '기억장치', 'raid', 'chmod', '유닉스', 'unix', '리눅스', 'linux', '안드로이드', '운영체제']):
            return "5.7 기억장치 관리 & 페이지 교체"
        return "5.1 소프트웨어 테스팅 기본 원칙"

    return "종합 실기 평가"


# ==============================================================================
# 3. 단원별 핵심 이론 교재 본문 (NCS 실기 표준 맞춤형)
# ==============================================================================
THEORY_CONTENT = {
    1: """
### 📌 1.1 개발 방법론 & SDLC
- **폭포수(Waterfall) 모형**: 각 단계를 순차적으로 완료한 후 다음 단계로 진행. 고전적, 요구사항 변경 어려움.
- **프로토타이핑(Prototyping) 모형**: 핵심 기능 프로토타입을 먼저 만들어 고객 피드백을 신속히 반영.
- **나선형(Spiral) 모형**: 폭포수 + 프로토타이핑 + **위험 분석(Risk Analysis)**을 결합하여 점진적으로 구축.
  - **반복 주기**: **계획 수립 ➔ 위험 분석 ➔ 개발 및 검증 ➔ 고객 평가**
- **애자일(Agile) 모형**: 변화에 유연하게 대응하며 고객과의 소통과 작동하는 소프트웨어를 중시.
  - **스크럼(Scrum)**: 2~4주의 반복 스프린트(Sprint), 제품 백로그(Product Backlog), 일일 스크럼(Daily Scrum), 스크럼 마스터, 소멸 차트(Burn-down Chart).
  - **XP (eXtreme Programming)**: 핵심 가치(**용기, 단순성, 의사소통, 피드백, 존중**), 실천 항목(**TDD, 짝 프로그래밍, 지속적 통합(CI), 리팩토링, 소규모 릴리즈**).

---

### 📌 1.2 프로젝트 관리 & 비용 산정
- **LoC(Line of Code) 모형**: 원시 코드 라인 수를 기준으로 개발 기간 및 비용 예측.
> 📐 **공식 (PERT & LoC 비용 산정)**:
> - **예측치 E = (a + 4m + b) / 6** (a: 낙관치, m: 최빈치/기대치, b: 비관치)
> - **노력(Man-Month) = 총 LoC / (1인당 월간 생산 라인 수)**
> - **개발 기간 = Man-Month / 투입 인원**
- **COCOMO 모형 (Boehm)**: 프로젝트 규모(KDSI)에 따른 비용 산정.
  - **조직형 (Organic)**: 5만 라인(50 KDSI) 이하의 중·소규모 소프트웨어.
  - **반분리형 (Semi-Detached)**: 30만 라인(300 KDSI) 이하의 트랜잭션 처리 시스템.
  - **임베디드형 (Embedded)**: 30만 라인 초과의 초대형 미션 크리티컬 시스템 (항공, 무기 등).
- **기능 점수(FP - Function Point)**: 사용자 관점에서 소프트웨어 기능(데이터 기능: ILF, EIF / 트랜잭션 기능: EI, EO, EQ)에 가중치를 부여하여 규모 산정.
- **일정 관리 (CPM & 간트 차트)**:
  - **임계 경로 (Critical Path)**: 프로젝트의 시작부터 종료까지 가장 긴 시간이 걸리는 경로 (여유 시간이 0).

---

### 📌 1.3 요구사항 분석 & UML
- **요구사항 분류**:
  - **기능적 요구사항**: 시스템이 실제로 무엇을 해야 하는가 (입출력, 비즈니스 로직, 데이터).
  - **비기능적 요구사항**: 시스템의 품질 특성 (성능, 보안성, 가용성, 신뢰성, 상호운용성, 인터페이스).
- **요구사항 개발 프로세스**: **도출(Elicitation) ➔ 분석(Analysis) ➔ 명세(Specification) ➔ 확인(Validation)**
- **UML(Unified Modeling Language) 다이어그램 분류**:
  - **구조적(정적) 다이어그램 (6종)**: 클래스(Class), 객체(Object), 컴포넌트(Component), 배치(Deployment), 복합체 구조(Composite Structure), 패키지(Package).
  - **행위적(동적) 다이어그램 (7종)**: 유스케이스(Use Case), 시퀀스(Sequence), 커뮤니케이션(Communication), 상태(State Machine), 활동(Activity), 상호작용 개요(Interaction Overview), 타이밍(Timing).
- **UML 관계(Relationships) 표현법**:
  - **연관(Association)**: 실선 (양방향/단방향 참조).
  - **집합(Aggregation)**: 전체-부분 관계, 독립적 생명주기 (**빈 마름모 ◇**).
  - **포함/합성(Composition)**: 전체-부분 관계, 강력한 종속성 (**채워진 마름모 ◆**).
  - **일반화(Generalization)**: 상속 관계 (**빈 삼각형 화살표 ▷**).
  - **의존(Dependency)**: 일시적 참조 (**점선 화살표 ⤏**).
  - **실체화(Realization)**: 인터페이스 구현 (**점선 빈 삼각형 화살표**).

---

### 📌 1.4 GoF 디자인 패턴
> **주요 출제 포인트 요약 표**

| 분류 | 패턴명 | 핵심 정의 및 수험 암기 키워드 |
| :--- | :--- | :--- |
| **생성 (5종)** | **Singleton** | 전역에서 단 하나의 인스턴스만 생성하여 공유하는 패턴 |
| | **Factory Method** | 객체 생성을 하위 서브클래스에 위임하여 캡슐화 |
| | **Abstract Factory** | 연관된 객체들의 군(Family)을 생성하기 위한 상위 인터페이스 제공 |
| | **Builder** | 복잡한 객체의 생성 과정과 표현 방법을 분리하여 단계별 조립 |
| | **Prototype** | 원형이 되는 인스턴스를 복제(Clone)하여 객체를 생성 |
| **구조 (7종)** | **Adapter** | 호환성이 없는 인터페이스를 다른 클래스가 요구하는 규격으로 변환 |
| | **Bridge** | 구현부와 추상부를 분리하여 독립적으로 확장 가능하게 구성 |
| | **Composite** | 단일 객체와 복합 객체를 동일하게 취급 (트리 구조 표현) |
| | **Decorator** | 기존 객체를 포장(Wrapper)하여 동적으로 새로운 기능을 확장 추가 |
| | **Facade** | 복잡한 서브시스템에 대해 단순화된 상위 단일 창구 인터페이스 제공 |
| | **Flyweight** | 많은 수의 유사 객체를 생성할 때 메모리를 절약하기 위해 인스턴스 공유 |
| | **Proxy** | 실제 객체에 대한 접근을 제어하거나 대리인 역할을 수행 |
| **행위 (11종)** | **Observer** | 주체 객체의 상태 변화 시 등록된 모든 구독자에게 자동으로 통지 |
| | **Strategy** | 동일 계열의 알고리즘을 캡슐화하여 런타임에 동적으로 교체 가능하게 함 |
| | **Template Method**| 상위 클래스에서 알고리즘의 골격을 정의하고 하위 클래스에서 구체화 |
| | **Command** | 실행할 연산/요청을 객체로 캡슐화하여 매개변수화 및 실행 취소 지원 |
| | **Iterator** | 내부 구현 노출 없이 복합 객체의 원소들에 순차적으로 접근 |
| | **Mediator** | 객체 간의 복잡한 상호작용을 중재자 객체에 집중시켜 결합도 완화 |
| | **Memento** | 객체의 내부 상태를 저장하여 나중에 해당 시점으로 롤백(Undo) 지원 |
| | **State** | 객체 내부의 상태에 따라 행위를 클래스화하여 상태 전이 처리 |
| | **Visitor** | 객체 구조를 변경하지 않고 새로운 연산 기능을 외부에서 추가 |
| | **Chain of Resp.**| 요청을 처리할 수 있는 기회를 여러 객체에 체인 형태로 전달 |
| | **Interpreter** | 언어의 문법 규칙을 클래스로 표현하여 SQL/수식 등을 구문 분석 |

---

### 📌 1.5 모듈 결합도 & 응집도
- **결합도 (Coupling)**: 모듈 간의 상호 의존 정도 (**낮을수록 우수**)
  - **결합도 약함(우수) ➔ 강함(취약) 7단계**:
  - **자료(Data) ➔ 스탬프(Stamp) ➔ 제어(Control) ➔ 외부(External) ➔ 공통(Common) ➔ 내용(Content)**
  - **암기 공식**: **자 - 스 - 제 - 외 - 공 - 내**
    - **자료 결합도**: 단순 값 파라미터만 전달.
    - **스탬프 결합도**: 배열이나 레코드 등 복합 자료구조 전달.
    - **제어 결합도**: 제어 신호(플래그)를 전달하여 다른 모듈의 로직을 통제.
    - **외부 결합도**: 외부 통신 프로토콜, 환경 변수 공유.
    - **공통 결합도**: 전역 변수(Global Variable) 공유 (참조/수정).
    - **내용 결합도**: 다른 모듈 내부의 변수나 코드를 직접 침범하여 참조/수정 (최악).
- **응집도 (Cohesion)**: 모듈 내부 구성 요소 간의 밀접 정도 (**높을수록 우수**)
  - **응집도 강함(우수) ➔ 약함(취약) 7단계**:
  - **기능적(Functional) ➔ 순차적(Sequential) ➔ 교환적/통신적(Communicational) ➔ 절차적(Procedural) ➔ 시간적(Temporal) ➔ 논리적(Logical) ➔ 우연적(Coincidental)**
  - **암기 공식**: **기 - 순 - 교 - 절 - 시 - 논 - 우**
    - **기능적 응집도**: 단일 목적의 완전한 단 하나의 기능만 수행.
    - **순차적 응집도**: 한 작업의 출력이 다음 작업의 입력으로 직접 사용됨.
    - **교환적(통신적) 응집도**: 동일한 입출력 데이터를 사용하여 서로 다른 기능 수행.
    - **절차적 응집도**: 순차적으로 실행되는 여러 관련 기능을 모음.
    - **시간적 응집도**: 특정 시간대(초기화, 종료 등)에 동시에 실행되는 기능들.
    - **논리적 응집도**: 유사한 성격의 기능들을 한 곳에 모아둠.
    - **우연적 응집도**: 아무 관련 없는 요소들이 우연히 한 모듈에 존재 (최악).
- **Fan-in vs Fan-out**:
  - **Fan-in**: 모듈을 호출하는 상위 모듈의 수 (들어오는 화살표 수).
  - **Fan-out**: 모듈이 호출하는 하위 모듈의 수 (나가는 화살표 수).

---

### 📌 1.6 객체지향 설계 원칙 (SOLID)
1. **SRP (단일 책임 원칙)**: 클래스는 단 하나의 변경 이유와 책임만 가져야 함.
2. **OCP (개방-폐쇄 원칙)**: 확장에 열려 있고 변경에는 닫혀 있어야 함 (인터페이스 활용).
3. **LSP (리스코프 치환 원칙)**: 하위 클래스는 상위 클래스의 인스턴스를 완벽히 대체할 수 있어야 함.
4. **ISP (인터페이스 분리 원칙)**: 사용하지 않는 인터페이스 메서드에 클라이언트가 의존하지 않아야 함.
5. **DIP (의존 역전 원칙)**: 상위 모듈은 구체 클래스가 아닌 추상화(인터페이스)에 의존해야 함.

---

### 📌 1.7 EAI 구축 & 인터페이스 연계
- **EAI(Enterprise Application Integration) 구축 유형**:
  - **Point-to-Point**: 1:1 직접 연결, 연계 개수가 늘어날수록 복잡도 급증 (N(N-1)/2).
  - **Hub & Spoke**: 단일 중앙 허브를 통해 메시지 중계 (중앙 집중형, 허브 장애 시 전체 마비).
  - **Message Bus**: 대용량 통합 버스(ESB 미들웨어)를 통해 미들웨어 연계 (확장성 최상).
  - **Hybrid**: Hub & Spoke의 내부 그룹화 + Message Bus 간 연동 혼합.
- **연계 데이터 포맷 & 통신 기술**:
  - **JSON**: 경량의 텍스트 기반 Key-Value 데이터 교환 표준.
  - **XML**: 확장 가능한 마크업 언어, W3C 표준.
  - **AJAX**: 비동기 JavaScript와 XML을 이용한 페이지 무새로고침 부분 갱신 기술.
  - **SOAP**: HTTP, HTTPS, SMTP를 통해 XML 기반 메시지를 교환하는 프로토콜 (WSDL, UDDI 연계).
  - **REST**: HTTP 메서드(GET, POST, PUT, DELETE)와 URI를 활용하여 자원을 명시하는 아키텍처.

---

### 📌 1.8 소프트웨어 아키텍처 & 설계
- **소프트웨어 아키텍처 기본 원칙**:
  - **모듈화(Modularity)**: 소프트웨어를 작고 독립적인 모듈로 분할하여 복잡도 감소 및 재사용성 향상.
  - **추상화(Abstraction)**: 복잡한 현실 세계의 본질적 특성만을 간추려 표현 (제어 추상화, 자료 추상화, 기능 추상화).
  - **단계적 분해(Stepwise Refinement)**: 하향식 설계 방식으로 상위 추상 개념에서 구체적 세부 구현으로 점진적 세분화.
  - **정보 은닉(Information Hiding)**: 모듈 내부의 상세한 구현 세부 사항을 감추고 필요한 인터페이스만 외부에 공개.
- **소프트웨어 아키텍처 패턴**:
  - **계층형(Layered) 패턴**: 모듈을 상하 계층으로 구성하여 인접한 상위/하위 계층 간에만 상호작용 (OSI 7계층, 웹 애플리케이션 3계층).
  - **클라이언트-서버(Client-Server) 패턴**: 서비스를 요청하는 클라이언트와 서비스를 제공하는 서버로 분리.
  - **파이프-필터(Pipe-Filter) 패턴**: 데이터 스트림을 필터 모듈을 거쳐 순차 처리 (UNIX 파이프 line).
  - **MVC(Model-View-Controller) 패턴**: 모델(데이터·비즈니스 로직), 뷰(사용자 UI), 컨트롤러(사용자 입력 제어 및 흐름 통제)로 관심사 분리.
- **아키텍처 품질 속성**:
  - 시스템 품질: 성능, 가용성, 보안성, 변경용이성, 사용성, 신뢰성.
  - 비즈니스 품질: 시장 적시성, 비용 절감, 시스템 수명.
""",

    2: """
### 📌 2.1 C언어 포인터 & 다차원 배열
- **포인터 기초 문법**:
  - `int a = 10; int *p = &a;`
  - `&a`: 변수 `a`의 메모리 주소값.
  - `p`: 주소값을 저장하는 포인터 변수 (`p == &a`).
  - `*p`: 포인터가 가리키는 메모리 주소의 실제 값 역참조 (`*p == 10`).
- **포인터 연산자 우선순위 (주의 포인트)**:
  - `*p++`: 현재 `*p`의 값을 반환한 후, 포인터 주소 `p`를 다음 원소로 1 이동.
  - `(*p)++`: `*p`가 가리키는 실제 정수값을 1 증가시킴.
  - `*++p`: 포인터 주소 `p`를 먼저 다음 칸으로 이동한 후 그 위치의 값을 역참조.
  - `++*p`: `*p`가 가리키는 실제 정수값을 먼저 1 증가시킨 후 그 값을 참조.
- **1차원 배열과 포인터의 관계**:
  - 배열 이름 `arr`은 배열의 시작 주소 `&arr[0]`과 동일.
  - `arr + i == &arr[i]`
  - `*(arr + i) == arr[i]`
  - `*(p + 2)`는 2칸 뒤 원소의 값, `*p + 2`는 첫 원소 값에 정수 2를 더한 값.
- **2차원 배열과 배열 포인터**:
  - `int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};`
  - `int (*p)[3] = arr;` (열의 크기가 3인 1차원 배열을 가리키는 배열 포인터)
  - `p + 1`은 1행(arr[1]) 전체를 건너뜀 (3 × 4 = 12바이트 이동).
  - `*(p + 1) + 2`는 `&arr[1][2]`의 주소.
  - `*(*(p + 1) + 2)`는 `arr[1][2]`의 실제 값인 `6`.
- **동적 메모리 할당**:
  - `int *p = (int *)malloc(sizeof(int) * 5);`
  - 동적 할당된 메모리는 사용 후 반드시 `free(p);`를 호출하여 해제.

---

### 📌 2.2 C언어 제어문 & 연산자 & 구조체
- **제어문과 반복문**:
  - `for (초기식; 조건식; 증감식)`: 정해진 횟수만큼 반복 실행.
  - `while (조건식)` / `do { ... } while (조건식);`: 조건에 따른 반복 제어.
  - `switch (변수) { case 값: ... break; default: ... }`
- **연산자 및 비트 연산**:
  - 증감 연산자 (`++i` 전위 vs `i++` 후위), 삼항 연산자 (`조건 ? 참값 : 거짓값`).
  - 비트 연산자: AND(`&`), OR(`|`), XOR(`^`), NOT(`~`), 좌/우 시프트(`<<`, `>>`).
- **C언어 표준 문자열 함수**:
  - `strlen(s)`: 널 문자(`\\0`)를 제외한 순수 문자열 길이.
  - `strcpy(dest, src)`: 문자열 복사.
  - `strcat(dest, src)`: `dest` 뒤에 `src`를 이어붙임.
  - `strcmp(s1, s2)`: 같으면 `0`, `s1 > s2`이면 양수, `s1 < s2`이면 음수 반환.
- **구조체와 화살표 연산자**:
  - `struct Data d = {10}; struct Data *p = &d;`
  - `p->val`은 `(*p).val`과 100% 동일한 표현.
- **재귀 함수 (Recursion)**:
  - 함수 내부에서 자기 자신을 호출하는 방식으로, 기저 조건(Base Case)이 없으면 스택 오버플로우 발생.

---

### 📌 2.3 Java 객체지향 & 상속 / 다형성
- **생성자(Constructor) 호출 순서**:
  - 자식 객체 `Child c = new Child();`를 생성하면:
  - 1단계: 부모 생성자 `Parent()`가 묵시적 `super()` 호출에 의해 먼저 실행됨.
  - 2단계: 그 후 자식 생성자 `Child()` 본문이 실행됨.
- **오버라이딩(Overriding) vs 오버로딩(Overloading)**:
  - **오버라이딩**: 부모의 메서드를 자식이 시그니처(이름, 매개변수, 반환형)를 동일하게 재정의 (동적 바인딩).
  - **오버로딩**: 같은 클래스 내에서 메서드 이름은 같고 매개변수 타입/개수를 다르게 선언 (정적 바인딩).
- **상속과 다형성 참조 규칙 (주요 출제 포인트)**:
  - `Parent obj = new Child();`
  - **멤버 변수 접근 (`obj.x`)**: 참조 변수의 선언 타입인 **`Parent`의 변수**를 참조! (변수는 오버라이딩되지 않음).
  - **멤버 메서드 호출 (`obj.show()`)**: 실제 인스턴스인 **`Child`의 오버라이딩된 메서드**가 동적으로 호출됨!

---

### 📌 2.4 Java static & 인터페이스 / 예외
- **`static` 키워드**:
  - 인스턴스를 생성하지 않아도 클래스 로딩 시점에 단 한 번 메모리에 할당.
  - 모든 인스턴스가 동일한 단 하나의 메모리 공간을 공유 (카운터, 싱글톤 등에 활용).
- **추상 클래스 vs 인터페이스**:
  - **추상 클래스 (`abstract class`)**: 하나 이상의 추상 메서드를 포함할 수 있으며 단일 상속만 지원.
  - **인터페이스 (`interface`)**: 다중 구현(`implements`) 가능, 모든 필드는 `public static final`, 메서드는 `public abstract`.
- **예외 처리 흐름**:
  - `try { 예외발생가능코드 } catch (Exception e) { 예외처리 } finally { 무조건실행 }`
  - `finally` 블록은 `try` 내부에 `return` 문이 있어도 **반드시 실행된 후 반환**됨!

---

### 📌 2.5 Python 슬라이싱 & 컬렉션 / 람다
- **음수 인덱스 & 슬라이싱 문법**: `arr[start:end:step]`
  - 음수 인덱스는 뒤에서부터 `-1, -2, -3...`
  - `arr[::-1]`: 배열 또는 문자열을 통째로 역순 반전.
  - `arr[1:4]`: 인덱스 1부터 3까지 (끝 인덱스 4는 미포함).
  - `arr[-3:]`: 뒤에서 3번째 원소부터 끝까지.
- **컬렉션 핵심 특징**:
  - **리스트 `[ ]`**: 순서 있음, 원소 수정 가능(Mutable).
  - **튜플 `( )`**: 순서 있음, 원소 수정 불가능(Immutable, 읽기 전용).
  - **세트 `{ }`**: 중복 자동 제거, 순서 없음 (합집합 `|`, 교집합 `&`, 차집합 `-`).
  - **딕셔너리 `{k: v}`**: Key-Value 쌍, `d.get(k, default)`는 키가 없어도 예외 없이 기본값 반환.
- **리스트 컴프리헨션 (List Comprehension)**:
  - `[x * 2 for x in arr if x % 2 == 0]` ➔ 짝수만 골라 2배한 새 리스트 생성.
- **람다식(Lambda) 및 고차 함수**:
  - `add = lambda a, b: a + b`
  - `list(map(lambda x: x + 1, [1, 2, 3])) == [2, 3, 4]`
  - `list(filter(lambda x: x > 2, [1, 2, 3])) == [3]`

---

### 📌 2.6 Python 프로그래밍 기초
- **기본 문법과 입출력**:
  - 동적 타이핑 언어로 변수 선언 시 타입을 명시하지 않음.
  - f-string 포맷팅: `f"결과: {val}"`
- **반복문과 내장 함수**:
  - `range(stop)` 또는 `range(start, stop, step)`
  - `enumerate(iterable)`: 인덱스와 요소를 튜플로 반환.
  - `zip(list1, list2)`: 두 리스트를 병합 순회.
- **함수 정의와 언패킹**:
  - `def func(*args, **kwargs)`: 가변 인자 패킹/언패킹 지원.
""",

    3: """
### 📌 3.1 데이터 모델링 & 키 / 무결성 제약조건
- **릴레이션의 기본 용어**:
  - **튜플(Tuple)**: 릴레이션의 각 행(Row, 레코드).
  - **애트리뷰트(Attribute)**: 릴레이션의 각 열(Column, 속성).
  - **도메인(Domain)**: 하나의 애트리뷰트가 취할 수 있는 원자값들의 집합.
  - **차수(Degree)**: 릴레이션의 **속성(열)의 개수**.
  - **카디널리티(Cardinality)**: 릴레이션의 **튜플(행)의 개수**.
- **키(Key)의 분류**:
  - **슈퍼키(Super Key)**: 유일성(O), 최소성(X).
  - **후보키(Candidate Key)**: 유일성(O), 최소성(O)을 모두 만족하는 속성 집합.
  - **기본키(Primary Key)**: 후보키 중 선정된 주 키 (Not Null + Unique).
  - **대체키(Alternate Key)**: 기본키로 선택되지 못한 나머지 후보키.
  - **외래키(Foreign Key)**: 참조 릴레이션의 기본키를 참조하는 속성.
- **무결성(Integrity) 제약조건**:
  - **개체 무결성(Entity Integrity)**: 기본키는 Null이나 중복값을 가질 수 없음.
  - **참조 무결성(Referential Integrity)**: 외래키 값은 참조하는 기본키 값과 일치하거나 Null이어야 함.
    - 참조 무결성 옵션: `CASCADE`(연쇄 삭제/수정), `RESTRICT`(참조 중 삭제 거절), `SET NULL`(Null로 설정).
  - **도메인 무결성**: 속성값은 정의된 도메인의 범위(타입, 허용값)를 만족해야 함.

---

### 📌 3.2 관계대수 & 릴레이션 이론
- **순수 관계 연산자 (4종)**:
  - **Select (σ, 시그마)**: 조건에 맞는 튜플(행)을 수평으로 분리.
  - **Project (π, 파이)**: 원하는 속성(열)을 수직으로 추출.
  - **Join (⋈, 조인)**: 공통 속성을 기준으로 두 릴레이션을 결합.
  - **Division (÷, 디비전)**: 릴레이션 R에서 S의 모든 조건을 만족하는 튜플 분리.
- **일반 집합 연산자 (4종)**:
  - 합집합(∪), 교집합(∩), 차집합(-), 카티션 프로덕트(×).
> 📐 **공식 (카티션 프로덕트 차수 & 카디널리티)**:
> - **합성 차수 = 차수₁ + 차수₂**
> - **합성 카디널리티 = 카디널리티₁ × 카디널리티₂**

---

### 📌 3.3 정규화 6단계 & 이상현상
- **이상 현상 (Anomaly)**: 테이블 설계 부실로 인한 삽입 이상, 갱신 이상, 삭제 이상.
- **정규화 6단계 공식 (암기 두문자: 도 - 부 - 이 - 결 - 다 - 조)**:

| 정규형 | 정규화 조건 및 제거 대상 | 수험 핵심 암기 포인트 |
| :--- | :--- | :--- |
| **비정규형 ➔ 1NF** | **원자값(Atomic Value)**으로 구성 | 반복 그룹 및 다중값 제거 |
| **1NF ➔ 2NF** | **부분 함수 종속성 제거** | 복합 기본키의 일부분에 종속되는 속성 분리 (완전 함수 종속) |
| **2NF ➔ 3NF** | **이행적 함수 종속성 제거** | A ➔ B 이고 B ➔ C 일 때 A ➔ C 분리 |
| **3NF ➔ BCNF** | **모든 결정자가 후보키** | 결정자이면서 후보키가 아닌 것 분리 |
| **BCNF ➔ 4NF** | **다치 종속성(MVD) 제거** | 다치 종속 관계 독립 릴레이션으로 분리 |
| **4NF ➔ 5NF** | **조인 종속성(JD) 제거** | 후보키를 통하지 않는 조인 종속 제거 |

- **반정규화(De-normalization)**: 성능 향상, 쿼리 단순화를 위해 정규화 원칙을 의도적으로 위배 (테이블 병합/분할, 중복 컬럼 추가).

---

### 📌 3.4 DDL / DML / DCL 테이블 정의 및 조작
- **DDL (데이터 정의어)**:
  - `CREATE TABLE 학생 (학번 CHAR(8) PRIMARY KEY, 이름 VARCHAR(20) NOT NULL, 지도교수 VARCHAR(20), FOREIGN KEY (지도교수) REFERENCES 교수(교수ID) ON DELETE CASCADE);`
  - `ALTER TABLE 학생 ADD (연락처 VARCHAR(15));`
  - `DROP TABLE 학생 CASCADE;`
- **DML (데이터 조작어)**:
  - `INSERT INTO 학생 (학번, 이름) VALUES ('2026001', '홍길동');`
  - `UPDATE 학생 SET 이름 = '김철수' WHERE 학번 = '2026001';`
  - `DELETE FROM 학생 WHERE 학번 = '2026001';`
- **DCL & TCL (제어어)**:
  - `GRANT SELECT, INSERT ON 학생 TO user1 WITH GRANT OPTION;`
  - `REVOKE INSERT ON 학생 FROM user1 CASCADE;`
  - `COMMIT;` (영구 반영), `ROLLBACK;` (취소 롤백).

---

### 📌 3.5 SQL 집계 · 조인 · 윈도우 함수
- **SELECT 절 작성 순서와 집계**:
  - `SELECT 부서, AVG(급여) AS 평균급여 FROM 직원 WHERE 재직상태 = '재직' GROUP BY 부서 HAVING AVG(급여) >= 4000 ORDER BY 평균급여 DESC;`
- **테이블 조인 연산**:
  - **내부 조인(INNER JOIN)**: 공통 조건이 일치하는 튜플만 반환.
  - **외부 조인(OUTER JOIN)**: 조건 불일치 행도 NULL로 포함 (LEFT, RIGHT, FULL OUTER JOIN).
- **윈도우 함수 (순위 매기기)**:
  - `ROW_NUMBER()`: 무조건 고유 순위 부여 (1, 2, 3, 4)
  - `RANK()`: 동순위 발생 시 다음 순위 건너뜀 (1, 2, 2, 4)
  - `DENSE_RANK()`: 동순위 발생 시 다음 순위 연속 부여 (1, 2, 2, 3)

---

### 📌 3.6 트랜잭션 ACID & 병행제어 / 뷰(View)
- **트랜잭션 ACID 주요 특성**:
  - **원자성 (Atomicity)**: All or Nothing. 모두 반영되거나 전혀 반영되지 않아야 함.
  - **일관성 (Consistency)**: 트랜잭션 수행 완료 후에도 DB 무결성 제약조건 유지.
  - **격리성/고립성 (Isolation)**: 동시 수행 중인 트랜잭션끼리 서로 연산 중간 결과를 간섭할 수 없음.
  - **지속성/영속성 (Durability)**: 성공적으로 완료된 트랜잭션의 결과는 영구 보존됨.
- **병행 제어 미보장 시 문제점**: 갱신 분실(Lost Update), 모순성(Inconsistency), 연쇄 복귀(Cascading Rollback), 비완료 의존성.
- **동시성 제어 기법**: 2단계 로킹 규약 (2PL - 확장 단계와 축소 단계).
- **회복 기법**: REDO(재실행), UNDO(취소), WAL(Write-Ahead Logging), 체크포인트(검사점) 회복.
- **뷰(VIEW)**: 가상 테이블. 보안성 향상, 쿼리 단순화. 독자적인 물리적 인덱스 소유 불가.
""",

    4: """
### 📌 4.1 OSI 7계층 & TCP/UDP 프로토콜
- **OSI 7계층 구조와 프로토콜**:
  - **7계층 응용(Application)**: HTTP, FTP, SMTP, DNS, DHCP (데이터 단위: Data)
  - **6계층 표현(Presentation)**: JPEG, MPEG, ASCII, 암호화, 데이터 압축 (단위: Data)
  - **5계층 세션(Session)**: RPC, NetBIOS, 동기점 관리 (단위: Data)
  - **4계층 전송(Transport)**: TCP, UDP, 포트 번호 기반 전달 (단위: **Segment**)
  - **3계층 네트워크(Network)**: IP, ICMP, IGMP, ARP, RARP, 라우터 (단위: **Packet**)
  - **2계층 데이터링크(Data Link)**: 이더넷, MAC 주소, 스위치, 브리지 (단위: **Frame**)
  - **1계층 물리(Physical)**: 케이블, 허브, 리피터, 비트 신호 (단위: **Bit**)
- **TCP vs UDP 비교**:
  - **TCP**: 연결 지향, 가상 회선, 신뢰성 보장, 흐름제어(슬라이딩 윈도우), 혼잡제어.
    - 연결 수립: **3-way Handshake** (`SYN` ➔ `SYN + ACK` ➔ `ACK`)
    - 연결 종료: **4-way Handshake** (`FIN` ➔ `ACK` ➔ `FIN` ➔ `ACK`)
  - **UDP**: 비연결 지향, 데이터그램, 신뢰성 없음, 속도 빠름, 오버헤드 적음 (헤더 8바이트 고정), 실시간 스트리밍/DNS.

---

### 📌 4.2 IPv4 서브넷 마스킹 계산
> 📐 **공식 (IPv4 서브넷 호스트 수 계산)**:
> - **전체 IP 개수 = 2ʰ** (h = 32 - 프리픽스 비트 수)
> - **가용 호스트 IP 개수 = 2ʰ - 2** (네트워크 ID 1개 + 브로드캐스트 주소 1개 제외)

1. **서브넷 마스크 비트 수 확인**:
   - 예: `192.168.1.0/26` ➔ 서브넷 마스크 프리픽스가 `/26`
   - 상위 26비트가 `1`이고, 하위 32 - 26 = 6비트가 호스트 비트.
   - 서브넷 마스크: `255.255.255.192` (128 + 64 = 192)
2. **서브넷당 전체 IP 수 계산**:
   - 호스트 비트 수가 h일 때, 전체 IP 개수 = **2ʰ = 2⁶ = 64개**.
   - 서브넷 블록 구간: `0~63`, `64~127`, `128~191`, `192~255`
3. **실제 할당 가능한 호스트 IP 수 계산 (필수 제외 2개!)**:
   - **2⁶ - 2 = 64 - 2 = 62개**.
   - 첫 번째 IP는 **네트워크 ID** (예: `192.168.1.0`)
   - 마지막 IP는 **브로드캐스트 주소** (예: `192.168.1.63`)
   - 사용 가능한 호스트 IP 범위: `192.168.1.1` ~ `192.168.1.62`

---

### 📌 4.3 라우팅 프로토콜 (OSPF/RIP)
- **내부 게이트웨이 프로토콜 (IGP)**:
  - **RIP**: 거리 벡터(Bellman-Ford) 알고리즘. 최적 경로 척도로 **홉 수(Hop Count, 최대 15)** 사용. 30초마다 전체 라우팅 정보 브로드캐스팅. 소규모 망에 적합.
  - **OSPF**: 링크 상태(Dijkstra 다익스트라 SPF) 알고리즘. 홉 수 제한 없음. 네트워크 상태 변화 시에만 플러딩. 대규모 기업 네트워크에 최적화.
- **외부 게이트웨이 프로토콜 (EGP)**:
  - **BGP**: 경로 벡터 알고리즘. 서로 다른 자치 시스템(AS) 간 라우팅. 루프 방지 메커니즘 제공.

---

### 📌 4.4 암호화 알고리즘 (대칭키/공개키/해시)
- **대칭키 (비밀키) 암호**:
  - 암호화 키 = 복호화 키. 암복호화 속도 빠름. 키 배송 및 관리 부담 (N(N-1)/2).
  - **블록 암호**: **DES** (64비트 블록, 56비트 키), **AES** (128비트 블록, 128/192/256 키), **SEED** (128비트, 한국 KISA), **ARIA** (128/192/256, 한국 국가보안기술연구소).
  - **스트림 암호**: **RC4**.
- **비대칭키 (공개키) 암호**:
  - 공개키(Public Key)로 암호화하고 개인키(Private Key)로 복호화. 키 분배 용이, 키 개수 2N개로 절감. 계산 속도 느림.
  - **소인수분해 기반**: **RSA**.
  - **이산대수 기반**: **Diffie-Hellman** (최초의 비밀키 교환 프로토콜), **DSA**.
  - **타원곡선 기반**: **ECC** (짧은 키 길이로 높은 보안 강도 제공).
- **일방향 해시 함수**:
  - 임의 길이 메시지를 고정 길이 다이제스트로 변환. 복호화 불가능 (무결성 검증, 전자서명).
  - **SHA-256** (256비트 출력), **MD5** (128비트 출력, 충돌 취약).

---

### 📌 4.5 네트워크 공격 기법 & 보안 취약점
- **서비스 거부 공격 (DoS / DDoS)**:
  - **SYN Flooding**: 대량의 TCP SYN 요청을 보낸 뒤 ACK를 보내지 않아 서버의 대기 큐(Backlog Queue)를 고갈시킴.
  - **Smurf**: 출발지 IP를 희생자 IP로 위조(스푸핑)하여 네트워크 브로드캐스트 주소로 ICMP Echo Request를 전송, 다수의 호스트가 희생자에게 일제히 응답하게 만듦.
  - **Land Attack**: 패킷의 송신자 IP와 수신자 IP를 희생자 IP로 동일하게 위조하여 자기 자신과 무한 루프 응답을 유발.
  - **Ping of Death**: 허용 규격보다 큰 대용량 ICMP 패킷을 단편화 전송하여 재조합 시 시스템 다운 유발.
- **웹 취약점 및 응용 계층 공격**:
  - **SQL 인젝션**: 입력값 검증 부재를 틈타 악의적인 SQL 구문을 삽입하여 DB 비인가 접근.
  - **XSS (크로스 사이트 스크립팅)**: 웹 페이지에 악성 자바스크립트를 삽입하여 희생자의 세션 쿠키를 탈취.
  - **CSRF**: 희생자가 로그인된 신뢰 상태를 도용하여 희생자 모르게 서버에 변조 요청을 전송하게 유도.

---

### 📌 4.6 보안 솔루션 & 침입 차단
- **주요 네트워크 보안 솔루션**:
  - **방화벽(Firewall)**: IP/Port 기반 네트워크 패킷 인바운드/아웃바운드 필터링.
  - **IDS (침입 탐지 시스템)**: 비인가 침입 실시간 모니터링 및 경고 (오용 탐지-패턴매칭 vs 이상 탐지-통계).
  - **IPS (침입 방지 시스템)**: 침입 탐지 즉시 해당 악성 패킷을 능동적으로 차단.
  - **WAF (웹 방화벽)**: SQL 인젝션, XSS 등 7계층 웹 공격 전용 차단.
  - **VPN (가상 사설망)**: 공중망을 사설 전용망처럼 안전하게 암호화 터널링 (IPSec, SSL).
  - **NAC (네트워크 접근 제어)**: 내부망 접속 단말의 무결성 점검 및 접근 권한 통제.
  - **DLP (데이터 유출 방지)**: 사내 기밀 정보가 외부로 무단 반출되는 것을 감시 및 차단.
- **접근 통제 정책**:
  - **강제적 접근 통제(MAC)**: 보안 등급과 인가 등급에 기반.
  - **임의적 접근 통제(DAC)**: 데이터 소유자가 접근 권한을 결정.
  - **역할 기반 접근 통제(RBAC)**: 사용자의 역할에 따라 권한 부여.
""",

    5: """
### 📌 5.1 소프트웨어 테스팅 기본 원칙
1. **살충제 패러독스 (Pesticide Paradox)**: 동일한 테스트 케이스로 반복 테스트하면 더 이상 새로운 결함을 발견할 수 없음 (주기적 TC 리뷰 및 신규 케이스 추가 필수).
2. **결함 집중 (Defect Clustering)**: 소프트웨어 결함의 대부분(80%)은 소수의 특정 복잡한 모듈(20%)에 집중됨 (파레토의 법칙).
3. **테스팅은 결함이 존재함을 보이는 것**: 결함을 찾아낼 수는 있으나, 소프트웨어에 결함이 없음을 증명할 수는 없음.
4. **완벽한 테스팅은 불가능 (Exhaustive Testing is impossible)**: 모든 입력과 조건 조합을 100% 테스트하는 것은 불가능하므로 위험도 기반 우선순위 설정.
5. **조기 테스팅 (Early Testing)**: 개발 초기 단계(요구사항 분석)부터 테스팅을 시작해야 결함 수정 비용(SDLC 후반 급증)을 최소화할 수 있음.
6. **정황 의존성 (Context Dependency)**: 도메인과 상황(금융, 의료, 임베디드, 게임)에 따라 테스팅 접근법이 달라져야 함.
7. **오류-부재의 궤변 (Absence-of-Errors Fallacy)**: 사용자의 요구사항을 충족시키지 못하거나 유용성이 없는 소프트웨어는 결함이 없어도 쓸모없음.
- **테스트 오라클(Test Oracle) 유형**:
  - **참(True) 오라클**: 모든 입력값에 대해 기대 결과를 완벽히 생성.
  - **샘플링(Sampling) 오라클**: 선별된 몇 개의 대표 입력값에 대해서만 결과 제공.
  - **휴리스틱(Heuristic) 오라클**: 특정 입력에 대해 추정치를 바탕으로 판정.
  - **일관성 검사 오라클**: 애플리케이션 변경 전후의 결과 일관성을 검증.

---

### 📌 5.2 화이트박스 테스팅 & 순환복잡도
- **화이트박스 테스팅 (구조 기반)**: 소스 코드 내부 논리 제어 구조를 보면서 검증.
  - **구문(문장) 커버리지**: 소스 코드의 모든 실행 가능한 문장이 최소 1번 이상 실행.
  - **결정(분기) 커버리지**: 모든 조건식의 전체 분기 결과가 참(True)과 거짓(False)을 최소 1번씩 수행.
  - **조건 커버리지**: 조건문 내부의 개별 단일 조건식이 참과 거짓을 각각 최소 1번씩 수행.
  - **조건/결정 커버리지**: 개별 조건식과 전체 결정문 모두 참/거짓을 수행.
- **맥케이브(McCabe) 순환 복잡도 계산 공식**:
> 📐 **공식 (McCabe 순환 복잡도)**:
> - **V(G) = E - N + 2** (E: 화살표 간선 수, N: 노드 원형 수)
> - **V(G) = P + 1** (P: 판정 노드의 개수 = 조건 분기점의 개수)

---

### 📌 5.3 블랙박스 테스팅 기법
- **블랙박스 테스팅 (명세 기반)**: 코드 내부를 보지 않고 입력값에 따른 출력 결과 검증.
  - **동등(동치) 분할 (Equivalence Partitioning)**: 입력 도메인을 유효값과 무효값 그룹으로 분할하여 대표값 선택.
  - **경계값 분석 (Boundary Value Analysis)**: 유효 분할의 경계선(n-1, n, n+1)에서 결함 발생 확률이 가장 높다는 점에 착안.
  - **원인-결과 그래프 (Cause-Effect Graphing)**: 입력 조건(원인)과 출력 결과(효과) 간의 논리적 관계를 그래프로 구성.
  - **의사결정 테이블, 오류 예측, 페어와이즈(Pairwise)**.

---

### 📌 5.4 V-모델 & 테스트 레벨
- **단위 테스트 (Unit)** ⟷ 모듈 상세 설계 검증.
- **통합 테스트 (Integration)** ⟷ 소프트웨어 아키텍처 및 모듈 간 인터페이스 검증.
  - **하향식 통합 (Top-Down)**: 상위 모듈에서 하위로. 하위 더미 모듈인 **스텁(Stub)** 필요.
  - **상향식 통합 (Bottom-Up)**: 하위 모듈에서 상위로. 상위 제어 모듈인 **드라이버(Driver)** 필요.
- **시스템 테스트 (System)** ⟷ 시스템 요구사항 명세 검증 (기능적/비기능적 성능).
- **인수 테스트 (Acceptance)** ⟷ 사용자 요구사항 검증.
  - **알파 테스트**: 개발자 환경에서 사용자가 개발자 참관 하에 수행.
  - **베타 테스트**: 실제 사용자 환경에서 다수의 최종 사용자가 자유롭게 수행.
- **회귀 테스트 (Regression Test)**: 오류 수정이나 기능 변경 후 기존 정상 기능에 부작용이 없는지 재검증.

---

### 📌 5.5 프로세스 관리 & CPU 스케줄링
- **프로세스 상태 전이도**:
  - **생성(Create) ➔ 준비(Ready) ⟷ 실행(Running) ➔ 대기(Block) ➔ 종료(Terminated)**
  - **디스패치 (Dispatch)**: 준비 큐의 맨 앞 프로세스를 실행 상태로 전환 (`Ready` ➔ `Running`).
  - **타임아웃 (Timeout)**: 할당된 CPU 시간(Time Slice) 만료 (`Running` ➔ `Ready`).
  - **블록 (Block/Wait)**: I/O 요청 등으로 입출력 완료 대기 (`Running` ➔ `Waiting`).
  - **웨이크업 (Wakeup)**: I/O 완료 시 준비 큐로 복귀 (`Waiting` ➔ `Ready`).
- **프로세스 간 통신(IPC)**: 독립된 프로세스 간 데이터 교환 (공유 메모리, 파이프, 소켓, 세마포어, 메시지 큐).
- **CPU 스케줄링 알고리즘**:
  - **비선점형 (Non-Preemptive)**:
    - **FCFS**: 선착순 실행 (호위 효과 Convoy Effect 발생 위험).
    - **SJF**: 실행 시간이 가장 짧은 프로세스 우선 실행 (긴 작업의 기아 현상 Starvation 가능).
    - **HRN (Highest Response Ratio Next)**: SJF의 기아 현상을 방지하기 위해 대기 시간을 반영.
> 📐 **공식 (HRN 스케줄링 우선순위)**:
> - **우선순위 값 = (대기 시간 + 서비스 시간) / 서비스 시간** (계산 결과값이 클수록 우선순위 높음)
  - **선점형 (Preemptive)**:
    - **Round Robin (RR)**: 동일한 시간 할당량(Time Quantum)씩 순환 실행.
    - **SRT (Shortest Remaining Time)**: 남은 실행 시간이 가장 짧은 프로세스에게 CPU 강제 할당.

---

### 📌 5.6 교착상태 (Deadlock) 발생 조건
- **교착상태 발생 필요조건 (동시 만족 시 발생)**:
  1. **상호 배제 (Mutual Exclusion)**: 한 번에 한 프로세스만 자원을 점유.
  2. **점유와 대기 (Hold and Wait)**: 자원을 보유한 채 다른 자원을 대기.
  3. **비선점 (No Preemption)**: 다른 프로세스의 자원을 강제로 빼앗을 수 없음.
  4. **환형 대기 (Circular Wait)**: 대기 프로세스들이 원형으로 서로 자원을 대기.
- **교착상태 해결 기법**:
  - **예방 (Prevention)**: 발생 조건 중 하나를 사전에 원천 부정 (자원 낭비 심함).
  - **회피 (Avoidance)**: 은행가 알고리즘 (Dijkstra Banker's Algorithm) - 항상 안전 상태(Safe State) 유지.
  - **탐지 (Detection)**: 자원 할당 그래프(RAG)를 주기적으로 분석하여 데드록 발견.
  - **회복 (Recovery)**: 데드록 프로세스 강제 종료 또는 자원 선점 롤백.

---

### 📌 5.7 기억장치 관리 & 페이지 교체
- **페이징 vs 세그멘테이션**:
  - **페이징(Paging)**: 고정 크기 블록 분할, 내부 단편화 발생 가능.
  - **세그멘테이션(Segmentation)**: 논리적 가변 크기 분할, 외부 단편화 발생 가능.
- **페이지 교체 알고리즘**:
  - **FIFO**: 가장 먼저 적재된 페이지 교체.
  - **LRU (Least Recently Used)**: 가장 오랫동안 참조되지 않은 페이지 교체.
  - **LFU (Least Frequently Used)**: 참조 횟수가 가장 적은 페이지 교체.
  - **NUR (Not Used Recently)**: 최근 미사용 페이지 교체 (참조 비트, 변형 비트 활용).
  - **OPT (Optimal, Belady)**: 앞으로 가장 오랫동안 사용되지 않을 페이지 교체 (이론적 최적).
- **국부성(Locality) & 쓰레싱(Thrashing)**:
  - **시간 국부성**: 최근 참조된 메모리가 곧 다시 참조됨 (반복문, 스택).
  - **공간 국부성**: 참조된 메모리의 인접 영역이 참조됨 (배열, 순차 코드).
  - **쓰레싱 (Thrashing)**: 페이지 부재(Page Fault)가 너무 자주 발생하여 CPU가 실제 프로세스 연산보다 페이지 교체에 더 많은 시간을 소모하는 성능 급감 현상.
- **보조기억장치 및 파일 관리**:
  - **RAID**: 복수 디스크 배열 (RAID 0 스트라이핑, RAID 1 미러링, RAID 5 패리티 분산).
  - **Linux/Unix 파일 권한 (chmod)**: 소유자/그룹/기타사용자 권한 rwx(4+2+1=7) 8진수 설정.

---

### 📌 5.8 소프트웨어 형상 관리 (SCM)
- **소프트웨어 형상 관리 (SCM - Software Configuration Management)**:
  - 주요 활동: **형상 식별 ➔ 형상 통제(CCB 통제 위원회) ➔ 형상 감사 ➔ 형상 기록/보고**
  - 형상 관리 도구: Git, SVN, CVS.
"""
}


# ==============================================================================
# 4. 마크다운 생성 헬퍼 함수
# ==============================================================================
def render_question_markdown(q, round_id, round_title, unit_num, topic):
    qid = q.get('id')
    cat = q.get('category', '공통')
    prompt = q.get('prompt', '').strip()
    code = q.get('code')
    passage = q.get('passage')
    answer = str(q.get('answer', '')).strip()
    aliases = q.get('aliases', [])
    exp = q.get('explanation', '').strip()
    trap = q.get('trapPoint', '').strip()
    trace = q.get('traceTable')
    
    code_lang = "c"
    if cat == "Java": code_lang = "java"
    elif cat == "Python": code_lang = "python"
    elif cat in ("SQL", "데이터베이스"): code_lang = "sql"
    
    lines = []
    lines.append(f"#### [{round_id} Q{qid}] {prompt.splitlines()[0] if prompt else '문제'}")
    lines.append(f"- **출제**: {round_title} (문항 {qid}) | **영역**: `{cat}` | **토픽**: `{topic}`")
    lines.append("")
    lines.append(f"**[문제 지문]**")
    lines.append(f"{prompt}")
    lines.append("")
    
    if passage:
        lines.append("> **[지문/보기]**")
        for pline in passage.strip().splitlines():
            lines.append(f"> {pline}")
        lines.append("")
        
    if code:
        lines.append(f"```{code_lang}")
        lines.append(code.strip())
        lines.append("```")
        lines.append("")
        
    lines.append(f"> **🔑 [모범 답안]**: `{answer}`")
    if aliases and len(aliases) > 1:
        other_aliases = [a for a in aliases if a != answer]
        if other_aliases:
            lines.append(f"> *인정 유사 답안*: {', '.join([f'`{a}`' for a in other_aliases])}")
    lines.append("")
    
    lines.append("**📖 [상세 해설]**")
    lines.append(f"{exp}")
    lines.append("")
    
    if trap:
        lines.append(f"> **[주의 포인트]**  ")
        lines.append(f"> {trap}")
        lines.append("")
        
    if trace and isinstance(trace, dict) and trace.get('headers') and trace.get('rows'):
        headers = trace['headers']
        rows = trace['rows']
        lines.append("**🔍 [변수 추적표 (Trace Table)]**")
        lines.append("| " + " | ".join(headers) + " |")
        lines.append("| " + " | ".join(["---"] * len(headers)) + " |")
        for r in rows:
            lines.append("| " + " | ".join([str(c) for c in r]) + " |")
        lines.append("")
        
    lines.append("---")
    lines.append("")
    return "\n".join(lines)


def split_theory_into_sections(theory_markdown, syllabus_list):
    sections = {}
    parts = re.split(r'(?=### 📌 )', theory_markdown.strip())
    for part in parts:
        part = part.strip()
        if not part:
            continue
        first_line = part.splitlines()[0]
        for topic in syllabus_list:
            prefix = topic.split(' ')[0]
            if prefix in first_line:
                clean_part = re.sub(r'\n---\s*$', '', part).strip()
                sections[topic] = clean_part
                break
    return sections


# ==============================================================================
# 5. 메인 빌드 파이프라인
# ==============================================================================
def main():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    data_dir = os.path.join(base_dir, "data")
    rounds_dir = os.path.join(data_dir, "rounds")
    themes_dir = os.path.join(data_dir, "themes")
    docs_dir = os.path.join(base_dir, "docs")
    concepts_dir = os.path.join(docs_dir, "concepts")
    docs_rounds_dir = os.path.join(docs_dir, "rounds")
    
    os.makedirs(concepts_dir, exist_ok=True)
    os.makedirs(docs_rounds_dir, exist_ok=True)
    
    # 1. exam-index.js 파싱하여 회차 순서 확보
    exam_index_file = os.path.join(data_dir, "exam-index.js")
    catalog_order = []
    if os.path.exists(exam_index_file):
        with open(exam_index_file, "r", encoding="utf-8") as f:
            c_txt = f.read()
        m_ids = re.findall(r'id:\s*[\'"]([^\'"]+)[\'"]', c_txt)
        catalog_order = m_ids
        
    # 2. 모든 라운드 및 테마 파일 로드
    round_files = sorted(glob.glob(os.path.join(rounds_dir, "*.js")))
    theme_files = sorted(glob.glob(os.path.join(themes_dir, "*.js")))
    
    all_datasets = {}
    
    for fpath in round_files + theme_files:
        with open(fpath, "r", encoding="utf-8") as f:
            content = f.read()
        parsed = parse_js_object(content)
        if not parsed or "id" not in parsed:
            print(f"Error parsing {fpath}")
            continue
        ds_id = parsed["id"]
        all_datasets[ds_id] = parsed
        
    print(f"Loaded {len(all_datasets)} datasets.")
    
    # 정렬: catalog_order에 맞춰 정렬, 없으면 파일명 역순
    sorted_round_ids = [rid for rid in catalog_order if rid in all_datasets]
    for rid in all_datasets:
        if rid not in sorted_round_ids:
            sorted_round_ids.append(rid)
            
    # 3. 525문항 단원별 분류
    total_q_count = 0
    unit_questions = {1: [], 2: [], 3: [], 4: [], 5: []}
    rounds_questions = {}
    web_questions = []
    
    for rid in sorted_round_ids:
        ds = all_datasets[rid]
        rtitle = ds.get("title", rid)
        qs = ds.get("questions", [])
        rounds_questions[rid] = {
            "id": rid,
            "title": rtitle,
            "questions": []
        }
        
        for q in qs:
            total_q_count += 1
            unit_num, topic = classify_question(q)
            q_augmented = dict(q)
            q_augmented["round_id"] = rid
            q_augmented["round_title"] = rtitle
            q_augmented["unit"] = unit_num
            q_augmented["topic"] = topic
            
            unit_questions[unit_num].append(q_augmented)
            rounds_questions[rid]["questions"].append(q_augmented)
            web_questions.append({
                "uid": f"{rid}_{q.get('id')}",
                "round_id": rid,
                "round_title": rtitle,
                "id": q.get("id"),
                "category": q.get("category"),
                "unit": unit_num,
                "topic": topic,
                "prompt": q.get("prompt"),
                "passage": q.get("passage"),
                "code": q.get("code"),
                "answer": str(q.get("answer")),
                "aliases": q.get("aliases", []),
                "explanation": q.get("explanation"),
                "trapPoint": q.get("trapPoint"),
                "traceTable": q.get("traceTable")
            })
            
    print(f"Total questions mapped: {total_q_count}")
    for u in range(1, 6):
        print(f"  Unit {u} ({UNIT_INFO[u]['short_title']}): {len(unit_questions[u])} 문항")
        
    # 4. 단원별 마크다운 교재 생성 (docs/concepts/01~05)
    for u in range(1, 6):
        u_info = UNIT_INFO[u]
        c_path = os.path.join(concepts_dir, u_info["doc_file"])
        u_qs = unit_questions[u]
        
        doc_lines = []
        doc_lines.append(f"# 📖 {u_info['title']}")
        doc_lines.append(f"> **단원 요약**: {u_info['summary']}")
        doc_lines.append(f"> **단원 기출 문항 수**: 총 {len(u_qs)}문항 수록")
        doc_lines.append("")
        doc_lines.append("---")
        doc_lines.append("")
        doc_lines.append("## [핵심 이론 및 필수 공식 정리]")
        doc_lines.append(THEORY_CONTENT[u].strip())
        doc_lines.append("")
        doc_lines.append("---")
        doc_lines.append("")
        doc_lines.append("## [단원별 관련 기출문제 & 상세 해설]")
        doc_lines.append("")
        
        for q in u_qs:
            doc_lines.append(render_question_markdown(q, q["round_id"], q["round_title"], u, q["topic"]))
            
        with open(c_path, "w", encoding="utf-8") as f:
            f.write("\n".join(doc_lines))
        print(f"Generated: {c_path}")
        
    # 5. 연도별 회차 마크다운 교재 생성 (docs/rounds/2020.md ~ 2026.md)
    years = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
    for y in years:
        y_rids = [rid for rid in sorted_round_ids if str(y) in rid and not rid.startswith("c_") and not rid.startswith("sql_") and not rid.startswith("java_") and not rid.startswith("python_") and not rid.startswith("killer_") and not rid.startswith("practical_")]
        y_path = os.path.join(docs_rounds_dir, f"{y}.md")
        y_lines = []
        y_lines.append(f"# 📚 {y}년도 정보처리기사 실기 기출 회차 모음")
        y_lines.append(f"> 수록 회차: {', '.join([rounds_questions[r]['title'] for r in y_rids])}")
        y_lines.append("")
        
        for r in y_rids:
            r_data = rounds_questions[r]
            y_lines.append(f"## 📋 {r_data['title']}")
            y_lines.append("")
            for q in r_data["questions"]:
                y_lines.append(render_question_markdown(q, r, r_data["title"], q["unit"], q["topic"]))
                
        with open(y_path, "w", encoding="utf-8") as f:
            f.write("\n".join(y_lines))
        print(f"Generated: {y_path}")
        
    # 6. 마스터 통합본 생성 (docs/정처기_실기_핵심개념서_및_기출해설총람.md)
    master_path = os.path.join(docs_dir, "정처기_실기_핵심개념서_및_기출해설총람.md")
    m_lines = []
    m_lines.append("# 📖 정보처리기사 실기 개념서 & 기출 해설 (2020~2026)")
    m_lines.append("")
    m_lines.append("> 본 교재는 2020년 개정 이후 2026년 최신 기출까지 21개 회차(420문항) 및 주제별 기출 모음(105문항) 총 525문항을 단원별로 분류하고, 이론 요약과 각 문항의 정답·해설·주의 포인트·변수 추적표(Trace Table)를 정리한 통합 자료입니다.")
    m_lines.append("")
    m_lines.append("## 📑 목차 (Table of Contents)")
    for u in range(1, 6):
        u_info = UNIT_INFO[u]
        m_lines.append(f"- [제{u}단원: {u_info['short_title']} ({len(unit_questions[u])}문항)](#단원-{u})")
    m_lines.append("- [부록: 주제별 기출 모음 (105문항)](#부록-특화테마)")
    m_lines.append("")
    m_lines.append("---")
    m_lines.append("")
    
    for u in range(1, 6):
        u_info = UNIT_INFO[u]
        u_qs = unit_questions[u]
        m_lines.append(f"<a name=\"단원-{u}\"></a>")
        m_lines.append(f"# {u_info['title']}")
        m_lines.append(f"> **단원 요약**: {u_info['summary']}")
        m_lines.append("")
        m_lines.append("## [핵심 이론 및 필수 공식 정리]")
        m_lines.append(THEORY_CONTENT[u].strip())
        m_lines.append("")
        m_lines.append("## [단원별 기출문제 & 상세 해설]")
        m_lines.append("")
        for q in u_qs:
            m_lines.append(render_question_markdown(q, q["round_id"], q["round_title"], u, q["topic"]))
            
    # 주제별 기출 부록
    theme_ids = ["killer_programming", "sql_master", "practical_cheatsheet", "c_special", "java_special", "python_special"]
    m_lines.append("<a name=\"부록-특화테마\"></a>")
    m_lines.append("# 부록: 주제별 기출 모음 (105문항)")
    m_lines.append("")
    for tid in theme_ids:
        if tid in rounds_questions:
            t_data = rounds_questions[tid]
            m_lines.append(f"## {t_data['title']}")
            m_lines.append("")
            for q in t_data["questions"]:
                m_lines.append(render_question_markdown(q, tid, t_data["title"], q["unit"], q["topic"]))
                
    master_text = "\n".join(m_lines)
    with open(master_path, "w", encoding="utf-8") as f:
        f.write(master_text)
    print(f"Generated Master Book: {master_path} ({len(master_text.splitlines())} lines)")
    
    # 7. 웹 뷰어용 data/concept-data.js 생성
    concept_data_path = os.path.join(data_dir, "concept-data.js")
    
    # 각 단원별 이론 텍스트 & 메타데이터
    web_theory = {}
    for u in range(1, 6):
        web_theory[u] = {
            "num": u,
            "title": UNIT_INFO[u]["title"],
            "shortTitle": UNIT_INFO[u]["short_title"],
            "summary": UNIT_INFO[u]["summary"],
            "markdown": THEORY_CONTENT[u].strip(),
            "syllabus": UNIT_SYLLABUS[u],
            "sections": split_theory_into_sections(THEORY_CONTENT[u], UNIT_SYLLABUS[u])
        }
        
    js_content = f"""/**
 * 정보처리기사 실기 단원별 개념서 및 기출 해설 웹 뷰어 데이터셋
 * 총 525문항 (21개 회차 420문항 + 주제별 모음 105문항)
 */
window.CONCEPT_BOOK = {{
  metadata: {{
    generatedAt: {json.dumps(os.environ.get('BUILD_TIME', '2026-10-24'))},
    totalQuestions: {total_q_count},
    unitCounts: {{
      1: {len(unit_questions[1])},
      2: {len(unit_questions[2])},
      3: {len(unit_questions[3])},
      4: {len(unit_questions[4])},
      5: {len(unit_questions[5])}
    }}
  }},
  syllabus: {json.dumps(UNIT_SYLLABUS, ensure_ascii=False, indent=2)},
  units: {json.dumps(web_theory, ensure_ascii=False, indent=2)},
  questions: {json.dumps(web_questions, ensure_ascii=False, indent=2)}
}};
"""
    with open(concept_data_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    print(f"Generated Web Data: {concept_data_path}")
    print("Build complete successfully!")


if __name__ == "__main__":
    main()

