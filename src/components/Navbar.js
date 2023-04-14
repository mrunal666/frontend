import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";
import { GiExitDoor, GiHamburgerMenu } from "react-icons/gi";
import { CartContext } from "@/contexts/CartContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { getQuantity } = useContext(CartContext);
  const [navbarOpen, setNavbarOpen] = useState(true);
  const [token, setToken] = useState();
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.reload(true);
  }
  return (
    <nav className="flex items-center justify-between flex-wrap p-1 pl-8 pr-8 shadow-sm">
      <Link href={"/"}>
        <Image
          priority
          width={50}
          height={50}
          className="w-full h-full"
          src={
            "https://ik.imagekit.io/h5gbgovde/images/logo.png?updatedAt=1681079007705"
          }
          alt="logo"
        />
      </Link>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-black-200 border-black-400 "
          onClick={() => setNavbarOpen((prev) => !prev)}
        >
          <GiHamburgerMenu />
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-6 ${
          navbarOpen ? "hidden" : ""
        }`}
      >
        {token && (
          <div className="text-sm lg:flex-grow">
            <Link
              href={"/orders"}
              className="block mt-4 lg:inline-block lg:mt-0 text-[#362F2F] text-bold hover:border-b-4 mr-4"
            >
              Orders
            </Link>
            <Link
              href={"/cart"}
              className="relative inline-block inline-flex items-center text-sm px-4 py-2 leading-none border rounded   text-[#362F2F] hover:bg-orange-50 text-bold mt-4 lg:mt-0 mr-5 justify-items-center"
            >
              <FiShoppingCart className="h-5 w-5 mr-2" /> Cart
              <span class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {getQuantity()}
              </span>
            </Link>
          </div>
        )}

        <div className="flex">
          {/* <div className=" "> */}
          {token && (
            <>
              <Link
                href={"/"}
                className="inline-flex items-center text-sm px-4 py-2  text-[#362F2F] hover:border-b-4 text-bold mt-4 lg:mt-0 mr-5 justify-items-center"
              >
                <AiOutlineUser className="h-5 w-5 mr-2" /> {user.first_name}
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center text-sm px-4 py-2  text-[#362F2F] hover:border-b-4 text-bold mt-4 lg:mt-0 mr-5 justify-items-center"
              >
                <GiExitDoor className="h-5 w-5 mr-2" /> Logout
              </button>
            </>
          )}
          {!token && (
            <Link
              href={"/login"}
              className="inline-block text-sm px-4 py-2 leading-none border rounded   text-[#362F2F] hover:bg-orange-50 text-bold mt-4 lg:mt-0"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
