webpackJsonp([0],{

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Constants; });
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.KEY_USER = "khp_user";
    Constants.KEY_TOKEN = "khp_token";
    Constants.KEY_SETTING = "khp_setting";
    Constants.KEY_LOCATION = "khp_location";
    Constants.KEY_CATEGORY = "khp_category";
    Constants.KEY_PROFILE = "khp_profile";
    Constants.KEY_PLANS = "khp_plans";
    Constants.KEY_NOTIFICATIONS = "khp_notis";
    Constants.KEY_DEFAULT_LANGUAGE = "khp_dl";
    Constants.KEY_LOCALE = "khp_locale";
    Constants.KEY_FAQS = "khp_faqs";
    Constants.KEY_CARD_INFO = "khp_card_info_p";
    Constants.KEY_RATING_SUMMARY = "khp_rating_summary_p";
    Constants.REF_USERS = "handyman/users";
    Constants.REF_CHAT = "handyman/chats";
    Constants.REF_INBOX = "handyman/inbox";
    Constants.REF_USERS_FCM_IDS = "handyman/user_fcm_ids";
    return Constants;
}());

//# sourceMappingURL=constants.models.js.map

/***/ }),

/***/ 119:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatscreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_message_models__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_client_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ChatscreenPage = /** @class */ (function () {
    function ChatscreenPage(navParam, toastCtrl, clientService, oneSignal, translate) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.clientService = clientService;
        this.oneSignal = oneSignal;
        this.translate = translate;
        this.messages = new Array();
        this.chat = navParam.get('chat');
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_USER));
        this.chatChild = __WEBPACK_IMPORTED_MODULE_4__models_helper_models__["a" /* Helper */].getChatChild(this.chat.myId, this.chat.chatId);
        var component = this;
        this.inboxRef = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].REF_INBOX);
        this.chatRef = __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].REF_CHAT);
        this.chatRef.child(this.chatChild).limitToLast(20).on("child_added", function (snapshot, prevChildKey) {
            var newMessage = snapshot.val();
            if (newMessage) {
                newMessage.timeDiff = __WEBPACK_IMPORTED_MODULE_4__models_helper_models__["a" /* Helper */].formatMillisDateTime(Number(newMessage.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_4__models_helper_models__["a" /* Helper */].getLocale());
                component.addMessage(newMessage);
                component.markDelivered();
                component.scrollList();
            }
        }, function (error) {
            console.error("child_added", error);
        });
        __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child(this.chat.chatId).once("value", function (snap) {
            component.userPlayerId = snap.val();
        });
        this.translate.get("just_moment").subscribe(function (value) {
            _this.showToast(value);
        });
    }
    ChatscreenPage.prototype.ionViewDidEnter = function () {
        this.scrollList();
    };
    ChatscreenPage.prototype.scrollList = function () {
        this.content.scrollToBottom(300); //300ms animation speed
    };
    ChatscreenPage.prototype.notifyMessages = function () {
        this.clientService.postNotification(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), "customer", Number(this.chat.chatId) ? this.chat.chatId : this.chat.chatId.substring(0, this.chat.chatId.indexOf("hc"))).subscribe(function (res) { return console.log("notiS", res); }, function (err) { return console.log("notiF", err); });
    };
    ChatscreenPage.prototype.markDelivered = function () {
        if (this.messages && this.messages.length) {
            if (this.messages[this.messages.length - 1].senderId != this.chat.myId) {
                this.messages[this.messages.length - 1].delivered = true;
                this.chatRef.child(this.chatChild).child(this.messages[this.messages.length - 1].id).child("delivered").set(true);
            }
            // else {
            //   let toNotify;
            //   if (!this.messages[this.messages.length - 1].delivered) {
            //     toNotify = this.messages[this.messages.length - 1];
            //     this.messages[this.messages.length - 1].delivered = true;
            //   }
            //   if (toNotify) {
            //     this.notifyMessages(toNotify);
            //   }
            // }
        }
    };
    ChatscreenPage.prototype.addMessage = function (msg) {
        this.messages = this.messages.concat(msg);
        //this.storage.set(Constants.KEY_MESSAGES + this.chatChild, this.messages);
        if (this.chat && msg) {
            var isMeSender = msg.senderId == this.chat.myId;
            this.chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
            this.chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
            this.chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        }
    };
    ChatscreenPage.prototype.send = function () {
        var _this = this;
        if (this.newMessageText && this.newMessageText.trim().length) {
            var toSend_1 = new __WEBPACK_IMPORTED_MODULE_2__models_message_models__["a" /* Message */]();
            toSend_1.chatId = this.chatChild;
            toSend_1.body = this.newMessageText;
            toSend_1.dateTimeStamp = String(new Date().getTime());
            toSend_1.delivered = false;
            toSend_1.sent = true;
            toSend_1.recipientId = this.chat.chatId;
            toSend_1.recipientImage = this.chat.chatImage;
            toSend_1.recipientName = this.chat.chatName;
            toSend_1.recipientStatus = this.chat.chatStatus;
            toSend_1.senderId = this.chat.myId;
            toSend_1.senderName = this.userMe.name;
            toSend_1.senderImage = (this.userMe.image_url && this.userMe.image_url.length) ? this.userMe.image_url : "assets/imgs/empty_dp.png";
            toSend_1.senderStatus = this.userMe.email;
            toSend_1.id = this.chatRef.child(this.chatChild).push().key;
            this.chatRef.child(this.chatChild).child(toSend_1.id).set(toSend_1).then(function (res) {
                _this.inboxRef.child(toSend_1.recipientId).child(toSend_1.senderId).set(toSend_1);
                _this.inboxRef.child(toSend_1.senderId).child(toSend_1.recipientId).set(toSend_1);
                _this.newMessageText = '';
                _this.notifyMessages();
            });
        }
        else {
            this.translate.get("type_message").subscribe(function (value) { return _this.showToast(value); });
        }
    };
    ChatscreenPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", Object)
    ], ChatscreenPage.prototype, "content", void 0);
    ChatscreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chatscreen',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\chatscreen\chatscreen.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            <span class="profile">\n                <img *ngIf="chat.chatImage && chat.chatImage.length" data-src="{{chat.chatImage}}">\n                <img *ngIf="!chat.chatImage || !chat.chatImage.length" src="assets/imgs/empty_dp.png">\n            </span>\n			<span>{{chat.chatName}}</span>\n            <!-- <small> | {{chat.chatStatus}}</small> -->\n            <!-- <span><ion-icon name="md-more"></ion-icon></span> -->\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content #content class="bg-light">\n    <ion-card *ngFor="let msg of messages" [ngClass]="(chat.myId == msg.senderId) ? \'send\' : \'received\'">\n        <h2>{{msg.body}}</h2>\n        <p>{{msg.timeDiff}}</p>\n    </ion-card>\n</ion-content>\n\n\n<ion-footer no-border>\n	<ion-list class="" no-lines>\n		<div class="d-flex input_field">\n			<ion-item>\n<!--				<h2 item-start text-end>{{\'yes\' | translate}}</h2>-->\n				<ion-textarea type="text" rows="1" [(ngModel)]="newMessageText" placeholder="{{\'type_your_message\' | translate}}"></ion-textarea>\n			</ion-item>\n			<h3 (click)="send()" class="end">\n				<ion-icon name="md-send" text-start></ion-icon>\n				<span>{{\'send\' | translate}}</span>\n			</h3>\n		</div>\n	</ion-list>\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\chatscreen\chatscreen.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_8__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */]])
    ], ChatscreenPage);
    return ChatscreenPage;
}());

//# sourceMappingURL=chatscreen.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyLocation; });
var MyLocation = /** @class */ (function () {
    function MyLocation() {
    }
    return MyLocation;
}());

//# sourceMappingURL=my-location.models.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__selectservice_selectservice__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_profile_models__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_category_models__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_my_location_models__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__selectarea_selectarea__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_firebase_service__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_profile_update_request_models__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__tabs_tabs__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_image_picker__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_crop__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__ = __webpack_require__(379);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var MyprofilePage = /** @class */ (function () {
    function MyprofilePage(navCtrl, service, alertCtrl, loadingCtrl, toastCtrl, firebaseService, translate, navParam, app, file, imagePicker, cropService, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.firebaseService = firebaseService;
        this.translate = translate;
        this.app = app;
        this.file = file;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.platform = platform;
        this.loadingShown = false;
        this.selectionPagePushed = false;
        this.location = new __WEBPACK_IMPORTED_MODULE_7__models_my_location_models__["a" /* MyLocation */]();
        this.subscriptions = [];
        this.level = 0;
        var create_edit = navParam.get("create_edit");
        if (create_edit) {
            this.translate.get('create_edit_profile').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_USER));
        this.profile = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_PROFILE));
        this.categories = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_CATEGORY));
        var location = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_LOCATION));
        if (location)
            this.location = location;
        if (!this.categories) {
            this.translate.get('just_moment').subscribe(function (value) {
                _this.presentLoading(value);
            });
        }
        if (!this.profile) {
            this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_profile_models__["a" /* Profile */]();
            this.profile.primary_category = new __WEBPACK_IMPORTED_MODULE_6__models_category_models__["a" /* Category */]();
            this.profile.subcategories = new Array();
            this.profile.price_type = "hour";
            this.profile.about = "";
            this.profile.user = this.user;
        }
        if (!this.profile.primary_category) {
            this.profile.primary_category = new __WEBPACK_IMPORTED_MODULE_6__models_category_models__["a" /* Category */]();
        }
        if (!this.profile.subcategories) {
            this.profile.subcategories = new Array();
        }
        if (this.profile.subcategories) {
            var sct = "";
            for (var _i = 0, _a = this.profile.subcategories; _i < _a.length; _i++) {
                var sc = _a[_i];
                sct += sc.title + ", ";
            }
            this.subcategoriestext = sct.substring(0, sct.length - 2);
        }
        this.refreshProfile();
        this.refreshCategories();
    }
    MyprofilePage.prototype.ionViewDidEnter = function () {
        var newSelectedLocation = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_LOCATION));
        if (newSelectedLocation)
            this.location = newSelectedLocation;
        if (this.selectionPagePushed) {
            this.selectionPagePushed = false;
            var subCategories = JSON.parse(window.localStorage.getItem("temp_sub_cats"));
            window.localStorage.removeItem("temp_sub_cats");
            if (subCategories && subCategories.length) {
                this.profile.subcategories = subCategories;
            }
            if (this.profile.subcategories) {
                var sct = "";
                for (var _i = 0, _a = this.profile.subcategories; _i < _a.length; _i++) {
                    var sc = _a[_i];
                    sct += sc.title + ", ";
                }
                this.subcategoriestext = sct.substring(0, sct.length - 2);
            }
        }
    };
    MyprofilePage.prototype.refreshProfile = function () {
        var _this = this;
        var subscription = this.service.getProfile(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            if (res && res.primary_category && res.primary_category_id) {
                _this.profile = res;
                if (_this.profile.latitude && _this.profile.latitude.length && _this.profile.longitude && _this.profile.longitude.length) {
                    _this.location = new __WEBPACK_IMPORTED_MODULE_7__models_my_location_models__["a" /* MyLocation */]();
                    _this.location.name = _this.profile.address;
                    _this.location.lat = _this.profile.latitude;
                    _this.location.lng = _this.profile.longitude;
                }
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_PROFILE, JSON.stringify(_this.profile));
            }
            else {
                window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_PROFILE);
                _this.profile = new __WEBPACK_IMPORTED_MODULE_4__models_profile_models__["a" /* Profile */]();
                _this.profile.primary_category = new __WEBPACK_IMPORTED_MODULE_6__models_category_models__["a" /* Category */]();
                _this.profile.subcategories = new Array();
                _this.profile.price_type = "hour";
                _this.profile.about = "";
                _this.profile.user = _this.user;
            }
        }, function (err) {
            console.log('profile_get_err', err);
        });
        this.subscriptions.push(subscription);
    };
    MyprofilePage.prototype.refreshCategories = function () {
        var _this = this;
        var subscription = this.service.categoryParent(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            _this.dismissLoading();
            var cats = res.data;
            _this.categories = cats;
            console.log(cats);
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_CATEGORY, JSON.stringify(_this.categories));
        }, function (err) {
            _this.dismissLoading();
            console.log('cat_err', err);
        });
        this.subscriptions.push(subscription);
    };
    MyprofilePage.prototype.pickLocation = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__selectarea_selectarea__["a" /* SelectareaPage */]);
    };
    MyprofilePage.prototype.compareFn = function (tr1, tr2) {
        return tr1 && tr2 ? tr1.id == tr2.id : tr1 === tr2;
    };
    MyprofilePage.prototype.selectservice = function () {
        if (this.profile.primary_category) {
            this.selectionPagePushed = true;
            if (this.profile.subcategories) {
                for (var _i = 0, _a = this.profile.subcategories; _i < _a.length; _i++) {
                    var subCat = _a[_i];
                    subCat.selected = true;
                }
            }
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__selectservice_selectservice__["a" /* SelectservicePage */], { cat: this.profile.primary_category, cats: this.profile.subcategories });
        }
    };
    MyprofilePage.prototype.pickPicker = function (num) {
        var _this = this;
        if (this.progress)
            return;
        this.uploadType = num;
        this.platform.ready().then(function () {
            if (_this.platform.is("cordova")) {
                _this.imagePicker.getPictures({
                    maximumImagesCount: 1,
                }).then(function (results) {
                    if (results && results[0]) {
                        _this.reduceImages(results).then(function () {
                            console.log('cropped_images');
                        });
                    }
                }, function (err) {
                    console.log("getPictures", JSON.stringify(err));
                });
            }
        });
    };
    MyprofilePage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 100 }).then(function (cropped_image) {
                    _this.resolveUri(cropped_image);
                });
            });
        }, Promise.resolve());
    };
    MyprofilePage.prototype.resolveUri = function (uri) {
        var _this = this;
        console.log('uri: ' + uri);
        if (this.platform.is("android") && uri.startsWith('content://') && uri.indexOf('/storage/') != -1) {
            uri = "file://" + uri.substring(uri.indexOf("/storage/"), uri.length);
            console.log('file: ' + uri);
        }
        this.file.resolveLocalFilesystemUrl(uri).then(function (entry) {
            console.log(entry);
            var fileEntry = entry;
            fileEntry.file(function (success) {
                var mimeType = success.type;
                console.log(mimeType);
                var dirPath = entry.nativeURL;
                _this.upload(dirPath, entry.name, mimeType);
            }, function (error) {
                console.log(error);
            });
        });
    };
    MyprofilePage.prototype.upload = function (path, name, mime) {
        var _this = this;
        console.log('original: ' + path);
        var dirPathSegments = path.split('/');
        dirPathSegments.pop();
        path = dirPathSegments.join('/');
        console.log('dir: ' + path);
        this.file.readAsArrayBuffer(path, name).then(function (buffer) {
            _this.translate.get(_this.uploadType == 1 ? "uploading_image" : "uploading_doc").subscribe(function (value) {
                _this.presentLoading(value);
            });
            _this.progress = true;
            _this.firebaseService.uploadBlob(new Blob([buffer], { type: mime })).then(function (url) {
                _this.progress = false;
                _this.dismissLoading();
                console.log("Url is", url);
                if (_this.uploadType == 1) {
                    _this.profile.user.image_url = String(url);
                    _this.service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), { image_url: String(url) }).subscribe(function (res) {
                        console.log(res);
                        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_USER, JSON.stringify(res));
                    }, function (err) {
                        console.log('update_user', err);
                    });
                }
                else {
                    _this.profile.document_url = String(url);
                    _this.translate.get('document_uploaded').subscribe(function (value) {
                        _this.showToast(value);
                    });
                }
            }).catch(function (err) {
                _this.progress = false;
                _this.dismissLoading();
                _this.showToast(JSON.stringify(err));
                console.log(err);
                _this.translate.get("uploading_fail").subscribe(function (value) {
                    _this.presentErrorAlert(value);
                });
            });
        }).catch(function (err) {
            _this.dismissLoading();
            _this.showToast(JSON.stringify(err));
            console.log(err);
        });
    };
    MyprofilePage.prototype.save = function () {
        var _this = this;
        if (!this.location || !this.location.lat || !this.location.lng || !this.location.lat.length || !this.location.lng.length) {
            this.translate.get('err_select_location').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        if (!this.profile.about || !this.profile.about.length) {
            this.translate.get('err_empty_about').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        if (!this.profile.price || this.profile.price <= 0) {
            this.translate.get('err_empty_price').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        if (!this.profile.document_url || !this.profile.document_url.length) {
            this.translate.get('err_empty_doc').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        if (!this.profile.primary_category) {
            this.translate.get('err_service_cat').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        if (!this.profile.subcategories || !this.profile.subcategories.length) {
            this.translate.get('err_services').subscribe(function (value) {
                _this.showToast(value);
            });
            return;
        }
        var profileRequest = new __WEBPACK_IMPORTED_MODULE_10__models_profile_update_request_models__["a" /* ProfileUpdateRequest */]();
        profileRequest.address = this.location.name;
        profileRequest.latitude = this.location.lat;
        profileRequest.longitude = this.location.lng;
        profileRequest.about = this.profile.about;
        profileRequest.price = this.profile.price;
        profileRequest.price_type = this.profile.price_type;
        profileRequest.document_url = this.profile.document_url;
        profileRequest.primary_category_id = this.profile.primary_category.id;
        profileRequest.sub_categories = new Array();
        for (var _i = 0, _a = this.profile.subcategories; _i < _a.length; _i++) {
            var cat = _a[_i];
            profileRequest.sub_categories.push(cat.id);
        }
        this.translate.get('profile_updating').subscribe(function (value) {
            _this.presentLoading(value);
        });
        console.log('update_request', profileRequest);
        var subscription = this.service.updateProfile(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), profileRequest).subscribe(function (res) {
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_PROFILE, JSON.stringify(res));
            _this.dismissLoading();
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_12__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            _this.dismissLoading();
            console.log("profile_update_err", err);
            _this.translate.get('profile_updating_fail').subscribe(function (value) {
                _this.presentErrorAlert(value);
            });
        });
        this.subscriptions.push(subscription);
    };
    MyprofilePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    MyprofilePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    MyprofilePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MyprofilePage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    MyprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-myprofile',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\myprofile\myprofile.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>\n\n			{{\'my_profile\' | translate}}\n\n			<!-- <span class="end">{{\'logout\' | translate}}</span> -->\n\n		</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n<ion-content class="bg-light">\n\n	<div *ngIf="user" class="form box-shadow" padding-top>\n\n		<ion-list no-lines>\n\n			<ion-row class="profile">\n\n				<ion-col col-4>\n\n					<div class="img-box" (click)="pickPicker(1)">\n\n						<img *ngIf="profile && profile.user && profile.user.image_url"\n\n							data-src="{{profile.user.image_url}}">\n\n						<img *ngIf="!profile || !profile.user || !profile.user.image_url"\n\n							src="assets/imgs/empty_dp.png">\n\n						<ion-icon name="md-camera"></ion-icon>\n\n					</div>\n\n				</ion-col>\n\n				<ion-col col-8 padding-left>\n\n					<ion-item>\n\n						<ion-label floating>{{\'your_name\' | translate}}</ion-label>\n\n						<ion-input disabled="true" [(ngModel)]="user.name"></ion-input>\n\n					</ion-item>\n\n				</ion-col>\n\n			</ion-row>\n\n\n\n			<ion-item>\n\n				<ion-avatar item-start>\n\n					<ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n				</ion-avatar>\n\n				<ion-label class="text-grey" floating>{{\'enter_email_id\' | translate}}</ion-label>\n\n				<ion-input disabled="true" [(ngModel)]="user.email"></ion-input>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n					<ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n				</ion-avatar>\n\n				<ion-label class="text-grey" floating>{{\'mobile_number\' | translate}}</ion-label>\n\n				<ion-input disabled="true" [(ngModel)]="user.mobile_number"></ion-input>\n\n			</ion-item>\n\n		</ion-list>\n\n	</div>\n\n\n\n	<div class="your-services box-shadow form">\n\n		<h6>{{\'your_services\' | translate}}</h6>\n\n		<ion-list no-lines style="padding-bottom: 10px">\n\n			<ion-item *ngIf="categories">\n\n				<ion-label class="text-grey" floating>{{\'select_job_category\' | translate}}</ion-label>\n\n				<ion-select [(ngModel)]="profile.primary_category" [compareWith]="compareFn"\n\n					placeholder="Select category" multiple="false" [okText]="\'okay\' | translate"\n\n					[cancelText]="\'cancel\' | translate">\n\n					<ion-option *ngFor="let cat of categories" [value]="cat">{{cat.title}}</ion-option>\n\n				</ion-select>\n\n			</ion-item>\n\n		</ion-list>\n\n		<p *ngIf="subcategoriestext && subcategoriestext.length" (click)="selectservice()">\n\n			<span class="text-ellipsis">\n\n				{{subcategoriestext}}\n\n			</span>\n\n		</p>\n\n		<p *ngIf="!(subcategoriestext && subcategoriestext.length)" (click)="selectservice()">\n\n			<span class="text-ellipsis">\n\n				{{\'select_services_you_provides\' | translate}}\n\n			</span>\n\n			<ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n		</p>\n\n	</div>\n\n\n\n	<div class="your-services about box-shadow form">\n\n		<h6>{{\'charges_and_about\' | translate}}</h6>\n\n		<ion-list no-lines style="">\n\n			<ion-row>\n\n				<ion-col col-6>\n\n					<ion-item>\n\n						<ion-label class="text-grey" floating>{{\'your_charges\' | translate}}</ion-label>\n\n						<ion-input type="number" [(ngModel)]="profile.price"></ion-input>\n\n					</ion-item>\n\n				</ion-col>\n\n				<ion-col col-6>\n\n					<ion-item style="margin-top: 27px;">\n\n						<ion-label class="text-grey" floating>{{\'your_charges_in\' | translate}}</ion-label>\n\n						<ion-select [(ngModel)]="profile.price_type" [okText]="\'okay\' | translate"\n\n							[cancelText]="\'cancel\' | translate">\n\n							<ion-option value="hour">{{\'hour\' | translate}}</ion-option>\n\n							<ion-option value="visit">{{\'visit\' | translate}}</ion-option>\n\n						</ion-select>\n\n					</ion-item>\n\n				</ion-col>\n\n			</ion-row>\n\n			<ion-item>\n\n				<ion-label class="text-grey" floating>{{\'about_service_provider\' | translate}}</ion-label>\n\n				<ion-input placeholder="" [(ngModel)]="profile.about"></ion-input>\n\n			</ion-item>\n\n		</ion-list>\n\n	</div>\n\n\n\n	<div class="your-services your_location box-shadow form" (click)="pickLocation()">\n\n		<h6>\n\n			{{\'your_location\' | translate}}\n\n			<ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n		</h6>\n\n		<ion-label *ngIf="location">{{location.name}}</ion-label>\n\n		<ion-label *ngIf="!location">{{\'select_your_location\' | translate}}</ion-label>\n\n		<!--        <p><span class="text-ellipsis"></span></p>-->\n\n	</div>\n\n\n\n	<div class="verification box-shadow">\n\n		<!-- <h6>{{\'doc_verification\' | translate}}</h6> -->\n\n		<!--\n\n        <h2 *ngIf="profile.is_verified==1" class="text-green">\n\n            <small>{{\'status\' | translate}}</small>\n\n            {{\'verified_profile\' | translate}}\n\n        </h2>\n\n        <h2 *ngIf="profile.is_verified!=1" class="text-black">\n\n            <small>{{\'status\' | translate}}</small>\n\n            {{\'verification_pending\' | translate}}\n\n        </h2>\n\n        <h3 *ngIf="profile.is_verified!=1" class="text-thime">\n\n            <ion-icon name="md-download"></ion-icon>\n\n            <span>\n\n                {{\'upload_document\' | translate}}\n\n                <small class="text-ellipsis">\n\n                    {{\'upload_message\' | translate}}\n\n                </small>\n\n            </span>\n\n        </h3>\n\n-->\n\n\n\n		<!-- <h4 class="d-flex" (click)="pickPicker(2)">\n\n			<ion-icon class="zmdi zmdi-upload" text-start></ion-icon>\n\n			<span>\n\n				{{\'upload_document\' | translate}}\n\n				<small *ngIf="profile.document_url">{{\'document_uploaded\' | translate}}</small>\n\n			</span>\n\n\n\n			<span *ngIf="profile.is_verified==1" class="end">\n\n				<ion-icon class="zmdi zmdi-check-circle" text-start></ion-icon>\n\n				{{\'verified_profile\' | translate}}\n\n			</span>\n\n			<span *ngIf="profile.is_verified!=1" class="end">\n\n				 <ion-icon class="zmdi zmdi-check-circle" text-start></ion-icon> \n\n				{{\'verification_pending\' | translate}}\n\n			</span>\n\n		</h4> -->\n\n	</div>\n\n	<button class="btn" ion-button round full margin-top margin-bottom (click)="save()">\n\n		{{\'save\' | translate}}\n\n	</button>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\myprofile\myprofile.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_9__providers_firebase_service__["a" /* FirebaseClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_9__providers_firebase_service__["a" /* FirebaseClient */],
            __WEBPACK_IMPORTED_MODULE_11__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_15__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_13__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_14__ionic_native_crop__["a" /* Crop */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */]])
    ], MyprofilePage);
    return MyprofilePage;
}());

