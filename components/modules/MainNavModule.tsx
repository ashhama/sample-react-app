import MainNav from "../elements/MainNav";
import { useRouter } from "next/router";
import MenuModel from "../../models/MenuModel";


const MainNavModule:React.FC<{}> = (props) => {
    const router = useRouter();
    const menuItems: MenuModel[] = [];

    if (router.pathname === "/") {
        
    } else {
      menuItems.push(new MenuModel("Home", "/"));
    }


  return (
    <MainNav logoUrl="/img/maldives-national-emblem.png" brandText="Ministry of Youth and Sports" menu={menuItems}  />
  );
}

export default MainNavModule;