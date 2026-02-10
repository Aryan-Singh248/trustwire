import { useEffect, useState } from "react";
import axios from "axios";

/*
  API base URL
  - Uses Render backend in production
  - Uses localhost during development
*/
const API =
  import.meta.env.VITE_API_URL || "http://localhost:5001";

export default function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchWallets = async () => {
    const res = await axios.get(`${API}/users`);
    setWallets(res.data);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const handleSend = async () => {
    if (!from || !to || !amount || from === to) return;

    try {
      setLoading(true);
      setMessage(null);

      await axios.post(`${API}/api/add`, {
        from,
        to,
        amount: Number(amount),
      });

      setMessage({ type: "success", text: "Transaction successful" });
      setFrom("");
      setTo("");
      setAmount("");
      fetchWallets();
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Transaction failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading || !from || !to || !amount || from === to || amount <= 0;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Blockchain Finance Dashboard</h1>

      {message && (
        <div
          style={{
            ...styles.toast,
            background:
              message.type === "success"
                ? "linear-gradient(135deg,#22c55e,#16a34a)"
                : "linear-gradient(135deg,#ef4444,#b91c1c)",
          }}
        >
          {message.text}
        </div>
      )}

      <div style={styles.grid}>
        {/* Wallets */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Wallets</h2>
          <div style={styles.walletRow}>
            {wallets.map((w) => (
              <div key={w._id} style={styles.wallet}>
                <div style={styles.walletName}>{w.name}</div>
                <div style={styles.balance}>₹ {w.balance}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Send money */}
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Send Money</h2>

          <select
            style={styles.input}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">From</option>
            {wallets.map((w) => (
              <option key={w._id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>

          <select
            style={styles.input}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">To</option>
            {wallets.map((w) => (
              <option key={w._id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>

          <input
            style={styles.input}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={handleSend}
            disabled={isDisabled}
            style={{
              ...styles.button,
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            {loading ? "Processing..." : "Send Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "60px",
    background:
      "radial-gradient(circle at top left, #0f172a, #020617)",
    color: "#e5e7eb",
    fontFamily: "Inter, Segoe UI, Arial",
  },

  title: {
    fontSize: "48px",
    fontWeight: 700,
    marginBottom: "50px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
  },

  card: {
    background:
      "linear-gradient(180deg, rgba(15,23,42,0.9), rgba(2,6,23,0.9))",
    borderRadius: "20px",
    padding: "30px",
    backdropFilter: "blur(12px)",
    boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
  },

  sectionTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#38bdf8",
  },

  walletRow: {
    display: "flex",
    gap: "20px",
  },

  wallet: {
    background: "rgba(2,6,23,0.9)",
    padding: "20px",
    borderRadius: "14px",
    minWidth: "150px",
  },

  walletName: {
    fontSize: "16px",
    opacity: 0.8,
  },

  balance: {
    fontSize: "26px",
    fontWeight: 700,
    marginTop: "8px",
    color: "#22c55e",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "none",
    background: "#020617",
    color: "#e5e7eb",
    fontSize: "15px",
    outline: "none",
  },

  button: {
    marginTop: "10px",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    color: "#020617",
    background:
      "linear-gradient(135deg, #38bdf8, #22c55e)",
  },

  toast: {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "14px 22px",
    borderRadius: "12px",
    color: "#fff",
    fontWeight: 500,
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    zIndex: 999,
  },
};
