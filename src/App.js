import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home'
import ContentApp from './components/ContentApp';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
function App() {
  const {user}=useContext(AppContext);
  return (
    <div className=' overflow-hidden'>

      {/* if user authticate then don't show login page */}

      <Routes>
        <Route path='/' element={user!=null?<ContentApp/>:<Home/>}/>       
      </Routes>
    </div>
  );
}

export default App;
