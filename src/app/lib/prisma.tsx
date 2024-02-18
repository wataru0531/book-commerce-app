
// Node.js環境でPrismaを使ってデータベースにアクセスするための設定
// 何度も初期化されてインスタンスかされるのを防ぐ手法
// Prisma Clientのシングルトンパターン

// Prisma Client ... データベースに対するクエリや操作を行うためのメソッドを提供し、
// これを使用することでアプリケーションコードからデータベースに対する操作を行うことができる
// ここでの "Client" は、データベースとのやりとりを抽象化し、
// アプリケーションコードがデータベースに対してクエリを実行できるようにするためのインターフェースやツールを指していいる
// これは "データベースクライアント"の意味であり、
// データベースへのアクセスや操作を簡単にするためのライブラリやツールが「クライアント」と呼ばれる
import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient; // PrismaClientのインスタンスを保持

// prismaをPrismaClient型またはundefined型のどちらかにする
// globalオブジェクトを利用して、グローバルなコンテキストにPrismaClientのインスタンスを保持
// するためのオブジェクトを作成
// グローバルオブジェクトを使うことで何度もインスタンスかされずに済む。シングルトンと呼ばれる
// globalオブジェクト ...  Node.js環境でグローバル変数を扱うためのオブジェクト
// unknown型 ...  値の型が未知である場合や、動的な型チェックが必要な場合に利用

// globalオブジェクトは通常、Node.js環境でグローバルなオブジェクトを指す。
// TypeScriptでは、globalオブジェクトの型はNodeJS.Global。
// しかし、NodeJS.Globalにはprismaプロパティが含まれていないため、prismaプロパティを追加できない。
// そのため、globalオブジェクトにprismaプロパティを追加するため、型アサーションを使用して型を変更。
// globalオブジェクトをunknown型にキャストし、さらにprismaプロパティを持つ型にキャストする

const globalForPrisma = global as unknown as { // 型アサーション
  prisma: PrismaClient | undefined;
}

// もしインスタンスされていない場合のみインスタンス化する
if(!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient();
}

prisma = globalForPrisma.prisma;

export default prisma;