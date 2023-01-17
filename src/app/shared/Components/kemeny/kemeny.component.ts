import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { IRow } from '../../Models/base.model';

@Component({
  selector: 'app-kemeny',
  templateUrl: './kemeny.component.html',
  styleUrls: ['./kemeny.component.scss'],
})
export class KemenyComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];

  constructor() { }

  ngOnInit() {}

  ngDoCheck(): void {
    console.log(this.tableRanks);
  }
}
