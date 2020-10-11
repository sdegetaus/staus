abstract class SEO {
  public static title: string;
  public static description: string;
  public static slug: string;
  public static meta: MetaPair[];

  public static setMeta = (meta: MetaPair[]) => {
    // todo: improve
    SEO.meta = meta;
  };

  public static connect = (element: JSX.Element, props: SEOProps) => {
    SEO.title = props.title;
    SEO.description = props.description;
    SEO.slug = props.slug?.toLowerCase();
    return element;
  };

  public static clearPage = () => {
    SEO.title = null;
    SEO.description = null;
    SEO.slug = null;
  };
}

type SEOProps = {
  title?: string;
  description?: string;
  slug?: string;
  meta?: MetaPair[];
};

type MetaPair = {
  name: string;
  content: string;
};

export default SEO;
