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
    <div className="columns is-vcentered is-centered" style={{ height: '80vh', overflowY: 'auto' }}>
      {entityTypes.map((entityType) => (
        <EntityTypeCard key={entityType.id} entityType={entityType} />
      ))}
    </div>
  );
}
