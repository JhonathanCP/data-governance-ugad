import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createEntityType, deleteEntityType, getEntityType, updateEntityType } from "../api/entityTypes.api";
import { toast } from "react-hot-toast";

export function EntityTypeFormPage() {
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
      await updateEntityType(params.id, updatedData);
      toast.success("EntityType updated", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    } else {
      await createEntityType(updatedData);
      toast.success("New Entity Type Added", {
        position: "bottom-right",
        style: {
          background: "#101010",
          color: "#fff",
        },
      });
    }

    navigate("/entitytypes");
  });

  useEffect(() => {
    async function loadEntityTypes() {
      if (params.id) {
        const { data } = await getEntityType(params.id);
        setValue("name", data.name);
        setValue("description", data.description);
      }
    }
    loadEntityTypes();
  }, []);

  return (
    <div className="columns is-vcentered is-centered" style={{ height: '80vh', overflowY: 'auto' }}>
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
          <button className="button is-primary mr-5">Guardar</button>
              {params.id && (
                <button
                  className="button is-danger"
                  onClick={async () => {
                    const accepted = window.confirm("Are you sure?");
                    if (accepted) {
                      await deleteEntityType(params.id);
                      toast.success("Process Removed", {
                        position: "bottom-right",
                        style: {
                          background: "#101010",
                          color: "#fff",
                        },
                      });
                      navigate("/entitytypes");
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
