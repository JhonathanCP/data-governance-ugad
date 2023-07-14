import { useEffect, useState } from "react";
import { getClassifications } from "../api/classifications.api";
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export function ClassificactionsList() {
  const [classifications, setClassifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Variable de estado para controlar la carga
  const navigate = useNavigate();

  useEffect(() => {
    async function loadClassifications() {
      try {
        const res = await getClassifications();
        setClassifications(res.data);
        setIsLoading(false); // Cuando los datos se cargan correctamente, actualizamos el estado de carga
      } catch (error) {
        // Manejo de errores en la carga de datos
        console.error(error);
        setIsLoading(false); // En caso de error, actualizamos el estado de carga para mostrar el contenido sin datos
      }
    }
    loadClassifications();
  }, []);

  const handleEditClick = (classification) => {
    navigate(`/classifications/${classification.id}`)
  };

  const handleCreateClick = () => {
    navigate(`/classifications-create`)
  };

  return (
    <div className="table-container">
      {isLoading ? (
        <div className="columns has-text-primary is-centered is-vcentered" style={{ height: '85vh' }}>
          <FaSpinner className="spinner" style={{ fontSize: "3rem" }} />
        </div>
      ) : (
        <div>
          <table className="table is-fullwidth is-narrow is-striped is-hoverable">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {classifications.map((classification) => (
                <tr key={classification.id}>
                  <td>{classification.name}</td>
                  <td>{classification.description}</td>
                  <td>
                    <button onClick={() => handleEditClick(classification)} className="button is-primary is-small">Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>
                  <button onClick={() => handleCreateClick()} className="button is-primary is-small">Crear clasificación</button>
                </th>         
              </tr>     
            </tfoot>
          </table>
          
        </div>
      )}
    </div>
  );
}
