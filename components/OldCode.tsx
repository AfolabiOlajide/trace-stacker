import React, { useState, useEffect } from "react";
import {
    Camera,
    Package,
    MapPin,
    Clock,
    CheckCircle,
    AlertCircle,
    Truck,
    QrCode,
    Plus,
    Home,
    History,
    LayoutGrid,
    List,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeDisplay from "@/components/QRCodeDisplay";

class MockHederaService {
    constructor() {
        this.products = [];
        this.events = [];
        this.savedProducts = [];
    }

    async connectWallet() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return {
            accountId: "0.0.12345",
            publicKey: "mock-public-key",
        };
    }

    async createProduct(name, description, location, imageUrl) {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const tokenId = `0.0.${Date.now()}`;
        const product = {
            tokenId,
            name,
            description,
            location,
            imageUrl:
                imageUrl ||
                `https://via.placeholder.com/400x300?text=${encodeURIComponent(
                    name
                )}`,
            createdAt: new Date().toISOString(),
            status: "CREATED",
        };

        this.products.push(product);
        await this.logEvent(
            tokenId,
            "CREATED",
            location,
            "Product registered on blockchain"
        );

        return product;
    }

    async logEvent(tokenId, eventType, location, notes) {
        await new Promise((resolve) => setTimeout(resolve, 800));

        const event = {
            id: `event-${Date.now()}-${Math.random()}`,
            tokenId,
            eventType,
            location,
            notes,
            timestamp: new Date().toISOString(),
            submittedBy: "0.0.12345",
        };

        this.events.push(event);

        const product = this.products.find((p) => p.tokenId === tokenId);
        if (product) {
            product.status = eventType;
            product.location = location;
        }

        return event;
    }

    async getProduct(tokenId) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.products.find((p) => p.tokenId === tokenId);
    }

    async getEvents(tokenId) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.events.filter((e) => e.tokenId === tokenId);
    }

    async getAllProducts() {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return this.products;
    }

    async saveProductId(tokenId, userAccountId) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const saved = {
            tokenId,
            userAccountId,
            savedAt: new Date().toISOString(),
        };
        this.savedProducts.push(saved);
        return saved;
    }

    async getSavedProducts(userAccountId) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const savedIds = this.savedProducts
            .filter((s) => s.userAccountId === userAccountId)
            .map((s) => s.tokenId);
        return this.products.filter((p) => savedIds.includes(p.tokenId));
    }

    generateQRCode(tokenId) {
        return `HEDERA-PRODUCT:${tokenId}`;
    }
}

const hederaService = new MockHederaService();

