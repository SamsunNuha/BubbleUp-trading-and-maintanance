import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    MessageSquare,
    Calendar,
    LogOut,
    Home,
    Plus,
    Search,
    Edit,
    Trash2,
    Send,
    Users,
    UserPlus,
    X,
    Eye,
    EyeOff,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
    getProducts,
    addProduct,
    deleteProduct,
    getReservations,
    subscribeToChats,
    sendMessage,
    Product,
    Reservation,
    Chat
} from "../../lib/firestore";
import { seedDatabase } from "../../lib/seed";

type Tab = "overview" | "products" | "reservations" | "chat" | "users";

export function AdminDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>("overview");

    useEffect(() => {
        // Seed database on mount if empty
        seedDatabase();
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    };

    const sidebarLinks: { icon: React.ReactNode; label: string; tab: Tab }[] = [
        { icon: <LayoutDashboard size={20} />, label: "Overview", tab: "overview" },
        { icon: <Users size={20} />, label: "Users", tab: "users" },
        { icon: <ShoppingBag size={20} />, label: "Products", tab: "products" },
        { icon: <Calendar size={20} />, label: "Reservations", tab: "reservations" },
        { icon: <MessageSquare size={20} />, label: "Customer Chat", tab: "chat" },
    ];

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#0f172a",
                color: "#ffffff",
                display: "flex",
            }}
        >
            {/* Sidebar */}
            <aside
                style={{
                    width: "260px",
                    borderRight: "1px solid #1e293b",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    background: "#0b1121",
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "48px" }}>
                    <div
                        style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "8px",
                            background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <LayoutDashboard style={{ width: "20px", height: "20px", color: "#fff" }} />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: "20px", color: "#ffffff" }}>Admin Panel</span>
                </div>

                <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.tab}
                            onClick={() => setActiveTab(link.tab)}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "10px 16px",
                                borderRadius: "8px",
                                fontSize: "14px",
                                fontWeight: 500,
                                border: "none",
                                cursor: "pointer",
                                textAlign: "left",
                                width: "100%",
                                transition: "all 0.2s",
                                color: activeTab === link.tab ? "#60a5fa" : "#94a3b8",
                                background: activeTab === link.tab ? "rgba(96,165,250,0.1)" : "transparent",
                                borderLeft: activeTab === link.tab ? "none" : "none",
                                outline: activeTab === link.tab ? "1px solid rgba(96,165,250,0.2)" : "none",
                            }}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </button>
                    ))}
                </nav>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" }}>
                    <a
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            color: "#94a3b8",
                            textDecoration: "none",
                            fontSize: "14px",
                            fontWeight: 500,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(30,41,59,0.5)"; e.currentTarget.style.color = "#60a5fa"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                        <Home size={18} />
                        <span>Back to Website</span>
                    </a>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "10px 16px",
                            borderRadius: "8px",
                            color: "#94a3b8",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: 500,
                            textAlign: "left",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#f87171"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#94a3b8"; }}
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
                {activeTab === "overview" && <OverviewPanel />}
                {activeTab === "products" && <ProductsPanel />}
                {activeTab === "reservations" && <ReservationsPanel />}
                {activeTab === "chat" && <ChatPanel />}
                {activeTab === "users" && <UsersPanel />}
            </main>
        </div>
    );
}

