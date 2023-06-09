import ProductCard from "@/components/ProductCard";
import Header from "../components/Header";
import { useRef } from "react";
import Head from "next/head";

export default function Home({ data }) {
  let productsRef = useRef();
  const scrollHandler = (e) => {
    e.preventDefault();
    productsRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Home Decor Products - The Home Decor</title>
        <meta
          name="description"
          content="Explore a wide range of stylish home decor products at The Home Decor. Shop furniture, lighting, and decor for your home. Affordable prices, fast shipping, and excellent customer service."
        />
        <meta
          name="keywords"
          content="home decor, furniture, lighting, decorative accessories"
        />
      </Head>
      <Header scrollHandler={scrollHandler} />
      <div className="min-h-screen mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl"
              ref={productsRef}
            >
              Crafted by us, for you
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {data &&
            data.map((product) => (
              <ProductCard product={product} key={product.product_id} />
            ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:8080/api/products`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
