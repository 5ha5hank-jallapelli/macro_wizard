import { Geist, Geist_Mono, Permanent_Marker } from "next/font/google";
import "./globals.css";
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

const pm = Permanent_Marker({
  variable: "--permanent-marker",
  subsets: ["latin"],
  weight: "400"
})

export const metadata = {
  title: "Macro Wizard | TanAahara",
  description: "Smart macro calculations at your fingertips.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${pm.variable}`}>
        <VitalsProvider>
          <MacrosProvider>
            {children}
          </MacrosProvider>
        </VitalsProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
