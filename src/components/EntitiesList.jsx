import { useEffect, useState } from "react";
import { getEntities } from "../api/entities.api";
import { EntityCard } from "./EntityCard";

export function EntitiesList() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    async function loadEntities() {
      const res = await getEntities();
      setEntities(res.data);
    }
    loadEntities();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {entities.map((entity) => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  );
}
