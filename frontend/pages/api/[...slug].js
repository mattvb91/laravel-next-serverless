import {createProxyMiddleware} from 'http-proxy-middleware';

export const config = {
    api: {
        bodyParser: false,
    },
}

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
    target: process.env.API_TARGET,
    changeOrigin: true,
    pathRewrite: { [`^/api`]: '/api' },
    secure: false,
});

export default function (req, res) {
    return apiProxy(req, res, (result) => {
        if (result instanceof Error) {
            throw result;
        }

        throw new Error(`Request '${req.url}' is not proxied! We should never reach here!`);
    });
};