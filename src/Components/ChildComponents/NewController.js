import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
    Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
    Base_Url = process.env.REACT_APP_Base_URL;
}

const NewController = ({ SchemaData, editButtonActive, updateShowNewControllerPopUp, updateEditButtonActive,
    models, requests, methods, queryParams, route, updateNewControllerCard, editIndex, updateRoute,
    updateModels, updateRequests, updateMethods, updateQueryParams
}) => {




    // new/edit controller params
    const [model, setmodel] = useState('');
    const [request, setrequest] = useState('');
    const [method, setMethod] = useState('');
    const [queryParam, setQueryParam] = useState('')

    // default options
    const requestOptions = ['get', 'post', 'put', 'delete'];
    const getRequestOptions = ['find()', 'findById()', 'findOne()'];
    const postRequestOptions = ['save()'];
    const putRequestOptions = ['findByIdAndUpdate()'];
    const deleteRequestOptions = ['findByIdAndDelete()', 'findOneAndDelete()'];



    // methods
    useEffect(() => {
        setmodel(models[editIndex])
        setrequest(requests[editIndex])
        setMethod(methods[editIndex])
        setQueryParam(queryParams[editIndex])
    }, [])


    // new controller method
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
                updateShowNewControllerPopUp(0);
                updateNewControllerCard(0);
                updateRoute('/');
                updateModels([]);
                updateRequests([]);
                updateMethods([]);
                updateQueryParams([]);
            })
            .catch((err) => console.log(err));
    }

    //edit controller card
    const editAndUpdateController = (editIndex) => {

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
                updateShowNewControllerPopUp(0);
                updateNewControllerCard(0);
                updateEditButtonActive(0);
                updateRoute('/');
                updateModels([]);
                updateRequests([]);
                updateMethods([]);
                updateQueryParams([]);
            })
            .catch((err) => console.log(err));
    }


    const cancel = () => {
        updateShowNewControllerPopUp(0);
        updateEditButtonActive(0);
        updateRoute('/')
    }



    return (
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
                        <button onClick={() => editAndUpdateController(editIndex)} className='addSchemaButton'>Update</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NewController;