import React, { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { getEntities } from "../api/entities.api";
import { useParams } from "react-router-dom";

const TableColumnGraph = () => {
  const containerRef = useRef(null);
  const { id } = useParams(); // Obtener el ID de la tabla desde la URL
  let cy = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEntities();
        const entities = response.data;

        // Filtrar las entidades por el ID de la tabla y sus relaciones con las columnas
        const filteredEntities = entities.filter((entity) => {
          if (entity.id === id) {
            return true; // La entidad tiene el ID que coincide con el ID de la tabla
          }
        
          // Verificar si alguno de los padres tiene el mismo ID que la tabla
          const hasMatchingFather = entity.fathers.some((father) => father.id === id);
          return hasMatchingFather;
        });
        
        
        console.log(id);
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
  }, [id]); // Asegúrate de incluir el ID como dependencia para que el efecto se ejecute cuando cambie

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

export default TableColumnGraph;