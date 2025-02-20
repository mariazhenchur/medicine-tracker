import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Link rel="icon" href="/favicon.png" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
