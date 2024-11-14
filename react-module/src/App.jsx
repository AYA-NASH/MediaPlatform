// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Authentication/Login';
import CreatePost from './Pages/post-crud/CreatePost';
import EditPost from './Pages/post-crud/EditPost';
import Navbar from './components/navbar/Navbar';
import PostView from './Pages/post-crud/PostView';
import SignUp from './Pages/Authentication/Signup';
import Logout from './Pages/Authentication/Logout';

export const AppContext = createContext();

function App() {
  const savedAuth = JSON.parse(localStorage.getItem('auth')) || "";
  const [auth, setAuth] = useState(savedAuth);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);
  return (
    <div className="App">
      <AppContext.Provider value={{ auth }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login loginUser={setAuth} />} />
            <Route path="/logout" element={<Logout setAuth={setAuth} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="/home/post/:postId" element={<PostView />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  )
}

export default App;