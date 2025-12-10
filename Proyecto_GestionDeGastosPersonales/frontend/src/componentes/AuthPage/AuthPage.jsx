import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import loginImage from "./assets/login1-removebg-preview.png";
import ReCAPTCHA from "react-google-recaptcha";
import "./AuthPage.css";
import { useNavigate } from 'react-router-dom';
import { loginUsuario, registerUsuario } from "../services/usuariosServices.jsx";

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
    const [isLogin, setIsLogin] = useState(true); 
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        ap_Pat: "",  
        ap_Mat: "",  
        correo: "", 
        contrasenia: "", 
    });

    const [captchaValue, setCaptchaValue] = useState(null);
    const [strength, setStrength] = useState({ score: 0, feedback: "Muy débil" });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setError("");

        if (id === "contrasenia") {
            if (value.length > 0) {
                setStrength(checkPasswordStrength(value));
            } else {
                setStrength({ score: 0, feedback: "Muy débil" });
            }
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        
        if (isLogin && !captchaValue) {
            setError("Por favor completa el Captcha");
            setIsSubmitting(false);
            return;
        }

        try {
            let response;
            
            if (isLogin) {
                // LOGIN
                response = await loginUsuario({
                    correo: formData.correo,
                    contrasenia: formData.contrasenia
                });
            } else {
                // REGISTRO
                response = await registerUsuario({
                    nombre: formData.nombre,
                    ap_Pat: formData.ap_Pat,
                    ap_Mat: formData.ap_Mat,
                    correo: formData.correo,
                    contrasenia: formData.contrasenia
                });
            }

            console.log("Respuesta del servidor:", response);

            if (response.ok) {
                // Guardar usuario en localStorage
                localStorage.setItem('user', JSON.stringify(response.usuario || response.data));
                // Redirigir al gestor de gastos
                navigate('/Home');
            } else {
                setError(response.msg || "Error en la autenticación");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
            console.error("Error completo:", error);
        } finally {
            setIsSubmitting(false);
        }
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
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`auth-tab ${!isLogin ? "auth-tab-active" : "auth-tab-inactive"}`}
                        >
                            Registrarse
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={`auth-tab ${isLogin ? "auth-tab-active" : "auth-tab-inactive"}`}
                        >
                            Iniciar Sesión
                        </button>
                    </div>

                    {/* Formulario */}
                    <div className="auth-form-content">
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {/* Mostrar error */}
                            {error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )}

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
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                className="auth-input auth-input-with-icon"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </div>

                                    {/* Apellidos */}
                                    <div className="auth-names-grid">
                                        <div className="auth-form-field">
                                            <label htmlFor="ap_Pat" className="auth-label">
                                                Ap. Paterno
                                            </label>
                                            <input
                                                id="ap_Pat"
                                                type="text"
                                                placeholder="Pérez"
                                                value={formData.ap_Pat}
                                                onChange={handleChange}
                                                className="auth-input"
                                                required={!isLogin}
                                            />
                                        </div>
                                        <div className="auth-form-field">
                                            <label htmlFor="ap_Mat" className="auth-label">
                                                Ap. Materno
                                            </label>
                                            <input
                                                id="ap_Mat"
                                                type="text"
                                                placeholder="López"
                                                value={formData.ap_Mat}
                                                onChange={handleChange}
                                                className="auth-input"
                                                required={!isLogin}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Correo */}
                            <div className="auth-form-field">
                                <label htmlFor="correo" className="auth-label">
                                    Correo Electrónico
                                </label>
                                <div className="auth-input-container">
                                    <div className="auth-input-icon">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        id="correo"
                                        type="email"
                                        placeholder="ejemplo@correo.com"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        className="auth-input auth-input-with-icon"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div className="auth-form-field">
                                <label htmlFor="contrasenia" className="auth-label">
                                    Contraseña
                                </label>
                                <div className="auth-input-container">
                                    <div className="auth-input-icon">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        id="contrasenia"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.contrasenia}
                                        onChange={handleChange}
                                        className="auth-input auth-input-with-icon"
                                        required
                                    />
                                </div>

                                {/* Medidor de fuerza (solo en registro) */}
                                {!isLogin && formData.contrasenia.length > 0 && (
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

                            {/* Recaptcha (solo en login) */}
                            {isLogin && (
                                <div className="auth-captcha-container">
                                    <ReCAPTCHA
                                        sitekey={RECAPTCHA_SITE_KEY}
                                        onChange={handleCaptchaChange}
                                    />
                                </div>
                            )}

                            {/* Botón */}
                            <button 
                                type="submit" 
                                className="auth-submit-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
                                {!isSubmitting && <ArrowRight size={20} />}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;