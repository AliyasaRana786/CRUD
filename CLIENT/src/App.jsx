import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TotalEmp from './pages/TotalEmp';
import Add from './pages/Add';
import Update from './pages/Update';
function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/empl' element={<TotalEmp />} />
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
