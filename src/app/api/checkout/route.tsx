
// stripeのチェックアウトの決済処理
// サーバーサイドで動く
// このapi/checkout/を叩けばこのroute.tsxファイルが実行される

// NextResponse ... Responseオブジェクト(クライアント側の)を拡張したオブジェクト。
// → クライアントサイド、サーバーサイドにも存在している。
// クライアント側での使い方 res.ok、res.json() など
// HTTPリクエストに対するレスポンスを生成するための専用のオブジェクト
import { NextResponse } from "next/server";
import Stripe from "stripe";

// 非null型アサーション演算子 必ず変数が設定はされているが、実際にない場合はランタイムエラーが発生
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!) 


// Stripeのチェックアウト処理(支払いのときの処理)
// ここでのセッション 
// → このセッションは、顧客が商品をカートに追加し、支払いを行うためにStripeの支払いフォームにリダイレクトされる際に使用される
export async function POST(request: Request, response: Response){
  // 決済したい商品を取得
  const { title, price, bookId, userId, } = await request.json();
  // console.log(title, price)
  
  // console.log(NextResponse) // [class NextResponse extends _Response]

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      metadata: {
        bookId: bookId, // 購入した本のid
      },
      client_reference_id: userId, // 購入した人のid
      line_items: [ // どういうものを決済するか
        {
          price_data: {
            currency: "jpy", // 日本円で
            product_data: {
              name: title, // 商品のタイトル
            },
            unit_amount: price, // 値段
          },
          quantity: 1, // 量
        }
      ],
      mode: "payment", // 支払いモード

      // 支払いに成功した場合の遷移先url
      // 初回購入成功時のみセッションidを付加する。stripe側が自動的に設定してくれる
      // この末尾のsession_idを使って遷移先ページでidに見合ったデータを取得していく
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      // キャンセルした場合の処理
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    })
    // console.log(session) // { id: 'cs_test_a1ar...', object: 'checkout.session', after_expiration: null, ... }

    // ここではsessionを返す
    return NextResponse.json({ checkout_url: session.url })

  } catch(error: any) {
    return NextResponse.json(error.message)
  }
}