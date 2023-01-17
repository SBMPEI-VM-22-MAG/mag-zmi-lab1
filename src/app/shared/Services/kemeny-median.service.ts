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
    if(arrMtx.length === 0) return [];
    if(arrMtx[0].MatrixBinary.length === 0) return [];
    if(arrMtx[0].MatrixBinary[0].value.length === 0) return [];

    let result: IRow[] = [];
    let mtxV: BinaryMatrixModel[] = arrMtx; // A
    let mtxH: BinaryMatrixModel[] = arrMtx; // B

    for(let i = 0; i < mtxV.length; i++){
      let row: IRow = { value: [] };
      for(let j = 0; j < mtxH.length; j++) {
        const val = this.getCalculationPairwiseDistances(mtxV[i].MatrixBinary, mtxH[j].MatrixBinary);
        row.value.push(val);
      }
      result.push(row);
    }

    return result;
  }

  private getCalculationPairwiseDistances(mtxA: IRow[], mtxB: IRow[]): number {
    if (mtxA.length === 0 && mtxB.length === 0) return -1;
    if(mtxA[0].value.length === 0 && mtxB[0].value.length === 0) return -1;

    let intermidateMtx: IRow[] = [];
    const countRows = mtxA.length;
    const countCols = mtxA[0].value.length;

    for(let i = 0; i < countRows; i++) {
      let row: IRow = { value: [] };
      for(let j = 0; j < countCols; j++) {
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
    if(mtx.length === 0) return [];
    if(mtx[0].value.length === 0) return [];

    let result: number[] = [];
    for(let i = 0; i < mtx.length; i++) {
      let val = 0;
      for(let j = 0; j < mtx.length; j++) {
        val += mtx[i].value[j];
      }
      result.push(val);
    }

    return result;
  }
}
