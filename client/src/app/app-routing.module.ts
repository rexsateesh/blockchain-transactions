import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionComponent } from './component/transaction/transaction.component';
import { BlockchainComponent } from './component/blockchain/blockchain.component';
import { DashbpardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  {path: '', component: DashbpardComponent},
  {path: 'blockchain', component: BlockchainComponent},
  {path: 'blockchain/transaction', component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
