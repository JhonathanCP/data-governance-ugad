import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { getEntityTypes } from '../api/entityTypes.api';
import { getClassifications } from '../api/classifications.api';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Menu = ({ isVisible }) => {
    const [entityTypes, setEntityTypes] = useState([]);
    const [classifications, setClassifications] = useState([]);
    const [selectedEntityType, setSelectedEntityType] = useState('');
    const [selectedClassification, setSelectedClassification] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchEntityTypes() {
        try {
            const response = await getEntityTypes();
            setEntityTypes(response.data);
        } catch (error) {
            console.error('Error fetching entity types:', error);
        }
        }

        async function fetchClassifications() {
        try {
            const response = await getClassifications();
            setClassifications(response.data);
        } catch (error) {
            console.error('Error fetching classifications:', error);
        }
        }

        fetchEntityTypes();
        fetchClassifications();
    }, []);

    const handleEntityTypeSelection = (entityTypeId) => {
        setSelectedEntityType(entityTypeId === selectedEntityType ? '' : entityTypeId);
    };

    const handleClassificationSelection = (classificationId) => {
        setSelectedClassification(classificationId === selectedClassification ? '' : classificationId);
    };

    const handleFilter = () => {
        // Construir la URL con los filtros seleccionados
        const queryParams = new URLSearchParams();
        if (selectedEntityType) {
        queryParams.set('type', selectedEntityType);
        }
        if (selectedClassification) {
        queryParams.set('classification', selectedClassification);
        }
        const search = queryParams.toString();

        // Redirigir al componente FilteredEntities con los filtros seleccionados
        navigate(`/filtereditems?${search}`);
    };

    const handleClear = () => {
        setSelectedEntityType('');
        setSelectedClassification('');
    };

    return (
        <aside className={`menu ${isVisible ? 'is-active' : ''} mt-1`}>
        <h1 className="title is-5 has-text-white mt-4">Filtrar entidades</h1>
        <ul className="menu-list mt-2">
            <li className="block">
            <div className="field has-addons">
                <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select
                    value={selectedEntityType}
                    onChange={(e) => handleEntityTypeSelection(e.target.value)}
                    >
                    <option value="">Buscar por tipo</option>
                    {entityTypes.map((entityType) => (
                        <option key={entityType.id} value={entityType.id}>
                        {entityType.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                {selectedEntityType && (
                <div className="control">
                    <button className="button is-danger" onClick={() => setSelectedEntityType('')}>
                    <FaTimes />
                    </button>
                </div>
                )}
            </div>
            </li>
            <li className="block">
            <div className="field has-addons">
                <div className="control is-expanded">
                <div className="select is-fullwidth">
                    <select
                    value={selectedClassification}
                    onChange={(e) => handleClassificationSelection(e.target.value)}
                    >
                    <option value="">Buscar por clasificación</option>
                    {classifications.map((classification) => (
                        <option key={classification.id} value={classification.id}>
                        {classification.name}
                        </option>
                    ))}
                    </select>
                </div>
                </div>
                {selectedClassification && (
                <div className="control">
                    <button className="button is-danger" onClick={() => setSelectedClassification('')}>
                    <FaTimes />
                    </button>
                </div>
                )}
            </div>
            </li>
            <li className="block">
            <div className="buttons">
                <button className="button is-info" onClick={handleFilter}>
                Filtrar
                </button>
                <button className="button is-danger" onClick={handleClear}>
                Limpiar
                </button>
            </div>
            </li>
        </ul>
        </aside>
    );
};

export default Menu;
