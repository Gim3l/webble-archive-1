import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from "blitz"
import { extractCritical } from "bumbag-server"
import { InitializeColorMode } from "bumbag"

class MyDocument extends Document {
  // Only uncomment if you need to customize this behaviour
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    const styles = extractCritical(initialProps.html)
    return {
      ...initialProps,
      styles: (
        <>
          {" "}
          {initialProps.styles}{" "}
          <style
            data-emotion-css={styles.ids.join(" ")}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />{" "}
        </>
      ),
    }
  }

  render() {
    return (
      <Html lang="en">
        <DocumentHead>
          <meta name="application-name" content="Webble" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Webble" />
          <meta name="description" content="Webble Learning Platform" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/static/icons/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://webble.co" />
          <meta name="twitter:title" content="Webble" />
          <meta name="twitter:description" content="Webble Learning Platform" />
          <meta
            name="twitter:image"
            content="https://webble.co/static/icons/android-chrome-192x192.png"
          />
          <meta name="twitter:creator" content="@WebbleOfficial" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Webble" />
          <meta property="og:description" content="Webble Learning Platform" />
          <meta property="og:site_name" content="Webble" />
          <meta property="og:url" content="https://webble.co" />
          <meta property="og:image" content="https://webble.co/static/icons/apple-touch-icon.png" />
        </DocumentHead>
        <body>
          <InitializeColorMode />
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