//# sourceMappingURL=myprofile.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var PrivacyPage = /** @class */ (function () {
    function PrivacyPage(config, navParam) {
        this.config = config;
        this.toShow = "";
        this.heading = "";
        this.toShow = navParam.get("toShow");
        this.heading = navParam.get("heading");
    }
    PrivacyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-privacy',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\privacy\privacy.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            {{heading}}\n        </ion-title>\n    </ion-navbar>\n    <div class="logo-box bg-thime">\n        <div class="logo">\n            <img src="assets/imgs/logo.png">\n            <!-- <h1 class="text-white">{{config.appName}}</h1> -->\n        </div>\n    </div>\n</ion-header>\n\n<ion-content>\n    <div class="text">\n        <!-- <h2 class="text-thime">{{\'our_privacy_policy\' | translate}}</h2> -->\n        <div [innerHTML]="toShow"></div>\n    </div>\n</ion-content>\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\privacy\privacy.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], PrivacyPage);
    return PrivacyPage;
}());

//# sourceMappingURL=privacy.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SigninPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__otp_otp__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__privacy_privacy__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_helper_models__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var SigninPage = /** @class */ (function () {
    function SigninPage(config, navCtrl, loadingCtrl, toastCtrl, alertCtrl, service, translate, google, platform, app, events) {
        this.config = config;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.translate = translate;
        this.google = google;
        this.platform = platform;
        this.app = app;
        this.events = events;
        this.loadingShown = false;
        this.getCountries();
        this.changeHint();
    }
    SigninPage.prototype.changeHint = function () {
        var _this = this;
        this.phoneNumber = "";
        if (this.countryCode && this.countryCode.length) {
            this.translate.get('enter_phone_number_exluding').subscribe(function (value) {
                _this.phoneNumberHint = value + " (+" + _this.countryCode + ")";
            });
        }
        else {
            this.translate.get('enter_phone_number').subscribe(function (value) {
                _this.phoneNumberHint = value;
            });
        }
    };
    SigninPage.prototype.getCountries = function () {
        var _this = this;
        this.service.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    SigninPage.prototype.privacy = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_9__models_helper_models__["a" /* Helper */].getSetting("terms");
        if (terms && terms.length) {
            this.translate.get('terms_conditions').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    SigninPage.prototype.alertPhone = function () {
        var _this = this;
        if (!this.countryCode || !this.countryCode.length) {
            this.translate.get("select_country").subscribe(function (value) { return _this.showToast(value); });
            return;
        }
        if (!this.phoneNumber || !this.phoneNumber.length) {
            this.showToast(this.phoneNumberHint);
            return;
        }
        this.translate.get(['alert_phone', 'no', 'yes']).subscribe(function (text) {
            _this.phoneNumberFull = "+" + _this.countryCode + _this.phoneNumber;
            var alert = _this.alertCtrl.create({
                title: _this.phoneNumberFull,
                message: text['alert_phone'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: text['yes'],
                        handler: function () {
                            _this.checkIfExists();
                        }
                    }]
            });
            alert.present();
        });
    };
    SigninPage.prototype.checkIfExists = function () {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
            _this.service.checkUser({ mobile_number: _this.phoneNumberFull, role: "provider" }).subscribe(function (res) {
                console.log(res);
                _this.dismissLoading();
                _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_6__otp_otp__["a" /* OtpPage */], { phoneNumberFull: _this.phoneNumberFull });
            }, function (err) {
                console.log(err);
                _this.dismissLoading();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */], { code: _this.countryCode, phone: _this.phoneNumber });
            });
        });
    };
    SigninPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SigninPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    SigninPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    SigninPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SigninPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signin',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\signin\signin.html"*/'<ion-content>\n\n    <div class="logo-box">\n\n        <div class="logo">\n\n            <img src="assets/imgs/logo.jpeg">\n\n            <!-- <h1 class="text-white">{{config.appName}}</h1> -->\n\n        </div>\n\n    </div>\n\n\n\n    <p class="text-grey" text-center>{{\'sign_in_or_sign_up_to_continue\' | translate}}</p>\n\n\n\n    <div class="form">\n\n        <ion-list inset padding-bottom>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-globe" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{\'select_country\' | translate}}</ion-label>\n\n                <ion-select [(ngModel)]="countryCode" multiple="false" class="text-thime" [okText]="\'okay\' | translate"\n\n                    [cancelText]="\'cancel\' | translate" (ionChange)="changeHint()">\n\n                    <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n\n                    </ion-option>\n\n                </ion-select>\n\n                <!-- <ion-icon name="ios-arrow-down-outline" item-end class="text-thime"></ion-icon> -->\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{phoneNumberHint}}</ion-label>\n\n                <ion-input (keyup.enter)="alertPhone()" [(ngModel)]="phoneNumber" type="tel"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n        <button class="btn" ion-button round full margin-top margin-bottom\n\n            (click)="alertPhone()">{{\'continue\' | translate}}</button>\n\n\n\n    </div>\n\n    <p class="text-grey" text-center (click)="privacy()">\n\n        <small>\n\n            {{\'by_signing_up\' | translate}}\n\n            <ins>{{\'terms_condition\' | translate}}</ins>\n\n        </small>\n\n    </p>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\signin\signin.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_google_plus__["a" /* GooglePlus */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], SigninPage);
    return SigninPage;
}());

//# sourceMappingURL=signin.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tabs_tabs__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OtpPage = /** @class */ (function () {
    function OtpPage(params, navCtrl, platform, alertCtrl, loadingCtrl, app, translate, toastCtrl, clientService, events) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.app = app;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.clientService = clientService;
        this.events = events;
        this.loadingShown = false;
        this.captchanotvarified = true;
        this.buttonDisabled = true;
        this.otp = '';
        this.captchaVerified = false;
        this.minutes = 0;
        this.seconds = 0;
        this.totalSeconds = 0;
        this.intervalCalled = false;
        this.resendCode = false;
        this.otpNotSent = true;
        this.phoneNumberFull = params.get('phoneNumberFull');
    }
    OtpPage.prototype.ionViewDidEnter = function () {
        if (!(this.platform.is('cordova'))) {
            this.makeCaptcha();
        }
        this.sendOTP();
    };
    OtpPage.prototype.loginUser = function (token) {
        var _this = this;
        this.translate.get('just_moment').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.clientService.login({ token: token, role: "provider" }).subscribe(function (res) {
            _this.dismissLoading();
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER, JSON.stringify(res.user));
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN, res.token);
            _this.events.publish('user:login');
            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
        }, function (err) {
            console.log(err);
            _this.dismissLoading();
            _this.presentErrorAlert((err && err.error && err.error.message && String(err.error.message).toLowerCase().includes("role")) ? "User exists with different role" : "Something went wrong");
        });
    };
    OtpPage.prototype.getUserToken = function (user) {
        var _this = this;
        user.getIdToken(false).then(function (res) {
            console.log('user_token_success', res);
            _this.loginUser(res);
        }).catch(function (err) {
            console.log('user_token_failure', err);
        });
    };
    OtpPage.prototype.sendOTP = function () {
        this.resendCode = false;
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.sendOtpPhone(this.phoneNumberFull);
        }
        else {
            this.sendOtpBrowser(this.phoneNumberFull);
        }
        if (this.intervalCalled) {
            clearInterval(this.timer);
        }
    };
    OtpPage.prototype.createTimer = function () {
        this.intervalCalled = true;
        this.totalSeconds--;
        if (this.totalSeconds == 0) {
            this.otpNotSent = true;
            this.resendCode = true;
            clearInterval(this.timer);
        }
        else {
            this.seconds = (this.totalSeconds % 60);
            if (this.totalSeconds >= this.seconds) {
                this.minutes = (this.totalSeconds - this.seconds) / 60;
            }
            else {
                this.minutes = 0;
            }
        }
    };
    OtpPage.prototype.createInterval = function () {
        var _this = this;
        this.totalSeconds = 120;
        this.createTimer();
        this.timer = setInterval(function () {
            _this.createTimer();
        }, 1000);
    };
    OtpPage.prototype.sendOtpPhone = function (phone) {
        var _this = this;
        this.translate.get('sending_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var component = this;
        window.FirebasePlugin.verifyPhoneNumber(phone, 60, function (credential) {
            console.log("verifyPhoneNumber", JSON.stringify(credential));
            component.verfificationId = credential.verificationId ? credential.verificationId : credential;
            // if instant verification is true use the code that we received from the firebase endpoint, otherwise ask user to input verificationCode:
            //var code = credential.instantVerification ? credential.code : inputField.value.toString();
            if (component.verfificationId) {
                if (credential.instantVerification && credential.code) {
                    component.otp = credential.code;
                    component.showToast("Verified automatically");
                    component.verifyOtpPhone();
                }
                else {
                    component.translate.get("sending_otp_success").subscribe(function (value) {
                        component.showToast(value);
                    });
                    component.otpNotSent = false;
                    component.createInterval();
                }
            }
            component.dismissLoading();
        }, function (error) {
            console.log("otp_send_fail", error);
            component.otpNotSent = true;
            component.resendCode = true;
            component.dismissLoading();
            component.translate.get('otp_send_fail').subscribe(function (value) {
                component.showToast(value);
            });
        });
    };
    OtpPage.prototype.sendOtpBrowser = function (phone) {
        var component = this;
        this.dismissLoading();
        this.presentLoading("Sending otp");
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().signInWithPhoneNumber(phone, this.recaptchaVerifier).then(function (confirmationResult) {
            console.log("otp_send_success", confirmationResult);
            component.otpNotSent = false;
            component.result = confirmationResult;
            component.dismissLoading();
            component.showToast("OTP Sent");
            if (component.intervalCalled) {
                clearInterval(component.timer);
            }
            component.createInterval();
        }).catch(function (error) {
            console.log("otp_send_fail", error);
            component.resendCode = true;
            component.dismissLoading();
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("OTP Sending failed");
            }
        });
    };
    OtpPage.prototype.verify = function () {
        this.otpNotSent = true;
        if (this.platform.is('cordova')) {
            this.verifyOtpPhone();
        }
        else {
            this.verifyOtpBrowser();
        }
    };
    OtpPage.prototype.verifyOtpPhone = function () {
        var _this = this;
        var credential = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"].PhoneAuthProvider.credential(this.verfificationId, this.otp);
        this.translate.get('verifying_otp').subscribe(function (value) {
            _this.presentLoading(value);
        });
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().signInAndRetrieveDataWithCredential(credential).then(function (info) {
            console.log('otp_verify_success', info);
            _this.dismissLoading();
            _this.translate.get('verifying_otp_success').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.getUserToken(info.user);
        }, function (error) {
            console.log('otp_verify_fail', error);
            _this.translate.get('verifying_otp_fail').subscribe(function (value) {
                _this.showToast(value);
            });
            _this.dismissLoading();
        });
    };
    OtpPage.prototype.verifyOtpBrowser = function () {
        var component = this;
        this.presentLoading("Verifying otp");
        this.result.confirm(this.otp).then(function (response) {
            console.log('otp_verify_success', response);
            component.dismissLoading();
            component.showToast("OTP Verified");
            component.getUserToken(response.user);
        }).catch(function (error) {
            console.log('otp_verify_fail', error);
            if (error.message) {
                component.showToast(error.message);
            }
            else {
                component.showToast("OTP Verification failed");
            }
            component.dismissLoading();
        });
    };
    OtpPage.prototype.makeCaptcha = function () {
        var component = this;
        this.recaptchaVerifier = new __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"].RecaptchaVerifier('recaptcha-container', {
            // 'size': 'normal',
            'size': 'invisible',
            'callback': function (response) {
                component.captchanotvarified = true;
                // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        });
        this.recaptchaVerifier.render();
    };
    OtpPage.prototype.tabs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__tabs_tabs__["a" /* TabsPage */]);
    };
    OtpPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    OtpPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    OtpPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    OtpPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    OtpPage.prototype.makeExitAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'App termination',
            message: 'Do you want to close the app?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Application exit prevented!');
                    }
                }, {
                    text: 'Close App',
                    handler: function () {
                        _this.platform.exitApp(); // Close this application
                    }
                }]
        });
        alert.present();
    };
    OtpPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otp',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\otp\otp.html"*/'<ion-header class="bg-transparent">\n    <ion-navbar>\n        <ion-title><span>{{"otp_verification" | translate}}</span></ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div id="recaptcha-container"></div>\n    <h1 text-center>{{\'verification_code\' | translate}}<small>{{\'please_type_the_verification_code\' | translate}} <br>\n            {{\'sent_to\' | translate}} {{phoneNumberFull}}</small></h1>\n\n    <div class="form">\n        <ion-input type="number" placeholder="{{\'enter_otp\' | translate}}" [(ngModel)]="otp"></ion-input>\n        <button ion-button round full class="btn" (click)="verify()">\n            {{\'confirm\' | translate}}\n        </button>\n        <p text-center>\n            {{\'dint_received_code\' | translate}}\n            <strong (click)="sendOTP()">\n                {{\'resend_now\' | translate}}\n            </strong>\n        </p>\n    </div>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\otp\otp.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], OtpPage);
    return OtpPage;
}());

//# sourceMappingURL=otp.js.map

/***/ }),

/***/ 13:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_concatMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};









