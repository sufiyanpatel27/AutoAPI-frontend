import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const HomePageContect = () => {

  const start = () => {
    axios.get(Base_Url + 'start')
  }

  return (
    <div className="Container">
      <div className='sideBar'>
        <div className='sideBarContaintHomePage'>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '30%', justifyContent: 'end', alignItems: 'center', fontSize: 80}}>
            Auto API
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{ textAlign: 'center'}}>A Tool that helps you generate the Node JS backend code</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center'}}>
            <p style={{ fontSize: 20}}>Todos</p>
            <div>
            <li>first one to be done</li>
            <li>second one to be done</li>
            <li>third one to be done</li>
            <li>fourth one to be done</li>
            <li>fifth one to be done</li>
            <li>sixth one to be done</li>
            </div>
          </div>  
        </div>
      </div>
      <div className='mainContainer'>
        <div style={{ display: 'flex', width: "100%", height: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Link to="/schema" onClick={() => start()} >
            <div style={{ height: '200px', width: '350px', display: 'flex', boxShadow: '7px 7px 10px rgb(97, 95, 95)', borderRadius: '10px', padding: '10px' }}>
              <h2>New Project</h2>
            </div>
          </Link>
          <div style={{ height: '200px', width: '350px', display: 'flex', flexDirection: 'column', boxShadow: '7px 7px 10px rgb(97, 95, 95)', borderRadius: '10px', padding: '10px', cursor: 'no-drop' }}>
            <h2>Existing Project</h2>
            <p>upload the Folder that contains the Node JS backend code.</p>
            <p>coming soon ...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageContect;