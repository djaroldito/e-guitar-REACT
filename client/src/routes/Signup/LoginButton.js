import { GoogleLogin } from "react-google-login";
import { postSignupForm } from "../../Redux/SignupActions";
import { useDispatch } from "react-redux";
import axios from "axios";

export const LoginButton = () => {
  const dispatch = useDispatch();

  const onSuccess = async (res) => {
    const { data } = await axios.get("/ruser/email", {
      params: {
        email: res.profileObj.email,
      },
    });
    if (data) {
      localStorage.setItem("UserData", JSON.stringify(res.profileObj));
      console.log("LOGIN SUCCESS! res: ", res.profileObj);
    } else {
      console.log("LOGIN SUCCESS! res: ", res.profileObj);
      let supData = {
        email: res.profileObj.email,
        fullname: res.profileObj.name,
        password: Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2)
      };
      dispatch(postSignupForm(supData));
    }
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId="1071381556347-p8k8tg37ss2e9ag86088tvdds19dot5o.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single-host-origin"}
        isSignedIn={true}
      />
    </div>
  );
};
