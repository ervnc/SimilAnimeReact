import { Fragment } from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from '../pages/Login';
import User_Registration from "../pages/User_Registration";
import Main_page from '../pages/Main_page';
import Auth from '../pages/Auth';

// const Private = ({ Item }) => {
//     const signed = true;

//     return signed ? <Item /> : <Login />;
// }

const RoutesApp = () => {
   return(
       <BrowserRouter>

            <Fragment>
                <Routes>
                    <Route element = { <User_Registration /> } path="/user_registration" />
                    <Route element = { <Login /> } path="/" />
                    <Route path="/main_page" element = { <Main_page />} />
                    <Route path="/authenticate" element = { <Auth /> } />
                    <Route element = { <Login /> } path="*" />
                </Routes>
            </Fragment>
       </BrowserRouter>
   )
}

export default RoutesApp;