import { useNavigate } from "react-router-dom";

export function EntityTypeCard({ entityType }) {
  const navigate = useNavigate();

  return (
    <div
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer"
      onClick={() => {
        navigate(`/entitytypes/${entityType.id}`);
      }}
    >
      <h1 className="text-white font-bold uppercase rounded-lg">
        {entityType.name}
      </h1>
      <p className="text-slate-400">{entityType.description}</p>
    </div>
  );
}
