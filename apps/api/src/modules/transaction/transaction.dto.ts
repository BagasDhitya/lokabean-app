export interface CreateTransactionDTO {
  productId: string;
  amount: number;
  paymentType: "CASH" | "MIDTRANS";
}

export interface UpdateTransactionStatusDTO {
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED";
}
