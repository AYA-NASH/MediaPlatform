// import './App.css'
import { BrowserRouter as Router, Routes, Route, useActionData } from 'react-router-dom';
import { createContext, useState } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Authentication/Login';
import CreatePost from './Pages/post-crud/create-post/CreatePost';
import EditPost from './Pages/post-crud/EditPost';
import Navbar from './components/navbar/Navbar';
import PostView from './Pages/post-crud/PostView';
import SignUp from './Pages/Authentication/Signup';

export const AppContext = createContext();

function App() {
  const [auth, setAuth] = useState("");
  console.log("App Auth: ", auth)
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <AppContext.Provider value={{ auth }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login loginUser={setAuth} />} />
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