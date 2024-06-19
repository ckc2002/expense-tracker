import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const outfit = Outfit({ subsets: ["latin"] });
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Toaster />
        <body className={outfit.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
