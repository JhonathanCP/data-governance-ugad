import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
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

    const handleEntityTypeSelection = (entityType) => {
        setSelectedEntityType(entityType === selectedEntityType ? '' : entityType);
    };

    const handleClassificationSelection = (classification) => {
        setSelectedClassification(classification === selectedClassification ? '' : classification);
    };

    const handleFilter = () => {
        // Construir la URL con los filtros seleccionados
        const queryParams = new URLSearchParams();
        if (selectedEntityType) {
        queryParams.set('type', selectedEntityType.id);
        }
        if (selectedClassification) {
        queryParams.set('classification', selectedClassification.id);
        }
        const search = queryParams.toString();

        // Redirigir al componente FilteredEntities con los filtros seleccionados
        navigate(`/filtereditems?${search}`);
    };

    return (
        <aside className={`menu ${isVisible ? 'is-active' : ''} mt-1`}>
        <ul className="menu-list mt-5">
            <li className="block mt-6">
            <div className="dropdown is-hoverable is-centered">
                <div className="dropdown-trigger">
                <button className="button is-fullwidth" aria-haspopup="true" aria-controls="dropdown-entity-type">
                    <span>{selectedEntityType ? selectedEntityType.name : 'Tipo de entidad'}</span>
                    <span className="icon is-small">
                    <FaSearch />
                    </span>
                </button>
                </div>
                <div className="dropdown-menu" id="dropdown-entity-type" role="menu">
                <div className="dropdown-content">
                    {entityTypes.map((entityType) => (
                    <a
                        key={entityType.id}
                        href="#"
                        className={`dropdown-item ${entityType === selectedEntityType ? 'is-active' : ''}`}
                        onClick={() => handleEntityTypeSelection(entityType)}
                    >
                        {entityType.name}
                    </a>
                    ))}
                </div>
                </div>
            </div>
            </li>
            <li className="block">
            <div className="dropdown is-hoverable is-centered">
                <div className="dropdown-trigger">
                <button className="button" aria-haspopup="true" aria-controls="dropdown-classification">
                    <span>{selectedClassification ? selectedClassification.name : 'Clasificaciones'}</span>
                    <span className="icon is-small">
                    <FaSearch />
                    </span>
                </button>
                </div>
                <div className="dropdown-menu" id="dropdown-classification" role="menu">
                <div className="dropdown-content">
                    {classifications.map((classification) => (
                    <a
                        key={classification.id}
                        href="#"
                        className={`dropdown-item ${classification === selectedClassification ? 'is-active' : ''}`}
                        onClick={() => handleClassificationSelection(classification)}
                    >
                        {classification.name}
                    </a>
                    ))}
                </div>
                </div>
            </div>
            </li>
            <li className="block">
            <button className="button is-centered" onClick={handleFilter}>
                Filtrar
            </button>
            </li>
        </ul>
        </aside>
    );
};

export default Menu;
