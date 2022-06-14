import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import "../formStyles.css";
import registrerStudent from "../api/endpoints/registrerStudent"

const Registration = () => {
  let navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, Title: "", message: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data) {
      registrerStudent(data)
      .then(function (response) {
        if (response) {
          setAlert({
            show: true,
            title: "Listo",
            message: response
          });
          reset();
          setTimeout(() => {
            navigate("test/1");
          }, 2000);
        }
    })
    .catch(function (error) {
      setAlert({
        show: true,
        title: "OMG!",
        message: error?.response?.data?.Mensaje,
        });
      });
    } else {
      setAlert({
        show: true,
        title: "Lo siento",
        message: "El usuario ya registrado.",
      });
    }
  };

 return (
    <div>
      <div className="fatherTitle">
        <div className="headerTitle">
          <h1 className="">SEPEC PRUEBA</h1>
        </div>
        <div></div>
      </div>
      {alert.show && <Modal config={alert} setAlert={setAlert} />}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card">
              <h2 className="card-titletext-center">Regístrate</h2>
              <div className="card-bo.dy py-md-4">
                {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
                <form onSubmit={handleSubmit(onSubmit)} _lpchecked="1">
                  <div className="form-group">
                    <input
                      {...register("identification", { required: true })}
                      type="number"
                      className="form-control"
                      id="identification"
                      placeholder="Cédula"
                    />
                    {errors.identification && (
                      <span style={{ color: "red" }}>
                        Este campo es obligatorio
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Nombre completo"
                    />
                    {errors.name && (
                      <span style={{ color: "red" }}>
                        Este campo es obligatorio
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Correo institucional"
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        Este campo es obligatorio 
                      </span>
                    )}
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-end">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModal"
                    >
                      Aceptar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;