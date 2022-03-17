import { NextPage } from "next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Logout: NextPage = () => {
    
    const dispatch = useDispatch();
    const router = useRouter();

    dispatch(authActions.deauthenticate());
          router.push("/");


    return null
}

export default Logout;