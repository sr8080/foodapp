import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RootState } from "../store";
import { useSelector } from "react-redux";



export function PrivateOutlet() {

    const { isAuthenticatedUser, loading, error, user } = useSelector((state: RootState) => state.auth);
    const {isAuthenticated,restaurant} =useSelector((state:RootState)=>state.restaurant )
   
    console.log(isAuthenticated,"is private outlet")
    console.log(restaurant,"rest privt oyr")
  const location = useLocation();

  return  <Outlet /> 
}