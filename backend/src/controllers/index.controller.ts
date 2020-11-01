import { Handler, Request, Response } from "express";

export const index: Handler = (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "Pinterest clone index path",
  });
};
export const usage: Handler = (req: Request, res: Response): Response => {
  return res.status(200).json({
    message: "For the usage redirect to /api/images",
  });
};
