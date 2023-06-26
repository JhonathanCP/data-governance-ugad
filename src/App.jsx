import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState } from 'react';
import { Navigation } from "./components/Navigation";
import  Menu  from "./components/Menu";
import  { Search }  from "./components/Search";
import { EntityTypeFormPage } from "./pages/EntityTypeFormPage";
import { EntityTypePage } from "./pages/EntityTypePage";
import { EntityFormPage } from "./pages/EntityFormPage";
import { EntityPage } from "./pages/EntityPage";
import { ColumnPage } from "./pages/ColumnPage";
import { TablePage } from "./pages/TablePage";
import EntityGraphTest from "./pages/EntityGraphTest";
import BDTableGraph from "./pages/BDTableGraph";
import TableColumnGraph from "./pages/TableColumnGraph";
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
        <div class="columns is-gapless">
          {menuVisible && (
            <div className="column is-one-fifth is-primary has-background-primary">
              <Menu />
            </div>
          )}
          <div className={`column ${menuVisible ? 'is-four-fifths' : 'is-full'}`}>
            <div class="columns is-vcentered">
              <div class="column is-1">
                <span class="icon is-medium has-text-info" onClick={toggleMenu}>
                  <FaBars />
                </span>
              </div>
              <div class="column">
                <Search />
              </div>
            </div>
            <div className=" is-scrollable" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
              <Routes>
                {/* redirect to entitytypes */}
                <Route path="/" element={<Navigate to="/entities" />} />
                <Route path="/entitytypes" element={<EntityTypePage />} />
                <Route path="/entitytypes/:id" element={<EntityTypeFormPage />} />
                <Route path="/entitytypes-create" element={<EntityTypeFormPage />} />
                <Route path="/entities" element={<EntityPage />} />
                <Route path="/entities/:id" element={<EntityFormPage />} />
                <Route path="/entities-create" element={<EntityFormPage />} />
                <Route path="/column-info/:id" element={<ColumnPage />} />
                <Route path="/table-info/:id" element={<TablePage />} />
                <Route path="/graph-test" element={<EntityGraphTest />} />
                <Route path="/bdtable-graph" element={<BDTableGraph />} />
                <Route path="/tablecolumn-graph/:id" element={<TableColumnGraph />} />
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