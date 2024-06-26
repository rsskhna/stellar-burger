import { FC, useEffect, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectIngredientById,
  selectIngredients
} from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id: ingrId } = useParams();
  const dispatch = useDispatch();
  //const ingredients = useSelector(selectIngredients);
  const ingredientData = useSelector(selectIngredientById(ingrId));
  // const [ingredientData, setIngredientData] = useState<
  //   TIngredient | undefined
  // >();
  //
  // useEffect(() => {
  //   const ingredient = ingredients.find((item) => {
  //     if (item._id === ingrId) {
  //       return item;
  //     }
  //   });
  //   setIngredientData(ingredient);
  // }, [ingrId]);

  //const ingredientData = null;

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={dispatch(ingredientData)} />;
};
