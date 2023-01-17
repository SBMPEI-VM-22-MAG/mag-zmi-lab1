import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MedianRanksService extends BaseService {

  constructor() {
    super();
  }
}
