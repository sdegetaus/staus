export type IntlData = {
  [locale: string]: {
    messages: MessagePair;
  };
};

export type MessagePair = {
  [key: string]: string;
};
