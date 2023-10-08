
import './App.css';
import Navbar from './components/Navbar';
import Sidenavbar from './components/Sidenavbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Browse from './pages/Browse';
import Communication from './pages/Communication';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Sidenavbar/>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/browse' element={<Browse/>} />
          <Route path='/browse' element={<Communication/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
