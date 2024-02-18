// ルートpage

// "use client"

import { getServerSession } from 'next-auth';
import { Suspense, useEffect } from 'react';

import { getAllBooks } from './lib/microcms/client';
import { BookType, PurchaseBookType, User } from './types/type';
import { Book } from './components/Book';
import { nextAuthOptions } from './lib/next-auth/options';
import { useGetPurchaseBookIds } from './hooks/useGetPurchaseBookIds';


export default async function Home() {
  // サーバーサイドでnext-authを使いユーザー情報を取得
  const session = await getServerSession(nextAuthOptions)
  // console.log(session) // { user: { name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4', id: 'clrtcl8km000097cmjegw08xy'} }
  
  // as User ... キャスト。ユーザーが存在する時だけユーザの方を付けることができる
  const user: User = session?.user as User;
  // console.log(user)

  const { contents } = await getAllBooks();
  // console.log(contents); 
  // [
  //   {
  //     id: 'h9o6plktch3', 
  //     createdAt: '2024-01-26T15:01:50.147Z', 
  //     updatedAt: '2024-01-26T15:02:07.415Z',
  //     publishedAt: '2024-01-26T15:01:50.147Z',
  //     revisedAt: '2024-01-26T15:02:07.415Z',
  //     title: 'Node.js 完全ガイド',
  //     content: '<p>Node.js（ノード・ドット・ジェイ・エス）は、JavaScriptランタイム環境であり、JavaScriptをサーバーサイドで実行するためのプラットフォームです。Node.jsは、非同期のイベント駆動型の処理を可能にし、高速かつ効率的なウェブアプリケーションの開発を容易にします。</p><p style="text-align: start">以下は、Node.jsの特徴や用途の概要です：</p><ol><li><strong>JavaScriptをサーバーサイドで使用</strong>: Node.jsは、JavaScriptをサーバーサイドで実行することを可能にします。これにより、フロントエンドとバックエンドの開発を同じ言語で行うことができます。</li><li><strong>非同期のイベント駆動型</strong>: Node.jsは、非同期のイベント駆動型の処理を採用しています。これにより、リクエストが到着した際にブロックすることなく、次のリクエストを処理することができます。</li><li><strong>高速で軽量な実行環境</strong>: Node.jsは、GoogleのV8 JavaScriptエンジンに基づいており、高速な処理を提供します。また、シングルスレッドで動作するため、リソースを効率的に使用します。</li><li><strong>豊富なパッケージエコシステム</strong>: Node.jsは、npm（Node Package Manager）と呼ばれるパッケージ管理システムを利用しており、数多くのオープンソースのパッケージやモジュールが提供されています。これにより、開発者は必要な機能を簡単に追加したり、共有したりすることができます。</li><li><strong>ウェブアプリケーションの開発</strong>: Node.jsは、ウェブサーバーやAPIサーバー、リアルタイムアプリケーション、マイクロサービスなど、さまざまな種類のウェブアプリケーションの開発に使用されます。</li></ol><p style="text-align: start">Node.jsは、JavaScriptのエコシステムをサーバーサイドに拡張し、開発者が効率的にスケーラブルで高速なアプリケーションを構築できるようにします。</p>',
  //     price: 980,
  //     thumbnail: {
  //       url: 'https://images.microcms-assets.io/assets/aaf5bf7365914136b4dba1a3dc9cbaf3/6d77c363961245df81b4ccc89726e1a7/4909088_13c6_2.jpg',
  //       height: 135,
  //       width: 240
  //     }
  //   },
  //   {...}
  // ]

  // const purchaseBookIds = useGetPurchaseBookIds(user);
  // console.log(purchaseBookIds)

  // 購入した本のidの配列を格納
  let purchaseBookIds: any;
  
  // 購入履歴を確認するAPI
  if(user){
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user?.id}`,
      { cache: "no-store" } // SSR(デフォルト)。今回は購入履歴の調査になるので静的ビルドの時にデータとして受け取ることはない
    )
    // console.log(response)
    const purchasesData: PurchaseBookType[] = await response.json();
    // console.log(purchasesData);
    // [{ id: 'cls3aw7vd0007103zpiqxotbd', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drwmer7ize0d', createdAt: '2024-02-01T14:17:29.305Z'}, {...}, {...} ]
  
    // idの配列を取得する
    purchaseBookIds = purchasesData.map((purchaseBook: PurchaseBookType) => purchaseBook.bookId);
    // console.log(purchaseBookIds) // [ 'cls3aw7vd0007103zpiqxotbd', 'cls3az2ml0009103z1p1ltr1s', 'cls4qfhk20001dp3hie1ilts1']
  }

  // console.log(purchaseBookIds) // [ 'drwmer7ize0d', 'agbc2xsqay4', 'h9o6plktch3' ]

  return (
    <main className="flex flex-wrap justify-center items-center mt-20 md:mt-20">
      <h2 className="text-center w-full font-bold text-3xl mb-2">
        Book Commerce
      </h2>
      {
        contents.map((book: BookType) => {
          // console.log(book); // { id: 1, title: 'Book 1', thumbnail: '/thumbnails/discord-clone-udemy.png', price: 2980,}

          return <Book key={book.id} book={ book } isPurchased={purchaseBookIds.includes(book.id)}/>
        })
      }
    </main>
  )
}
