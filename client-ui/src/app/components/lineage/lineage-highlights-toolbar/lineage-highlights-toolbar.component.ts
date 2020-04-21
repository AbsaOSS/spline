import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { AttributeVM } from '../../../model/viewModels/attributeVM'
import { getLineageGraphLegend, LineageGraphLegend } from '../models'


@Component({
  selector: 'lineage-highlights-toolbar',
  templateUrl: './lineage-highlights-toolbar.component.html',
  styleUrls: ['./lineage-highlights-toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineageHighlightsToolbarComponent {

  @Input() attributes: AttributeVM[]

  @Output() removeAttribute$ = new EventEmitter<AttributeVM>()

  readonly lineageGraphLegend: LineageGraphLegend[] = getLineageGraphLegend()

  onAttributeRemoveIconClicked(attribute: AttributeVM): void {
    this.removeAttribute$.emit(attribute)
  }
}