var ClientService = /** @class */ (function () {
    function ClientService(config, http) {
        this.config = config;
        this.http = http;
    }
    ClientService.prototype.getCountries = function () {
        return this.http.get('./assets/json/countries.json').concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getSettings = function () {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.get(this.config.apiBase + "api/settings", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.forgetPassword = function (resetRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/forgot-password", JSON.stringify(resetRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.login = function (loginTokenRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/login", JSON.stringify(loginTokenRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.loginSocial = function (socialLoginRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/social/login", socialLoginRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.signUp = function (signUpRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/register", JSON.stringify(signUpRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.verifyMobile = function (verifyRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/verify-mobile", JSON.stringify(verifyRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.checkUser = function (checkUserRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        return this.http.post(this.config.apiBase + "api/check-user", JSON.stringify(checkUserRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.updateProfile = function (token, profileRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.put(this.config.apiBase + "api/provider/profile", JSON.stringify(profileRequest), { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.plans = function (token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/provider/plans", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.planPurchase = function (adminToken, planId, token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + adminToken });
        return this.http.post(this.config.apiBase + 'api/provider/plans/' + planId + '/payment/stripe', { token: token }, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.planDetails = function (adminToken) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + adminToken });
        return this.http.get(this.config.apiBase + "api/provider/plan-details", { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            data.remaining_days_count = 0;
            if (data.subscription) {
                var dateStart = __WEBPACK_IMPORTED_MODULE_8_moment___default()(data.subscription.starts_on).toDate();
                var dateEnd = __WEBPACK_IMPORTED_MODULE_8_moment___default()(data.subscription.expires_on).toDate();
                var dateNow = new Date();
                data.remaining_days_count = dateNow > dateEnd ? 0 : Math.round((dateEnd.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
                data.starts_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatMillisDate(dateStart.getTime(), locale);
                data.ends_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatMillisDate(dateEnd.getTime(), locale);
            }
            if (!data.leads_remaining_for_today)
                data.leads_remaining_for_today = 0;
            data.leads_remaining_for_today = Number(data.leads_remaining_for_today.toFixed(2));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.categoryParent = function (token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/category", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.categoryChildren = function (token, parentId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/category?category_id=" + parentId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getProfile = function (token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/provider/profile", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getRatings = function (token, userId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/customer/providers/" + userId + "/rating-summary", { headers: myHeaders }).concatMap(function (data) {
            data.average_rating = Number(data.average_rating).toFixed(2);
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getMyReviews = function (token, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/provider/ratings/?page=" + pageNo, { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var review = _a[_i];
                review.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDate(review.created_at, locale);
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.getMyPortfolio = function (token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/provider/portfolio", { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.addMyPortfolio = function (token, folioBody) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.config.apiBase + "api/provider/portfolio", folioBody, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.deleteMyPortfolio = function (token, folioId) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.delete(this.config.apiBase + "api/provider/portfolio/" + folioId, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.submitSupport = function (token, supportRequest) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.config.apiBase + "api/support", supportRequest, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.appointments = function (token, pageNo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.get(this.config.apiBase + "api/provider/appointment?page=" + pageNo, { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            for (var _i = 0, _a = data.data; _i < _a.length; _i++) {
                var ap = _a[_i];
                ap.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(ap.created_at, locale);
                ap.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(ap.updated_at, locale);
                for (var _b = 0, _c = ap.logs; _b < _c.length; _b++) {
                    var log = _c[_b];
                    log.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.updated_at, locale);
                    log.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.created_at, locale);
                }
                ap.date = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDate(ap.date, locale);
                ap.time_from = ap.time_from.substr(0, ap.time_from.lastIndexOf(":"));
                ap.time_to = ap.time_to.substr(0, ap.time_to.lastIndexOf(":"));
            }
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.appointmentUpdate = function (token, apId, status) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.put(this.config.apiBase + "api/provider/appointment/" + apId, { status: status }, { headers: myHeaders }).concatMap(function (data) {
            var locale = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].getLocale();
            data.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(data.updated_at, locale);
            data.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(data.created_at, locale);
            for (var _i = 0, _a = data.logs; _i < _a.length; _i++) {
                var log = _a[_i];
                log.updated_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.updated_at, locale);
                log.created_at = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDateTime(log.created_at, locale);
            }
            data.date = __WEBPACK_IMPORTED_MODULE_7__models_helper_models__["a" /* Helper */].formatTimestampDate(data.date, locale);
            data.time_from = data.time_from.substr(0, data.time_from.lastIndexOf(":"));
            data.time_to = data.time_to.substr(0, data.time_to.lastIndexOf(":"));
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.updateUser = function (token, requestBody) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.put(this.config.apiBase + "api/user", requestBody, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.logActivity = function (token) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.config.apiBase + 'api/activity-log', {}, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.faqs = function () {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        return this.http.get(this.config.apiBase + 'api/faq-help', { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService.prototype.postNotification = function (token, roleTo, userIdTo) {
        var myHeaders = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpHeaders */]({ 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
        return this.http.post(this.config.apiBase + 'api/user/push-notification', { role: roleTo, user_id: userIdTo }, { headers: myHeaders }).concatMap(function (data) {
            return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].of(data);
        });
    };
    ClientService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_6__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ClientService);
    return ClientService;
}());

//# sourceMappingURL=client.service.js.map

/***/ }),

/***/ 141:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 141;

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 185;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Helper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);


var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getChatChild = function (userId, myId) {
        //example: userId="9" and myId="5" -->> chat child = "5-9"
        var values = [userId, myId];
        values.sort(function (one, two) { return (one > two ? -1 : 1); });
        return values[0] + "-" + values[1];
    };
    Helper.getLocale = function () {
        var sl = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].KEY_LOCALE);
        return sl && sl.length ? sl : "en";
    };
    Helper.formatMillisDateTime = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("ddd, MMM D, h:mm");
    };
    Helper.formatTimestampDateTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("ddd, MMM D, h:mm");
    };
    Helper.formatMillisDate = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("DD MMM YYYY");
    };
    Helper.formatTimestampDate = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("DD MMM YYYY");
    };
    Helper.formatMillisTime = function (millis, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(millis).locale(locale).format("h:mm");
    };
    Helper.formatTimestampTime = function (timestamp, locale) {
        return __WEBPACK_IMPORTED_MODULE_1_moment___default()(timestamp).locale(locale).format("h:mm");
    };
    Helper.getSetting = function (settingKey) {
        var settings = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_0__constants_models__["a" /* Constants */].KEY_SETTING));
        var toReturn;
        if (settings) {
            for (var _i = 0, settings_1 = settings; _i < settings_1.length; _i++) {
                var s = settings_1[_i];
                if (s.key == settingKey) {
                    toReturn = s.value;
                    break;
                }
            }
        }
        if (!toReturn)
            toReturn = "";
        return toReturn;
    };
    Helper.getLogTimeForStatus = function (status, logs) {
        var toReturn = "";
        if (status && logs) {
            for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                var log = logs_1[_i];
                if (log.status == status) {
                    toReturn = log.created_at;
                    break;
                }
            }
        }
        return toReturn;
    };
    Helper.isValidURL = function (string) {
        if (!string)
            return false;
        if (!(string.startsWith("http://") || string.startsWith("https://")))
            return false;
        var res = string.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        return res != null;
    };
    return Helper;
}());

//# sourceMappingURL=helper.models.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return BaseAppConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* InjectionToken */]("app.config");
var BaseAppConfig = {
    appName: "Sahayi Provider",
    stripeKey: "",
    apiBase: "https://sahayi.app/sahayi/handyman/public/",
    googleApiKey: "AIzaSyDzMnF5al4CDKkNY-7y4xnnxlhRpEzA7Wk",
    oneSignalAppId: "e6c02420-f140-4bcb-850c-6ee21625501e",
    oneSignalGPSenderId: "533579646154",
    availableLanguages: [{
            code: 'en',
            name: 'English'
        }, {
            code: 'ar',
            name: 'عربى'
        }],
    firebaseConfig: {
        webApplicationId: "1:1032372413215:web:c6790ab8a40a872a18862a",
        apiKey: "AIzaSyBjrfusj1lGXJdhM-5YVkhcTMcz4V1Z2Bg",
        authDomain: "sahayiapp-18c8c.firebaseapp.com",
        databaseURL: "https://sahayiapp-18c8c.firebaseio.com",
        projectId: "sahayiapp-18c8c",
        storageBucket: "sahayiapp-18c8c.appspot.com",
        messagingSenderId: "1032372413215",
    },
};
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__booking_booking__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RequestsPage = /** @class */ (function () {
    function RequestsPage(navCtrl, service, loadingCtrl, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.requests = "upcoming";
        this.loadingShown = false;
        this.pageNo = 1;
        this.allDone = false;
        this.subscriptions = [];
        this.toShow = [];
        this.upcoming = [];
        this.complete = [];
        // this.translate.get('loading_requests').subscribe(value => {
        //   this.presentLoading(value);
        // });
        this.loadRequests();
        events.subscribe("refresh:appointments", function () {
            _this.pageNo = 1;
            _this.upcoming = new Array();
            _this.complete = new Array();
            _this.loadRequests();
        });
    }
    RequestsPage.prototype.onSegmentChange = function () {
        var _this = this;
        setTimeout(function () {
            _this.toShow = _this.requests == "upcoming" ? _this.upcoming : _this.complete;
        }, 100);
    };
    RequestsPage.prototype.doRefresh = function (refresher) {
        if (this.isLoading)
            refresher.complete();
        this.refresher = refresher;
        this.pageNo = 1;
        this.upcoming = new Array();
        this.complete = new Array();
        this.loadRequests();
    };
    RequestsPage.prototype.loadRequests = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.appointments(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.pageNo).subscribe(function (res) {
            var appointments = res.data;
            _this.allDone = (!appointments || !appointments.length);
            _this.dismissLoading();
            var upcoming = new Array();
            var complete = new Array();
            for (var _i = 0, appointments_1 = appointments; _i < appointments_1.length; _i++) {
                var ap = appointments_1[_i];
                if (ap.status == 'complete' || ap.status == 'rejected' || ap.status == 'cancelled')
                    complete.push(ap);
                else
                    upcoming.push(ap);
            }
            if (upcoming.length || complete.length) {
                _this.upcoming = _this.upcoming.concat(upcoming);
                _this.complete = _this.complete.concat(complete);
                _this.onSegmentChange();
            }
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            if (_this.refresher)
                _this.refresher.complete();
        }, function (err) {
            console.log('appointments', err);
            _this.dismissLoading();
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            if (_this.refresher)
                _this.refresher.complete();
        });
        this.subscriptions.push(subscription);
    };
    RequestsPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        if (!this.allDone) {
            this.pageNo = this.pageNo + 1;
            this.loadRequests();
        }
        else {
            infiniteScroll.complete();
        }
    };
    RequestsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    RequestsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    RequestsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    RequestsPage.prototype.requestDetail = function (appointment) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__booking_booking__["a" /* BookingPage */], { appointment: appointment });
    };
    RequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-requests',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\requests\requests.html"*/'<ion-header class="bg-thime">\n\n    <ion-navbar>\n\n        <ion-title>{{\'requests\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n    <ion-segment [(ngModel)]="requests" (ionChange)="onSegmentChange()">\n\n        <ion-segment-button value="upcoming">\n\n            {{\'upcoming\' | translate}}\n\n        </ion-segment-button>\n\n        <ion-segment-button value="completed">\n\n            {{\'completed\' | translate}}\n\n        </ion-segment-button>\n\n    </ion-segment>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n\n        <ion-refresher-content pullingIcon="arrow-dropdown" pullingText="{{\'pull_refresh\' | translate}}"\n\n            refreshingSpinner="circles" refreshingText="{{\'refreshing\' | translate}}">\n\n        </ion-refresher-content>\n\n    </ion-refresher>\n\n    <div class="empty-view" *ngIf="!loadingShown && (!toShow || !toShow.length)">\n\n        <div style="text-align:center">\n\n            <img src="assets/imgs/empty_appointment.png" alt="no offers" />\n\n            <span style="color:#9E9E9E; font-weight:bold;">{{\'no_requests_to_show\' | translate}}</span>\n\n        </div>\n\n    </div>\n\n    <div>\n\n        <ion-list no-lines>\n\n            <ion-item *ngFor="let ap of toShow"\n\n                [ngClass]="(ap.status == \'complete\' || ap.status == \'rejected\' || ap.status == \'cancelled\') ? \'accepted\' : \'upcoming\'"\n\n                (click)="requestDetail(ap)">\n\n                <ion-avatar item-start>\n\n                    <img *ngIf="ap.user && ap.user.image_url" data-src="{{ap.user.image_url}}">\n\n                    <img *ngIf="!ap.user || !ap.user.image_url" src="assets/imgs/empty_dp.png">\n\n                </ion-avatar>\n\n                <h2>\n\n                    <span class="text-ellipsis">{{ap.user.name}} </span>\n\n                    <span class="ml-auto text-ellipsis">{{ap.date}}, {{ap.time_from}}-{{ap.time_to}}</span>\n\n                </h2>\n\n                <p class="text-grey text-ellipsis">\n\n                    <span *ngIf="ap.category" class="text-ellipsis">{{ap.category.title}}</span>\n\n                    <span class="ml-auto">{{\'view_order\' | translate}}</span>\n\n                </p>\n\n            </ion-item>\n\n        </ion-list>\n\n        <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n\n            <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n        </ion-infinite-scroll>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\requests\requests.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], RequestsPage);
    return RequestsPage;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BookingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_chat_models__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_my_location_models__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase_app__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var BookingPage = /** @class */ (function () {
    function BookingPage(navCtrl, navParam, service, events, loadingCtrl, geolocation, callNumber, translate, diagnostic, alertCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.geolocation = geolocation;
        this.callNumber = callNumber;
        this.translate = translate;
        this.diagnostic = diagnostic;
        this.alertCtrl = alertCtrl;
        this.isLoading = false;
        this.loadingShown = false;
        this.statusLevel = 1;
        this.statusText = "Job Pending";
        this.subscriptions = [];
        this.appointment = navParam.get("appointment");
        this.setStatus();
        console.log("logs", this.appointment.logs);
    }
    ;
    BookingPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        if (this.geoSubscription) {
            this.geoSubscription.unsubscribe();
            this.geoSubscription = null;
        }
        this.dismissLoading();
    };
    BookingPage.prototype.ionViewDidEnter = function () {
        if (status == "onway") {
            this.checkAndWatchLocation();
        }
        else if (this.geoSubscription) {
            this.geoSubscription.unsubscribe();
            this.geoSubscription = null;
        }
    };
    BookingPage.prototype.updateJobStatus = function (status) {
        var _this = this;
        if (status == "onway") {
            this.checkAndWatchLocation();
        }
        else if (this.geoSubscription) {
            this.geoSubscription.unsubscribe();
            this.geoSubscription = null;
        }
        this.translate.get('updating').subscribe(function (value) {
            _this.presentLoading(value);
        });
        var subscription = this.service.appointmentUpdate(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.appointment.id, status).subscribe(function (res) {
            _this.dismissLoading();
            _this.appointment = res;
            _this.setStatus();
            _this.events.publish("refresh:appointments");
        }, function (err) {
            console.log('update_status', err);
            _this.dismissLoading();
            if (err && err.status && err.status == 403) {
                _this.translate.get(['err_quota_title', 'err_quota_message']).subscribe(function (text) {
                    _this.presentErrorAlert(text['err_quota_title'], text['err_quota_message']);
                });
            }
        });
        this.subscriptions.push(subscription);
    };
    BookingPage.prototype.checkAndWatchLocation = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (isAvailable) {
            if (isAvailable) {
                _this.watchLocation();
            }
            else {
                _this.alertLocationServices();
            }
        }).catch(function (e) {
            console.error(e);
            _this.alertLocationServices();
        });
    };
    BookingPage.prototype.navigate = function () {
        if (this.appointment.address.latitude && this.appointment.address.longitude)
            window.open("http://maps.google.com/maps?q=loc:" + this.appointment.address.latitude + "," + this.appointment.address.longitude + " (Appointment)", "_system");
    };
    BookingPage.prototype.setStatus = function () {
        var _this = this;
        if (this.appointment) {
            switch (this.appointment.status) {
                case "pending": {
                    this.statusLevel = 1;
                    this.translate.get('updating').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "accepted": {
                    this.statusLevel = 1;
                    this.translate.get('job_accepted').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "onway": {
                    this.statusLevel = 2;
                    this.translate.get('job_goingto').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "ongoing": {
                    this.statusLevel = 2;
                    this.translate.get('job_ongoing').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "complete": {
                    this.statusLevel = 3;
                    this.translate.get('job_complete').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "cancelled": {
                    this.statusLevel = 1;
                    this.translate.get('job_cancelled').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
                case "rejected": {
                    this.statusLevel = 1;
                    this.translate.get('job_rejected').subscribe(function (value) {
                        _this.statusText = value;
                    });
                    break;
                }
            }
            var acceptedTime_1 = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLogTimeForStatus("accepted", this.appointment.logs);
            if (acceptedTime_1 && acceptedTime_1.length) {
                this.translate.get('job_accepted_on').subscribe(function (value) {
                    _this.statusLevel1Time = value + acceptedTime_1;
                });
            }
            if (!this.statusLevel1Time || !this.statusLevel1Time.length) {
                if (this.appointment.status == "cancelled") {
                    this.translate.get('job_cancelled_on').subscribe(function (value) {
                        _this.statusLevel1Time = value + __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].formatTimestampDateTime(_this.appointment.updated_at, __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLocale());
                    });
                }
                else if (this.appointment.status == "rejected") {
                    this.translate.get('job_rejected_on').subscribe(function (value) {
                        _this.statusLevel1Time = value + __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].formatTimestampDateTime(_this.appointment.updated_at, __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLocale());
                    });
                }
                else {
                    this.statusLevel1Time = this.appointment.updated_at;
                }
            }
            this.translate.get('job_started_on').subscribe(function (value) {
                var onwaytime = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLogTimeForStatus("onway", _this.appointment.logs);
                if (onwaytime && onwaytime.length) {
                    _this.statusLevel2Time = value + onwaytime;
                }
                else {
                    _this.statusLevel2Time = value + __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLogTimeForStatus("ongoing", _this.appointment.logs);
                }
            });
            this.translate.get('job_completed_on').subscribe(function (value) {
                _this.statusLevel3Time = value + __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getLogTimeForStatus("complete", _this.appointment.logs);
            });
            console.log(this.appointment.logs);
        }
    };
    BookingPage.prototype.callUser = function () {
        this.callNumber.callNumber(this.appointment.user.mobile_number, true).then(function (res) { return console.log('Launched dialer!', res); }).catch(function (err) { return console.log('Error launching dialer', err); });
    };
    BookingPage.prototype.chatscreen = function () {
        var newUserMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER));
        var chat = new __WEBPACK_IMPORTED_MODULE_5__models_chat_models__["a" /* Chat */]();
        chat.chatId = this.appointment.user.id + "hc";
        chat.chatImage = (this.appointment.user.image_url && this.appointment.user.image_url.length) ? this.appointment.user.image_url : "assets/imgs/empty_dp.png";
        chat.chatName = this.appointment.user.name;
        chat.chatStatus = this.appointment.user.email;
        chat.myId = newUserMe.id + "hp";
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__["a" /* ChatscreenPage */], { chat: chat });
    };
    BookingPage.prototype.watchLocation = function () {
        var _this = this;
        this.geoSubscription = this.geolocation.watchPosition().subscribe(function (position) {
            if (position.coords != undefined) {
                var geoposition = position;
                console.log('Latitude: ' + geoposition.coords.latitude + ' - Longitude: ' + geoposition.coords.longitude);
                var location_1 = new __WEBPACK_IMPORTED_MODULE_10__models_my_location_models__["a" /* MyLocation */]();
                location_1.name = "Current location";
                location_1.lat = String(geoposition.coords.latitude);
                location_1.lng = String(geoposition.coords.longitude);
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION, JSON.stringify(location_1));
                var refLocation = __WEBPACK_IMPORTED_MODULE_12_firebase_app__["database"]().ref().child("handyman_provider").child(String(_this.appointment.provider.user_id));
                refLocation.set(location_1, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            else {
                var positionError = position;
                console.log('Error ' + positionError.code + ': ' + positionError.message);
            }
        });
    };
    BookingPage.prototype.alertLocationServices = function () {
        var _this = this;
        this.translate.get(['location_services_title', 'location_services_message', 'okay']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['location_services_title'],
                subTitle: text['location_services_message'],
                buttons: [{
                        text: text['okay'],
                        role: 'cancel',
                        handler: function () {
                            console.log('okay clicked');
                        }
                    }]
            });
            alert.present();
        });
    };
    BookingPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    BookingPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    BookingPage.prototype.presentErrorAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    BookingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-booking',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\booking\booking.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'job_detail\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n    <ion-list class="profile">\n\n        <ion-item>\n\n            <ion-avatar item-start>\n\n                <img *ngIf="appointment.user && appointment.user.image_url" data-src="{{appointment.user.image_url}}">\n\n                <img *ngIf="!appointment.user || !appointment.user.image_url" src="assets/imgs/empty_dp.png">\n\n            </ion-avatar>\n\n            <h2 class="d-flex">\n\n                <strong class="text-ellipsis">{{appointment.user.name}}</strong>\n\n                <span class="end">\n\n                    <ion-icon name="md-call" class="text-thime" text-start (click)="callUser()" ></ion-icon>\n\n                    <ion-icon name="md-text" class="text-thime" text-end (click)="chatscreen()"></ion-icon>\n\n                </span>\n\n            </h2>\n\n            <div class="details">\n\n                <p *ngIf="appointment.category" class="">\n\n                    <small>{{\'job_task\' | translate}}</small>\n\n                    <span class="text-ellipsis">{{appointment.category.title}}</span>\n\n                </p>\n\n                <ion-row>\n\n                    <ion-col col-6>\n\n                        <p class="">\n\n                            <small>{{\'date\' | translate}}</small>\n\n                            <span class="text-ellipsis">\n\n                                {{appointment.date}}\n\n                            </span>\n\n                        </p>\n\n                    </ion-col>\n\n                    <ion-col col-6>\n\n                        <p class="job-fess">\n\n                            <small>{{\'time\' | translate}}</small>\n\n                            <span class="text-ellipsis">\n\n                                {{appointment.time_from}}-{{appointment.time_to}}\n\n                            </span>\n\n                        </p>\n\n                    </ion-col>\n\n                </ion-row>\n\n                <div class="location" (click)="navigate()">\n\n                    <p *ngIf="appointment.address" class="job-fess">\n\n                        <small>{{\'address\' | translate}}</small>\n\n                        <span class="">{{appointment.address.address}}</span>\n\n                    </p>\n\n                    <ion-icon name="md-navigate" class="text-thime"></ion-icon>\n\n                </div>\n\n                <p *ngIf="appointment.notes && appointment.notes.length" class="job-fess">\n\n                    <small>{{\'appointment_notes\' | translate}}</small>\n\n                    <span class="">{{appointment.notes}}</span>\n\n                </p>\n\n            </div>\n\n        </ion-item>\n\n    </ion-list>\n\n    <div class="btn-container">\n\n        <ion-row *ngIf="appointment.status==\'pending\'">\n\n            <ion-col col-6>\n\n                <button ion-button icon-start full class="" (click)="updateJobStatus(\'rejected\')">\n\n                    <ion-icon name="md-close"></ion-icon>{{\'cancel_job\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col col-6>\n\n                <button ion-button icon-start full class="text-green" (click)="updateJobStatus(\'accepted\')">\n\n                    <ion-icon class="zmdi zmdi-check-circle"></ion-icon>{{\'accept_job\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row\n\n            *ngIf="appointment.status==\'rejected\' || appointment.status==\'cancelled\' || appointment.status==\'complete\'">\n\n            <ion-col *ngIf="appointment.status==\'rejected\'">\n\n                <button ion-button icon-start full class="">\n\n                    <ion-icon class="zmdi zmdi-close"></ion-icon>{{\'job_rejected\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col *ngIf="appointment.status==\'cancelled\'">\n\n                <button ion-button icon-start full class="">\n\n                    <ion-icon class="zmdi zmdi-close"></ion-icon>{{\'job_cancelled\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col *ngIf="appointment.status==\'complete\'">\n\n                <button ion-button icon-start full class="text-green">\n\n                    <ion-icon name="ios-checkmark-circle"></ion-icon>{{\'job_completed\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n        <ion-row *ngIf="appointment.status==\'accepted\' || appointment.status==\'onway\' || appointment.status==\'ongoing\'">\n\n            <ion-col *ngIf="appointment.status==\'accepted\'">\n\n                <button ion-button icon-start full class="text-green" (click)="updateJobStatus(\'onway\')">\n\n                    <ion-icon class="zmdi zmdi-bike"></ion-icon>{{\'gofor_job\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col *ngIf="appointment.status==\'onway\'">\n\n                <button ion-button icon-start full class="text-green" (click)="updateJobStatus(\'ongoing\')">\n\n                    <ion-icon class="zmdi zmdi-wrench"></ion-icon>{{\'start_job\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n            <ion-col *ngIf="appointment.status==\'ongoing\'" (click)="updateJobStatus(\'complete\')">\n\n                <button ion-button icon-start full class="text-green">\n\n                    <ion-icon class="zmdi zmdi-thumb-up"></ion-icon>{{\'mark_job_complete\' | translate}}\n\n                </button>\n\n            </ion-col>\n\n        </ion-row>\n\n    </div>\n\n    <div class="job-status">\n\n        <h2>{{\'job_status\' | translate}}</h2>\n\n        <ion-list no-lines>\n\n            <ion-item [ngClass]="statusLevel==1 ? \'active\' : \'disable\'">\n\n                <span item-start class="circle"></span>\n\n                <div class="text">\n\n                    <h4 class="text-ellipsis">{{\'job_\'+appointment.status | translate}}\n\n                        <small *ngIf="statusLevel1Time">{{statusLevel1Time}}</small>\n\n                    </h4>\n\n                </div>\n\n            </ion-item>\n\n            <ion-item [ngClass]="statusLevel==2 ? \'active\' : \'disable\'">\n\n                <span item-start class="circle"></span>\n\n                <div class="text">\n\n                    <h4 class="text-ellipsis">{{\'job_in_process\' | translate}}\n\n                        <small *ngIf="statusLevel2Time">{{statusLevel2Time}}</small>\n\n                    </h4>\n\n                </div>\n\n            </ion-item>\n\n            <ion-item [ngClass]="statusLevel==3 ? \'active\' : \'disable\'">\n\n                <span item-start class="circle"></span>\n\n                <div class="text">\n\n                    <h4 class="text-ellipsis">{{\'job_complete\' | translate}}\n\n                        <small *ngIf="statusLevel3Time">{{statusLevel3Time}}</small>\n\n                    </h4>\n\n                </div>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\booking\booking.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], BookingPage);
    return BookingPage;
}());

