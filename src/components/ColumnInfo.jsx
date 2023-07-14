import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getColumnInfo } from "../api/entities.api";
import { FaDatabase, FaTable, FaRulerVertical } from 'react-icons/fa';
import EntityGraph from './EntityGraph'
import { EntityForm } from "./EntityForm";

export function ColumnInfo() {
  const [columnInfo, setColumnInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("properties");
  const params = useParams();

  useEffect(() => {
    async function loadColumnInfo() {
      const res = await getColumnInfo(params.id);
      setColumnInfo(res.data);
    }
    loadColumnInfo();
  }, [params.id]);

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
          <li className={activeTab === "classifications" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("classifications")}>Clasificaciones</a>
          </li>
          <li className={activeTab === "graph" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("graph")}>Gráfico</a>
          </li>
          <li className={activeTab === "edit" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("edit")}>Editar</a>
          </li>
        </ul>
      </div>

      <div className={`tab-content ${activeTab === "properties" ? "is-active" : ""}`}>
        <div className="box">
          <h2 className="title is-6"><span className="icon has-text-link"><FaRulerVertical /></span>{columnInfo && columnInfo.column_name}</h2>
          <p>Is Nullable: {columnInfo && columnInfo.is_nullable}</p>
          <p>Data Type: {columnInfo && columnInfo.data_type}</p>
          <p>Character Maximum Length: {columnInfo && columnInfo.character_maximum_length}</p>
          <p>Numeric Precision: {columnInfo && columnInfo.numeric_precision}</p>
          <p>Numeric Scale: {columnInfo && columnInfo.numeric_scale}</p>
          <p>Datetime Precision: {columnInfo && columnInfo.datetime_precision}</p>
          <p>Descripción: {columnInfo && columnInfo.description}</p>
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
                {columnInfo &&
                  columnInfo.fathers &&
                  columnInfo.fathers.map((father) => (
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
      </div>

      <div className={`tab-content ${activeTab === "classifications" ? "is-active" : ""}`}>
        <div className="box">
        <h2 className="title is-6">Clasificaciones:</h2>
          {columnInfo &&
            columnInfo.classifications &&
            columnInfo.classifications.map((classification) => (
              <div className="box" key={classification.id}>
                <p>Nombre: {classification.name}</p>
                <p>Descripción: {classification.description}</p>
              </div>
            ))}
        </div>
      </div>

      <div className={`tab-content ${activeTab === "graph" ? "is-active" : ""}`}>
        {activeTab === "graph" && (
          <div style={{ position: "relative", top: 0, bottom: 0, left: 0, right: 0 }}>
            <EntityGraph />
          </div>
        )}
      </div>
      <div className={`tab-content ${activeTab === "edit" ? "is-active" : ""} pt-5`}>
        <EntityForm />
      </div>
    </div>
  );
}
