export interface PageProps {
  locale: string;
}

export type LocaleData = {
  [locale: string]: {
    messages: MessagePair;
  };
};

export type MessagePair = {
  [key: string]: string;
};
