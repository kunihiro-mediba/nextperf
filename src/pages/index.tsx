import type { GetStaticPropsContext, GetStaticPropsResult } from "next";

interface Props {
    now: string;
}

export default function IndexPage({ now }: Props): JSX.Element {
    return (
        <>
            <div>Hello,World!</div>
            <div>{now}</div>
        </>
    );
}

export async function getStaticProps({}: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
    return {
        props: {
            now: new Date().toISOString(),
        },
    };
}
