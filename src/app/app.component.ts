//Plugin and components
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
import { WelcomePage } from '../pages/welcome/welcome';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, afAuth: AngularFireAuth) {
    
    const authObserver = afAuth.authState.subscribe(user => {
      if (user) {
        this.rootPage = 'HomePage';
        authObserver.unsubscribe();
        console.log("User authenticated");
      } else {
        this.rootPage = WelcomePage;
        authObserver.unsubscribe();
        console.log("User not authenticated");
      }
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

