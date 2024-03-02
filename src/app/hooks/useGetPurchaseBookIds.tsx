

// 購入した本のidの配列を返すフックス

import { PurchaseBookType, User } from "../types/type";


const useGetPurchaseBookIds = async (user: User) => {
  // console.log(user)
  try{
    let purchaseBookIds: any = [];

    if(user){
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user?.id}`,
        { cache: "no-store" } // SSR(デフォルト)。今回は購入履歴の調査になるので静的ビルドの時にデータとして受け取ることはない
      )
      
      const purchasesData: PurchaseBookType[] = await response.json();
      // console.log(purchasesData);
      // [{ id: 'cls3aw7vd0007103zpiqxotbd', userId: 'clrtcl8km000097cmjegw08xy', bookId: 'drwmer7ize0d', createdAt: '2024-02-01T14:17:29.305Z'}, {...}, {...} ]

      purchaseBookIds = purchasesData.map((purchaseBook: PurchaseBookType) => purchaseBook.bookId);
      // console.log(purchaseBookIds) // [ 'cls3aw7vd0007103zpiqxotbd', 'cls3az2ml0009103z1p1ltr1s', 'cls4qfhk20001dp3hie1ilts1']
    }
    
    return purchaseBookIds;
    // console.log(purchaseBookIds) // [ 'drwmer7ize0d', 'agbc2xsqay4', 'h9o6plktch3' ]
  } catch(error){
    // console.error("Error fetching purchase book ids", error);

    throw new Error("Error fetching purchase book ids")
  }
  
}

export default useGetPurchaseBookIds;