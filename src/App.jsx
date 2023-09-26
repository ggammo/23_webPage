import React from 'react';
import TestPage from './components/Navigation';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Mypage from './components/Mypage';
import Upload from './components/Upload'
import Search from './components/Search';
import Result from './components/Result';

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css';
import SearchAll from './components/SearchAll';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<TestPage />} />
        <Route path="/" element={<TestPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/search" element={<Search />} />
        <Route path="/item/:itemId" element={<Result />} />
        <Route path="item/all" element={<SearchAll />}/>
      </Routes>
    </div>

  );
}
export default App;
