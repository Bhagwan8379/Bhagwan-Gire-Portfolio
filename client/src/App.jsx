import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import Layout from './pages/admin/Layout';
import NotFound from './utils/NotFound';
import ParticleCusrour from './utils/ParticleCusrour';
import { Toaster } from 'sonner';
import Protected from './utils/Protected';
import Contact from './pages/admin/Contact';
import Emails from './pages/admin/Emails';
import Education from './pages/admin/Education';
import Projects from './pages/admin/Projects';
import { useDispatch } from 'react-redux';



const App = () => {
  const [isDark, setIsDark] = useState(true);



  return (
    <BrowserRouter>
      <ParticleCusrour />
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Protected compo={<Layout />} />}>
          <Route index element={<Dashboard />} />
          <Route path='projects' element={<Projects />} />
          <Route path='education' element={<Education />} />
          <Route path='emails' element={<Emails />} />
          <Route path='contact' element={<Contact isDark={isDark} />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
