import { Component, OnInit, Input } from '@angular/core';
import { SchemaType } from 'src/app/types/schemaType';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.less']
})
export class SchemaComponent implements OnInit {

  @Input()
  schemaType: SchemaType;

  @Input()
  schema: any;

  constructor() { }

  ngOnInit() {
    console.log(this.schemaType)
  }

  getSchemaTypeLabel(): any {
    switch (this.schemaType) {
      case SchemaType.Input: return "<i class='fa fa-arrow-circle-right text-success'></i> Input"
      case SchemaType.Output: return "<i class='fa fa-arrow-circle-left text-danger'></i> Output"
      default: return "<i class='fa fa-arrow-circle-right'></i> Schema"
    }
  }

}
