import { ProcessForm } from "../components/ProcessForm";

export function ProcessFormPage() {
    return (
        <div className="columns is-vcentered is-centered" style={{ height: '80vh', overflowY: 'auto' }}>
            <div className="column is-full">
                <ProcessForm />
            </div>            
        </div>
    );
}
