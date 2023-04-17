import { HomeNavigation } from "../homeNavigation/homeNavigation";
import { Login } from "../../screens/login/login";
import { useSelector } from "react-redux";
export const MainNavigator = () =>{
  const loggedIn=useSelector((state=>state.user.loggedIn))
  if(loggedIn)
  return <HomeNavigation/>
  else
  return <Login/>
}