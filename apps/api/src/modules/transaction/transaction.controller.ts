import { Request, Response } from "express";
import { transactionService } from "./transaction.service";

export const transactionController = {
  async create(req: Request, res: Response) {
    try {
      const userId = req.user?.id; // dari JWT
      const result = await transactionService.create(
        userId as string,
        req.body
      );
      res.status(201).json({ success: true, data: result });
    } catch (err: any) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message,
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await transactionService.getAll();
      res.json({ success: true, data: result });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const result = await transactionService.getById(req.params.id);
      res.json({ success: true, data: result });
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json({ success: false, message: err.message });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const { status } = req.body;
      const result = await transactionService.updateStatus(
        req.params.id,
        status
      );
      res.json({ success: true, data: result });
    } catch (err: any) {
      res
        .status(err.status || 500)
        .json({ success: false, message: err.message });
    }
  },
};
