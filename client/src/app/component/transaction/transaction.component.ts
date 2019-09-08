import {Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { BlockchainService } from 'src/app/service/blockchain.service';
import { Transaction, TransactionPagination } from 'src/app/model/transaction';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  displayedColumns: string[] = ['time', 'hash', 'weight', 'size'];
  dataSource = new MatTableDataSource<Transaction>();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  form: FormGroup;

  constructor(
    private blockchainService: BlockchainService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      dateFrom: [null],
      dateTo: [null]
    })
  }

  /**
   * Get Table data
   */
  private getTableData(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    
    const {dateFrom, dateTo} = this.form.value; // Get Date from and to

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.blockchainService.getTransactions({
            sort: this.sort.active, 
            order: this.sort.direction,
            page: this.paginator.pageIndex,
            dateFrom: this.stringToDate(dateFrom),
            dateTo: this.stringToDate(dateTo)
          });
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.data.count;
          const msg = this.resultsLength === 0 ? 'Transaction not found' : `${this.resultsLength} Transactions found`;
          this.blockchainService.openSnackBar(msg)

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      ).subscribe((data: TransactionPagination) => this.dataSource.data = data.rows);
  }

  stringToDate(date: string): number {
    return Date.parse(date);
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Search form data
   */
  onSearchSubmit(): void {
    this.getTableData();
  }
}
