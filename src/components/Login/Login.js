import Form from '../Form/Form';
import {useState} from "react";

function Login(props) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (evt) => {
    const {email, password} = userData;
    evt.preventDefault();
    props.onLogin({email, password})
  }
  return (<Form component='login'/>);
}

export default Login;
