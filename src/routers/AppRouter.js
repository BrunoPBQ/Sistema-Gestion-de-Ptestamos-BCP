import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import { AuthProvider } from "../Firebase/AuthContext";
import PrivateRoute from "./PrivateRouter";
import PublicRoute from "./PublicRouter";
import SystemRouter from "./systemRouter";

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/*" element={<SystemRouter />}></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login />}></Route>
          </Route>
          <Route element={<PublicRoute />}>
            <Route path="registrar" element={<Register />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
