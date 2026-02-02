import { GraphEngine } from './graph/GraphEngine';
import { GraphVisualizer, type GraphVisualConfig, type RelationStyle } from './visual/GraphVisualizer';
import { datasets } from './datasets';

let engine = new GraphEngine();
const visualizer = new GraphVisualizer();

const relationStyles: Record<string, RelationStyle> = {
  'is-a': { label: 'is-a', color: '#2196F3' },
  'parent-of': { label: 'parent-of', color: '#4CAF50' },
  'manages': { label: 'manages', color: '#FF9800' },
  'works-with': { label: 'works-with', color: '#9C27B0' },
  'evolves-into': { label: 'evolves-into', color: '#00BCD4' },
  'enables': { label: 'enables', color: '#8BC34A' },
  'built-with': { label: 'built-with', color: '#FF5722' },
  'influenced': { label: 'influenced', color: '#795548' }
};

const defaultNodeImage = encodeURI(
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' rx='16' fill='%23cbd5f5'/><path d='M20 40h40' stroke='%23334' stroke-width='6' stroke-linecap='round'/><circle cx='40' cy='30' r='10' fill='%23999'/></svg>"
);

const visualConfig: GraphVisualConfig = {
  relationStyles,
  transitiveColor: '#607D8B',
  nodeShape: 'box',
  nodeImage: defaultNodeImage
};

function renderGraph(): void {
  visualizer.render(engine, 'graph-container', visualConfig);
}

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
  renderGraph();
  
  console.log('Graph rendered successfully!');
  console.log('Nodes:', engine.getNodes());
  console.log('Edges:', engine.getEdges());
}

// Initialize with software evolution dataset
loadDataset('softwareEvolution');

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
      renderGraph();
      
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
        renderGraph();
        
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

const relationSelect = document.getElementById('edge-relation') as HTMLSelectElement | null;
const legendItems = document.querySelectorAll('[data-relation-key]');
const relationLabelInputs = document.querySelectorAll('[data-relation-label]');
const relationColorInputs = document.querySelectorAll('[data-relation-color]');
const transitiveColorInput = document.getElementById('transitive-color') as HTMLInputElement | null;
const nodeShapeSelect = document.getElementById('node-shape') as HTMLSelectElement | null;
const controlsPanel = document.getElementById('controls-panel');
const toggleControlsBtn = document.getElementById('toggle-controls-btn') as HTMLButtonElement | null;

function syncRelationSelectLabels(): void {
  if (!relationSelect) return;
  Array.from(relationSelect.options).forEach(option => {
    const relationStyle = relationStyles[option.value];
    if (relationStyle) {
      option.textContent = relationStyle.label;
    }
  });
}

function syncLegend(): void {
  legendItems.forEach(item => {
    const element = item as HTMLElement;
    const key = element.dataset.relationKey;
    if (!key) return;
    const colorTarget = element.querySelector('[data-relation-color-target]') as HTMLElement | null;
    const labelTarget = element.querySelector('[data-relation-label-target]') as HTMLElement | null;

    if (key === 'transitive') {
      if (colorTarget) {
        colorTarget.style.background = visualConfig.transitiveColor;
        colorTarget.style.opacity = '0.5';
      }
      if (labelTarget) {
        labelTarget.textContent = 'transitive';
      }
      return;
    }

    const style = relationStyles[key];
    if (!style) return;
    if (colorTarget) {
      colorTarget.style.background = style.color;
      colorTarget.style.opacity = '1';
    }
    if (labelTarget) {
      labelTarget.textContent = style.label;
    }
  });
}

function syncControls(): void {
  relationLabelInputs.forEach(input => {
    const element = input as HTMLInputElement;
    const key = element.dataset.relationLabel;
    if (!key) return;
    const style = relationStyles[key];
    if (style) {
      element.value = style.label;
    }
  });

  relationColorInputs.forEach(input => {
    const element = input as HTMLInputElement;
    const key = element.dataset.relationColor;
    if (!key) return;
    const style = relationStyles[key];
    if (style) {
      element.value = style.color;
    }
  });

  if (transitiveColorInput) {
    transitiveColorInput.value = visualConfig.transitiveColor;
  }

  if (nodeShapeSelect) {
    nodeShapeSelect.value = visualConfig.nodeShape;
  }
}

relationLabelInputs.forEach(input => {
  input.addEventListener('input', event => {
    const target = event.target as HTMLInputElement;
    const key = target.dataset.relationLabel;
    if (!key) return;
    relationStyles[key].label = target.value.trim() || key;
    syncRelationSelectLabels();
    syncLegend();
    renderGraph();
  });
});

relationColorInputs.forEach(input => {
  input.addEventListener('input', event => {
    const target = event.target as HTMLInputElement;
    const key = target.dataset.relationColor;
    if (!key) return;
    relationStyles[key].color = target.value;
    syncLegend();
    renderGraph();
  });
});

if (transitiveColorInput) {
  transitiveColorInput.addEventListener('input', event => {
    const target = event.target as HTMLInputElement;
    visualConfig.transitiveColor = target.value;
    syncLegend();
    renderGraph();
  });
}

if (nodeShapeSelect) {
  nodeShapeSelect.addEventListener('change', event => {
    const target = event.target as HTMLSelectElement;
    visualConfig.nodeShape = target.value;
    renderGraph();
  });
}

if (controlsPanel && toggleControlsBtn) {
  toggleControlsBtn.addEventListener('click', () => {
    const isCollapsed = controlsPanel.classList.toggle('collapsed');
    toggleControlsBtn.textContent = isCollapsed ? 'Expand' : 'Minimize';
    toggleControlsBtn.setAttribute('aria-expanded', String(!isCollapsed));
  });
}

syncControls();
syncRelationSelectLabels();
syncLegend();
