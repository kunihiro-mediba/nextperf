import { check } from "k6";
import { get } from "k6/http";

export default function test() {
    const page1 = get("http://node:3000/first/");
    check(page1, {
        "page1:status:200": (r) => {
            return r.status === 200;
        },
    });

    const sid = Array.isArray(page1.cookies["sid"]) ? page1.cookies["sid"][0].value : "";

    const page2 = get("http://node:3000/second/", { cookies: { sid } });
    check(page2, {
        "page2:status:200": (r) => {
            return r.status === 200;
        },
        "page2:count:1": (r) => {
            return r.html("#count").text() === "1";
        },
    });
}

/** @type {import("k6/options").Options} */
export const options = {
    scenarios: {
        default: {
            executor: "constant-arrival-rate",
            duration: "10s",
            rate: 50,
            preAllocatedVUs: 50,
            maxVUs: 1000,
        },
    },
};
