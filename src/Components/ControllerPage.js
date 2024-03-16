
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import SideBar from './ChildComponents/Sidebar';



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
  const [showNewControllerCards, setShowNewControllerCards] = useState(0);
  const [showNewControllerButton, setShowNewControllerButton] = useState(0);

  const requestOptions = ['get', 'post', 'put', 'delete'];
  const getRequestOptions = ['find()', 'findById()', 'findOne()'];
  const postRequestOptions = ['save()'];
  const putRequestOptions = ['findByIdAndUpdate()'];
  const deleteRequestOptions = ['findByIdAndDelete()', 'findOneAndDelete()'];

  // new controller pop up data
  const [route, setRoute] = useState('/');
  const [requests, setrequests] = useState([]);
  const [methods, setMethods] = useState([]);
  const [models, setmodels] = useState([]);
  const [queryParams, setQueryParams] = useState([])

  const [request, setrequest] = useState('');
  const [method, setMethod] = useState('');
  const [model, setmodel] = useState('');
  const [queryParam, setQueryParam] = useState('')

  const [showDownloadAnim, setShowDownloadAnim] = useState(0);
  const [timeCounter, setTimeCounter] = useState(3);



  //
  const [editButtonActive, setEditButtonActive] = useState(0)
  const [editIndex, setEditIndex] = useState(0);




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
    setShowNewControllerPopUp(1);
    setRoute(route[0])
    setrequests(route[1])
    setmodels(route[2])
  }

  const editController = (route, controllersData) => {
    setEditButtonActive(1)
    setShowNewControllerPopUp(1);
    setRoute(route[0])
    setrequests(route[1])
    setmodels(route[2])
    setMethods(route[3])
    setQueryParams(route[4])
    setEditIndex(route[1].indexOf(controllersData))
    setmodel(route[2][editIndex])
    setrequest(route[1][editIndex])
    setMethod(route[3][editIndex])
    setQueryParam(route[4][editIndex])

  }

  const editAndUpdateController = (routesData, editIndex) => {
    console.log(routesData[0])
    console.log(routesData[0][1][editIndex])

    // new controller object here
    models[editIndex] = model
    requests[editIndex] = request
    methods[editIndex] = method
    queryParams[editIndex] = queryParam
    const newController = {
      "route": route,
      "requests": requests,
      "methods": methods,
      "quryparams": queryParams,
      "models": models
    }

    console.log(newController)

    axios.post(Base_Url + 'create_router', newController)
      .then(() => {
        setShowNewControllerPopUp(0);
        setEditButtonActive(0)
        setShowNewControllerCards(0);
        setRoute("/")
        setrequest("")
        setmodel("")
        setMethod("")
        setQueryParam("")
        setmodels([])
        setrequests([])
        setMethods([])
        setQueryParams([])
      })
      .catch((err) => console.log(err));
  }



  const addNewController = () => {
    models.push(model)
    requests.push(request)
    methods.push(method)
    queryParams.push(queryParam)

    const newController = {
      "route": route,
      "requests": requests,
      "methods": methods,
      "quryparams": queryParams,
      "models": models
    }

    axios.post(Base_Url + 'create_router', newController)
      .then(() => {
        setShowNewControllerPopUp(0);
        setShowNewControllerCards(0);
        setRoute("/")
        setrequest("")
        setmodel("")
        setMethod("")
        setQueryParam("")
        setmodels([])
        setrequests([])
        setMethods([])
        setQueryParams([])
      })
      .catch((err) => console.log(err));
  }

  const cancel = () => {
    setShowNewControllerPopUp(0)
    setEditButtonActive(0)
    setRoute("/")
    setrequest("")
    setmodel("")
    setMethod("")
    setQueryParam("")
    setmodels([])
    setrequests([])
    setMethods([])
    setQueryParams([])
  }

  const deleteRouter = (router) => {
    axios.post(Base_Url + 'delete_router', { router })
      .then()
      .catch((err) => console.log(err))
  }

  const deleteController = (route, controller) => {
    console.log(route)
    console.log(controller)
    route[1].splice(route[1].indexOf(controller), 1)
    route[2].splice(route[1].indexOf(controller), 1)
    route[3].splice(route[1].indexOf(controller), 1)
    route[4].splice(route[1].indexOf(controller), 1)


    const newController = {
      "route": route[0],
      "requests": route[1],
      "models": route[2],
      "quryparams": route[4],
      "methods": route[3]
    }

    console.log(newController)

    axios.post(Base_Url + 'create_router', newController)
      .then(() => {
        setRoute("/")
        setrequest("")
        setmodel("")
        setMethod("")
        setQueryParam("")
        setmodels([])
        setrequests([])
        setMethods([])
        setQueryParams([])
      })
      .catch((err) => console.log(err));

  }

  const preventDelete = (e) => {
    const input = document.querySelector('.myInput');
    if (input.value === '/' && e.keyCode === 8) {
      e.preventDefault();
    }
  }

  return (
    <div className="Container">
      <SideBar />
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
                      <option key={index} value={option[0]}>
                        {option[0]}
                      </option>
                    ))}
                  </select>
                  <p>Request </p>
                  <select onChange={(e) => setrequest(e.target.value)} id="dropdown" >
                    <option value="">Select request</option>
                    {requestOptions.map((option, index) => (
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
          {showNewControllerPopUp == 1 &&
            <div className='new-schema-container'>
              <div className='new-schema-card'>
                <div>
                  <p>Schema Name</p>
                  <select value={model} onChange={(e) => setmodel(e.target.value)} id="dropdown" >
                    <option value="">Select Schema</option>
                    {SchemaData.map((option, index) => (
                      <option key={index} value={option[0]}>
                        {option[0]}
                      </option>
                    ))}
                  </select>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>
                    <div>
                      <p>Request </p>
                      <select value={request} onChange={(e) => setrequest(e.target.value)} id="dropdown" >
                        <option value="">Select request</option>
                        {requestOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* from here */}
                    {request === "get" &&
                      <div>
                        <p>Method </p>
                        <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" >
                          <option value="">Select method</option>
                          {getRequestOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    }
                    {request === "post" &&
                      <div>
                        <p>Method </p>
                        <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" >
                          <option value="">Select method</option>
                          {postRequestOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    }
                    {request === "put" &&
                      <div>
                        <p>Method </p>
                        <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" >
                          <option value="">Select method</option>
                          {putRequestOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    }
                    {request === "delete" &&
                      <div>
                        <p>Method </p>
                        <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" >
                          <option value="">Select method</option>
                          {deleteRequestOptions.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    }
                    {(method === "findOne()" || method === "findOneAndDelete()") && (
                      <div>
                        <p>Query Param</p>
                        <input value={queryParam} placeholder='enter the variable name' onChange={(e) => setQueryParam(e.target.value)} />
                      </div>
                    )}
                  </div>
                  {/* upto here */}
                </div>
                {editButtonActive == 0 &&
                  <div className='new-schema-button'>

                    <button onClick={() => cancel()} className='addSchemaButton'>Cancel</button>
                    <button onClick={() => addNewController()} className='addSchemaButton'>Add</button>
                  </div>
                }
                {editButtonActive == 1 &&
                  <div className='new-schema-button'>

                    <button onClick={() => cancel()} className='addSchemaButton'>Cancel</button>
                    <button onClick={() => editAndUpdateController(routesData, editIndex)} className='addSchemaButton'>Update</button>
                  </div>
                }
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
                          <button className='addControllerButton' onClick={() => editController(route, controller)}>Edit</button>
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
                <input value={route} className='myInput' onChange={(e) => setRoute(e.target.value)} onKeyDown={(e) => preventDelete(e)} style={{ width: "90%" }} />
                {showNewControllerButton == 0 &&
                  <button onClick={() => { setShowNewControllerCards(1); setShowNewControllerButton(1) }} className='addRouterButton'>Add</button>
                }
                {showNewControllerButton == 1 &&
                  <button onClick={() => { setShowNewControllerCards(0); setShowNewControllerButton(0); setRoute("/") }} className='addRouterButton'>Cancel</button>
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