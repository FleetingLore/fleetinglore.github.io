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

            const section = document.createElement('div');
            section.className = 'foldable-section';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'foldable-title';

            const toggleSpan = document.createElement('span');
            toggleSpan.className = 'foldable-toggle';
            toggleSpan.textContent = isExpanded ? '-' : '+';

            const titleTextSpan = document.createElement('span');
            titleTextSpan.className = 'foldable-title-text';

            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.textContent = title;
            titleTextSpan.appendChild(link);

            titleDiv.appendChild(toggleSpan);
            titleDiv.appendChild(titleTextSpan);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'foldable-content';
            contentDiv.style.display = isExpanded ? 'block' : 'none';

            const iframe = document.createElement('iframe');
            iframe.src = url;

            contentDiv.appendChild(iframe);
            section.appendChild(titleDiv);
            section.appendChild(contentDiv);

            placeholder.parentNode.replaceChild(section, placeholder);

            let expanded = isExpanded;

            titleDiv.addEventListener('click', function (e) {
                if (e.target.tagName === 'A') {
                    return;
                }

                if (!expanded) {
                    contentDiv.style.display = 'block';
                    toggleSpan.textContent = '−';
                    expanded = true;
                } else {
                    window.open(url, '_blank');
                }
            });
        });
    }
})();