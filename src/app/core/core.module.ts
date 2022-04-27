import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoAuxComponent } from './components/info-aux/info-aux.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, InfoAuxComponent],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, InfoAuxComponent],
})
export class CoreModule {}
