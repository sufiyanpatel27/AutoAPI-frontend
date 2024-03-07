
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

  // new schema pop up data
  const [newSchemaName, setNewSchemaName] = useState("");
  const [newTableName, setnewTableName] = useState("");
  const [newDataType, setnewDataType] = useState("");

  const [todos, setTodos] = useState([]);
  const [todosprop, setTodosProp] = useState([]);
  const [todosprop2, setTodosProp2] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputisRequired, setInputIsRequired] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);




  useEffect(() => {
    axios.get(Base_Url + "schemas")
      .then((res) => setSchemaData(res.data))
  }, [schemaData])


  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleType = (event) => {
    setInputType(event.target.value);
  };

  const handleIsRequired = (event) => {
      setInputIsRequired(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '' && inputType.trim() !== '') {
      if (editingIndex !== null) {
        // Update todo
        const newTodos = [...todos];
        newTodos[editingIndex] = inputValue;
        setTodos(newTodos);
        // Update props
        const newTodosProps = [...todosprop];
        newTodosProps[editingIndex] = inputType;
        setTodosProp(newTodosProps);
        // Update is required
        const newTodosProps2 = [...todosprop2];
        newTodosProps2[editingIndex] = inputisRequired;
        setTodosProp2(newTodosProps2);

        setEditingIndex(null);
      } else {
        // Add new todo
        setTodos([...todos, inputValue]);
        setTodosProp([...todosprop, inputType]);
        setTodosProp2([...todosprop2, inputisRequired]);
      }
      setInputValue('');
      setInputType('');
      setInputIsRequired('');
    }
  };

  const handleEdit = (index) => {
    setInputValue(todos[index]);
    setInputType(todosprop[index]);
    setInputIsRequired(todosprop2[index])
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((todo, i) => i !== index);
    const newTodosProps = todosprop.filter((todoprop, i) => i !== index);
    const newTodosProps2 = todosprop2.filter((todoprop2, i) => i !== index);
    setTodos(newTodos);
    setTodosProp(newTodosProps);
    setTodosProp2(newTodosProps2)
    if (editingIndex === index) {
      setEditingIndex(null);
      setInputValue('');
      setInputType('');
      setInputIsRequired('')
    }
  };


  const addNewSchema = () => {

    let schema = {}
    todos.map((item, index) => {
      schema[item] = {
        "type": todosprop[index],
        "required": todosprop2[index]
      }
    })

    const newSchema = {
      "schemaName": newSchemaName,
      "schema": schema
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
          <a href='/' style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}>Back</a>
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
        <div className='schemaContainer'>
          {showNewSchemaPopUp == 1 &&
            <div className='new-schema-container'>
              <div className='new-schema-card'>
                <div>
                  <h2>Schema Nme</h2>
                  <input onChange={(e) => setNewSchemaName(e.target.value)} />
                </div>
                <div className='newSchema'>
                  <div>
                    <div style={{display: 'flex', justifyContent: 'space-between', }}>
                      <div style={{ width: '25%'}}><p>Column Name</p></div>
                      <div style={{ width: '25%'}}><p>Data Type</p></div>
                      <div style={{ width: '25%'}}><p>Is Required</p></div>
                      <div style={{ width: '25%'}}><p>Actions</p></div>
                    </div>
                    {todos.map((todo, index) => (
                      <div key={index} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div style={{width: '25%'}}>{todo}</div>
                        <div style={{width: '25%'}}>{todosprop[index]}</div>
                        <div style={{width: '25%'}}><input checked={todosprop2[index]} type="checkbox" id="myCheckbox" name="myCheckbox" /></div>
                        <div style={{width: '25%'}}>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                      </div>
                    ))}
                    <div style={{color: 'white'}}>line</div>
                    <form onSubmit={handleSubmit} style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div style={{width: '25%'}}><input
                        style={{width: '90%'}}
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Add/Edit Todo"
                      /></div>
                      <div style={{width: '25%'}}><select value={inputType} style={{width: '90%'}} onChange={handleType}>
                        <option value="">Select Schema</option>
                        <option value="Number">Number</option>
                        <option value="String">String</option>
                      </select></div>
                      <div style={{width: '25%'}}><input checked={inputisRequired} onChange={handleIsRequired} type="checkbox" id="myCheckbox" name="myCheckbox" /></div>
                      <div style={{width: '25%'}}><button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button></div>
                    </form>
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
                  <button onClick={() => setShowNewSchemaPopUp(1)} className='addSchemaButton'>Add Schema</button>
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