import { CartProvider } from "../lib/CartContext";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet" />
        <title>Casio Mexico — Distribuidor Autorizado</title>
        <meta name="description" content="Tienda oficial Casio Mexico. G-Shock, Edifice, Vintage y más. Envío a todo México. Pago con Mercado Pago." />
      </Head>
      <Component {...pageProps} />
    </CartProvider>
  );
}
