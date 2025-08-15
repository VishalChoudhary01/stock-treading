import { Poppins, Roboto, Roboto_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Footer from "./components/moleclues/footer";
import Navbar from "./components/moleclues/navbar";
import ClientProvider from "./components/provider/clientProvider";
import ThemeInitializer from "./features/ThemeInitializer";
import Head from 'next/head'; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-roboto",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-roboto-mono",
});
const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-kanit",
});

export const metadata = {
  title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
  description: "Track Indian stocks with real-time NSE/BSE prices, interactive charts, technical indicators, and market insights. Monitor NIFTY, SENSEX, and top gainers/losers.",
  keywords: [
    "stock market india",
    "nse live prices",
    "bse share market",
    "nifty 50",
    "sensex today",
    "stock tracker",
    "technical analysis",
    "stock screener",
    "top gainers",
    "top losers",
    "portfolio tracker",
    "equity research",
    "market trends",
    "stock signals",
    "Tred Brains"
  ],
  authors: [{ name: "Trade Brains", url: "https://tradebrains.in" }],
  creator: "Vishal Kumar Choudhary",
  publisher: "Trade Brains",
  applicationName: "Tred Brains",
  robots: "index, follow",
  alternates: {
    canonical: "https://portal.tradebrains.in"
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code"
  },
  openGraph: {
    title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
    description: "Track Indian stocks with real-time NSE/BSE prices, interactive charts, technical indicators, and market insights.",
    url: "https://portal.tradebrains.in",
    siteName: "Tred Brains",
    images: [
      {
        url: "https://portal.tradebrains.in/banner/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Tred Brains Stock Market Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Market Tracker | Real-time NSE/BSE Data | Tred Brains",
    description: "Track Indian stocks with real-time prices, charts, and market insights on Tred Brains",
    images: ["https://portal.tradebrains.in/banner/banner.jpg"],
    site: "@TradeBrains",
    creator: "@TradeBrains"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
  
        {/* Favicon links */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
      </Head>
      
      <body
        className={`${poppins.variable} ${kanit.variable} ${roboto.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen bg-linear-180 dark:bg-linear-150 from-contentGradFromBG to-contentGradToBG  dark:from-contentGradFromDarkBG dark:to-contentGradToDarkBG  text-textColor dark:text-textDarkColor duration-700 transition-all scrollbar `}
      >
        <ClientProvider>
          <ThemeInitializer/>
          <Navbar />
          <main className="grow ">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}