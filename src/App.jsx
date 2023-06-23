import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
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

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation />
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
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
