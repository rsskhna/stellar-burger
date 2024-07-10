import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import {
  checkUserAuth,
  loginUser,
  selectIsAuthenticated
} from '../../services/userSlice';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    checkUserAuth();
    if (!email || !password) {
      return;
    }
    dispatch(loginUser({ email, password }));
    navigate('/');
  };

  if (isAuthenticated) {
    navigate('/profile');
  }

  return (
    <LoginUI
      errorText={''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
