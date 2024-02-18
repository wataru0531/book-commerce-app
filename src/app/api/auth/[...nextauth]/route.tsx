
// NextAuthを使って認証機能を実装し、Next.jsアプリケーションのAPIルート
// で利用できるようにエクスポート

// [...nextauth] > route.tsx これを書くことでgetProvidersが使える

// ハンドラー
// 特定のイベントや、リクエストに対して処理を行うためのコードや機能のこと
// このNextAuthは、認証機能の一部を処理するハンドラーを提供し 、
// 認証ハンドラーはユーザーの認証状態を管理して、認証に関連するリクエストやイベントを処理する
// イベント駆動型のプログラミングやWebフレームワークなどで一般的に見られる

import { nextAuthOptions } from '@/app/lib/next-auth/options';
import NextAuth from 'next-auth/next';

// オプションのオブジェクトとを使って、認証ハンドラーを作成
// handlerに認証ハンドラーが格納
const handler = NextAuth(nextAuthOptions);

// 認証ハンドラーを外部にエクスポート
// これを他のファイルからインポートすると、GETまたはPOSTメソッドとしてhandlerを
// 使用できるようになる
export { handler as GET, handler as POST }


