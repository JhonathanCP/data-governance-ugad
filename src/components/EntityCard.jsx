import { useNavigate } from "react-router-dom";
import { FaDatabase, FaTable, FaRulerVertical } from 'react-icons/fa'
import { Link } from "react-router-dom";

export function EntityCard({ entity }) {
  const navigate = useNavigate();

  return (
    <tr>
      <td>
        <div className="columns is-vcentered"
          onClick={() => {
            switch (entity.entityType) {
              case 'Database':
                return navigate(`/entities/${entity.id}`);
              case 'Table':
                return navigate(`/table-info/${entity.id}`);
              case 'Column':
                return navigate(`/column-info/${entity.id}`);
              default:
                break;
            }
          }}
          >
          <div className="column is-narrow" href="/">
            {(() => {
              switch (entity.entityType) {
                case 'Database':
                  return <span class="icon is-medium has-text-link"><FaDatabase /></span>;
                case 'Table':
                  return <span class="icon is-medium has-text-link"><FaTable /></span>;
                case 'Column':
                  return <span class="icon is-medium has-text-link"><FaRulerVertical /></span>;
                default:
                  return null;
              }
            })()}
          </div>
          <Link className="column">
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
        <div class="tags">
          {entity.classifications.map((classification) => (
            <Link key={classification.id} class="is-clickable tag is-primary is-light">{classification.name}</Link>
          ))}
        </div>
      </td>
      <td>
        <div className="tags">
          {entity.fathers.map((father) => (
            <Link key={father.id} class="is-clickable tag is-link is-light">{father.name}</Link>
          ))}
        </div>
      </td>
    </tr>
  );
}
