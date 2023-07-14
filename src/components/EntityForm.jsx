import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createEntity, deleteEntity, getEntity, updateEntity, addClassification, removeClassification } from "../api/entities.api";
import { getClassifications } from "../api/classifications.api";
import { toast } from "react-hot-toast";

export function EntityForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ defaultValues: { classifications: [] } });
  const navigate = useNavigate();
  const params = useParams();
  const [classifications, setClassifications] = useState([]);
  const [currentClassifications, setCurrentClassifications] = useState([]);

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {
      name: data.name,
      description: data.description,
      classifications: currentClassifications.map((classification) => classification.id),
    };
  
    if (params.id) {
      await updateEntity(params.id, updatedData);
      toast.success("Entity updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      const response = await createEntity(updatedData);
      const entityId = response.data.id;
      toast.success("New Entity Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
      navigate(`/entities/${entityId}`);
    }
  });  

  const handleDeleteClassification = async (classificationId) => {
    try {
      await removeClassification(params.id, { classification_id: classificationId });
      const updatedClassifications = currentClassifications.filter(
        (classification) => classification.id !== classificationId
      );
      setCurrentClassifications(updatedClassifications);
    } catch (error) {
      console.error("Error removing classification:", error);
      // Manejo de errores al eliminar clasificación
    }
  };

  useEffect(() => {
    async function loadEntities() {
      if (params.id) {
        const { data } = await getEntity(params.id);
        setValue("name", data.name);
        setValue("description", data.description);
        setCurrentClassifications(data.classifications);
      }
    }
    loadEntities();
  }, [params.id]);

  useEffect(() => {
    async function loadClassifications() {
      try {
        const response = await getClassifications();
        setClassifications(response.data);
      } catch (error) {
        console.error("Error fetching classifications:", error);
        // Manejo de errores en la carga de clasificaciones
      }
    }

    loadClassifications();
  }, []);

  const handleAddClassification = async () => {
    const selectedClassificationId = parseInt(watch("selectedClassification"));
    if (selectedClassificationId && !currentClassifications.find((c) => c.id === selectedClassificationId)) {
      try {
        await addClassification(params.id, { classification_id: selectedClassificationId });
        const selectedClassification = classifications.find((c) => c.id === selectedClassificationId);
        setCurrentClassifications((prevClassifications) => [...prevClassifications, selectedClassification]);
      } catch (error) {
        console.error("Error adding classification:", error);
        // Manejo de errores al agregar clasificación
      }
    }
    setValue("selectedClassification", "");
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
                      await deleteEntity(params.id);
                      toast.success("Entity Removed", {
                        position: "bottom-right",
                        style: {
                          background: "#101010",
                          color: "#fff",
                        },
                      });
                      navigate("/entities");
                    }
                  }}
                >
                  Borrar
                </button>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label">Clasificaciones</label>
            <div className="control">
              <div className="select is-multiple">
                <select
                  {...register("selectedClassification")}
                  className={`input ${errors.selectedClassification ? "is-danger" : ""}`}
                >
                  <option value="">Seleccione una clasificación</option>
                  {classifications.map((classification) => (
                    <option key={classification.id} value={classification.id}>
                      {classification.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {errors.selectedClassification && (
              <p className="help is-danger">This field is required</p>
            )}
            <div className="control mt-2">
              <button
                type="button"
                className="button is-primary"
                onClick={handleAddClassification}
              >
                Agregar Clasificación
              </button>
            </div>
          </div>

          {currentClassifications.length > 0 && (
            <div className="field">
              <label className="label">Clasificaciones Actuales</label>
              <div className="control">
                <ul className="tag-list">
                  {currentClassifications.map((classification) => (
                    <li key={classification.id} className="tag is-light is-primary">
                      <span>{classification.name}</span>
                      <button
                        type="button"
                        className="button delete is-link"
                        onClick={() => handleDeleteClassification(classification.id)}
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
