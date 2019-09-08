import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../model/base-response';
import { TransactionPagination, DataTablePagination, TransactionFetched } from '../model/transaction';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class BlockchainService {
    constructor(
        private http: HttpClient,
        private snackBar: MatSnackBar
    ) {}

    /**
     * Fetch blockchain transactions
     * @param sort string
     * @param order string 
     * @param page number
     * @returns Observable<BaseResponse<Transaction[]>>
     */
    getTransactions(dataTablePagination: DataTablePagination): Observable<BaseResponse<TransactionPagination>> {
        const {sort, order, page, dateFrom, dateTo} = dataTablePagination;
        const url = `${environment.apiUrl}/blockchain?dateFrom=${dateFrom}&dateTo=${dateTo}&sort=${sort}&order=${order}&page=${page + 1}`;

        return this.http.get<BaseResponse<TransactionPagination>>(url);
    }
    
    /**
     * Fetch blockchain transactions
     * @param blockHash 
     * @returns Observable<BaseResponse<Transaction[]>>
     */
    fetchTransactions(blockHash: string): Observable<BaseResponse<TransactionFetched>> {
        const url = `${environment.apiUrl}/blockchain/pull-data?block_hash=${blockHash}`;
        
        return this.http.get<BaseResponse<TransactionFetched>>(url)
    }

    /**
     * Show alert message
     * @param message 
     * @returns void
     */
    openSnackBar(message: string): void {
        this.snackBar.open(message, '', {
          duration: 3000,
        });
      }
  }
  