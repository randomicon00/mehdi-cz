#!/usr/bin/env python3
"""Compute til-bash index refs vs existing files and write JSON report."""
import re, os, json

ROOT = os.path.dirname(os.path.dirname(__file__))
INDEX = os.path.join(ROOT, 'data', 'blog', 'bash-index.mdx')
DIR = os.path.join(ROOT, 'data', 'blog')
OUT = os.path.join(DIR, '_til_bash_report.json')

with open(INDEX, 'r', encoding='utf-8') as f:
    s = f.read()

refs = sorted(set(re.findall(r'bash-[a-z0-9-]+\.mdx', s)))
files = sorted([fn for fn in os.listdir(DIR) if fn.startswith('bash-') and fn.endswith('.mdx')])
fileset = set(files)
missing = sorted(set(refs) - fileset)
extra = sorted(fileset - set(refs))

report = {
    'refs_count': len(refs),
    'files_count': len(fileset),
    'missing_count': len(missing),
    'extra_count': len(extra),
    'missing': missing,
    'extra': extra,
}

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(report, f, indent=2)

print('WROTE', OUT)
