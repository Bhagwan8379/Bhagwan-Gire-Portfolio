import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary"
import { useDispatch } from 'react-redux';
import { Toaster } from 'sonner';
import FallBackError from './utils/FallBackError';
import Loader from './pages/Loader';
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Layout = lazy(() => import('./pages/admin/Layout'));
const NotFound = lazy(() => import('./utils/NotFound'));
const ParticleCusrour = lazy(() => import('./utils/ParticleCusrour'));
const Protected = lazy(() => import('./utils/Protected'));
const Contact = lazy(() => import('./pages/admin/Contact'));
const Emails = lazy(() => import('./pages/admin/Emails'));
const Education = lazy(() => import('./pages/admin/Education'));
const Projects = lazy(() => import('./pages/admin/Projects'));



const App = () => {
  const [isDark, setIsDark] = useState(true);



  return (
    <BrowserRouter>
      <ParticleCusrour />
      <Toaster position='top-right' />
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loader />}>
          <ErrorBoundary FallbackComponent={FallBackError}>
            <Home />
          </ErrorBoundary>
        </Suspense>} />
        <Route path='/admin' element={<Suspense fallback={<Loader />}>
          <ErrorBoundary FallbackComponent={FallBackError}>
            <Protected compo={<Layout />} />
          </ErrorBoundary>
        </Suspense>}>
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