//# sourceMappingURL=booking.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chat; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(21);

var Chat = /** @class */ (function () {
    function Chat() {
    }
    Chat.fromMessage = function (msg, isMeSender) {
        var chat = new Chat();
        chat.chatId = isMeSender ? msg.recipientId : msg.senderId;
        chat.myId = isMeSender ? msg.senderId : msg.recipientId;
        chat.chatName = isMeSender ? msg.recipientName : msg.senderName;
        chat.chatImage = isMeSender ? msg.recipientImage : msg.senderImage;
        chat.chatStatus = isMeSender ? msg.recipientStatus : msg.senderStatus;
        chat.dateTimeStamp = msg.dateTimeStamp;
        chat.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(chat.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        chat.lastMessage = msg.body;
        return chat;
    };
    return Chat;
}());

//# sourceMappingURL=chat.models.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_helper_models__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationsPage = /** @class */ (function () {
    function NotificationsPage() {
        this.notifications = new Array();
    }
    NotificationsPage.prototype.ionViewDidEnter = function () {
        var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_1__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
        if (notifications && notifications.length) {
            var locale = __WEBPACK_IMPORTED_MODULE_2__models_helper_models__["a" /* Helper */].getLocale();
            for (var _i = 0, notifications_1 = notifications; _i < notifications_1.length; _i++) {
                var noti = notifications_1[_i];
                noti.time = __WEBPACK_IMPORTED_MODULE_2__models_helper_models__["a" /* Helper */].formatMillisDate(Number(noti.time), locale);
                if (noti.title.toLowerCase().includes("pending")) {
                    //noti.title = "Pending";
                }
                else if (noti.title.toLowerCase().includes("accepted")) {
                    //noti.title = "Accepted";
                    noti.colorclass = "completed";
                }
                else if (noti.title.toLowerCase().includes("onway")) {
                    //noti.title = "On the way";
                }
                else if (noti.title.toLowerCase().includes("ongoing")) {
                    //noti.title = "On going";
                }
                else if (noti.title.toLowerCase().includes("complete")) {
                    //noti.title = "Complete";
                    noti.colorclass = "completed";
                }
                else if (noti.title.toLowerCase().includes("cancelled")) {
                    //noti.title = "Cancelled";
                    noti.colorclass = "cancelled";
                }
                else if (noti.title.toLowerCase().includes("rejected")) {
                    //noti.title = "Rejected";
                    noti.colorclass = "cancelled";
                }
                else if (noti.title.toLowerCase().includes("message")) {
                    //noti.title = "New Message";
                    noti.colorclass = "new_message";
                }
            }
            this.notifications = notifications.reverse();
        }
    };
    NotificationsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-notifications',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\notifications\notifications.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>{{\'notifications\' | translate}}</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n	<div class="empty-view" *ngIf="(!notifications || !notifications.length)">\n\n		<div style="text-align:center">\n\n			<img src="assets/imgs/empty_notification.png" alt="no offers" />\n\n			<span style="color:#9E9E9E; font-weight:bold;">\n\n				{{\'empty_notifications\' | translate}}\n\n			</span>\n\n		</div>\n\n	</div>\n\n	<ion-list *ngIf="notifications && notifications.length" no-lines>\n\n		<ion-item *ngFor="let item of notifications">\n\n			<ion-label>\n\n				<h2 class="d-flex"><span class="item_title {{item.colorclass}}">{{item.title}}</span> <span class="end" text-end>{{item.time}}</span></h2>\n\n				<p>{{item.detail}}</p>\n\n			</ion-label>\n\n		</ion-item>\n\n	</ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\notifications\notifications.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], NotificationsPage);
    return NotificationsPage;
}());

//# sourceMappingURL=notifications.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__allreview_allreview__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_rating_models__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_rating_summary_models__ = __webpack_require__(365);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ReviewPage = /** @class */ (function () {
    function ReviewPage(navCtrl, service) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.rating = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_RATING_SUMMARY));
        if (!this.rating)
            this.rating = __WEBPACK_IMPORTED_MODULE_5__models_rating_models__["a" /* Rating */].getDefault();
    }
    ReviewPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.profileMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_PROFILE));
            if (_this.profileMe) {
                _this.service.getRatings(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), _this.profileMe.id).subscribe(function (res) {
                    var ratingSummaries = __WEBPACK_IMPORTED_MODULE_6__models_rating_summary_models__["a" /* RatingSummary */].defaultArray();
                    for (var _i = 0, _a = res.summary; _i < _a.length; _i++) {
                        var ratingSummaryResult = _a[_i];
                        ratingSummaries[ratingSummaryResult.rounded_rating - 1].total = ratingSummaryResult.total;
                        ratingSummaries[ratingSummaryResult.rounded_rating - 1].percent = ((ratingSummaryResult.total / res.total_ratings) * 100);
                    }
                    res.summary = ratingSummaries;
                    _this.rating = res;
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_RATING_SUMMARY, JSON.stringify(res));
                }, function (err) {
                    console.log('rating_err', err);
                });
            }
        }, 1000);
    };
    ReviewPage.prototype.allreview = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__allreview_allreview__["a" /* AllreviewPage */]);
    };
    ReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-review',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\review\review.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'reviews\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <div *ngIf="rating" class="rating-box bg-thime">\n        <h6 class="text-white" text-center>{{\'your_current_rating\' | translate}}</h6>\n        <h2 class="text-white" text-center>{{rating.average_rating}}\n            <ion-icon name="md-star"></ion-icon>\n        </h2>\n        <div class="rating" *ngIf="rating.summary && rating.summary.length == 5">\n            <p class="text-white">\n                <span class="text-1">5<ion-icon name="md-star"></ion-icon></span>\n                <span class="rate-bar">\n                    <span class="rating-status" [style.width]="rating.summary[4].percent+\'%\'"></span>\n                </span>\n                <span class="text-2">{{rating.summary[4].total}}</span>\n            </p>\n            <p class="text-white">\n                <span class="text-1">4<ion-icon name="md-star"></ion-icon></span>\n                <span class="rate-bar">\n                    <span class="rating-status" [style.width]="rating.summary[3].percent+\'%\'"></span>\n                </span>\n                <span class="text-2">{{rating.summary[3].total}}</span>\n            </p>\n            <p class="text-white">\n                <span class="text-1">3<ion-icon name="md-star"></ion-icon></span>\n                <span class="rate-bar">\n                    <span class="rating-status" [style.width]="rating.summary[2].percent+\'%\'"></span>\n                </span>\n                <span class="text-2">{{rating.summary[2].total}}</span>\n            </p>\n            <p class="text-white">\n                <span class="text-1">2<ion-icon name="md-star"></ion-icon></span>\n                <span class="rate-bar">\n                    <span class="rating-status" [style.width]="rating.summary[1].percent+\'%\'"></span>\n                </span>\n                <span class="text-2">{{rating.summary[1].total}}</span>\n            </p>\n            <p class="text-white">\n                <span class="text-1">1<ion-icon name="md-star"></ion-icon></span>\n                <span class="rate-bar">\n                    <span class="rating-status" [style.width]="rating.summary[0].percent+\'%\'"></span>\n                </span>\n                <span class="text-2">{{rating.summary[0].total}}</span>\n            </p>\n        </div>\n        <div class="btn-container">\n            <button class="btn text-thime" ion-button round full (click)="allreview()">\n                {{\'read_all_reviews\' | translate}}\n            </button>\n        </div>\n    </div>\n    <ion-row *ngIf="rating" class="details ">\n        <ion-col col-6>\n            <button ion-button full class="btn">\n                <ion-icon name="md-star"></ion-icon>\n                <span>{{rating.total_ratings}} <small>{{\'people_reviewed\' | translate}}</small></span>\n            </button>\n        </ion-col>\n\n        <ion-col col-6>\n            <button ion-button full class="btn">\n                <ion-icon name="md-checkmark"></ion-icon>\n                <span>{{rating.total_completed}}<small>{{\'tasks_completed\' | translate}}</small></span>\n            </button>\n        </ion-col>\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\review\review.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */]])
    ], ReviewPage);
    return ReviewPage;
}());

//# sourceMappingURL=review.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllreviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AllreviewPage = /** @class */ (function () {
    function AllreviewPage(service, loadingCtrl, translate) {
        var _this = this;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.allDone = false;
        this.isLoading = true;
        this.pageNo = 1;
        this.subscriptions = [];
        this.reviews = [];
        this.translate.get('loading_reviews').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.loadReviews();
    }
    AllreviewPage.prototype.loadReviews = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.getMyReviews(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.pageNo).subscribe(function (res) {
            var reviews = res.data;
            _this.allDone = (!reviews || !reviews.length);
            _this.dismissLoading();
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            _this.reviews = _this.reviews.concat(reviews);
            _this.isLoading = false;
        }, function (err) {
            console.log('reviews', err);
            _this.dismissLoading();
            if (_this.infiniteScroll)
                _this.infiniteScroll.complete();
            _this.isLoading = false;
        });
        this.subscriptions.push(subscription);
    };
    AllreviewPage.prototype.doInfinite = function (infiniteScroll) {
        this.infiniteScroll = infiniteScroll;
        if (!this.allDone) {
            this.pageNo = this.pageNo + 1;
            this.loadReviews();
        }
        else {
            infiniteScroll.complete();
        }
    };
    AllreviewPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    AllreviewPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    AllreviewPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    AllreviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-allreview',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\allreview\allreview.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'your_reviews\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <div class="empty-view" *ngIf="!isLoading && (!reviews || !reviews.length)">\n        <div style="text-align:center">\n            <img src="assets/imgs/empty_reviews.png" alt="no offers" />\n            <span style="color:#9E9E9E; font-weight:bold;">\n                {{\'no_reviews_to_show\' | translate}}\n            </span>\n        </div>\n    </div>\n    <ion-list no-lines class="reviews">\n        <ion-item *ngFor="let review of reviews">\n            <div class="reviews-details">\n                <div class="review-img">\n                    <img *ngIf="review.user && review.user.image_url" data-src="{{review.user.image_url}}">\n                    <img *ngIf="!review.user || !review.user.image_url" src="assets/imgs/empty_dp.png">\n                </div>\n                <h2 class="text-ellipsis">\n                    {{review.user.name}}<br>\n                    <small class="text-green">\n                        {{review.rating}}\n                        <ion-icon name="star" class="text-green"></ion-icon>\n                    </small>\n                </h2>\n                <p class="text-ellipsis">{{review.created_at}} </p>\n            </div>\n            <p>{{review.review}}</p>\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\allreview\allreview.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], AllreviewPage);
    return AllreviewPage;
}());

//# sourceMappingURL=allreview.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RatingSummary; });
var RatingSummary = /** @class */ (function () {
    function RatingSummary(total, percent, rounded_rating) {
        this.total = total;
        this.percent = percent;
        this.rounded_rating = rounded_rating;
    }
    RatingSummary.defaultArray = function () {
        var ratingSummaries = new Array();
        for (var i = 0; i < 5; i++) {
            ratingSummaries.push(new RatingSummary(0, 0, i));
        }
        return ratingSummaries;
    };
    return RatingSummary;
}());

//# sourceMappingURL=rating-summary.models.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__myprofile_myprofile__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__packages_packages__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__conatctus_conatctus__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__privacy_privacy__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__signin_signin__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_profile_models__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_category_models__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__managelanguage_managelanguage__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__my_portfolio_my_portfolio__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__faqs_faqs__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















