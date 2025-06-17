
import { BrowserRouter, Route, Routes } from 'react-router'
import Body from './components/Body'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'

function App() {

  return (
    <>
      <div>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
