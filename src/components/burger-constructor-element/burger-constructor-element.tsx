import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch, useSelector } from '../../services/store';
import {
  setIngredientsState,
  deleteBurgerComponent,
  selectBurgerIngredients
} from '../../services/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const ingredients = useSelector(selectBurgerIngredients);
    const arrOfIngredients = Array.from(ingredients);
    const handleMoveDown = () => {
      arrOfIngredients[index] = arrOfIngredients[index + 1];
      arrOfIngredients[index + 1] = ingredient;
      dispatch(setIngredientsState(arrOfIngredients));
    };

    const handleMoveUp = () => {
      arrOfIngredients[index] = arrOfIngredients[index - 1];
      arrOfIngredients[index - 1] = ingredient;
      dispatch(setIngredientsState(arrOfIngredients));
    };

    const handleClose = () => {
      dispatch(deleteBurgerComponent(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
