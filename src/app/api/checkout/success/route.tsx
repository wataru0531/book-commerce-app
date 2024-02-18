
// 購入履歴をデータベースに保存するapi
// checkout-successページで叩く
// 決済して成功したときのみこのapiを叩くように設定する

import Stripe from "stripe"
import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

// 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request, response: Response) {
  // セッションidを受け取る
  const { sessionId } = await request.json();
  // console.log(sessionId) // cs_test_a1VeQrn970NZhzyHB3N1wtuRTif1wq6RPsrK442FkYcewRtpqFtftHt0D5

  try{
    // セッションのデータを取得
    // stripeのチェックアウト(支払いが完了)したときのメタデータを取得できる
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // console.log(session)

    // データベースの中にあるuserIdに見合ったbookIdを見つける
    // → これがあった場合、2度同じ購入データを保存するのを防ぐ
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId: session.client_reference_id!,
        bookId: session.metadata?.bookId!,
      }
    })

    if(!existingPurchase){
      // 購入履歴としてprismaを使ってデータベースに保存していく
      // 購入した際はcheckout-successページに飛ぶので ↓
      // http://localhost:3000/book/checkout-success?session_id=cs_test_a1tQGmHkLnI0uk8zHbMfKMIAUipzFn05Ccs9L0ouVvcVXob2duGj0Mnt02
      // このurlのsession_idからuserId、bookIdを取得していく
      const purchase = await prisma.purchase.create({
        data: {
          userId: session.client_reference_id!,
          bookId: session.metadata?.bookId!,
        }
      });
      // console.log(purchase) // { id: 'cls3afdir0001103z89zuk59a', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drmctda0gl5', createdAt: 2024-02-01T14:04:23.476Z }

      return NextResponse.json({ purchase });
    } else {
      return NextResponse.json({ message: "すでに購入済みです" })
    }

  } catch(error: any) {
    NextResponse.json(error)
  }
}

