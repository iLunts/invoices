import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

//
// Firebase
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
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
          // this.userInformation = user;
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
    // return this.updateUserData(credential.user);
  }

  async logout() {
    await this._fa.signOut();
    localStorage.removeItem('userId');
    return this._router.navigate(['/']);
  }

  updateUserData(user: User) {
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
      refreshToken: user.refreshToken,
      // expiresIn: user.expiresIn,
      // idToken: user.idToken,
      // kind: user.kind,
      // refreshToken: user.refreshToken,
      // registered: user.registered,
    };

    return userRef.set(data, { merge: true });
  }

  getUser() {
    return this.userInformation;
  }

  getUserId() {
    // TODO: Need change IMPORTANT
    return 'N3DdimT8T7ZapyqzPb8vcJDChM62';
    // return this.userInformation.uid || 'N3DdimT8T7ZapyqzPb8vcJDChM62';
  }

  //
  // New methods
  //
  signup(email: string, password: string) {
    this._fa
      .createUserWithEmailAndPassword(email, password)
      .then((value) => {
        console.log('Success!', value);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this._fa
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        this.updateUserData(value.user);
        localStorage.setItem('userId', value.user.uid);
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }
}
