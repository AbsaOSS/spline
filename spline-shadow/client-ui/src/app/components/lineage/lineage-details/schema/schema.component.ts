import { Component, OnInit, Input } from '@angular/core';
import { SchemaType } from 'src/app/types/schemaType';
import { PropertyType } from 'src/app/types/propertyType';

@Component({
  selector: 'schema',
  templateUrl: './schema.component.html',
  styleUrls: ['./schema.component.less']
})
export class SchemaComponent implements OnInit {

  @Input()
  schemaId: string

  @Input()
  schemaType: SchemaType

  @Input()
  schema: any

  constructor() { }

  ngOnInit() {
    console.log(this.schemaId)
  }

  getSchemaTypeLabel(): any {
    switch (this.schemaType) {
      case SchemaType.Input: return "<i class='fa fa-arrow-circle-right text-success'></i> Input"
      case SchemaType.Output: return "<i class='fa fa-arrow-circle-left text-danger'></i> Output"
      default: return "<i class='fa fa-arrow-circle-right'></i> Schema"
    }
  }


  getPropertyType(propertyType: string): any {
    switch (propertyType) {
      case PropertyType.Struct: return "Struct"
      case PropertyType.Array: return "Array"
      case PropertyType.Simple: return "Simple"
      default: return ""
    }
  }
}
