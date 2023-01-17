/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-delimiter-style */
import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { IRow } from '../../Models/base.model';
import { MedianRanksService } from '../../Services/median-ranks.service';

@Component({
  selector: 'app-median',
  templateUrl: './median.component.html',
  styleUrls: ['./median.component.scss'],
})
export class MedianComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];

  medianRanks: IRow = { value: [] };
  resultRanks: IRow = { value: [] };

  constructor(
    private srv: MedianRanksService
  ) { }


  ngOnInit() {
    this.onCompute();
  }

  ngDoCheck(): void {
    this.onCompute();
  }

  onCompute() {
    this.medianRanks = this.srv.getMedianRanks(this.tableRanks);
    this.resultRanks = this.medianRanks;
  }
}
