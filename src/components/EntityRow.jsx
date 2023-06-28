import { useNavigate } from "react-router-dom";
import { FaDatabase, FaTable, FaRulerVertical } from 'react-icons/fa'
import { Link } from "react-router-dom";

export function EntityRow({ entity }) {
  const navigate = useNavigate();
  return (
    <tr>
      <td>
        <div className="columns is-vcentered">
          <div className="column is-narrow">
            {(() => {
              switch (entity.entityType) {
                case 'Database':
                  return <span className="icon is-medium has-text-link"><FaDatabase /></span>;
                case 'Table':
                  return <span className="icon is-medium has-text-link"><FaTable /></span>;
                case 'Column':
                  return <span className="icon is-medium has-text-link"><FaRulerVertical /></span>;
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
      <td>{entity.description}</td>
      <td>
        <Link>
          {entity.entityType}
        </Link>
      </td>
      <td>
        <div className="tags">
          {entity.classifications.map((classification) => (
            <Link key={classification.id} className="is-clickable tag is-primary is-light">{classification.name}</Link>
          ))}
        </div>
      </td>
      <td>
        <div className="tags">
          {entity.fathers.map((father) => (
            <Link key={father.id} className="is-clickable tag is-link is-light">{father.name}</Link>
          ))}
        </div>
      </td>
    </tr>
  );
}
