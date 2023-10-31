import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SERVER_URL } from './config';
import './App.css';
import AdminMain from './AdminMain.js'
import UserMain from './UserMain.js'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/add" element={<AdminMain />} />
                <Route path="/" element={<UserMain />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
