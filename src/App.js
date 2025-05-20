import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Login from './components/login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}

          <Route path='/create' element={<ProtectedRoute>
            <Layout/>
            </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
