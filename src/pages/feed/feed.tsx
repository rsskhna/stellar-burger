import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, selectOrders } from '../../services/feedsSlice';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(selectOrders);
  const dispatch = useDispatch();
  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  useEffect(() => {
    dispatch(getFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
