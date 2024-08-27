import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { updateBackendService } from "../services/reducer";


const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const HomePageContect = () => {

  const dispactch = useDispatch();

  const [backendservice, setBackendService] = useState('');

  useEffect(() => {
    axios.get(Base_Url + 'initialize')
      .then((res) => {setBackendService(res.data); dispactch(updateBackendService("1"))})
      .then(() => console.log('resources loaded succesfully'))
  }, [])

  return (
    <div className="Container">
      {/* {backendservice === '' &&
        <div style={{
          position: 'fixed', width: '100%', display: 'flex',
          justifyContent: 'center', height: '10%', alignItems: 'end',
        }}>
          <div style={{
            backgroundColor: 'rgba(158, 165, 170, 0.288)', borderRadius: '10',
            padding: 10, boxShadow: '10px 10px 10px rgb(180, 175, 175)', borderRadius: 15,
            animation: 'moveRight 2s linear infinite'
          }}>
            Loading Resources... You may continue
          </div>
        </div>
      } */}
      <div className='sideBar'>
        <div className='sideBarContaintHomePage'>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '30%', justifyContent: 'end', alignItems: 'center', fontSize: 80 }}>
            Auto API
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ textAlign: 'center' }}>Create robust Node.js APIs in a flash with our innovative Code Generator.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '90%', height: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: 20 }}>Todos</p>
            <div>
              <li>Upload an existing project</li>
              <li>Integrate Generative AI (GPT 4.0 / Mistral AI)</li>
              <li>Icons update</li>
              <li>Add the schema and controller description content</li>
              <li>New route/controller input dialogue UI update</li>
            </div>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
        <div style={{ display: 'flex', width: "100%", height: '100%', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/schema" >
            <div style={{ height: '200px', width: '350px', display: 'flex', flexDirection: 'column', boxShadow: '7px 7px 10px rgb(97, 95, 95)', borderRadius: '10px', padding: '10px' }}>
              <h2>New Project</h2>
              <p>Start a Fresh Node JS Project.</p>
            </div>
          </Link>
          <div style={{ height: '200px', width: '350px', display: 'flex', flexDirection: 'column', boxShadow: '7px 7px 10px rgb(97, 95, 95)', borderRadius: '10px', padding: '10px', cursor: 'no-drop' }}>
            <h2>Existing Project</h2>
            <p>Upload an existing Node JS project.</p>
            <p>coming soon ...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePageContect;