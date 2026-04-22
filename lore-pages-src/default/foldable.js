(function () {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const placeholders = document.querySelectorAll('.foldable');

        placeholders.forEach(placeholder => {
            const url = placeholder.dataset.url;
            let title = placeholder.dataset.title || '链接';
            const isExpanded = placeholder.classList.contains('expanded');

            if (!url) return;

            // 创建 DOM 结构
            const section = document.createElement('div');
            section.className = 'foldable-section';

            // 标题行
            const titleDiv = document.createElement('div');
            titleDiv.className = 'foldable-title';

            // +/- 按钮
            const toggleSpan = document.createElement('span');
            toggleSpan.className = 'foldable-toggle';
            toggleSpan.textContent = isExpanded ? '-' : '+';

            // 标题文字（始终可跳转）
            const titleTextSpan = document.createElement('span');
            titleTextSpan.className = 'foldable-title-text';
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = title;
            titleTextSpan.appendChild(link);

            titleDiv.appendChild(toggleSpan);
            titleDiv.appendChild(titleTextSpan);

            // iframe 容器
            const contentDiv = document.createElement('div');
            contentDiv.className = 'foldable-content';
            contentDiv.style.display = isExpanded ? 'block' : 'none';

            const iframe = document.createElement('iframe');
            iframe.src = url;

            contentDiv.appendChild(iframe);
            section.appendChild(titleDiv);
            section.appendChild(contentDiv);

            // 替换占位符
            placeholder.parentNode.replaceChild(section, placeholder);

            let expanded = isExpanded;

            // 点按钮：展开/折叠，阻止冒泡
            toggleSpan.addEventListener('click', function (e) {
                e.stopPropagation();
                if (expanded) {
                    contentDiv.style.display = 'none';
                    toggleSpan.textContent = '+';
                    expanded = false;
                } else {
                    contentDiv.style.display = 'block';
                    toggleSpan.textContent = '−';
                    expanded = true;
                }
            });

            // 点标题文字：跳转（链接自带跳转，无需额外处理）
            // 链接的默认行为就是跳转，所以不需要额外代码
        });
    }
})();