import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import HomePageContect from './Components/HomePage'
import SchamaContent from './Components/SchemaPage'
import ControllerContent from './Components/ControllerPage'

const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

function App() {

  return (
    <Router>
        <Routes >
          <Route path="/" element={<HomePageContect />} />
          <Route path="/schema" element={<SchamaContent />} />
          <Route path="/controller" element={<ControllerContent />} />
        </Routes>
    </Router>
  );
}





export default App;
