import { marked } from "marked";
import DOMPurify from "dompurify";
import hljs from "highlight.js";

// Configuration for marked
marked.setOptions({
  highlight: function (code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch {
      return code;
    }
  },
  breaks: true,
  // sanitize: true,
});

// Elements selection with more robust selection
const elements = {
  editor: document.querySelector("#editor-body"),
  preview: document.querySelector("#preview-body"),
  clearEditorBtn: document.querySelector("#clear-editor"),
};

// Initial markdown content
const initialMarkdown = `# Welcome to Markdown Previewer!

## Try out these Markdown elements:

**Bold text** and *italic text*

### Links
[Visit StackBlitz](https://stackblitz.com)

### Lists
1. First item
2. Second item
3. Third item
- Unordered list
- Another item
  - Nested item

### Code
Inline \`code\` looks like this.

\`\`\`javascript
// Code block with syntax highlighting
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

### Blockquote
> This is a blockquote
> Multiple lines look like this

Enjoy writing Markdown! 📝
`;

// Update preview
function updatePreview() {
  try {
    // Use DOMPurify to sanitize the parsed markdown
    // const sanitizedHtml = DOMPurify.sanitize(
    //   marked.parse(elements.editor.value)
    // );

    elements.preview.innerHTML = marked.parse(elements.editor.value);
  } catch (error) {
    console.error("Error parsing markdown:", error);
    elements.preview.textContent = "Error parsing markdown";
  }
}

// Clear editor function with error handling
function handleClearEditor() {
  try {
    elements.editor.value = "";
    updatePreview();
  } catch (error) {
    console.error("Error clearing editor:", error);
  }
}

// Initialize app with improved error handling
function initializeApp() {
  try {
    // Validate elements exist before adding event listeners
    if (!elements.editor || !elements.preview || !elements.clearEditorBtn) {
      throw new Error("Required DOM elements not found");
    }

    // Set initial content
    elements.editor.value = initialMarkdown;

    // Add event listeners
    elements.editor.addEventListener("input", updatePreview);
    elements.clearEditorBtn.addEventListener("click", handleClearEditor);

    // Initial preview render
    updatePreview();
  } catch (error) {
    console.error("Initialization error:", error);
  }
}

// Use DOMContentLoaded with error-first approach
window.addEventListener("DOMContentLoaded", initializeApp);
