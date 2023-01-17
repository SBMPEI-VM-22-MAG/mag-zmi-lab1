import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { IRow } from '../../Models/base.model';
import { KemenyMedianService } from '../../Services/kemeny-median.service';
import { BinaryMatrixModel, IRowCells } from '../../Models/binary-matrix.model';
import { ArrayHelper } from '../../Helpers/array.helper';

@Component({
  selector: 'app-kemeny',
  templateUrl: './kemeny.component.html',
  styleUrls: ['./kemeny.component.scss'],
})
export class KemenyComponent implements OnInit, DoCheck {

  @Input() tableRanks: IRow[] = [];
  arrayBinaryMtx: BinaryMatrixModel[] = [];

  constructor(
    private srv: KemenyMedianService
  ) { }

  ngOnInit() {
    this.onComputeBinaryRels();
  }

  ngDoCheck(): void {
    this.onComputeBinaryRels();
  }

  onComputeBinaryRels() {
    this.arrayBinaryMtx = [];
    this.tableRanks.forEach(item => {
      const mtx = new BinaryMatrixModel(item);
      this.arrayBinaryMtx.push(mtx);
    });
  }
}
