/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/prefer-for-of */
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
  answerDistanse: IKemenyDistanseRes[] = [];


  preferenceVectors: IRow[] = [];
  lossMtx: IRow[] = [];

  assignmentMtx1: IRow[] = [];
  assignmentMtx2: IRow[] = [];

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
    this.preferenceVectors = [];
    this.tableRanks.forEach(item => {
      const mtx = new BinaryMatrixModel(item);
      this.arrayBinaryMtx.push(mtx);
    });
    this.pairwiseDistanceMatrix = this.srv.getPairwiseDistanceMatrix(this.arrayBinaryMtx);
    this.arrSum = this.srv.getCalculationOfSumsOfDistancesAcrossRows(this.pairwiseDistanceMatrix);
    this.answerDistanse = this.getDistanseAnswer();

    this.tableRanks.forEach(row => {
      const prefRow: IRow = { value: [] };
      row.value.forEach(item => prefRow.value.push((item - 1)));
      this.preferenceVectors.push(prefRow);
    });

    this.lossMtx = this.srv.getLossMtx(this.preferenceVectors);

    this.assignmentMtx1 = this.srv.getMinOfRowsCols(this.lossMtx);
  }

  private getMin(dt: number[]) {
    return Math.min.apply(Math, dt);
  }

  private getExpRanks(data: BinaryMatrixModel): string {
    const sortRow: ICell[] = data.ExpertRankingsValSortRanks;
    let res: string[] = [];
    sortRow.forEach(item => res.push(item.name));
    return res.toString();
  }

  private getDistanseAnswer(): IKemenyDistanseRes[] {
    let answerArr: IKemenyDistanseRes[] = [];
    const min: number = Math.min.apply(Math, this.arrSum);

    const search = ',';
    const replaceWith = ', ';

    for(let i = 0; i < this.arrSum.length; i++) {
      if (this.arrSum[i] === min) {
        answerArr.push({
          answer: `Expert #${ i + 1 }: ${ this.getExpRanks(this.arrayBinaryMtx[i]).split(search).join(replaceWith) }`
        });
      }
    }
    return answerArr;
  }
}

export interface IKemenyDistanseRes {
  // expert: string;
  // ranksStr: string;
  answer: string;
}
