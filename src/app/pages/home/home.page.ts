/* eslint-disable max-len */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { ArithMeanRanksService } from '../../shared/Services/arith-mean-ranks.service';
import { MedianRanksService } from '../../shared/Services/median-ranks.service';
import { KemenyMedianService } from '../../shared/Services/kemeny-median.service';
import { BaseModel, IRow } from '../../shared/Models/base.model';
import { AlertController, AlertOptions, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  obj: BaseModel = new BaseModel(0, 0);

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private srv1: ArithMeanRanksService,
    private srv2: MedianRanksService,
    private srv3: KemenyMedianService
  ) { }

  ngOnInit() {
  }

  onCreateObjFromHomeWork() {
    this.obj = new BaseModel(6, 6);

    let rows: IRow[] = [
      {
        value: [6, 3, 5, 2, 4, 1]
      },
      {
        value: [6, 2, 4, 1, 5, 3]
      },
      {
        value: [3, 1, 2, 4, 6, 5]
      },
      {
        value: [5, 3, 2, 6, 4, 1]
      },
      {
        value: [5, 2, 6, 1, 4, 3]
      },
      {
        value: [1, 6, 4, 2, 3, 5]
      },
    ];

    for (let i = 0; i < rows.length; i++) {
      this.obj.setRowValues(i, rows[i]);
    }

    console.log(this.obj);
  }

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
          handler: (data: {cols: string, rows: string}): boolean => {
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

            this.obj = new BaseModel(Number(data.cols), Number(data.rows));
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
