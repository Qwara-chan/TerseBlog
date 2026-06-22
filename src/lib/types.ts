export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  draft?: boolean;
  updated?: string;
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
  headings: HeadingItem[];
  readingTime: number;
  excerpt: string;
  locale?: string;
}

export interface HeadingItem {
  depth: number;
  text: string;
  id: string;
  children?: HeadingItem[];
}

export interface TagCount {
  tag: string;
  count: number;
}
