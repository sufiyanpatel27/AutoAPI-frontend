import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';


const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const HomePageContect = () => {

  const [backendservice, setBackendService] = useState('');

  useEffect(() => {
    axios.get(Base_Url + 'initialize')
      .then((res) => setBackendService(res.data))
      .then(() => console.log('resources loaded succesfully'))
  }, [])

  return (
    <div className="Container">
      {backendservice === '' &&
        <div style={{
          position: 'fixed', width: '100%', display: 'flex',
          justifyContent: 'center', height: '10%', alignItems: 'end',
        }}>
          <div style={{
            backgroundColor: 'rgba(158, 165, 170, 0.288)', borderRadius: '10',
            padding: 10, boxShadow: '10px 10px 10px rgb(180, 175, 175)', borderRadius: 15,
            animation: 'moveRight 2s linear infinite'
          }}>
            Please wait while Loading Resources ...
          </div>
        </div>
      }
      <div className='sideBar'>
        <div className='sideBarContaintHomePage'>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '30%', justifyContent: 'end', alignItems: 'center', fontSize: 80 }}>
            Auto API
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ textAlign: 'center' }}>A Tool that helps you generate the Node JS backend code</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: 20 }}>Todos</p>
            <div>
              <li>Upload an existing project</li>
              <li>Add the loading spinner</li>
              <li>Add home, back, other icons</li>
              <li>Add the schema description content</li>
              <li>Add the controller description content</li>
              <li>New route input box style change</li>
            </div>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
        <div style={{ display: 'flex', width: "100%", height: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/schema" >
            <div style={{ height: '200px', width: '350px', display: 'flex', flexDirection: 'column', boxShadow: '7px 7px 10px rgb(97, 95, 95)', borderRadius: '10px', padding: '10px' }}>
              <h2>New Project</h2>
              <p>Start a Fresh NODE JS Project.</p>
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