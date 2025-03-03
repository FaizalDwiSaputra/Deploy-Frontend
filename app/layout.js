import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { Poppins, Playfair_Display, Slackey } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const slackey = Slackey({
  weight: '400', // Pilih bobot font (400 untuk Slackey)
  subsets: ['latin'], // Pilih subset, default 'latin'
  variable:'--font-slackey',
});

// Konfigurasi Poppins
const poppins = Poppins({
  subsets: ['latin'], // Pilih subset
  weight: ['400', '600', '700'], // Pilih berat font yang ingin digunakan
  variable: '--font-poppins', // Variabel CSS untuk font ini
});

// Konfigurasi Playfair Display
const playfairDisplay = Playfair_Display({
  subsets: ['latin'], // Pilih subset
  weight: ['400', '700'], // Pilih berat font yang ingin digunakan
  variable: '--font-playfair', // Variabel CSS untuk font ini
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "Just Name",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className= {`${geistSans.variable} ${slackey.variable} container ${geistMono.variable} ${poppins.variable} ${playfairDisplay.variable}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
