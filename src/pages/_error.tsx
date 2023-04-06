import type { NextPageContext } from "next";
import Error, { type ErrorProps } from "next/error";

export default function ErrorPage({ statusCode }: ErrorProps): JSX.Element {
    return (
        <>
            <div>error</div>
            <Error statusCode={statusCode} />
        </>
    );
}

async function getInitialProps(ctx: NextPageContext) {
    return Error.getInitialProps(ctx);
}

ErrorPage.getInitialProps = getInitialProps;
