import { EntityForm } from "../components/EntityForm";

export function EntityFormPage() {
    return (
        <div className="columns is-vcentered is-centered" style={{ height: '80vh', overflowY: 'auto' }}>
            <div className="column is-full">
                <EntityForm />
            </div>            
        </div>
    );
}
