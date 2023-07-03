import { FilteredEntities } from "../components/FilteredEntities";
import { useSearchParams } from 'react-router-dom';

export function FilteredEntitiesPage() {
    const [searchParams] = useSearchParams();
    const selectedEntityType = searchParams.get('type');
    const selectedClassification = searchParams.get('classification');

    return (
        <div>
        <FilteredEntities
            selectedEntityType={selectedEntityType}
            selectedClassification={selectedClassification}
        />
        </div>
    );
}
