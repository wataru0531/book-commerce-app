
// next-authライブラリの設定
// このファイルのオプションを使って動作をカスタマイズする

// next-auth 
// → 認証(authentication)とセッション(session)管理のためのフレームワーク

import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../prisma"


export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  providers: [
    GitHubProvider({
      // undefinedの可能性があるので、!で回避
      // 確実に GITHUB_ID、GITHUB_SECRETが存在することを示す
      // ! 非nullアサーション演算子
      // → TypeScriptにおいて変数が絶対にnullまたはundefinedではないことを示す演算子。

      clientId: process.env.GITHUB_ID!, 
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // GoogleProvider({}),
  ],

  // PrismaAdapterを使って、Next.jsプロジェクトと、VercelのPostgresSQLを接続
  // adapter 接続の意味
  // 認証すると同時に、Prismaの中のモデルのユーザに保存されていく
  adapter: PrismaAdapter(prisma),

  // callbacks ... 認証フローのさまざまな部分にフックできる
  // フロント側に値を渡すには、sessionとコールバックの組み合わせを使う
  // next-authのセッションだったり、ユーザー情報を返す
  callbacks: {
    // sessionコールバック
    // ユーザーのセッションが更新されるたびに発火する
    // sessionオブジェクト: ユーザーのセッション情報。 
    // userオブジェクト:    ユーザーの情報
    // sessionオブジェクト、 ユーザーのidを組み合わせて新しいセッションオブジェクトを作成して返している
    session: ({ session, user }) => {
      // console.log(session) // { user: { name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4'}, expires: '2024-03-31T13:25:54.133Z'}

      return {
        ...session,
        user: { // getServerSession(nextAuthOptions)で、このuserオブジェクトが返される
          ...session.user,
          id: user.id,
        },
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
}
