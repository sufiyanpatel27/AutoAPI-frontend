import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  const [mainWindow, setMainWindow] = useState("schamaContent");

  return (
    <div className="Container">
      <div className='sideBar'>
        <div className='backButtonContainer'>
          back
        </div>
        <div className='sideBarContaint'>
          <div>
            <p style={{ cursor: 'pointer' }} onClick={() => setMainWindow("schamaContent")}>Schema</p>
            <p style={{ cursor: 'pointer' }} onClick={() => setMainWindow("controllerContent")}>Controller</p>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
        {mainWindow == "schamaContent" &&
          <SchamaContent />
        }
        {mainWindow == "controllerContent" &&
          <ControllerContent />
        }
      </div>
    </div>
  );
}





export default App;
