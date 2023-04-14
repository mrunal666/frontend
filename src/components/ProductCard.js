import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.product_id}`} className="group">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt="product image"
          src={product.product_img}
          width={500}
          height={500}
          className={
            "object-cover duration-700 ease-in-out group-hover:mix-blend-multiply "
          }
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
      </div>
      <h4 className="mt-1 text-sm italic text-gray-500">
        {product.description}
      </h4>
    </Link>
  );
}
