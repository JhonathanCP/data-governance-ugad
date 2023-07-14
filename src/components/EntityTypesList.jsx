import { useEffect, useState } from "react";
import { getEntityTypes } from "../api/entityTypes.api";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function EntityTypesList() {
  const [entityTypes, setEntityTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para controlar la carga
  const navigate = useNavigate();

  useEffect(() => {
    async function loadEntityTypes() {
      try {
        const res = await getEntityTypes();
        setEntityTypes(res.data);
        setIsLoading(false); // Cuando los datos se cargan correctamente, actualizamos el estado de carga
      } catch (error) {
        // Manejo de errores en la carga de datos
        console.error(error);
        setIsLoading(false); // En caso de error, actualizamos el estado de carga para mostrar el contenido sin datos
      }
    }
    loadEntityTypes();
  }, []);

  const handleEditClick = (entityType) => {
    navigate(`/entitytypes/${entityType.id}`)
  };
  
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {entityTypes.map((entityType) => (
              <tr key={entityType.id}>
                <td>{entityType.name}</td>
                <td>{entityType.description}</td>
                <td>
                  <button onClick={() => handleEditClick(entityType)} className="button is-primary is-small">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
