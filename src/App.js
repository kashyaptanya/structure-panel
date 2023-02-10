import './App.css';
import { Provider } from "react-redux"
import store from "./store"
import { HashRouter as Router, BrowserRouter } from 'react-router-dom';
import React, { lazy, Suspense } from 'react'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const AppRouter = lazy(() => import('./routes'))
let persistor = persistStore(store)



function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Router>
            <Suspense fallback={
              <>
                <div className='text-center mt-3 text-primary display-6 '  >Loading Please Wait....</div>
                {/* <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/b6e0b072897469.5bf6e79950d23.gif" /> */}
              </>


            }>
              <AppRouter />
            </Suspense>
          </Router>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
// import './App.css';
// import React, { lazy, Suspense } from 'react'
// import { HashRouter as Router, BrowserRouter } from 'react-router-dom';
// import { Provider } from "react-redux"
// import store from "./store"
// const AppRouter = lazy(() => import('./routes'))

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Router>
//           <Suspense fallback={<div className={'text-center mt-3'}>Loading Please Wait....</div>}>
//             <AppRouter />
//           </Suspense>
//         </Router>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;