import {useState} from 'react';

import Form from '../Form/Form';

function Register(props) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleRegister = (evt) => {
    evt.preventDefault();
    const {name, email, password} = userData;
    props.onRegister({name, email, password});
  }

  return (<Form component='register'/>);
}

export default Register;
