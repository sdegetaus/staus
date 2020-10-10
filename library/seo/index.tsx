abstract class SEO {
  public static title: string | JSX.Element;
  public static description: string | JSX.Element;

  public static connect = (element: JSX.Element, props: SEOProps) => {
    SEO.title = props.title;
    SEO.description = props.description;
    return element;
  };
}

type SEOProps = {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
};

export default SEO;
