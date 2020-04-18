import { Component, Inject } from '@angular/core';
import { NavController, Loading, LoadingController, ToastController, AlertController, Platform, App, Events } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { ClientService } from '../../providers/client.service';
import { APP_CONFIG, AppConfig } from '../../app/app.config';
import { GooglePlus } from '@ionic-native/google-plus';
import { OtpPage } from '../otp/otp';
import { Constants } from '../../models/constants.models';
import { TabsPage } from '../tabs/tabs';
import { TranslateService } from '@ngx-translate/core';
import { PrivacyPage } from '../privacy/privacy';
import { Helper } from '../../models/helper.models';
import { SocialLoginRequest } from '../../models/sociallogin-request.models';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [ClientService]
})
export class SigninPage {
  private countries: any;
  private phoneNumber: string;
  private countryCode: string;
  private phoneNumberFull: string;
  private phoneNumberHint: string;
  private loading: Loading;
  private loadingShown: Boolean = false;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, private navCtrl: NavController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private alertCtrl: AlertController, private service: ClientService, private translate: TranslateService,
    private google: GooglePlus, private platform: Platform, private app: App, private events: Events) {
    this.getCountries();
    this.changeHint();
  }

  changeHint() {
    this.phoneNumber = "";
    if (this.countryCode && this.countryCode.length) {
      this.translate.get('enter_phone_number_exluding').subscribe(value => {
        this.phoneNumberHint = value + " (+" + this.countryCode + ")";
      });
    } else {
      this.translate.get('enter_phone_number').subscribe(value => {
        this.phoneNumberHint = value;
      });
    }
  }

  getCountries() {
    this.service.getCountries().subscribe(data => {
      this.countries = data;
    }, err => {
      console.log(err);
    })
  }

  privacy() {
    let terms: string = Helper.getSetting("terms");
    if (terms && terms.length) {
      this.translate.get('terms_conditions').subscribe(value => {
        this.navCtrl.push(PrivacyPage, { toShow: terms, heading: value });
      });
    }
  }

  alertPhone() {
    if (!this.countryCode || !this.countryCode.length) {
      this.translate.get("select_country").subscribe(value => this.showToast(value));
      return;
    }
    if (!this.phoneNumber || !this.phoneNumber.length) {
      this.showToast(this.phoneNumberHint);
      return;
    }
    this.translate.get(['alert_phone', 'no', 'yes']).subscribe(text => {
      this.phoneNumberFull = "+" + this.countryCode + this.phoneNumber;
      let alert = this.alertCtrl.create({
        title: this.phoneNumberFull,
        message: text['alert_phone'],
        buttons: [{
          text: text['no'],
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: text['yes'],
          handler: () => {
            this.checkIfExists();
          }
        }]
      });
      alert.present();
    });
  }

  checkIfExists() {
    this.translate.get('just_moment').subscribe(value => {
      this.presentLoading(value);
      this.service.checkUser({ mobile_number: this.phoneNumberFull, role: "provider" }).subscribe(res => {
        console.log(res);
        this.dismissLoading();
        this.app.getRootNav().setRoot(OtpPage, { phoneNumberFull: this.phoneNumberFull });
      }, err => {
        console.log(err);
        this.dismissLoading();
        this.navCtrl.push(SignupPage, { code: this.countryCode, phone: this.phoneNumber });
      });
    });
  }



  private presentLoading(message: string) {
    this.loading = this.loadingCtrl.create({
      content: message
    });

    this.loading.onDidDismiss(() => { });

    this.loading.present();
    this.loadingShown = true;
  }

  private dismissLoading() {
    if (this.loadingShown) {
      this.loadingShown = false;
      this.loading.dismiss();
    }
  }

  private presentErrorAlert(msg: string) {
    let alert = this.alertCtrl.create({
      title: "Error",
      subTitle: msg,
      buttons: ["Dismiss"]
    });
    alert.present();
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
