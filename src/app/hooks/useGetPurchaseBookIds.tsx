

// 購入した本のidの配列を返すフックス
"use client"

import { useState, useEffect } from "react";

import { PurchaseBookType, User } from "../types/type";


export const useGetPurchaseBookIds = (user: User) => {
  // 購入した本のidの配列を格納
  const [ bookIds, setBookIds ] = useState<string[]>([])

  useEffect(() => {
    const getIds = async () => {
      if(user){
        // 購入履歴を確認するAPI
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchases/${user?.id}`)
        // console.log(response)
        const purchasesData: PurchaseBookType[] = await response.json();
        // console.log(purchasesData);
        // [{ id: 'cls3aw7vd0007103zpiqxotbd', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drwmer7ize0d', createdAt: '2024-02-01T14:17:29.305Z'}, {...}, {...} ]
      
        // idの配列を取得する
        const purchaseBookIds: string[] = purchasesData.map((purchaseBook: PurchaseBookType) => purchaseBook.bookId);
        // console.log(purchaseBookIds) // [ 'cls3aw7vd0007103zpiqxotbd', 'cls3az2ml0009103z1p1ltr1s', 'cls4qfhk20001dp3hie1ilts1']
      
        setBookIds(purchaseBookIds)
      }
    }

    getIds();
    
  }, [user]); // userが変更されたら再度APIを呼び出す

  return bookIds;
}