var AccountPage = /** @class */ (function () {
    function AccountPage(navCtrl, alertCtrl, app, translate) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.translate = translate;
        this.profile = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_PROFILE));
        if (!this.profile) {
            this.profile = new __WEBPACK_IMPORTED_MODULE_7__models_profile_models__["a" /* Profile */]();
            this.profile.primary_category = new __WEBPACK_IMPORTED_MODULE_9__models_category_models__["a" /* Category */]();
            this.profile.subcategories = new Array();
            this.profile.price_type = "hour";
            this.profile.about = "";
        }
        if (!this.profile.primary_category) {
            this.profile.primary_category = new __WEBPACK_IMPORTED_MODULE_9__models_category_models__["a" /* Category */]();
        }
        if (!this.profile.subcategories) {
            this.profile.subcategories = new Array();
        }
    }
    AccountPage.prototype.ionViewDidEnter = function () {
        this.user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_USER));
    };
    AccountPage.prototype.myprofile = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__myprofile_myprofile__["a" /* MyprofilePage */]);
    };
    AccountPage.prototype.packages = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__packages_packages__["a" /* PackagesPage */]);
    };
    AccountPage.prototype.conatctus = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__conatctus_conatctus__["a" /* ConatctusPage */]);
    };
    AccountPage.prototype.faqs = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__faqs_faqs__["a" /* FaqsPage */]);
    };
    AccountPage.prototype.privacy = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_13__models_helper_models__["a" /* Helper */].getSetting("privacy_policy");
        if (terms && terms.length) {
            this.translate.get('privacy_policy').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    AccountPage.prototype.aboutus = function () {
        var _this = this;
        var terms = __WEBPACK_IMPORTED_MODULE_13__models_helper_models__["a" /* Helper */].getSetting("about_us");
        if (terms && terms.length) {
            this.translate.get('about_us').subscribe(function (value) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__privacy_privacy__["a" /* PrivacyPage */], { toShow: terms, heading: value });
            });
        }
    };
    AccountPage.prototype.chooseLanguage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__managelanguage_managelanguage__["a" /* ManagelanguagePage */]);
    };
    AccountPage.prototype.my_portfolio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__my_portfolio_my_portfolio__["a" /* My_portfolioPage */]);
    };
    AccountPage.prototype.alertLogout = function () {
        var _this = this;
        this.translate.get(['logout_title', 'logout_message', 'no', 'yes']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['logout_title'],
                message: text['logout_message'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: text['yes'],
                        handler: function () {
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_USER);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_TOKEN);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_PROFILE);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS);
                            window.localStorage.removeItem(__WEBPACK_IMPORTED_MODULE_8__models_constants_models__["a" /* Constants */].KEY_CARD_INFO);
                            _this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_6__signin_signin__["a" /* SigninPage */]);
                        }
                    }]
            });
            alert.present();
        });
    };
    AccountPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-account',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\account\account.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'account\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content class="bg-light">\n\n    <ion-list no-lines>\n\n        <ion-item class="profile" (click)="myprofile()">\n\n            <ion-avatar item-start>\n\n                <img *ngIf="user && user.image_url" data-src="{{user.image_url}}">\n\n                <img *ngIf="!user || !user.image_url" src="assets/imgs/empty_dp.png">\n\n            </ion-avatar>\n\n            <h2>\n\n                <span *ngIf="user" class="text-ellipsis">{{user.name}}</span>\n\n                <span *ngIf="profile && profile.primary_category && profile.primary_category.title" class="small">|\n\n                    {{profile.primary_category.title}}</span>\n\n                <span *ngIf="profile && profile.is_verified==1"\n\n                    class="text-green ml-auto ">{{\'verified\' | translate}}</span>\n\n            </h2>\n\n            <p class="text-thime">{{\'view_profile\' | translate}}</p>\n\n        </ion-item>\n\n\n\n        <ion-item class="" (click)="my_portfolio()">\n\n            <h2>\n\n                <ion-icon name="md-photos" class="mr-auto text-thime"></ion-icon> <span class="text-ellipsis">\n\n                    {{\'my_portfolio\' | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item class="" (click)="packages()">\n\n            <h2>\n\n                <ion-icon name="md-clipboard" class="mr-auto text-thime"></ion-icon> <span class="text-ellipsis">\n\n                    {{\'packages\' | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item class="" (click)="conatctus()">\n\n            <h2>\n\n                <ion-icon name="ios-mail" class="mr-auto text-thime"></ion-icon> <span class="text-ellipsis">{{\'contact_us\'\n\n                    | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item class="" (click)="privacy()">\n\n            <h2>\n\n                <ion-icon name="md-lock" class="mr-auto text-thime"></ion-icon> <span class="text-ellipsis">{{\'privacy_policy\'\n\n                    | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n        <!-- <ion-item class="" (click)="aboutus()">\n\n            <h2>\n\n                <ion-icon class="mr-auto text-thime"> <img src="assets/imgs/about-icon.png"></ion-icon> <span\n\n                    class="text-ellipsis">{{\'about_us\'\n\n                    | translate}}</span>\n\n                             <ion-icon name="ios-arrow-forward-outline"></ion-icon>\n\n            </h2>\n\n        </ion-item> -->\n\n        <ion-item class="" (click)="faqs()">\n\n            <h2>\n\n                <ion-icon class="mr-auto text-thime"> <img src="assets/imgs/faqs-icon.png"></ion-icon>\n\n                <span class="text-ellipsis">{{\'faq\' | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n        <ion-item class="" (click)="chooseLanguage()">\n\n            <h2>\n\n                <ion-icon name="md-globe" class="mr-auto text-thime"></ion-icon> <span class="text-ellipsis">\n\n                    {{\'change_language\' | translate}}</span>\n\n<!--                <ion-icon name="ios-arrow-forward-outline"></ion-icon>-->\n\n            </h2>\n\n        </ion-item>\n\n    </ion-list>\n\n    <ion-list no-lines>\n\n        <ion-item class="sign-out" (click)="alertLogout()">\n\n            <h2 text-center>\n\n                <strong class="text-ellipsis text-thime" text-center>\n\n                    {{\'sign_out\' | translate}}\n\n                </strong>\n\n            </h2>\n\n        </ion-item>\n\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\account\account.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_10__ngx_translate_core__["c" /* TranslateService */]])
    ], AccountPage);
    return AccountPage;
}());

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectservicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectservicePage = /** @class */ (function () {
    function SelectservicePage(navCtrl, params, service, loadingCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingShown = false;
        this.isLoading = true;
        this.subscriptions = [];
        this.parentCategory = params.get("cat");
        this.subCategories = params.get("cats");
        if (this.parentCategory) {
            if (!this.subCategories)
                this.presentLoading("Loading sub categories");
            this.loadChildCategories(this.parentCategory.id);
        }
    }
    SelectservicePage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
        if (this.subCategories) {
            var catsSelected = new Array();
            for (var _i = 0, _a = this.subCategories; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.selected) {
                    catsSelected.push(cat);
                }
            }
            window.localStorage.setItem("temp_sub_cats", JSON.stringify(catsSelected));
        }
    };
    SelectservicePage.prototype.done = function () {
        if (this.subCategories) {
            var catsSelected = new Array();
            for (var _i = 0, _a = this.subCategories; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.selected) {
                    catsSelected.push(cat);
                }
            }
            if (catsSelected.length) {
                this.navCtrl.pop();
            }
            else {
                this.showToast("No services selected");
            }
        }
    };
    SelectservicePage.prototype.loadChildCategories = function (parentId) {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.categoryChildren(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), parentId).subscribe(function (res) {
            _this.dismissLoading();
            var cats = res.data;
            if (_this.subCategories) {
                for (var _i = 0, _a = _this.subCategories; _i < _a.length; _i++) {
                    var selectedCat = _a[_i];
                    for (var _b = 0, cats_1 = cats; _b < cats_1.length; _b++) {
                        var newCat = cats_1[_b];
                        if (selectedCat.id == newCat.id) {
                            newCat.selected = true;
                            break;
                        }
                    }
                }
            }
            _this.subCategories = cats;
            _this.isLoading = false;
        }, function (err) {
            _this.dismissLoading();
            console.log('cat_sub_err', err);
            _this.isLoading = false;
        });
        this.subscriptions.push(subscription);
    };
    SelectservicePage.prototype.toggleSelection = function (subCat) {
        subCat.selected = !subCat.selected;
        console.log('selection_toggle', subCat);
    };
    SelectservicePage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SelectservicePage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    SelectservicePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SelectservicePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-selectservice',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\selectservice\selectservice.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'select_services\' | translate}} \n\n                <ion-icon class="end" name="md-done-all" (click)="done(cat)"></ion-icon>\n\n		</ion-title>\n\n    </ion-navbar>\n\n    <div class="logo-box bg-thime">\n\n        <div *ngIf="parentCategory" class="logo" text-center>\n\n            <img *ngIf="parentCategory.secondary_image_url" data-src="{{parentCategory.secondary_image_url}}">\n\n            <img *ngIf="!parentCategory.secondary_image_url && parentCategory.image_url"\n\n                data-src="{{parentCategory.image_url}}">\n\n            <img *ngIf="!parentCategory.secondary_image_url && !parentCategory.image_url"\n\n                src="assets/imgs/empty_category.png">\n\n            <p class="text-white">{{parentCategory.title}}</p>\n\n        </div>\n\n    </div>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <!-- <div class="empty-view" *ngIf="!isLoading && (!subCategories || !subCategories.length)">\n\n        <div style="text-align:center">\n\n            <img src="assets/imgs/empty_category.png" alt="no offers" />\n\n            <span style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'no_subcats_to_show\' | translate}}\n\n            </span>\n\n        </div>\n\n    </div>\n\n    <ion-list *ngIf="subCategories && subCategories.length">\n\n        <ion-item *ngFor="let cat of subCategories">\n\n            <ion-label (click)="toggleSelection(cat)">{{cat.title}}</ion-label>\n\n            <ion-checkbox [checked]="cat.selected" (click)="toggleSelection(cat)"></ion-checkbox>\n\n        </ion-item>\n\n    </ion-list> -->\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\selectservice\selectservice.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */]])
    ], SelectservicePage);
    return SelectservicePage;
}());

//# sourceMappingURL=selectservice.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
var Profile = /** @class */ (function () {
    function Profile() {
    }
    return Profile;
}());

//# sourceMappingURL=profile.models.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());

//# sourceMappingURL=category.models.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectareaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__ = __webpack_require__(123);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import  { } from '@types/google-maps';
var SelectareaPage = /** @class */ (function () {
    function SelectareaPage(navCtrl, menuCtrl, zone, maps, geolocation, toastCtrl) {
        this.navCtrl = navCtrl;
        this.menuCtrl = menuCtrl;
        this.zone = zone;
        this.maps = maps;
        this.geolocation = geolocation;
        this.toastCtrl = toastCtrl;
        this.query = '';
        this.places = [];
        this.ignoreClick = false;
        this.menuCtrl.enable(false, 'myMenu');
        this.searchDisabled = true;
        this.saveDisabled = true;
    }
    SelectareaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (!this.initialized) {
            var mapLoaded = this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement).then(function () {
                _this.autocompleteService = new google.maps.places.AutocompleteService();
                _this.placesService = new google.maps.places.PlacesService(_this.maps.map);
                _this.searchDisabled = false;
                _this.maps.map.addListener('click', function (event) {
                    if (event && event.latLng) {
                        _this.onMapClick(new google.maps.LatLng(event.latLng.lat(), event.latLng.lng()));
                    }
                });
                _this.initialized = true;
                _this.detect();
            }).catch(function (err) {
                console.log(err);
                _this.close();
            });
            mapLoaded.catch(function (err) {
                console.log(err);
                _this.close();
            });
        }
    };
    SelectareaPage.prototype.onMapClick = function (pos) {
        var _this = this;
        if (pos && !this.ignoreClick) {
            if (!this.marker) {
                this.marker = new google.maps.Marker({ position: pos, map: this.maps.map });
                this.marker.setClickable(true);
                this.marker.addListener('click', function (event) {
                    console.log("markerevent", event);
                    _this.showToast(_this.location.name);
                });
            }
            else {
                this.marker.setPosition(pos);
            }
            this.maps.map.panTo(pos);
            var geocoder = new google.maps.Geocoder();
            var request = { location: pos };
            geocoder.geocode(request, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
                    _this.saveDisabled = false;
                    _this.location = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
                    _this.location.name = results[0].formatted_address;
                    _this.location.lat = String(pos.lat());
                    _this.location.lng = String(pos.lng());
                    _this.showToast(_this.location.name);
                }
            });
        }
    };
    SelectareaPage.prototype.selectPlace = function (place) {
        var _this = this;
        this.query = place.description;
        this.ignoreClick = true;
        setTimeout(function () {
            _this.ignoreClick = false;
            console.log(_this.query);
        }, 2000);
        this.places = [];
        var myLocation = new __WEBPACK_IMPORTED_MODULE_5__models_my_location_models__["a" /* MyLocation */]();
        myLocation.name = place.name;
        this.placesService.getDetails({ placeId: place.place_id }, function (details) {
            _this.zone.run(function () {
                myLocation.name = (details.formatted_address && details.formatted_address.length) ? details.formatted_address : details.name;
                myLocation.lat = details.geometry.location.lat();
                myLocation.lng = details.geometry.location.lng();
                _this.saveDisabled = false;
                var lc = { lat: myLocation.lat, lng: myLocation.lng };
                _this.maps.map.setCenter(lc);
                _this.location = myLocation;
                var pos = new google.maps.LatLng(Number(lc.lat), Number(lc.lng));
                if (!_this.marker)
                    _this.marker = new google.maps.Marker({ position: pos, map: _this.maps.map });
                else
                    _this.marker.setPosition(pos);
                _this.maps.map.panTo(pos);
            });
        });
    };
    SelectareaPage.prototype.searchPlace = function () {
        var _this = this;
        this.saveDisabled = true;
        if (this.query.length > 0 && !this.searchDisabled) {
            var config = {
                //types: ['geocode'],
                input: this.query
            };
            this.autocompleteService.getPlacePredictions(config, function (predictions, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
                    _this.places = [];
                    predictions.forEach(function (prediction) {
                        _this.places.push(prediction);
                    });
                }
            });
        }
        else {
            this.places = [];
        }
    };
    SelectareaPage.prototype.detect = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            _this.onMapClick(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }).catch(function (err) {
            console.log("getCurrentPosition", err);
            _this.showToast("Location detection failed");
        });
    };
    SelectareaPage.prototype.save = function () {
        this.location.name = String(this.location.name);
        this.location.lat = String(this.location.lat);
        this.location.lng = String(this.location.lng);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_LOCATION, JSON.stringify(this.location));
        this.close();
    };
    SelectareaPage.prototype.close = function () {
        this.navCtrl.pop();
    };
    SelectareaPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 5000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])('pleaseConnect'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_core__["t" /* ElementRef */])
    ], SelectareaPage.prototype, "pleaseConnect", void 0);
    SelectareaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-selectarea',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\selectarea\selectarea.html"*/'<ion-header>\n\n <ion-navbar color="primary">\n\n		<ion-title>\n\n			<span (click)="close()">{{\'cancel\' | translate}}</span>\n\n			<button [disabled]="saveDisabled" ion-button  class="end" (click)="save()">{{\'save\' | translate}}</button>\n\n		</ion-title>\n\n	</ion-navbar>\n\n\n\n    <ion-toolbar>\n\n        <ion-row>\n\n            <ion-col col-11>\n\n                <ion-searchbar [(ngModel)]="query" placeholder="{{\'search_location\' | translate}}" (ionInput)="searchPlace()"></ion-searchbar>\n\n            </ion-col>\n\n            <ion-col col-1>\n\n                <ion-icon name="md-locate" (click)="detect()"></ion-icon>\n\n            </ion-col>\n\n        </ion-row>\n\n    </ion-toolbar>\n\n\n\n    <ion-list>\n\n        <ion-item *ngFor="let place of places" (click)="selectPlace(place)">{{place.description}}</ion-item>\n\n    </ion-list>\n\n\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n    <div #pleaseConnect id="please-connect">\n\n        <p>{{\'please_connect_to_the_internet\' | translate}}</p>\n\n    </div>\n\n\n\n    <div #map id="map">\n\n        <ion-spinner></ion-spinner>\n\n    </div>\n\n\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\selectarea\selectarea.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgZone */],
            __WEBPACK_IMPORTED_MODULE_3__providers_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* ToastController */]])
    ], SelectareaPage);
    return SelectareaPage;
}());

//# sourceMappingURL=selectarea.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMaps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__connectivity_service__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var GoogleMaps = /** @class */ (function () {
    function GoogleMaps(config, connectivityService, geolocation) {
        this.config = config;
        this.connectivityService = connectivityService;
        this.geolocation = geolocation;
        this.mapInitialised = false;
    }
    GoogleMaps.prototype.init = function (mapElement, pleaseConnect) {
        this.mapElement = mapElement;
        this.pleaseConnect = pleaseConnect;
        return this.loadGoogleMaps();
    };
    GoogleMaps.prototype.loadGoogleMaps = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof google == "undefined" || typeof google.maps == "undefined") {
                console.log("Google maps JavaScript needs to be loaded.");
                _this.disableMap();
                if (_this.connectivityService.isOnline()) {
                    window['mapInit'] = function () {
                        _this.initMap().then(function () {
                            resolve(true);
                        });
                        _this.enableMap();
                    };
                    var script = document.createElement("script");
                    script.id = "googleMaps";
                    if (_this.config.googleApiKey) {
                        script.src = 'http://maps.google.com/maps/api/js?key=' + _this.config.googleApiKey + '&callback=mapInit&libraries=places';
                    }
                    else {
                        script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                    }
                    document.body.appendChild(script);
                }
            }
            else {
                if (_this.connectivityService.isOnline()) {
                    _this.initMap();
                    _this.enableMap();
                }
                else {
                    _this.disableMap();
                }
                resolve(true);
            }
            _this.addConnectivityListeners();
        });
    };
    GoogleMaps.prototype.initMap = function () {
        var _this = this;
        this.mapInitialised = true;
        return new Promise(function (resolve) {
            var latLng = new google.maps.LatLng(39.9334, 32.8597);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControlOptions: { mapTypeIds: [] }
            };
            _this.map = new google.maps.Map(_this.mapElement, mapOptions);
            resolve(true);
        });
    };
    GoogleMaps.prototype.disableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "block";
        }
    };
    GoogleMaps.prototype.enableMap = function () {
        if (this.pleaseConnect) {
            this.pleaseConnect.style.display = "none";
        }
    };
    GoogleMaps.prototype.addConnectivityListeners = function () {
        var _this = this;
        this.connectivityService.watchOnline().subscribe(function () {
            setTimeout(function () {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    _this.loadGoogleMaps();
                }
                else {
                    if (!_this.mapInitialised) {
                        _this.initMap();
                    }
                    _this.enableMap();
                }
            }, 2000);
        });
        this.connectivityService.watchOffline().subscribe(function () {
            _this.disableMap();
        });
    };
    GoogleMaps = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_3__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1__connectivity_service__["a" /* Connectivity */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], GoogleMaps);
    return GoogleMaps;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connectivity; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connectivity = /** @class */ (function () {
    function Connectivity(platform, network) {
        this.platform = platform;
        this.network = network;
        this.onDevice = this.platform.is('cordova');
    }
    Connectivity.prototype.isOnline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type != 'none';
        }
        else {
            return navigator.onLine;
        }
    };
    Connectivity.prototype.isOffline = function () {
        if (this.onDevice && this.network.type) {
            return this.network.type == 'none';
        }
        else {
            return !navigator.onLine;
        }
    };
    Connectivity.prototype.watchOnline = function () {
        return this.network.onConnect();
    };
    Connectivity.prototype.watchOffline = function () {
        return this.network.onDisconnect();
    };
    Connectivity = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */]])
    ], Connectivity);
    return Connectivity;
}());

//# sourceMappingURL=connectivity-service.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirebaseClient; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var FirebaseClient = /** @class */ (function () {
    function FirebaseClient() {
    }
    FirebaseClient.prototype.uploadBlob = function (blob) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            storageRef.child(new Date().getTime().toString()).put(blob).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadFile = function (file) {
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            storageRef.child(new Date().getTime().toString()).put(file).then(function (snapshot) {
                console.log(snapshot);
                __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref(snapshot.metadata.fullPath).getDownloadURL().then(function (url) { return resolve(url); }).catch(function (err) { return reject(err); });
            }, function (err) {
                reject(err);
            });
        });
    };
    FirebaseClient.prototype.uploadImage = function (imageURI) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
            var imageRef = storageRef.child('image').child('imageName');
            _this.encodeImageUri(imageURI, function (image64) {
                imageRef.putString(image64, 'data_url').then(function (snapshot) {
                    resolve(snapshot.downloadURL);
                }, function (err) {
                    reject(err);
                });
            });
        });
    };
    FirebaseClient.prototype.encodeImageUri = function (imageUri, callback) {
        var c = document.createElement('canvas');
        var ctx = c.getContext("2d");
        var img = new Image();
        img.onload = function () {
            var aux = this;
            c.width = aux.width;
            c.height = aux.height;
            ctx.drawImage(img, 0, 0);
            var dataURL = c.toDataURL("image/jpeg");
            callback(dataURL);
        };
        img.src = imageUri;
    };
    FirebaseClient = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], FirebaseClient);
    return FirebaseClient;
}());

