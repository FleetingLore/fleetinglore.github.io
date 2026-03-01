import React, { useEffect, useState } from 'react';
import { LoreFile } from '../models/LoreFile';
import { LoreNavigator } from '../models/LoreNavigator';
import './LoreContent.css';

interface LoreViewerProps {
    navigator: LoreNavigator;
    initialPath: string;
}

export const LoreViewer: React.FC<LoreViewerProps> = ({ navigator, initialPath }) => {
    const [file, setFile] = useState<LoreFile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = navigator.addListener((newFile) => {
            console.log('收到新文件:', newFile.path);
            setFile(newFile);
            setLoading(false);
            setError(null);
        });

        const init = async () => {
            try {
                setLoading(true);
                await navigator.navigateTo(initialPath);
            } catch (err) {
                setError(err instanceof Error ? err.message : '加载失败');
                setLoading(false);
            }
        };

        init();
        return unsubscribe;
    }, [navigator, initialPath]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('点击链接, 原始路径:', path);

        setLoading(true);
        navigator.navigateTo(path)
            .catch(err => {
                console.error('导航失败:', err);
                setError(err instanceof Error ? err.message : '导航失败');
                setLoading(false);
            });
    };

    const renderContent = () => {
        if (!file) return null;

        return file.lines.map((line, index) => {
            const marginLeft = `${line.indent * 20}px`;

            // 检查 line 是否有 value 属性（即是否为 LinkLine）
            if ('value' in line) {
                const linkLine = line as any; // 临时使用 any 简化
                const isInternal = linkLine.value?.startsWith(':');

                console.log('渲染链接:', linkLine.key, '->', linkLine.value); // 添加日志

                return (
                    <p key={index} style={{ marginLeft }}>
                        <a
                            href={linkLine.value}
                            onClick={(e) => handleLinkClick(e, linkLine.value)}
                            target={!isInternal ? '_blank' : undefined}
                            rel={!isInternal ? 'noopener noreferrer' : undefined}
                        >
                            {linkLine.key}
                        </a>
                    </p>
                );
            } else {
                // 原子行或领域行
                return line.render(index);
            }
        });
    };

    if (loading) {
        return <div className="lore-loading">加载中...</div>;
    }

    if (error) {
        return <div className="lore-error">❌ {error}</div>;
    }

    if (!file) {
        return <div className="lore-error">没有内容</div>;
    }

    return (
        <div className="lore-content">
            {renderContent()}
        </div>
    );
};