import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../../services/reducer";

const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
    Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
    Base_Url = process.env.REACT_APP_Base_URL;
}

const NewSchema = ({ openPopUp, closePopUp, currSchema, updateSchema, EditButtonActive, updateEditButtonActive }) => {

    const dispatch = useDispatch()

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
        console.log(currSchema)
        if (Object.keys(currSchema).length >= 1) {
            setNewSchemaName(currSchema.data.schemaName)
            let temp_todos = []
            let temp_todosprop = []
            let temp_todosprop2 = []
            for (let key in currSchema.data.schema) {
                temp_todos.push(key)
                temp_todosprop.push(currSchema.data.schema[key].type)
                temp_todosprop2.push(currSchema.data.schema[key].required)

            }
            setTodos(temp_todos)
            setTodosProp(temp_todosprop)
            setTodosProp2(temp_todosprop2)
        }

    }, [])


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
            setInputIsRequired(false);
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
            setInputIsRequired(false)
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

        if (EditButtonActive) {
            dispatch(updateTodo({id: currSchema.id, data: newSchema}))
            updateSchema({})
            closePopUp()
        } else {
            dispatch(addTodo(newSchema))
            updateSchema({})
            closePopUp()
        }
        // axios.post(Base_Url + 'create_schema', newSchema)
        //     .then(closePopUp)
        //     .catch((err) => console.log(err))
    }

    const cancel = () => {
        updateSchema({})
        updateEditButtonActive(0);
        closePopUp();
    }



    return (
        <div className='new-schema-container'>
            <div className='new-schema-card'>
                <div>
                    <h2>Schema Nme</h2>
                    <input defaultValue={newSchemaName} onChange={(e) => setNewSchemaName(e.target.value)} />
                </div>
                <div className='newSchema'>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', }}>
                            <div style={{ width: '25%' }}><p>Column Name</p></div>
                            <div style={{ width: '25%' }}><p>Data Type</p></div>
                            <div style={{ width: '25%' }}><p>Is Required</p></div>
                            <div style={{ width: '25%' }}><p>Actions</p></div>
                        </div>
                        {todos.map((todo, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '25%' }}>{todo}</div>
                                <div style={{ width: '25%' }}>{todosprop[index]}</div>
                                <div style={{ width: '25%' }}><input checked={todosprop2[index]} type="checkbox" id="myCheckbox" name="myCheckbox" /></div>
                                <div style={{ width: '25%' }}>
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                    <button onClick={() => handleDelete(index)}>Delete</button>
                                </div>
                            </div>
                        ))}
                        <div style={{ color: 'white' }}>line</div>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '25%' }}><input
                                style={{ width: '90%' }}
                                type="text"
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Add/Edit Todo"
                            /></div>
                            <div style={{ width: '25%' }}><select value={inputType} style={{ width: '90%' }} onChange={handleType}>
                                <option value="">Select Schema</option>
                                <option value="Number">Number</option>
                                <option value="String">String</option>
                            </select></div>
                            <div style={{ width: '25%' }}><input checked={inputisRequired} onChange={handleIsRequired} type="checkbox" id="myCheckbox" name="myCheckbox" /></div>
                            <div style={{ width: '25%' }}><button type="submit">{editingIndex !== null ? 'Update' : 'Add'}</button></div>
                        </form>
                    </div>


                </div>

                {EditButtonActive == 0 &&
                    <div className='new-schema-button'>
                        <button onClick={closePopUp} className='addSchemaButton'>Cancel</button>
                        <button onClick={() => addNewSchema()} className='addSchemaButton'>Add</button>
                    </div>
                }
                {EditButtonActive == 1 &&
                    <div className='new-schema-button'>
                        <button onClick={() => cancel()} className='addSchemaButton'>Cancel</button>
                        <button onClick={() => addNewSchema()} className='addSchemaButton'>Update</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NewSchema;