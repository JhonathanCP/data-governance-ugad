import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useParams } from "react-router-dom";
import { getEntity, getTableInfo, getColumnInfo } from "../api/entities.api";
import { FaSearch } from 'react-icons/fa';
import { NodeModal } from "./NodeModal";

const EntityGraph = () => {
  const containerRef = useRef(null);
  let cy = null;
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEntity(id);
        const entity = response.data;

        cy = cytoscape({
          container: containerRef.current,
          elements: {
            nodes: [
              ...entity.fathers.map((father) => ({
                data: { id: father.id, name: father.name, entityType: father.entityType },
                classes: father.entityType.toLowerCase(),
              })),
              {
                data: { id: entity.id, name: entity.name, entityType: entity.entityType },
                classes: entity.entityType.toLowerCase(),
              },
              ...entity.children.map((child) => ({
                data: { id: child.id, name: child.name, entityType: child.entityType },
                classes: child.entityType.toLowerCase(),
              })),
            ],
            edges: [
              ...entity.fathers.map((father) => ({
                data: { source: father.id, target: entity.id },
                classes: "edge",
              })),
              ...entity.children.map((child) => ({
                data: { source: entity.id, target: child.id },
                classes: "edge",
              })),
            ],
          },
          style: [
            {
              selector: "node",
              style: {
                label: "data(name)",
                width: "30px",
                height: "30px",
                "font-size": "12px",
                "background-fit": "cover",
                "border-color": "#000",
                "border-width": 1,
                "border-opacity": 0.5,
                "background-image": (ele) => getImageUrl(ele),
                display: (ele) => {
                  const nodeName = ele.data("name").toLowerCase();
                
                  if (nodeName.includes(searchTerm.toLowerCase())) {
                    return "element"; // Mostrar el nodo si el nombre coincide con el término de búsqueda
                  }
                
                  const connectedNodes = ele.neighborhood().nodes();
                  const connectedNodeNames = connectedNodes.map((node) =>
                    node.data("name").toLowerCase()
                  );
                
                  if (connectedNodeNames.includes(searchTerm.toLowerCase())) {
                    return "element"; // Mostrar el nodo si alguno de sus nodos vecinos tiene el nombre que coincide con el término de búsqueda
                  }
                
                  return "none"; // Ocultar el nodo en caso contrario
                },
              },
            },
            {
              selector: "edge",
              style: {
                "curve-style": "unbundled-bezier",
                width: 2,
                "target-arrow-shape": "diamond",
                "line-color": "#2499ff",
                "target-arrow-color": "#2499ff",
                display: (ele) =>
                  ele.source().data("name").includes(searchTerm.toLowerCase()) ||
                  ele.target().data("name").includes(searchTerm.toLowerCase())
                    ? "element"
                    : "none",
              },
            },
          ],
          layout: {
            name: "cose",
            idealEdgeLength: 100,
            nodeOverlap: 50,
            refresh: 20,
            fit: true,
            padding: 30,
            randomize: false,
            componentSpacing: 250,
            nodeRepulsion: 5000,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 40,
            numIter: 1000,
            initialTemp: 200,
            coolingFactor: 0.95,
            minTemp: 1.0,
          },
          ready: (event) => {
            const cy = event.cy;
            cy.on("tap", "node", handleNodeClick);
          },
        });
      } catch (error) {
        console.error("Error fetching entity:", error);
      }
    };
    
    fetchData();

    return () => {
      if (cy) {
        cy.destroy();
      }
    };
  }, [id, searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedNodeData) {
        let res;

        if (selectedNodeData.entityType === "Database") {
          res = await getEntity(selectedNodeData.id);
          setModalData(res.data);
        } else if (selectedNodeData.entityType === "Table") {
          res = await getTableInfo(selectedNodeData.id);
          setModalData(res.data.entity);
        } else if (selectedNodeData.entityType === "Column") {
          res = await getColumnInfo(selectedNodeData.id);
          setModalData(res.data);
        }
      }
    };

    fetchData();
  }, [selectedNodeData]);

  const handleNodeClick = (event) => {
    const clickedNode = event.target;
    const nodeData = clickedNode.data();

    setSelectedNodeData(nodeData);
    setShowModal(true);
  };

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
    <div>
      <div className="columns mr-3 field has-addons">
        <div className="column is-2 is-offset-10">
          <div className="control has-icons-left is-expanded">
            <input className="input is-primary"
                      type="text"
                      value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar entidad..." />      
            <span className="icon is-left">
                  <FaSearch />
            </span>
          </div>
        </div>
      </div>
      <div ref={containerRef} style={{ height: "70vh" }}>
        <CytoscapeComponent cy={cy} style={{ width: "100%", height: "100%" }} />
      </div>
      {showModal && selectedNodeData && (
        <NodeModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <header class="modal-card-head">
            <p class="modal-card-title">Propiedades</p>
            <button class="delete" aria-label="close"  onClick={() => setShowModal(false)}></button>
          </header>
          <section class="modal-card-body">
          {selectedNodeData.entityType === "Column" && modalData &&(
            <div>
              <h2>Nombre: {modalData.name}</h2>
              <p>Descripción: {modalData.description}</p>
              <p>Tipo de entidad: {modalData.entityType}</p>
              <p>Is Nullable: {modalData && modalData.is_nullable}</p>
              <p>Data Type: {modalData && modalData.data_type}</p>
              <p>Character Maximum Length: {modalData && modalData.character_maximum_length}</p>
              <p>Numeric Precision: {modalData && modalData.numeric_precision}</p>
              <p>Numeric Scale: {modalData && modalData.numeric_scale}</p>
              <p>Datetime Precision: {modalData && modalData.datetime_precision}</p>
            </div>
          )}
          {selectedNodeData.entityType !== "Column" && modalData &&(
            <div>
              {modalData.data_type && modalData.name}
              <h2>Nombre: {modalData.name}</h2>
              <p>Descripción: {modalData.description}</p>
              <p>Tipo de entidad: {modalData.entityType}</p>
            </div>
          )}
          </section>
        </NodeModal>
      )}
    </div>
  );
};

export default EntityGraph;
