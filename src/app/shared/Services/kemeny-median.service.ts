/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable curly */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ICell, IRowCells } from '../Models/binary-matrix.model';
import { IRow } from '../Models/base.model';

@Injectable({
  providedIn: 'root'
})
export class KemenyMedianService extends BaseService {

  constructor() {
    super();
  }
}
