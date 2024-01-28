import json

with open("./english.json", "r") as f:
    content = json.loads(f.read())

content = json.dumps(content)
print(content)