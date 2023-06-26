import { useEffect, useState } from "react";
import { getEntities } from "../api/entities.api";
import { EntityCard } from "./EntityCard";
import { FaSpinner } from 'react-icons/fa';

export function EntitiesList() {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para controlar la carga

  useEffect(() => {
    async function loadEntities() {
      try {
        const res = await getEntities();
        setEntities(res.data);
        setIsLoading(false); // Cuando los datos se cargan correctamente, actualizamos el estado de carga
      } catch (error) {
        // Manejo de errores en la carga de datos
        console.error(error);
        setIsLoading(false); // En caso de error, actualizamos el estado de carga para mostrar el contenido sin datos
      }
    }
    loadEntities();
  }, []);

  return (
    <div class="table-container">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <FaSpinner className="animate-spin text-5xl text-blue-500" />
        </div>
      ) : (
        <table class="table is-fullwidth is-narrow is-striped is-hoverable">
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
              <EntityCard key={entity.id} entity={entity} />
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
