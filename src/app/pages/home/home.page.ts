/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable id-blacklist */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable max-len */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { BaseModel, IRow } from '../../shared/Models/base.model';
import { AlertController, AlertInput, AlertOptions, SegmentCustomEvent, ToastController } from '@ionic/angular';
import { BaseService } from '../../shared/Services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  obj: BaseModel = new BaseModel(0, 0);
  dataTranform: IRow[] = [];
  isComputed: boolean = false;
  // isComputed: boolean = !false;

  private _segmentVal: string = 'kemeny';

  get segmentValue(): string {
    return this._segmentVal;
  }

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private srvBase: BaseService,
  ) { }

  ngOnInit() {
  }

  onLog(ev: any) {
    console.log(ev);
  }

  onChangeSegment(ev: any) {
    // console.log(ev.detail.value);

    this._segmentVal = (ev as SegmentCustomEvent).detail.value;
  }

  onCreateObjFromHomeWork() {
    this.obj = new BaseModel(5, 5);

    let rows: IRow[] = [
      // {
      //   value: [6, 3, 5, 2, 4, 1]
      // },
      // {
      //   value: [6, 2, 4, 1, 5, 3]
      // },
      // {
      //   value: [3, 1, 2, 4, 6, 5]
      // },
      // {
      //   value: [5, 3, 2, 6, 4, 1]
      // },
      // {
      //   value: [5, 2, 6, 1, 4, 3]
      // },
      // {
      //   value: [1, 6, 4, 2, 3, 5]
      // },

      {
        value: [5, 2, 4, 1, 3]
      },
      {
        value: [2, 5, 4, 1, 3]
      },
      {
        value: [5, 3, 2, 1, 4]
      },
      {
        value: [5, 2, 1, 4, 3]
      },
      {
        value: [2, 4, 3, 5, 1]
      },
    ];

    for (let i = 0; i < rows.length; i++) {
      this.obj.setRowValues(i, rows[i]);
    }

    // this.dataTranform = this.srvBase.sourceDataTransform(this.obj);

    // console.log(this.obj);
  }

  onClear() {
    this.obj = new BaseModel(0, 0);
    this.dataTranform = [];
    this.isComputed = false;
  }

  onCompute() {
    this.dataTranform = this.srvBase.sourceDataTransform(this.obj);
    this.isComputed = true;
  }

  async onEditTable() {

    let alertInputs: AlertInput[] = [];
    const table = this.obj.table;
    table.forEach((item, idx) => alertInputs.push({
      name: `exp${idx + 1}`,
      // type: 'number',
      placeholder: `Expert #${ idx + 1 }`,
      value: item.value.toString(),
      tabindex: idx + 1
    }));

    const opts: AlertOptions = {
      header: 'Please enter info about table',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
            this.presentErrorToast('Cancel');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data) => {
            console.log(data);

            const tb = this.obj.table;
            const len = tb.length;
            const updDataTb: IRow[] = this.alertEditReorder(data, len);

            this.obj = new BaseModel(this.obj.colsCount, this.obj.rowsCount, updDataTb);
            this.dataTranform = [];
            this.isComputed = false;

            this.dataTranform = this.srvBase.sourceDataTransform(this.obj);
            const msg = `Success!! Your data was edited! Now you can compute!`;
            this.presentSuccesToast(msg);
            return true;
          },
        },
      ],
      inputs: alertInputs,
    };

    const alert = await this.alertController.create(opts);

    await alert.present();
  }

  private alertEditReorder(data: any, tbLen: number): IRow[] {
    let resTable: IRow[] = [];

    switch(tbLen) {
      case 4:
        const tb4: TableRow4 = data as TableRow4;
        resTable.push( { value: this.stringArrToNumArr(tb4.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb4.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb4.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb4.exp4) } );
        return resTable;
        break;

      case 5:
        const tb5: TableRow5 = data as TableRow5;
        resTable.push( { value: this.stringArrToNumArr(tb5.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb5.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb5.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb5.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb5.exp5) } );
        return resTable;
        break;

      case 6:
        const tb6: TableRow6 = data as TableRow6;
        resTable.push( { value: this.stringArrToNumArr(tb6.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb6.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb6.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb6.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb6.exp5) } );
        resTable.push( { value: this.stringArrToNumArr(tb6.exp6) } );
        return resTable;
        break;

      case 7:
        const tb7: TableRow7 = data as TableRow7;
        resTable.push( { value: this.stringArrToNumArr(tb7.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp5) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp6) } );
        resTable.push( { value: this.stringArrToNumArr(tb7.exp7) } );
        return resTable;
        break;

      case 8:
        const tb8: TableRow8 = data as TableRow8;
        resTable.push( { value: this.stringArrToNumArr(tb8.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp5) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp6) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp7) } );
        resTable.push( { value: this.stringArrToNumArr(tb8.exp8) } );
        return resTable;
        break;

      case 9:
        const tb9: TableRow9 = data as TableRow9;
        resTable.push( { value: this.stringArrToNumArr(tb9.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp5) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp6) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp7) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp8) } );
        resTable.push( { value: this.stringArrToNumArr(tb9.exp9) } );
        return resTable;
        break;

      case 10:
        const tb10: TableRow10 = data as TableRow10;
        resTable.push( { value: this.stringArrToNumArr(tb10.exp1) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp2) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp3) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp4) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp5) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp6) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp7) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp8) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp9) } );
        resTable.push( { value: this.stringArrToNumArr(tb10.exp10) } );
        break;

      default:
        console.log('....');
        return [];
        break;
    }
  }

  private stringArrToNumArr(data: string): number[] {
    const interm: string[] = data.split(',');
    let result: number [] = [];
    interm.forEach(item => result.push(Number(item)));
    return result;
  }

  // ####################################3
  // ####################################3
  // ####################################3
  // ####################################3

  async onCreateBaseTable() {

    const opts: AlertOptions = {
      header: 'Please enter info about table',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel');
            this.presentErrorToast('Cancel');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: (data: { cols: string, rows: string }): boolean => {
            // console.log(Number(data.cols));
            if (Number(data.cols) < 4 || Number(data.rows) < 4) {
              const errMsg = `Values of cols and rows musb be >= 4 and <= 10!! Your: [cols: ${Number(data.cols)}, rows: ${Number(data.rows)}]`;
              this.presentErrorToast(errMsg);
              return false;
            }

            if (Number(data.cols) > 10 || Number(data.rows) > 10) {
              const errMsg = `Values of cols and rows musb be >= 4 and <= 10!! Your: [cols: ${Number(data.cols)}, rows: ${Number(data.rows)}]`;
              this.presentErrorToast(errMsg);
              return false;
            }

            this.dataTranform = [];
            this.isComputed = false;

            this.obj = new BaseModel(Number(data.cols), Number(data.rows));
            this.dataTranform = this.srvBase.sourceDataTransform(this.obj);
            const msg = `Success!! You created table with [cols: ${Number(data.cols)}, rows: ${Number(data.rows)}]`;
            this.presentSuccesToast(msg);
            return true;
          },
        },
      ],
      inputs: [
        {
          name: 'cols',
          type: 'number',
          placeholder: 'Cols',
          min: 1,
          max: 10
        },
        {
          name: 'rows',
          type: 'number',
          placeholder: 'Rows',
          min: 1,
          max: 10
        },
      ],
    };

    const alert = await this.alertController.create(opts);

    await alert.present();
  }

  async presentErrorToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'danger',
      position: 'top',
      icon: 'alert-circle-outline'
    });

    await toast.present();
  }

  async presentSuccesToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: 'success',
      position: 'top',
      icon: 'checkmark-circle-outline'
    });

    await toast.present();
  }

}

export interface TableRow4 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
}

export interface TableRow5 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
}

export interface TableRow6 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
  exp6: string;
}

export interface TableRow7 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
  exp6: string;
  exp7: string;
}

export interface TableRow8 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
  exp6: string;
  exp7: string;
  exp8: string;
}

export interface TableRow9 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
  exp6: string;
  exp7: string;
  exp8: string;
  exp9: string;
}

export interface TableRow10 {
  exp1: string;
  exp2: string;
  exp3: string;
  exp4: string;
  exp5: string;
  exp6: string;
  exp7: string;
  exp8: string;
  exp9: string;
  exp10: string;
}
