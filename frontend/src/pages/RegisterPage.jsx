import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            await api.post("/register", null, {
                params: {
                    email,
                    password,
                },
            });

            setMessage("Акаунт успішно створено!");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            console.log("REGISTER ERROR: ", err)
            setError("Не вдалося створити акаунт");
        }
    };

    return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#1e293b",
          padding: "32px",
          borderRadius: "18px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: "8px" }}>Реєстрація</h1>
        <p style={{ marginTop: 0, color: "#94a3b8" }}>
          Створи новий акаунт
        </p>

        <form
          onSubmit={handleRegister}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "24px",
          }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "#e2e8f0",
              outline: "none",
            }}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#0f172a",
              color: "#e2e8f0",
              outline: "none",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "14px 16px",
              borderRadius: "12px",
              border: "none",
              background: "#22c55e",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Зареєструватися
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "16px",
              color: "#bbf7d0",
              background: "#14532d",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {message}
          </p>
        )}

        {error && (
          <p
            style={{
              marginTop: "16px",
              color: "#fca5a5",
              background: "#450a0a",
              padding: "12px",
              borderRadius: "10px",
            }}
          >
            {error}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#94a3b8" }}>
          Вже є акаунт?{" "}
          <Link to="/login" style={{ color: "#60a5fa" }}>
            Увійти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage