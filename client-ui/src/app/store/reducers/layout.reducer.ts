/*
 * Copyright 2019 ABSA Group Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as LayoutActions from '../actions/layout.actions'


export type Action = LayoutActions.LayoutActions

function getConfiguration(): any {
  return {
    name: 'klay',
    nodeDimensionsIncludeLabels: false, // Boolean which changes whether label dimensions are included when calculating node dimensions
    fit: true, // Whether to fit
    padding: 40, // Padding on fit
    animate: false, // Whether to transition the node positions
    animateFilter: function (node, i) {
      return true
    }, // Whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
    animationDuration: 800, // Duration of animation in ms if enabled
    animationEasing: 'cubic-bezier(.85,.19,.07,.58)', // Easing of animation if enabled
    transform: function (node, pos) {
      return pos
    }, // A function that applies a transform to the final node position
    ready: undefined, // Callback on layoutready
    stop: undefined, // Callback on layoutstop
    klay: {
      // Following descriptions taken from
      // http://layout.rtsys.informatik.uni-kiel.de:9444/Providedlayout.html?algorithm=de.cau.cs.kieler.klay.layered
      addUnnecessaryBendpoints: false, // Adds bend points even if an edge does not change direction.
      aspectRatio: 1.6, // The aimed aspect ratio of the drawing, that is the quotient of width by height
      borderSpacing: 20, // Minimal amount of space to be left to the border
      compactComponents: false, // Tries to further compact components (disconnected sub-graphs).
      crossingMinimization: 'LAYER_SWEEP', // Strategy for crossing minimization.
      cycleBreaking: 'GREEDY', // Strategy for cycle breaking. Cycle breaking looks for cycles in the graph and determines which
      // edges to reverse to break the cycles. Reversed edges will end up pointing to the opposite direction of regular edges
      // (that is, reversed edges will point left if edges usually point right).
      direction: 'DOWN', // Overall direction of edges: horizontal (right / left) or vertical (down / up)
      /* UNDEFINED, RIGHT, LEFT, DOWN, UP */
      edgeRouting: 'SPLINES', // Defines how edges are routed (POLYLINE, ORTHOGONAL, SPLINES)
      edgeSpacingFactor: 0.5, // Factor by which the object spacing is multiplied to arrive at the minimal spacing between edges.
      feedbackEdges: false, // Whether feedback edges should be highlighted by routing around the nodes.
      fixedAlignment: 'LEFTUP', // Tells the BK node placer to use a certain alignment instead of taking the optimal result.
      /* NONE Chooses the sTmallest layout from the four possible candidates.
            LEFTUP Chooses the left-up candidate from the four possible candidates.
            RIGHTUP Chooses the right-up candidate from the four possible candidates.
            LEFTDOWN Chooses the left-down candidate from the four possible candidates.
            RIGHTDOWN Chooses the right-down candidate from the four possible candidates.
            BALANCED Creates a balanced layout from the four possible candidates. */
      inLayerSpacingFactor: 1.0, // Factor by which the usual spacing is multiplied to determine the in-layer spacing between objects.
      layoutHierarchy: true, // Whether the selected layouter should consider the full hierarchy
      linearSegmentsDeflectionDampening: 0.3, // Dampens the movement of nodes to keep the diagram from getting too large.
      mergeEdges: false, // Edges that have no ports are merged so they touch the connected nodes at the same points.
      // If hierarchical layout is active, hierarchy-crossing edges use as few hierarchical ports as possible.
      mergeHierarchyCrossingEdges: true,
      nodeLayering: 'NETWORK_SIMPLEX', // Strategy for node layering.
      nodePlacement: 'BRANDES_KOEPF', // Strategy for Node Placement
      // Seed used for pseudo-random number generators to control the layout algorithm; 0 means a new seed is generated
      randomizationSeed: 1,
      routeSelfLoopInside: false, // Whether a self-loop is routed around or inside its node.
      separateConnectedComponents: true, // Whether each connected component should be processed separately
      spacing: 150, // Overall setting for the minimal amount of space to be left between objects
      thoroughness: 8 // How much effort should be spent to produce a nice layout..
    },
    priority: function (edge) {
      return null
    }, // Edges with a non-nil value are skipped when geedy edge cycle breaking is enabled
  }
}

export function layoutReducer(state: any, action: Action): any {
  switch (action.type) {
    case LayoutActions.LayoutActionTypes.LAYOUT_GET:
      return getConfiguration()
    default:
      return state
  }
}
