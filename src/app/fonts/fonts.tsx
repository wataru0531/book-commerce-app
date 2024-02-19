


/////////////////
// フォント
// 参考　https://nextjs.org/docs/app/building-your-application/optimizing/fonts
///////////////////

import { Noto_Sans_JP, Poppins } from 'next/font/google'


// Noto Sans
export const notoJP = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'], // 文字セット。latinがページを高速化にはいいらしい。他にASCII、ISO-8859-1(Latin-1)など
  display: "swap",    
  // フォントの表示方法。
  // swap...フォントがダウンロードされて表示される前に、代替テキストで置き換える。UXの向上が見込める。
  // 他に auto、block、fallback、
  variable: "--font-notojp", // tailwindで使用。使う時は、font-notojp
})

// Poppins
export const poppins = Poppins({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: "swap", 
  variable: "--font-poppins", 
})