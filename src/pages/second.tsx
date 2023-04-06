import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getSession } from "../lib/session";

interface Props {
    count: number;
}

export default function second({ count }: Props): JSX.Element {
    return (
        <>
            <div>second page</div>
            <div id="count">{count}</div>
        </>
    );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
    const { count } = await getSession(req, res);
    return {
        props: {
            count: count ?? 0,
        },
    };
}
