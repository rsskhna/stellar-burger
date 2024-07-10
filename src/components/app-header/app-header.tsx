import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUserData, selectUserName } from '../../services/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUserName);

  return <AppHeaderUI userName={userName} />;
};
