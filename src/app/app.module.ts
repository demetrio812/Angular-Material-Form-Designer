import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule, MatExpansionModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatSelectModule,
  MatSidenavModule, MatTabsModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {EditorService} from './editor.service';
import {ConverterService} from './converter.service';
import {CovalentHighlightModule} from '@covalent/highlight';
import {CovalentDynamicFormsModule} from '@covalent/dynamic-forms';
import { ElementPreviewComponent } from './element-preview/element-preview.component';
import {ReactiveFormsModule} from '@angular/forms';
import { RemoveNewLinesPipe } from './shared/pipes/remove-new-lines.pipe';
import { MinimiseJsonPipe } from './shared/pipes/minimise-json.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ElementPreviewComponent,
    RemoveNewLinesPipe,
    MinimiseJsonPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
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
    MatInputModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [EditorService, ConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
