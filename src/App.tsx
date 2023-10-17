import { useEffect, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import Router from "./routes/Router";
import { useDispatch } from "react-redux";
import { RootDispatch } from "./store/config";

function App() {
  const dispatch = useDispatch<RootDispatch>();

  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Router />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
