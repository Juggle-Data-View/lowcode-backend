import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxyMiddleware = (
  req: Request<{ proxyUrl: string }>,
  res: Response,
  next: any
) => {
  const { proxyUrl } = req.body;
  console.log(req);

  const formatURL = new URL(proxyUrl);

  const { host, port, protocol, pathname } = formatURL;

  createProxyMiddleware({
    target: `${protocol}:${host}:${port}`,
    changeOrigin: true,
    pathRewrite: {
      "^api": pathname,
    },
  });
  next();
};

export default proxyMiddleware;
