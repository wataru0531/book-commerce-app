
import type { Metadata } from 'next'
import { Noto_Sans_JP, Poppins } from 'next/font/google'
import { SessionProvider } from "next-auth/react"

import './globals.css'
import { Header } from './components/Header'
import { NextAuthProvider } from './lib/next-auth/provider'


// フォントは別フォルダを作ってもいい。utils/font
export const notoJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'], // 文字セット。latinがページを高速化にはいいらしい。他にASCII、ISO-8859-1(Latin-1)など
  display: "swap",    
  // フォントの表示方法。
  // swap...フォントがダウンロードされて表示される前に、代替テキストで置き換える。UXの向上が見込める。
  // 他に auto、block、fallback、
  variable: "--font-notojp", // tailwindで使用。使う時は、font-notojp
})

export const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: "swap", 
  variable: "--font-poppins", 
})

export const metadata: Metadata = {
  title: 'Book Commerce',
  description: 'Digital Article Selling Application',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/* 基本はnotoJPを使い、英語の部分は各ファイルでpoppinsで上書き。 */}
      <body className={`${notoJP.className} ${notoJP.variable} ${poppins.variable} `}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
