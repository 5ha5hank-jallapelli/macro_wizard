import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer, toast } from 'react-toastify';
import { MacrosProvider } from "./context/MacrosContext";
import { VitalsProvider } from "./context/VitalsContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Macro Wizard | TanAahara",
  description: "Smart macro calculations at your fingertips.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <VitalsProvider>
            <MacrosProvider>
              {children}
            </MacrosProvider>
          </VitalsProvider>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  )
}
