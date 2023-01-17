/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable curly */
/* eslint-disable prefer-const */
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { IRow } from '../Models/base.model';
import { ArrayHelper } from '../Helpers/array.helper';

@Injectable({
  providedIn: 'root'
})
export class MedianRanksService extends BaseService {

  constructor() {
    super();
  }

  public getMedianRanks(table: IRow[]): IRow {
    let res: IRow = { value: [] };
    if (table.length > 0) {
      if (table[0].value.length > 0){
        for (let i = 0; i < table[0].value.length; i++) {
          let arr = this.getColValues(i, table);
          arr.value.sort(ArrayHelper.sortNumberArray);
          const length = arr.value.length;

          if (length % 2 === 0) {
            let rank = (arr.value[(length / 2) - 1] + arr.value[(length / 2)]) / 2;
            res.value.push(rank);
          } else {
            res.value.push(arr.value[Math.floor(length / 2)]);
          }
        }
        return res;
      } else return null;
    } else return null;
  }
}
