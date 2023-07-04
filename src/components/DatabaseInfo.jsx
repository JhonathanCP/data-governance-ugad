import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEntity } from "../api/entities.api";
import { FaDatabase, FaTable } from 'react-icons/fa';
import EntityGraph from './EntityGraph'
import { EntityForm } from "./EntityForm";

export function DatabaseInfo() {
    const [databaseInfo, setDatabaseInfo] = useState(null);
    const [activeTab, setActiveTab] = useState("properties");
    const params = useParams();

    useEffect(() => {
        async function loadDatabaseInfo() {
        const res = await getEntity(params.id);
        setDatabaseInfo(res.data);
        }
        loadDatabaseInfo();
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
            <h2 className="title is-6">{databaseInfo && databaseInfo.name}</h2>
            <p>Description: {databaseInfo && databaseInfo.description}</p>
            </div>
        </div>

        <div className={`tab-content ${activeTab === "relationships" ? "is-active" : ""}`}>
            <div className="box">
            <h2 className="title is-6">Children:</h2>
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
                        {databaseInfo &&
                        databaseInfo.children &&
                        databaseInfo.children.map((child) => (
                            <tr key={child.id}>
                            <td>
                                <div className="columns is-vcentered">
                                <div className="column is-narrow">
                                    {(() => {
                                    switch (child.entityType) {
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
                                    switch (child.entityType) {
                                    case 'Database':
                                        return `/database-info/${child.id}`;
                                    case 'Table':
                                        return `/table-info/${child.id}`;
                                    case 'Column':
                                        return `/column-info/${child.id}`;
                                    default:
                                        return null;
                                    }
                                })()}>
                                    {child.name}
                                </Link>
                                </div>
                            </td>
                            <td>{child.entityType}</td>
                            <td>{child.description}</td>
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
                {databaseInfo &&
                databaseInfo.classifications &&
                databaseInfo.classifications.map((classification) => (
                    <div className="box" key={classification.id}>
                    <p>Name: {classification.name}</p>
                    <p>Description: {classification.description}</p>
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
