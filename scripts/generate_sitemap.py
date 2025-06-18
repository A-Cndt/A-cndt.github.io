import os
from datetime import datetime

root_dir = "html/fr"
base_url = "https://a-cndt.github.io/html/fr"

config = {
    "accueil": {"changefreq": "daily", "priority": "1.0"},
    "page": {"changefreq": "weekly", "priority": "0.8"},
    "article": {"changefreq": "monthly", "priority": "0.6"},
}

today = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S+00:00")

def determine_type(path):
    if path == "index.html":
        return "accueil"
    elif os.path.dirname(path) == "":
        return "page"
    else:
        return "article"

def find_html_files(root):
    html_files = []
    for dirpath, dirnames, filenames in os.walk(root):
        for filename in filenames:
            if filename.endswith(".html"):
                full_path = os.path.join(dirpath, filename)
                relative_path = os.path.relpath(full_path, root)
                html_files.append(relative_path.replace(os.sep, "/"))
    return html_files

def generate_sitemap(urls):
    lines = ['<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

    # Page d'accueil principale
    lines.append("  <url>")
    lines.append("    <loc>https://a-cndt.github.io/</loc>")
    lines.append(f"    <lastmod>{today}</lastmod>")
    lines.append("    <changefreq>daily</changefreq>")
    lines.append("    <priority>1.0</priority>")
    lines.append("  </url>")

    for path in urls:
        url = f"{base_url}/{path}"
        page_type = determine_type(path)
        c = config[page_type]
        lines.append("  <url>")
        lines.append(f"    <loc>{url}</loc>")
        lines.append(f"    <lastmod>{today}</lastmod>")
        lines.append(f"    <changefreq>{c['changefreq']}</changefreq>")
        lines.append(f"    <priority>{c['priority']}</priority>")
        lines.append("  </url>")

    lines.append("</urlset>")
    return "\n".join(lines)

if __name__ == "__main__":
    urls = find_html_files(root_dir)
    sitemap_xml = generate_sitemap(urls)
    with open("sitemap.xml", "w", encoding="utf-8") as f:
        f.write(sitemap_xml)
    print(f"Sitemap généré avec {len(urls)} URLs.")
