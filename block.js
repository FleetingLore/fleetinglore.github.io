class CodeBlock extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const filename = this.getAttribute('filename');
        const chapter1 = this.getAttribute('chapter1');
        const chapter2 = this.getAttribute('chapter2');
        
        const codeUrl = this.generateCodeUrl(filename, chapter1, chapter2);
        
        this.innerHTML = `
            <div class="code-block-container">
                <div class="code-header">
                    <span class="filename">${filename}</span>
                    <span class="chapter-info">${chapter1} ${chapter2}</span>
                </div>
                <div class="code-content">
                    <pre><code class="language-c" data-code-url="${codeUrl}">// 代码加载中...</code></pre>
                </div>
            </div>
        `;
        
        this.loadCodeContent(codeUrl);
    }
    
    generateCodeUrl(filename, chapter1, chapter2) {
        const baseUrl = "https://fleetinglore.github.io/c51_reference/c51";
        const chapterPath = chapter1.replace('.', '/');
        return `${baseUrl}/${chapterPath}/${filename}`;
    }
    
    async loadCodeContent(url) {
        const response = await fetch(url);
        if (response.ok) {
            const code = await response.text();
            const codeElement = this.querySelector('code');
            codeElement.textContent = code;
            
            if (window.Prism) {
                Prism.highlightElement(codeElement);
            }
        }
    }
}

customElements.define('code-block', CodeBlock);
