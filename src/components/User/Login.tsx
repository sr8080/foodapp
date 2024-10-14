import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { RootState } from '../../store';
import { googleregister, login } from "../../actions/userActions";
import { toast } from 'react-toastify';

interface AuthState {
  isAuthenticated: boolean;
  error: any;
  loading: boolean;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticatedUser, loading, error, user } = useSelector((state: RootState) => state.auth);
  console.log(user, "loguser");
  console.log(isAuthenticatedUser,"status 10")

  useEffect(() => {
    if (isAuthenticatedUser) {
      debugger
      toast.success("Login successful!");
      setTimeout(() => {
        navigate('/home');
        // window.location.reload()
      }, 1000);
    }
    if (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    }
  }, [dispatch, isAuthenticatedUser, error, navigate]);

  const handleGoogleLoginSuccess = (response: any) => {
    console.log("Google login success:", response);

    if (response.credential) {
      const base64Url = response.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const decodedToken = JSON.parse(jsonPayload);
      dispatch(googleregister(decodedToken) as any);
      console.log("Decoded JWT Token:", decodedToken);

      console.log("User email:", decodedToken.email);
      console.log("User name:", decodedToken.name);
      console.log("User picture:", decodedToken.picture);
    }
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google login failed");
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData) as any);
  };

  return (
    <GoogleOAuthProvider clientId="585727312599-1a379cv4rer263le64c75r4k5scvsu3k.apps.googleusercontent.com">
      <div className="wrapper">
        <div className="left"></div>
        <div className="right">
          <form onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
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
            <div className="or-separator">
              <span>OR</span>
            </div>
            <div className="google-login">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginFailure}
              />
            </div>
            <Link to="/register" className="float-right mt-3">
              NEW USER?
            </Link>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
