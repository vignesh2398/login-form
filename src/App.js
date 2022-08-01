
import { Routes,Route} from 'react-router-dom';
import './App.css';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import NAvbar from './Components/NAvbar';
import { Register } from './Components/Register';
export const url = "https://loginform124.herokuapp.com"
function App() {
  return (
    <div className="App">
      <NAvbar/>
    
    <Routes>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
  </Routes>



    </div>
  );
}

export default App;
