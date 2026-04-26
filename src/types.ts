export enum PaymentMethod {
    Cash = "cash",
    Online = "online",
}

export type CashflowItem = {
    id: number;
    type: "revenue" | "expense";
    category: string;
    amount: number;
    description: string;
    date: string;
    paymentMethod: PaymentMethod;
};