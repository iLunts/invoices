import { Component, OnInit } from '@angular/core';
import { Contractor } from 'src/app/models/contractor.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { ContractorService } from 'src/app/services/contractor.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ContractorListComponent implements OnInit {
  contractorList: Contractor[] = [];

  constructor(
    public _db: AngularFireDatabase,
    private _contractor: ContractorService,
    private _auth: AuthService
  ) {}

  ngOnInit() {
    this.fetch();
  }

  fetch() {
    this._contractor
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            _doc: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data: Contractor[]) => {
        this.contractorList = data;
      });
  }

  deleteCustomer(_id: string) {
    this._contractor.delete(_id).catch((error) => {
      console.log('Error delete: ', error);
    });
  }
}
