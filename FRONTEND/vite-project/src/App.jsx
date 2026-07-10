import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import Background3D from "./Components/Background3D";
import AppRoute from "./Routes/Approute";

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

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