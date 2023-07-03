import { useEffect, useState } from "react";
import { getEntitiesByType, getEntitiesByClassification, getEntities } from "../api/entities.api";
import { EntityRow } from "./EntityRow";
import { FaSpinner } from 'react-icons/fa';

export function FilteredEntities({ selectedEntityType, selectedClassification }) {
    const [entities, setEntities] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        async function loadEntities() {
            console.log(selectedEntityType)
            console.log(selectedClassification)
            try {
                let res;
                if (selectedEntityType && selectedClassification) {
                    res = await getEntitiesByType(selectedEntityType);
                    const filteredEntities = res.data.filter(entity =>
                        entity.classifications.some(c => c.id == selectedClassification)
                    );
                    setEntities(filteredEntities);
                } else if (selectedEntityType) {
                    res = await getEntitiesByType(selectedEntityType);
                    setEntities(res.data);
                } else if (selectedClassification) {
                    res = await getEntitiesByClassification(selectedClassification);
                    setEntities(res.data);
                } else {
                    // Si no hay filtros seleccionados, cargamos todos los elementos
                    res = await getEntities();
                    setEntities(res.data);
                }
                setIsLoading(false); 
            } catch (error) {
                console.error(error);
                setIsLoading(false); 
            }
        }
        loadEntities();
    }, [selectedEntityType, selectedClassification]);

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
                            <th>Tipo</th>
                            <th>Clasificaciones</th>
                            <th>Padres</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entities.map((entity) => (
                            <EntityRow key={entity.id} entity={entity} />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Tipo</th>
                            <th>Clasificaciones</th>
                            <th>Padres</th>
                        </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
}
