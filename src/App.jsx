import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from 'react';
import { Navigation } from "./components/Navigation";
import  Menu  from "./components/Menu";
import  { Search }  from "./components/Search";
import { EntityFormPage } from "./pages/EntityFormPage";
import { EntityTypeFormPage } from "./pages/EntityTypeFormPage";
import { ClassificationFormPage } from "./pages/ClassificationFormPage";
import { ProcessFormPage } from "./pages/ProcessFormPage";
import { EntityTypePage } from "./pages/EntityTypePage";
import { EntityPage } from "./pages/EntityPage";
import { ProcessPage } from "./pages/ProcessPage";
import { ColumnPage } from "./pages/ColumnPage";
import { TablePage } from "./pages/TablePage";
import { DatabasePage } from "./pages/DatabasePage";
import { FilteredEntitiesPage } from "./pages/FilteredEntitiesPage";
import { ClassificationsPage } from "./pages/ClassificationsPage";
import { Toaster } from "react-hot-toast";
import 'bulma/css/bulma.min.css'; 
import './App.css'
import { FaBars } from 'react-icons/fa';

function App() {

  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <BrowserRouter>
      <div className="container is-fluid p-0">
        <Navigation />
        <div className="columns is-gapless">
          {menuVisible && (
            <div className="column is-2 has-background-link">
              <Menu />
            </div>
          )}
          <div className={`column ${menuVisible ? 'is-10' : 'is-full'}`}>
            <div className="columns is-vcentered is-gapless mr-5 mt-3">
              <div className="column is-1">
                <span className="icon is-medium has-text-info" onClick={toggleMenu}>
                  <FaBars />
                </span>
              </div>
              <div className="column">
                <Search />
              </div>
            </div>
            <div className=" is-scrollable" style={{ height: '85vh', overflowY: 'auto' }}>
              <Routes>
                {/* redirect to entitytypes */}
                <Route path="/" element={<Navigate to="/entities" />} />
                <Route path="/entitytypes" element={<EntityTypePage />} />
                <Route path="/entitytypes/:id" element={<EntityTypeFormPage />} />
                <Route path="/entitytypes-create" element={<EntityTypeFormPage />} />
                <Route path="/entities" element={<EntityPage />} />
                <Route path="/entities/:id" element={<EntityFormPage />} />
                <Route path="/database-info/:id" element={<DatabasePage />} />
                <Route path="/column-info/:id" element={<ColumnPage />} />
                <Route path="/table-info/:id" element={<TablePage />} />
                <Route path="/filtereditems" element={<FilteredEntitiesPage />} />
                <Route path="/classifications" element={<ClassificationsPage />} />
                <Route path="/classifications/:id" element={<ClassificationFormPage />} />
                <Route path="/classifications-create" element={<ClassificationFormPage />} />
                <Route path="/processes" element={<ProcessPage />} />
                <Route path="/processes/:id" element={<ProcessFormPage />} />
                <Route path="/processes-create" element={<ProcessFormPage />} />
              </Routes>
            </div>
          </div>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;