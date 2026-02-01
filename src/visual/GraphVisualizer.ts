import { Network } from 'vis-network';
import type { GraphEngine } from '../graph/GraphEngine';

export class GraphVisualizer {
  private network: Network | null = null;

  private getEdgeColor(relation: string): string {
    // Check if it's a transitive edge (contains →)
    if (relation.includes('→')) {
      return '#607D8B'; // Gray for transitive
    }
    
    // Color by base relation type
    const colors: Record<string, string> = {
      'is-a': '#2196F3',      // Blue
      'parent-of': '#4CAF50', // Green
      'manages': '#FF9800',   // Orange
      'works-with': '#9C27B0' // Purple
    };
    
    return colors[relation] || '#999999'; // Default gray
  }

  render(engine: GraphEngine, containerId: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    const nodes = engine.getNodes().map(node => ({
      id: node.id,
      label: node.label
    }));

    const edges = engine.getEdges().map((edge, index) => {
      const color = this.getEdgeColor(edge.relation);
      const isTransitive = edge.relation.includes('→');
      
      return {
        id: `edge-${index}`,
        from: edge.source,
        to: edge.target,
        label: edge.relation,
        arrows: 'to',
        color: {
          color: color,
          highlight: color,
          hover: color,
          opacity: isTransitive ? 0.5 : 1.0
        },
        width: isTransitive ? 1 : 2,
        dashes: isTransitive
      };
    });

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
          size: 11,
          align: 'middle',
          background: 'white',
          strokeWidth: 0
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
