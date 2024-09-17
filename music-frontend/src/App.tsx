import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppToolbar from './UI/AppToolbar/AppToolbar'
import { Route, Routes } from 'react-router-dom'
import Artists from './features/Artists/Artists'
import Albums from './features/Albums/Albums'
import Tracks from './features/Tracks/Tracks'
import Register from './features/User/Register'
import Login from './features/User/Login'
import TrackHistory from './features/TrackHistory/TrackHistory'

const App = ()=> {

  return (
    <>
      <header className='bg-dark'>
        <AppToolbar></AppToolbar>
      </header>
      <div className="container">
        <Routes>
          <Route path='/' element={
            <> 
              <Artists/>
            </>
          }/>
          <Route path='/artists/:id' element={
            <> 
              <Albums/>
            </>
          }/>
          <Route path='/albums/:id' element={
            <> 
              <Tracks/>
            </>
          }/>
          <Route path='/register' element={
            <Register/>
          }/>
          <Route path='/login' element={
            <Login/>
          }/>
          <Route path='/track-history' element={
            <TrackHistory/>  
          }/>
          <Route path="*" element={<h1 className='text-center'>Not found</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App
