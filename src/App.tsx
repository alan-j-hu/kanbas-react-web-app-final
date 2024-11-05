import store from "./Kanbas/store";
import { Provider } from "react-redux";
import Kanbas from "./Kanbas";
import Labs from "./Labs";
import Landing from "./Landing";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <div>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
      </Provider>
    </HashRouter>
  );
}

