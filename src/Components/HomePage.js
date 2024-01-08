import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
const environment = process.env.REACT_APP_Environment || "dev";
let Base_Url = "";
if (environment == "dev") {
  Base_Url = "http://localhost:5000/"
} else if (environment == "prod") {
  Base_Url = process.env.REACT_APP_Base_URL;
}

const HomePageContect = () => {

    const start = () => {
        axios.get(Base_Url + 'start')
      }

    return(
        <div>
            <Link to="/schema" onClick={() => start()} >New Project</Link>
        </div>
    )
}

export default HomePageContect;