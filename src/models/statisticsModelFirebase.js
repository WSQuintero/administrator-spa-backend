import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../fbConfig/firebase.js"

export class StatisticsModelFirebase {
  static async getByMonth({ year, month }) {
    const salesRef = collection(db, "sales")
    const billsRef = collection(db, "bills")
    const startDateString = `${year}-${month}-01`
    const endDateString = `${year}-${month}-${new Date(
      year,
      month,
      0
    ).getDate()}`

    const salesSnapshot = await getDocs(
      query(
        salesRef,
        where("date", ">=", startDateString),
        where("date", "<=", endDateString)
      )
    )

    const billsSnapshot = await getDocs(
      query(
        billsRef,
        where("date", ">=", startDateString),
        where("date", "<=", endDateString)
      )
    )
    const monthlyTotalExpenses =
      billsSnapshot.docs.length > 0
        ? billsSnapshot.docs
            .map((doc) => doc?.data()?.amount || 0)
            .reduce((a, b) => a + b)
        : 0

    const monthlyTotalSales =
      salesSnapshot.docs.length > 0
        ? salesSnapshot.docs
            .map((doc) => doc?.data()?.amount || 0)
            .reduce((a, b) => a + b)
        : 0

    return {
      monthlyTotalExpenses,
      monthlyTotalSales,
      totalProfitAmount: monthlyTotalSales - monthlyTotalExpenses
    }
  }
}
