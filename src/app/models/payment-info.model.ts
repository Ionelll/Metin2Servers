export interface PaymentInfo {
  price: number;
  currency: string;
  name: string;
  description: string;
  active: boolean;
  active_until: null;
  renew_date: Date;
  management_url: string;
}
