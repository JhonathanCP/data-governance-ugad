import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createEntity, deleteEntity, getEntity, updateEntity } from "../api/entities.api";
import { toast } from "react-hot-toast";

export function EntityForm() {
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
      await updateEntity(params.id, updatedData);
      toast.success("Entity updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createEntity(updatedData);
      toast.success("New Entity Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/entities");
  });

  useEffect(() => {
    async function loadEntities() {
      if (params.id) {
        const { data } = await getEntity(params.id);
        setValue("name", data.name);
        setValue("description", data.description);
      }
    }
    loadEntities();
  }, []);

  return (
    <div className="columns is-vcentered is-centered" >
      <div className="column is-half">
      <form onSubmit={onSubmit} >
        <div className="field">
          <label className="label">Name</label>
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
          <label className="label">Description</label>
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
            <button className="button is-primary">Guardar</button>
          </div>
        </div>
      </form>
      </div>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="button is-danger mt-3"
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
        </div>
      )}
    </div>
  );
}