//# sourceMappingURL=firebase.service.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileUpdateRequest; });
var ProfileUpdateRequest = /** @class */ (function () {
    function ProfileUpdateRequest() {
    }
    return ProfileUpdateRequest;
}());

//# sourceMappingURL=profile-update-request.models.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PackagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchaseplan_purchaseplan__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_plan_detail_models__ = __webpack_require__(490);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var PackagesPage = /** @class */ (function () {
    function PackagesPage(navCtrl, service, loadingCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.subscriptions = [];
        this.myPlanDetail = __WEBPACK_IMPORTED_MODULE_7__models_plan_detail_models__["a" /* PlanDetail */].default();
        this.currency = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getSetting("currency");
        this.plans = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_PLANS));
        if (!this.plans)
            this.translate.get('loading_plans').subscribe(function (value) {
                _this.presentLoading(value);
            });
        this.refreshPackages();
    }
    PackagesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var subscription = this.service.planDetails(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            _this.myPlanDetail = res;
        }, function (err) {
            console.log('plandetail', err);
        });
        this.subscriptions.push(subscription);
    };
    PackagesPage.prototype.refreshPackages = function () {
        var _this = this;
        var subscription = this.service.plans(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var p = res_1[_i];
                p.priceToShow = _this.currency + p.price;
            }
            _this.plans = res;
            _this.dismissLoading();
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_PLANS, JSON.stringify(res));
        }, function (err) {
            console.log('packageslist', err);
            _this.dismissLoading();
        });
        this.subscriptions.push(subscription);
    };
    PackagesPage.prototype.planDetail = function (plan) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__purchaseplan_purchaseplan__["a" /* PurchaseplanPage */], { plan: plan });
    };
    PackagesPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    PackagesPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PackagesPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PackagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-packages',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\packages\packages.html"*/'<ion-header class="bg-thime">\n    <ion-navbar>\n        <ion-title>{{\'packages\' | translate}}</ion-title>\n    </ion-navbar>\n    <div class="header-text text-white" text-center>\n        <h1 class="text-ellipsis">{{myPlanDetail.leads_remaining_for_today}}</h1>\n        <h2>{{\'leads_left_today\' | translate}}</h2>\n        <p>{{myPlanDetail.remaining_days_count}} {{\'days_left\' | translate}}</p>\n    </div>\n</ion-header>\n\n<ion-content class="bg-light">\n    <!--    <img src="assets/imgs/19.png">-->\n    <ion-list *ngIf="plans" no-lines>\n        <h4 class="text-ellipsis">{{\'purchase_plans\' | translate}}</h4>\n        <ion-item *ngFor="let plan of plans" (click)="planDetail(plan)">\n            <h2 class="text-ellipsis">{{plan.name}}</h2>\n            <p class="text-ellipsis">{{plan.description}}</p>\n            <h3 class="text-ellipsis" item-end>{{plan.priceToShow}}</h3>\n        </ion-item>\n    </ion-list>\n</ion-content>\n<!-- <ion-footer>\n    <div class="fixed-bottom" text-center (click)="conatctus()">\n        <h5>{{\'need_help\' | translate}}<strong class="text-thime">{{\'contact_us\' | translate}}</strong></h5>\n    </div>\n</ion-footer> -->'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\packages\packages.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], PackagesPage);
    return PackagesPage;
}());

//# sourceMappingURL=packages.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseplanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_card_info_models__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_stripe__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_client_service__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var PurchaseplanPage = /** @class */ (function () {
    function PurchaseplanPage(config, toastCtrl, translate, navCtrl, navParam, alertCtrl, stripe, loadingCtrl, service) {
        this.config = config;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.stripe = stripe;
        this.loadingCtrl = loadingCtrl;
        this.service = service;
        this.cardInfo = new __WEBPACK_IMPORTED_MODULE_2__models_card_info_models__["a" /* CardInfo */]();
        this.loadingShown = false;
        this.subscriptions = [];
        this.plan = navParam.get("plan");
        var savedCardInfo = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_CARD_INFO));
        if (savedCardInfo) {
            this.cardInfo.name = savedCardInfo.name;
            this.cardInfo.number = savedCardInfo.number;
            this.cardInfo.expMonth = savedCardInfo.expMonth;
            this.cardInfo.expYear = savedCardInfo.expYear;
        }
    }
    PurchaseplanPage.prototype.confirm = function () {
        var _this = this;
        if (this.cardInfo.areFieldsFilled()) {
            this.translate.get('verifying_card').subscribe(function (text) {
                _this.presentLoading(text);
            });
            this.stripe.setPublishableKey(this.config.stripeKey);
            this.stripe.createCardToken(this.cardInfo).then(function (token) {
                _this.dismissLoading();
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_CARD_INFO, JSON.stringify(_this.cardInfo));
                _this.purchasePlan(token.id);
            }).catch(function (error) {
                _this.dismissLoading();
                _this.presentErrorAlert(error);
                _this.translate.get('invalid_card').subscribe(function (text) {
                    _this.showToast(text);
                });
                console.error(error);
            });
        }
        else {
            this.translate.get('fill_valid_card').subscribe(function (text) {
                _this.showToast(text);
            });
        }
    };
    PurchaseplanPage.prototype.purchasePlan = function (stripeToken) {
        var _this = this;
        var subscription = this.service.planPurchase(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.plan.id, stripeToken).subscribe(function (res) {
            _this.dismissLoading();
            _this.translate.get('plan_purchased').subscribe(function (text) {
                _this.showToast(text);
            });
            _this.navCtrl.pop();
        }, function (err) {
            console.log('purchase_err', err);
            _this.dismissLoading();
            _this.navCtrl.pop();
        });
        this.subscriptions.push(subscription);
    };
    PurchaseplanPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    PurchaseplanPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    PurchaseplanPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    PurchaseplanPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    PurchaseplanPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    PurchaseplanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-purchaseplan',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\purchaseplan\purchaseplan.html"*/'<ion-header class="bg-thime">\n\n	<ion-navbar>\n\n		<ion-title>{{\'purchase_plan\' | translate}}</ion-title>\n\n	</ion-navbar>\n\n	<ion-list no-lines>\n\n		<ion-item (click)="purchaseplan()">\n\n			<h2 class="text-ellipsis">{{plan.name}}</h2>\n\n			<p class="text-ellipsis">{{plan.description}}</p>\n\n			<h3 class="text-ellipsis" item-end>{{plan.priceToShow}}</h3>\n\n		</ion-item>\n\n	</ion-list>\n\n</ion-header>\n\n\n\n<ion-content class="bg-light">\n\n\n\n	\n\n    <div *ngIf="cardInfo" class="form">\n\n        <ion-list no-lines>\n\n            <ion-item>\n\n                <ion-input type="text" maxlength="16" placeholder="{{\'card_number\' | translate}}"\n\n                    [(ngModel)]="cardInfo.number"></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-input type="text" placeholder="{{\'card_name\' | translate}}" [(ngModel)]="cardInfo.name">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-row>\n\n                <ion-col col-4>\n\n                    <ion-item>\n\n                        <ion-input type="text" maxlength="3" placeholder="{{\'card_cvv\' | translate}}"\n\n                            [(ngModel)]="cardInfo.cvc"></ion-input>\n\n                    </ion-item>\n\n                </ion-col>\n\n                <ion-col col-4 class="">\n\n                    <div class="d-flex mr-5">\n\n                        <ion-item>\n\n                            <ion-input type="text" maxlength="2" placeholder="{{\'card_month\' | translate}}"\n\n                                [(ngModel)]="cardInfo.expMonth"></ion-input>\n\n                        </ion-item>\n\n                    </div>\n\n                </ion-col>\n\n                <ion-col col-4>\n\n                    <ion-item>\n\n                        <ion-input type="text" maxlength="2" placeholder="{{\'card_year\' | translate}}"\n\n                            [(ngModel)]="cardInfo.expYear"></ion-input>\n\n                    </ion-item>\n\n                </ion-col>\n\n            </ion-row>\n\n\n\n\n\n             <ion-item *ngIf="paymentResponse && paymentResponse.length">\n\n                                <ion-label text-right>{{paymentResponse}}</ion-label>\n\n                            </ion-item> \n\n        </ion-list>\n\n    </div>\n\n\n\n\n\n\n\n<!--\n\n	<div class="payment_options">\n\n		<ion-list no-lines> \n\n			<h3>{{\'payment_methods\' | translate}}</h3>\n\n			<ion-item>\n\n				<ion-icon text-start item-start class="zmdi zmdi-card"></ion-icon>\n\n				<h2>{{\'credit_card\' | translate}}</h2>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-icon text-start item-start class="zmdi zmdi-card"></ion-icon>\n\n				<h2>{{\'debit_card\' | translate}}</h2>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-icon text-start item-start class="zmdi zmdi-paypal-alt"></ion-icon>\n\n				<h2>{{\'paypal\' | translate}}</h2>\n\n			</ion-item>\n\n			<ion-item>\n\n				<ion-icon text-start item-start class="zmdi zmdi-google-play"></ion-icon>\n\n				<h2>{{\'googleplay\' | translate}}</h2>\n\n			</ion-item>\n\n		</ion-list>\n\n	</div>\n\n-->\n\n\n\n</ion-content>\n\n<!--\n\n<ion-footer>\n\n	<button class="btn" ion-button round full margin-top margin-bottom (click)="confirm()">\n\n		{{\'confirm\' | translate}}\n\n	</button>\n\n</ion-footer>-->\n\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\purchaseplan\purchaseplan.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_4__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_6__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__providers_client_service__["a" /* ClientService */]])
    ], PurchaseplanPage);
    return PurchaseplanPage;
}());

//# sourceMappingURL=purchaseplan.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConatctusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_support_request_models__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ConatctusPage = /** @class */ (function () {
    function ConatctusPage(navCtrl, service, callNumber, loadingCtrl, toastCtrl, translate) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.callNumber = callNumber;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.loadingShown = false;
        this.subscriptions = [];
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_USER));
        this.supportRequest = new __WEBPACK_IMPORTED_MODULE_4__models_support_request_models__["a" /* SupportRequest */](this.userMe.name, this.userMe.email, "");
    }
    ConatctusPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    ConatctusPage.prototype.dialSupport = function () {
        var phoneNumber = __WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].getSetting("support_phone");
        if (phoneNumber) {
            this.callNumber.callNumber(phoneNumber, true).then(function (res) { return console.log('Launched dialer!', res); }).catch(function (err) { return console.log('Error launching dialer', err); });
        }
    };
    ConatctusPage.prototype.submitSupport = function () {
        var _this = this;
        if (!this.supportRequest.message || !this.supportRequest.message.length) {
            this.translate.get("err_valid_support_msg").subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get("supporting").subscribe(function (value) {
                _this.presentLoading(value);
            });
            var subscription = this.service.submitSupport(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_TOKEN), this.supportRequest).subscribe(function (res) {
                _this.dismissLoading();
                _this.translate.get("supporting_success").subscribe(function (value) {
                    _this.showToast(value);
                });
                _this.navCtrl.pop();
            }, function (err) {
                _this.navCtrl.pop();
                _this.dismissLoading();
                console.log('support', err);
            });
            this.subscriptions.push(subscription);
        }
    };
    ConatctusPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    ConatctusPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    ConatctusPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    ConatctusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-conatctus',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\conatctus\conatctus.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'contact_us\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <!--    <img src="../../assets/imgs/20.png">-->\n\n    <div class="call-now bg-thime">\n\n        <h6 text-center class=" text-white">{{\'call_to_speak_with_us\' | translate}}</h6>\n\n        <button class="btn text-thime" ion-button round full margin-top margin-bottom icon-start (click)="dialSupport()">\n\n            <ion-icon name="md-call" padding-right></ion-icon><strong>{{\'call_now\' | translate}}</strong>\n\n        </button>\n\n    </div>\n\n    <h5 text-center margin-top margin-bottom padding-bottom class="text-thime">{{\'or_write_us_your_issue\' | translate}}</h5>\n\n\n\n    <div class="form">\n\n        <ion-list no-lines padding-bottom>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-person" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'your_name\' | translate}}</ion-label>\n\n                <ion-input type="text" [readonly]="true" [(ngModel)]="userMe.name"></ion-input>\n\n            </ion-item>\n\n            <!-- <ion-item>\n\n                <ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n                    <ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'your_email\' | translate}}</ion-label>\n\n                <ion-input type="email" [readonly]="true" [(ngModel)]="userMe.email"></ion-input>\n\n            </ion-item> -->\n\n            <ion-item>\n\n                <ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n                    <ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'your_message\' | translate}}</ion-label>\n\n                <ion-textarea type="text" [(ngModel)]="supportRequest.message"></ion-textarea>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <button class="btn" ion-button round full margin-top (click)="submitSupport()">{{\'submit\' | translate}}</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\conatctus\conatctus.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_call_number__["a" /* CallNumber */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]])
    ], ConatctusPage);
    return ConatctusPage;
}());

//# sourceMappingURL=conatctus.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_signup_request_models__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otp_otp__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = /** @class */ (function () {
    function SignupPage(params, navCtrl, clientService, translate, loadingCtrl, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.clientService = clientService;
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.signUpRequest = new __WEBPACK_IMPORTED_MODULE_3__models_signup_request_models__["a" /* SignUpRequest */]('', '', '', '');
        var code = params.get('code');
        var phone = params.get('phone');
        var name = params.get('name');
        var email = params.get('email');
        if (code && code.length) {
            this.countryCode = code;
        }
        if (phone && phone.length) {
            this.phoneNumber = phone;
        }
        if (name && name.length) {
            this.signUpRequest.name = name;
        }
        if (email && email.length) {
            this.signUpRequest.email = email;
        }
        this.getCountries();
        this.changeHint();
    }
    SignupPage.prototype.focusEmail = function () {
        this.inputemail.setFocus();
    };
    SignupPage.prototype.focusPhone = function () {
        this.inputphone.setFocus();
    };
    SignupPage.prototype.changeHint = function () {
        var _this = this;
        this.phoneNumber = "";
        if (this.countryCode && this.countryCode.length) {
            this.translate.get('enter_phone_number_exluding').subscribe(function (value) {
                _this.phoneNumberHint = value + " (+" + _this.countryCode + ")";
            });
        }
        else {
            this.translate.get('enter_phone_number').subscribe(function (value) {
                _this.phoneNumberHint = value;
            });
        }
    };
    SignupPage.prototype.getCountries = function () {
        var _this = this;
        this.clientService.getCountries().subscribe(function (data) {
            _this.countries = data;
        }, function (err) {
            console.log(err);
        });
    };
    SignupPage.prototype.requestSignUp = function () {
        var _this = this;
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!this.signUpRequest.name.length) {
            this.translate.get('err_valid_name').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.signUpRequest.email.length <= 5 || !reg.test(this.signUpRequest.email)) {
            this.translate.get('err_valid_email').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (!this.countryCode || !this.countryCode.length || !this.phoneNumber || !this.phoneNumber.length) {
            this.translate.get('err_valid_phone').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.alertPhone();
        }
    };
    SignupPage.prototype.alertPhone = function () {
        var _this = this;
        this.translate.get(['alert_phone', 'no', 'yes']).subscribe(function (text) {
            _this.phoneNumberFull = "+" + _this.countryCode + _this.phoneNumber;
            var alert = _this.alertCtrl.create({
                title: _this.phoneNumberFull,
                message: text['alert_phone'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: text['yes'],
                        handler: function () {
                            _this.signUpRequest.password = String(Math.floor(100000 + Math.random() * 900000));
                            _this.signUpRequest.mobile_number = _this.phoneNumberFull;
                            _this.signUp();
                        }
                    }]
            });
            alert.present();
        });
    };
    SignupPage.prototype.signUp = function () {
        var _this = this;
        this.translate.get('signing_up').subscribe(function (value) {
            _this.presentLoading(value);
        });
        this.clientService.signUp(this.signUpRequest).subscribe(function (res) {
            console.log(res);
            _this.dismissLoading();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__otp_otp__["a" /* OtpPage */], { phoneNumberFull: res.user.mobile_number });
        }, function (err) {
            console.log(err);
            _this.dismissLoading();
            var errMsg = 'Unable to register with provided credentials, Either email or phone is already taken.';
            if (err && err.error && err.error.errors) {
                if (err.error.errors.email) {
                    errMsg = err.error.errors.email[0];
                }
                else if (err.error.errors.mobile_number) {
                    errMsg = err.error.errors.mobile_number[0];
                }
                else if (err.error.errors.password) {
                    errMsg = err.error.errors.password[0];
                }
            }
            _this.presentErrorAlert(errMsg);
        });
    };
    SignupPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SignupPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    SignupPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    SignupPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputname'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputname", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputemail'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputemail", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('inputphone'),
        __metadata("design:type", Object)
    ], SignupPage.prototype, "inputphone", void 0);
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\signup\signup.html"*/'<ion-header class="bg-transparent">\n\n    <ion-navbar>\n\n        <ion-title>{{\'sign_up\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="form">\n\n        <ion-list no-lines>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-person" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'enter_full_name\' | translate}}</ion-label>\n\n                <ion-input #inputname type="text" (keyup.enter)="focusEmail()" [(ngModel)]="signUpRequest.name">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-mail" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{\'enter_email_id\' | translate}}</ion-label>\n\n                <ion-input #inputemail type="email" (keyup.enter)="focusPhone()" [(ngModel)]="signUpRequest.email">\n\n                </ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-globe" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{\'select_country\' | translate}}</ion-label>\n\n                <ion-select [(ngModel)]="countryCode" interface="popover" multiple="false" class="text-thime"\n\n                    [okText]="\'okay\' | translate" [cancelText]="\'cancel\' | translate" (ionChange)="changeHint()">\n\n                    <ion-option [value]="country.callingCodes[0]" *ngFor="let country of countries">{{country.name}}\n\n                    </ion-option>\n\n                </ion-select>\n\n            </ion-item>\n\n            <ion-item>\n\n                <ion-avatar item-start style="margin-bottom: 3px; margin-right: 28px;">\n\n                    <ion-icon name="md-phone-portrait" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label class="text-grey" floating>{{phoneNumberHint}}</ion-label>\n\n                <ion-input #inputphone type="tel" (keyup.enter)="requestSignUp()" [(ngModel)]="phoneNumber"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n\n\n        <button class="btn" ion-button round full margin-top margin-bottom (click)="requestSignUp()">\n\n            {{\'sign_up_now\' | translate}}\n\n        </button>\n\n        <!-- <p class="text-thime" text-center (click)="forgotpassword()">Forgot Password</p> -->\n\n\n\n    </div>\n\n</ion-content>\n\n<ion-footer>\n\n    <p class="text-grey" text-center style="margin-top: 30px;">\n\n        <small>\n\n            {{\'by_signing_up\' | translate}}<ins>{{\'terms_condition\' | translate}}</ins>\n\n        </small>\n\n    </p>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\signup\signup.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManagelanguagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signin_signin__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var ManagelanguagePage = /** @class */ (function () {
    function ManagelanguagePage(config, events, app) {
        this.config = config;
        this.events = events;
        this.app = app;
        this.defaultLanguageCode = "en";
        var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
        if (defaultLang)
            this.defaultLanguageCode = defaultLang;
    }
    ManagelanguagePage.prototype.onLanguageClick = function (language) {
        this.defaultLanguageCode = language.code;
    };
    ManagelanguagePage.prototype.languageConfirm = function () {
        this.events.publish('language:selection', this.defaultLanguageCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE, this.defaultLanguageCode);
        var user = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_2__models_constants_models__["a" /* Constants */].KEY_USER));
        this.app.getRootNav().setRoot(user ? __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */] : __WEBPACK_IMPORTED_MODULE_4__signin_signin__["a" /* SigninPage */]);
    };
    ManagelanguagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-managelanguage',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\managelanguage\managelanguage.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'change_language\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <ion-list no-lines radio-group [(ngModel)]="defaultLanguageCode" required>\n        <ion-item *ngFor="let language of config.availableLanguages" (click)="onLanguageClick(language)">\n            <ion-label>\n                <h3>{{language.name}}</h3>\n            </ion-label>\n            <ion-radio value="{{language.code}}" item-end></ion-radio>\n        </ion-item>\n    </ion-list>\n</ion-content>\n\n<ion-footer>\n    <button class="btn" ion-button full margin-top margin-bottom (click)="languageConfirm()">\n        {{\'confirm\' | translate}}\n    </button>\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\managelanguage\managelanguage.html"*/
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], ManagelanguagePage);
    return ManagelanguagePage;
}());

