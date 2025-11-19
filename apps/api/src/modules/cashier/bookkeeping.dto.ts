export interface CreateBookkeepingDTO {
  type: "income" | "expense";
  amount: number;
}

export interface FilterBookkeepingDTO {
  cashierId?: string;
}
