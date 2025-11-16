// 简化的 advent.js - 处理所有代码框
async function loadAllCodeBoxes() {
    const codeBoxes = document.querySelectorAll('.code-box');
    
    for (const box of codeBoxes) {
        const title = box.getAttribute('data-title');
        const codeUrl = box.getAttribute('data-code-url');
        const codeElement = box.querySelector('code');
        
        if (codeUrl && codeElement) {
            await loadCodeToElement(codeUrl, codeElement, title);
        }
    }
}

async function loadCodeToElement(url, element, title) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('网络响应不正常');
        
        const code = await response.text();
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        
        element.innerHTML = escapedCode;
        
        if (window.Prism) {
            Prism.highlightElement(element);
        }
        
    } catch (error) {
        console.error(`加载代码出错 (${url}):`, error);
    }
}

// 自动加载所有代码框
document.addEventListener('DOMContentLoaded', loadAllCodeBoxes);
