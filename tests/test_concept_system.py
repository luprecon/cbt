#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Automated Integrity Verification Suite for Jeongcheogi Concept Book & Explanation System
- Verifies all 21 round datasets (420 questions) + 6 special themes (105 questions) = 525 questions total
- Verifies 5-unit classification and required fields for all questions
- Verifies generation of 5 concept books, 7 yearly round books, and 1 master book
- Verifies bidirectional navigation links between index.html and study.html
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


def test_verification():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    
    # 1. Check datasets in data/
    rounds = glob.glob(os.path.join(base_dir, "data", "rounds", "*.js"))
    themes = glob.glob(os.path.join(base_dir, "data", "themes", "*.js"))
    assert len(rounds) == 21, f"Expected 21 rounds, found {len(rounds)}"
    assert len(themes) == 6, f"Expected 6 themes, found {len(themes)}"
    print(f"Verified datasets: {len(rounds)} exam rounds, {len(themes)} special themes.")

    # 2. Check concept-data.js
    concept_js = os.path.join(base_dir, "data", "concept-data.js")
    assert os.path.exists(concept_js), "concept-data.js does not exist!"
    with open(concept_js, "r", encoding="utf-8") as f:
        js_text = f.read()
    
    m_count = re.search(r'totalQuestions:\s*(\d+)', js_text)
    assert m_count and int(m_count.group(1)) == 525, f"Expected 525 questions, got {m_count.group(1) if m_count else None}"
    
    # Parse questions array to verify schema integrity
    m_qs = re.search(r'questions:\s*(\[[\s\S]*\])\s*};', js_text)
    assert m_qs, "Could not extract questions array from concept-data.js"
    questions = json.loads(m_qs.group(1))
    assert len(questions) == 525, f"Expected 525 parsed questions, got {len(questions)}"

    unit_counts = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
    for q in questions:
        assert "uid" in q and q["uid"], "Question missing uid"
        assert "id" in q, "Question missing id"
        assert "round_id" in q and q["round_id"], "Question missing round_id"
        assert "prompt" in q and q["prompt"], f"Question {q.get('uid')} missing prompt"
        assert "answer" in q and q["answer"] is not None, f"Question {q.get('uid')} missing answer"
        assert "explanation" in q and q["explanation"], f"Question {q.get('uid')} missing explanation"
        assert "unit" in q and q["unit"] in (1, 2, 3, 4, 5), f"Invalid unit {q.get('unit')} in {q.get('uid')}"
        assert "topic" in q and q["topic"], f"Question {q.get('uid')} missing topic"
        unit_counts[q["unit"]] += 1

    for u in range(1, 6):
        assert unit_counts[u] > 0, f"Unit {u} has 0 questions!"
        print(f"  Unit {u} question count: {unit_counts[u]} questions")

    # 3. Check docs files
    master_doc = os.path.join(base_dir, "docs", "정처기_실기_핵심개념서_및_기출해설총람.md")
    assert os.path.exists(master_doc), "Master doc does not exist!"
    with open(master_doc, "r", encoding="utf-8") as f:
        master_content = f.read()
    master_bytes = len(master_content.encode("utf-8"))
    assert master_bytes > 500000, f"Master doc size is too small ({master_bytes} bytes)"
    print(f"Master doc verified: {master_bytes:,} bytes, {len(master_content.splitlines()):,} lines")

    # Check 5 concept docs
    concept_files = [
        "01_소프트웨어공학_설계.md",
        "02_프로그래밍언어_활용.md",
        "03_데이터베이스_구축.md",
        "04_네트워크_정보보안.md",
        "05_테스팅_운영체제.md"
    ]
    for cf in concept_files:
        p = os.path.join(base_dir, "docs", "concepts", cf)
        assert os.path.exists(p), f"Concept doc {cf} missing!"
        with open(p, "r", encoding="utf-8") as f:
            c_text = f.read()
        assert len(c_text) > 20000, f"Concept doc {cf} is too small ({len(c_text)} bytes)"
        print(f"  Concept doc OK: {cf} ({len(c_text):,} bytes)")

    # Check 7 round docs
    for y in range(2020, 2027):
        rf = os.path.join(base_dir, "docs", "rounds", f"{y}.md")
        assert os.path.exists(rf), f"Round doc {y}.md missing!"
        with open(rf, "r", encoding="utf-8") as f:
            r_text = f.read()
        assert len(r_text) > 20000, f"Round doc {y}.md is too small ({len(r_text)} bytes)"
        print(f"  Round doc OK: {y}.md ({len(r_text):,} bytes)")

    # 4. Verify 0 raw LaTeX ($ ... $) expressions in build script, concept-data.js, and all generated docs
    latex_pattern = re.compile(r'\$[^\$\n]+\$')
    
    build_script = os.path.join(base_dir, "scripts", "build_concept_book.py")
    with open(build_script, "r", encoding="utf-8") as f:
        bs_text = f.read()
    bs_matches = latex_pattern.findall(bs_text)
    assert len(bs_matches) == 0, f"Found {len(bs_matches)} raw LaTeX expressions in build_concept_book.py: {bs_matches[:5]}"

    js_matches = latex_pattern.findall(js_text)
    assert len(js_matches) == 0, f"Found {len(js_matches)} raw LaTeX expressions in concept-data.js: {js_matches[:5]}"

    all_md_files = (
        [master_doc]
        + [os.path.join(base_dir, "docs", "concepts", cf) for cf in concept_files]
        + [os.path.join(base_dir, "docs", "rounds", f"{y}.md") for y in range(2020, 2027)]
    )
    for md_path in all_md_files:
        with open(md_path, "r", encoding="utf-8") as f:
            md_txt = f.read()
        md_matches = latex_pattern.findall(md_txt)
        assert len(md_matches) == 0, f"Found {len(md_matches)} raw LaTeX expressions in {os.path.basename(md_path)}: {md_matches[:5]}"
    print(f"Verified 0 raw LaTeX ($...$) expressions across {len(all_md_files)} Markdown books, build_concept_book.py, and concept-data.js.")

    # 5. Check HTML files exist and have links & formula-card support
    index_html = os.path.join(base_dir, "index.html")
    study_html = os.path.join(base_dir, "study.html")
    assert os.path.exists(index_html), "index.html missing!"
    assert os.path.exists(study_html), "study.html missing!"

    with open(index_html, "r", encoding="utf-8") as f:
        idx_txt = f.read()
    assert "study.html" in idx_txt, "index.html does not link to study.html!"
    assert "btn-study-link" in idx_txt, "index.html does not have btn-study-link button!"
    assert "개념서 &amp; 기출해설" in idx_txt, "index.html missing clean study link text!"
    assert "핵심 요약" in idx_txt, "index.html missing clean cheatsheet button text!"
    assert "5대 단원" not in idx_txt and "실전 개념서 &amp; 해설총람" not in idx_txt and "벼락치기" not in idx_txt, "index.html still contains exaggerated AI wording!"

    with open(study_html, "r", encoding="utf-8") as f:
        std_txt = f.read()
    assert "index.html" in std_txt, "study.html does not link to index.html!"
    assert "data/concept-data.js" in std_txt, "study.html does not include concept-data.js!"
    assert "@media print" in std_txt, "study.html does not have @media print styles!"
    assert "@media (max-width: 900px)" in std_txt, "study.html missing responsive layout rules!"
    assert "CBT 시험 모드로 돌아가기" in std_txt, "study.html missing return navigation text!"
    assert "formula-card" in std_txt, "study.html missing .formula-card styling and parser support!"
    assert "단원별 개념서" in std_txt and "연도별 기출 (2020~2026)" in std_txt, "study.html missing clean mode tab labels!"
    assert "단원별 개념" in std_txt and "주제별 기출 모음" in std_txt, "study.html missing clean sidebar section titles!"
    assert "sidebar-subtopics-wrapper" in std_txt and "grid-template-rows: 0fr" in std_txt, "study.html missing CSS Grid accordion animation!"
    assert "theory-drawer-wrapper" in std_txt, "study.html missing CSS Grid theory drawer animation!"
    for banned in ("5대 핵심 단원별 개념서", "6대 특화 테마", "실전 개념서 &amp; 해설총람", "5대 단원", "단골 함정 (Trap Point)"):
        assert banned not in std_txt, f"study.html still contains exaggerated wording: {banned}"

    for banned_concept in ("5대 원칙", "4대 특징", "4대 특성", "4대 조건", "4대 구축 유형", "4대 지표", "단골 함정", "완전정복", "초특급", "초필살"):
        assert banned_concept not in js_text, f"concept-data.js still contains exaggerated wording: {banned_concept}"

    print("\n[ALL INTEGRITY CHECKS PASSED SUCCESSFULLY]")


if __name__ == "__main__":
    test_verification()



