import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Unit } from '../models/unit.model';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private dbPath = '/utitTypes';
  unitRef: AngularFirestoreCollection<Unit> = null;

  constructor(
    private _fs: AngularFirestore,
    // private _auth: AuthService,
    // private _router: Router,
  ) {
    // this.unitRef = _fs.collection(this.dbPath, q => q.where('_userId', '==', this._auth.getUserId()));
    this.unitRef = _fs.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Unit> {
    return this.unitRef;
  }

  // add(customer: Customer): void {
  //   const pushkey = this._fs.createId();
  //   customer._id = pushkey;
  //   this._fs.collection(this.dbPath).doc(pushkey).set({ ...customer });
  //   this._router.navigate(['/customer']);
  //   this.notifier.notify('success', 'Контрагент успешно создан');
  // }

  // delete(_id: string): Promise<void> {
  //   return this.customersRef.doc(_id).delete();
  // }

  // update(_id: string, value: any): Promise<void> {
  //   return this.customersRef.doc(_id).update(value);
  // }
}
