#!/usr/bin/env python3
"""Flip draft:true to draft:false for til-bash posts and add small tips.

Run from repo root: python3 scripts/publish_til_bash.py
"""
import os
from pathlib import Path

DIR = Path(__file__).resolve().parents[1] / 'data' / 'blog'
count = 0
modified = []
for p in sorted(DIR.glob('til-bash-*.mdx')):
    text = p.read_text(encoding='utf-8')
    if 'draft: true' in text:
        text = text.replace('draft: true', 'draft: false', 1)
        # add a small tip if file contains 'Placeholder' or minimal content markers
        if 'Placeholder' in text or 'placeholder' in text.lower() or 'Placeholder:' in text:
            if '\nTips:' not in text and '\nNote:' not in text:
                text = text.rstrip() + '\n\nTips:\n- Short actionable tip added by automation.\n'
        p.write_text(text, encoding='utf-8')
        count += 1
        modified.append(str(p.name))

print(f'Published {count} files')
if modified:
    for m in modified:
        print('WROTE', m)
