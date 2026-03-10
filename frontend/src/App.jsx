
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import Home from './Home';
import MyProfile from './MyProfile';
import IndividualProfiles from './IndividualProfiles';
import SearchedPost from './SearchedPost';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/IndividualProfiles/:userId" element={<IndividualProfiles />} />
            <Route path="/SearchedPost" element={<SearchedPost />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
