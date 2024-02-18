
// プロフィールページ
import React from 'react'
import Image from 'next/image'
import { getServerSession } from "next-auth";

import { nextAuthOptions } from '../lib/next-auth/options';
import { BookType, Purchase, User } from '../types/type';
import { getDetailBook } from '../lib/microcms/client';
import PurchasesDetailBook from '../components/PurchasesDetailBook';


const ProfilePage = async () => {
  // セッション情報を取得
  const session = await getServerSession(nextAuthOptions)
  // console.log(session) // { user: { name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4', id: 'clrtcl8km000097cmjegw08xy'} }

  const user: User = session?.user as User;

  // ここはどうにかstateで管理したい...
  let purchasesDetailBooks: BookType[] = [];

  if(user){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`,
      { cache: "no-store" }, // SSR
    )
    // console.log(response) // _Response [Response] { [Symbol(realm)]: null, ... }

    const purchasesData = await response.json(); // プロミスを解決
    // console.log(purchasesData) // (3) [ { id: 'cls3aw7vd0007103zpiqxotbd', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drwmer7ize0d', createdAt: '2024-02-01T14:17:29.305Z' }, ... ]
  
    // 取得してきた購入履歴の本のデータから、idを使って本の詳細を取得
    // Promiseオブジェクト３つの配列が返ってくるのでallで受ける
    // Promise.all ... 配列を渡す
    //                 Promiseが解決するまで全て待機。
    //                 Promiseの待機とは、内部でresolve()されるまでのこと。
    
    purchasesDetailBooks = await Promise.all(
      purchasesData.map(async (purchases: Purchase) => {
        // microCMSから本のデータを取得
        return await getDetailBook(purchases.bookId);
      })
    )
    // console.log(purchasesDetailBooks) // [{}, {}, {}, ...]
  }
  
  // console.log(purchasesDetailBooks)

  return (
    <div className='container mx-auto p-4'>
      <div>{ ["hello", "bye", ] }</div>
      <div className="text-xl font-bold mb-4">プロフィール</div>
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex items-center">
          <Image
            priority
            src={`${user.image ? user.image : "default_icon.png"}`}
            alt="user profile icon"
            width={60}
            height={60}
            className='rounded-full'
          />
          <h2 className="text-lg ml-4 font-semi-bold">お名前 : { user.name }</h2>
        </div>
      </div>

      <span className="font-medium text-lg mb-4 mt-4 block">購入した記事</span>
      <div className="flex items-center gap-6">
        {
          purchasesDetailBooks.map(purchasesDetailBook => (
            <PurchasesDetailBook
              key={ purchasesDetailBook.id } 
              purchasesDetailBook={ purchasesDetailBook }
            />
          ))
        }
      </div>
    </div>
  )
}

export default ProfilePage