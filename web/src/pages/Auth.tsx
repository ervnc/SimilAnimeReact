import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Auth() {

    const navigate = useNavigate();

    const { loggedIn, username} = useParams();

    useEffect(() => {
        axios.get("http://localhost:1111/authenticate").then((response) => {
            if (response.data.loggedIn == true) {
                console.log('entrou')
            } else {
                console.log('error');
            }        
            console.log(response);
        })
    }, [])

    return (
        <><h1>{loggedIn}</h1>
            
        <h2>{username}</h2>
            
        </>
    );
}

export default Auth;
