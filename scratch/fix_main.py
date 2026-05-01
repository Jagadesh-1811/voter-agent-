import os
path = r'd:\vote agent\backend\main.py'
with open(path, 'r', encoding='utf-8') as f:
    content = f.read().strip()

new_lines = """

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
"""

with open(path, 'w', encoding='utf-8') as f:
    f.write(content + new_lines)
