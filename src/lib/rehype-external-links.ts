import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';
import type { Element, Root } from 'hast';

interface Options {
  internalDomain?: string;
  addIcon?: boolean;
}

export const rehypeExternalLinks: Plugin<[Options?], Root> = (options?: Options) => {
  return (tree: Root) => {
    const domain = options?.internalDomain || 'example.com';

    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'a') return;
      const href = node.properties?.href as string | undefined;
      if (!href || !/^https?:\/\//.test(href)) return;
      if (href.includes(domain)) return;

      node.properties = {
        ...node.properties,
        target: '_blank',
        rel: 'noopener noreferrer',
      };

      if (options?.addIcon) {
        node.children.push({
          type: 'element',
          tagName: 'span',
          properties: { class: 'external-link-icon', 'aria-hidden': 'true' },
          children: [{ type: 'text', value: ' ↗' }],
        });
      }
    });
  };
};
