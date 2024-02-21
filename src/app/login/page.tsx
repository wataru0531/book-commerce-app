/**************************************************************

Login Page
NextAuth使用 https://next-auth.js.org/

・参照ファイルなど
prisma/schema.prisma
api/auth/[...nextauth]/routes.tsx
lib/next-auth/options.tsx
.env

***************************************************************/

'use client'

import { useState, useEffect } from 'react'
import { getProviders, signIn } from 'next-auth/react'

// import { ProviderPage } from './components/ProviderPage'

// { id: 'github', name: 'GitHub', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/github', callbackUrl: 'http://localhost:3000/api/auth/callback/github'}

type ProviderType = {
  id: string
  name: string
  type: string
  signinUrl: string
  callbackUrl: string
}

const Login = () => {
  const [ providerData, setProviderData ] = useState<any>(null)

  // クライアントコンポーネントではasync/awaitは使えないのでuseEffectやReactQuery、SWRを使う
  useEffect(() => {
    const fetchProviders = async () => {
      try{
        const fetchedProviderData = await getProviders();
        console.log(fetchedProviderData); 
        // { github: { callbackUrl: "http://localhost:3000/api/auth/callback/github", id: "github", name : "GitHub", signinUrl: "http://localhost:3000/api/auth/signin/github", type : "oauth" } }
      
        setProviderData(fetchedProviderData);

      } catch(error) {
        console.log("Error fetching providers", error)
      }
    }

    fetchProviders()
  }, [])
  
  // console.log(providerData)

  return(
    <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにログイン
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {
            providerData && 
            // Object.values() オブジェクトの値を配列にして生成
            // Object.values(providerData).map(provider => {
              //  console.log(provider) // { id: 'github', name: 'GitHub', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/github', callbackUrl: 'http://localhost:3000/api/auth/callback/github'}
            Object.keys(providerData).map((key) => {
              console.log(key)
              // Object.keys() オブジェクトのキーの配列を返す。

              const provider = providerData[key]; // 
              console.log(provider)

              return(
                <div key={provider.id} className="text-center">
                  <button 
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
                  >
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2"
                      fill="currentColor"
                    >
                      <title>GitHub icon</title>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Githubでログイン</span>
                  </button>
                </div>
              )
            })

            // (
            //   <div key={providerData.id} className="text-center">
            //     <button 
            //       onClick={() => signIn(providerData.id, { callbackUrl: "/" })}
            //       className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
            //     >
            //       <svg
            //         role="img"
            //         viewBox="0 0 24 24"
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="w-6 h-6 mr-2"
            //         fill="currentColor"
            //       >
            //         <title>GitHub icon</title>
            //         <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
            //       </svg>
            //       <span>Githubでログイン</span>
            //     </button>
            //   </div>
            // )
          

          }
          
        </div>
      </div>
    </div>
  )
}

export default Login;



/**************************************************************
元のコード
***************************************************************/

// 'use client'

// import { useState, useEffect } from 'react'
// import { getProviders, signIn } from 'next-auth/react'

// // import { ProviderPage } from './components/ProviderPage'

// type Provider = {
//   callbackUrl: string,
//   id: string,
//   name: string,
//   signInUrl: string,
//   type: string,
// }

// type DynamicObject<T> = {
//   // キーが文字列で、値がT型のオブジェクトを示す
//   // これにより異なる方のオブジェクトをキーに関連づけることができる
//   [key: string]: T
// }

// const Login = () => {

//   // providerData の中身は、Provider型のプロパティを持つことが期待されるが、
//   // その具体的な構造が事前には分からない状況に対応できる
//   const [ providerData, setProviderData ] = useState<DynamicObject<Provider>>({})

//   // let providerData: Provider | null = null;

//   // クライアントコンポーネントではasync/awaitは使えないのでuseEffectやReactQuery、SWRを使う
//   useEffect(() => {
//     const fetchProviders = async () => {
//       try{
//         const fetchedProviderData = await getProviders();
//         // console.log(fetchedProviderData); 
//         // { github: { callbackUrl: "http://localhost:3000/api/auth/callback/github", id: "github", name : "GitHub", signinUrl: "http://localhost:3000/api/auth/signin/github", type : "oauth" } }

//         // if(fetchedProviderData) {
//         //   providerData = fetchedProviderData;
//         // }
        
//         // getProvider()の返り値がnullの可能性があるため、nullチェックを行い、
//         // nullでない場合のみproviderDataに格納する
//         if (fetchedProviderData !== null) {
//           setProviderData(fetchedProviderData); // stateに保持

//           // providerData = fetchedProviderData;

//         } else {
//           console.error('getProviders returned null');
//         }

//       } catch(error) {
//         console.log("Error fetching providers", error)
//       }
//     }

//     fetchProviders()
//   }, [])
  
//   console.log(providerData)

//   return(
//     <div className="flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             アカウントにログイン
//           </h2>
//         </div>
//         <div className="mt-8 space-y-6">
//           {
//             providerData && 
//             // Object.values() オブジェクトの値を配列にして生成
//             Object.values(providerData).map(provider => {
//               // console.log(provider) // { id: 'github', name: 'GitHub', type: 'oauth', signinUrl: 'http://localhost:3000/api/auth/signin/github', callbackUrl: 'http://localhost:3000/api/auth/callback/github'}
              
//               return(
//                 <div key={provider.id} className="text-center">
//                   <button 
//                     onClick={() => signIn(provider.id, { callbackUrl: "/" })}
//                     className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center w-full"
//                   >
//                     <svg
//                       role="img"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="w-6 h-6 mr-2"
//                       fill="currentColor"
//                     >
//                       <title>GitHub icon</title>
//                       <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.723-4.042-1.608-4.042-1.608-.546-1.386-1.332-1.754-1.332-1.754-1.087-.743.083-.728.083-.728 1.205.085 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.42-1.305.763-1.605-2.665-.3-5.467-1.332-5.467-5.93 0-1.31.468-2.382 1.235-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23.956-.266 1.98-.398 3-.403 1.02.005 2.044.137 3 .403 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.768.838 1.234 1.91 1.234 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.824 1.102.824 2.222 0 1.604-.015 2.897-.015 3.29 0 .322.216.697.825.577C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
//                     </svg>
//                     <span>Githubでログイン</span>
//                   </button>
//                 </div>
//               )
//             })
//           }
          
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login;


