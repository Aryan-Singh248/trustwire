import { useEffect, useRef, useState } from "react";
import axios from "axios";

function BlockchainExplorer() {
  const [chainData, setChainData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastBlockCount = useRef(0);

  const fetchBlockchain = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/test");
      setChainData(res.data);
      lastBlockCount.current = res.data.chainLength;
    } catch {
      setError("Failed to load blockchain data");
    } finally {
      setLoading(false);
    }
  };

  // Initial load + auto refresh every 4 seconds
  useEffect(() => {
    fetchBlockchain();
    const interval = setInterval(fetchBlockchain, 4000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div style={{ marginTop: 50 }}>Loading blockchain…</div>;
  if (error) return <div style={{ marginTop: 50, color: "red" }}>{error}</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2>
          Blockchain Explorer{" "}
          <span style={{ color: "#3ddc97" }}>✓ Valid</span>
        </h2>
        <span style={styles.meta}>
          Total Blocks: {chainData.chainLength}
        </span>
      </div>

      <div style={styles.blocks}>
        {chainData.chain.map((block, idx) => {
          const isLatest = idx === chainData.chain.length - 1;

          return (
            <div
              key={block.index}
              style={{
                ...styles.blockCard,
                ...(isLatest ? styles.latestBlock : {}),
              }}
            >
              <div style={styles.blockHeader}>
                <span style={styles.blockIndex}>
                  Block #{block.index}
                </span>
                <span style={styles.timestamp}>
                  {new Date(block.timestamp).toLocaleString()}
                </span>
              </div>

              <div style={styles.section}>
                <strong>Data</strong>
                <pre style={styles.code}>
                  {JSON.stringify(block.data, null, 2)}
                </pre>
              </div>

              <div style={styles.section}>
                <strong>Hash</strong>
                <div style={styles.hash}>{block.hash}</div>
              </div>

              <div style={styles.section}>
                <strong>Previous Hash</strong>
                <div style={styles.hash}>{block.previousHash}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginTop: 70,
    padding: 30,
    borderRadius: 20,
    background:
      "linear-gradient(135deg, rgba(0,40,80,0.9), rgba(0,10,20,0.95))",
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  meta: {
    opacity: 0.7,
    fontSize: 14,
  },
  blocks: {
    display: "flex",
    flexDirection: "column",
    gap: 22,
  },
  blockCard: {
    padding: 22,
    borderRadius: 18,
    background:
      "linear-gradient(135deg, rgba(10,30,60,0.9), rgba(0,0,0,0.85))",
    boxShadow: "inset 0 0 20px rgba(0,0,0,0.6)",
    transition: "all 0.6s ease",
  },
  latestBlock: {
    boxShadow: "0 0 30px rgba(61,220,151,0.6)",
    border: "1px solid rgba(61,220,151,0.6)",
    transform: "scale(1.01)",
  },
  blockHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  blockIndex: {
    color: "#4fc3f7",
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.6,
  },
  section: {
    marginTop: 12,
    fontSize: 14,
  },
  code: {
    background: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
  },
  hash: {
    fontSize: 12,
    wordBreak: "break-all",
    opacity: 0.85,
    marginTop: 6,
  },
};

export default BlockchainExplorer;
