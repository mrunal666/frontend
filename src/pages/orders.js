import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoginUser from "./login";

export default function Orders() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("user"));
    let user_id = userData.user_id;
    let token = localStorage.getItem("token");
    fetch(`http://localhost:8080/api/orders/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setOrders(res))
      .catch((err) => console.log(err));
  }, []);

  if (!token) {
    return <LoginUser />;
  }

  return (
    <>
      <Navbar />
      {orders?.map((order, index) => {
        return (
          <div className="flex flex-col p-10" key={order.product_id}>
            <div className="flex justify-between">
              <div className="text-bold text-2xl">Order #{order.id}</div>
              <div className="text-semibold text-md text-[#565F6C]">
                Order Placed{" "}
                <span className="text-black">{order.order_date}</span>
              </div>
            </div>
            <div className="bg-white shadow-md border p-5 pl-10 pr-10">
              {JSON.parse(order.products).map((item, index) => {
                return (
                  <div
                    className="flex flex-col lg:flex-row pb-5"
                    key={index + 1}
                  >
                    <Image
                      src={item.image}
                      className="rounded-lg"
                      width={150}
                      height={100}
                      alt="order image"
                    />
                    <div className="lg:mt-0 mt-5 flex flex-col sm:ml-10 lg:w-2/5">
                      <h3 className="mt-1  font-bold uppercase text-gray-900 sm:text-xl sm:tracking-tight lg:text-xl ">
                        {item.name}
                      </h3>
                      <h3 className="mt-1 text-md font-bold sm:text-md sm:tracking-tight lg:text-md ">
                        ${item.totalPrice}
                      </h3>
                      <p className=" mt-1 text-gray-500 ">{item.description}</p>
                    </div>
                    <div className="lg:mt-0 mt-5 flex flex-col  sm:ml-10">
                      <h3 className="mt-1  font-bold uppercase text-gray-900 sm:text-md sm:tracking-tight lg:text-md">
                        Delivery Address
                      </h3>
                      <p className="max-w-xl mt-1 text-sm text-gray-500">
                        {order.address}
                      </p>
                    </div>
                    <div className="lg:mt-0 mt-5 flex flex-col sm:ml-10">
                      <h3 className="mt-1  font-bold uppercase text-gray-900 sm:text-md sm:tracking-tight lg:text-md">
                        Shipping Details
                      </h3>
                      <p className="max-w-xl text-sm mt-1 text-gray-500">
                        {order.order_email}
                      </p>
                      <p className="max-w-xl mt-1 text-sm text-gray-500">
                        {order.order_number}
                      </p>
                      <div className="mt-5 text-center text-md px-4 py-2 leading-none border rounded   text-[#362F2F] bg-orange-50 text-bold mr-5">
                        {order.order_status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
