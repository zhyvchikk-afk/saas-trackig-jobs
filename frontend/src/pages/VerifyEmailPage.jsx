import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios";

function VerifyEmailPage() {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("Перевіряємо...");
    const [error, setError] = useState("");

    useEffect(() => {
        const token = searchParams.get("token");

        if (!token) {
            setError("Токен відсутній");
            setMessage("");
            return;
        }

        api
            .get("/verify-email", {
                params: { token },
            })
            .then(() => {
                setMessage("Пошту успішно підтверджено")
            })
            .catch((err) => {
                console.log(err);
                setError("Не вдалося підтвердити пошту");
                setMessage("");
            });
    }, [searchParams]);

    return (
        <div style={{ padding: "40px", color: "white" }}>
            {message && <h1>{message}</h1>}
            {error && <h1>{error}</h1>}
            <p>
                <Link to="/login">Перейти до входу</Link>
            </p>
        </div>
    );
}

export default VerifyEmailPage;