import { setup } from "./main.mjs";

const api = setup({
    baseURL: "https://httpbin.org",
    cache: {
        maxAge: 15 * 60 * 1000,
        exclude: {
            query: false
        }
    }
});

const response = api.get("/get?foo=bar");

response.then(async (response) => {
    console.log(response.data.args.foo);
    console.log(response.request.fromCache === true);

    const anotherResponse = await api.get("/get?foo=bar");

    console.log(anotherResponse.data.args.foo);
    console.log(anotherResponse.request.fromCache === true);

});
