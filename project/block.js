class CodeBlock extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        const filename = this.getAttribute('filename');
        
        const codeUrl = this.generateCodeUrl(filename);
        
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
    
    generateCodeUrl(filename) {
        const baseUrl = "https://fleetinglore.github.io/c51_reference/project/";
        return `${baseUrl}/${filename}`;
    }
    
    async loadCodeContent(url) {
        const response = await fetch(url);
        const code = await response.text();
        const codeElement = this.querySelector('code');
        codeElement.textContent = code;
            
        if (window.hljs) {
            hljs.highlightElement(codeElement);
        }
    }
}

customElements.define('code-block', CodeBlock);

document.addEventListener('DOMContentLoaded', function() {
    if (window.hljs) {
        hljs.highlightAll();
    }
});
