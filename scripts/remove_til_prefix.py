#!/usr/bin/env python3
"""Remove leading 'til-' from filenames in data/blog and update internal MDX links.

Usage: python3 scripts/remove_til_prefix.py
"""
import os
import re
import json

ROOT = os.path.dirname(os.path.dirname(__file__))
BLOG = os.path.join(ROOT, 'data', 'blog')

renamed = []
skipped = []
errors = []

def safe_rename(src, dst):
    if os.path.exists(dst):
        skipped.append({'src': src, 'dst': dst, 'reason': 'dst exists'})
        return False
    try:
        os.rename(src, dst)
        renamed.append({'src': src, 'dst': dst})
        return True
    except Exception as e:
        errors.append({'src': src, 'dst': dst, 'err': str(e)})
        return False

def update_links_in_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        s = f.read()
    new = s.replace('/blog/til-', '/blog/')
    new = new.replace('`til-', '`')
    if new != s:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new)
        return True
    return False

def main():
    # First update internal references in all .mdx files
    mdx_files = [os.path.join(BLOG, fn) for fn in os.listdir(BLOG) if fn.endswith('.mdx')]
    link_updates = []
    for p in mdx_files:
        try:
            if update_links_in_file(p):
                link_updates.append(p)
        except Exception as e:
            errors.append({'file': p, 'err': str(e)})

    # Now rename files starting with til-
    for fn in os.listdir(BLOG):
        if not fn.startswith('til-'):
            continue
        src = os.path.join(BLOG, fn)
        new_fn = fn[len('til-'):]
        dst = os.path.join(BLOG, new_fn)
        safe_rename(src, dst)

    report = {
        'renamed_count': len(renamed),
        'renamed': renamed,
        'skipped': skipped,
        'errors': errors,
        'link_updates_count': len(link_updates),
        'link_updates': link_updates,
    }
    out = os.path.join(BLOG, '_remove_til_report.json')
    with open(out, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2)
    print('WROTE', out)

if __name__ == '__main__':
    main()
