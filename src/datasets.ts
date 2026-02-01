export interface DatasetNode {
  id: string;
  label: string;
}

export interface DatasetEdge {
  from: string;
  to: string;
  relation: string;
}

export interface Dataset {
  name: string;
  nodes: DatasetNode[];
  edges: DatasetEdge[];
}

export const datasets: Record<string, Dataset> = {
  taxonomy: {
    name: 'Animal Taxonomy',
    nodes: [
      { id: 'Animal', label: 'Animal' },
      { id: 'Mammal', label: 'Mammal' },
      { id: 'Dog', label: 'Dog' },
      { id: 'Cat', label: 'Cat' },
      { id: 'Person', label: 'Person' },
      { id: 'Child', label: 'Child' }
    ],
    edges: [
      { from: 'Mammal', to: 'Animal', relation: 'is-a' },
      { from: 'Dog', to: 'Mammal', relation: 'is-a' },
      { from: 'Cat', to: 'Mammal', relation: 'is-a' },
      { from: 'Person', to: 'Mammal', relation: 'is-a' },
      { from: 'Child', to: 'Person', relation: 'is-a' }
    ]
  },
  
  family: {
    name: 'Family Tree',
    nodes: [
      { id: 'Grandparent1', label: 'Grandparent' },
      { id: 'Parent1', label: 'Parent 1' },
      { id: 'Parent2', label: 'Parent 2' },
      { id: 'Child1', label: 'Child 1' },
      { id: 'Child2', label: 'Child 2' },
      { id: 'Child3', label: 'Child 3' }
    ],
    edges: [
      { from: 'Grandparent1', to: 'Parent1', relation: 'parent-of' },
      { from: 'Grandparent1', to: 'Parent2', relation: 'parent-of' },
      { from: 'Parent1', to: 'Child1', relation: 'parent-of' },
      { from: 'Parent1', to: 'Child2', relation: 'parent-of' },
      { from: 'Parent2', to: 'Child3', relation: 'parent-of' }
    ]
  },
  
  organization: {
    name: 'Organization',
    nodes: [
      { id: 'CEO', label: 'CEO' },
      { id: 'CTO', label: 'CTO' },
      { id: 'CFO', label: 'CFO' },
      { id: 'DevManager', label: 'Dev Manager' },
      { id: 'Dev1', label: 'Developer 1' },
      { id: 'Dev2', label: 'Developer 2' }
    ],
    edges: [
      { from: 'CEO', to: 'CTO', relation: 'manages' },
      { from: 'CEO', to: 'CFO', relation: 'manages' },
      { from: 'CTO', to: 'DevManager', relation: 'manages' },
      { from: 'DevManager', to: 'Dev1', relation: 'manages' },
      { from: 'DevManager', to: 'Dev2', relation: 'manages' },
      { from: 'Dev1', to: 'Dev2', relation: 'works-with' }
    ]
  },
  
  empty: {
    name: 'Empty Graph',
    nodes: [],
    edges: []
  }
};
