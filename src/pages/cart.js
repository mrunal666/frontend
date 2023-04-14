import Navbar from "@/components/Navbar";
import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import LoginUser from "./login";
import { useRouter } from "next/router";

export default function Cart() {
  const errRef = useRef();
  const { items, getTotalPrice } = useContext(CartContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const d = new Date();
  let monthName = months[d.getMonth()];

  const date = `${monthName} ${d.getDate()}, ${d.getFullYear()}`;

  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  if (!token) {
    return <LoginUser />;
  }

  const handleShipping = async (e) => {
    e.preventDefault();

    // if button enabled with JS hack
    if (!email || !mobile || !address) {
      setErrMsg("Please Enter all the Fields");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_status: "COMPLETE",
          payment_status: "NOT PAID",
          products: JSON.stringify(items),
          user_id: user.user_id,
          address: address,
          order_email: email,
          order_number: mobile,
          order_price: getTotalPrice(),
          order_date: date,
        }),
      };
      // API call
      await fetch("http://localhost:8080/api/addOrder", requestOptions);
      setSuccess(true);
      localStorage.setItem("total", getTotalPrice());
      localStorage.setItem(
        "order",
        JSON.stringify({
          name: firstname,
          user_id: user.user_id,
          address: address,
          order_email: email,
          order_number: mobile,
        })
      );
      router.push("/PaymentForm");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else {
        setErrMsg("Registration Failed");
      }
    }
  };

  function Product({ item }) {
    return (
      <li className="flex flex-row justify-between  p-3">
        <Link href={`/product/${item.id}`}>
          {" "}
          <Image
            alt="cartItem"
            className=" rounded-lg"
            src={item.image}
            width={70}
            height={70}
          />
        </Link>

        <div className="w-1/2 text-bold">{item.name}</div>
        <div>{item.qty}</div>
        <div>{item.totalPrice}</div>
      </li>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <div className="bg-[#F5F5F5] p-10 ">
          <ul className="lg:w-1/2">
            {items.map((item) => (
              <Product item={item} key={item.id} />
            ))}
            <div className="border-t-4 text-bold flex justify-end">
              {getTotalPrice()}
            </div>
          </ul>
        </div>
        <div className="border p-4 lg:pl-20 lg:pr-20 lg:p-10 self-center">
          {!success ? (
            <p className="text-red-400 text-sm p-2" ref={errRef}>
              {errMsg}
            </p>
          ) : (
            <></>
          )}
          <form onSubmit={handleShipping}>
            <div className="mb-1 text-bold lg:text-md tracking-wide text-gray-600">
              CONTACT INFORMATION
            </div>
            <div class="flex flex-row mt-2">
              <div class=" flex-col mr-3">
                <label
                  for="email"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mr-5 text-sm sm:text-base placeholder-gray-500  p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Email"
                />
              </div>
              <div class=" flex-col">
                <label
                  for="moNumber"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Mobile No.:
                </label>
                <input
                  type="text"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  name="moNumber"
                  class="text-sm sm:text-base placeholder-gray-500  p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Mobile No."
                />
              </div>
            </div>
            <div className="mb-1 mt-8 text-bold lg:text-md tracking-wide text-gray-600 ">
              BILLING ADDRESS
            </div>
            <div class="flex flex-row mt-2">
              <div class=" flex-col mr-3">
                <label
                  for="firstName"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="firstName"
                  className="mr-5 text-sm sm:text-base placeholder-gray-500  p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="First Name"
                />
              </div>
              <div class=" flex-col">
                <label
                  for="lastName"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Last Name:
                </label>
                <input
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  type="text"
                  name="lastName"
                  class="text-sm sm:text-base placeholder-gray-500  p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div class="flex flex-row">
              <div class="mt-5 flex-col">
                <label
                  for="address"
                  class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Shipping Address:
                </label>
                <textarea
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  name="address"
                  className=" text-sm sm:text-base placeholder-gray-500  p-4 rounded-md border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                  placeholder="Address..."
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={
                !email || !mobile || !address || !firstname || !lastname
                  ? true
                  : false
              }
              className="lg:mt-8  mt-5 inline-flex items-center text-sm p-8 lg:h-12 py-2 leading-none border rounded   text-[#362F2F] hover:bg-orange-50 text-bold mr-5 "
            >
              Continue Shipping
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
