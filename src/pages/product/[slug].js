import Navbar from "@/components/Navbar";
import { CartContext } from "@/contexts/CartContext";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function ProductDatails({ product }) {
  const { addItemToCart } = useContext(CartContext);
  const [token, setToken] = useState();
  const [user, setUser] = useState();

  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  function addToCart(id) {
    if (!token) {
      router.push("/login");
    }
    addItemToCart(id);
  }

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta
          name="keywords"
          content="home decor, furniture, lighting, decorative accessories"
        />
      </Head>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-between">
        <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mx-auto flex flex-col sm:flex-row">
            <Image
              alt="product image"
              src={product.product_img}
              width={560}
              height={640}
              className={"w-96 object-cover rounded-lg"}
            />
            <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
              <h1 className="mt-1 text-4xl font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-5xl">
                {product.name}
              </h1>
              <h1 className="mt-3 text-4xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-3xl">
                ₹{product.price}
              </h1>
              <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
                Description
              </div>
              <p className="max-w-xl">{product.description}</p>

              <button
                className="flex items-center justify-center rounded-md border bg-white mt-5 px-4 py-3 text-base font-semibold text-[#362F2F] shadow-sm hover:bg-orange-100 sm:px-8"
                onClick={() => addToCart(product.product_id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.slug;
  const res = await fetch(`http://localhost:8080/api/product/${id}`);
  const product = await res.json();
  return {
    props: {
      product: product.pop(),
    },
  };
}
