import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

import { selectIngredients } from '../../services/ingredientsSlice';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const ingredients = useSelector(selectIngredients);
  // const loading = useSelector(getLoadingSelector);
  // const error = useSelector(getErrorSelector);

  const buns = useMemo(
    (): TIngredient[] =>
      ingredients.filter((ingredient) => ingredient.type === 'bun'),
    [ingredients]
  );
  const mains = useMemo(
    (): TIngredient[] =>
      ingredients.filter((ingredient) => ingredient.type === 'main'),
    [ingredients]
  );
  const sauces = useMemo(
    (): TIngredient[] =>
      ingredients.filter((ingredient) => ingredient.type === 'sauce'),
    [ingredients]
  );

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // if (loading && !error) {
  //   return <Preloader />;
  // }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
