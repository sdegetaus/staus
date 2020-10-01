export default abstract class Page {
  private head: Head;
  private body: string;

  constructor(head: Head, body: string) {
    this.head = head;
    this.body = body;
  }

  public build = () => {
    const { language, title, description } = this.head;
    const html = `
      <!DOCTYPE html>
      <html lang="${language != null ? language : "en"}">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <link rel="icon" href="favicon.ico" type="image/ico">
            <title>${title != null ? title : ""}</title>
            ${
              description != null
                ? `<meta name="description" content="${description}">`
                : ``
            }
            <link rel="stylesheet" type="text/css" href="style.css">
        </head>
        <body>
            ${this.body}
            <script type="text/javascript" src="main.js"></script>
        </body>
      </html>
    `;
    return html.trim();
  };
}

type Head = {
  language?: string;
  title?: string;
  description?: string;
};
