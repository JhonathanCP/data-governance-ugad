import { useNavigate } from "react-router-dom";
import { FaDatabase, FaTable, FaRulerVertical } from 'react-icons/fa'
import { Link } from "react-router-dom";

export function EntityRow({ entity }) {
  const navigate = useNavigate();

  const handleEditClick = (entity) => {
    navigate(`/entities/${entity.id}`)
  };

  return (
    <tr>
      <td>
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            {(() => {
              switch (entity.entityType) {
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
            switch (entity.entityType) {
              case 'Database':
                return `/database-info/${entity.id}`;
              case 'Table':
                return `/table-info/${entity.id}`;
              case 'Column':
                return `/column-info/${entity.id}`;
              default:
                break;
            }
          })()}>
            {entity.name}
          </Link>
        </div>
      </td>
      <td style={{ width: "30%" }}>{entity.description}</td>
      <td>
        <Link>
          {entity.entityType}
        </Link>
      </td>
      <td>
        <div className="tags is-flex">
          {entity.classifications.map((classification) => (
            <span key={classification.id} className="tag is-primary is-light">{classification.name}</span>
          ))}
        </div>
      </td> 
      <td>
        <div className="tags is-flex" >{/* style={{ flexWrap: "nowrap" }} */}
          {entity.fathers.map((father) => (
            <Link key={father.id} className="tag is-link is-light" to={(() => {
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
            })()}>{father.name}</Link>
          ))}
        </div>
      </td>
      <td>
        <button onClick={() => handleEditClick(entity)} className="button is-primary is-small">Editar</button>
      </td>
    </tr>
  );
}
