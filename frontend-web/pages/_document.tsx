import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="bg-base-100 dark:bg-base-dark-100">
          <Main />
          <div id="presentational" role="presentation" />
          <div id="tooltip" role="tooltip" aria-label="tooltip" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
