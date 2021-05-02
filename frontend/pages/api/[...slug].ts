import { IncomingMessage, OutgoingMessage } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

export const config = {
    api: {
        bodyParser: false,
    },
}

export const proxyContext = {
    target: process.env.API_TARGET,
    changeOrigin: true,
    pathRewrite: { [`^/api`]: '/api' },
    secure: false,
}

/**
 * TODO this is pretty hacky.
 * 
 * The reason we do this is because we want to be able to proxy internal api requests
 * for functions like getServerSideProps() so we can directly call this function
 * instead of going through another http network request by fetching our own API.
 * 
 * PR's welcome to improve this.
 * 
 * TLDR: this should help prevent double network requests when doing internal api requests.
 */
export const internalAPIReq = async (req, res, url: string): Promise<Object> => {

    //Current hack for lambda because we dont have access to an IncomingMessage so
    //in lambda env we need to go through http again. This should be fixed
    return (await fetch(process.env.API_TARGET + url)).json()

    //We should do this instead and not trigger a fetch http request
    req.url = url;

    //Just fake a new response object so the proxyMiddleware doesn't 
    //res.end() our original request.
    const cloned = Object.assign({
        ...new OutgoingMessage(),
        setHeader: () => { },
        emit: () => { },
        once: () => { },
        getHeader: () => { },
        _implicitHeader: () => { },
        _send: () => { }
    }, res);

    return new Promise((internalRes) => {
        createProxyMiddleware({
            ...proxyContext,
            onProxyRes: (proxyRes, _proxyReq, _serverRes) => {
                let data = "";

                proxyRes.on("data", (chunk) => {
                    data += chunk;
                });

                proxyRes.on("end", () => {
                    return internalRes(JSON.parse(data))
                });
            }
            //@ts-ignore
        })(req, cloned, () => { })
    })
}

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware(proxyContext);

export default function (req: IncomingMessage, res: OutgoingMessage) {
    //@ts-ignore
    return apiProxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }

        throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
    });
};

