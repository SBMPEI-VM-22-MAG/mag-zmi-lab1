/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { SelectChangeEventDetail, SelectCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  startBtnDisable: boolean = false;
  numCols: number = 0;
  numRows: number = 0;

  arrProjects: string[] = [];
  arrExperts: string[] = [];

  arrNum: {'str': string, 'val': number}[] = [
    { str: '3', val: 3 },
    { str: '4', val: 4 },
    { str: '5', val: 5 },
    { str: '6', val: 6 },
    { str: '7', val: 7 },
    { str: '8', val: 8 },
    { str: '9', val: 9 },
    { str: '10', val: 10 },
    { str: '11', val: 11 },
    { str: '12', val: 12 },
  ];

  constructor() {}

  ngOnInit(): void {

  }

  onLog(ev: SelectCustomEvent){
    console.log(ev.detail.value);
  }

  onCreateColsForProj(ev: SelectCustomEvent){
    this.numCols = ev.detail.value;

    this.arrProjects = [];

    for(let i = 0; i < this.numCols; i++){
      this.arrProjects.push('a' + (i + 1).toString());
    }
    console.log(this.numCols);
    // console.log(this.arrProjects);
  }

  onCreateRowsForExp(ev: SelectCustomEvent){
    this.numRows = ev.detail.value;

    this.arrExperts = [];

    for(let i = 0; i < this.numRows; i++){
      this.arrExperts.push('exp' + (i + 1).toString());
    }

    console.log(this.numRows);
    // console.log(this.arrExperts);
  }

  onStart() {
    this.startBtnDisable = true;
  }
  onClear() {
    this.startBtnDisable = false;
  }
}
