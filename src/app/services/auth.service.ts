import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

//
// Firebase
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
//

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  userInformation: User;

  constructor(
    private _fa: AngularFireAuth,
    private _fs: AngularFirestore,
    private _router: Router
  ) {
    this.user$ = this._fa.authState.pipe(
      switchMap((user) => {
        if (user) {
          this.userInformation = user;
          return this._fs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this._fa.signInWithPopup(provider);
    // localStorage.setItem('userId', credential.user.uid);
    debugger;
    return this.updateUserData(credential.user);
  }

  async logout() {
    await this._fa.signOut();
    localStorage.removeItem('userId');
    return this._router.navigate(['/']);
  }

  updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this._fs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      displayName: user.displayName,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
    };

    return userRef.set(data, { merge: true });
  }

  getUser() {
    return this.userInformation;
  }

  getUserId() {
    return this.userInformation.uid;
  }
}
