import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import { createBrowserHistory } from "@remix-run/router";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
        <Router />
    </BrowserRouter>
  );
}

export default App;
