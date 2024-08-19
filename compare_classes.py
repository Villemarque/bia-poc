import re

def extract_classes(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    
    if file_path.endswith('.scss'):
        # For SCSS, look for class definitions
        pattern = r'\.([a-zA-Z0-9_-]+)\s*{'
    else:
        # For HTML, look for class attributes
        pattern = r'class=["\']([^"\']+)["\']'
    
    matches = re.findall(pattern, content)
    classes = set()
    for match in matches:
        if file_path.endswith('.html'):
            # Split multiple classes in HTML
            classes.update(match.split())
        else:
            classes.add(match)
    
    return classes

scss_classes = extract_classes('assets/sass/main.scss')
print("scss_classes", scss_classes)
html_classes = extract_classes('index.html')
print("html_classes", html_classes)
# disjunciton of both sets
unique_scss_classes = scss_classes - html_classes

print("Classes defined in main.scss but not used in index.html:")
for cls in sorted(unique_scss_classes):
    print(cls)
