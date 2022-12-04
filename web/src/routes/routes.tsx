import { Fragment } from 'react';
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Login from '../pages/Login';
import User_Registration from "../pages/User_Registration";
import Main_page from '../pages/Main_page';
import Character_registration from '../pages/Character_registration';
import User_Edit from '../pages/User_Edit';
import Character_Edit from '../pages/Character_Edit';

const RoutesApp = () => {
   return(
       <BrowserRouter>

            <Fragment>
                <Routes>
                    <Route element = { <User_Registration /> } path="/user_registration" />
                    <Route element = { <User_Edit /> } path="/user_edit" />
                    <Route element = { <Character_registration /> } path="/character_registration" />
                    <Route element = { <Character_Edit />} path="/edit_character/:nameCharacter" />
                    <Route element = { <Login /> } path="/" />
                    <Route path="/main_page" element = { <Main_page />} />
                    <Route element = { <Login /> } path="*" />
                </Routes>
            </Fragment>
       </BrowserRouter>
   )
}

export default RoutesApp;