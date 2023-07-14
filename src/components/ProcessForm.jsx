import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createProcess, deleteProcess, getProcess, updateProcess, addEntryTable, removeEntryTable, addOutputTable, removeOutputTable } from "../api/processes.api";
import { getEntitiesByType } from "../api/entities.api";
import { toast } from "react-hot-toast";

export function ProcessForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues: { entryTables: [], outputTables: [] } });
  
  const navigate = useNavigate();
  const params = useParams();
  const [entryTables, setEntryTables] = useState([]);
  const [outputTables, setOutputTables] = useState([]);
  const [currentEntryTables, setCurrentEntryTables] = useState([]);
  const [currentOutputTables, setCurrentOutputTables] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      entryTables: currentEntryTables.map((entryTable) => entryTable.id),
      outputTables: currentOutputTables.map((outputTable) => outputTable.id),
    };
  
    if (params.id) {
      await updateProcess(params.id, updatedData);
      toast.success("Process updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      const response = await createProcess(updatedData);
      const processId = response.data.id;
      toast.success("New Process Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
      navigate(`/processes/${processId}`);
    }
  });  

  const handleDeleteEntryTable = async (entryTableId) => {
    try {
      await removeEntryTable(params.id, { input_table_id: entryTableId });
      const updatedEntryTables = currentClassifications.filter(
        (entryTable) => entryTable.id !== entryTableId
      );
      setCurrentEntryTables(updatedEntryTables);
    } catch (error) {
      console.error("Error removing entry table:", error);
    }
  };

  const handleDeleteOutputTable = async (outputTableId) => {
    try {
      await removeOutputTable(params.id, { output_table_id: outputTableId });
      const updatedOutputTables = currentOutputTables.filter(
        (outputTable) => outputTable.id !== outputTableId
      );
      setCurrentOutputTables(updatedOutputTables);
    } catch (error) {
      console.error("Error removing output table:", error);
    }
  };

  useEffect(() => {
    async function loadProcesses() {
      if (params.id) {
        const { data } = await getProcess(params.id);
        setValue("name", data.name);
        setValue("description", data.description);
        setCurrentEntryTables(data.entryTables);
        setCurrentOutputTables(data.outputTables);
      }
    }
    loadProcesses();
  }, [params.id]);

  useEffect(() => {
    async function loadTables() {
      try {
        const response = await getEntitiesByType(2);
        setEntryTables(response.data);
        setOutputTables(response.data);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    }

    loadTables();
  }, []);

  const handleAddEntryTable = async () => {
    const selectedEntryTableId = parseInt(watch("selectedEntryTable"));
    if (selectedEntryTableId && !currentEntryTables.find((c) => c.id === selectedEntryTableId)) {
      try {
        await addEntryTable(params.id, { input_table_id: selectedEntryTableId });
        const selectedEntryTable = entryTables.find((c) => c.id === selectedEntryTableId);
        setCurrentEntryTables((prevEntryTables) => [...prevEntryTables, selectedEntryTable]);
      } catch (error) {
        console.error("Error adding entry table:", error);
        // Manejo de errores al agregar clasificación
      }
    }
    setValue("selectedEntryTable", "");
  };

  const handleAddOutputTable = async () => {
    const selectedOutputTableId = parseInt(watch("selectedOutputTable"));
    if (selectedOutputTableId && !currentOutputTables.find((c) => c.id === selectedOutputTableId)) {
      try {
        await addOutputTable(params.id, { output_table_id: selectedOutputTableId });
        const selectedOutputTable = outputTables.find((c) => c.id === selectedOutputTableId);
        setCurrentOutputTables((prevOutputTables) => [...prevOutputTables, selectedOutputTable]);
      } catch (error) {
        console.error("Error adding output table:", error);
        // Handle error when adding output table
      }
    }
    setValue("selectedOutputTable", "");
  };

  return (
    <div className="columns is-vcentered is-centered">
      <div className="column is-half">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label">Nombre</label>
            <div className="control">
              <input
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
                className={`input ${errors.name ? "is-danger" : ""}`}
                autoFocus
              />
            </div>
            {errors.name && <p className="help is-danger">This field is required</p>}
          </div>
          <div className="field">
            <label className="label">Descripción</label>
            <div className="control">
              <textarea
                placeholder="Description"
                {...register("description")}
                className={`textarea ${errors.description ? "is-danger" : ""}`}
              />
            </div>
            {errors.description && <p className="help is-danger">This field is required</p>}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary mr-5">Guardar</button>
              {params.id && (
                <button
                  className="button is-danger"
                  onClick={async () => {
                    const accepted = window.confirm("Are you sure?");
                    if (accepted) {
                      await deleteProcess(params.id);
                      toast.success("Process Removed", {
                        position: "bottom-right",
                        style: {
                          background: "#101010",
                          color: "#fff",
                        },
                      });
                      navigate("/processes");
                    }
                  }}
                >
                  Borrar
                </button>
              )}
            </div>
          </div>
          <div className="field">
            <label className="label">Tablas de entrada</label>
            <div className="control">
              <div className="select is-multiple">
                <select
                  {...register("selectedEntryTable")}
                  className={`input ${errors.selectedEntryTable ? "is-danger" : ""}`}
                >
                  <option value="">Seleccione una tabla de entrada</option>
                  {entryTables.map((entryTable) => (
                    <option key={entryTable.id} value={entryTable.id}>
                      {entryTable.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.selectedEntryTable && (
              <p className="help is-danger">This field is required</p>
            )}
            <div className="control mt-2">
              <button
                type="button"
                className="button is-primary"
                onClick={handleAddEntryTable}
              >
                Agregar Tabla de Entrada
              </button>
            </div>
          </div>

          {currentEntryTables.length > 0 && (
            <div className="field">
              <label className="label">Tablas de entrada actuales</label>
              <div className="control">
                <ul className="tag-list">
                  {currentEntryTables.map((entryTable) => (
                    <li key={entryTable.id} className="tag is-light is-primary">
                      <span>{entryTable.name}</span>
                      <button
                        type="button"
                        className="button delete is-link"
                        onClick={() => handleDeleteEntryTable(entryTable.id)}
                      ></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="field">
            <label className="label">Tablas de salida</label>
            <div className="control">
              <div className="select is-multiple">
                <select
                  {...register("selectedOutputTable")}
                  className={`input ${errors.selectedOutputTable ? "is-danger" : ""}`}
                >
                  <option value="">Seleccione una tabla de salida</option>
                  {outputTables.map((outputTable) => (
                    <option key={outputTable.id} value={outputTable.id}>
                      {outputTable.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.selectedOutputTable && (
              <p className="help is-danger">This field is required</p>
            )}
            <div className="control mt-2">
              <button
                type="button"
                className="button is-primary"
                onClick={handleAddOutputTable}
              >
                Agregar Tabla de Salida
              </button>
            </div>
          </div>

          {currentOutputTables.length > 0 && (
            <div className="field">
              <label className="label">Tablas de salida actuales</label>
              <div className="control">
                <ul className="tag-list">
                  {currentOutputTables.map((outputTable) => (
                    <li key={outputTable.id} className="tag is-light is-primary">
                      <span>{outputTable.name}</span>
                      <button
                        type="button"
                        className="button delete is-link"
                        onClick={() => handleDeleteOutputTable(outputTable.id)}
                      ></button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
        </form>
      </div>
    </div>
  );
}