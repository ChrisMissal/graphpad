import { Network } from 'vis-network';
import type { GraphEngine } from '../graph/GraphEngine';

export interface RelationStyle {
  label: string;
  color: string;
}

export interface GraphVisualConfig {
  relationStyles: Record<string, RelationStyle>;
  transitiveColor: string;
  nodeShape: string;
  nodeImage?: string;
}

export class GraphVisualizer {
  private network: Network | null = null;

  private getEdgeColor(relation: string, config: GraphVisualConfig): string {
    if (relation.includes('→')) {
      return config.transitiveColor;
    }

    return config.relationStyles[relation]?.color || '#999999';
  }

  private getEdgeLabel(relation: string, config: GraphVisualConfig): string {
    if (relation.includes('→')) {
      return relation
        .split('→')
        .map(part => config.relationStyles[part]?.label ?? part)
        .join(' → ');
    }

    return config.relationStyles[relation]?.label || relation;
  }

  render(engine: GraphEngine, containerId: string, config: GraphVisualConfig): void {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container with id "${containerId}" not found`);
    }

    const useImage = config.nodeShape === 'image' || config.nodeShape === 'circularImage';
    const nodes = engine.getNodes().map(node => ({
      id: node.id,
      label: node.label,
      image: useImage ? config.nodeImage : undefined
    }));

    const edges = engine.getEdges().map((edge, index) => {
      const color = this.getEdgeColor(edge.relation, config);
      const isTransitive = edge.relation.includes('→');
      
      return {
        id: `edge-${index}`,
        from: edge.source,
        to: edge.target,
        label: this.getEdgeLabel(edge.relation, config),
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
        shape: config.nodeShape,
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
