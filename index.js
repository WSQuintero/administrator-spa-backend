import { createApp } from "./app.js"
import { DatesModelFirebase } from "./src/models/datesModelFireBase.js"
import { BillsModelFirebase } from "./src/models/billsModelFirebase.js"
import { SalesModelFirebase } from "./src/models/salesModelFirebase.js"
import { LoginModelFirebase } from "./src/models/loginModelFirebase.js"
import { SignUpModelFirebase } from "./src/models/signUpModelFirebase.js"
import { StatisticsModelFirebase } from "./src/models/statisticsModelFirebase.js"

createApp({
  DatesModel: DatesModelFirebase,
  BillsModel: BillsModelFirebase,
  SalesModel: SalesModelFirebase,
  StatisticsModel: StatisticsModelFirebase,
  LoginModel: LoginModelFirebase,
  SignUpModel: SignUpModelFirebase
})
