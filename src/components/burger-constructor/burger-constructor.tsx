import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectBurgerBun,
  selectBurgerIngredients,
  setBunState,
  setIngredientsState
} from '../../services/burgerConstructorSlice';
import {
  placeOrder,
  selectOrderModalData,
  selectOrderRequest,
  setModalData,
  setOrderRequest
} from '../../services/ordersSlice';
import { selectUserData } from '../../services/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: useSelector(selectBurgerBun),
    ingredients: useSelector(selectBurgerIngredients)
  };

  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectOrderModalData);

  const user = useSelector(selectUserData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      navigate('/login');
    } else {
      const bunId = constructorItems.bun._id;
      const ingredientsIds = constructorItems.ingredients.map(
        (item) => item._id
      );
      const order = [bunId, ...ingredientsIds, bunId];
      dispatch(placeOrder(order));
    }
  };
  const closeOrderModal = () => {
    dispatch(setIngredientsState([]));
    dispatch(setBunState(null));
    dispatch(setModalData(null));
    dispatch(setOrderRequest(false));
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
