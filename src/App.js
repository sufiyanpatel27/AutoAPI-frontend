import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

const SchamaContent = () => {

  const [schemaData, setSchemaData] = useState([]);
  const [showNewSchemaPopUp, setShowNewSchemaPopUp] = useState(0);

  // new schema pop up data
  const [newSchemaName, setNewSchemaName] = useState("");
  const [newTableName1, setnewTableName1] = useState("");
  const [newDataType1, setnewDataType1] = useState("");
  const [newTableName2, setnewTableName2] = useState("");
  const [newDataType2, setnewDataType2] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/schemas")
      .then((res) => setSchemaData(res.data))
  }, [schemaData])

  const addNewSchema = () => {
    const newSchema =
    {
      "schemaName": newSchemaName,
      "schema": {
        [newTableName1]: {
          "type": newDataType1,
          "required": true
        },
        [newTableName2]: {
          "type": newDataType2,
          "required": true
        }
      }
    }
    axios.post('http://localhost:5000/create_schema', newSchema)
      .then((res) => setShowNewSchemaPopUp(0))
      .catch((err) => console.log(err))
  }

  const deleteSchema = (schema) => {
    axios.post('http://localhost:5000/delete_schema', { schema })
      .then()
      .catch((err) => console.log(err))
  }

  return (
    <div className='schemaContainer'>
      {showNewSchemaPopUp == 1 &&
        <div className='new-schema-container'>
          <div className='new-schema-card'>
            <div>
              <p>Schema Nme</p>
              <input onChange={(e) => setNewSchemaName(e.target.value)} />
            </div>
            <div className='new-schema-table'>
              <div>
                <p>Table Nme</p>
                <input onChange={(e) => setnewTableName1(e.target.value)} />
              </div>
              <div>
                <p>Data Type</p>
                <input onChange={(e) => setnewDataType1(e.target.value)} />
              </div>
            </div>
            <div className='new-schema-table'>
              <div>
                <p>Table Nme</p>
                <input onChange={(e) => setnewTableName2(e.target.value)} />
              </div>
              <div>
                <p>Data Type</p>
                <input onChange={(e) => setnewDataType2(e.target.value)} />
              </div>
            </div>
            <div className='new-schema-button'>
              <button onClick={() => setShowNewSchemaPopUp(0)} className='addSchemaButton'>Cancel</button>
              <button onClick={() => addNewSchema()} className='addSchemaButton'>Add</button>
            </div>
          </div>
        </div>
      }
      <div className='header'>
        <h1>Schema</h1>
      </div>
      <div className='schemaCardsContainer'>
        <div>
          <button className='nextButton'>Next</button>
        </div>
        {schemaData.map((schema) => (
          <div className='card-container'>
            <div className='card'>
              <div className='card-content'>
                <h2>{schema}</h2>
              </div>
              <div className='card-content'>
                <p>Schema Description</p>
              </div>
              <div className='card-content'>
                <button className='addSchemaButton'>Edit</button>
                <p onClick={() => deleteSchema(schema)}>delete</p>
              </div>
            </div>
          </div>
        ))}
        <div className='card-container'>
          <div className='card'>
            <div className='card-content'>
              <h2>New Schema</h2>
            </div>
            <div className='card-content'>
              <button onClick={() => setShowNewSchemaPopUp(1)} className='addSchemaButton'>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
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
  const [route, setRoute] = useState('');
  const [methods, setmethods] = useState([]);
  const [models, setmodels] = useState([]);

  const [method, setmethod] = useState('');
  const [model, setmodel] = useState('');




  useEffect(() => {
    axios.get("http://localhost:5000/routers")
      .then((res) => {
        setroutesData(res.data)
      })
    axios.get("http://localhost:5000/schemas")
      .then((res) => setSchemaData(res.data))

  }, [routesData])

  const giveMeCode = () => {
    axios.post('http://localhost:5000/create_code')
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

    axios.post('http://localhost:5000/create_router', newController)
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

    axios.post('http://localhost:5000/create_router', newController)
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
    axios.post('http://localhost:5000/delete_router', { router })
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

    axios.post('http://localhost:5000/create_router', newController)
      .then(() => {
        setRoute("")
        setmethod("")
        setmodel("")
        setmodels([])
        setmethods([])
      })
      .catch((err) => console.log(err));

  }

  return (
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
              <button onClick={() => {addNewControllerExisting()}} className='addSchemaButton'>Add</button>
            </div>
          </div>
        </div>
      }
      <div className='header'>
        <h1>Controller</h1>
      </div>
      <div>
        <button onClick={() => giveMeCode()} className='nextButton'>Code</button>
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
                      <p>Schema Description</p>
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
                    <h2>New Schema</h2>
                  </div>
                  <div className='card-content'>
                    <button onClick={() => addNewControllerinExistingRouter(route)} className='addSchemaButton'>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='controllerInfoContainer'>
          <div className='controllerInputContainer'>
            <input value={route} onChange={(e) => setRoute(e.target.value)} placeholder='here' style={{ width: "90%" }} />
            {showNewControllerButton == 0 &&
              <button onClick={() => { setShowNewControllerCards(1); setShowNewControllerButton(1)}} className='addRouterButton'>Add</button>
            }
            {showNewControllerButton == 1 &&
              <button onClick={() => { setShowNewControllerCards(0); setShowNewControllerButton(0); setRoute("")}} className='addRouterButton'>Cancel</button>
            }
          </div>
          {showNewControllerCards == 1 &&
            <div className='controllerMethodsContainer'>
              <div className='controller-card-container'>
                <div className='controller-card'>
                  <div className='card-content'>
                    <h2>New Controller</h2>
                  </div>
                  <div className='card-content'>
                    <p>Controller Description</p>
                  </div>
                  <div className='card-content'>
                    <button className='addControllerButton' onClick={() => {setShowNewControllerPopUp(1); setShowNewControllerButton(0)}}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;
