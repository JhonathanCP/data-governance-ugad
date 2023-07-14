import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createClassification, deleteClassification, getClassification, updateClassification } from "../api/classifications.api";
import { toast } from "react-hot-toast";

export function ClassificationFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const updatedData = {};
    if (data.name) {
      updatedData.name = data.name;
    }
    if (data.description) {
      updatedData.description = data.description;
    }

    if (params.id) {
      await updateClassification(params.id, updatedData);
      toast.success("Classification updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createClassification(updatedData);
      toast.success("New Classification Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/classifications");
  });

  useEffect(() => {
    async function loadClassifications() {
      if (params.id) {
        const { data } = await getClassification(params.id);
        setValue("name", data.name);
        setValue("description", data.description);
      }
    }
    loadClassifications();
  }, []);

  return (
    <div className="columns is-vcentered is-centered" style={{ height: '80vh', overflowY: 'auto' }}>
      <div className="column is-half">
      <form onSubmit={onSubmit} >
        <div className="field">
          <label className="label">Nombre</label>
          <div className="control">
            <input
              type="text"
              placeholder="Name"
              {...register("name")}
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
                      await deleteClassification(params.id);
                      toast.success("Process Removed", {
                        position: "bottom-right",
                        style: {
                          background: "#101010",
                          color: "#fff",
                        },
                      });
                      navigate("/classifications");
                    }
                  }}
                >
                  Borrar
                </button>
              )}
          </div>
        </div>
      </form>
      </div>
    </div>
  );
}
