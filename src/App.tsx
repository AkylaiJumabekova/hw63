import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar';
import Home from './containers/Home/Home';
import AddPost from './containers/AddPost/AddPost';
import EditPost from './containers/EditPost/EditPost';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';

const App: React.FC = () => {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-post" element={<AddPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
