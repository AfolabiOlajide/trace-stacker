export interface Product {
    tokenId: string;
    serialNumber?: number;
    name: string;
    description: string;
    location: string;
    imageUrl: string;
    createdAt: string;
    status: EventType;
    createdBy: string;
}

export interface SupplyChainEvent {
    id: string;
    tokenId: string;
    eventType: EventType;
    location: string;
    notes: string;
    timestamp: string;
    submittedBy: string;
    transactionId?: string;
}

export type EventType =
    | 'CREATED'
    | 'MANUFACTURED'
    | 'SHIPPED'
    | 'IN_TRANSIT'
    | 'QUALITY_CHECK'
    | 'DELIVERED'
    | 'CUSTOMS_CLEARANCE'
    | 'WAREHOUSE_ARRIVAL';

export interface SavedProduct {
    tokenId: string;
    userAccountId: string;
    savedAt: string;
}

export interface WalletConnection {
    accountId: string;
    publicKey: string;
}