
// microCMSのAPI
// 参考　https://blog.microcms.io/microcms-js-sdk-2_5_0/

// このクライアントは、特定のデータベースや外部サービスとのやり取りを抽象化し、
// アプリケーションが簡単にデータを取得することを可能とする
// 抽象化 ... apiや関数などを自前で用意せずにmicroCMS社側で用意してもらっている状況

import { BookType } from '@/app/types/type';
import { createClient } from 'microcms-js-sdk';


export const client = createClient({
  // ! ... 非nullアサーション演算子
  // 変数がnull、またはundefineでないことをTypeScriptに伝える
  // serviceDomain: process.env.NEXT_PUBLIC_SERVICE_DOMAIN!,
  // apiKey: process.env.NEXT_PUBLIC_API_KEY!,
  serviceDomain: "pei8lxhma7",
  apiKey: "dZenbECDelQe4qCD4VkpaR5C7x8o9PeS9m8p",
});

// console.log(client)
// {
//   get: [Function (anonymous)],
//   getList: [Function (anonymous)],
//   getListDetail: [Function (anonymous)],
//   getObject: [Function (anonymous)],
//   getAllContentIds: [Function (anonymous)],
//   getAllContents: [Function (anonymous)],
//   create: [Function (anonymous)],
//   update: [Function (anonymous)],
//   delete: [Function (anonymous)]
// }

// 全記事取得
export const getAllBooks = async () => {
  const allBooks = await client.getList<BookType>({
    endpoint: "bookcommerce", // サービス名
    customRequestInit: {
      cache: "no-store", // SSR。キャッシュを利用せずに常に新しいデータを取得できる
    }
  })

  return allBooks;
}

// 単体の記事取得
export const getDetailBook = async (contentId: string) => {
  const detailBook = await client.getListDetail<BookType>({
    endpoint: "bookcommerce",
    contentId,
    customRequestInit: {
      cache: "no-store",
    }
  })
  // console.log(detailBook)

  return detailBook;
}

// 
