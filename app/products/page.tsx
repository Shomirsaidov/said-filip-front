"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/utils/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/Products/ProductCard";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { useAppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useAppDispatch();

    // Filter states
    const [filters, setFilters] = useState({
        name: "",
        category: "",
        minPrice: "",
        maxPrice: "",
    });

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filters.name) params.append("name", filters.name);
            if (filters.category) params.append("category", filters.category);
            if (filters.minPrice) params.append("minPrice", filters.minPrice);
            if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

            const response = await api.get(`/products?${params.toString()}`);
            setProducts(response.data);
            setError("");
        } catch (err: any) {
            setError("Failed to fetch products. Please try again later.");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 500); // 500ms debounce
        return () => clearTimeout(timeoutId);
    }, [fetchProducts]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddToCart = async (productId: number) => {
        dispatch(addToCart(productId));
    };

    return (
        <>
            <Breadcrumb
                pageName="Our Products"
                description="Browse our collection of high-quality products."
            />

            <section className="pb-[120px] pt-[120px]">
                <div className="container">
                    {/* Filter Bar */}
                    <div className="mb-12 rounded-sm bg-white p-8 shadow-two dark:bg-dark border border-stroke dark:border-stroke-dark">
                        <div className="flex flex-wrap items-end gap-6">
                            <div className="w-full md:w-[250px]">
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Search by Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={filters.name}
                                    onChange={handleFilterChange}
                                    placeholder="Search products..."
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="w-full md:w-[200px]">
                                <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                                    placeholder="e.g. Health"
                                    className="w-full rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                />
                            </div>
                            <div className="w-full flex gap-4 md:w-auto">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Min Price</label>
                                    <input
                                        type="number"
                                        name="minPrice"
                                        value={filters.minPrice}
                                        onChange={handleFilterChange}
                                        placeholder="Min"
                                        className="w-32 rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                    />
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-dark dark:text-white">Max Price</label>
                                    <input
                                        type="number"
                                        name="maxPrice"
                                        value={filters.maxPrice}
                                        onChange={handleFilterChange}
                                        placeholder="Max"
                                        className="w-32 rounded-sm border border-stroke bg-[#f8f8f8] px-4 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2c303b] dark:text-body-color-dark"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setFilters({ name: "", category: "", minPrice: "", maxPrice: "" })}
                                className="text-primary hover:underline pb-3 font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center text-xl font-medium py-20">Loading products...</div>
                    ) : error ? (
                        <div className="text-center text-xl font-medium text-red-500 py-20">{error}</div>
                    ) : products.length === 0 ? (
                        <div className="text-center text-xl font-medium py-20">No products match your filters.</div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <div key={product.id} className="w-full">
                                    <ProductCard product={product} onAddToCart={handleAddToCart} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductsPage;
