import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {adminlogin} from '../../actions/AdminAction'
import { RootState } from '../../store';
import { toast } from 'react-toastify';
const Adminlogin: React.FC = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  
  const dispatch =useDispatch();
  const{isAuthenticatedUser,loading,error}=useSelector((state:RootState)=>state.auth)
 useEffect(()=>{
  if (isAuthenticatedUser) {
    toast.success("Login successful!"); 
    setTimeout(() => {
      navigate('/admin-home')
     
    }, 1000); 
  }
  if (error) {
    console.log(error);
    toast.error("Login failed. Please try again."); 
  }
 },[dispatch,isAuthenticatedUser,error])
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    const userData = {
      email,
      password,
    };

    dispatch(adminlogin(userData) as any);
  }
  return (
    <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler} >
            <h1 className="mb-3">ADMIN Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
            >
              LOGIN
            </button>
            
            <div className="google-login">
              
            </div>
            
          </form>
        </div>
      </div>
  );
};

export default Adminlogin;