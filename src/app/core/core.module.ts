import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    AngularMaterialModule,
    FlexLayoutModule
  ],
  exports: [
    AngularMaterialModule,
    FlexLayoutModule
  ]
})
export class CoreModule { }