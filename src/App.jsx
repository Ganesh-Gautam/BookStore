import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import Favorites from './pages/Favorites';
import './App.css'

function App() { 

  return (
    <Routes>
      <Route path ="/" element={<Home/>}/>
      <Route path='/book/:id' element={<BookDetail/>}/>
      <Route path="/favorites" element={<Favorites/>}/> 
    </Routes>
  )
}

export default App
