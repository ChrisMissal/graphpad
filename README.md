# GraphPad

GraphPad is a lightweight graph visualization playground built with Vite and TypeScript. The UI lets you switch between sample datasets, add nodes, and define relationships between them while seeing the graph update instantly.

## UI overview

- **Dataset selector**: Choose between the Animal Taxonomy, Family Tree, Organization, or an Empty Graph dataset.
- **Add node**: Provide a node ID (required) and an optional label, then click **Add Node** to insert it into the graph.
- **Add edge**: Enter the source node, target node, pick a relation type, and click **Add Edge** to connect existing nodes.
- **Legend**: A color key below the graph explains the edge colors for `is-a`, `parent-of`, `manages`, `works-with`, and the lighter transitive links.
- **Theme**: The interface automatically matches your system light/dark appearance.
- **Customization**: Adjust node shapes, relationship names, and edge colors directly in the controls panel.
- **Shape options**: `box`, `ellipse`, `circle`, `database`, `diamond`, `dot`, `square`, `star`, `triangle`, `triangleDown`, `hexagon`, `text`, `image`, `circularImage`.

## Development

```bash
pnpm install
pnpm dev
```

Then open the Vite dev server URL printed in the terminal.

## Samples

See [SAMPLES.md](SAMPLES.md) for example datasets and customization ideas.
