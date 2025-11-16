// 从URL加载代码
async function loadCodeFromUrl() {
    try {
        // 这里替换成您想要的代码URL
        const response = await fetch('https://raw.githubusercontent.com/fleetinglore/c51/main/3/1/main.c');
        if (!response.ok) throw new Error('网络响应不正常');
        
        const code = await response.text();
        
        // 转义HTML特殊字符
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        // 将代码插入到容器中
        const codeContainer = document.getElementById('codeContainer');
        codeContainer.innerHTML = escapedCode;
        
        // 重新高亮代码
        Prism.highlightAll();
        
    } catch (error) {
        console.error('加载代码出错:', error);
        // 如果加载失败，容器保持空白
    }
}

// 页面加载时自动从URL加载代码
window.addEventListener('DOMContentLoaded', loadCodeFromUrl);
