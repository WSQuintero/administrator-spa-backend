import { createApp } from "../app.js"
import { DatesModelFirebase } from "./../models/datesModelFireBase.js"
import { BillsModelFirebase } from "./../models/billsModelFirebase.js"
import { SalesModelFirebase } from "./../models/salesModelFirebase.js"
import { LoginModelFirebase } from "./../models/loginModelFirebase.js"
import { SignUpModelFirebase } from "./../models/signUpModelFirebase.js"
import { StatisticsModelFirebase } from "./../models/statisticsModelFirebase.js"

createApp({
  DatesModel: DatesModelFirebase,
  BillsModel: BillsModelFirebase,
  SalesModel: SalesModelFirebase,
  StatisticsModel: StatisticsModelFirebase,
  LoginModel: LoginModelFirebase,
  SignUpModel: SignUpModelFirebase
})
