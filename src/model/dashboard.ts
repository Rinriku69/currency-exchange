export interface DashBoard {
    currencyCode: string;
    rate: number;
    trend?: 'up' | 'down' | 'same'
}
