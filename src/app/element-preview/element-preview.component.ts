import {Component, Input, OnInit} from '@angular/core';
import {FormComponent} from '../model/model';

@Component({
  selector: 'app-element-preview',
  templateUrl: './element-preview.component.html',
  styleUrls: ['./element-preview.component.css']
})
export class ElementPreviewComponent implements OnInit {

  @Input() element: FormComponent;

  constructor() { }

  ngOnInit() {
  }

}
