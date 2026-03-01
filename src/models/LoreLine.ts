import React from 'react';

export abstract class LoreLine {
    indent: number;
    rawContent: string;

    constructor(indent: number, rawContent: string) {
        this.indent = indent;
        this.rawContent = rawContent;
    }

    static parse(line: string) {
        const trimmed = line.trimStart();
        const indent = (line.length - trimmed.length) / 2;

        // 注释
        if (trimmed.startsWith('//')) {
            return new CommentLine(indent, trimmed);
        }

        // 领域
        if (trimmed.startsWith('+') && trimmed.length > 1) {
            return new DomainLine(indent, trimmed.slice(1).trim());
        }

        // 链接
        const eqPos = trimmed.indexOf('=');
        if (eqPos !== -1) {
            const key = trimmed.slice(0, eqPos).trim();
            const value = trimmed.slice(eqPos + 1).trim();
            return new LinkLine(indent, key, value);
        }

        // 原子
        return new AtomLine(indent, trimmed);
    }

    abstract render(index: number): any;

    protected getIndentStyle() {
        return { marginLeft: `${this.indent * 20}px` };
    }
}

export class AtomLine extends LoreLine {
    content: string;

    constructor(indent: number, content: string) {
        super(indent, content);
        this.content = content;
    }

    render(index: number) {
        return React.createElement(
            'p',
            { key: index, style: this.getIndentStyle() },
            this.content
        );
    }
}

export class LinkLine extends LoreLine {
    key: string;
    value: string;

    constructor(indent: number, key: string, value: string) {
        super(indent, `${key}=${value}`);
        this.key = key;
        this.value = value;
    }

    isInternal() {
        return this.value.startsWith(':');
    }

    render(index: number) {
        const isInternal = this.isInternal();

        const props: any = {
            href: this.value,  // 保持原始值，如 ":课程的书:高等数学下"
            'data-internal': isInternal ? 'true' : undefined,
        };

        if (!isInternal) {
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
        }

        return React.createElement(
            'p',
            { key: index, style: this.getIndentStyle() },
            React.createElement('a', props, this.key)
        );
    }
}

export class DomainLine extends LoreLine {
    title: string;

    constructor(indent: number, title: string) {
        super(indent, `+ ${title}`);
        this.title = title;
    }

    render(index: number) {
        return React.createElement(
            'p',
            { key: index, style: this.getIndentStyle() },
            React.createElement('strong', null, `+ ${this.title}`)
        );
    }
}

export class CommentLine extends LoreLine {
    comment: string;

    constructor(indent: number, comment: string) {
        super(indent, comment);
        this.comment = comment;
    }

    render(index: number) {
        return React.createElement(
            'p',
            {
                key: index,
                style: this.getIndentStyle(),
                className: 'lore-comment'
            },
            React.createElement(
                'span',
                { style: { color: '#6c757d', fontStyle: 'italic' } },
                this.comment
            )
        );
    }
}