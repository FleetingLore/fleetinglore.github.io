import { LoreLine } from './LoreLine';

export class LoreFile {
  lines: LoreLine[];
  path: string;

  constructor(path: string, content: string) {
    this.path = path;
    this.lines = content
        .split('\n')
        .filter(line => line.trim() !== '')
        .map(line => LoreLine.parse(line));
  }

  static async load(path: string) {
    console.log('加载文件:', path);

    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - 无法加载 ${path}`);
    }

    const content = await response.text();
    console.log('文件内容长度:', content.length);

    return new LoreFile(path, content);
  }

  renderAll() {
    return this.lines.map((line, index) => line.render(index));
  }
}