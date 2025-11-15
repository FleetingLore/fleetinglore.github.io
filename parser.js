// 样式组定义
const codePreviewStyles = {
    container: `
        margin: 20px 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        overflow: hidden;
    `,
    header: `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        background: #f5f5f5;
        border-bottom: 1px solid #ddd;
    `,
    title: `
        font-weight: bold;
        margin: 0;
    `,
    copyBtn: `
        background: none;
        border: 1px solid #ccc;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 18px;
        border-radius: 3px;
    `,
    codeContainer: `
        margin: 0;
        padding: 0;
    `,
    pre: `
        margin: 0;
        padding: 15px;
        background: #f9f9f9;
        overflow-x: auto;
    `,
    notification: `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px;
        border-radius: 4px;
        display: none;
        z-index: 1000;
    `
};

// 代码预览组件类
class CodePreview {
    constructor(element) {
        this.element = element;
        this.title = element.getAttribute('data-title');
        this.language = element.getAttribute('data-language');
        this.code = this.cleanCode(element.textContent);
        
        this.render();
        this.bindEvents();
    }
    
    cleanCode(code) {
        // 移除首尾空白字符
        return code.trim();
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    render() {
        // 创建组件HTML结构
        const container = document.createElement('div');
        container.style.cssText = codePreviewStyles.container;
        
        container.innerHTML = `
            <div style="${codePreviewStyles.header}">
                <div style="${codePreviewStyles.title}">${this.title}</div>
                <button class="copy-btn" style="${codePreviewStyles.copyBtn}">+</button>
            </div>
            <div style="${codePreviewStyles.codeContainer}">
                <pre style="${codePreviewStyles.pre}"><code class="language-${this.language}">${this.escapeHtml(this.code)}</code></pre>
            </div>
        `;
        
        // 替换原始元素
        this.element.parentNode.replaceChild(container, this.element);
        this.container = container;
        
        // 应用Prism高亮
        Prism.highlightAllUnder(this.container);
    }
    
    bindEvents() {
        const copyBtn = this.container.querySelector('.copy-btn');
        copyBtn.addEventListener('click', () => this.copyCode());
    }
    
    copyCode() {
        navigator.clipboard.writeText(this.code)
            .then(() => this.showNotification())
            .catch(err => {
                console.error('复制失败:', err);
                // 降级方案
                this.fallbackCopy();
            });
    }
    
    fallbackCopy() {
        const textArea = document.createElement('textarea');
        textArea.value = this.code;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            this.showNotification();
        } catch (err) {
            console.error('降级复制失败:', err);
            alert('复制失败，请手动选择并复制代码');
        }
        document.body.removeChild(textArea);
    }
    
    showNotification() {
        let notification = document.getElementById('code-preview-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'code-preview-notification';
            notification.style.cssText = codePreviewStyles.notification;
            notification.textContent = '代码已复制';
            document.body.appendChild(notification);
        }
        
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 1500);
    }
}

// 初始化所有代码预览组件
document.addEventListener('DOMContentLoaded', function() {
    const codePreviewElements = document.querySelectorAll('.code-preview');
    
    codePreviewElements.forEach(element => {
        new CodePreview(element);
    });
});
