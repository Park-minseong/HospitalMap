import { Route, Routes } from "react-router-dom";
import Social from "./components/Social";
import PrivateRoute from "./libs/PrivateRoute";
import Login from "./pages/Login";
import Service from "./pages/Service";

function App() {
  return (
    <Routes>
      <Route path="/oauth2/kakao" element={<Social />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<PrivateRoute component={Service} />}></Route>
    </Routes>
  );
}

export default App;
