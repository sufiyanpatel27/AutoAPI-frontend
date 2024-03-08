
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import SideBar from './ChildComponents/Sidebar';
import NewSchema from './ChildComponents/NewSchema'



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

  useEffect(() => {
    axios.get(Base_Url + "schemas")
      .then((res) => setSchemaData(res.data))
  }, [schemaData])

  const openNewSchemaPopUp = () => {
    setShowNewSchemaPopUp(1)
  }

  const closeNewSchemaPopUp = () => {
    setShowNewSchemaPopUp(0)
  }

  const deleteSchema = (schema) => {
    axios.post(Base_Url + 'delete_schema', { schema })
      .then()
      .catch((err) => console.log(err))
  }

  return (
    <div className="Container">
      <SideBar />
      <div className='mainContainer'>
        <div className='schemaContainer'>
          {showNewSchemaPopUp == 1 &&
            <NewSchema openPopUp={openNewSchemaPopUp} closePopUp={closeNewSchemaPopUp} />
          }
          <div className='header'>
            <h1>Schema</h1>
          </div>
          <div className='schemaCardsContainer'>
            <div>
              <Link style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }} to='/controller'>
                <button className='nextButton'>
                  Next
                </button>
              </Link>
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
                    <p style={{ cursor: 'pointer' }} onClick={() => deleteSchema(schema)}>delete</p>
                  </div>
                </div>
              </div>
            ))}
            <div className='card-container'>
              <div className='card'>
                <div className='card-content'>
                  <h2>Add New Schema</h2>
                  <p>Click the button to add a new schema</p>
                </div>
                <div className='card-content'>
                  <button onClick={() => openNewSchemaPopUp(1)} className='addSchemaButton'>Add Schema</button>
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