/* ===== OVERVIEW PANEL ===== */
function OverviewPanel() {
    const [stats, setStats] = useState({ products: 0, reservations: 0, chats: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const products = await getProducts();
            const reservations = await getReservations();
            // Since subscribeToChats is a listener, we'll just fetch once for the summary or use a quick snapshot
            setStats({
                products: products.length,
                reservations: reservations.length,
                chats: 3, // Mocking placeholder for now or fetch list
            });
        };
        fetchStats();
    }, []);

    return (
        <>
            <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>Dashboard Overview</h1>
                <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "10px", padding: "10px 20px", fontSize: "14px", color: "#94a3b8" }}>
                    Welcome, Administrator
                </div>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "40px" }}>
                <StatCard title="Total Products" value={String(stats.products)} trend="+0 today" />
                <StatCard title="Active Holds" value={String(stats.reservations)} trend="real-time" />
                <StatCard title="Current Offers" value="4" trend="active" />
                <StatCard title="Chat Requests" value={String(stats.chats)} trend="unread" highlight />
            </div>

            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "16px", padding: "24px" }}>
                <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "24px" }}>Recent Activity</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {[
                        { name: "Industrial Pump #101", action: "Reserved", time: "2 hours ago", color: "#60a5fa" },
                        { name: "Kitchen Equipment Set #205", action: "Delivered", time: "5 hours ago", color: "#34d399" },
                        { name: "Laundry Machine #312", action: "Maintenance", time: "1 day ago", color: "#f59e0b" },
                    ].map((item, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px", background: "rgba(30,41,59,0.5)", borderRadius: "10px", border: "1px solid rgba(51,65,85,0.5)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                                <div style={{ width: "42px", height: "42px", borderRadius: "8px", background: `${item.color}20`, display: "flex", alignItems: "center", justifyContent: "center", color: item.color, fontWeight: 700, fontSize: "14px" }}>
                                    {item.action[0]}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, color: "#ffffff", fontSize: "15px", marginBottom: "2px" }}>{item.name}</p>
                                    <p style={{ fontSize: "12px", color: "#64748b" }}>{item.action}</p>
                                </div>
                            </div>
                            <span style={{ fontSize: "13px", color: "#64748b" }}>{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

/* ===== PRODUCTS PANEL ===== */
function ProductsPanel() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
        name: "", category: "Laundry", price: "QAR 0", stock: 0, status: "In Stock"
    });

    const fetchProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price) return;
        await addProduct(newProduct as Product);
        setShowAddModal(false);
        setNewProduct({ name: "", category: "Laundry", price: "QAR 0", stock: 0, status: "In Stock" });
        fetchProducts();
    };

    return (
        <>
            <header style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>Products</h1>
                <button
                    onClick={() => setShowAddModal(true)}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#000",
                        fontWeight: 600, fontSize: "14px", border: "none", borderRadius: "8px", cursor: "pointer",
                    }}
                >
                    <Plus size={18} /> Add Product
                </button>
            </header>

            {/* Search Bar */}
            <div style={{ position: "relative", marginBottom: "24px", maxWidth: "400px" }}>
                <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input
                    type="text"
                    placeholder="Search products..."
                    style={{
                        width: "100%", padding: "10px 14px 10px 42px", background: "#1e293b", border: "1px solid #334155",
                        borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none",
                    }}
                />
            </div>

            {/* Products Table */}
            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e293b" }}>
                            {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading products...</td></tr>
                        ) : (
                            products.map((p) => (
                                <tr key={p.id} style={{ borderBottom: "1px solid rgba(30,41,59,0.5)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,41,59,0.3)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    <td style={{ padding: "14px 16px", color: "#ffffff", fontWeight: 500, fontSize: "14px" }}>{p.name}</td>
                                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px" }}>{p.category}</td>
                                    <td style={{ padding: "14px 16px", color: "#f59e0b", fontWeight: 600, fontSize: "14px" }}>{p.price}</td>
                                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px" }}>{p.stock}</td>
                                    <td style={{ padding: "14px 16px" }}>
                                        <span style={{
                                            padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                                            background: p.status === "In Stock" ? "rgba(52,211,153,0.15)" : p.status === "Low Stock" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)",
                                            color: p.status === "In Stock" ? "#34d399" : p.status === "Low Stock" ? "#f59e0b" : "#f87171",
                                        }}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: "14px 16px" }}>
                                        <div style={{ display: "flex", gap: "8px" }}>
                                            <button style={{ background: "rgba(96,165,250,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#60a5fa" }}>
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => p.id && handleDelete(p.id)}
                                                style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#f87171" }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {showAddModal && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ background: "#1e293b", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "460px", border: "1px solid #334155" }}>
                        <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff", marginBottom: "24px" }}>Add New Product</h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <input type="text" placeholder="Product Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} style={{ width: "100%", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", outline: "none" }} />
                            <select value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} style={{ width: "100%", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", outline: "none" }}>
                                <option value="Laundry">Laundry</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Embroidery">Embroidery</option>
                                <option value="HVAC">HVAC</option>
                                <option value="Electrical">Electrical</option>
                            </select>
                            <input type="text" placeholder="Price (e.g. QAR 5,000)" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} style={{ width: "100%", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", outline: "none" }} />
                            <input type="number" placeholder="Stock" value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} style={{ width: "100%", padding: "12px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#fff", outline: "none" }} />
                        </div>
                        <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                            <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: "12px", background: "transparent", border: "1px solid #334155", borderRadius: "8px", color: "#94a3b8", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleAddProduct} style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #06b6d4, #2563eb)", border: "none", borderRadius: "8px", color: "#fff", fontWeight: 600, cursor: "pointer" }}>Save Product</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* ===== RESERVATIONS PANEL ===== */
function ReservationsPanel() {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReservations = async () => {
            const data = await getReservations();
            setReservations(data);
            setLoading(false);
        };
        fetchReservations();
    }, []);

    const statusColors: Record<string, { bg: string; text: string }> = {
        Confirmed: { bg: "rgba(96,165,250,0.15)", text: "#60a5fa" },
        Pending: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
        Delivered: { bg: "rgba(52,211,153,0.15)", text: "#34d399" },
        Cancelled: { bg: "rgba(239,68,68,0.15)", text: "#f87171" },
    };

    return (
        <>
            <header style={{ marginBottom: "32px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>Reservations</h1>
                <p style={{ color: "#64748b", fontSize: "14px" }}>Manage equipment reservations and delivery schedules</p>
            </header>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                {[
                    { label: "Total", value: "5", color: "#60a5fa" },
                    { label: "Confirmed", value: "2", color: "#60a5fa" },
                    { label: "Pending", value: "1", color: "#f59e0b" },
                    { label: "Delivered", value: "1", color: "#34d399" },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "20px", background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "12px" }}>
                        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>{s.label}</p>
                        <p style={{ fontSize: "28px", fontWeight: 700, color: s.color }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Reservations Table */}
            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e293b" }}>
                            {["ID", "Customer", "Product", "Date", "Amount", "Status"].map((h) => (
                                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>Loading reservations...</td></tr>
                        ) : (
                            reservations.map((r) => (
                                <tr key={r.id} style={{ borderBottom: "1px solid rgba(30,41,59,0.5)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,41,59,0.3)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                                >
                                    <td style={{ padding: "14px 16px", color: "#60a5fa", fontWeight: 600, fontSize: "13px" }}>{r.id || "N/A"}</td>
                                    <td style={{ padding: "14px 16px", color: "#ffffff", fontWeight: 500, fontSize: "14px" }}>{r.customerName}</td>
                                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px" }}>{r.productName}</td>
                                    <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px" }}>{r.date}</td>
                                    <td style={{ padding: "14px 16px", color: "#f59e0b", fontWeight: 600, fontSize: "14px" }}>{r.amount}</td>
                                    <td style={{ padding: "14px 16px" }}>
                                        <span style={{
                                            padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
                                            background: statusColors[r.status]?.bg, color: statusColors[r.status]?.text,
                                        }}>
                                            {r.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

/* ===== CHAT PANEL ===== */
function ChatPanel() {
    const [selectedChat, setSelectedChat] = useState(0);
    const [messageInput, setMessageInput] = useState("");
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToChats((data) => {
            setChats(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const active = chats[selectedChat];

    const handleSendMessage = async () => {
        if (!messageInput.trim() || !active?.id) return;

        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

        await sendMessage(active.id, {
            from: "admin",
            text: messageInput.trim(),
            time: timeStr
        });

        setMessageInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <header style={{ marginBottom: "24px" }}>
                <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff" }}>Customer Chat</h1>
            </header>

            <div style={{ display: "flex", height: "calc(100vh - 160px)", borderRadius: "16px", overflow: "hidden", border: "1px solid #1e293b" }}>
                {/* Chat List */}
                <div style={{ width: "320px", background: "#0b1121", borderRight: "1px solid #1e293b", overflowY: "auto" }}>
                    {chats.map((chat, i) => (
                        <button
                            key={i}
                            onClick={() => setSelectedChat(i)}
                            style={{
                                display: "block", width: "100%", padding: "16px", textAlign: "left", border: "none",
                                borderBottom: "1px solid #1e293b", cursor: "pointer",
                                background: selectedChat === i ? "rgba(96,165,250,0.1)" : "transparent",
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                <span style={{ fontWeight: 600, color: "#ffffff", fontSize: "14px" }}>{chat.customerName}</span>
                                <span style={{ fontSize: "11px", color: "#64748b" }}>{chat.time}</span>
                            </div>
                            <p style={{ fontSize: "12px", color: "#60a5fa", marginBottom: "4px" }}>{chat.customerName.includes("Hotel") || chat.customerName.includes("Medical") ? "Commercial Client" : "Customer"}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <p style={{ fontSize: "13px", color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>
                                    {chat.lastMessage}
                                </p>
                                {chat.unread > 0 && (
                                    <span style={{ minWidth: "20px", height: "20px", borderRadius: "10px", background: "#f59e0b", color: "#000", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 6px" }}>
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Chat Messages */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#0f172a" }}>
                    {!active ? (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#64748b", gap: "16px" }}>
                            <MessageSquare size={48} opacity={0.2} />
                            {loading ? <p>Loading conversations...</p> : <p>Select a conversation to start chatting</p>}
                        </div>
                    ) : (
                        <>
                            {/* Chat Header */}
                            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: "12px" }}>
                                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #06b6d4, #2563eb)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "16px" }}>
                                    {active.customerName ? active.customerName[0] : "?"}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 600, color: "#ffffff", fontSize: "15px" }}>{active.customerName}</p>
                                    <p style={{ fontSize: "12px", color: "#60a5fa" }}>Customer</p>
                                </div>
                            </div>

                            {/* Messages */}
                            <div style={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                                {active.messages?.map((msg, i) => (
                                    <div key={i} style={{ display: "flex", justifyContent: msg.from === "admin" ? "flex-end" : "flex-start" }}>
                                        <div style={{
                                            maxWidth: "70%", padding: "12px 16px", borderRadius: "12px",
                                            background: msg.from === "admin" ? "linear-gradient(135deg, #1e40af, #1d4ed8)" : "#1e293b",
                                            color: "#ffffff", fontSize: "14px", lineHeight: 1.6,
                                        }}>
                                            <p style={{ margin: 0 }}>{msg.text}</p>
                                            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", marginTop: "6px", textAlign: "right" }}>{msg.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Message Input */}
                            <div style={{ padding: "16px 20px", borderTop: "1px solid #1e293b", display: "flex", gap: "12px" }}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    style={{
                                        flex: 1, padding: "12px 16px", background: "#1e293b", border: "1px solid #334155",
                                        borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none",
                                    }}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    style={{
                                        padding: "12px 20px", background: "linear-gradient(135deg, #06b6d4, #2563eb)",
                                        border: "none", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                                        color: "#fff", fontWeight: 600, fontSize: "14px",
                                    }}
                                >
                                    <Send size={16} /> Send
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

/* ===== USERS PANEL ===== */
function UsersPanel() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "User" });
    const [users, setUsers] = useState([
        { id: 1, name: "Ahmed Al-Thani", email: "ahmed@aljazeerahotel.qa", role: "Customer", status: "Active", signedUp: "2026-01-10", lastLogin: "2026-02-16 10:15 AM" },
        { id: 2, name: "Fatima Hassan", email: "fatima@dohamedical.qa", role: "Customer", status: "Active", signedUp: "2026-01-15", lastLogin: "2026-02-16 09:30 AM" },
        { id: 3, name: "Mohammed Ali", email: "mohammed@qatarlaundry.qa", role: "Customer", status: "Active", signedUp: "2026-01-20", lastLogin: "2026-02-16 07:00 AM" },
        { id: 4, name: "Sara Al-Kuwari", email: "sara@lusailfactory.qa", role: "Manager", status: "Active", signedUp: "2026-02-01", lastLogin: "2026-02-15 04:00 PM" },
        { id: 5, name: "Omar Jabir", email: "omar@royalrestaurant.qa", role: "Customer", status: "Inactive", signedUp: "2025-12-05", lastLogin: "2026-01-20 02:45 PM" },
        { id: 6, name: "Admin", email: "admin@gmail.com", role: "Admin", status: "Active", signedUp: "2025-11-01", lastLogin: "2026-02-17 12:50 AM" },
    ]);

    const handleAddUser = () => {
        if (!newUser.name.trim() || !newUser.email.trim() || !newUser.password.trim()) return;
        const now = new Date();
        const dateStr = now.toISOString().split("T")[0];
        const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
        setUsers([
            ...users,
            {
                id: users.length + 1,
                name: newUser.name.trim(),
                email: newUser.email.trim(),
                role: newUser.role,
                status: "Active",
                signedUp: dateStr,
                lastLogin: `${dateStr} ${timeStr}`,
            },
        ]);
        setNewUser({ name: "", email: "", password: "", role: "User" });
        setShowAddForm(false);
    };

    const handleDeleteUser = (id: number) => {
        setUsers(users.filter((u) => u.id !== id));
    };

    const roleColors: Record<string, { bg: string; text: string }> = {
        Admin: { bg: "rgba(239,68,68,0.15)", text: "#f87171" },
        Manager: { bg: "rgba(168,85,247,0.15)", text: "#a855f7" },
        Customer: { bg: "rgba(96,165,250,0.15)", text: "#60a5fa" },
        User: { bg: "rgba(52,211,153,0.15)", text: "#34d399" },
    };

    const statusColors: Record<string, { bg: string; text: string }> = {
        Active: { bg: "rgba(52,211,153,0.15)", text: "#34d399" },
        Inactive: { bg: "rgba(245,158,11,0.15)", text: "#f59e0b" },
    };

    return (
        <>
            <header style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#ffffff", marginBottom: "8px" }}>User Management</h1>
                    <p style={{ color: "#64748b", fontSize: "14px" }}>Manage user sign-ups and account access</p>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    style={{
                        display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px",
                        background: "linear-gradient(135deg, #f59e0b, #d97706)", color: "#000",
                        fontWeight: 600, fontSize: "14px", border: "none", borderRadius: "8px", cursor: "pointer",
                    }}
                >
                    <UserPlus size={18} /> Add User
                </button>
            </header>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
                {[
                    { label: "Total Users", value: String(users.length), color: "#60a5fa" },
                    { label: "Active", value: String(users.filter((u) => u.status === "Active").length), color: "#34d399" },
                    { label: "Inactive", value: String(users.filter((u) => u.status === "Inactive").length), color: "#f59e0b" },
                    { label: "Admins", value: String(users.filter((u) => u.role === "Admin").length), color: "#f87171" },
                ].map((s, i) => (
                    <div key={i} style={{ padding: "20px", background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "12px" }}>
                        <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>{s.label}</p>
                        <p style={{ fontSize: "28px", fontWeight: 700, color: s.color }}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Search */}
            <div style={{ position: "relative", marginBottom: "24px", maxWidth: "400px" }}>
                <Search size={18} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
                <input type="text" placeholder="Search users..." style={{ width: "100%", padding: "10px 14px 10px 42px", background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none" }} />
            </div>

            {/* Users Table */}
            <div style={{ background: "rgba(15,23,42,0.5)", border: "1px solid #1e293b", borderRadius: "16px", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid #1e293b" }}>
                            {["Name", "Email", "Role", "Status", "Signed Up", "Last Login", "Actions"].map((h) => (
                                <th key={h} style={{ padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} style={{ borderBottom: "1px solid rgba(30,41,59,0.5)" }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(30,41,59,0.3)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                                <td style={{ padding: "14px 16px", color: "#ffffff", fontWeight: 500, fontSize: "14px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "13px" }}>{u.name[0]}</div>
                                        {u.name}
                                    </div>
                                </td>
                                <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "14px" }}>{u.email}</td>
                                <td style={{ padding: "14px 16px" }}>
                                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: roleColors[u.role]?.bg || roleColors.User.bg, color: roleColors[u.role]?.text || roleColors.User.text }}>{u.role}</span>
                                </td>
                                <td style={{ padding: "14px 16px" }}>
                                    <span style={{ padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: statusColors[u.status]?.bg, color: statusColors[u.status]?.text }}>{u.status}</span>
                                </td>
                                <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "13px" }}>{u.signedUp}</td>
                                <td style={{ padding: "14px 16px", color: "#94a3b8", fontSize: "13px" }}>{u.lastLogin}</td>
                                <td style={{ padding: "14px 16px" }}>
                                    <div style={{ display: "flex", gap: "8px" }}>
                                        <button style={{ background: "rgba(96,165,250,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#60a5fa" }}><Edit size={16} /></button>
                                        {u.role !== "Admin" && <button onClick={() => handleDeleteUser(u.id)} style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "6px", padding: "6px", cursor: "pointer", color: "#f87171" }}><Trash2 size={16} /></button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add User Modal */}
            {showAddForm && (
                <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
                    <div style={{ background: "#1e293b", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "460px", border: "1px solid #334155" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>Add New User</h3>
                            <button onClick={() => setShowAddForm(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", cursor: "pointer" }}><X size={20} /></button>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div>
                                <label style={{ fontSize: "13px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>Full Name</label>
                                <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Enter full name" style={{ width: "100%", padding: "10px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>Email Address</label>
                                <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Enter email" style={{ width: "100%", padding: "10px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>Password</label>
                                <div style={{ position: "relative" }}>
                                    <input type={showPassword ? "text" : "password"} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Enter password" style={{ width: "100%", padding: "10px 14px", paddingRight: "42px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
                                    <button onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: "13px", color: "#94a3b8", display: "block", marginBottom: "6px" }}>Role</label>
                                <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} style={{ width: "100%", padding: "10px 14px", background: "#0f172a", border: "1px solid #334155", borderRadius: "8px", color: "#ffffff", fontSize: "14px", outline: "none", boxSizing: "border-box" }}>
                                    <option value="User">User</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Manager">Manager</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
                            <button onClick={() => setShowAddForm(false)} style={{ flex: 1, padding: "10px", background: "transparent", border: "1px solid #334155", borderRadius: "8px", color: "#94a3b8", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleAddUser} style={{ flex: 1, padding: "10px", background: "linear-gradient(135deg, #06b6d4, #2563eb)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>Create User</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* ===== SHARED COMPONENTS ===== */
function StatCard({ title, value, trend, highlight = false }: { title: string; value: string; trend: string; highlight?: boolean }) {
    return (
        <div style={{ padding: "24px", borderRadius: "14px", border: highlight ? "1px solid #3b82f6" : "1px solid #1e293b", background: highlight ? "rgba(59,130,246,0.05)" : "rgba(15,23,42,0.5)" }}>
            <p style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "8px" }}>{title}</p>
            <p style={{ fontSize: "30px", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>{value}</p>
            <p style={{ fontSize: "12px", color: highlight ? "#60a5fa" : "#64748b" }}>{trend}</p>
        </div>
    );
}
