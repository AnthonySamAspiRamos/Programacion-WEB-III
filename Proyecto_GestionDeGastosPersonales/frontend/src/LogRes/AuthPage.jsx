import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import loginImage from "./assets/login1-removebg-preview.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./AuthPage.css"; 
import { useNavigate, Link } from 'react-router-dom';
import GestorDeGastos from "../GestorDeGastos.jsx";

const RECAPTCHA_SITE_KEY = "6LcpuSYsAAAAANcks8ZJRt-SBoqJhANA-V0cfliy";

const checkPasswordStrength = (password) => {
  let score = 0;
  let feedback = "Muy débil";

  if (password.length >= 8) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const feedbackMap = ["Muy débil", "Débil", "Moderada", "Fuerte", "Excelente"];
  feedback = feedbackMap[score] || "Excelente";

  return { score, feedback };
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    nombre: "",
    paterno: "",
    materno: "",
    email: "",
    password: "",
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [strength, setStrength] = useState({ score: 0, feedback: "Muy débil" });



  const [Usuario, setUsuario] = useState(null);

  function regresarALista() {
        setEditando(null);
    }
    function ObteniendoUsuario(usuario) {
        alert("Intentando entrar");
        setUsuario(usuario);
    }
    if (Usuario) {
        return <GestorDeGastos usuario={Usuario} regresar={regresarALista} />
    }
   
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(""); 

    if (id === "password") {
      if (value.length > 0) {
        setStrength(checkPasswordStrength(value));
      } else {
        setStrength({ score: 0, feedback: "Muy débil" });
      }
    }
  };

  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    if (isLogin && !captchaValue) {
      alert("Por favor completa el Captcha");
      return;
    }

    console.log("Datos enviados:", formData);
    console.log("Modo:", isLogin ? "Login" : "Registro");
  };

  return (
    <div className="auth-container">
      {/* Sección izquierda (Imagen) */}
      <div className="auth-left-section">
        <div className="auth-left-circle auth-left-circle-1"></div>
        <div className="auth-left-circle auth-left-circle-2"></div>

        <div className="auth-left-image-container">
          <img
            src={loginImage}
            alt="Ilustración Principal"
            className="auth-left-image"
          />
        </div>
      </div>

      {/* Sección derecha (Formulario) */}
      <div className="auth-right-section">
        <div className="auth-form-container">
          {/* Pestañas */}
          <div className="auth-tabs">
            <button
              onClick={() => setIsLogin(false)}
              className={`auth-tab ${
                !isLogin ? "auth-tab-active" : "auth-tab-inactive"
              }`}
            >
              Registrarse
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`auth-tab ${
                isLogin ? "auth-tab-active" : "auth-tab-inactive"
              }`}
            >
              Iniciar Sesión
            </button>
          </div>

          {/* Formulario */}
          <div className="auth-form-content">
            <form className="auth-form" onSubmit={handleSubmit}>
              {/* Campos de registro */}
              {!isLogin && (
                <div className="auth-register-fields">
                  {/* Nombre */}
                  <div className="auth-form-field">
                    <label htmlFor="nombre" className="auth-label">
                      Nombre
                    </label>
                    <div className="auth-input-container">
                      <div className="auth-input-icon">
                        <User size={18} />
                      </div>
                      <input
                        id="nombre"
                        type="text"
                        placeholder="Juan"
                        onChange={handleChange}
                        className="auth-input auth-input-with-icon"
                      />
                    </div>
                  </div>

                  {/* Apellidos */}
                  <div className="auth-names-grid">
                    <div className="auth-form-field">
                      <label htmlFor="paterno" className="auth-label">
                        Ap. Paterno
                      </label>
                      <input
                        id="paterno"
                        type="text"
                        placeholder="Pérez"
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                    <div className="auth-form-field">
                      <label htmlFor="materno" className="auth-label">
                        Ap. Materno
                      </label>
                      <input
                        id="materno"
                        type="text"
                        placeholder="López"
                        onChange={handleChange}
                        className="auth-input"
                      />
                    </div>
                  </div>
                </div>
              )}
              

              {/* Correo */}
              <div className="auth-form-field">
                <label htmlFor="email" className="auth-label">
                  Correo Electrónico
                </label>
                <div className="auth-input-container">
                  <div className="auth-input-icon">
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    onChange={handleChange}
                    className="auth-input auth-input-with-icon"
                  />
                </div>
              </div>

{/* Contraseña */}
              <div className="auth-form-field">
                <label htmlFor="password" className="auth-label">
                  Contraseña
                </label>
                <div className="auth-input-container">
                  <div className="auth-input-icon">
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    onChange={handleChange}
                    className="auth-input auth-input-with-icon"
                  />
                </div>

{/* Medidor de fuerza */}
                {!isLogin && formData.password.length > 0 && (
                  <div className="password-strength-meter">
                    <div className="password-strength-bar-bg">
                      <div
                        className={`password-strength-bar-fill ${
                          strength.score <= 1
                            ? "password-strength-weak"
                            : strength.score === 2
                            ? "password-strength-medium"
                            : strength.score === 3
                            ? "password-strength-good"
                            : "password-strength-strong"
                        }`}
                        style={{ width: `${(strength.score / 4) * 100}%` }}
                      ></div>
                    </div>
                    <p
                      className={`password-strength-text ${
                        strength.score <= 1
                          ? "password-strength-text-weak"
                          : strength.score === 2
                          ? "password-strength-text-medium"
                          : "password-strength-text-strong"
                      }`}
                    >
                      Fuerza: <strong>{strength.feedback}</strong>
                    </p>
                  </div>
                )}
              </div>

{/* Recaptcha */}
              {isLogin && (
                <div className="auth-captcha-container">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    onChange={handleCaptchaChange}
                  />
                </div>
              )}

              {/* Botón */}
              <button type="submit" className="auth-submit-button"
              onClick={() => ObteniendoUsuario(usuario)}>
                {isLogin ? "Iniciar Sesión" : "Registrarse"}
                <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
