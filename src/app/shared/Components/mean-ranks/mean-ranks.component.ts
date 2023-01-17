/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IRow } from '../../Models/base.model';
import { ArithMeanRanksService } from '../../Services/arith-mean-ranks.service';
import { ArrayHelper } from '../../Helpers/array.helper';

@Component({
  selector: 'app-mean-ranks',
  templateUrl: './mean-ranks.component.html',
  styleUrls: ['./mean-ranks.component.scss'],
})
export class MeanRanksComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];

  resString: { name: string, rank: number }[] = [];

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
    this.rowResult = this.srv.getResRanks(this.rowMean);

    this.resString = [];

    let idx = 1;
    this.rowResult.value.forEach(item => {
      this.resString.push({
        name: `a${ idx }`,
        rank: item
      });
      idx++;
    });

    this.resString.sort(ArrayHelper.sortNumberValues);
  }

}
