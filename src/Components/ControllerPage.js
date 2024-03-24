import { useEffect, useState } from 'react';
import axios from 'axios';

import SideBar from './ChildComponents/Sidebar';
import NewController from './ChildComponents/NewController';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateRouter, removeRouter } from '../services/reducer';


const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const ControllerContent = () => {

  const dispactch = useDispatch()

  // schema data
  const [SchemaData, setSchemaData] = useState([]);

  const [routesData, setroutesData] = useState([]);
  const [showNewControllerPopUp, setShowNewControllerPopUp] = useState(0);
  const [showNewControllerCards, setShowNewControllerCards] = useState(0);
  const [showNewControllerButton, setShowNewControllerButton] = useState(0);

  // new controller pop up data
  const [route, setRoute] = useState('/');
  const [requests, setrequests] = useState([]);
  const [methods, setMethods] = useState([]);
  const [models, setmodels] = useState([]);
  const [queryParams, setQueryParams] = useState([])

  const [showDownloadAnim, setShowDownloadAnim] = useState(0);
  const [timeCounter, setTimeCounter] = useState(3);

  //
  const [editButtonActive, setEditButtonActive] = useState(0)
  const [editIndex, setEditIndex] = useState(0);

  const [currId, setCurrId] = useState("")


  // Redux
  const todos = useSelector(state => state.todos)
  const routes = useSelector(state => state.Routes)




  useEffect(() => {
  }, [])



  const giveMeCode = () => {
    console.log(todos)
    console.log(routes)
    // setShowDownloadAnim(1)

    // axios.post(Base_Url + 'create_code')
    //   .then((res) => {
    //     console.log(res.data.zipFileUrl)
    //     window.open(res.data.zipFileUrl, '_blank')
    //   })
    // setTimeout(() => { setTimeCounter(2) }, 1000)
    // setTimeout(() => { setTimeCounter(1) }, 2000)
    // setTimeout(() => { setShowDownloadAnim(0) }, 3000)
    // setTimeCounter(3)

  }


  const addNewControllerinExistingRouter = (route) => {
    setCurrId(route.id)
    setEditIndex(-1)
    setShowNewControllerPopUp(1);
    setRoute(route.data.route)
    setrequests(route.data.requests)
    setmodels(route.data.models)
    setMethods(route.data.methods)
    setQueryParams(route.data.queryParams)
  }

  const editController = (route, controllersData) => {
    setCurrId(route.id)
    setEditButtonActive(1)
    setShowNewControllerPopUp(1);
    setRoute(route.data.route)
    setrequests(route.data.requests)
    setmodels(route.data.models)
    setMethods(route.data.methods)
    setQueryParams(route.data.queryParams)
    setEditIndex(route.data.requests.indexOf(controllersData))
  }

  const deleteRouter = (router_id) => {
    dispactch(removeRouter(router_id))

    // axios.post(Base_Url + 'delete_router', { router })
    //   .then()
    //   .catch((err) => console.log(err))
  }

  const deleteController = (route, controller) => {

    setCurrId(route.id)

    let ind = route.data.requests.indexOf(controller)
    let temp_models = route.data.models.slice(0, ind).concat(route.data.models.slice(ind + 1));
    let temp_requests = route.data.requests.slice(0, ind).concat(route.data.requests.slice(ind + 1));
    let temp_methods = route.data.methods.slice(0, ind).concat(route.data.methods.slice(ind + 1));
    let temp_queryParams = route.data.queryParams.slice(0, ind).concat(route.data.queryParams.slice(ind + 1));


    const newController = {
      "route": route.data.route,
      "requests": temp_requests,
      "models": temp_models,
      "queryParams": temp_queryParams,
      "methods": temp_methods
    }
    dispactch(updateRouter({ id: currId, data: newController }))
    setRoute("/")
    setmodels([])
    setrequests([])
    setMethods([])
    setQueryParams([])

    // axios.post(Base_Url + 'create_router', newController)
    //   .then(() => {
    //     setRoute("/")
    //     setmodels([])
    //     setrequests([])
    //     setMethods([])
    //     setQueryParams([])
    //   })
    //   .catch((err) => console.log(err));

  }

  const preventDelete = (e) => {
    const input = document.querySelector('.myInput');
    if (input.value === '/' && e.keyCode === 8) {
      e.preventDefault();
    }
  }

  const updateShowNewControllerPopUp = (data) => {
    setShowNewControllerPopUp(data)
  }

  const updateEditButtonActive = (data) => {
    setEditButtonActive(data)
  }

  const updateNewControllerCard = (data) => {
    setShowNewControllerCards(data)
  }

  const updateRoute = (data) => {
    setRoute(data)
  }

  const updateModels = (data) => {
    setmodels(data)
  }

  const updateRequests = (data) => {
    setrequests(data)
  }

  const updateMethods = (data) => {
    setMethods(data)
  }

  const updateQueryParams = (data) => {
    setQueryParams(data)
  }

  return (
    <div className="Container">
      <SideBar />
      <div className='mainContainer'>
        <div className='controllerContainer'>

          {showNewControllerPopUp == 1 &&
            <NewController SchemaData={todos} editButtonActive={editButtonActive} updateShowNewControllerPopUp={updateShowNewControllerPopUp}
              updateEditButtonActive={updateEditButtonActive} models={models} requests={requests} methods={methods} queryParams={queryParams}
              route={route} updateNewControllerCard={updateNewControllerCard} editIndex={editIndex} updateRoute={updateRoute} currId={currId}
              updateModels={updateModels} updateRequests={updateRequests} updateMethods={updateMethods} updateQueryParams={updateQueryParams}
            />
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
            {routes.map((route) => (
              <div className='controllerInfoContainer'>
                <div className='controllerInputContainer'>
                  <input value={route.data.route} placeholder='here' style={{ width: "90%" }} />
                  <button onClick={() => { deleteRouter(route.id) }} className='addRouterButton'>Delete</button>
                </div>
                <div className='controllerMethodsContainer'>
                  {route.data.requests.map((controller) => (
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
                  <button onClick={() => { setShowNewControllerCards(1); setShowNewControllerButton(1); setCurrId("") }} className='addRouterButton'>Add</button>
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
                        <button className='addControllerButton' onClick={() => { setShowNewControllerPopUp(1); setShowNewControllerButton(0); setEditIndex(-1) }}>Add</button>
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