import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { AuthService } from './services/auth.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Контрагенты',
      url: '/folder/customers',
      icon: 'mail',
    },
    {
      title: 'Счета',
      url: '/invoice',
      icon: 'mail',
    },
    {
      title: 'Акты',
      url: '/folder/acts',
      icon: 'mail',
    },
    {
      title: 'Справки',
      url: '/folder/references',
      icon: 'mail',
    },
    // {
    //   title: 'Inbox',
    //   url: '/folder/Inbox',
    //   icon: 'mail'
    // },
    // {
    //   title: 'Outbox',
    //   url: '/folder/Outbox',
    //   icon: 'paper-plane'
    // },
    // {
    //   title: 'Favorites',
    //   url: '/folder/Favorites',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  user: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private firebaseX: FirebaseX,
    private _auth: AuthService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.connectFirebase();
      this.getUserInformation();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }
  }

  getUserInformation() {
    this._auth.user$.subscribe((response: User) => {
      this.user = response;
      console.log('User: ', response);
    });
  }

  connectFirebase() {
    this.firebaseX
      .getToken()
      .then((token) => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
      .catch((error) => console.error('Error getting token', error));

    // this.firebaseX
    //   .onMessageReceived()
    //   .subscribe((data) => console.log(`User opened a notification ${data}`));

    // this.firebaseX
    //   .onTokenRefresh()
    //   .subscribe((token: string) => console.log(`Got a new token ${token}`));

    // this.firebaseX
    //   .authenticateUserWithGoogle(
    //     'eyJhbGciOiJSUzI1NiIsImtpZCI6IjU1NGE3NTQ3Nzg1ODdjOTRjMTY3M2U4ZWEyNDQ2MTZjMGMwNDNjYmMiLCJ0eXAiOiJKV1QifQ'
    //   )
    //   .then((response: any) => {
    //     console.log('Data AUTH: ', response);
    //   });
  }

  logout() {
    this._auth.logout();
  }

  login() {
    this._auth.googleSignin();
  }
}
