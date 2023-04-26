import { Request, Response, NextFunction } from "express";
import BaseController from "../controllers/BaseController";
import { AUTH_TOKEN } from "../config/config";

export default class Middleware extends BaseController {
  constructor() {
    super();
  }

  requestHasAuthorization = (req: Request, res: Response, next: NextFunction): any => {
    if (!AUTH_TOKEN) 
      return res.status(401).send("You shall not pass!");
    
    const auth: string | undefined = req.get("authorization");
    if (!auth) 
      return res.status(401).send("You shall not pass!");

    if (auth !== AUTH_TOKEN)
      return res.status(401).send("You shall not pass!");
  
    return next();
  };
}
