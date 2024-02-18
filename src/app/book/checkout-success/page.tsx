
// 購入成功ページ
// stripe決済で成功したときの遷移先のページ
"use client"


import { useEffect, useState } from "react";
import Link from "next/link"
import { useSearchParams } from "next/navigation";


const PurchaseSuccess = () => {
  // 購入した本のurlの状態 → 本のsingleページにlinkさせるため
  const [ bookUrl, setBookUrl ] = useState(null);

  const searchParams = useSearchParams();
  // console.log(searchParams) // {entries: ƒ, forEach: ƒ, get: ƒ, getAll: ƒ, has: ƒ, …}

  // urlの末尾のsession_idの文字列を取得
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId) // cs_test_a1tQGmHkLnI0uk8zHbMfKMIAUipzFn05Ccs9L0ouVvcVXob2duGj0Mnt02

  // clientコンポーネントにするとコンポーネントレベルでasync/awaitが使えない
  // → clientコンポネント + async/awaitは、useEffectを使う
  useEffect(() => {
    // 
    const fetchData = async () => {
      if(sessionId) {
        try {
          // api/checkout/success のapiを発火させる
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/checkout/success`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId })
            }
          );

          // console.log(res) // Response {type: 'basic', url: 'http://localhost:3000/api/checkout/success', redirected: false, status: 200, ok: true, …}
          
          const data = await res.json();
          // console.log(data) // {purchase: {id: 'cls3anbab0003103z5rs1f20v', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drwmer7ize0d', createdAt: '2024-02-01T14:10:33.827Z'}}
          
          setBookUrl(data.purchase.bookId);
          // console.log(bookUrl)
        } catch(error) {
          console.log(error)
        }
        
      }
    }

    fetchData();
  }, [])


  return(
    <div className="flex items-center justify-center mt-20">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          購入ありがとうございます！
        </h1>
        <p className="text-center text-gray-600">
          ご購入いただいた内容の詳細は、登録されたメールアドレスに送信されます。
        </p>
        <p className="mt-6 text-center">
          <Link
            href={`/book/${bookUrl}`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300"
          >
            購入した記事を読む
          </Link>
        </p>

      </div>
    </div>
  )
}

export default PurchaseSuccess;