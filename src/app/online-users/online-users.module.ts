import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DjangoService } from '../services/django.service';
import { TornadoService } from '../services/tornado.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    DjangoService,
    TornadoService
  ],
  declarations: []
})

export class OnlineUsersModule {

}
