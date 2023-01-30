/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BinaryMatrixModel, ICell, IRowCells } from '../Models/binary-matrix.model';
import { IRow } from '../Models/base.model';

@Injectable({
  providedIn: 'root'
})
export class KemenyMedianService extends BaseService {

  constructor() {
    super();
  }

  public getPairwiseDistanceMatrix(arrMtx: BinaryMatrixModel[]): IRow[] {
    if (arrMtx.length === 0) return [];
    if (arrMtx[0].MatrixBinary.length === 0) return [];
    if (arrMtx[0].MatrixBinary[0].value.length === 0) return [];

    let result: IRow[] = [];
    let mtxV: BinaryMatrixModel[] = arrMtx; // A
    let mtxH: BinaryMatrixModel[] = arrMtx; // B

    for (let i = 0; i < mtxV.length; i++) {
      let row: IRow = { value: [] };
      for (let j = 0; j < mtxH.length; j++) {
        const val = this.getCalculationPairwiseDistances(mtxV[i].MatrixBinary, mtxH[j].MatrixBinary);
        row.value.push(val);
      }
      result.push(row);
    }

    return result;
  }

  private getCalculationPairwiseDistances(mtxA: IRow[], mtxB: IRow[]): number {
    if (mtxA.length === 0 && mtxB.length === 0) return -1;
    if (mtxA[0].value.length === 0 && mtxB[0].value.length === 0) return -1;

    let intermidateMtx: IRow[] = [];
    const countRows = mtxA.length;
    const countCols = mtxA[0].value.length;

    for (let i = 0; i < countRows; i++) {
      let row: IRow = { value: [] };
      for (let j = 0; j < countCols; j++) {
        const val = Math.abs(mtxA[i].value[j] - mtxB[i].value[j]);
        row.value.push(val);
      }
      intermidateMtx.push(row);
    }

    let result: number = 0;

    intermidateMtx.forEach(row => {
      row.value.forEach(item => {
        result += item;
      });
    });

    return result;
  }

  public getCalculationOfSumsOfDistancesAcrossRows(mtx: IRow[]): number[] {
    if (mtx.length === 0) return [];
    if (mtx[0].value.length === 0) return [];

    let result: number[] = [];
    for (let i = 0; i < mtx.length; i++) {
      let val = 0;
      for (let j = 0; j < mtx.length; j++) {
        val += mtx[i].value[j];
      }
      result.push(val);
    }

    return result;
  }

  private getCellsLossMtx(countProjects: number, colExpsMarks: IRow): IRow {
    if (countProjects <= 0 || colExpsMarks.value.length === 0) return { value: [] };
    let result: IRow = { value: [] };

    for (let i = 0; i < countProjects; i++) {
      let sum: number = 0;
      colExpsMarks.value.forEach(item => sum += Math.abs(i - item));
      result.value.push(sum);
    }
    return result;
  }

  public getLossMtx(preferenceVectors: IRow[]): IRow[] {
    if (preferenceVectors.length === 0) return [];

    let result: IRow[] = [];
    const countProjs: number = preferenceVectors[0].value.length;

    for (let i = 0; i < countProjs; i++) {
      const colVals: IRow = this.getColValues(i, preferenceVectors);
      const rowCellsLossMtx: IRow = this.getCellsLossMtx(countProjs, colVals);
      result.push(rowCellsLossMtx);
    }

    return result;
  }

  // assignment problem
  public getMinOfRowsCols(lossMtx: IRow[]): IRow[] {

    // console.log(Math.min.apply(Math, lossMtx[0].value));

    if (lossMtx.length === 0) return [];
    if (lossMtx[0].value.length === 0) return [];

    let mtxFirst: IRow[] = [];

    // поиск минимума в строке
    lossMtx.forEach(row => {
      let min = Math.min.apply(Math, row.value) as number;
      let rowFirst: IRow = { value: [] };
      row.value.forEach(cell => rowFirst.value.push(Math.abs(cell - min)));
      mtxFirst.push(rowFirst);
    });

    let mtxSecond: IRow[] = [];

    for (let i = 0; i < mtxFirst[0].value.length; i++) {
      let col = this.getColValues(i, mtxFirst);
      let min = Math.min.apply(Math, col.value) as number;

      let rowSecond: IRow = { value: [] };
      col.value.forEach(cell => rowSecond.value.push(Math.abs(cell - min)));
      mtxSecond.push(rowSecond);
    }

    let res: IRow[] = [];
    // console.log(res);
    for (let i = 0; i < mtxSecond.length; i++) {
      res.push({ value: [] });
    }

    for (let i = 0; i < res.length; i++) {
      for (let j = 0; j < mtxSecond.length; j++) {
        res[j].value.push(mtxSecond[i].value[j]);
      }
      // mtxSecond[i].value.forEach(cell => res[i].value.push(cell));
    }

    return res;
  }

  public getAssignmentMtx(input: IRow[]): IRow[] {
    if (input.length === 0) return [];
    if (input[0].value.length === 0) return [];

    let mtx: IRow[] = [];
    input.forEach(row => mtx.push({ value: [...row.value] }));

    // Create null mtx
    let resMtx: IRow[] = [];
    for (let i = 0; i < mtx.length; i++) {
      resMtx.push({ value: [] });
      for (let j = 0; j < mtx.length; j++) {
        resMtx[i].value.push(0);
      }
    }

    let idxRowArr: number[] = [-1];
    while (this.isAssignmentMtxFull(resMtx) !== true) {
      for (let i = 0; i < mtx.length; i++) {
        if (!idxRowArr.includes(i)) {
          let nullNum: number = 0;
          for (let j = 0; j < mtx.length; j++) {
            if (mtx[i].value[j] === 0) nullNum++;
          }

          if (nullNum === 1) {
            for (let j = 0; j < mtx.length; j++) {
              if (mtx[i].value[j] === 0) {
                resMtx[i].value[j] = 1;
                for(let k = 0; k < mtx.length; k++){
                  mtx[k].value[j] = -1;
                }
              }

              // console.log(mtx);
            }
            // mtx.forEach(row => row.value[idx] = -1);
            idxRowArr.push(i);
          }
        }
      }
    }


    return resMtx;
  }

  private isAssignmentMtxFull(assigMtx: IRow[]): boolean {
    for (let i = 0; i < assigMtx.length; i++) {
      const max = Math.max.apply(Math, assigMtx[i].value) as number;
      // console.log(max);
      if (max === 0) return false;
    }
    return true;
  }
}
