import { useEffect, useState } from "react";
import { getEntitiesByType, getEntitiesByClassification, getEntities } from "../api/entities.api";
import { EntityRow } from "./EntityRow";
import { FaSpinner } from 'react-icons/fa';

export function FilteredEntities({ selectedEntityType, selectedClassification }) {
    const [entities, setEntities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false); // Nuevo estado para indicar si se está realizando una nueva búsqueda

    useEffect(() => {
        async function loadEntities() {
        try {
            let res;
            setIsRefreshing(true); // Establecer el estado de isRefreshing como true antes de comenzar la búsqueda
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
            setIsRefreshing(false); // Establecer el estado de isRefreshing como false después de completar la búsqueda
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setIsRefreshing(false); // Establecer el estado de isRefreshing como false en caso de error
        }
        }
        loadEntities();
    }, [selectedEntityType, selectedClassification]);

    return (
        <div className="table-container">
        {(isLoading || isRefreshing) && ( // Actualizar la condición para mostrar la rueda de carga
            <div className="columns has-text-primary is-centered is-vcentered" style={{ height: '85vh' }}>
            <FaSpinner className="spinner" style={{ fontSize: "3rem" }} />
            </div>
        )}
        {!isLoading && !isRefreshing && ( // Actualizar la condición para mostrar el contenido del componente
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
            </table>
        )}
        </div>
    );
}

