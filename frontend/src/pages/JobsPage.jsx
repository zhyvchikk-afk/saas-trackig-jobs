import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function JobsPage({ setToken }) {
    const[jobs, setJobs] = useState([]);
    const[title, setTitle] = useState("");
    const[price, setPrice] = useState("");
    const[editingJobId, setEditingJobId] = useState(null);
    const[error, setError] = useState("");
    const[loading, setLoading] = useState(true);
    const[saving, setSaving] = useState(false);
    const[deletingId, setDeletingId] = useState(null);

    const navigate = useNavigate();

    const fetchJobs = async () => {
      setLoading(true);
        try {
            const res = await api.get("/jobs");
            setJobs(res.data);
        } catch (err) {
            console.log("GET JOBS ERROR: ", err);
            setError("Не вдался завантажити jobs");
        } finally {
          setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setError("");

        if (!title.trim()) {
          setError("Введи назву job");
          return;
        }

        if (!price || Number(price) <= 0) {
          setError("Ціна має бути більшою за 0");
          return;
        }

        setSaving(true);

        try {
            if (editingJobId) {
                await api.put(`/jobs/${editingJobId}`, {
                    title: title,
                    price: Number(price),
                });
            } else {
                await api.post("/jobs", {
                    title: title,
                    price: Number(price),
                });                
            }

            setTitle("");
            setPrice("");
            setEditingJobId(null)
            fetchJobs();
        } catch (err) {
            console.log("SAVE JOB ERROR: ", err);
            setError("Не вдалося зберегти job");
        } finally {
          setSaving(false);
        }
    };

    const handleStartEdit = (job) => {
        setEditingJobId(job.id);
        setTitle(job.title);
        setPrice(String(job.price));
    };

    const handleCancelEdit = () => {
        setEditingJobId(null);
        setTitle("");
        setPrice("");
    };

    const handleDeleteJob = async (jobId) => {
      const confirmed = window.confirm("Точно видалити цей job?");
      if (!confirmed) return;

      setDeletingId(jobId);

      try {
          await api.delete(`/jobs/${jobId}`);
          fetchJobs();
      } catch (err) {
          console.log("DELETE JOB ERROR: ", err)
          setError("Не вдалося видалити job");
      } finally {
        setDeletingId(null);
      }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null)
        navigate("/login");
    };

    const totalIncome = Array.isArray(jobs)
        ? jobs.reduce((sum, job) => sum + Number(job.price), 0)
        : 0;

    return (
    <div style={{ minHeight: "100vh", padding: "32px", background: "#0f172a" }}>
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: 0 }}>Мої jobs</h1>
            <p style={{ color: "#94a3b8", marginTop: "8px" }}>
              Керуй своїми записами та доходом
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #334155",
              background: "#1e293b",
              color: "#e2e8f0",
              cursor: "pointer",
            }}
          >
            Вийти
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "24px",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Список jobs</h2>

            {loading ? (
              <p style={{ color: "#94a3b8" }}>Завантаження jobs...</p>
            ) : jobs.length === 0 ? (
              <p style={{ color: "#94a3b8" }}>Поки що немає жодного job.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px",
                      borderRadius: "14px",
                      background: "#0f172a",
                      border: "1px solid #334155",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                        {job.title}
                      </div>
                      <div style={{ color: "#94a3b8" }}>{job.price} грн</div>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                        <button
                        onClick={() => handleStartEdit(job)}
                        disabled={saving || deletingId === job.id}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#f59e0b",
                            color: "white",
                            cursor: "pointer",
                        }}
                        >
                        Редагувати
                        </button>
                        
                        <button
                        onClick={() => handleDeleteJob(job.id)}
                        disabled={deletingId === job.id}
                        style={{
                            padding: "10px 14px",
                            borderRadius: "10px",
                            border: "none",
                            background: "#ef4444",
                            color: "white",
                            cursor: "pointer",
                            opacity: deletingId === job.id ? 0.6 : 1,
                        }}
                        >
                        {deletingId === job.id ? "Видалення..." : "Видалити"}
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                background: "#1e293b",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              }}
            >
              <p style={{ margin: 0, color: "#94a3b8" }}>Загальний дохід</p>
              <h2 style={{ marginBottom: 0 }}>{totalIncome} грн</h2>
            </div>

            <div
              style={{
                background: "#1e293b",
                borderRadius: "18px",
                padding: "24px",
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              }}
            >
              <h2 style={{ marginTop: 0 }}>
                {editingJobId ? "Редагувати job" : "Додати job"}
                </h2>

              <form
                onSubmit={handleCreateJob}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <input
                  type="text"
                  placeholder="Назва job"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  type="number"
                  placeholder="Ціна"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
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
                  disabled={saving}
                  style={{
                    padding: "14px 16px",
                    borderRadius: "12px",
                    border: "none",
                    background: editingJobId ? "#f59e0b" : "#22c55e",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving
                    ? "Збереження..."
                    : editingJobId 
                    ? "Зберегти зміни" : "Додати" }
                </button>
                {editingJobId && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                        style={{
                            padding: "14px 16px",
                            borderRadius: "12px",
                            border: "1px solid #334155",
                            background: "#1e293b",
                            color: "white",
                            cursor: "pointer",
                            opacity: saving ? 0.6 : 1,
                        }}
                    >
                        Скасувати
                    </button>
                )}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobsPage;