import { GoogleLogin } from "react-google-login";
import { postSignupForm } from "../../Redux/SignupActions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

export const LoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = async (res) => {
    const { data } = await axios.get("/ruser/email", {
      params: {
        email: res.profileObj.email,
      },
    });
    if (data) {
      sessionStorage.setItem("UserData", JSON.stringify(res.profileObj));
      sessionStorage.setItem("emailGoogle", res.profileObj.email);
      sessionStorage.setItem("userId", data.id);
      localStorage.setItem("carrito", JSON.stringify(data.products));
      sessionStorage.setItem("imageURL", res.profileObj.imageUrl);
      navigate("/home", { state: { sessionStorage } });
      console.log("LOGIN Exist user SUCCESS! res: ", res.profileObj);
    } else {
      sessionStorage.setItem("UserData", JSON.stringify(res.profileObj));
      sessionStorage.setItem("emailGoogle", res.profileObj.email);
      sessionStorage.setItem("imageURL", res.profileObj.imageUrl);
      
      console.log("LOGIN SUCCESS! res: ", res.profileObj);

      let supData = {
        email: res.profileObj.email,
        fullname: res.profileObj.name,
        avatar: res.profileObj.imageUrl,
        isActive: true,
        password:
          Math.random().toString(36).slice(2) +
          Math.random().toString(36).toUpperCase().slice(2),
      };

      sessionStorage.setItem("UserData", JSON.stringify(res.profileObj));
      sessionStorage.setItem("emailGoogle", res.profileObj.email);
      
      await postSignupForm(supData);
      
      var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
      var code = "";
      for (let i = 0; i < 10; i++)
        code += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        );
        
      axios.get(
        `/ruser/sendCode?email=${res.profileObj.email}&discount=10&code=${code}`
      );

      navigate("/home", { state: { sessionStorage } });
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
        cookiePolicy={"none"}
        isSignedIn={true}
      />
    </div>
  );
};
