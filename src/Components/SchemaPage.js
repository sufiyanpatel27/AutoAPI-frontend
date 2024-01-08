
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

const SchamaContent = () => {

  const [schemaData, setSchemaData] = useState([]);
  const [showNewSchemaPopUp, setShowNewSchemaPopUp] = useState(0);
  const [started, setStarted] = useState(0);

  // new schema pop up data
  const [newSchemaName, setNewSchemaName] = useState("");
  const [newTableName1, setnewTableName1] = useState("");
  const [newDataType1, setnewDataType1] = useState("");
  const [newTableName2, setnewTableName2] = useState("");
  const [newDataType2, setnewDataType2] = useState("");

  const start = () => {
    axios.get(Base_Url + 'start')
    setStarted(1)
  }
  if (started == 0) {
    start()
  }
  //start()
  //

  useEffect(() => {
    axios.get(Base_Url + "schemas")
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
    axios.post(Base_Url + 'create_schema', newSchema)
      .then((res) => setShowNewSchemaPopUp(0))
      .catch((err) => console.log(err))
  }

  const deleteSchema = (schema) => {
    axios.post(Base_Url + 'delete_schema', { schema })
      .then()
      .catch((err) => console.log(err))
  }

  return (
    <div className="Container">
      <div className='sideBar'>
        <div className='backButtonContainer'>
          back
        </div>
        <div className='sideBarContaint'>
          <div style={{display: 'flex', flexDirection:'column'}}>
            <a href='/schema' style={{ cursor: 'pointer' }}>Schema</a>
            <a href='/controller' style={{ cursor: 'pointer' }}>Controller</a>
          </div>
        </div>
      </div>
      <div className='mainContainer'>
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
      </div>
    </div>
  )
}

export default SchamaContent;