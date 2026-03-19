import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function LoginPage({ setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try{
            const formData = new URLSearchParams();
            formData.append("username", email);
            formData.append("password", password);
            
            const res = await api.post("/login", formData, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            console.log("LOGIN RESPONSE: ", res.data);

            localStorage.setItem("token", res.data.access_token);
            setToken(res.data.access_token)
            console.log("TOKEN AFTER SAVE: ", localStorage.getItem("token"));
            navigate("/jobs");
        } catch (err) {
            console.log("LOGIN ERROR: ", err);
            console.log("LOGIN ERROR RESPONSE: ", err.response);
            setError("Неправильний логін або пароль");
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
            <h1 style={{ marginTop: 0, marginBottom: "8px" }}>Вхід</h1>
            <p style={{ marginTop: 0, color: "#94a3b8" }}>
            Увійди в свій акаунт
            </p>

            <form
            onSubmit={handleLogin}
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
                background: "#3b82f6",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
                }}
            >
                Увійти
            </button>
            </form>

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
                Немає акаунта?{" "}
                <Link to={"/register"} style={{ color: "#60a5fa" }} >
                    Зареєструватися
                </Link>
            </p>

        </div>
        </div>
    );
}

export default LoginPage;