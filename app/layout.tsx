import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { MenuProvider } from "@/contexts/MenuContext";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex  w-full  h-screen text-text-primary`}
      >
        <MenuProvider>
          <div className="flex w-full flex-col h-full">
            <Header />
            <div className="flex items-center w-full h-full">
              <Sidebar />
              <div className="w-full h-full  flex flex-col ">
                {children}
                <Footer />
              </div>
            </div>
          </div>
          <Toaster />
        </MenuProvider>
      </body>
    </html>
  );
}
