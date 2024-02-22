// 'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import { getServerSession } from "next-auth";

import { nextAuthOptions } from '../lib/next-auth/options';
import { User } from '../types/type'

export const Header: React.FC = async () => {
  // セッション情報を取得
  // SessionProviderでラップ
  // const result = useSession()
  // console.log(result) // { data: { user: { ... } }, status: 'authenticated', update: ƒ}

  // useSessionで取得
  // const { data: session } = useSession();
  // const user = session?.user;
  // console.log(user) // { name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4', id: 'clrtcl8km000097cmjegw08xy'}

  // サーバーサイドで取得
  const session = await getServerSession(nextAuthOptions);
  const user: User = session?.user as User;
  // console.log(session) // { user: { name: 'watarucode', email: 'obito0531@gmail.com', image: 'https://avatars.githubusercontent.com/u/80320746?v=4', id: 'clrtcl8km000097cmjegw08xy'} }

  return(
    <header className='bg-slate-600 text-gray-100 shadow-lg'>
      <nav className="flex items-center justify-between p-4">
        <Link href={"/"} className="font-poppins text-xl font-bold">
          Book Commerce
        </Link>

        <div className="flex items-center gap-1">
          <Link 
            href="/" 
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white"
          >
            ホーム
          </Link>

          <Link
            // href={ user ? "/profile" : "/login" }
            
            // NextAuthのapiでsignInページがデフォルトで用意されている。
            // ログインにしろ、ログアウトにしろ、vercelにデプロイする場合はこの書き方が都合がいい。
            href={ user ? "/profile" : "/api/auth/signin" }
            className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white"
          >
            { user ? "プロフィール" : "ログイン" }
          </Link>

          <Link
            // onClickはクライアントコンポーネントでしか使えない
            // → Linkタグ + NextAuthでログインページがデフォルトで用意されている
            href={"/api/auth/signout"}
            className='px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white'
            // onClick={() => signOut({ callbackUrl: "/login" })}
          >
            ログアウト
          </Link>

          {/* ログインしている場合は場合は、ログアウトを表示 */}
          {/* { user ? (<button 
                      className='px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white'
                      onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                      ログアウト
                    </button> )
                  : ( <Link
                        href="/login"
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white"
                      >
                        ログイン
                      </Link> )
          } */}

          <Link href={`/profile`}>
            <Image
              className="rounded-full object-cover"
              width={50}
              height={50}
              alt="profile_icon"
              // 外部サービスの画像を使う場合はnext-config.jsで設定
              src={ user?.image || "/default_icon.png" }
            />

          </Link>
        </div>
      </nav>
    </header>
  )
}
