import "./App.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import { useStore } from "./hooks/useStore";
import Profile from "./components/Profile";
function App() {
  const { authData } = useStore();

  const setAuthData = useStore((state: any) => state.setAuthData);
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="348725696220-pvmdr0hiju4oh7icoh1h2o4qhof39np4.apps.googleusercontent.com">
        <div>
          <GoogleLogin
            useOneTap
            onSuccess={async (credentialResponse) => {
              const response = await axios.post(
                // "http://localhost:4000/api/auth/google-login",
                "https://paygees.onrender.com/api/auth/google-login",
                {
                  token: credentialResponse.credential,
                }
              );
              const data = response.data;
              console.log(data);
              return;
              // send the access token in the data to /auth/currentuser to get the current logged in user
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />{" "}
        </div>

        <Profile />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
