
// 本の詳細ページ
import HtmlReactParser from "html-react-parser"

import { getDetailBook } from "@/app/lib/microcms/client";
import Image from "next/image";
import Link from "next/link";


// { params: { bookId: 'agbc2xsqay4' }, searchParams: {} } が渡ってくる
const DetailBook = async ({ params }: { params: { bookId: string } }) => {
  // console.log(params) // { bookId: 'agbc2xsqay4' }

  const book = await getDetailBook(params.bookId) // microCMSではSSRで取得されている
  // console.log(book)

  // console.log(HtmlReactParser(book.content))

  return(
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Image
          src={`${book.thumbnail.url}`}
          className="w-full h-80 object-cover object-center"
          width={700}
          height={700}
          alt="book image"
        />
      </div>
      <div className="p-4">
        <h2 className="text-2xl font-bold">{ book.title }</h2>

        {/* html-react-parser HTML文字列を解析し、React要素に変換 */}
        <div className="text-gray-700 mt-2">{ HtmlReactParser(book.content) }</div>

        <div className="flex justify-between items-center mt-2">
          {/* Dateクラス iso8601形式の日付などを引数に格納して、操作する */}
          {/* toLocalString ブラウザや実行環境のロケールに基づいて日付と時刻の書式を自動的に操作する */}
          {/* ロケール ユーザーが使用する言語や地域に関連した設定や慣習 */}
          <span className="text-sm text-gray-500">公開日 : { new Date(book.publishedAt as any).toLocaleDateString() }</span>
          <span className="text-sm text-gray-500">最終更新 : { new Date(book.updatedAt as any).toLocaleDateString() }</span>
        </div>
      </div>

    </div>
  )
}

export default DetailBook;