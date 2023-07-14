import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getTableInfo } from "../api/entities.api";
import { FaDatabase, FaTable, FaRulerVertical } from 'react-icons/fa'
import EntityGraph from './EntityGraph'
import LineageGraph from './LineageGraph'
import { EntityForm } from "./EntityForm";

export function TableInfo() {
  const [tableInfo, setTableInfo] = useState([]);
  const [entityInfo, setEntityInfo] = useState([]);
  const [activeTab, setActiveTab] = useState("properties");
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    async function loadTableInfo() {
      const res = await getTableInfo(params.id);
      setTableInfo(res.data);
      setEntityInfo(res.data.entity);
    }
    loadTableInfo();
  }, []);

  return (
    <div>
      <div className="tabs">
        <ul>
          <li className={activeTab === "properties" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("properties")}>Propiedades</a>
          </li>
          <li className={activeTab === "relationships" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("relationships")}>Relaciones</a>
          </li>
          <li className={activeTab === "graph" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("graph")}>Gráfico</a>
          </li>
          <li className={activeTab === "classifications" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("classifications")}>Clasificaciones</a>
          </li>
          <li className={activeTab === "lineage" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("lineage")}>Linaje</a>
          </li>
          <li className={activeTab === "sampleData" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("sampleData")}>Data de ejemplo</a>
          </li>          
          <li className={activeTab === "edit" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("edit")}>Editar</a>
          </li>
        </ul>
      </div>

      <div className={`tab-content ${activeTab === "properties" ? "is-active" : ""}`}>
        <div className="box">
          <h2 className="title is-6"><span className="icon has-text-link"><FaTable /></span>{entityInfo.name}</h2>
          <p>Descripción: {entityInfo.description}</p>
          <p>Tipo de entidad: {entityInfo.entityType}</p>
        </div>
      </div>

      <div className={`tab-content ${activeTab === "relationships" ? "is-active" : ""}`}>
      <div className="box">
          <h2 className="title is-6">Padres:</h2>
          <div className="table-container">
            <table className="table is-fullwidth is-narrow is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo de entidad</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                {entityInfo.fathers &&
                  entityInfo.fathers.map((father) => (
                    <tr key={father.id}>
                      <td>
                        <div className="columns is-vcentered">
                          <div className="column is-narrow">
                            {(() => {
                              switch (father.entityType) {
                                case 'Database':
                                  return <span className="icon has-text-link"><FaDatabase /></span>;
                                case 'Table':
                                  return <span className="icon has-text-link"><FaTable /></span>;
                                default:
                                  return null;
                              }
                            })()}
                          </div>
                          <Link className="column" to={(() => {
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
                          })()}>
                            {father.name}
                          </Link>
                        </div>
                      </td>
                      <td>{father.entityType}</td>
                      <td>{father.description}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="box">
          <h2 className="title is-6">Hijos:</h2>
          <div className="table-container">
            <table className="table is-fullwidth is-narrow is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Column Name</th>
                  <th>Nullable</th>
                  <th>Data Type</th>
                  <th>Character Max Length</th>
                  <th>Numeric Precision</th>
                  <th>Numeric Scale</th>
                  <th>Datetime Precision</th>
                </tr>
              </thead>
              <tbody>
                {tableInfo.column_info_list &&
                  tableInfo.column_info_list.map((column) => (
                    <tr key={column.column_name}>
                      <td>
                        <div className="columns is-vcentered">
                          <div className="column is-narrow" href="/">
                            {(() => {
                              switch (column.column_entityType) {
                                case 'Database':
                                  return <span className="icon has-text-link"><FaDatabase /></span>;
                                case 'Table':
                                  return <span className="icon has-text-link"><FaTable /></span>;
                                case 'Column':
                                  return <span className="icon has-text-link"><FaRulerVertical /></span>;
                                default:
                                  return null;
                              }
                            })()}
                          </div>
                          <Link className="column" to={(() => {
                            switch (column.column_entityType) {
                              case 'Database':
                                return `/database-info/${column.column_id}`;
                              case 'Table':
                                return `/table-info/${column.column_id}`;
                              case 'Column':
                                return `/column-info/${column.column_id}`;
                              default:
                                break;
                            }
                          })()}>
                            {column.column_name}
                          </Link>
                        </div>
                      </td>
                      <td>{column.is_nullable ? "Yes" : "No"}</td>
                      <td>{column.data_type}</td>
                      <td>{column.character_maximum_length}</td>
                      <td>{column.numeric_precision}</td>
                      <td>{column.numeric_scale}</td>
                      <td>{column.datetime_precision}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`tab-content ${activeTab === "classifications" ? "is-active" : ""}`}>        
        <div className="box">
        <h2 className="title is-6">Clasificaciones:</h2>
          {entityInfo.classifications &&
            entityInfo.classifications.map((classification) => (
              <div className="box" key={classification.id}>
                <p>Nombre: {classification.name}</p>
                <p>Descripción: {classification.description}</p>
              </div>
          ))}
        </div>
      </div>

      <div className={`tab-content ${activeTab === "sampleData" ? "is-active" : ""}`}>
        <div className="table-container">
          <table className="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr>
                {tableInfo.data_sample &&
                  tableInfo.data_sample.length > 0 &&
                  Object.keys(tableInfo.data_sample[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableInfo.data_sample &&
                tableInfo.data_sample.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx} style={{ whiteSpace: "nowrap" }}>
                        <div className="is-clipped" style={{ maxWidth: "400px" }}>
                          <p>{value}</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`tab-content ${activeTab === "graph" ? "is-active" : ""}`}>
        {activeTab === "graph" && (
          <div style={{ position: "relative", top: 0, bottom: 0, left: 0, right: 0 }}>
            <EntityGraph />
          </div>
        )}
      </div>
      <div className={`tab-content ${activeTab === "lineage" ? "is-active" : ""}`}>
        {activeTab === "lineage" && (
          <div style={{ position: "relative", top: 0, bottom: 0, left: 0, right: 0 }}>
            <LineageGraph />
          </div>
        )}
      </div>
      <div className={`tab-content ${activeTab === "edit" ? "is-active" : ""} pt-5`}>
        <EntityForm />
      </div>
    </div>
  );
}
