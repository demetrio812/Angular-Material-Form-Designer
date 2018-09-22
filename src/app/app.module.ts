import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EditorService} from './editor.service';
import {ConverterService} from './converter.service';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import { ElementPreviewComponent } from './element-preview/element-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ElementPreviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CovalentHighlightModule,
    CovalentDynamicFormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [EditorService, ConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
