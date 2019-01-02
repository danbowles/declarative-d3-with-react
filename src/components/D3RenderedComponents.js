import D3Render from './d3/D3Render';
import D3YAxis from './d3/YAxis';
import D3XAxis from './d3/XAxis';
import D3Bars from './d3/Bars';
import D3Line from './d3/Line';
import D3GuideLine from './d3/GuideLine';
import D3XGrid from './d3/XGrid';
import D3YGrid from './d3/YGrid';
import D3ScatterPlot from './d3/ScatterPlot';
import D3Arcs from './d3/Arcs';
import D3ArcLabels from './d3/ArcLabels';
import D3Stacks from './d3/Stacks';

export const YAxis = D3Render(D3YAxis);
export const XAxis = D3Render(D3XAxis);

export const YGrid = D3Render(D3YGrid);
export const XGrid = D3Render(D3XGrid);

export const Bars = D3Render(D3Bars);
export const BarStacks = D3Render(D3Stacks);
export const Line = D3Render(D3Line);

export const ScatterPlot = D3Render(D3ScatterPlot);

export const Arcs = D3Render(D3Arcs);
export const ArcLabels = D3Render(D3ArcLabels);

export const GuideLine = D3Render(D3GuideLine);
