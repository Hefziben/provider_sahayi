import { InjectionToken } from "@angular/core";

export let APP_CONFIG = new InjectionToken<AppConfig>("app.config");

export interface FirebaseConfig {
	apiKey: string,
	authDomain: string,
	databaseURL: string,
	projectId: string,
	storageBucket: string,
	messagingSenderId: string,
	webApplicationId: string
}

export interface AppConfig {
	appName: string;
	apiBase: string;
	stripeKey:string,
	googleApiKey: string;
	oneSignalAppId: string;
	oneSignalGPSenderId: string;
	availableLanguages: Array<{ code: string, name: string }>;
	firebaseConfig: FirebaseConfig;
}

export const BaseAppConfig: AppConfig = {
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
