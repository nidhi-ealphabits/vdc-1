import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {socket} from '../src/components/Socket/socket'
import Room from "./components/Room/Room";
import Room1 from "./components/Room/Room1";
import Analyties from "./components/Analyties/Analyties";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Main from "./components/Main/Main";
// import Main1 from "./components/Main/Main1";

function App() {
  return (
    // <h1>Hello</h1>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main/>}></Route>

      {/* <Route path="/" element={<Room />}></Route> */}
      {/* <Route path="/" element={<Main />}></Route> */}
      <Route exact path="/analyties" element={<Analyties />}></Route>
      <Route exact path="/:roomId" element={<Room />}></Route>
      {/* <Route exact path="/:roomId" element={<Room1 />}></Route> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
