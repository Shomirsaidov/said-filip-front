"use client";

import { useEffect } from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchCart } from "@/redux/slices/cartSlice";
import api from "@/utils/api";

const CartPage = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice, loading, error } = useAppSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleUpdateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            await api.patch(`/cart/items/${itemId}`, { quantity: newQuantity });
            dispatch(fetchCart());
        } catch (err: any) {
            alert("Failed to update quantity");
        }
    };

    const handleRemoveItem = async (itemId: number) => {
        try {
            await api.delete(`/cart/items/${itemId}`);
            dispatch(fetchCart());
        } catch (err: any) {
            alert("Failed to remove item");
        }
    };

    const handlePlaceOrder = async () => {
        try {
            await api.post("/orders");
            alert("Order placed successfully!");
            dispatch(fetchCart());
        } catch (err: any) {
            alert("Failed to place order");
        }
    };

    if (loading && items.length === 0) return <div className="py-24 text-center">Loading cart...</div>;

    return (
        <>
            <Breadcrumb pageName="Shopping Cart" description="Review your items before checkout." />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    {items.length === 0 ? (
                        <div className="text-center">
                            <p className="mb-6 text-xl">Your cart is empty.</p>
                            <Link href="/products" className="rounded-sm bg-primary px-8 py-3 text-white">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-[800px]">
                            <div className="grid gap-8">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between border-b border-stroke pb-6 dark:border-stroke-dark">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-black dark:text-white">{item.product.name}</h4>
                                                <p className="text-sm text-body-color">${item.product.price.toFixed(2)} each</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center border border-stroke dark:border-stroke-dark rounded">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    -
                                                </button>
                                                <span className="px-3 py-1 border-x border-stroke dark:border-stroke-dark">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                    className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-8 flex items-center justify-between rounded-sm bg-white p-8 shadow-two dark:bg-dark border border-stroke dark:border-stroke-dark">
                                    <div>
                                        <h4 className="text-xl font-bold text-black dark:text-white">Total: ${totalPrice.toFixed(2)}</h4>
                                    </div>
                                    <button
                                        onClick={handlePlaceOrder}
                                        className="rounded-sm bg-primary px-8 py-4 text-white font-bold hover:bg-primary/90 transition-all"
                                    >
                                        Place Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default CartPage;
