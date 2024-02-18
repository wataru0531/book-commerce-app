
// 購入履歴を確認するAPI
// ユーザーによって変更する必要があるので動的フォルダにしておく。[userId]

// ORM Object-Relation Mapping
// データベースとオブジェクト指向プログラミング言語の間でデータを変換する技術
// 具体的には、データベース内のテーブルをオブジェクトとして扱い、SQLクエリの代わりにオブジェクト指向の操作を使用してデータベースとやり取りが可能
// 例: prisma.purchase.findMany() などの関数でデータベースのレコードを取得できる
// → データベースとのやり取りをより抽象化した方法と呼ぶ

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  // console.log(prisma)

  const userId = params.userId;

  try{
    // 購入履歴をすべて全てチェックする
    const purchases = await prisma.purchase.findMany({
      where: { userId: userId },
    })

    // json形式で返す
    // クライアントサイドでのjson()はパースしてオブジェクトに戻す。
    return NextResponse.json(purchases); 

  } catch(error) {
    return NextResponse.json(error)
  }
  
}

