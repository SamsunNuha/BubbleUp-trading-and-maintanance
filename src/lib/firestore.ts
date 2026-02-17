import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    onSnapshot,
    Timestamp,
    serverTimestamp
} from "firebase/firestore";
import { db } from "./firebase";

// === PRODUCTS ===
export interface Product {
    id?: string;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: string;
    createdAt?: any;
}

export const getProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const addProduct = async (product: Product) => {
    return await addDoc(collection(db, "products"), {
        ...product,
        createdAt: serverTimestamp(),
    });
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, updates);
};

export const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
};

// === RESERVATIONS ===
export interface Reservation {
    id?: string;
    customerName: string;
    productName: string;
    status: string;
    date: string;
    amount: string;
}

export const getReservations = async (): Promise<Reservation[]> => {
    const querySnapshot = await getDocs(collection(db, "reservations"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Reservation));
};

export const addReservation = async (reservation: Reservation) => {
    return await addDoc(collection(db, "reservations"), {
        ...reservation,
        createdAt: serverTimestamp(),
    });
};

// === CHAT ===
export interface Message {
    id?: string;
    from: "admin" | "customer";
    text: string;
    time: string;
    createdAt: any;
}

export interface Chat {
    id?: string;
    customerName: string;
    lastMessage: string;
    time: string;
    unread: number;
    messages: Message[];
}

export const subscribeToChats = (callback: (chats: Chat[]) => void) => {
    return onSnapshot(collection(db, "chats"), (snapshot) => {
        const chats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Chat));
        callback(chats);
    });
};

export const sendMessage = async (chatId: string, message: Omit<Message, "createdAt">) => {
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");
    await addDoc(messagesRef, {
        ...message,
        createdAt: serverTimestamp(),
    });

    // Also update last message in the main chat doc
    await updateDoc(chatRef, {
        lastMessage: message.text,
        time: "Just now",
    });
};
