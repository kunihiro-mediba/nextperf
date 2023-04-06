import type { AppProps } from "next/app";
import Head from "next/head";

export default function CustomApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="initial-scale=1,width=device-width" />
                <meta name="format-detection" content="email=no,telephone=none" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}
