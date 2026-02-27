import { Request, Response } from "express";

interface Controller {
  execute(req: Request): Promise<{ statusCode: number; data: unknown }>;
}

export function expressAdapter(controller: Controller) {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { statusCode, data } = await controller.execute(req);
      res.status(statusCode).json(data);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Internal server error",
      });
    }
  };
}
