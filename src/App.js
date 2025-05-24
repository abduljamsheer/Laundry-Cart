import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ForgetPassword';
function App() {
  const NotFound = () => {
    return (
      <h1 className='not-found'>
    404 Not Found
      </h1 >
    )
}
return (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="*" element={<NotFound />} />

      <Route path='/create' element={<ProtectedRoute>
        <Layout />
      </ProtectedRoute>} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);
}


export default App;
