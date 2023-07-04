import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Room from "./components/Room/Room";
import Analytics from "./components/Analytics/Analytics";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Main from "./components/Main/Main";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Main/>}></Route>
      <Route exact path="/analytics" element={<Analytics />}></Route>
      <Route exact path="/:roomId" element={<Room />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
