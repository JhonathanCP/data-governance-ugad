import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { getEntities } from "../api/entities.api";

const EntityGraphTest = () => {
  const containerRef = useRef(null);
  let cy = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEntities();
        const entities = response.data;

        cy = cytoscape({
          container: containerRef.current,
          elements: {
            nodes: entities.map((entity) => ({
              data: { id: entity.id, name: entity.name, entityType: entity.entityType },
              classes: entity.entityType.toLowerCase(),
            })),
            edges: entities
              .flatMap((entity) =>
                entity.fathers.map((father) => ({
                  data: { source: father.id, target: entity.id },
                  classes: "edge",
                }))
              ),
          },
          style: [
            {
              selector: "node",
              style: {
                label: "data(name)",
                width: "80px",
                height: "80px",
                "background-fit": "cover",
                "border-color": "#000",
                "border-width": 3,
                "border-opacity": 0.5,
                "background-image": (ele) => getImageUrl(ele),
              },
            },
            {
              selector: "edge",
              style: {
                "curve-style": "bezier",
                width: 6,
                "target-arrow-shape": "triangle",
                "line-color": "#2499ff",
                "target-arrow-color": "#2499ff",
              },
            },
          ],
          layout: {
            name: "cose",
            idealEdgeLength: 1000,
            nodeOverlap: 1,
            refresh: 5,
            fit: true,
            padding: 20,
            randomize: false,
            componentSpacing: 900,
            nodeRepulsion: 3500000,
            edgeElasticity: 150,
            nestingFactor: 1,
            gravity: 3,
            numIter: 1500,
            initialTemp: 400,
            coolingFactor: 0.95,
            minTemp: 1.0,
          },
        });
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };

    fetchData();
    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, []);

  const getImageUrl = (ele) => {
    const id = ele.data("entityType");
    if (id === "Database") {
      return "https://live.staticflickr.com/65535/52994289339_e1d7a36030_m.jpg";
    } else if (id === "Table") {
      return "https://live.staticflickr.com/65535/52993557582_de65f059b9_m.jpg";
    } else if (id === "Column") {
      return "https://live.staticflickr.com/65535/52994300404_18cb607eff_m.jpg";
    }
    return null;
  };

  return (
    <div ref={containerRef} style={{ height: "800px" }}>
      <CytoscapeComponent cy={cy} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default EntityGraphTest;