//# sourceMappingURL=managelanguage.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return My_portfolioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upload_portfolio_upload_portfolio__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(389);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var My_portfolioPage = /** @class */ (function () {
    function My_portfolioPage(navCtrl, service, toastCtrl, iab, loadingCtrl, translate, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.service = service;
        this.toastCtrl = toastCtrl;
        this.iab = iab;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.loadingShown = false;
        this.isLoading = true;
        this.subscriptions = [];
        this.portfolios = [];
        this.translate.get('loading_portfolio').subscribe(function (value) {
            _this.presentLoading(value);
        });
    }
    My_portfolioPage.prototype.ionViewDidEnter = function () {
        this.loadPortfolio();
    };
    My_portfolioPage.prototype.loadPortfolio = function () {
        var _this = this;
        this.isLoading = true;
        var subscription = this.service.getMyPortfolio(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            _this.dismissLoading();
            _this.portfolios = res;
            _this.isLoading = false;
        }, function (err) {
            console.log('reviews', err);
            _this.dismissLoading();
            _this.isLoading = false;
        });
        this.subscriptions.push(subscription);
    };
    My_portfolioPage.prototype.deletePortfolio = function (portfolio) {
        var _this = this;
        this.translate.get(['delete_folio_title', 'delete_folio_message', 'no', 'yes']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['delete_folio_title'],
                message: text['delete_folio_message'],
                buttons: [{
                        text: text['no'],
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: text['yes'],
                        handler: function () {
                            _this.translate.get('just_moment').subscribe(function (value) {
                                _this.presentLoading(value);
                            });
                            var subscription = _this.service.deleteMyPortfolio(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), portfolio.id).subscribe(function (res) {
                                _this.dismissLoading();
                                _this.navCtrl.pop();
                            }, function (err) {
                                console.log('deleteMyPortfolio', err);
                                _this.dismissLoading();
                            });
                            _this.subscriptions.push(subscription);
                        }
                    }]
            });
            alert.present();
        });
    };
    My_portfolioPage.prototype.linkPortfolio = function (portfolio) {
        if (__WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].isValidURL(portfolio.link)) {
            this.iab.create(portfolio.link);
        }
        else {
            this.showToast("Invalid link");
        }
    };
    My_portfolioPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    My_portfolioPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    My_portfolioPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    My_portfolioPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    My_portfolioPage.prototype.upload_portfolio = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__upload_portfolio_upload_portfolio__["a" /* Upload_portfolioPage */]);
    };
    My_portfolioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my_portfolio',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\my_portfolio\my_portfolio.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'my_portfolio\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="bg-color">\n\n    <div class="empty-view" *ngIf="!isLoading && (!portfolios || !portfolios.length)">\n\n        <div style="text-align:center">\n\n            <img src="assets/imgs/empty_reviews.png" alt="no offers" />\n\n            <span style="color:#9E9E9E; font-weight:bold;">\n\n                {{\'no_portfolios_to_show\' | translate}}\n\n            </span>\n\n        </div>\n\n    </div>\n\n    <ion-row>\n\n        <ion-col col-6 *ngFor="let portfolio of portfolios">\n\n            <div class="img_box">\n\n                <img data-src="{{portfolio.image_url}}" (click)="linkPortfolio(portfolio)">\n\n                <ion-icon name="md-close-circle" (click)="deletePortfolio(portfolio)"></ion-icon>\n\n            </div>\n\n        </ion-col>\n\n    </ion-row>\n\n</ion-content>\n\n<ion-footer no-border>\n\n    <ion-icon name="md-add" (click)="upload_portfolio()"></ion-icon>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\my_portfolio\my_portfolio.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], My_portfolioPage);
    return My_portfolioPage;
}());

//# sourceMappingURL=my_portfolio.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Upload_portfolioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_helper_models__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Upload_portfolioPage = /** @class */ (function () {
    function Upload_portfolioPage(navCtrl, service, alertCtrl, loadingCtrl, toastCtrl, firebaseService, translate) {
        this.navCtrl = navCtrl;
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.firebaseService = firebaseService;
        this.translate = translate;
        this.loadingShown = false;
        this.subscriptions = [];
    }
    Upload_portfolioPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    Upload_portfolioPage.prototype.saveFolio = function () {
        var _this = this;
        if (!this.imageToUpload || !this.imageToUpload.length) {
            this.translate.get('err_add_folio_image').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else if (this.linkPortfolio && this.linkPortfolio.length && !__WEBPACK_IMPORTED_MODULE_6__models_helper_models__["a" /* Helper */].isValidURL(this.linkPortfolio)) {
            this.translate.get('err_add_folio_link').subscribe(function (value) {
                _this.showToast(value);
            });
        }
        else {
            this.translate.get('adding_folio_link').subscribe(function (value) {
                _this.showToast(value);
            });
            this.subscriptions.push(this.service.addMyPortfolio(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_5__models_constants_models__["a" /* Constants */].KEY_TOKEN), { image_url: this.imageToUpload, link: this.linkPortfolio }).subscribe(function (res) {
                _this.dismissLoading();
                _this.navCtrl.pop();
            }, function (err) {
                console.log('addMyPortfolio', err);
                _this.dismissLoading();
                _this.navCtrl.pop();
            }));
        }
    };
    Upload_portfolioPage.prototype.pickPicker = function () {
        if (this.progress)
            return;
        var fileInput = document.getElementById("portfolio-image");
        fileInput.click();
    };
    Upload_portfolioPage.prototype.upload = function ($event, isImage) {
        var _this = this;
        var file = $event.target.files[0];
        if (file) {
            if (isImage && !file.type.includes("image")) {
                this.translate.get('err_choose_image').subscribe(function (value) {
                    _this.showToast(value);
                });
                return;
            }
            this.progress = true;
            this.translate.get(isImage ? "uploading_image" : "uploading_doc").subscribe(function (value) {
                _this.presentLoading(value);
            });
            this.firebaseService.uploadFile(file).then(function (url) {
                _this.dismissLoading();
                _this.progress = false;
                if (isImage) {
                    _this.imageToUpload = String(url);
                }
            }).catch(function (err) {
                _this.dismissLoading();
                _this.progress = false;
                console.log(err);
                _this.translate.get("uploading_fail").subscribe(function (value) {
                    _this.presentErrorAlert(value);
                });
            });
        }
    };
    Upload_portfolioPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    Upload_portfolioPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    Upload_portfolioPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2500,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    Upload_portfolioPage.prototype.presentErrorAlert = function (msg) {
        var alert = this.alertCtrl.create({
            title: "Error",
            subTitle: msg,
            buttons: ["Dismiss"]
        });
        alert.present();
    };
    Upload_portfolioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upload_portfolio',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\upload_portfolio\upload_portfolio.html"*/'<ion-header>\n\n    <ion-navbar>\n\n        <ion-title>{{\'upload_portfolio_image\' | translate}}</ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n    <div class="img_box" (click)="pickPicker()">\n\n        <ion-icon *ngIf="!imageToUpload || !imageToUpload.length" name="md-camera"></ion-icon>\n\n        <img *ngIf="imageToUpload && imageToUpload.length" data-src="{{imageToUpload}}">\n\n        <input id="portfolio-image" style="display: none" (change)="upload($event, true)" type="file">\n\n    </div>\n\n    <div class="form">\n\n        <ion-list inset>\n\n            <ion-item>\n\n                <ion-avatar item-start>\n\n                    <ion-icon name="md-attach" class="text-thime"></ion-icon>\n\n                </ion-avatar>\n\n                <ion-label floating>{{\'add_link\' | translate}}</ion-label>\n\n                <ion-input [(ngModel)]="linkPortfolio" (ngModelChange)="linkPortfolio = $event.toLowerCase()"></ion-input>\n\n            </ion-item>\n\n        </ion-list>\n\n    </div>\n\n</ion-content>\n\n<ion-footer no-border>\n\n    <button class="btn" ion-button full no-margin (click)="saveFolio()">\n\n        {{\'upload_image\' | translate}}\n\n    </button>\n\n</ion-footer>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\upload_portfolio\upload_portfolio.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__["a" /* FirebaseClient */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_firebase_service__["a" /* FirebaseClient */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], Upload_portfolioPage);
    return Upload_portfolioPage;
}());

//# sourceMappingURL=upload_portfolio.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_constants_models__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var FaqsPage = /** @class */ (function () {
    function FaqsPage(service, loadingCtrl) {
        this.service = service;
        this.loadingCtrl = loadingCtrl;
        this.loadingShown = false;
        this.faqs = new Array();
        this.subscriptions = [];
        var savedFaqs = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_FAQS));
        if (savedFaqs) {
            this.faqs = savedFaqs;
        }
        else {
            this.presentLoading("Just a moment");
        }
        this.refreshFaqs();
    }
    FaqsPage.prototype.ionViewWillLeave = function () {
        this.subscriptions.forEach(function (subscription) {
            subscription.unsubscribe();
        });
        this.dismissLoading();
    };
    FaqsPage.prototype.refreshFaqs = function () {
        var _this = this;
        this.subscriptions.push(this.service.faqs().subscribe(function (res) {
            _this.faqs = res;
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_3__models_constants_models__["a" /* Constants */].KEY_FAQS, JSON.stringify(_this.faqs));
            _this.dismissLoading();
        }, function (err) {
            console.log('faqs', err);
            _this.dismissLoading();
        }));
    };
    FaqsPage.prototype.expandFaq = function (faq) {
        this.curFaqId = (this.curFaqId == faq.id) ? -1 : faq.id;
    };
    FaqsPage.prototype.presentLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.onDidDismiss(function () { });
        this.loading.present();
        this.loadingShown = true;
    };
    FaqsPage.prototype.dismissLoading = function () {
        if (this.loadingShown) {
            this.loadingShown = false;
            this.loading.dismiss();
        }
    };
    FaqsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-faqs',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\faqs\faqs.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'faq\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <ion-list no-lines>\n        <ion-item *ngFor="let faq of faqs" [ngClass]="faq.id == curFaqId ? \'active\' : \'\' " (click)="expandFaq(faq)">\n            <h2>\n                <span class="text-ellipsis">{{faq.title}}</span>\n                <ion-icon name="ios-arrow-down-outline"></ion-icon>\n            </h2>\n            <p *ngIf="faq.id != curFaqId">{{faq.short_description}}</p>\n            <p *ngIf="faq.id == curFaqId">{{faq.description}}</p>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\faqs\faqs.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], FaqsPage);
    return FaqsPage;
}());

//# sourceMappingURL=faqs.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatslistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_chat_models__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatslistPage = /** @class */ (function () {
    function ChatslistPage(navCtrl, toastCtrl, translate) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.translate = translate;
        this.chats = new Array();
        this.chatsAll = new Array();
        var component = this;
        this.userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].KEY_USER));
        this.myInboxRef = __WEBPACK_IMPORTED_MODULE_6_firebase_app__["database"]().ref(__WEBPACK_IMPORTED_MODULE_4__models_constants_models__["a" /* Constants */].REF_INBOX).child(this.userMe.id + "hp");
        this.myInboxRef.on('child_added', function (data) {
            var newMessage = data.val();
            if (newMessage && newMessage.id && newMessage.chatId) {
                var newChat = __WEBPACK_IMPORTED_MODULE_3__models_chat_models__["a" /* Chat */].fromMessage(newMessage, (component.userMe.id + "hp") == newMessage.senderId);
                component.chatsAll.push(newChat);
                component.chatsAll.sort(function (one, two) { return (one.dateTimeStamp > two.dateTimeStamp ? -1 : 1); });
                component.chats = component.chatsAll;
                component.dismissToast();
            }
        });
        this.myInboxRef.on('child_changed', function (data) {
            var oldMessage = data.val();
            if (oldMessage && oldMessage.id && oldMessage.chatId) {
                var oldChat = __WEBPACK_IMPORTED_MODULE_3__models_chat_models__["a" /* Chat */].fromMessage(oldMessage, ((component.userMe.id + "hp") == oldMessage.senderId));
                var oldIndex = -1;
                for (var i = 0; i < component.chatsAll.length; i++) {
                    if (oldChat.chatId == component.chatsAll[i].chatId) {
                        oldIndex = i;
                        break;
                    }
                }
                if (oldIndex != -1) {
                    component.chatsAll.splice(oldIndex, 1);
                    component.chatsAll.unshift(oldChat);
                    component.chats = component.chatsAll;
                }
            }
        });
        this.translate.get("just_moment").subscribe(function (value) {
            _this.showToast(value);
        });
    }
    ChatslistPage.prototype.chatscreen = function (chat) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__chatscreen_chatscreen__["a" /* ChatscreenPage */], { chat: chat });
    };
    ChatslistPage.prototype.showToast = function (message) {
        this.toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        this.toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        this.toast.present();
    };
    ChatslistPage.prototype.dismissToast = function () {
        if (this.toast) {
            this.toast.dismiss();
            this.toast = null;
        }
    };
    ChatslistPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chatslist',template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\chatslist\chatslist.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{\'chat\' | translate}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="bg-light">\n    <div class="empty-view" *ngIf="(!chats || !chats.length)">\n        <div style="text-align:center">\n            <img src="assets/imgs/empty_category.png" alt="no offers" />\n            <span style="color:#9E9E9E; font-weight:bold;">\n                {{\'no_chats_to_show\' | translate}}\n            </span>\n        </div>\n    </div>\n    <ion-list no-lines>\n        <ion-item *ngFor="let chat of chats" (click)="chatscreen(chat)">\n            <ion-avatar item-start>\n                <img *ngIf="chat.chatImage && chat.chatImage.length" data-src="{{chat.chatImage}}">\n                <img *ngIf="!chat.chatImage || !chat.chatImage.length" src="assets/imgs/empty_dp.png">\n            </ion-avatar>\n            <h2 class="d-flex"><span class="text-ellipsis">{{chat.chatName}}</span>\n                <span class="ml-auto end small" text-end>{{chat.timeDiff}}</span>\n            </h2>\n            <p class="text-grey text-ellipsis">{{chat.lastMessage}}</p>\n        </ion-item>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\chatslist\chatslist.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]])
    ], ChatslistPage);
    return ChatslistPage;
}());

//# sourceMappingURL=chatslist.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(407);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_account_account__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_allreview_allreview__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_booking_booking__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_chatslist_chatslist__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_conatctus_conatctus__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_myprofile_myprofile__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_packages_packages__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_privacy_privacy__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_purchaseplan_purchaseplan__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_requests_requests__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_review_review__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_selectservice_selectservice__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_signin_signin__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_signup_signup__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_tabs_tabs__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_my_portfolio_my_portfolio__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_upload_portfolio_upload_portfolio__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__ionic_native_network__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__providers_connectivity_service__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__providers_google_maps__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_otp_otp__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_selectarea_selectarea__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_onesignal__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_call_number__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_globalization__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__node_modules_ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__ionic_native_stripe__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__ionic_native_diagnostic__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__ionic_native_in_app_browser__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_managelanguage_managelanguage__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__ionic_native_image_picker__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__ionic_native_crop__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__ionic_native_file__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_faqs_faqs__ = __webpack_require__(390);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















































