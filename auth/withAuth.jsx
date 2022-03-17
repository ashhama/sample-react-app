// HOC/withAuth.jsx
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const withAuth  = (WrappedComponent) => {
  return (props) => {

    const protectedRoutes = ['/submissions'];



    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      
      const token = useSelector(state => state.auth.token);
      const user = useSelector(state => state.auth.user);
      const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    
      
      const protectedRoute = protectedRoutes.find(element => {
        if (Router.pathname.startsWith(element) > -1) {
          return true;
        }
      });

      // If there is no access token we redirect to "/" page.
      if (protectedRoute && (!isLoggedIn || !user || !token)) {
        Router.replace("/login");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
