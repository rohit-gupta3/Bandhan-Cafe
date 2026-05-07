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

export type MenuItem = {
    id: number;
    name: string;
    category: string;
    description: string;
    full_price: number;
    half_price: number | null;
};