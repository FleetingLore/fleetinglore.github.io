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
            const title = placeholder.dataset.title;
            const isExpanded = placeholder.classList.contains('expanded');

            if (!url) return;

            const section = document.createElement('div');
            section.className = 'foldable-section';

            const titleDiv = document.createElement('div');
            titleDiv.className = 'foldable-title';
            titleDiv.textContent = title || 'link';

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

            titleDiv.addEventListener('click', function () {
                if (!expanded) {
                    contentDiv.style.display = 'block';
                    expanded = true;
                } else {
                    window.open(url, '_blank');
                }
            });
        });
    }
})();