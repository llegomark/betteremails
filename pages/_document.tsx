import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Betteremails is an AI platform for crafting professional, effective emails. Get natural, engaging email content with just a few clicks. Choose tone and category, provide inspiration, and let AI do the rest. Save time while maintaining a human-like tone. Experience effortless email writing with Betteremails."
          />
          <meta
            property="og:site_name"
            content="Experience Effortless Email Writing with AI Assistance - BetterEmails"
          />
          <meta
            property="og:description"
            content="Betteremails is an AI platform for crafting professional, effective emails. Get natural, engaging email content with just a few clicks. Choose tone and category, provide inspiration, and let AI do the rest. Save time while maintaining a human-like tone. Experience effortless email writing with Betteremails."
          />
          <meta
            property="og:title"
            content="Experience Effortless Email Writing with AI Assistance - BetterEmails"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Experience Effortless Email Writing with AI Assistance - BetterEmails"
          />
          <meta
            name="twitter:description"
            content="Betteremails is an AI platform for crafting professional, effective emails. Get natural, engaging email content with just a few clicks. Choose tone and category, provide inspiration, and let AI do the rest. Save time while maintaining a human-like tone. Experience effortless email writing with Betteremails."
          />
          <meta
            property="og:image"
            content="https://bible.betterself.app/betteremails.png"
          />
          <meta
            name="twitter:image"
            content="https://bible.betterself.app/betteremails.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;