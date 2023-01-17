import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRow } from '../../Models/base.model';
import { ArithMeanRanksService } from '../../Services/arith-mean-ranks.service';

@Component({
  selector: 'app-mean-ranks',
  templateUrl: './mean-ranks.component.html',
  styleUrls: ['./mean-ranks.component.scss'],
})
export class MeanRanksComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];

  rowSum: IRow = { value: [] };
  rowMean: IRow = { value: [] };
  rowResult: IRow = { value: [] };

  constructor(
    private srv: ArithMeanRanksService
  ) { }

  ngDoCheck(): void {
    this.getComputeData();
  }

  ngOnInit() {
    this.getComputeData();
  }

  getComputeData(): void {
    this.rowSum = this.srv.getSumRanks(this.tableRanks);
    this.rowMean = this.srv.getMeanRanks(this.tableRanks.length, this.rowSum);
  }

}
