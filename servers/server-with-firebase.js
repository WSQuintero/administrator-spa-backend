import { createApp } from "../app.js"
import { BillsModelFirebase } from "../models/BillsModelFirebase.js"
import { DatesModelFirebase } from "../models/DatesModelFirebase.js"
import { LoginModelFirebase } from "../models/LoginModelFirebase.js"
import { SalesModelFirebase } from "../models/SalesModelFireBase.js"
import { SignUpModelFirebase } from "../models/SignUpModelFirebase.js"
import { StatisticsModelFirebase } from "../models/StatisticsModelFirebase.js"

createApp({
  DatesModel: DatesModelFirebase,
  BillsModel: BillsModelFirebase,
  SalesModel: SalesModelFirebase,
  StatisticsModel: StatisticsModelFirebase,
  LoginModel: LoginModelFirebase,
  SignUpModel: SignUpModelFirebase
})
