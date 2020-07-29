import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './list/list.component';
import { InvoiceCreateComponent } from './create/create.component';

@NgModule({
  declarations: [InvoiceListComponent, InvoiceCreateComponent],
  imports: [CommonModule, InvoiceRoutingModule],
})
export class InvoiceModule {}
