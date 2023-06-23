import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { getEntities } from "../api/entities.api";

const BDTableGraph = () => {
    const containerRef = useRef(null);
    let cy = null;

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getEntities();
            const entities = response.data;

            const filteredEntities = entities.filter((entity) => {
            const passedFilter = entity.entityType === "Table" || entity.entityType === "Column";
            if (!passedFilter) {
                console.log("Tipo de entidad no válido:", entity.entityType);
            }
            return passedFilter;
            });

            console.log(entities);
            console.log(filteredEntities);

            cy = cytoscape({
            container: containerRef.current,
            elements: {
                nodes: filteredEntities.map((entity) => ({
                data: { id: entity.id, name: entity.name, entityType: entity.entityType },
                classes: entity.entityType.toLowerCase(),
                })),
                edges: filteredEntities
                .flatMap((entity) =>
                    entity.fathers
                    .filter((father) => father.entityType === "Table" || father.entityType === "Column")
                    .map((father) => ({
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
                idealEdgeLength: 100,
                nodeOverlap: 20,
                refresh: 20,
                fit: true,
                padding: 30,
                randomize: false,
                componentSpacing: 100,
                nodeRepulsion: 4000,
                edgeElasticity: 100,
                nestingFactor: 5,
                gravity: 80,
                numIter: 1000,
                initialTemp: 200,
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
    <div ref={containerRef} style={{ height: "850px" }}>
      <CytoscapeComponent cy={cy} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default BDTableGraph;
