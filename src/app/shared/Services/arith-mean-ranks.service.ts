/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IRow } from '../Models/base.model';

@Injectable({
  providedIn: 'root'
})
export class ArithMeanRanksService extends BaseService {

  constructor() {
    super();
  }

  public getSumRanks(table: IRow[]): IRow {
    let res: IRow = { value: [] };

    if (table.length > 0) {
      if (table[0].value.length > 0) {
        for(let i = 0; i < table[0].value.length; i++) {
          let colVals = this.getColValues(i, table);
          let sum: number = 0;
          colVals.value.forEach(item => sum += item);
          res.value.push(sum);
        }
        return res;
      } else return null;
    }else return null;
  }

  public getMeanRanks(length: number, row: IRow): IRow {
    let res: IRow = { value: [] };

    if (row.value.length !== 0 && length !== 0) {
      row.value.forEach(item => res.value.push(item / length));
      return res;
    } else return null;
  }
}
