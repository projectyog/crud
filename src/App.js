import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import View from "./components/user/View";
import Edit from "./components/user/Edit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Dashboard/>} />
          <Route exact path="/view/:id" element={<View/>} />
          <Route exact path="/edit/:id" element={<Edit/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;