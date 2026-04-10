"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CartPage = () => {
    const [cart, setCart] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    const fetchCart = async () => {
        try {
            const response = await api.get("/cart");
            setCart(response.data);
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError("Please sign in to view your cart.");
            } else {
                setError("Failed to fetch cart. Please try again later.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleUpdateQuantity = async (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        try {
            await api.patch(`/cart/items/${itemId}`, { quantity });
            fetchCart();
        } catch (err) {
            alert("Failed to update quantity.");
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await api.delete(`/cart/items/${itemId}`);
            fetchCart();
        } catch (err) {
            alert("Failed to remove item.");
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await api.post("/orders");
            alert("Order placed successfully!");
            router.push("/orders");
        } catch (err) {
            alert("Failed to place order.");
        }
    };

    if (loading) return <div className="py-24 text-center">Loading cart...</div>;

    return (
        <>
            <Breadcrumb pageName="Shopping Cart" description="Review your items before checkout." />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    {error ? (
                        <div className="text-center">
                            <p className="mb-6 text-xl text-red-500">{error}</p>
                            <Link href="/signin" className="rounded-sm bg-primary px-8 py-3 text-white">Sign In</Link>
                        </div>
                    ) : !cart || cart.items.length === 0 ? (
                        <div className="text-center">
                            <p className="mb-6 text-xl">Your cart is empty.</p>
                            <Link href="/products" className="rounded-sm bg-primary px-8 py-3 text-white">Go Shopping</Link>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-[800px]">
                            <div className="mb-8 rounded-sm bg-white p-8 shadow-two dark:bg-dark">
                                {cart.items.map((item: any) => (
                                    <div key={item.id} className="mb-6 flex items-center justify-between border-b border-stroke pb-6 dark:border-stroke-dark last:border-0 last:mb-0 last:pb-0">
                                        <div className="flex items-center">
                                            <div className="mr-4 h-20 w-20 overflow-hidden rounded bg-gray-100">
                                                {/* Placeholder or real image */}
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-black dark:text-white">{item.product.name}</h4>
                                                <p className="text-sm text-body-color">${item.product.price} each</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="flex items-center border border-stroke rounded dark:border-stroke-dark">
                                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="px-3 py-1">-</button>
                                                <span className="px-3">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1">+</button>
                                            </div>
                                            <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between rounded-sm bg-white p-8 shadow-two dark:bg-dark">
                                <div>
                                    <p className="text-lg font-medium text-body-color">Total Price</p>
                                    <h3 className="text-2xl font-bold text-black dark:text-white">
                                        ${cart.items.reduce((acc: number, item: any) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                                    </h3>
                                </div>
                                <button
                                    onClick={handlePlaceOrder}
                                    className="rounded-sm bg-primary px-10 py-4 text-white font-bold hover:bg-primary/90 duration-300"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CartPage;
