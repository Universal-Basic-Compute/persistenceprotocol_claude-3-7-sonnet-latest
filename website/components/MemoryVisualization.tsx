'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  level: number;
  parent?: string;
}

interface Link {
  source: string;
  target: string;
}

interface MemoryVisualizationData {
  nodes: Node[];
  links: Link[];
}

interface MemoryVisualizationProps {
  data?: MemoryVisualizationData;
  width?: number;
  height?: number;
}

export function MemoryVisualization({ 
  data, 
  width = 600, 
  height = 400 
}: MemoryVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create a force simulation
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(50));

    // Create a color scale based on node level
    const colorScale = d3.scaleOrdinal()
      .domain([0, 1, 2, 3])
      .range(["#8B6D4C", "#BD9C71", "#D1B99A", "#E6D7C3"]);

    // Create a scale for node size based on level (inverse - higher levels are smaller)
    const sizeScale = d3.scaleLinear()
      .domain([0, 3])
      .range([40, 20]);

    // Create links
    const link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);

    // Create nodes
    const node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(data.nodes)
      .enter().append("g");

    // Add circles to nodes
    node.append("circle")
      .attr("r", (d: any) => sizeScale(d.level))
      .attr("fill", (d: any) => colorScale(d.level as number))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    // Add labels to nodes
    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", (d: any) => sizeScale(d.level) + 10)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#333");

    // Add title for tooltip on hover
    node.append("title")
      .text((d: any) => d.label);

    // Update positions on simulation tick
    simulation
      .nodes(data.nodes as any)
      .on("tick", ticked);

    (simulation.force("link") as d3.ForceLink<any, any>)
      .links(data.links as any);

    function ticked() {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    }

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, width, height]);

  // If no data is provided, show a placeholder
  if (!data) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No data available for visualization</p>
      </div>
    );
  }

  return (
    <svg 
      ref={svgRef} 
      width={width} 
      height={height} 
      className="bg-white dark:bg-gray-900 rounded-lg"
    />
  );
}
