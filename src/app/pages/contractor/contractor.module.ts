import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractorRoutingModule } from './contractor-routing.module';
import { ContractorListComponent } from './list/list.component';
import { ContractorCreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ContractorListComponent, ContractorCreateComponent],
  imports: [SharedModule, ContractorRoutingModule],
})
export class ContractorModule {}
