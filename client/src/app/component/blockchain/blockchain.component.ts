import { Component } from '@angular/core';
import { BlockchainService } from 'src/app/service/blockchain.service';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { BaseResponse } from 'src/app/model/base-response';
import { TransactionFetched } from 'src/app/model/transaction';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.scss']
})
export class BlockchainComponent {

  blockHash: FormControl;
  matcher: MyErrorStateMatcher;
  isFetching: boolean;

  constructor(
    private blockchainService: BlockchainService,
  ) {
    this.blockHash = new FormControl('', [Validators.required]);
    this.matcher = new MyErrorStateMatcher();
  }

  /**
   * On submit fetch transaction from blockchain
   */
  onSubmit(): void {
    const blockHash = this.blockHash.value; // Get block hash code

    // If block hash bot found
    if (blockHash === '' || blockHash === null) {
      this.blockchainService.openSnackBar("Blockchain's Block hash is required");
      return;
    }
    
    this.blockHash.disable(); // Set disabled form
    this.isFetching = true; // Set loading indication

    // Request to server
    this.blockchainService.fetchTransactions(blockHash).subscribe((res: BaseResponse<TransactionFetched>) => {
      const msg = res.status ? `${res.data.totalTransaction} ${res.message}` : res.message;
      this.blockchainService.openSnackBar(msg);
      
      this.isFetching = false; // Change loading indication
      this.blockHash.enable(); // Active form
      this.blockHash.reset(); // Reset value
    })
  }
}
