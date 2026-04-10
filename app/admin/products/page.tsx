"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import { Product } from "@/types/product";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Link from "next/link";

const AdminProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "ADMIN") {
            router.push("/");
            return;
        }

        const fetchProducts = async () => {
            try {
                const response = await api.get("/products");
                setProducts(response.data);
            } catch (err: any) {
                setError("Failed to fetch products.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [router]);

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter((p) => p.id !== id));
            alert("Product deleted successfully.");
        } catch (err) {
            alert("Failed to delete product.");
        }
    };

    if (loading) return <div className="py-24 text-center">Loading...</div>;

    return (
        <>
            <Breadcrumb pageName="Manage Products" description="Add, edit, or remove products from your catalog." />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="mb-8 flex justify-end">
                        <Link
                            href="/admin/products/add"
                            className="rounded-sm bg-primary px-8 py-3 text-base font-semibold text-white hover:bg-primary/90 duration-300"
                        >
                            Add New Product
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-stroke dark:border-stroke-dark bg-gray-100 dark:bg-bg-color-dark">
                                    <th className="px-6 py-4 font-bold text-black dark:text-white">ID</th>
                                    <th className="px-6 py-4 font-bold text-black dark:text-white">Name</th>
                                    <th className="px-6 py-4 font-bold text-black dark:text-white">Category</th>
                                    <th className="px-6 py-4 font-bold text-black dark:text-white">Price</th>
                                    <th className="px-6 py-4 font-bold text-black dark:text-white">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id} className="border-b border-stroke dark:border-stroke-dark hover:bg-gray-50 dark:hover:bg-dark-2 duration-200">
                                        <td className="px-6 py-4 text-black dark:text-white">{product.id}</td>
                                        <td className="px-6 py-4 text-black dark:text-white">{product.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-full bg-primary bg-opacity-10 px-3 py-1 text-xs font-semibold text-primary">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-black dark:text-white">${product.price}</td>
                                        <td className="px-6 py-4 flex space-x-3">
                                            <Link
                                                href={`/admin/products/edit/${product.id}`}
                                                className="text-primary hover:underline font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-500 hover:underline font-medium"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminProductsPage;
