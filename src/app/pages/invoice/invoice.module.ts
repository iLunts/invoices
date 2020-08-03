import { NgModule } from '@angular/core';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './list/list.component';
import { InvoiceCreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCreateComponent],
  imports: [SharedModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
