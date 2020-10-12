export interface PageProps {
  locale: string;
  pageId: string;
}

export type LocaleData = {
  [locale: string]: {
    messages: {
      [key: string]: string;
    };
  };
};
