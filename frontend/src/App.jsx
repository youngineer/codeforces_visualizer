
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
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App


// { field: 'name', headerName: 'Name', width: 180, editable: true },
//     { field: 'handle', headerName: 'CF Handle', width: 120, editable: true },
//     { field: 'currentRating', headerName: 'Current Rating', width: 120, editable: true },
//     { field: 'maxRating', headerName: 'Max Rating', width: 120, editable: true },
//     { field: 'emailId', headerName: 'E-mail', width: 180, editable: true },
//     { field: 'phoneNumber', headerName: 'Contact Number', width: 160, editable: true },
//     { field: 'updatedAt', headerName: 'Updated At', width: 120, editable: true },
    