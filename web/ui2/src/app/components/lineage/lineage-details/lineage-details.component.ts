import { Component, OnInit } from '@angular/core';
import { GraphService } from 'src/app/services/lineage/graph.service';

@Component({
  selector: 'lineage-details',
  templateUrl: './lineage-details.component.html',
  styleUrls: ['./lineage-details.component.less']
})
export class LineageDetailsComponent implements OnInit {

  detailsInfo: any = null

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.graphService.detailsInfo.subscribe(detailsInfo => {
      this.detailsInfo = detailsInfo
      console.log(this.detailsInfo)
    })
  }

  getType(): string {
    return this.detailsInfo._typeHint.split('.').pop()
  }

  getInputs() {
    let inputs = []
    this.detailsInfo.mainProps.inputs.forEach(input => {
      inputs.push(this.detailsInfo.mainProps.schemas[input])
    });
    return inputs
  }

  getOutput() {
    return this.detailsInfo.mainProps.schemas[this.detailsInfo.mainProps.output]
  }

}
