import { Poppins, Roboto, Roboto_Mono, Kanit } from "next/font/google";
import "./globals.css";
import Footer from "./components/moleclues/footer";
import Navbar from "./components/moleclues/navbar";
import ClientProvider from "./components/provider/clientProvider";
import ThemeInitializer from "./features/ThemeInitializer";

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
  title: "Tred Brains - Stock Tracker",
  description: "Track real-time stock market data with Tred Brains. Get insights, charts, and updates on your favorite stocks.",
  openGraph: {
    title: "Tred Brains - Stock Tracker",
    description: "Track real-time stock market data with Tred Brains...",
    url: "https://portal.tradebrains.in",
    siteName: "Tred Brains",
    images: [
      {
        url: "https://portal.tradebrains.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tred Brains - Real-time Stock Tracking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tred Brains - Stock Tracker",
    description: "Track real-time stock market data with Tred Brains...",
    images: ["https://portal.tradebrains.inog-image.jpg"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${kanit.variable} ${roboto.variable} ${robotoMono.variable} antialiased flex flex-col min-h-screen bg-contentBg dark:bg-contentDarkBg  text-textColor dark:text-textDarkColor duration-700 transition-all scrollbar `}
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
