import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
// import BookAppointment from './pages/Appointment/BookAppointment';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      {/* header */}
      {/* <Header /> */}

   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />     
        <Route path="/dashboard" element={<Dashboard />} /> 
        {/* <Route path="/book-appointment" element={<BookAppointment />} /> */}
        
      </Routes>

      {/* footer */}
      {/* <Footer /> */}
    </BrowserRouter>
    
  );
}
