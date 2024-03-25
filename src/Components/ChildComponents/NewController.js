import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addRouter, updateRouter } from "../../services/reducer";

const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
    Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
    Base_Url = process.env.REACT_APP_Base_URL;
}

const NewController = ({ SchemaData, editButtonActive, updateShowNewControllerPopUp, updateEditButtonActive,
    models, requests, methods, queryParams, route, updateNewControllerCard, editIndex, updateRoute,
    updateModels, updateRequests, updateMethods, updateQueryParams, currId
}) => {

    const dispactch = useDispatch();



    // new/edit controller params
    const [model, setmodel] = useState('');
    const [request, setrequest] = useState('');
    const [method, setMethod] = useState('');
    const [queryParam, setQueryParam] = useState('');

    const [disableRequests, setDisableRequests] = useState([0, 0, 0, 0])

    // default options
    const requestOptions = ['get', 'post', 'put', 'delete'];
    const getRequestOptions = ['find()', 'findById()', 'findOne()'];
    const postRequestOptions = ['save()'];
    const putRequestOptions = ['findByIdAndUpdate()'];
    const deleteRequestOptions = ['findByIdAndDelete()', 'findOneAndDelete()'];

    //
    const [newRoute, setNewRoute] = useState("")
    const [newModels, setNewModels] = useState([]);
    const [newRequests, setNewRequests] = useState([]);
    const [newMethods, setNewMethods] = useState([]);
    const [newQueryParam, setNewQueryParam] = useState([]);



    // methods
    useEffect(() => {
        setmodel(models[editIndex])
        setrequest(requests[editIndex])
        setMethod(methods[editIndex])
        if (queryParams === undefined) {
            setQueryParam("")
        } else {
            setQueryParam(queryParams[editIndex])
        }
        let getCount = 0
        let postCount = 0
        let putCount = 0
        let deleteCount = 0
        requests.map((item) => {
            if (item == 'get') {
                getCount += 1
            }else if(item == 'post') {
                postCount += 1
            }else if(item == 'put') {
                putCount += 1
            }else if(item == 'delete') {
                deleteCount += 1
            }
        })
        if (getCount <=2 ) {
            getCount = 0
        }
        if (deleteCount <= 1) {
            deleteCount = 0
        }
        setDisableRequests([getCount, postCount, putCount, deleteCount])
    }, [])


    // new controller method
    const addNewController = () => {
        for (let i = 0; i <= models.length - 1; i++) {
            newModels.push(models[i])
            newRequests.push(requests[i])
            newMethods.push(methods[i])
            newQueryParam.push(queryParams[i])
        }
        newModels.push(model)
        newRequests.push(request)
        newMethods.push(method)
        if (queryParam === undefined) {
            newQueryParam.push("")
        } else {
            newQueryParam.push(queryParam)
        }

        const newController = {
            "route": route,
            "requests": newRequests,
            "methods": newMethods,
            "queryParams": newQueryParam,
            "models": newModels
        }

        if (currId === "") {
            dispactch(addRouter(newController))
        } else {
            dispactch(updateRouter({ id: currId, data: newController }))
        }
        updateShowNewControllerPopUp(0);
        updateNewControllerCard(0);
        updateRoute('/');
        updateModels([]);
        updateRequests([]);
        updateMethods([]);
        updateQueryParams([]);
    }

    //edit controller card
    const editAndUpdateController = (editIndex) => {

        for (let i = 0; i <= models.length - 1; i++) {
            newModels.push(models[i])
            newRequests.push(requests[i])
            newMethods.push(methods[i])
            newQueryParam.push(queryParams[i])
        }
        newModels[editIndex] = model
        newRequests[editIndex] = request
        newMethods[editIndex] = method
        if (queryParam === undefined) {
            newQueryParam[editIndex] = ""
        } else {
            newQueryParam[editIndex] = queryParam
        }
        const newController = {
            "route": route,
            "requests": newRequests,
            "methods": newMethods,
            "queryParams": newQueryParam,
            "models": newModels
        }

        dispactch(updateRouter({ id: currId, data: newController }))
        updateShowNewControllerPopUp(0);
        updateNewControllerCard(0);
        updateRoute('/');
        updateModels([]);
        updateRequests([]);
        updateMethods([]);
        updateQueryParams([]);
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
                                {option.data.schemaName}
                            </option>
                        ))}
                    </select>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%' }}>
                        <div>
                            <p>Request </p>
                            <select value={request} onChange={(e) => setrequest(e.target.value)} id="dropdown" >
                                <option value="">Select request</option>
                                {requestOptions.map((option, index) => (
                                    <option key={index} value={option} disabled={disableRequests[index]}>
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
                                        <option key={index} value={option} disabled={methods.includes(option)}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        {request === "post" &&
                            <div>
                                <p>Method </p>
                                <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" defaultValue={postRequestOptions[0]}>
                                    <option value="">Select method</option>
                                    {postRequestOptions.map((option, index) => (
                                        <option key={index} value={option} disabled={methods.includes(option)}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        {request === "put" &&
                            <div>
                                <p>Method </p>
                                <select value={method} onChange={(e) => setMethod(e.target.value)} id="dropdown" defaultValue={putRequestOptions[0]}>
                                    <option value="">Select method</option>
                                    {putRequestOptions.map((option, index) => (
                                        <option key={index} value={option} disabled={methods.includes(option)}>
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
                                        <option key={index} value={option} disabled={methods.includes(option)}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        }
                        {(method === "findOne()" || method === "findOneAndDelete()") && (
                            <div>
                                <p>Query Param</p>
                                <input type="text" value={queryParam} placeholder='enter the variable name' onChange={(e) => setQueryParam(e.target.value)} />
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