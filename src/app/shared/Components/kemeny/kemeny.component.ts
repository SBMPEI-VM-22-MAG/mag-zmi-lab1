/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { IRow } from '../../Models/base.model';
import { KemenyMedianService } from '../../Services/kemeny-median.service';
import { BinaryMatrixModel, IRowCells, ICell } from '../../Models/binary-matrix.model';
import { ArrayHelper } from '../../Helpers/array.helper';

@Component({
  selector: 'app-kemeny',
  templateUrl: './kemeny.component.html',
  styleUrls: ['./kemeny.component.scss'],
})
export class KemenyComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];
  arrayBinaryMtx: BinaryMatrixModel[] = [];
  pairwiseDistanceMatrix: IRow[] = [];
  arrSum: number [] = [];

  constructor(
    private srv: KemenyMedianService
  ) { }

  ngOnInit() {
    this.onComputeBinaryRels();
  }

  ngDoCheck(): void {
    this.onComputeBinaryRels();
  }

  onComputeBinaryRels() {
    this.arrayBinaryMtx = [];
    this.tableRanks.forEach(item => {
      const mtx = new BinaryMatrixModel(item);
      this.arrayBinaryMtx.push(mtx);
    });
    this.pairwiseDistanceMatrix = this.srv.getPairwiseDistanceMatrix(this.arrayBinaryMtx);
    this.arrSum = this.srv.getCalculationOfSumsOfDistancesAcrossRows(this.pairwiseDistanceMatrix);
  }

  getMin(dt: number[]) {
    return Math.min.apply(Math, dt);
  }

  getExpRanks(data: BinaryMatrixModel): string {
    const sortRow: ICell[] = data.ExpertRankingsValSortRanks;
    let res: string[] = [];
    sortRow.forEach(item => res.push(item.name));
    return res.toString();
  }
}
