import { GraphEngine } from './graph/GraphEngine';
import { GraphVisualizer } from './visual/GraphVisualizer';

// Create a new graph engine
const engine = new GraphEngine();

// Add some sample nodes
engine.addNode('Animal', 'Animal');
engine.addNode('Mammal', 'Mammal');
engine.addNode('Dog', 'Dog');
engine.addNode('Cat', 'Cat');
engine.addNode('Person', 'Person');
engine.addNode('Child', 'Child');

// Add "is-a" relationships (inheritance)
engine.addEdge('Mammal', 'Animal', 'is-a');
engine.addEdge('Dog', 'Mammal', 'is-a');
engine.addEdge('Cat', 'Mammal', 'is-a');
engine.addEdge('Person', 'Mammal', 'is-a');
engine.addEdge('Child', 'Person', 'is-a');

// Add "parent-of" relationships
engine.addNode('Parent1', 'Parent1');
engine.addNode('Child1', 'Child1');
engine.addEdge('Parent1', 'Child1', 'parent-of');

// Create visualizer and render
const visualizer = new GraphVisualizer();
visualizer.render(engine, 'graph-container');

console.log('Graph rendered successfully!');
console.log('Nodes:', engine.getNodes());
console.log('Edges:', engine.getEdges());
