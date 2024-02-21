'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react';
import Image from 'next/image'
// import Link from 'next/link'

import { BookType } from '../types/type';

type BookPropsType = {
  book: BookType
  isPurchased: boolean
}

// book ... { id: ..., title: ..., thumbnail: ... } のオブジェクト
// 型を引数に合わせる
// BookType = { id: number, createdAt: string }
// BookPropsType = { { id: number, createdAt: string } }
export const Book: React.FC<BookPropsType> = ({ book, isPurchased }) =>{
  // console.log(book) // { id: 'drwmer7ize0d', createdAt: '2024-01-26T15:03:06.118Z', updatedAt: '2024-01-26T15:03:45.898Z', publishedAt: '2024-01-26T15:03:06.118Z', revisedAt: '2024-01-26T15:03:45.898Z', … }
  // console.log(isPurchased)

  const router = useRouter();
  const [ showModal, setShowModal ] = useState(false);

  // セッション情報を取り出す
  const { data: session } = useSession()
  // console.log(session)
  const user: any = session?.user;
  // console.log(user) // {name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4', id: 'clrtcl8km000097cmjegw08xy'}

  // カードクリック
  const handlePurchaseClick = () => {
    if(isPurchased){
      alert("その商品は購入済みです")
    } else {
      setShowModal(true)
    }
  }
  
  const handleCancel = () => setShowModal(false); // キャンセル

  // Stripeで決済処理する
  const startCheckout = async () => {
    try{
      // api/checkout/route.tsxのPOSTが発火
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        // json文字列に変換。fetchがオブジェクトを送信できないから。
        // サーバー側のapiが欲しい形に変換する。他にFormDataオブジェクトを使う時もある
        body: JSON.stringify({ 
          title: book.title,
          price: book.price,
          userId: user?.id,
          bookId: book.id,
        })
      });

      // console.log(response) // Response {type: 'basic', url: 'http://localhost:3000/api/checkout', redirected: false, status: 200, ok: true, …}

      // apiのreturnから遷移先のurlを受け取る
      const responseData = await response.json()
      console.log(responseData) // {checkout_url: 'https://checkout.stripe.com/c/pay/cs_test_a14WlwKV…WBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl'}

      if(responseData) router.push(responseData.checkout_url)

    } catch(error) {
      console.log(`Stripe error: ${error}`);
    }
  }

  // ログインしている時だけクリック可能
  const handlePurchaseConfirm = () => { // 購入
    if(!user){ // ユーザーがログインしていないとき
      setShowModal(false);
      router.push("/login/");
    } else {
      // ユーザーがログインしている場合 Stripeで決済
      startCheckout();
    }
  }

  // console.log(showModal)
  return(
    <>
      {/* アニメーションスタイル */}
      {/* styled jsx という記法  */}
      {/* このスタイルはスタイルはデフォルトでこのコンポーネントのスコープ内に閉じ込められる */}
      {/* 他のコンポーネントのスタイルと競合しない */}
      
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="flex flex-col items-center m-4">
        <a 
          onClick={ () => handlePurchaseClick() }
          className="cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none"
        >
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className="rounded-t-md"
          />
          <div className="px-4 py-4 bg-slate-100 rounded-b-md">
            <h2 className="text-lg font-semibold">{ book.title }</h2>
            <p className="mt-2 text-lg text-slate-600">この本は...</p>
            <p className="mt-2 text-md test-slate-700">値段: { book.price } 円</p>
          </div>
        </a>

        {
          showModal && (
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-30 flex justify-center items-center modal">
              <div className="bg-white p-8 rounded-lg">
                <h3 className="text-xl mb-4">本を購入しまうすか？</h3>
                <button 
                  onClick={ () => handlePurchaseConfirm() }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                >
                  購入する
                </button>
                <button 
                  onClick={() => handleCancel()}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                  キャンセル
                </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}