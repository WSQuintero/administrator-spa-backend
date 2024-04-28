import { createApp } from "../app.js"
import { DatesModelFirebase } from "../models/DatesModelFireBase.js"
import { StatisticsModelFirebase } from "../models/StatisticsModelFirebase.js"
import { BillsModelFirebase } from "../models/billsModelFirebase.js"
import { LoginModelFirebase } from "../models/loginModelFirebase.js"
import { SalesModelFirebase } from "../models/salesModelFirebase.js"
import { SignUpModelFirebase } from "../models/signUpModelFirebase.js"

createApp({
  DatesModel: DatesModelFirebase,
  BillsModel: BillsModelFirebase,
  SalesModel: SalesModelFirebase,
  StatisticsModel: StatisticsModelFirebase,
  LoginModel: LoginModelFirebase,
  SignUpModel: SignUpModelFirebase
})
