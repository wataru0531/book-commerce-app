
// スピナー react-spinners
// 参考 https://www.davidhu.io/react-spinners/

// クライアントコンポーネントのみで動作
"use client"

import { CSSProperties} from "react";
import { PacmanLoader } from "react-spinners"; // パックマン

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// }

type ReactSpinnerProps = {
  color?: string,
  size?: number,
}

const ReactSpinner: React.FC<ReactSpinnerProps> = ({ color = "border-blue-500", size = 25 }) => {

  return(
    <div 
      className="min-h-screen flex items-center justify-center"
    >
      <PacmanLoader
        color={ color }
        size={ size }
        // margin
        // loading
        // cssOverride
        // speedMultiplier
      />

      {/* 
        <style jsx> ... CSS in JSの記法の１つ
        React コンポーネントのスタイルを、コンポーネントのスコープ内にカプセル化が可能。
        他のコンポーネントやグローバルなスタイルに影響を与えずに、特定のコンポーネントにのみスタイルを適用可能となる
      */}
      <style jsx>
        {`
          .spinner-container{
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>


    </div>
  )
}

export default ReactSpinner;