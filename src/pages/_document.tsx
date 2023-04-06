import { Html, Head, Main, NextScript } from "next/document";

export default function CustomDocument(): JSX.Element {
    return (
        <Html lang="ja">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

/*
async function getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
}

CustomDocument.getInitialProps = getInitialProps;
*/