export default function HederaSupplyChain() {
    const [activeTab, setActiveTab] = useState("home");
    const [connectedAccount, setConnectedAccount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [viewMode, setViewMode] = useState("cards");

    const [productForm, setProductForm] = useState({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
    });

    const [eventForm, setEventForm] = useState({
        eventType: "MANUFACTURED",
        location: "",
        notes: "",
    });

    const [trackingId, setTrackingId] = useState("");
    const [trackedProduct, setTrackedProduct] = useState(null);
    const [productEvents, setProductEvents] = useState([]);
    const [savedProducts, setSavedProducts] = useState([]);

    useEffect(() => {
        loadDemoData();
    }, []);

    const loadDemoData = async () => {
        const demo1 = await hederaService.createProduct(
            "Organic Coffee Beans",
            "Premium Arabica beans from Colombia",
            "Farm, Antioquia, Colombia",
            ""
        );
        await hederaService.logEvent(
            demo1.tokenId,
            "MANUFACTURED",
            "Processing Plant, Medellin",
            "Beans roasted and packaged"
        );
        await hederaService.logEvent(
            demo1.tokenId,
            "SHIPPED",
            "Port of Cartagena",
            "Container #ABC123"
        );

        const demo2 = await hederaService.createProduct(
            "Luxury Watch",
            "Swiss-made automatic timepiece",
            "Factory, Geneva, Switzerland",
            ""
        );
        await hederaService.logEvent(
            demo2.tokenId,
            "MANUFACTURED",
            "Geneva Factory",
            "Quality control passed"
        );

        const allProducts = await hederaService.getAllProducts();
        setProducts(allProducts);
    };

    const connectWallet = async () => {
        setLoading(true);
        setMessage({ type: "info", text: "Connecting to wallet..." });
        try {
            const account = await hederaService.connectWallet();
            setConnectedAccount(account);
            setMessage({
                type: "success",
                text: `Connected: ${account.accountId}`,
            });

            const saved = await hederaService.getSavedProducts(
                account.accountId
            );
            setSavedProducts(saved);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to connect wallet" });
        }
        setLoading(false);
    };

    const handleCreateProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "info", text: "Creating product NFT on Hedera..." });

        try {
            const product = await hederaService.createProduct(
                productForm.name,
                productForm.description,
                productForm.location,
                productForm.imageUrl
            );

            setMessage({
                type: "success",
                text: `Product created! Token ID: ${product.tokenId}`,
            });
            setProducts([...products, product]);
            setSelectedProduct(product);
            setShowQR(true);
            setProductForm({
                name: "",
                description: "",
                location: "",
                imageUrl: "",
            });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to create product" });
        }
        setLoading(false);
    };

    const handleLogEvent = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        setLoading(true);
        setMessage({ type: "info", text: "Logging event to HCS..." });

        try {
            await hederaService.logEvent(
                selectedProduct.tokenId,
                eventForm.eventType,
                eventForm.location,
                eventForm.notes
            );

            setMessage({ type: "success", text: "Event logged successfully!" });
            setEventForm({
                eventType: "MANUFACTURED",
                location: "",
                notes: "",
            });

            const allProducts = await hederaService.getAllProducts();
            setProducts(allProducts);
            const updated = allProducts.find(
                (p) => p.tokenId === selectedProduct.tokenId
            );
            setSelectedProduct(updated);
        } catch (error) {
            setMessage({ type: "error", text: "Failed to log event" });
        }
        setLoading(false);
    };

    const handleTrackProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "info", text: "Fetching product data..." });

        try {
            const product = await hederaService.getProduct(trackingId);
            if (!product) {
                setMessage({ type: "error", text: "Product not found" });
                setTrackedProduct(null);
                setProductEvents([]);
            } else {
                const events = await hederaService.getEvents(trackingId);
                setTrackedProduct(product);
                setProductEvents(events);
                setMessage({ type: "success", text: "Product found!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Failed to fetch product" });
        }
        setLoading(false);
    };

    const handleSaveProduct = async (tokenId) => {
        if (!connectedAccount) {
            setMessage({ type: "error", text: "Please connect wallet first" });
            return;
        }

        setLoading(true);
        setMessage({ type: "info", text: "Saving product to blockchain..." });

        try {
            await hederaService.saveProductId(
                tokenId,
                connectedAccount.accountId
            );
            const saved = await hederaService.getSavedProducts(
                connectedAccount.accountId
            );
            setSavedProducts(saved);
            setMessage({
                type: "success",
                text: "Product saved successfully!",
            });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to save product" });
        }
        setLoading(false);
    };

    const handleViewSavedProduct = (tokenId) => {
        setTrackingId(tokenId);
        setActiveTab("track");
    };

    const eventTypeColors = {
        CREATED: "bg-blue-100 text-blue-800",
        MANUFACTURED: "bg-purple-100 text-purple-800",
        SHIPPED: "bg-orange-100 text-orange-800",
        IN_TRANSIT: "bg-yellow-100 text-yellow-800",
        DELIVERED: "bg-green-100 text-green-800",
        QUALITY_CHECK: "bg-indigo-100 text-indigo-800",
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Package className="w-8 h-8 text-purple-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Hedera Supply Chain
                                </h1>
                                <p className="text-sm text-gray-500">
                                    Blockchain-powered transparency
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {connectedAccount ? (
                                <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-mono text-green-800">
                                        {connectedAccount.accountId}
                                    </span>
                                </div>
                            ) : (
                                <Button
                                    onClick={connectWallet}
                                    disabled={loading}
                                >
                                    Connect Wallet
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {message && (
                <div className="max-w-7xl mx-auto px-4 mt-4">
                    <Alert
                        className={
                            message.type === "error"
                                ? "border-red-500 bg-red-50"
                                : message.type === "success"
                                ? "border-green-500 bg-green-50"
                                : "border-blue-500 bg-blue-50"
                        }
                    >
                        <AlertDescription className="flex items-center gap-2">
                            {message.type === "error" && (
                                <AlertCircle className="w-4 h-4" />
                            )}
                            {message.type === "success" && (
                                <CheckCircle className="w-4 h-4" />
                            )}
                            {message.text}
                        </AlertDescription>
                    </Alert>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4 mb-8">
                        <TabsTrigger
                            value="home"
                            className="flex items-center gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </TabsTrigger>
                        <TabsTrigger
                            value="business"
                            className="flex items-center gap-2"
                        >
                            <Package className="w-4 h-4" />
                            Business Portal
                        </TabsTrigger>
                        <TabsTrigger
                            value="track"
                            className="flex items-center gap-2"
                        >
                            <QrCode className="w-4 h-4" />
                            Track Product
                        </TabsTrigger>
                        <TabsTrigger
                            value="saved"
                            className="flex items-center gap-2"
                        >
                            <History className="w-4 h-4" />
                            Saved Products
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="home">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveTab("business")}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="w-5 h-5 text-purple-600" />
                                        For Businesses
                                    </CardTitle>
                                    <CardDescription>
                                        Register products and manage supply
                                        chain
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Mint product NFTs on Hedera
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Log supply chain events to HCS
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Generate QR codes for tracking
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                                onClick={() => setActiveTab("track")}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <QrCode className="w-5 h-5 text-blue-600" />
                                        For Consumers
                                    </CardTitle>
                                    <CardDescription>
                                        Verify product authenticity and track
                                        journey
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Scan QR codes to verify products
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            View complete supply chain history
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            Blockchain-verified authenticity
                                        </li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Why Hedera?</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <div className="text-3xl font-bold text-purple-600">
                                            3-5s
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Transaction Finality
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <div className="text-3xl font-bold text-blue-600">
                                            $0.0001
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Per Transaction
                                        </div>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <div className="text-3xl font-bold text-green-600">
                                            Carbon-
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Negative Network
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="business">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Plus className="w-5 h-5" />
                                        Register New Product
                                    </CardTitle>
                                    <CardDescription>
                                        Mint NFT on Hedera Token Service
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleCreateProduct}
                                        className="space-y-4"
                                    >
                                        <div>
                                            <label className="text-sm font-medium">
                                                Product Name
                                            </label>
                                            <Input
                                                value={productForm.name}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Organic Coffee Beans"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">
                                                Description
                                            </label>
                                            <Textarea
                                                value={productForm.description}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="Product details..."
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">
                                                Initial Location
                                            </label>
                                            <Input
                                                value={productForm.location}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        location:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="e.g., Factory, City, Country"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium">
                                                Image URL (optional)
                                            </label>
                                            <Input
                                                value={productForm.imageUrl}
                                                onChange={(e) =>
                                                    setProductForm({
                                                        ...productForm,
                                                        imageUrl:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder="https://..."
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            disabled={loading}
                                        >
                                            {loading
                                                ? "Creating..."
                                                : "Create Product NFT"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <div className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>
                                                    Your Products
                                                </CardTitle>
                                                <CardDescription>
                                                    {products.length} products
                                                    registered
                                                </CardDescription>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant={
                                                        viewMode === "cards"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() =>
                                                        setViewMode("cards")
                                                    }
                                                >
                                                    <LayoutGrid className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant={
                                                        viewMode === "table"
                                                            ? "default"
                                                            : "outline"
                                                    }
                                                    onClick={() =>
                                                        setViewMode("table")
                                                    }
                                                >
                                                    <List className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {viewMode === "cards" ? (
                                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                                {products.map((product) => (
                                                    <div
                                                        key={product.tokenId}
                                                        onClick={() => {
                                                            setSelectedProduct(
                                                                product
                                                            );
                                                            setShowQR(false);
                                                        }}
                                                        className={`p-3 border rounded-lg cursor-pointer transition-all ${
                                                            selectedProduct?.tokenId ===
                                                            product.tokenId
                                                                ? "border-purple-500 bg-purple-50"
                                                                : "hover:border-gray-400"
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex-1">
                                                                <h3 className="font-medium">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </h3>
                                                                <p className="text-xs text-gray-500 font-mono">
                                                                    {
                                                                        product.tokenId
                                                                    }
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span
                                                                        className={`text-xs px-2 py-1 rounded ${
                                                                            eventTypeColors[
                                                                                product
                                                                                    .status
                                                                            ] ||
                                                                            "bg-gray-100"
                                                                        }`}
                                                                    >
                                                                        {
                                                                            product.status
                                                                        }
                                                                    </span>
                                                                    <MapPin className="w-3 h-3 text-gray-400" />
                                                                    <span className="text-xs text-gray-600">
                                                                        {
                                                                            product.location
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    setSelectedProduct(
                                                                        product
                                                                    );
                                                                    setShowQR(
                                                                        true
                                                                    );
                                                                }}
                                                            >
                                                                <QrCode className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto max-h-96">
                                                <table className="w-full text-sm">
                                                    <thead className="bg-gray-50 sticky top-0">
                                                        <tr>
                                                            <th className="text-left p-3 font-medium">
                                                                Product Name
                                                            </th>
                                                            <th className="text-left p-3 font-medium">
                                                                Token ID
                                                            </th>
                                                            <th className="text-left p-3 font-medium">
                                                                Status
                                                            </th>
                                                            <th className="text-left p-3 font-medium">
                                                                Location
                                                            </th>
                                                            <th className="text-left p-3 font-medium">
                                                                Created
                                                            </th>
                                                            <th className="text-left p-3 font-medium">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {products.map(
                                                            (product) => (
                                                                <tr
                                                                    key={
                                                                        product.tokenId
                                                                    }
                                                                    className={`border-b hover:bg-gray-50 cursor-pointer ${
                                                                        selectedProduct?.tokenId ===
                                                                        product.tokenId
                                                                            ? "bg-purple-50"
                                                                            : ""
                                                                    }`}
                                                                    onClick={() => {
                                                                        setSelectedProduct(
                                                                            product
                                                                        );
                                                                        setShowQR(
                                                                            false
                                                                        );
                                                                    }}
                                                                >
                                                                    <td className="p-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <Package className="w-4 h-4 text-gray-400" />
                                                                            <span className="font-medium">
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3">
                                                                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                                            {
                                                                                product.tokenId
                                                                            }
                                                                        </code>
                                                                    </td>
                                                                    <td className="p-3">
                                                                        <span
                                                                            className={`text-xs px-2 py-1 rounded ${
                                                                                eventTypeColors[
                                                                                    product
                                                                                        .status
                                                                                ] ||
                                                                                "bg-gray-100"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                product.status
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                    <td className="p-3">
                                                                        <div className="flex items-center gap-1">
                                                                            <MapPin className="w-3 h-3 text-gray-400" />
                                                                            <span className="text-xs">
                                                                                {
                                                                                    product.location
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3">
                                                                        <div className="flex items-center gap-1">
                                                                            <Clock className="w-3 h-3 text-gray-400" />
                                                                            <span className="text-xs">
                                                                                {new Date(
                                                                                    product.createdAt
                                                                                ).toLocaleDateString()}
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="p-3">
                                                                        <div className="flex items-center gap-2">
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    e.stopPropagation();
                                                                                    setSelectedProduct(
                                                                                        product
                                                                                    );
                                                                                    setShowQR(
                                                                                        true
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <QrCode className="w-3 h-3" />
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                onClick={(
                                                                                    e
                                                                                ) => {
                                                                                    e.stopPropagation();
                                                                                    setSelectedProduct(
                                                                                        product
                                                                                    );
                                                                                    setShowQR(
                                                                                        false
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Truck className="w-3 h-3" />
                                                                            </Button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                                {products.length === 0 && (
                                                    <div className="text-center py-8 text-gray-500">
                                                        No products created yet
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {selectedProduct && !showQR && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Truck className="w-5 h-5" />
                                                Log Supply Chain Event
                                            </CardTitle>
                                            <CardDescription>
                                                For: {selectedProduct.name}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <form
                                                onSubmit={handleLogEvent}
                                                className="space-y-4"
                                            >
                                                <div>
                                                    <label className="text-sm font-medium">
                                                        Event Type
                                                    </label>
                                                    <select
                                                        value={
                                                            eventForm.eventType
                                                        }
                                                        onChange={(e) =>
                                                            setEventForm({
                                                                ...eventForm,
                                                                eventType:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        className="w-full p-2 border rounded"
                                                    >
                                                        <option value="MANUFACTURED">
                                                            Manufactured
                                                        </option>
                                                        <option value="SHIPPED">
                                                            Shipped
                                                        </option>
                                                        <option value="IN_TRANSIT">
                                                            In Transit
                                                        </option>
                                                        <option value="QUALITY_CHECK">
                                                            Quality Check
                                                        </option>
                                                        <option value="DELIVERED">
                                                            Delivered
                                                        </option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">
                                                        Location
                                                    </label>
                                                    <Input
                                                        value={
                                                            eventForm.location
                                                        }
                                                        onChange={(e) =>
                                                            setEventForm({
                                                                ...eventForm,
                                                                location:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder="e.g., Warehouse, Miami, FL"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium">
                                                        Notes
                                                    </label>
                                                    <Textarea
                                                        value={eventForm.notes}
                                                        onChange={(e) =>
                                                            setEventForm({
                                                                ...eventForm,
                                                                notes: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        placeholder="Additional details..."
                                                    />
                                                </div>
                                                <Button
                                                    type="submit"
                                                    className="w-full"
                                                    disabled={loading}
                                                >
                                                    {loading
                                                        ? "Logging..."
                                                        : "Log Event to HCS"}
                                                </Button>
                                            </form>
                                        </CardContent>
                                    </Card>
                                )}

                                {showQR && selectedProduct && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>QR Code</CardTitle>
                                            <CardDescription>
                                                {selectedProduct.name}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center">
                                            <QRCodeDisplay
                                                data={hederaService.generateQRCode(
                                                    selectedProduct.tokenId
                                                )}
                                            />
                                            <div className="mt-4 p-3 bg-gray-50 rounded w-full">
                                                <p className="text-xs font-medium text-gray-700">
                                                    Token ID:
                                                </p>
                                                <p className="text-sm font-mono">
                                                    {selectedProduct.tokenId}
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="mt-4 w-full"
                                                onClick={() => setShowQR(false)}
                                            >
                                                Close QR Code
                                            </Button>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="track">
                        <div className="max-w-4xl mx-auto">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <QrCode className="w-6 h-6" />
                                        Track Product
                                    </CardTitle>
                                    <CardDescription>
                                        Enter product ID or scan QR code
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form
                                        onSubmit={handleTrackProduct}
                                        className="space-y-4"
                                    >
                                        <div className="flex gap-2">
                                            <Input
                                                value={trackingId}
                                                onChange={(e) =>
                                                    setTrackingId(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter Token ID (e.g., 0.0.12345)"
                                                className="flex-1"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                            >
                                                Track
                                            </Button>
                                        </div>
                                    </form>

                                    {trackedProduct && (
                                        <div className="mt-6 space-y-6">
                                            <div className="border-t pt-6">
                                                <div className="flex items-start gap-4">
                                                    <img
                                                        src={
                                                            trackedProduct.imageUrl
                                                        }
                                                        alt={
                                                            trackedProduct.name
                                                        }
                                                        className="w-32 h-32 object-cover rounded-lg"
                                                    />
                                                    <div className="flex-1">
                                                        <h2 className="text-2xl font-bold">
                                                            {
                                                                trackedProduct.name
                                                            }
                                                        </h2>
                                                        <p className="text-gray-600 mt-1">
                                                            {
                                                                trackedProduct.description
                                                            }
                                                        </p>
                                                        <div className="flex items-center gap-4 mt-3">
                                                            <div className="flex items-center gap-1 text-sm">
                                                                <MapPin className="w-4 h-4 text-gray-500" />
                                                                <span className="font-medium">
                                                                    {
                                                                        trackedProduct.location
                                                                    }
                                                                </span>
                                                            </div>
                                                            <span
                                                                className={`text-sm px-3 py-1 rounded-full ${
                                                                    eventTypeColors[
                                                                        trackedProduct
                                                                            .status
                                                                    ] ||
                                                                    "bg-gray-100"
                                                                }`}
                                                            >
                                                                {
                                                                    trackedProduct.status
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                            <p className="text-xs font-medium text-blue-900">
                                                                Blockchain
                                                                Verified
                                                            </p>
                                                            <p className="text-xs text-blue-700 font-mono mt-1">
                                                                {
                                                                    trackedProduct.tokenId
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                onClick={() =>
                                                    handleSaveProduct(
                                                        trackedProduct.tokenId
                                                    )
                                                }
                                                variant="outline"
                                                className="w-full"
                                                disabled={
                                                    loading || !connectedAccount
                                                }
                                            >
                                                <History className="w-4 h-4 mr-2" />
                                                Save Product to My List
                                            </Button>

                                            <div className="border-t pt-6">
                                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                    <Truck className="w-5 h-5" />
                                                    Supply Chain Journey
                                                </h3>
                                                <div className="space-y-4">
                                                    {productEvents.map(
                                                        (event, index) => (
                                                            <div
                                                                key={event.id}
                                                                className="flex gap-4"
                                                            >
                                                                <div className="flex flex-col items-center">
                                                                    <div
                                                                        className={`w-3 h-3 rounded-full ${
                                                                            index ===
                                                                            productEvents.length -
                                                                                1
                                                                                ? "bg-purple-600"
                                                                                : "bg-gray-400"
                                                                        }`}
                                                                    />
                                                                    {index <
                                                                        productEvents.length -
                                                                            1 && (
                                                                        <div className="w-0.5 h-full bg-gray-300 my-1" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 pb-8">
                                                                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                                                                        <div className="flex items-start justify-between mb-2">
                                                                            <span
                                                                                className={`text-sm font-medium px-2 py-1 rounded ${
                                                                                    eventTypeColors[
                                                                                        event
                                                                                            .eventType
                                                                                    ] ||
                                                                                    "bg-gray-100"
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    event.eventType
                                                                                }
                                                                            </span>
                                                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                                                <Clock className="w-3 h-3" />
                                                                                {new Date(
                                                                                    event.timestamp
                                                                                ).toLocaleString()}
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-1 text-sm mb-1">
                                                                            <MapPin className="w-4 h-4 text-gray-400" />
                                                                            <span className="font-medium">
                                                                                {
                                                                                    event.location
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                        {event.notes && (
                                                                            <p className="text-sm text-gray-600 mt-2">
                                                                                {
                                                                                    event.notes
                                                                                }
                                                                            </p>
                                                                        )}
                                                                        <p className="text-xs text-gray-400 mt-2">
                                                                            By:{" "}
                                                                            {
                                                                                event.submittedBy
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="saved">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="w-6 h-6" />
                                    My Saved Products
                                </CardTitle>
                                <CardDescription>
                                    {connectedAccount
                                        ? `${savedProducts.length} products saved to blockchain`
                                        : "Connect wallet to view saved products"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!connectedAccount ? (
                                    <div className="text-center py-12">
                                        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-4">
                                            Connect your wallet to save and view
                                            products
                                        </p>
                                        <Button
                                            onClick={connectWallet}
                                            disabled={loading}
                                        >
                                            Connect Wallet
                                        </Button>
                                    </div>
                                ) : savedProducts.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-2">
                                            No saved products yet
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Track products and save them to view
                                            later
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {savedProducts.map((product) => (
                                            <Card
                                                key={product.tokenId}
                                                className="hover:shadow-lg transition-shadow"
                                            >
                                                <CardContent className="p-4">
                                                    <img
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        className="w-full h-32 object-cover rounded-lg mb-3"
                                                    />
                                                    <h3 className="font-semibold mb-1">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                                        {product.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span
                                                            className={`text-xs px-2 py-1 rounded ${
                                                                eventTypeColors[
                                                                    product
                                                                        .status
                                                                ] ||
                                                                "bg-gray-100"
                                                            }`}
                                                        >
                                                            {product.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                                                        <MapPin className="w-3 h-3" />
                                                        <span className="truncate">
                                                            {product.location}
                                                        </span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="w-full"
                                                        onClick={() =>
                                                            handleViewSavedProduct(
                                                                product.tokenId
                                                            )
                                                        }
                                                    >
                                                        View Details
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            <div className="bg-white border-t mt-12">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>Built on Hedera Hashgraph</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span>Powered by HTS & HCS</span>
                            <span>•</span>
                            <span>Fast, Secure, Sustainable</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
