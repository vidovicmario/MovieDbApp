//import CardList from "../components/CardList";
import CardList from "../components/CardList";
//import { Space } from "antd";
import Sidebar from "../components/Sidebar";

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "start" }}>
      <div style={{ marginTop: "30px", display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Sidebar />
        <CardList />
      </div>
    </div>
  );
}

export default Home;
