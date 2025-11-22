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
                    <pre><code class="language-c"></code></pre>
                </div>
            </details>
        `;
        
        this.loadCodeContent(codeUrl);
    }
    
    generateCodeUrl(filename, chapter1, chapter2) {
        const baseUrl = "https://fleetinglore.github.io/c51_reference/c51/src";
        const chapterPath = `${chapter1}/${chapter2}`;
        return `${baseUrl}/${chapterPath}/${filename}`;
    }
    
    async loadCodeContent(url) {
        try {
            const response = await fetch(url);
            const code = await response.text();
            const codeElement = this.querySelector('code');
            codeElement.textContent = code;
            
            if (window.hljs) {
                hljs.highlightElement(codeElement);
            }
        } catch (error) {
            console.error(`加载代码失败: ${url}`, error);
        }
    }
}

customElements.define('code-block', CodeBlock);

document.addEventListener('DOMContentLoaded', function() {
    if (window.hljs) {
        hljs.highlightAll();
    }
});
