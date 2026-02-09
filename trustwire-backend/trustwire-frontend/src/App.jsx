import Wallets from "./Wallets";
import BlockchainExplorer from "./components/BlockchainExplorer";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "48px 64px",
        background:
          "radial-gradient(circle at top left, #0f172a, #020617 70%)",
        color: "#ffffff",
        fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: "48px" }}>
        <h1
          style={{
            fontSize: "2.6rem",
            fontWeight: "700",
            letterSpacing: "-0.5px",
            marginBottom: "8px",
          }}
        >
          TrustWire
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "#c7d2fe",
            maxWidth: "720px",
          }}
        >
          Blockchain-Based Digital Banking System with secure wallets,
          validated transactions, and a transparent blockchain ledger.
        </p>
      </header>

      {/* Wallets & Transactions */}
      <section style={{ marginBottom: "64px" }}>
        <Wallets />
      </section>

      {/* Blockchain Explorer */}
      <section>
        <BlockchainExplorer />
      </section>
    </div>
  );
}

export default App;
