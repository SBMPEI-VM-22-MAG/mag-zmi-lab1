/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { IRow } from './base.model';
import { ArrayHelper } from '../Helpers/array.helper';
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/no-empty-interface */

export interface ICell {
  name: string;
  rank: number;
}

export interface IRowCells {
  values: ICell[];
}

// export interface IExpertRankings {
//   experts: ICell[];
// }

export class BinaryMatrixModel {
  private _expertRankings: ICell[] = [];
  private _matrixBinary: IRow[] = [];

  public get ExpertRankingsVal(): ICell[] {
    if(this._expertRankings.length > 0) return this._expertRankings;
    else return [];
  }

  public get ExpertRankingsValSortRanks(): ICell[] {
    if(this._expertRankings.length > 0) {
      const res = this._expertRankings.sort(ArrayHelper.sortNumberValues);
      return res;
    }
    else return [];
  }

  public get ExpertRankingsValSortName(): ICell[] {
    if(this._expertRankings.length > 0) {
      const res = this._expertRankings.sort(ArrayHelper.sortStringValues);
      return res;
    }
    else return [];
  }

  public get MatrixBinary(): IRow[] {
    return this._matrixBinary;
  }

  constructor(row: IRow) {
    this.writeExpRankings(row);
    this._matrixBinary = this.getMatrixBinaryRelationship(this._expertRankings);
  }

  private writeExpRankings(row: IRow) {
    let idx: number = 1;
    row.value.forEach(item => {
      this._expertRankings.push({
        name: `a${ idx }`,
        rank: item
      });
      idx++;
    });
  }

  private getMatrixBinaryRelationship(expRankings: ICell[]): IRow[] {
    let rowV: ICell[] = expRankings; // A
    let rowH: ICell[] = expRankings; // B

    let resultMatrix: IRow[] = [];

    if (expRankings.length > 0) {
      for(let i = 0; i < rowV.length; i++) {
        let resultRowH: IRow = { value: [] };
        for(let j = 0; j < rowH.length; j++) {
          if ((rowV[i].rank >= rowH[j].rank)) {
            // console.log('V', rowV[i].rank, 'H', rowH[j].rank);
            resultRowH.value.push(1);
          } else {
            resultRowH.value.push(0);
          }
        }
        resultMatrix.push(resultRowH);
      }
      return resultMatrix;
    } else return [];
  }

}
