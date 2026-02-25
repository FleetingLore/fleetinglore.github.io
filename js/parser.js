// 解析一行，返回 Line 对象
// Line 结构：{ indent: number, type: 'atom'|'link'|'domain', key?: string, value?: string, content?: string }

export function parseLine(line) {
    // 计算缩进级别（每2个空格为一级）
    const trimmed = line.trimStart();
    const indent = (line.length - trimmed.length) / 2;

    // 领域：以 '+' 开头且后面有内容
    if (trimmed.startsWith('+') && trimmed.length > 1) {
        const domainContent = trimmed.slice(1).trim();
        return {
            indent,
            type: 'domain',
            content: domainContent
        };
    }

    // 链接：包含 '=' 字符
    const eqPos = trimmed.indexOf('=');
    if (eqPos !== -1) {
        const key = trimmed.slice(0, eqPos).trim();
        const value = trimmed.slice(eqPos + 1).trim();
        return {
            indent,
            type: 'link',
            key,
            value
        };
    }

    // 否则为原子
    return {
        indent,
        type: 'atom',
        content: trimmed
    };
}