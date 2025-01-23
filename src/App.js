import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';

function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
