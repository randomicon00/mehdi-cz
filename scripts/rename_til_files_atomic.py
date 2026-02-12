#!/usr/bin/env python3
"""Rename files in data/blog/ that start with 'til-' by removing the prefix.
Writes report to data/blog/_remove_til_report_atomic.json
"""
import json
from pathlib import Path

DIR = Path(__file__).resolve().parents[1] / 'data' / 'blog'
report = {'renamed': [], 'skipped': [], 'errors': []}

for p in sorted(DIR.glob('til-*.mdx')):
    dest = p.with_name(p.name.replace('til-', '', 1))
    try:
        if dest.exists():
            report['skipped'].append({'src': str(p), 'dest': str(dest), 'reason': 'dest exists'})
            continue
        p.rename(dest)
        report['renamed'].append({'src': str(p), 'dest': str(dest)})
    except Exception as e:
        report['errors'].append({'path': str(p), 'error': str(e)})

out = DIR / '_remove_til_report_atomic.json'
out.write_text(json.dumps(report, indent=2))
print('WROTE', out)
