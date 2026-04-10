"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import Breadcrumb from "@/components/Common/Breadcrumb";

const AddProductPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "ADMIN") router.push("/");
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/products", {
                ...formData,
                price: parseFloat(formData.price),
            });
            alert("Product added successfully!");
            router.push("/admin/products");
        } catch (err) {
            alert("Failed to add product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb pageName="Add New Product" description="Fill in the details to add a new product to the catalog." />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    <div className="mx-auto max-w-[600px] rounded-sm bg-white p-8 shadow-two dark:bg-dark">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="mb-3 block text-sm text-dark dark:text-white">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="mb-6 text-dark dark:text-white">
                                <label className="mb-3 block text-sm">Price ($)</label>
                                <input
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-3 block text-sm text-dark dark:text-white">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="mb-3 block text-sm text-dark dark:text-white">Image URL</label>
                                <input
                                    type="url"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="mb-8">
                                <label className="mb-3 block text-sm text-dark dark:text-white">Description</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-sm bg-primary px-8 py-4 text-base font-bold text-white hover:bg-primary/90 duration-300 disabled:opacity-70"
                            >
                                {loading ? "Adding..." : "Add Product"}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddProductPage;
