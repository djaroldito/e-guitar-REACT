
import { Route, Routes } from 'react-router-dom';
import Example from './routes/home';
import NavBar from './routes/navbar';
// import Home from './routes/home';

function App() {
  return (
   <>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Example/>}/>
   </Routes>
   </>
  );
}

export default App;