function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_allreview_allreview__["a" /* AllreviewPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__["a" /* ChatscreenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_chatslist_chatslist__["a" /* ChatslistPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_conatctus_conatctus__["a" /* ConatctusPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_packages_packages__["a" /* PackagesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_purchaseplan_purchaseplan__["a" /* PurchaseplanPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_selectservice_selectservice__["a" /* SelectservicePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_my_portfolio_my_portfolio__["a" /* My_portfolioPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_upload_portfolio_upload_portfolio__["a" /* Upload_portfolioPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_faqs_faqs__["a" /* FaqsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */]]
                    }
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_account_account__["a" /* AccountPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_allreview_allreview__["a" /* AllreviewPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_booking_booking__["a" /* BookingPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_chatscreen_chatscreen__["a" /* ChatscreenPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_chatslist_chatslist__["a" /* ChatslistPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_conatctus_conatctus__["a" /* ConatctusPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_myprofile_myprofile__["a" /* MyprofilePage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_notifications_notifications__["a" /* NotificationsPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_packages_packages__["a" /* PackagesPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_privacy_privacy__["a" /* PrivacyPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_purchaseplan_purchaseplan__["a" /* PurchaseplanPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_requests_requests__["a" /* RequestsPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_review_review__["a" /* ReviewPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_selectservice_selectservice__["a" /* SelectservicePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_signin_signin__["a" /* SigninPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_otp_otp__["a" /* OtpPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_selectarea_selectarea__["a" /* SelectareaPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_my_portfolio_my_portfolio__["a" /* My_portfolioPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_upload_portfolio_upload_portfolio__["a" /* Upload_portfolioPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_managelanguage_managelanguage__["a" /* ManagelanguagePage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_faqs_faqs__["a" /* FaqsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_27__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_28__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_29__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_30__providers_connectivity_service__["a" /* Connectivity */],
                __WEBPACK_IMPORTED_MODULE_31__providers_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_33__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_36__ionic_native_onesignal__["a" /* OneSignal */],
                __WEBPACK_IMPORTED_MODULE_37__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_39__node_modules_ngx_translate_core__["c" /* TranslateService */],
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_globalization__["a" /* Globalization */],
                __WEBPACK_IMPORTED_MODULE_40__ionic_native_stripe__["a" /* Stripe */],
                __WEBPACK_IMPORTED_MODULE_41__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_42__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_44__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_45__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_46__ionic_native_file__["a" /* File */],
                { provide: __WEBPACK_IMPORTED_MODULE_32__app_config__["a" /* APP_CONFIG */], useValue: __WEBPACK_IMPORTED_MODULE_32__app_config__["b" /* BaseAppConfig */] },
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_notifications_models__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_globalization__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var MyApp = /** @class */ (function () {
    function MyApp(config, platform, oneSignal, statusBar, splashScreen, clientService, events, globalization, translate) {
        var _this = this;
        this.config = config;
        this.platform = platform;
        this.oneSignal = oneSignal;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.globalization = globalization;
        this.translate = translate;
        this.rtlSide = "left";
        //window.localStorage.setItem(Constants.KEY_LOCATION, "{\"name\":\"Laxmi Nagar, New Delhi, Delhi, India\",\"lat\":28.689638299999995,\"lng\":77.29134669999996}");
        this.initializeApp();
        clientService.getSettings().subscribe(function (res) {
            console.log('setting_setup_success');
            window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_SETTING, JSON.stringify(res));
        }, function (err) {
            console.log('setting_setup_error', err);
        });
        events.subscribe('language:selection', function (language) {
            clientService.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_TOKEN), { language: language }).subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log('update_user', err);
            });
            _this.globalize(language);
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_12_firebase___default.a.initializeApp({
                apiKey: _this.config.firebaseConfig.apiKey,
                authDomain: _this.config.firebaseConfig.authDomain,
                databaseURL: _this.config.firebaseConfig.databaseURL,
                projectId: _this.config.firebaseConfig.projectId,
                storageBucket: _this.config.firebaseConfig.storageBucket,
                messagingSenderId: _this.config.firebaseConfig.messagingSenderId
            });
            _this.statusBar.styleDefault();
            _this.splashScreen.show();
            setTimeout(function () {
                _this.splashScreen.hide();
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */]);
            }, 3000);
            if (_this.platform.is('cordova')) {
                _this.initOneSignal();
            }
            var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
            _this.globalize(defaultLang);
        });
    };
    MyApp.prototype.globalize = function (languagePriority) {
        this.translate.setDefaultLang("en");
        var defaultLangCode = this.config.availableLanguages[0].code;
        this.translate.use(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        this.setDirectionAccordingly(languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
        window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_LOCALE, languagePriority && languagePriority.length ? languagePriority : defaultLangCode);
    };
    MyApp.prototype.setDirectionAccordingly = function (lang) {
        switch (lang) {
            case 'ar': {
                this.platform.setDir('ltr', false);
                this.platform.setDir('rtl', true);
                this.rtlSide = "right";
                break;
            }
            default: {
                this.platform.setDir('rtl', false);
                this.platform.setDir('ltr', true);
                this.rtlSide = "left";
                break;
            }
        }
        // this.translate.use('ar');
        // this.platform.setDir('ltr', false);
        // this.platform.setDir('rtl', true);
    };
    MyApp.prototype.getSideOfCurLang = function () {
        this.rtlSide = this.platform.dir() === 'rtl' ? "right" : "left";
        return this.rtlSide;
    };
    MyApp.prototype.getSuitableLanguage = function (language) {
        window.localStorage.setItem("locale", language);
        language = language.substring(0, 2).toLowerCase();
        console.log('check for: ' + language);
        return this.config.availableLanguages.some(function (x) { return x.code == language; }) ? language : 'en';
    };
    MyApp.prototype.initOneSignal = function () {
        if (this.config.oneSignalAppId && this.config.oneSignalAppId.length && this.config.oneSignalGPSenderId && this.config.oneSignalGPSenderId.length) {
            this.oneSignal.startInit(this.config.oneSignalAppId, this.config.oneSignalGPSenderId);
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
            this.oneSignal.handleNotificationReceived().subscribe(function (data) {
                console.log(data);
                var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
                if (!notifications)
                    notifications = new Array();
                notifications.push(new __WEBPACK_IMPORTED_MODULE_9__models_notifications_models__["a" /* MyNotification */]((data.payload.additionalData && data.payload.additionalData.title) ? data.payload.additionalData.title : data.payload.title, (data.payload.additionalData && data.payload.additionalData.body) ? data.payload.additionalData.body : data.payload.body, String(new Date().getTime())));
                window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS, JSON.stringify(notifications));
                var noti_ids_processed = JSON.parse(window.localStorage.getItem("noti_ids_processed"));
                if (!noti_ids_processed)
                    noti_ids_processed = new Array();
                noti_ids_processed.push(data.payload.notificationID);
                window.localStorage.setItem("noti_ids_processed", JSON.stringify(noti_ids_processed));
            });
            this.oneSignal.handleNotificationOpened().subscribe(function (data) {
                var noti_ids_processed = JSON.parse(window.localStorage.getItem("noti_ids_processed"));
                if (!noti_ids_processed)
                    noti_ids_processed = new Array();
                var index = noti_ids_processed.indexOf(data.notification.payload.notificationID);
                if (index == -1) {
                    var notifications = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS));
                    if (!notifications)
                        notifications = new Array();
                    notifications.push(new __WEBPACK_IMPORTED_MODULE_9__models_notifications_models__["a" /* MyNotification */]((data.notification.payload.additionalData && data.notification.payload.additionalData.title) ? data.notification.payload.additionalData.title : data.notification.payload.title, (data.notification.payload.additionalData && data.notification.payload.additionalData.body) ? data.notification.payload.additionalData.body : data.notification.payload.body, String(new Date().getTime())));
                    window.localStorage.setItem(__WEBPACK_IMPORTED_MODULE_6__models_constants_models__["a" /* Constants */].KEY_NOTIFICATIONS, JSON.stringify(notifications));
                }
                else {
                    noti_ids_processed.splice(index, 1);
                    window.localStorage.setItem("noti_ids_processed", JSON.stringify(noti_ids_processed));
                }
            });
            this.oneSignal.endInit();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\app\app.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_4__providers_client_service__["a" /* ClientService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_globalization__["a" /* Globalization */], __WEBPACK_IMPORTED_MODULE_11__node_modules_ngx_translate_core__["c" /* TranslateService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 230,
	"./af.js": 230,
	"./ar": 231,
	"./ar-dz": 232,
	"./ar-dz.js": 232,
	"./ar-kw": 233,
	"./ar-kw.js": 233,
	"./ar-ly": 234,
	"./ar-ly.js": 234,
	"./ar-ma": 235,
	"./ar-ma.js": 235,
	"./ar-sa": 236,
	"./ar-sa.js": 236,
	"./ar-tn": 237,
	"./ar-tn.js": 237,
	"./ar.js": 231,
	"./az": 238,
	"./az.js": 238,
	"./be": 239,
	"./be.js": 239,
	"./bg": 240,
	"./bg.js": 240,
	"./bm": 241,
	"./bm.js": 241,
	"./bn": 242,
	"./bn.js": 242,
	"./bo": 243,
	"./bo.js": 243,
	"./br": 244,
	"./br.js": 244,
	"./bs": 245,
	"./bs.js": 245,
	"./ca": 246,
	"./ca.js": 246,
	"./cs": 247,
	"./cs.js": 247,
	"./cv": 248,
	"./cv.js": 248,
	"./cy": 249,
	"./cy.js": 249,
	"./da": 250,
	"./da.js": 250,
	"./de": 251,
	"./de-at": 252,
	"./de-at.js": 252,
	"./de-ch": 253,
	"./de-ch.js": 253,
	"./de.js": 251,
	"./dv": 254,
	"./dv.js": 254,
	"./el": 255,
	"./el.js": 255,
	"./en-SG": 256,
	"./en-SG.js": 256,
	"./en-au": 257,
	"./en-au.js": 257,
	"./en-ca": 258,
	"./en-ca.js": 258,
	"./en-gb": 259,
	"./en-gb.js": 259,
	"./en-ie": 260,
	"./en-ie.js": 260,
	"./en-il": 261,
	"./en-il.js": 261,
	"./en-nz": 262,
	"./en-nz.js": 262,
	"./eo": 263,
	"./eo.js": 263,
	"./es": 264,
	"./es-do": 265,
	"./es-do.js": 265,
	"./es-us": 266,
	"./es-us.js": 266,
	"./es.js": 264,
	"./et": 267,
	"./et.js": 267,
	"./eu": 268,
	"./eu.js": 268,
	"./fa": 269,
	"./fa.js": 269,
	"./fi": 270,
	"./fi.js": 270,
	"./fo": 271,
	"./fo.js": 271,
	"./fr": 272,
	"./fr-ca": 273,
	"./fr-ca.js": 273,
	"./fr-ch": 274,
	"./fr-ch.js": 274,
	"./fr.js": 272,
	"./fy": 275,
	"./fy.js": 275,
	"./ga": 276,
	"./ga.js": 276,
	"./gd": 277,
	"./gd.js": 277,
	"./gl": 278,
	"./gl.js": 278,
	"./gom-latn": 279,
	"./gom-latn.js": 279,
	"./gu": 280,
	"./gu.js": 280,
	"./he": 281,
	"./he.js": 281,
	"./hi": 282,
	"./hi.js": 282,
	"./hr": 283,
	"./hr.js": 283,
	"./hu": 284,
	"./hu.js": 284,
	"./hy-am": 285,
	"./hy-am.js": 285,
	"./id": 286,
	"./id.js": 286,
	"./is": 287,
	"./is.js": 287,
	"./it": 288,
	"./it-ch": 289,
	"./it-ch.js": 289,
	"./it.js": 288,
	"./ja": 290,
	"./ja.js": 290,
	"./jv": 291,
	"./jv.js": 291,
	"./ka": 292,
	"./ka.js": 292,
	"./kk": 293,
	"./kk.js": 293,
	"./km": 294,
	"./km.js": 294,
	"./kn": 295,
	"./kn.js": 295,
	"./ko": 296,
	"./ko.js": 296,
	"./ku": 297,
	"./ku.js": 297,
	"./ky": 298,
	"./ky.js": 298,
	"./lb": 299,
	"./lb.js": 299,
	"./lo": 300,
	"./lo.js": 300,
	"./lt": 301,
	"./lt.js": 301,
	"./lv": 302,
	"./lv.js": 302,
	"./me": 303,
	"./me.js": 303,
	"./mi": 304,
	"./mi.js": 304,
	"./mk": 305,
	"./mk.js": 305,
	"./ml": 306,
	"./ml.js": 306,
	"./mn": 307,
	"./mn.js": 307,
	"./mr": 308,
	"./mr.js": 308,
	"./ms": 309,
	"./ms-my": 310,
	"./ms-my.js": 310,
	"./ms.js": 309,
	"./mt": 311,
	"./mt.js": 311,
	"./my": 312,
	"./my.js": 312,
	"./nb": 313,
	"./nb.js": 313,
	"./ne": 314,
	"./ne.js": 314,
	"./nl": 315,
	"./nl-be": 316,
	"./nl-be.js": 316,
	"./nl.js": 315,
	"./nn": 317,
	"./nn.js": 317,
	"./pa-in": 318,
	"./pa-in.js": 318,
	"./pl": 319,
	"./pl.js": 319,
	"./pt": 320,
	"./pt-br": 321,
	"./pt-br.js": 321,
	"./pt.js": 320,
	"./ro": 322,
	"./ro.js": 322,
	"./ru": 323,
	"./ru.js": 323,
	"./sd": 324,
	"./sd.js": 324,
	"./se": 325,
	"./se.js": 325,
	"./si": 326,
	"./si.js": 326,
	"./sk": 327,
	"./sk.js": 327,
	"./sl": 328,
	"./sl.js": 328,
	"./sq": 329,
	"./sq.js": 329,
	"./sr": 330,
	"./sr-cyrl": 331,
	"./sr-cyrl.js": 331,
	"./sr.js": 330,
	"./ss": 332,
	"./ss.js": 332,
	"./sv": 333,
	"./sv.js": 333,
	"./sw": 334,
	"./sw.js": 334,
	"./ta": 335,
	"./ta.js": 335,
	"./te": 336,
	"./te.js": 336,
	"./tet": 337,
	"./tet.js": 337,
	"./tg": 338,
	"./tg.js": 338,
	"./th": 339,
	"./th.js": 339,
	"./tl-ph": 340,
	"./tl-ph.js": 340,
	"./tlh": 341,
	"./tlh.js": 341,
	"./tr": 342,
	"./tr.js": 342,
	"./tzl": 343,
	"./tzl.js": 343,
	"./tzm": 344,
	"./tzm-latn": 345,
	"./tzm-latn.js": 345,
	"./tzm.js": 344,
	"./ug-cn": 346,
	"./ug-cn.js": 346,
	"./uk": 347,
	"./uk.js": 347,
	"./ur": 348,
	"./ur.js": 348,
	"./uz": 349,
	"./uz-latn": 350,
	"./uz-latn.js": 350,
	"./uz.js": 349,
	"./vi": 351,
	"./vi.js": 351,
	"./x-pseudo": 352,
	"./x-pseudo.js": 352,
	"./yo": 353,
	"./yo.js": 353,
	"./zh-cn": 354,
	"./zh-cn.js": 354,
	"./zh-hk": 355,
	"./zh-hk.js": 355,
	"./zh-tw": 356,
	"./zh-tw.js": 356
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 468;

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helper_models__ = __webpack_require__(21);

var Message = /** @class */ (function () {
    function Message() {
    }
    Message.prototype.fromRow = function (arg0) {
        this.senderName = arg0.senderName;
        this.senderImage = arg0.senderImage;
        this.senderStatus = arg0.senderStatus;
        this.recipientName = arg0.recipientName;
        this.recipientImage = arg0.recipientImage;
        this.recipientStatus = arg0.recipientStatus;
        this.recipientId = arg0.recipientId;
        this.senderId = arg0.senderId;
        this.chatId = arg0.chatId;
        this.id = arg0.id;
        this.body = arg0.body;
        this.dateTimeStamp = arg0.dateTimeStamp;
        this.timeDiff = __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].formatMillisDateTime(Number(this.dateTimeStamp), __WEBPACK_IMPORTED_MODULE_0__helper_models__["a" /* Helper */].getLocale());
        this.delivered = arg0.delivered == 1;
        this.sent = arg0.sent == 1;
    };
    return Message;
}());

//# sourceMappingURL=message.models.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rating_summary_models__ = __webpack_require__(365);

var Rating = /** @class */ (function () {
    function Rating() {
    }
    Rating.getDefault = function () {
        var toReturn = new Rating();
        toReturn.average_rating = "0";
        toReturn.total_completed = 0;
        toReturn.total_ratings = 0;
        toReturn.summary = __WEBPACK_IMPORTED_MODULE_0__rating_summary_models__["a" /* RatingSummary */].defaultArray();
        return toReturn;
    };
    return Rating;
}());

//# sourceMappingURL=rating.models.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardInfo; });
var CardInfo = /** @class */ (function () {
    function CardInfo() {
    }
    CardInfo.prototype.areFieldsFilled = function () {
        return ((this.name && this.name.length)
            &&
                (this.number && this.number.length > 10)
            &&
                (this.expMonth && this.expMonth <= 12 && this.expMonth >= 1)
            &&
                (this.expYear && this.expYear <= 99)
            &&
                (this.cvc && this.cvc.length == 3));
    };
    return CardInfo;
}());

//# sourceMappingURL=card-info.models.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlanDetail; });
var PlanDetail = /** @class */ (function () {
    function PlanDetail() {
    }
    PlanDetail.default = function () {
        var pd = new PlanDetail();
        pd.leads_remaining_for_today = 0;
        pd.remaining_days_count = 0;
        return pd;
    };
    return PlanDetail;
}());

//# sourceMappingURL=plan-detail.models.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportRequest; });
var SupportRequest = /** @class */ (function () {
    function SupportRequest(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
    }
    return SupportRequest;
}());

//# sourceMappingURL=support-request.models.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpRequest; });
var SignUpRequest = /** @class */ (function () {
    function SignUpRequest(name, email, password, mobile_number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobile_number = mobile_number;
        this.role = "provider";
    }
    return SignUpRequest;
}());

//# sourceMappingURL=signup-request.models.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyNotification; });
var MyNotification = /** @class */ (function () {
    function MyNotification(title, detail, time) {
        this.title = title;
        this.detail = detail;
        this.time = time;
    }
    return MyNotification;
}());

//# sourceMappingURL=notifications.models.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__requests_requests__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notifications_notifications__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__review_review__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__chatslist_chatslist__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_constants_models__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__myprofile_myprofile__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_client_service__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__models_profile_update_request_models__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_firebase__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_app_config__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



















var TabsPage = /** @class */ (function () {
    function TabsPage(config, oneSignal, navCtrl, service, platform, diagnostic, geolocation, translate, alertCtrl) {
        var _this = this;
        this.config = config;
        this.navCtrl = navCtrl;
        this.service = service;
        this.geolocation = geolocation;
        this.translate = translate;
        this.alertCtrl = alertCtrl;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__requests_requests__["a" /* RequestsPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__notifications_notifications__["a" /* NotificationsPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__review_review__["a" /* ReviewPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_6__chatslist_chatslist__["a" /* ChatslistPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_5__account_account__["a" /* AccountPage */];
        if (platform.is("cordova")) {
            oneSignal.getIds().then(function (id) {
                if (id && id.userId) {
                    var userMe = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_USER));
                    __WEBPACK_IMPORTED_MODULE_15_firebase___default.a.database().ref(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].REF_USERS_FCM_IDS).child((userMe.id + "hp")).set(id.userId);
                    var defaultLang = window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_DEFAULT_LANGUAGE);
                    service.updateUser(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_TOKEN), {
                        fcm_registration_id_provider: id.userId,
                        language: (defaultLang && defaultLang.length) ? defaultLang : _this.config.availableLanguages[0].code
                    }).subscribe(function (res) {
                        console.log(res);
                    }, function (err) {
                        console.log('update_user', err);
                    });
                }
            });
        }
        service.logActivity(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_TOKEN)).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log('logActivity', err);
        });
        setTimeout(function () {
            var profile = JSON.parse(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_PROFILE));
            if (!profile || !profile.primary_category) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__myprofile_myprofile__["a" /* MyprofilePage */], { create_edit: true });
            }
        }, 500);
        diagnostic.isLocationEnabled().then(function (isAvailable) {
            if (isAvailable) {
                _this.setLocation();
            }
            else {
                _this.alertLocationServices();
                _this.setLocation();
            }
        }).catch(function (e) {
            console.error(e);
            _this.alertLocationServices();
            _this.setLocation();
        });
    }
    TabsPage.prototype.setLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var pur = new __WEBPACK_IMPORTED_MODULE_14__models_profile_update_request_models__["a" /* ProfileUpdateRequest */]();
            pur.longitude = String(position.coords.longitude);
            pur.latitude = String(position.coords.latitude);
            _this.service.updateProfile(window.localStorage.getItem(__WEBPACK_IMPORTED_MODULE_7__models_constants_models__["a" /* Constants */].KEY_TOKEN), pur).subscribe(function (res) {
                console.log(res);
            }, function (err) {
                console.log('logActivity', err);
            });
        }).catch(function (err) {
            console.log("getCurrentPosition", err);
        });
    };
    TabsPage.prototype.alertLocationServices = function () {
        var _this = this;
        this.translate.get(['location_services_title', 'location_services_message', 'okay']).subscribe(function (text) {
            var alert = _this.alertCtrl.create({
                title: text['location_services_title'],
                subTitle: text['location_services_message'],
                buttons: [{
                        text: text['okay'],
                        role: 'cancel',
                        handler: function () {
                            console.log('okay clicked');
                        }
                    }]
            });
            alert.present();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Tabs */])
    ], TabsPage.prototype, "tabRef", void 0);
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\tabs\tabs.html"*/'<ion-tabs #myTabs>\n    <ion-tab [root]="tab1Root" tabTitle="{{\'requests\' | translate}}" tabIcon="md-calendar" tabsHideOnSubPages="true"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="{{\'notifications\' | translate}}" tabIcon="notifications" tabsHideOnSubPages="true"></ion-tab>\n    <ion-tab [root]="tab3Root" tabTitle="{{\'review\' | translate}}" tabIcon="md-star" tabsHideOnSubPages="true"></ion-tab>\n    <!-- <ion-tab [root]="tab4Root" tabTitle="{{\'chat\' | translate}}" tabIcon="md-chatboxes" tabsHideOnSubPages="true"></ion-tab> -->\n    <ion-tab [root]="tab5Root" tabTitle="{{\'account\' | translate}}" tabIcon="md-person" tabsHideOnSubPages="true"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\Users\hefzi\Documents\apps\proyectos\Handyman_AppCode\handyman_provider\src\pages\tabs\tabs.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_10__providers_client_service__["a" /* ClientService */]]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_16__app_app_config__["a" /* APP_CONFIG */])),
        __metadata("design:paramtypes", [Object, __WEBPACK_IMPORTED_MODULE_9__ionic_native_onesignal__["a" /* OneSignal */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_10__providers_client_service__["a" /* ClientService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_12__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ })

},[393]);
//# sourceMappingURL=main.js.map