import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import { useParams } from "react-router-dom";
import { getEntity, getTableInfo, getColumnInfo } from "../api/entities.api";
import { getProcess } from "../api/processes.api";
import { FaSearch } from 'react-icons/fa';
import { NodeModal } from "./NodeModal";
import { Link } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';

const LineageGraph = () => {
  const containerRef = useRef(null);
  let cy = null;
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEntity(id);
        const entity = response.data;
        const processes = []
        for (const id in entity.processes) {
          const processResponse = await getProcess(entity.processes[id].id);
          processes.push(processResponse.data);
        }
        console.log("completed")
        cy = cytoscape({
          container: containerRef.current,
          elements: {
            nodes: [
              ...processes.flatMap((process) => [
                ...process.entryTables.map((table) => ({
                  data: { id: table.id, name: table.name, entityType: table.entityType },
                  classes: table.entityType.toLowerCase(),
                })),
                {
                  data: { id: process.id, name: process.name, entityType: "Process" },
                  classes: process.description.toLowerCase(),
                },
                ...process.outputTables.map((table) => ({
                  data: { id: table.id, name: table.name, entityType: table.entityType },
                  classes: table.entityType.toLowerCase(),
                })),
              ]),
            ],
            edges: [
              ...processes.flatMap((process) => [
                ...process.entryTables.map((table) => ({
                  data: { source: table.id, target: process.id },
                  classes: "edge",
                })),
                ...process.outputTables.map((table) => ({
                  data: { source: process.id, target: table.id },
                  classes: "edge",
                })),
              ]),
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
                "curve-style": "bezier",
                width: 2,
                "target-arrow-shape": "triangle",
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
            name: "concentric",
            concentric: function(node) {
              return node.degree(); // Organiza los nodos según su grado (número de conexiones)
            },
            levelWidth: function() {
              return 2; // Establece el nivel de separación entre los círculos concéntricos
            },
            padding: 50,
            spacingFactor: 2 // Espacio de relleno alrededor de los nodos
          },
          ready: (event) => {
            const cy = event.cy;
            cy.on("tap", "node", handleNodeClick);
          },
        })
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching entity:", error);
        setIsLoading(false);
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
        } else if (selectedNodeData.entityType === "Process") {
          res = await getProcess(selectedNodeData.id);
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
    }else if (id === "Process") {
      return "https://live.staticflickr.com/65535/53027450430_4c4618c093_m.jpg";
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
        {isLoading ? (
          <div className="columns has-text-primary is-centered is-vcentered" style={{ height: '60vh' }}>
          <FaSpinner className="spinner" style={{ fontSize: "3rem" }} />
        </div>
        ) : (
          <CytoscapeComponent cy={cy} style={{ width: "100%", height: "100%" }} />
        )}        
      </div>
      {showModal && selectedNodeData && (
        <NodeModal isOpen={showModal} onClose={() => setShowModal(false)}>
          <header className="modal-card-head">
            <p className="modal-card-title">Propiedades</p>
            <button className="delete" aria-label="close"  onClick={() => setShowModal(false)}></button>
          </header>
          <section className="modal-card-body">
          {selectedNodeData.entityType === "Process" && modalData && modalData.entryTables && modalData.outputTables && (
            <div>
              {modalData.data_type && modalData.name && modalData.entryTables && modalData.outputTables}
              <h2>Nombre: {modalData.name}</h2>
              <p>Descripción: {modalData.description}</p>
              <p>Tablas de entrada:</p>
              <ul>
                <li>
                {modalData.data_type && modalData.name}
                {modalData && modalData.entryTables.map((table) => (
                  <Link key={table.id} className="tag is-link is-light" to={(() => {
                    switch (table.entityType) {
                      case 'Database':
                        return `/database-info/${table.id}`;
                      case 'Table':
                        return `/table-info/${table.id}`;
                      case 'Column':
                        return `/column-info/${table.id}`;
                      default:
                        break;
                    }
                  })()}>{table.name}</Link>
                ))}
                </li>
              </ul>
              <p>Tablas de salida:</p>
              <ul>
                <li>
                {modalData.data_type && modalData.name}
                {modalData && modalData.outputTables.map((table) => (
                  <Link key={table.id} className="tag is-link is-light" to={(() => {
                    switch (table.entityType) {
                      case 'Database':
                        return `/database-info/${table.id}`;
                      case 'Table':
                        return `/table-info/${table.id}`;
                      case 'Column':
                        return `/column-info/${table.id}`;
                      default:
                        break;
                    }
                  })()}>{table.name}</Link>
                ))}
                </li>
              </ul>
            </div>
          )}
          {selectedNodeData.entityType !== "Process" && modalData && modalData.entityType &&(
              <div>
                {modalData.data_type && modalData.name}
                <h2>Nombre: {modalData.name}</h2>
                <p>Descripción: {modalData.description}</p>
                <p>Tipo de entidad: {modalData.entityType}</p>
                <p>Padres:</p>
                <ul>
                  <li>
                  {modalData.fathers.map((father) => (
                    <Link key={father.id} className="tag is-link is-light" to={(() => {
                      switch (father.entityType) {
                        case 'Database':
                          return `/database-info/${father.id}`;
                        case 'Table':
                          return `/table-info/${father.id}`;
                        case 'Column':
                          return `/column-info/${father.id}`;
                        default:
                          break;
                      }
                    })()}>{father.name}</Link>
                  ))}
                  </li>
                </ul>
                <p>Clasificaciones:</p>
                <ul>
                  <li>
                  {modalData.classifications.map((classification) => (
                    <span className="tag is-primary is-light">{classification.name}</span>
                  ))}
                  </li>
                </ul>
              </div>
            )}
          </section>
        </NodeModal>
      )}
    </div>
  );
};

export default LineageGraph;
