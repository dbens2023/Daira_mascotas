import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./paginas/Home";
import { Nav} from "./conponent/Nav";
import { Mascota }from "./paginas/Mascota";
import { Admin }from "./paginas/Admin";

function App() {

  return (

    <BrowserRouter className="container-fluid">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/mascotas" element={<Mascota />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>



  );
}

export default App;
