import { Graph } from 'graphlib';

export type RelationType = 'is-a' | 'parent-of' | string;

export interface Edge {
  source: string;
  target: string;
  relation: RelationType;
}

export class GraphEngine {
  private graph: Graph;

  constructor() {
    this.graph = new Graph({ directed: true });
  }

  addNode(id: string, label?: string): void {
    this.graph.setNode(id, { label: label || id });
  }

  addEdge(source: string, target: string, relation: RelationType): void {
    // Add the edge
    this.graph.setEdge(source, target, { relation });

    // Apply transitive closure for all edges
    this.applyTransitiveClosure();

    // Apply inheritance rules for "is-a" relationships
    if (relation === 'is-a') {
      this.applyInheritance(source, target);
    }
  }

  private applyTransitiveClosure(): void {
    const nodes = this.graph.nodes();
    
    // Floyd-Warshall algorithm for transitive closure
    for (const k of nodes) {
      for (const i of nodes) {
        for (const j of nodes) {
          if (this.graph.hasEdge(i, k) && this.graph.hasEdge(k, j)) {
            if (!this.graph.hasEdge(i, j)) {
              const edgeIK = this.graph.edge(i, k);
              const edgeKJ = this.graph.edge(k, j);
              
              // Add transitive edge with combined relation
              this.graph.setEdge(i, j, {
                relation: `${edgeIK.relation}→${edgeKJ.relation}`,
                transitive: true
              });
            }
          }
        }
      }
    }
  }

  private applyInheritance(source: string, target: string): void {
    // When A is-a B, A inherits all edges from B
    const targetEdges = this.graph.outEdges(target) || [];
    
    for (const edge of targetEdges) {
      const edgeData = this.graph.edge(edge.v, edge.w);
      if (!this.graph.hasEdge(source, edge.w)) {
        this.graph.setEdge(source, edge.w, {
          relation: edgeData.relation,
          inherited: true
        });
      }
    }
  }

  getNodes(): Array<{ id: string; label: string }> {
    return this.graph.nodes().map(nodeId => {
      const nodeData = this.graph.node(nodeId);
      return {
        id: nodeId,
        label: nodeData?.label || nodeId
      };
    });
  }

  getEdges(): Edge[] {
    const edges: Edge[] = [];
    
    for (const edge of this.graph.edges()) {
      const edgeData = this.graph.edge(edge.v, edge.w);
      edges.push({
        source: edge.v,
        target: edge.w,
        relation: edgeData?.relation || ''
      });
    }
    
    return edges;
  }

  getGraph(): Graph {
    return this.graph;
  }
}
