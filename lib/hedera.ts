import {
    Client,
    PrivateKey,
    AccountId,
    TokenCreateTransaction,
    TokenType,
    TokenSupplyType,
    TokenMintTransaction,
    TopicCreateTransaction,
    TopicMessageSubmitTransaction,
    TopicId,
    TokenId,
    Hbar,
    TransferTransaction,
    AccountBalanceQuery,
    TokenNftInfoQuery,
} from '@hashgraph/sdk';
import { Product, SupplyChainEvent, EventType, SavedProduct } from '@/types/types';

// Environment variables (use .env.local file)
const OPERATOR_ID = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_ID || '0.0.YOUR_ACCOUNT_ID';
const OPERATOR_KEY = process.env.NEXT_PUBLIC_HEDERA_OPERATOR_KEY || 'YOUR_PRIVATE_KEY';
const NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet'; // 'testnet' or 'mainnet'

class HederaSupplyChainService {
    private client: Client | null = null;
    private topicId: TopicId | null = null;
    private savedProductsTopicId: TopicId | null = null;

    // Initialize Hedera client
    async initialize(): Promise<void> {
        if (this.client) return;

        try {
            // Create client for testnet or mainnet
            if (NETWORK === 'mainnet') {
                this.client = Client.forMainnet();
            } else {
                this.client = Client.forTestnet();
            }

            // Set operator
            const operatorId = AccountId.fromString(OPERATOR_ID);
            const operatorKey = PrivateKey.fromString(OPERATOR_KEY);
            this.client.setOperator(operatorId, operatorKey);

            // Create or use existing HCS topic for supply chain events
            // In production, store this topic ID and reuse it
            await this.createTopics();

            console.log('Hedera client initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Hedera client:', error);
            throw error;
        }
    }

    // Create HCS topics for events and saved products
    private async createTopics(): Promise<void> {
        if (!this.client) throw new Error('Client not initialized');

        try {
            // Topic for supply chain events
            const topicTx = await new TopicCreateTransaction()
                .setTopicMemo('Supply Chain Events')
                .execute(this.client);

            const topicReceipt = await topicTx.getReceipt(this.client);
            this.topicId = topicReceipt.topicId!;

            // Topic for saved products
            const savedTx = await new TopicCreateTransaction()
                .setTopicMemo('Saved Products')
                .execute(this.client);

            const savedReceipt = await savedTx.getReceipt(this.client);
            this.savedProductsTopicId = savedReceipt.topicId!;

            console.log('HCS Topics created:', {
                events: this.topicId.toString(),
                saved: this.savedProductsTopicId.toString(),
            });
        } catch (error) {
            console.error('Failed to create topics:', error);
            throw error;
        }
    }

    // Connect wallet (using HashConnect or Blade Wallet)
    async connectWallet(): Promise<{ accountId: string; publicKey: string }> {
        // This is a placeholder - implement HashConnect or Blade Wallet integration
        // For demo purposes, using the operator account

        try {
            await this.initialize();

            return {
                accountId: OPERATOR_ID,
                publicKey: OPERATOR_KEY,
            };
        } catch (error) {
            console.error('Wallet connection failed:', error);
            throw error;
        }
    }

    // Create product NFT
    async createProduct(
        name: string,
        description: string,
        location: string,
        imageUrl?: string
    ): Promise<Product> {
        if (!this.client) throw new Error('Client not initialized');

        try {
            const operatorId = AccountId.fromString(OPERATOR_ID);
            const operatorKey = PrivateKey.fromString(OPERATOR_KEY);

            // Create NFT token
            const tokenCreateTx = await new TokenCreateTransaction()
                .setTokenName(name)
                .setTokenSymbol('PROD')
                .setTokenType(TokenType.NonFungibleUnique)
                .setDecimals(0)
                .setInitialSupply(0)
                .setTreasuryAccountId(operatorId)
                .setSupplyType(TokenSupplyType.Finite)
                .setMaxSupply(1)
                .setSupplyKey(operatorKey)
                .setAdminKey(operatorKey)
                .setFreezeDefault(false)
                .execute(this.client);

            const tokenCreateReceipt = await tokenCreateTx.getReceipt(this.client);
            const tokenId = tokenCreateReceipt.tokenId!;

            // Mint NFT with metadata
            const metadata = JSON.stringify({
                name,
                description,
                location,
                imageUrl: imageUrl || `https://via.placeholder.com/400x300?text=${encodeURIComponent(name)}`,
                createdAt: new Date().toISOString(),
            });

            const mintTx = await new TokenMintTransaction()
                .setTokenId(tokenId)
                .setMetadata([Buffer.from(metadata)])
                .execute(this.client);

            const mintReceipt = await mintTx.getReceipt(this.client);
            const serialNumber = mintReceipt.serials[0].toNumber();

            const product: Product = {
                tokenId: tokenId.toString(),
                serialNumber,
                name,
                description,
                location,
                imageUrl: imageUrl || `https://via.placeholder.com/400x300?text=${encodeURIComponent(name)}`,
                createdAt: new Date().toISOString(),
                status: 'CREATED',
                createdBy: OPERATOR_ID,
            };

            // Log initial event
            await this.logEvent(tokenId.toString(), 'CREATED', location, 'Product registered on blockchain');

            console.log('Product created:', product);
            return product;
        } catch (error) {
            console.error('Failed to create product:', error);
            throw error;
        }
    }

