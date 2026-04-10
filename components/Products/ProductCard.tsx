import { Product } from "@/types/product";
import Image from "next/image";

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (id: number) => void }) => {
    const { name, description, price, imageUrl, category } = product;

    return (
        <div className="w-full rounded-sm bg-white p-6 shadow-two hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark duration-300">
            <div className="relative mb-6 h-[200px] w-full overflow-hidden rounded-sm">
                <Image
                    src={imageUrl || "/images/blog/blog-01.jpg"} // Placeholder
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>
            <div>
                <span className="mb-2 inline-block rounded-full bg-primary bg-opacity-10 px-4 py-1 text-xs font-semibold text-primary">
                    {category}
                </span>
                <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
                    {name}
                </h3>
                <p className="mb-4 text-base font-medium text-body-color line-clamp-2">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-black dark:text-white">
                        ${price}
                    </span>
                    <button
                        onClick={() => onAddToCart(product.id)}
                        className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
