import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getColumnInfo } from "../api/entities.api";
import { FaDatabase, FaTable } from 'react-icons/fa';
import EntityGraph from './EntityGraph'

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
            <a onClick={() => setActiveTab("properties")}>Properties</a>
          </li>
          <li className={activeTab === "relationships" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("relationships")}>Relationships</a>
          </li>
          <li className={activeTab === "classifications" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("classifications")}>Classifications</a>
          </li>
          <li className={activeTab === "graph" ? "is-active" : ""}>
            <a onClick={() => setActiveTab("graph")}>Graph</a>
          </li>
        </ul>
      </div>

      <div className={`tab-content ${activeTab === "properties" ? "is-active" : ""}`}>
        <div className="box">
          <h2 className="title is-6">{columnInfo && columnInfo.column_name}</h2>
          <p>Is Nullable: {columnInfo && columnInfo.is_nullable}</p>
          <p>Data Type: {columnInfo && columnInfo.data_type}</p>
          <p>Character Maximum Length: {columnInfo && columnInfo.character_maximum_length}</p>
          <p>Numeric Precision: {columnInfo && columnInfo.numeric_precision}</p>
          <p>Numeric Scale: {columnInfo && columnInfo.numeric_scale}</p>
          <p>Datetime Precision: {columnInfo && columnInfo.datetime_precision}</p>
        </div>
      </div>

      <div className={`tab-content ${activeTab === "relationships" ? "is-active" : ""}`}>
        <div className="box">
          <h2 className="title is-6">Parents:</h2>
          <div className="table-container">
            <table className="table is-fullwidth is-narrow is-striped is-hoverable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Entity Type</th>
                  <th>Description</th>
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
                                  return <span className="icon is-medium has-text-link"><FaDatabase /></span>;
                                case 'Table':
                                  return <span className="icon is-medium has-text-link"><FaTable /></span>;
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
          <h2 className="title is-6">Classifications:</h2>
          <div>
            {columnInfo &&
              columnInfo.classifications &&
              columnInfo.classifications.map((classification) => (
                <div key={classification.id}>
                  <p>Name: {classification.name}</p>
                  <p>Description: {classification.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className={`tab-content ${activeTab === "graph" ? "is-active" : ""}`}>
        {activeTab === "graph" && (
          <div style={{ position: "relative", top: 0, bottom: 0, left: 0, right: 0 }}>
            <EntityGraph />
          </div>
        )}
      </div>
    </div>
  );
}
