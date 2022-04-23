import { Request, Response } from "express";
import { Controller, Post, HTTPMethod } from "src/decorators/response";
import * as request from "request";
@Controller("/api")
export default class Test {
  @Post("/proxy")
  public async testGet(
    req: Request<{ proxyUrl: string; method?: HTTPMethod }>,
    res: Response
  ) {
    const { proxyUrl } = req.body;
    const response = request.get(proxyUrl);

    req.pipe(response);
    response.pipe(res);
  }
}
