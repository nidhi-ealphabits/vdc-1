import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Room from "./components/Room/Room";
import Analyties from "./components/Analyties/Analyties";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Main from "./components/Main/Main";
// import Main1 from "./components/Main/Main1";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main/>}></Route>
      <Route exact path="/analyties" element={<Analyties />}></Route>
      <Route exact path="/:roomId" element={<Room />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
