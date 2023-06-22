import { useEffect, useState } from "react";
import { getColumnInfo } from "../api/entities.api";

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
        
    </div>
  );
}
