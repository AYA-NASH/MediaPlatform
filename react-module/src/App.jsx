import { BrowserRouter as Router, Routes, Route, useActionData } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Authentication/Login';
import CreatePost from './Pages/post-crud/CreatePost';
import EditPost from './Pages/post-crud/EditPost';
import Navbar from './components/navbar/Navbar';
import PostView from './Pages/post-crud/PostView';
import SignUp from './Pages/Authentication/Signup';
import Logout from './Pages/Authentication/Logout';
import Profile from './Pages/Uer/Profile';

import { fetchProfile } from './Pages/Uer/profile-actions';
export const AppContext = createContext();

function App() {
  const savedAuth = JSON.parse(localStorage.getItem('auth')) || "";
  const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};

  const [auth, setAuth] = useState(savedAuth);
  const [profile, setProfile] = useState(savedProfile);

  const getProfile = async (token) => {
    const result = await fetchProfile(token);
    if (result) {
      setProfile(result)
      localStorage.setItem('profile', JSON.stringify(result));
    }
  }

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));

    if (auth) {
      getProfile(auth.token);
    }
  }, [auth]);

  return (
    <div className="App">
      <AppContext.Provider value={{ auth, profile, setProfile }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login loginUser={setAuth} />} />
            <Route path="/logout" element={<Logout setAuth={setAuth} setProfile={setProfile} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="/home/post/:postId" element={<PostView />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="user-profile" element={<Profile profile={profile} setProfile={setProfile} />} />
          </Routes>
        </Router>
      </AppContext.Provider>

    </div>
  )
}

export default App;