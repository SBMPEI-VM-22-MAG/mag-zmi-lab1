import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumMarkToStrPipe } from '../Pipes/num-mark-to-str.pipe';
import { MeanRanksComponent } from '../Components/mean-ranks/mean-ranks.component';
import { MedianComponent } from '../Components/median/median.component';
import { KemenyComponent } from '../Components/kemeny/kemeny.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    NumMarkToStrPipe,
    MeanRanksComponent,
    MedianComponent,
    KemenyComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NumMarkToStrPipe,
    MeanRanksComponent,
    MedianComponent,
    KemenyComponent,
    IonicModule
  ]
})
export class SharedModule { }
