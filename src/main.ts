import { GraphEngine } from './graph/GraphEngine';
import { GraphVisualizer } from './visual/GraphVisualizer';
import { datasets } from './datasets';

let engine = new GraphEngine();
const visualizer = new GraphVisualizer();

// Load a dataset into the engine
function loadDataset(datasetKey: string): void {
  const dataset = datasets[datasetKey];
  if (!dataset) return;
  
  // Create new engine
  engine = new GraphEngine();
  
  // Add nodes
  dataset.nodes.forEach(node => {
    engine.addNode(node.id, node.label);
  });
  
  // Add edges
  dataset.edges.forEach(edge => {
    engine.addEdge(edge.from, edge.to, edge.relation);
  });
  
  // Render
  visualizer.render(engine, 'graph-container');
  
  console.log('Graph rendered successfully!');
  console.log('Nodes:', engine.getNodes());
  console.log('Edges:', engine.getEdges());
}

// Initialize with taxonomy dataset
loadDataset('taxonomy');

// Dataset selector
const datasetSelect = document.getElementById('dataset-select') as HTMLSelectElement;
if (datasetSelect) {
  datasetSelect.addEventListener('change', (e) => {
    const target = e.target as HTMLSelectElement;
    loadDataset(target.value);
  });
}

// Add node functionality
const addNodeBtn = document.getElementById('add-node-btn');
const nodeIdInput = document.getElementById('node-id') as HTMLInputElement;
const nodeLabelInput = document.getElementById('node-label') as HTMLInputElement;

if (addNodeBtn && nodeIdInput && nodeLabelInput) {
  addNodeBtn.addEventListener('click', () => {
    const id = nodeIdInput.value.trim();
    const label = nodeLabelInput.value.trim() || id;
    
    if (id) {
      engine.addNode(id, label);
      visualizer.render(engine, 'graph-container');
      
      // Clear inputs
      nodeIdInput.value = '';
      nodeLabelInput.value = '';
      
      console.log(`Added node: ${id} (${label})`);
    }
  });
}

// Add edge functionality
const addEdgeBtn = document.getElementById('add-edge-btn');
const edgeFromInput = document.getElementById('edge-from') as HTMLInputElement;
const edgeToInput = document.getElementById('edge-to') as HTMLInputElement;
const edgeRelationSelect = document.getElementById('edge-relation') as HTMLSelectElement;

if (addEdgeBtn && edgeFromInput && edgeToInput && edgeRelationSelect) {
  addEdgeBtn.addEventListener('click', () => {
    const from = edgeFromInput.value.trim();
    const to = edgeToInput.value.trim();
    const relation = edgeRelationSelect.value;
    
    if (from && to) {
      try {
        engine.addEdge(from, to, relation);
        visualizer.render(engine, 'graph-container');
        
        // Clear inputs
        edgeFromInput.value = '';
        edgeToInput.value = '';
        
        console.log(`Added edge: ${from} -> ${to} (${relation})`);
      } catch (error) {
        console.error('Failed to add edge:', error);
        alert('Failed to add edge. Make sure both nodes exist.');
      }
    }
  });
}
