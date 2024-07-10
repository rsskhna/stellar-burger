import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { loginUser, registerUser } from '../../services/userSlice';
import { useDispatch } from '../../services/store';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registerUser({
        email: email,
        name: userName,
        password: password
      })
    );
    dispatch(loginUser({ email, password }));
    navigate('/');
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
