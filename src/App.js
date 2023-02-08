import './App.css';
import { HashRouter as Router, BrowserRouter } from 'react-router-dom';
import React, { lazy, Suspense } from 'react'
const AppRouter = lazy(() => import('./routes'))

function App() {
  return (
  <>
  <BrowserRouter>
        <Router>
          <Suspense fallback={<div className={'text-center mt-3 text-primary display-6' } >Loading Please Wait....</div>}>
            <AppRouter />
          </Suspense>
        </Router>
      </BrowserRouter>
  </>
  );
}

export default App;
