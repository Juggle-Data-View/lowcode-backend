import { Request, Response } from "express";
import { Controller, Post, HTTPMethod, Get } from "src/decorators/response";
import * as request from "request";
import { readFileSync } from "fs";
import { resolve } from "path";
@Controller("/api")
export default class Test {
  @Post("/proxy")
  public async testGet(
    req: Request<{ proxyUrl: string; method?: HTTPMethod }>,
    res: Response
  ) {
    try {
      const { proxyUrl } = req.body;

      const response = request.get(proxyUrl);
      req.pipe(response);
      response.pipe(res);
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/mock/user")
  public mockUserData(req: Request, res: Response) {
    const mockData = readFileSync(resolve(__dirname, '../../../src/mockdata/user.json')).toString();
    res.send(mockData);
  }

  @Get("/mock/random")
  public randomData(req: Request, res: Response) {
    console.log("trigger");
    
    res.send([
      {
        test: Math.random()
      }, {
        test: Math.random()
      }, {
        test: Math.random()
      }, {
        test: Math.random()
      }, {
        test: Math.random()
      },
    ])
  }

}
