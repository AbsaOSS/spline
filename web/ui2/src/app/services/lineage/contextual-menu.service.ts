import { Injectable } from '@angular/core';
import { GraphService } from './graph.service';
import { LayoutService } from './layout.service';
import { OperationType } from 'src/app/types/operationTypes';

@Injectable({
  providedIn: 'root'
})
export class ContextualMenuService {

  constructor(
    private graphService: GraphService,
    private layoutService: LayoutService
  ) { }

  public getConfiguration() {
    let that = this;
    return {
      menuRadius: 90, // the radius of the circular menu in pixels
      selector: 'node', // elements matching this Cytoscape.js selector will trigger cxtmenus
      fillColor: 'rgba(0, 0, 0, 0.75)', // the background colour of the menu
      activeFillColor: 'rgba(1, 105, 217, 0.75)', // the colour used to indicate the selected command
      activePadding: 0, // additional size in pixels for the active command
      indicatorSize: 20, // the size in pixels of the pointer to the active command
      separatorWidth: 0, // the empty spacing in pixels between successive commands
      spotlightPadding: 0, // extra spacing in pixels between the element and the spotlight
      minSpotlightRadius: 20, // the minimum radius in pixels of the spotlight
      maxSpotlightRadius: 20, // the maximum radius in pixels of the spotlight
      openMenuEvents: 'cxttapstart taphold', // space-separated cytoscape events that will open the menu; only `cxttapstart` and/or `taphold` work here
      itemColor: 'orange', // the colour of text in the command's content
      itemTextShadowColor: 'transparent', // the text shadow colour of the command's content
      zIndex: 9999, // the z-index of the ui div
      atMouse: false, // draw menu at mouse position
      commands: [
        {
          content: '<span class="fa fa-info-circle fa-2x"></span><b>Details</b>',
          select: function (ele) {
            console.log(ele.id())
          }
        },
        {
          content: '<span class="fa fa-plus-circle fa-2x"></span><b>Expand</b>',
          select: function (ele, event) {
            console.log("Define here whatever callback you want")
          },
          enabled: false
        },
        {
          content: '<span class="fa fa-crop fa-2x"></span><b>Focus</b>',
          select: function (ele, event) {
            event.cy.elements().remove()
            that.graphService.getGraphData(ele.id(), 5).subscribe(
              response => {
                response.nodes.forEach(node => {
                  node.data["icon"] = that.graphService.getIconFromOperationType(<any>OperationType[node.data.operationType])
                  node.data["color"] = that.graphService.getColorFromOperationType(<any>OperationType[node.data.operationType])
                });
                event.cy.add(response)
              },
              error => {
                //Simply log the error from now
                console.log(error)
                //TODO : Implement a notification tool for letting know what is happening to the user
              },
              () => {
                event.cy.layout(that.layoutService.getConfiguration()).run()
              }
            )
          }
        }
      ]
    }

  }
}
