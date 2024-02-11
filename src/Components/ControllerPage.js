
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';



const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const ControllerContent = () => {

  const [routesData, setroutesData] = useState([]);
  const [SchemaData, setSchemaData] = useState([]);
  const [showNewControllerPopUp, setShowNewControllerPopUp] = useState(0);
  const [showNewControllerPopUpExisting, setShowNewControllerPopUpExisting] = useState(0);
  const [showNewControllerCards, setShowNewControllerCards] = useState(0);
  const [showNewControllerButton, setShowNewControllerButton] = useState(0);

  const methodOptions = ['get', 'post', 'put', 'delete']
  // new controller pop up data
  const [route, setRoute] = useState('/');
  const [methods, setmethods] = useState([]);
  const [models, setmodels] = useState([]);

  const [method, setmethod] = useState('');
  const [model, setmodel] = useState('');

  const [showDownloadAnim, setShowDownloadAnim] = useState(0);
  const [timeCounter, setTimeCounter] = useState(3);




  useEffect(() => {
    axios.get(Base_Url + "routers")
      .then((res) => {
        setroutesData(res.data)
      })
    axios.get(Base_Url + "schemas")
      .then((res) => setSchemaData(res.data))

  }, [routesData])

  const giveMeCode = () => {
    setShowDownloadAnim(1)

    axios.post(Base_Url + 'create_code')
      .then((res) => {
        console.log(res.data.zipFileUrl)
        window.open(res.data.zipFileUrl, '_blank')
      })
    setTimeout(() => { setTimeCounter(2) }, 1000)
    setTimeout(() => { setTimeCounter(1) }, 2000)
    setTimeout(() => { setShowDownloadAnim(0) }, 3000)
    setTimeCounter(3)

  }



  const addNewControllerinExistingRouter = (route) => {
    setShowNewControllerPopUpExisting(1);
    setRoute(route[0])
    setmethods(route[1])
    setmodels(route[2])
  }


  const addNewControllerExisting = () => {
    models.push(model)
    methods.push(method)

    const newController = {
      "route": route,
      "methods": methods,
      "models": models
    }

    axios.post(Base_Url + 'create_router', newController)
      .then((res) => {
        setShowNewControllerPopUpExisting(0)
      })
      .catch((err) => console.log(err))
    setRoute("");
    setmethod("");
    setmodel("");
    setmethods([]);
    setmodels([]);

  }



  const addNewController = () => {
    models.push(model)
    methods.push(method)

    const newController = {
      "route": route,
      "methods": methods,
      "models": models
    }

    axios.post(Base_Url + 'create_router', newController)
      .then(() => {
        setShowNewControllerPopUp(0);
        setShowNewControllerCards(0);
        setRoute("")
        setmethod("")
        setmodel("")
        setmodels([])
        setmethods([])
      })
      .catch((err) => console.log(err));
  }

  const deleteRouter = (router) => {
    axios.post(Base_Url + 'delete_router', { router })
      .then()
      .catch((err) => console.log(err))
  }

  const deleteController = (route, controller) => {
    route[1].splice(route[1].indexOf(controller), 1)
    route[2].splice(route[1].indexOf(controller), 1)

    const newController = {
      "route": route[0],
      "methods": route[1],
      "models": route[2]
    }

    axios.post(Base_Url + 'create_router', newController)
      .then(() => {
        setRoute("")
        setmethod("")
        setmodel("")
        setmodels([])
        setmethods([])
      })
      .catch((err) => console.log(err));

  }

  const preventDelete = (e) => {
    const input = document.getElementById('myInput')
    if (input.value === '/' && e.keyCode === 8) {
      e.preventDefault();
    }
  }

  return (
    <div className="Container">
      <div className='sideBar'>
        <div className='backButtonContainer'>
          <a href='/schema' style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Back</a>
          <a href='/' style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Home</a>
        </div>
        <div className='sideBarContaint'>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20%', marginLeft: '5%', height: '8%', justifyContent: 'space-between' }}>
            <Link style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} to='/schema'>Schema</Link>
            <Link style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} to='/controller'>Controller</Link>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
        <div className='controllerContainer'>
          {showNewControllerPopUp == 1 &&
            <div className='new-schema-container'>
              <div className='new-schema-card'>
                <div>
                  <p>Schema Name</p>
                  <select onChange={(e) => setmodel(e.target.value)} id="dropdown" >
                    <option value="">Select Schema</option>
                    {SchemaData.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p>Method </p>
                  <select onChange={(e) => setmethod(e.target.value)} id="dropdown" >
                    <option value="">Select Method</option>
                    {methodOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='new-schema-button'>
                  <button onClick={() => setShowNewControllerPopUp(0)} className='addSchemaButton'>Cancel</button>
                  <button onClick={() => addNewController()} className='addSchemaButton'>Add</button>
                </div>
              </div>
            </div>
          }
          {showNewControllerPopUpExisting == 1 &&
            <div className='new-schema-container'>
              <div className='new-schema-card'>
                <div>
                  <p>Schema Name</p>
                  <select onChange={(e) => setmodel(e.target.value)} id="dropdown" >
                    <option value="">Select Schema</option>
                    {SchemaData.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <p>Method </p>
                  <select onChange={(e) => setmethod(e.target.value)} id="dropdown" >
                    <option value="">Select Method</option>
                    {methodOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='new-schema-button'>
                  <button onClick={() => {
                    setShowNewControllerPopUpExisting(0);
                    setRoute("");
                    setmethod("");
                    setmodel("");
                    setmethods([]);
                    setmodels([])
                  }} className='addSchemaButton'>Cancel</button>
                  <button onClick={() => { addNewControllerExisting() }} className='addSchemaButton'>Add</button>
                </div>
              </div>
            </div>
          }
          <div className='header'>
            <h1>Controller</h1>
          </div>
          <div>
            {showDownloadAnim == 0 &&
              <button onClick={() => giveMeCode()} className='nextButton'>Code</button>
            }
            {showDownloadAnim == 1 &&
              <button className='downloadingButton'>Downloading... {timeCounter}</button>
            }
          </div>
          <div className='controllerCardsContainer'>
            {routesData.map((route) => (
              <div className='controllerInfoContainer'>
                <div className='controllerInputContainer'>
                  <input value={route[0]} placeholder='here' style={{ width: "90%" }} />
                  <button onClick={() => { deleteRouter(route[0]) }} className='addRouterButton'>Delete</button>
                </div>
                <div className='controllerMethodsContainer'>
                  {route[1].map((controller) => (
                    <div className='controller-card-container'>
                      <div className='controller-card'>
                        <div className='card-content'>
                          <h2>{controller}</h2>
                        </div>
                        <div className='card-content'>
                          <p>Controller Description</p>
                        </div>
                        <div className='card-content'>
                          <button className='addControllerButton'>Edit</button>
                          <p onClick={() => deleteController(route, controller)}>delete</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className='controller-card-container'>
                    <div className='controller-card'>
                      <div className='card-content'>
                        <h2>Add New Controller</h2>
                        <p>Click the button to add a new controller</p>
                      </div>
                      <div className='card-content'>
                        <button onClick={() => addNewControllerinExistingRouter(route)} className='addSchemaButton'>Add Controller</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className='controllerInfoContainer'>
              <div className='controllerInputContainer'>
                <input value={route} id='myInput' onChange={(e) => setRoute(e.target.value)} onKeyDown={(e) => preventDelete(e)} style={{ width: "90%" }} />
                {showNewControllerButton == 0 &&
                  <button onClick={() => { setShowNewControllerCards(1); setShowNewControllerButton(1) }} className='addRouterButton'>Add</button>
                }
                {showNewControllerButton == 1 &&
                  <button onClick={() => { setShowNewControllerCards(0); setShowNewControllerButton(0); setRoute("") }} className='addRouterButton'>Cancel</button>
                }
              </div>
              {showNewControllerCards == 1 &&
                <div className='controllerMethodsContainer'>
                  <div className='controller-card-container'>
                    <div className='controller-card'>
                      <div className='card-content'>
                        <h2>Add New Controller</h2>
                        <p>Click the button to add a new controller</p>
                      </div>
                      <div className='card-content'>
                      </div>
                      <div className='card-content'>
                        <button className='addControllerButton' onClick={() => { setShowNewControllerPopUp(1); setShowNewControllerButton(0) }}>Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default ControllerContent;