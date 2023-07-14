import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProcesses } from "../api/processes.api";
import { FaSpinner, FaCog } from 'react-icons/fa';

export function ProcessesList() {
    const [processes, setProcesses] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Variable de estado para controlar la carga
    const navigate = useNavigate();

    const handleEditClick = (entity) => {
        navigate(`/processes/${entity.id}`)
    };

    const handleCreateClick = () => {
        navigate(`/processes-create`)
    };

    useEffect(() => {
        async function loadProcesses() {
        try {
            const res = await getProcesses();
            setProcesses(res.data);
            setIsLoading(false); // Cuando los datos se cargan correctamente, actualizamos el estado de carga
        } catch (error) {
            // Manejo de errores en la carga de datos
            console.error(error);
            setIsLoading(false); // En caso de error, actualizamos el estado de carga para mostrar el contenido sin datos
        }
        }
        loadProcesses();
    }, []);

    return (
        <div className="table-container">
        {isLoading ? (
            <div className="columns has-text-primary is-centered is-vcentered" style={{ height: '85vh' }}>
            <FaSpinner className="spinner" style={{ fontSize: "3rem" }} />
            </div>
        ) : (
            <table className="table is-fullwidth is-narrow is-striped is-hoverable">
            <thead>
                <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Tablas de entrada</th>
                <th>Tablas de salida</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {processes.map((process) => (
                    <tr key={process.id}>
                        <td>
                        <div className="columns is-vcentered">
                            <div className="column is-narrow">
                                <span className="icon has-text-link"><FaCog /></span>
                            </div>
                            <span className="column">
                            {process.name}
                            </span>
                        </div>
                        </td>
                        <td>{process.description}</td>
                        <td>
                        <div className="tags is-flex">
                            {process.entryTables.map((entryTable) => (
                            <Link key={entryTable.id} className="tag is-primary is-light" to={(() => {
                                switch (entryTable.entityType) {
                                    case 'Database':
                                        return `/database-info/${entryTable.id}`;
                                    case 'Table':
                                        return `/table-info/${entryTable.id}`;
                                    case 'Column':
                                        return `/column-info/${entryTable.id}`;
                                    default:
                                        break;
                                }
                                })()}>{entryTable.name}</Link>
                            ))}
                        </div>
                        </td> 
                        <td>
                        <div className="tags is-flex">
                            {process.outputTables.map((outputTable) => (
                            <Link key={outputTable.id} className="tag is-primary is-light" to={(() => {
                                switch (outputTable.entityType) {
                                    case 'Database':
                                        return `/database-info/${outputTable.id}`;
                                    case 'Table':
                                        return `/table-info/${outputTable.id}`;
                                    case 'Column':
                                        return `/column-info/${outputTable.id}`;
                                    default:
                                        break;
                                }
                                })()}>{outputTable.name}</Link>
                            ))}
                        </div>
                        </td>
                        <td>
                            <button onClick={() => handleEditClick(process)} className="button is-primary is-small">Editar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>
                    <button onClick={() => handleCreateClick()} className="button is-primary is-small">Crear proceso</button>
                    </th>         
                </tr>     
            </tfoot>
            </table>
        )}
        </div>
    );
}
