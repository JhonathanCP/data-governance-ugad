import { useNavigate } from "react-router-dom";

export function EntityCard({ entity }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/entities/${entity.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {entity.name}
      </h1>
      <p className="text-slate-400">{entity.description}</p>
      <p className="text-slate-400">{entity.entityType}</p>
      <ul>
        {entity.fathers.map((father) => (
          <li className="text-slate-400">{father}</li>
        ))}
      </ul>
    </div>
  );
}
