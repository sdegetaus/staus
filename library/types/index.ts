export type LocaleData = {
  [locale: string]: {
    messages: {
      [key: string]: string;
    };
  };
};

export interface PageProps {
  locale: string;
  pageId: string;
}

export interface SEO {
  title?: string;
  description?: string;
  slug?: string;
  meta?: { name: string; content: string }[];
}
