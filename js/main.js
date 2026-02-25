import { parseLine } from './parser.js';
import { renderLines } from './render.js';

// 加载 .lore 文件
async function fetchLoreFile(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`HTTP ${response.status} - 无法加载 ${path}`);
    return await response.text();
}

// 解析文本为 Line 数组
function parseContent(text) {
    return text
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => parseLine(line));
}

// 加载并渲染
async function loadAndRender(path, container) {
    try {
        const content = await fetchLoreFile(path);
        const lines = parseContent(content);
        renderLines(lines, container);
    } catch (err) {
        container.innerHTML = `<p style="color: red;">❌ 加载失败: ${err.message}</p>`;
    }
}

// ----- 初始化 -----
const container = document.getElementById('contentContainer');
loadAndRender('src/local.lore', container);

// 事件委托：捕获所有内部 lore 链接的点击
container.addEventListener('click', async (e) => {
    const link = e.target.closest('a[data-internal-lore="true"]');
    if (!link) return;

    e.preventDefault();                // 阻止默认跳转
    const lorePath = link.getAttribute('href');
    await loadAndRender(lorePath, container);
});