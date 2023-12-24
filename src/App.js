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
  const [showNewControllerCards, setShowNewControllerCards] = useState(0);

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

  const addNewControllerinExistingRouter = (route) => {
    console.log(route)
  }

  const giveMeCode = () => {
    axios.post('http://localhost:5000/create_code')
  }

  const addNewController = () => {
    models.push(model)
    methods.push(method)
    console.log(route)
    console.log(methods)
    console.log(models)

    const newController = {
      "route": route,
      "methods": methods,
      "models": models
    }

    axios.post('http://localhost:5000/create_router', newController)
      .then((res) => setShowNewControllerPopUp(0))
      .catch((err) => console.log(err))
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
            </div>
            <div className='controllerMethodsContainer'>
              {routesData[0][1].map((controller) => (
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
                    <button onClick={()=> addNewControllerinExistingRouter(route)} className='addSchemaButton'>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className='controllerInfoContainer'>
          <div className='controllerInputContainer'>
            <input onChange={(e) => setRoute(e.target.value)} placeholder='here' style={{ width: "90%" }} />
            <button onClick={() => { setShowNewControllerCards(1); }} className='addRouterButton'>Add</button>
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
                    <button className='addControllerButton' onClick={() => setShowNewControllerPopUp(1)}>Add</button>
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
