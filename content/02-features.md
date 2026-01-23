---
title: Markdown Features
description: Reference guide showing all supported markdown features in this template
slug: features
order: 2
---

# Markdown Features Reference

> **EXAMPLE CONTENT** - This page demonstrates all markdown features. Keep it as a reference or delete it!

This template supports full GitHub Flavored Markdown. Here's everything you can use:

---

## Text Formatting

**Bold text** using `**double asterisks**`

*Italic text* using `*single asterisks*`

~~Strikethrough~~ using `~~tildes~~`

**_Bold and italic_** using `**_combined_**`

---

## Headings

Use `#` for headings (H1-H6). H2 and H3 appear in the table of contents.

---

## Lists

### Unordered List
- Item one
- Item two
  - Nested item
  - Another nested
- Item three

### Ordered List
1. First step
2. Second step
3. Third step

### Task List
- [x] Completed task
- [ ] Incomplete task
- [ ] Another todo

---

## Links and Images

[Link to external site](https://example.com)

[Link to another doc](/getting-started)

Images: `![Alt text](/image.png)` (place images in /public folder)

---

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| Tables | Yes | Full GFM support |
| Code blocks | Yes | 100+ languages |
| Dark mode | Yes | Auto-switching |

---

## Code Blocks

Inline code: `const x = 42`

### JavaScript/TypeScript

```typescript
interface User {
  id: string;
  name: string;
}

async function getUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### Python

```python
def greet(name: str) -> str:
    """Return a greeting."""
    return f"Hello, {name}!"
```

### Bash

```bash
npm install
npm run dev
```

---

## Blockquotes

> **Note:** Use blockquotes for callouts, tips, and important information.

> **Warning:** This is a warning message.

---

## Horizontal Rules

Use `---` to create a horizontal rule (like the ones separating sections).

---

## What's Next?

Delete this example and add your own documentation! Ask your AI assistant for help.
