
// ルートのpage.tsx

import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SessionProvider } from "next-auth/react"

import './globals.css'
import { Header } from './components/Header'
import { NextAuthProvider } from './lib/next-auth/provider'
// import Spinner from './components/Spinner'
import Loading from './loading'
import { notoJP, poppins } from './fonts/fonts'


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
      {/* 
        ここでは基本はnotoJPを使い、英語の部分は各ファイルでpoppinsで上書きする形でフォントを当てる
        className ... 全体に当たる
        variable  ... tailwind.config.tsで設定したエイリアスでタグに直接あてる
                      例 <h1 className="font-poppins">Book Commerce</h1>
      */}
      <body className={`${notoJP.className} ${poppins.variable}`}>
        <NextAuthProvider>
          <Header />
          {/* 
            Suspense 
            同階層のloading.tsxが発火
            fallback ... データの取得やロード中に非同期的な処理の最中に一時的なuiを噛ませるなどの意味を持つ
            fallbackにはloading.tsxが発火する
          */}
          <Suspense fallback={ <Loading /> }>
            {children}
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  )
}
