import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { getSession } from "../lib/session";

interface Props {
    count: number;
}

export default function first({ count }: Props): JSX.Element {
    return (
        <>
            <div>First page</div>
            <div>{count}</div>
        </>
    );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> {
    const sess = await getSession(req, res);
    sess.count = typeof sess.count === "number" ? sess.count + 1 : 1;
    sess.commit();

    return {
        props: {
            count: sess.count,
        } satisfies Props,
    };
}
