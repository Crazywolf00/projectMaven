import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AdminMain from './AdminMain.js'
import UserMain from './UserMain.js'

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/add" element={<AdminMain />}/>
            <Route path="/" element={<UserMain />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
