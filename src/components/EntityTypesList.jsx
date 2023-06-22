import { useEffect, useState } from "react";
import { getEntityTypes } from "../api/entityTypes.api";
import { EntityTypeCard } from "./EntityTypeCard";

export function EntityTypesList() {
  const [entityTypes, setEntityTypes] = useState([]);

  useEffect(() => {
    async function loadEntityTypes() {
      const res = await getEntityTypes();
      setEntityTypes(res.data);
    }
    loadEntityTypes();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {entityTypes.map((entityType) => (
        <EntityTypeCard key={entityType.id} entityType={entityType} />
      ))}
    </div>
  );
}
