import { LoreFile } from './LoreFile';

export class LoreNavigator {
    private currentFile: LoreFile | null = null;
    private history: string[] = [];
    private currentIndex: number = -1;
    private listeners: ((file: LoreFile) => void)[] = [];

    async navigateTo(path: string) {
        console.log('导航到原始路径:', path);

        const filePath = this.resolvePath(path);
        console.log('解析后路径:', filePath);

        try {
            const file = await LoreFile.load(filePath);
            console.log('文件加载成功');

            if (this.currentIndex < this.history.length - 1) {
                this.history = this.history.slice(0, this.currentIndex + 1);
            }
            this.history.push(filePath);
            this.currentIndex = this.history.length - 1;
            this.currentFile = file;

            this.listeners.forEach(cb => {
                try {
                    cb(file);
                } catch (err) {
                    console.error('监听器执行失败:', err);
                }
            });
        } catch (error) {
            console.error('导航失败:', error);
            throw error;
        }
    }

    private resolvePath(path: string): string {
        if (path.startsWith('http')) {
            return path;
        }

        if (path.startsWith(':')) {
            const parts = path.slice(1).split(':');
            return '/' + parts.join('/') + '/local.lore';
        }

        return path;
    }

    getCurrentFile() {
        return this.currentFile;
    }

    addListener(callback: (file: LoreFile) => void) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }
}