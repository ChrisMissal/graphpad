import { Network } from 'vis-network';
import type { GraphEngine } from '../graph/GraphEngine';

export class GraphVisualizer {
  private network: Network | null = null;

  render(engine: GraphEngine, containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    const nodes = engine.getNodes().map(node => ({
      id: node.id,
      label: node.label
    }));

    const edges = engine.getEdges().map((edge, index) => ({
      id: `edge-${index}`,
      from: edge.source,
      to: edge.target,
      label: edge.relation,
      arrows: 'to'
    }));

    const data = {
      nodes: nodes,
      edges: edges
    };

    const options = {
      nodes: {
        shape: 'box',
        margin: 10,
        font: {
          size: 14
        }
      },
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1
          }
        },
        font: {
          size: 12,
          align: 'middle'
        },
        smooth: {
          type: 'curvedCW',
          roundness: 0.2
        }
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -8000,
          springConstant: 0.04,
          springLength: 200
        }
      }
    };

    this.network = new Network(container, data, options);
  }

  destroy(): void {
    if (this.network) {
      this.network.destroy();
      this.network = null;
    }
  }
}
