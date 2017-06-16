import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DjangoService } from '../services/django.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DjangoService
  ],
  declarations: []
})

export class UserModule {

}
