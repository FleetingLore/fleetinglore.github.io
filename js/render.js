export function renderLines(lines, container) {
    container.innerHTML = '';

    for (const line of lines) {
        const p = document.createElement('p');
        p.style.marginLeft = `${line.indent * 20}px`;

        switch (line.type) {
            case 'atom':
                p.textContent = line.content;
                break;
            case 'link':
                const a = document.createElement('a');
                // 处理冒号开头的 lore 路径
                if (line.value.startsWith(':')) {
                    const parts = line.value.slice(1).split(':');
                    const newPath = 'src/' + parts.join('/') + '/local.lore';
                    a.href = newPath;
                    a.setAttribute('data-lore-original', line.value);
                    a.setAttribute('data-internal-lore', 'true');
                } else {
                    a.href = line.value;
                    if (line.value.startsWith('/')) {
                        a.setAttribute('data-internal-lore', 'true');
                    }
                }
                a.target = '_blank';
                a.textContent = line.key;
                p.appendChild(a);
                break;
            case 'domain':
                const strong = document.createElement('strong');
                strong.textContent = `+ ${line.content}`;
                p.appendChild(strong);
                break;
        }

        container.appendChild(p);
    }
}