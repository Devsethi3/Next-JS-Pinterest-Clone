import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Provider from "./Provider";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinterest - Your Visual Inspiration",
  description: "Pinterest is a visual discovery tool that lets you find and save ideas for all your projects and interests.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider>
          <div className="container">
            <Header />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
