import { NgModule } from "@angular/core";
import { LoginPage } from "./login";
import { MdbHeaderComponent } from "../../components/mdb-header/mdb-header";
import { IonicPageModule } from "ionic-angular";
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { LoginCheckService } from "../../services/login-check/login-check.service";
import { AccountService } from "../../services/account/account-detail/account.service";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MdbHeaderComponent),
    FormsModule
  ],
  entryComponents: [
    LoginPage,
  ],
  providers: [
    AuthenticationService,
    LoginCheckService,
    AccountService,
  ]
})

export class LoginModule {}
