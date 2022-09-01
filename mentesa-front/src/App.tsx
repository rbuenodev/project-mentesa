import Routes from "./routes";
import GlobalStyles from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <GlobalStyles />
      <ToastContainer />
      <Routes />
    </>
  );
}

export default App;
