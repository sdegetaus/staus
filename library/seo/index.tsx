abstract class SEO {
  public static title: string | JSX.Element;
  public static description: string | JSX.Element;
  public static meta: MetaPair[];

  public static setMeta = (meta: MetaPair[]) => {
    SEO.meta = meta;
  };

  public static connect = (element: JSX.Element, props: SEOProps) => {
    SEO.title = props.title;
    SEO.description = props.description;
    return element;
  };
}

type SEOProps = {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  meta?: MetaPair[];
};

type MetaPair = {
  name: string;
  content: string;
};

export default SEO;
