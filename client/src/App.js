import {BrowserRouter,Route,Routes,Navigate} from "react-router-dom"
import Login from "./scenes/Login/Login";
import Home from "./scenes/home";
import Profile from "./scenes/Profile/Profile";
import { useSelector } from "react-redux";
import {themeSettings} from "./theme";
import { useMemo } from "react";
import { createTheme} from "@mui/material/styles";
import {ThemeProvider,CssBaseline} from "@mui/material";
import Signup from "scenes/Register/Signup";



function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={isAuth ? <Home/> : <Navigate to="/" />} />
        <Route path="/profile/:userId" element={isAuth ? <Profile/> : <Navigate to="/" />} />
      </Routes>
      </ThemeProvider>
     
      </BrowserRouter>
    </div>
  );
}

export default App;
