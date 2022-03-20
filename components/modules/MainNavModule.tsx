/**
 * This is the Wrapper for the Main Navigation used to dynamically create navigation items
 *
 */

import MainNav from "../elements/MainNav";
import { useRouter } from "next/router";
import MenuModel from "../../models/MenuModel";
import { useSelector } from "react-redux";
import React from "react";


const MainNavModule:React.FC<{}> = (props) => {
    const router = useRouter();
    const menuItems: MenuModel[] = [];

    if (router.pathname === "/") {
        
    } else {
      menuItems.push(new MenuModel("Home", "/"));
    }

    //below, we check auth status from redux store persisted on local storage
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    // have seperate menu items for logged in and logged out users
    if(isLoggedIn) {
        menuItems.push(new MenuModel("Submissions", "/submissions"));
        menuItems.push(new MenuModel("Logout", "/logout"));
    } else {
        menuItems.push(new MenuModel("Login", "/login"));
    }

  return (
    <MainNav logoUrl="/img/maldives-national-emblem.png" brandText="Ministry of Youth and Sports" menu={menuItems}  />
  );
}

export default React.memo(MainNavModule);