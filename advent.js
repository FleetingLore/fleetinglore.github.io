async function loadAllCodeBoxes() {
    const codeBoxes = document.querySelectorAll('.code-box');
    
    for (const box of codeBoxes) {
        const title = box.getAttribute('data-title');
        const codeUrl = box.getAttribute('data-code-url');
        const codeElement = box.querySelector('code');
        
        await loadCodeToElement(codeUrl, codeElement, title);
    }
}

async function loadCodeToElement(url, element, title) {
    const response = await fetch(url);
        
    const code = await response.text();
    const escapedCode = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        
    element.innerHTML = escapedCode;
    Prism.highlightElement(element);
}

document.addEventListener('DOMContentLoaded', loadAllCodeBoxes);
