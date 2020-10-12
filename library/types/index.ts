export interface PageProps {
  locale: string;
  id: string;
}

export type LocaleData = {
  [locale: string]: {
    messages: {
      [key: string]: string;
    };
  };
};