    // Log supply chain event to HCS
    async logEvent(
        tokenId: string,
        eventType: EventType,
        location: string,
        notes: string
    ): Promise<SupplyChainEvent> {
        if (!this.client || !this.topicId) throw new Error('Client or topic not initialized');

        try {
            const event: SupplyChainEvent = {
                id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                tokenId,
                eventType,
                location,
                notes,
                timestamp: new Date().toISOString(),
                submittedBy: OPERATOR_ID,
            };

            const message = JSON.stringify(event);

            const submitTx = await new TopicMessageSubmitTransaction()
                .setTopicId(this.topicId)
                .setMessage(message)
                .execute(this.client);

            const receipt = await submitTx.getReceipt(this.client);
            event.transactionId = submitTx.transactionId.toString();

            console.log('Event logged:', event);
            return event;
        } catch (error) {
            console.error('Failed to log event:', error);
            throw error;
        }
    }

    // Get product details from NFT
    async getProduct(tokenId: string): Promise<Product | null> {
        if (!this.client) throw new Error('Client not initialized');

        try {
            const tokenIdObj = TokenId.fromString(tokenId);

            // Query NFT info
            const nftInfo = await new TokenNftInfoQuery()
                .setNftId(tokenIdObj.nft(1))
                .execute(this.client);

            if (!nftInfo || nftInfo.length === 0) return null;

            const metadata = JSON.parse(Buffer.from(nftInfo[0].metadata).toString());

            return {
                tokenId,
                serialNumber: 1,
                ...metadata,
            };
        } catch (error) {
            console.error('Failed to get product:', error);
            return null;
        }
    }

    // Get supply chain events from HCS using Mirror Node API
    async getEvents(tokenId: string): Promise<SupplyChainEvent[]> {
        if (!this.topicId) throw new Error('Topic not initialized');

        try {
            // Use Hedera Mirror Node REST API
            const mirrorNodeUrl = NETWORK === 'mainnet'
                ? 'https://mainnet-public.mirrornode.hedera.com'
                : 'https://testnet.mirrornode.hedera.com';

            const response = await fetch(
                `${mirrorNodeUrl}/api/v1/topics/${this.topicId.toString()}/messages`
            );

            const data = await response.json();

            if (!data.messages) return [];

            // Filter and parse events for this product
            const events: SupplyChainEvent[] = data.messages
                .map((msg: any) => {
                    try {
                        const decoded = Buffer.from(msg.message, 'base64').toString('utf-8');
                        const event = JSON.parse(decoded);
                        return event.tokenId === tokenId ? event : null;
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);

            return events.sort((a, b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );
        } catch (error) {
            console.error('Failed to get events:', error);
            return [];
        }
    }

    // Save product ID to blockchain
    async saveProductId(tokenId: string, userAccountId: string): Promise<SavedProduct> {
        if (!this.client || !this.savedProductsTopicId) {
            throw new Error('Client or saved products topic not initialized');
        }

        try {
            const saved: SavedProduct = {
                tokenId,
                userAccountId,
                savedAt: new Date().toISOString(),
            };

            const message = JSON.stringify(saved);

            await new TopicMessageSubmitTransaction()
                .setTopicId(this.savedProductsTopicId)
                .setMessage(message)
                .execute(this.client);

            console.log('Product saved:', saved);
            return saved;
        } catch (error) {
            console.error('Failed to save product:', error);
            throw error;
        }
    }

    // Get saved products for user
    async getSavedProducts(userAccountId: string): Promise<string[]> {
        if (!this.savedProductsTopicId) throw new Error('Saved products topic not initialized');

        try {
            const mirrorNodeUrl = NETWORK === 'mainnet'
                ? 'https://mainnet-public.mirrornode.hedera.com'
                : 'https://testnet.mirrornode.hedera.com';

            const response = await fetch(
                `${mirrorNodeUrl}/api/v1/topics/${this.savedProductsTopicId.toString()}/messages`
            );

            const data = await response.json();

            if (!data.messages) return [];

            const savedTokenIds = data.messages
                .map((msg: any) => {
                    try {
                        const decoded = Buffer.from(msg.message, 'base64').toString('utf-8');
                        const saved = JSON.parse(decoded);
                        return saved.userAccountId === userAccountId ? saved.tokenId : null;
                    } catch {
                        return null;
                    }
                })
                .filter(Boolean);

            return [...new Set(savedTokenIds)]; // Remove duplicates
        } catch (error) {
            console.error('Failed to get saved products:', error);
            return [];
        }
    }

    // Generate QR code data
    generateQRCode(tokenId: string): string {
        return `HEDERA-SUPPLY-CHAIN:${tokenId}`;
    }

    // Parse QR code data
    parseQRCode(data: string): string | null {
        if (data.startsWith('HEDERA-SUPPLY-CHAIN:')) {
            return data.replace('HEDERA-SUPPLY-CHAIN:', '');
        }
        return null;
    }
}

// Export singleton instance
export const hederaService = new HederaSupplyChainService();