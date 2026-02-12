#!/usr/bin/env python3
from pathlib import Path
import json

DIR = Path(__file__).resolve().parents[1] / 'data' / 'blog'
tils = sorted([str(p.name) for p in DIR.glob('til-*.mdx')])
out = DIR / '_til_files_list.json'
out.write_text(json.dumps({'til_files': tils}, indent=2))
print('WROTE', out)
