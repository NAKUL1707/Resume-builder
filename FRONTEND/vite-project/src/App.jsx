import Background3D from "./Components/Background3D";
import AppRoute from "./Routes/Approute";

function App() {
  return (
    <>
      <Background3D />
      <div className="relative z-10">
        <AppRoute />
      </div>
    </>
  );
}

export default App;
