import { Component, Inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular'
import { RequestsPage } from '../requests/requests';
import { NotificationsPage } from '../notifications/notifications';
import { ReviewPage } from '../review/review';
import { AccountPage } from '../account/account';
import { ChatslistPage } from '../chatslist/chatslist';
import { Tabs, NavController } from 'ionic-angular';
import { Constants } from '../../models/constants.models';
import { MyprofilePage } from '../myprofile/myprofile';
import { OneSignal } from '@ionic-native/onesignal';
import { User } from '../../models/user.models';
import { ClientService } from '../../providers/client.service';
import { Profile } from '../../models/profile.models';
import { Diagnostic } from '@ionic-native/diagnostic';
import { TranslateService } from '@ngx-translate/core';
import { Geolocation } from '@ionic-native/geolocation';
import { ProfileUpdateRequest } from '../../models/profile-update-request.models';
import firebase from 'firebase';
import { APP_CONFIG, AppConfig } from '../../app/app.config';

@Component({
  templateUrl: 'tabs.html',
  providers: [ClientService]
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

  tab1Root = RequestsPage;
  tab2Root = NotificationsPage;
  tab3Root = ReviewPage;
  tab4Root = ChatslistPage;
  tab5Root = AccountPage;

  constructor(@Inject(APP_CONFIG) private config: AppConfig, oneSignal: OneSignal, private navCtrl: NavController, private service: ClientService,
    platform: Platform, diagnostic: Diagnostic, private geolocation: Geolocation,
    private translate: TranslateService, private alertCtrl: AlertController) {
    if (platform.is("cordova")) {
      oneSignal.getIds().then((id) => {
        if (id && id.userId) {
          let userMe: User = JSON.parse(window.localStorage.getItem(Constants.KEY_USER));
          firebase.database().ref(Constants.REF_USERS_FCM_IDS).child((userMe.id + "hp")).set(id.userId);
          let defaultLang = window.localStorage.getItem(Constants.KEY_DEFAULT_LANGUAGE);
          service.updateUser(window.localStorage.getItem(Constants.KEY_TOKEN), {
            fcm_registration_id_provider: id.userId,
            language: (defaultLang && defaultLang.length) ? defaultLang : this.config.availableLanguages[0].code
          }).subscribe(res => {
            console.log(res);
          }, err => {
            console.log('update_user', err);
          });
        }
      });
    }

    service.logActivity(window.localStorage.getItem(Constants.KEY_TOKEN)).subscribe(res => {
      console.log(res);
    }, err => {
      console.log('logActivity', err);
    });

    setTimeout(() => {
      let profile: Profile = JSON.parse(window.localStorage.getItem(Constants.KEY_PROFILE));
      if (!profile || !profile.primary_category) {
        this.navCtrl.push(MyprofilePage, { create_edit: true });
      }
    }, 500);

    diagnostic.isLocationEnabled().then((isAvailable) => {
      if (isAvailable) {
        this.setLocation();
      } else {
        this.alertLocationServices();
        this.setLocation();
      }
    }).catch((e) => {
      console.error(e);
      this.alertLocationServices();
      this.setLocation();
    });

  }

  setLocation() {
    this.geolocation.getCurrentPosition().then((position) => {
      let pur = new ProfileUpdateRequest();
      pur.longitude = String(position.coords.longitude);
      pur.latitude = String(position.coords.latitude);
      this.service.updateProfile(window.localStorage.getItem(Constants.KEY_TOKEN), pur).subscribe(res => {
        console.log(res);
      }, err => {
        console.log('logActivity', err);
      });
    }).catch((err) => {
      console.log("getCurrentPosition", err);
    });
  }

  alertLocationServices() {
    this.translate.get(['location_services_title', 'location_services_message', 'okay']).subscribe(text => {
      let alert = this.alertCtrl.create({
        title: text['location_services_title'],
        subTitle: text['location_services_message'],
        buttons: [{
          text: text['okay'],
          role: 'cancel',
          handler: () => {
            console.log('okay clicked');
          }
        }]
      });
      alert.present();
    })
  }

}
