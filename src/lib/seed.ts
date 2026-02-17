import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

const MOCK_PRODUCTS = [
    { name: "Industrial Washing Machine", category: "Laundry", price: "QAR 12,500", stock: 8, status: "In Stock" },
    { name: "Commercial Kitchen Oven", category: "Kitchen", price: "QAR 8,900", stock: 5, status: "In Stock" },
    { name: "Embroidery Machine Pro", category: "Embroidery", price: "QAR 15,000", stock: 3, status: "Low Stock" },
    { name: "Split AC Unit 2.5 Ton", category: "HVAC", price: "QAR 3,200", stock: 15, status: "In Stock" },
    { name: "Ironing Press Machine", category: "Laundry", price: "QAR 6,800", stock: 0, status: "Out of Stock" },
    { name: "Electrical Control Panel", category: "Electrical", price: "QAR 22,000", stock: 2, status: "Low Stock" },
];

const MOCK_RESERVATIONS = [
    { customerName: "Al Jazeera Hotel", productName: "Industrial Washing Machine x3", date: "2026-02-15", status: "Confirmed", amount: "QAR 37,500" },
    { customerName: "Doha Medical Center", productName: "Kitchen Equipment Set", date: "2026-02-14", status: "Pending", amount: "QAR 25,000" },
    { customerName: "Qatar Laundry Services", productName: "Ironing Press Machine x2", date: "2026-02-13", status: "Confirmed", amount: "QAR 13,600" },
    { customerName: "Royal Restaurant Group", productName: "Commercial Kitchen Oven x4", date: "2026-02-12", status: "Delivered", amount: "QAR 35,600" },
    { customerName: "Lusail Factory", productName: "Electrical Control Panel", date: "2026-02-11", status: "Cancelled", amount: "QAR 22,000" },
];

const MOCK_CHATS = [
    {
        customerName: "Ahmed Al-Thani",
        company: "Al Jazeera Hotel",
        lastMessage: "When will the washing machines be delivered?",
        time: "2 min ago",
        unread: 2,
        messages: [
            { from: "customer", text: "Hello, I'd like to inquire about the industrial washing machines.", time: "10:00 AM" },
            { from: "admin", text: "Hi Ahmed! Of course, we have several models available. What capacity are you looking for?", time: "10:05 AM" },
            { from: "customer", text: "We need 3 units, 25kg capacity each, for our hotel laundry.", time: "10:08 AM" },
            { from: "admin", text: "We have the perfect model. Let me prepare a quotation for you.", time: "10:12 AM" },
            { from: "customer", text: "When will the washing machines be delivered?", time: "10:15 AM" },
        ],
    },
    {
        customerName: "Fatima Hassan",
        company: "Doha Medical Center",
        lastMessage: "Can you send the maintenance schedule?",
        time: "1 hour ago",
        unread: 1,
        messages: [
            { from: "customer", text: "Hi, we need a maintenance schedule for our kitchen equipment.", time: "9:00 AM" },
            { from: "admin", text: "Sure! I'll prepare the AMC details for your equipment.", time: "9:15 AM" },
            { from: "customer", text: "Can you send the maintenance schedule?", time: "9:30 AM" },
        ],
    },
];

export const seedDatabase = async () => {
    // Check if products collection is empty
    const productSnapshot = await getDocs(collection(db, "products"));
    if (productSnapshot.empty) {
        console.log("Seeding products...");
        for (const p of MOCK_PRODUCTS) {
            await addDoc(collection(db, "products"), { ...p, createdAt: serverTimestamp() });
        }
    }

    // Check if reservations collection is empty
    const resSnapshot = await getDocs(collection(db, "reservations"));
    if (resSnapshot.empty) {
        console.log("Seeding reservations...");
        for (const r of MOCK_RESERVATIONS) {
            await addDoc(collection(db, "reservations"), { ...r, createdAt: serverTimestamp() });
        }
    }

    // Check if chats collection is empty
    const chatSnapshot = await getDocs(collection(db, "chats"));
    if (chatSnapshot.empty) {
        console.log("Seeding chats...");
        for (const c of MOCK_CHATS) {
            const { messages, ...chatData } = c;
            const chatRef = await addDoc(collection(db, "chats"), { ...chatData, createdAt: serverTimestamp() });
            const messagesRef = collection(chatRef, "messages");
            for (const m of messages) {
                await addDoc(messagesRef, { ...m, createdAt: serverTimestamp() });
            }
        }
    }
};
