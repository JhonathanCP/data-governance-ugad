import { useNavigate } from "react-router-dom";

export function EntityCard({ entity }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        switch ( entity.entityType ){
          case 'Database':
            return navigate(`/entities/${entity.id}`);
          case 'Table':
            return navigate(`/table-info/${entity.id}`);
          case 'Column':
            return navigate(`/column-info/${entity.id}`);
        }
          
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {entity.name}
      </h1>
      <p className="text-slate-400">{entity.description}</p>
      <h2>Tipo de entidad</h2>
      <p className="text-slate-400">{entity.entityType}</p>
      {entity.entityType !== 'Database' ? (
        <>
          <h2>Pertenece a:</h2>
          <ul>
            {entity.fathers.map((father) => (
              <li className="text-slate-400">{father['entityType'].concat(': '+father['name'])}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
