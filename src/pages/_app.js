import "@/styles/globals.css";
import Footer from "../components/Footer";
import { Montserrat } from "next/font/google";
import { CartContextProvider } from "@/contexts/CartContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const stripePromise = loadStripe(
  "pk_test_51MwTwUSJjI3p9lEKRUM4Bpg5wgDZk2u09WeOiut5l2DxbQkInZkdzZL3GW95qvnLuLmQ09TvxwnXhNS7PefX99dX003nfDyVlU"
);

export default function App({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <Elements stripe={stripePromise}>
        <main class={montserrat.className}>
          <Component {...pageProps} />
          <Footer />
        </main>
      </Elements>
    </CartContextProvider>
  );
}
