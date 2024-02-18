/**************************************************************
型
***************************************************************/

// microCMSに登録した本の型
export type BookType = {
  id: string;
  created_at: string
  updated_at: string
  // publishedAt: string
  // revisedAt: string
  title: string
  content: string
  price: number
  thumbnail: {
    url: string
    // height: number
    // width: number
  }
}

// 購入した本の型
export type PurchaseBookType = {
  id: string
  userId: string
  bookId: string
  createdAt: string
  user?: User
}

// 本の型
export type Purchase = {
  id: string;
  userId: string;
  bookId: string;
  sessionId: string;
  createdAt: string;
};

// ユーザー
export type User = {
  id: string;
  name?: string | null | undefined
  email?: string | null | undefined
  image?: string | null | undefined
  // name: string;
  // email: string;
  // image: string;
};

