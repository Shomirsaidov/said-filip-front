"use client";

import { useEffect, useState } from "react";
import api from "@/utils/api";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";

const OrdersPage = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get("/orders");
                setOrders(response.data);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError("Please sign in to view your orders.");
                } else {
                    setError("Failed to fetch orders. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="py-24 text-center">Loading orders...</div>;

    return (
        <>
            <Breadcrumb pageName="Order History" description="Manage your past and current orders." />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    {error ? (
                        <div className="text-center">
                            <p className="mb-6 text-xl text-red-500">{error}</p>
                            <Link href="/signin" className="rounded-sm bg-primary px-8 py-3 text-white">Sign In</Link>
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="text-center">
                            <p className="mb-6 text-xl">You have no orders yet.</p>
                            <Link href="/products" className="rounded-sm bg-primary px-8 py-3 text-white">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="mx-auto max-w-[900px]">
                            <div className="grid gap-8">
                                {orders.map((order) => (
                                    <div key={order.id} className="rounded-sm bg-white p-8 shadow-two dark:bg-dark border border-stroke dark:border-stroke-dark">
                                        <div className="flex flex-wrap items-center justify-between border-b border-stroke pb-6 mb-6 dark:border-stroke-dark">
                                            <div>
                                                <p className="text-sm text-body-color mb-1">Order Date</p>
                                                <h4 className="text-lg font-bold text-black dark:text-white">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </h4>
                                            </div>
                                            <div>
                                                <p className="text-sm text-body-color mb-1">Order Status</p>
                                                <span className="inline-block rounded-full bg-green-500 bg-opacity-10 px-4 py-1 text-xs font-semibold text-green-500 uppercase">
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-body-color mb-1">Total Amount</p>
                                                <h4 className="text-lg font-bold text-black dark:text-white">
                                                    ${Number(order.totalPrice || 0).toFixed(2)}
                                                </h4>
                                            </div>
                                        </div>

                                        <div>
                                            <h5 className="text-md font-semibold mb-4 text-black dark:text-white">Items in this order:</h5>
                                            <div className="grid gap-4">
                                                {order.items.map((item: any) => (
                                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                                        <span className="text-body-color">
                                                            {item.product?.name || "Product"} x {item.quantity}
                                                        </span>
                                                        <span className="font-medium text-black dark:text-white">
                                                            ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default OrdersPage;
