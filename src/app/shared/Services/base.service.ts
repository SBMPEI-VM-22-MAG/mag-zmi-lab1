/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { BaseModel, IRow } from '../Models/base.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  public getRowValues(idx: number, table: IRow[]): IRow {
    if(table.length > 0 && idx <= table.length) {
      return table[idx];
    } else {
      return null;
    }
  }

  public setRowValues(idx: number, row: IRow, table: IRow[]): IRow[] {
    if(table.length > 0 && idx <= table.length) {
      table[idx] = row;
      return table;
    } else return [];
  }

  public getColValues(idx: number, table: IRow[]): IRow {
    let res: IRow = { value: [] };
    if (table.length > 0) {
      if (table[0].value.length > 0 && idx <= table[0].value.length) {
        let values: number[] = [];
        table.forEach((item) => values.push(item.value[idx]));
        res.value = values;
        return res;
      } else return null;
    } else return null;
  }

  public setColValues(idx: number, row: IRow, table: IRow[]): IRow[] {
    if (table.length > 0 && row.value.length === table.length) {
      if (table[0].value.length > 0 && idx <= table[0].value.length) {
        let i = 0;
        table.forEach((item) => {
          item.value[idx] = row.value[i];
          i++;
        });
        return table;
      } else return [];
    }
  }

  // Sort ranks
  public sourceDataTransform(obj: BaseModel): IRow[] {
    let result: IRow[] = [];
    if (obj.table.length > 0) {
      obj.table.forEach(item => {
        let ranks: number[] = [];
        for(let i = 1; i <= item.value.length; i++) {
          ranks.push(item.value.indexOf(i) + 1);
        }
        result.push({ value: ranks });
      });
      return result;
    } else return [];
  }
}
