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
                    <div class="code-box" data-title="${filename}">
                        <pre><code class="language-c" data-code-url="${codeUrl}"></code></pre>
                    </div>
                </summary>
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
