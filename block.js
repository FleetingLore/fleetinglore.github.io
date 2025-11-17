class CodeBlock extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const filename = this.getAttribute('filename');
        const chapter1 = document.documentElement.getAttribute('chapter1');
        const chapter2 = document.documentElement.getAttribute('chapter2');
        
        const codeUrl = this.generateCodeUrl(filename, chapter1, chapter2);
        
        this.innerHTML = `
            <details>
                <summary>
                    <span class="filename">${filename}</span>
                </summary>
                <div class="code-box">
                    <pre><code class="language-c" data-code-url="${codeUrl}"></code></pre>
                </div>
            </details>
        `;
        
        this.loadCodeContent(codeUrl);
    }
    
    generateCodeUrl(filename, chapter1, chapter2) {
        const baseUrl = "https://fleetinglore.github.io/c51_reference/c51";
        const chapterPath = `${chapter1}/${chapter2}`;
        return `${baseUrl}/${chapterPath}/${filename}`;
    }
    
    async loadCodeContent(url) {
        const response = await fetch(url);
        const code = await response.text();
        const codeElement = this.querySelector('code');
        codeElement.textContent = code;
        Prism.highlightElement(codeElement);
    }
}

customElements.define('code-block', CodeBlock);

async function loadAllCodeBoxes() {
    const codeBoxes = document.querySelectorAll('.code-box');
    
    for (const box of codeBoxes) {
        const codeUrl = box.getAttribute('data-code-url');
        const codeElement = box.querySelector('code');
        await loadCodeToElement(codeUrl, codeElement);
    }
}

async function loadCodeToElement(url, element) {
    const response = await fetch(url);
    const code = await response.text();
    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    element.innerHTML = escapedCode;
    Prism.highlightElement(element);
}

document.addEventListener('DOMContentLoaded', loadAllCodeBoxes);