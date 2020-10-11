export interface PageProps {
  locale: string;
}

export type LocaleData = {
  [locale: string]: {
    messages: {
      [key: string]: string;
    };
  };
};
