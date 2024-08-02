/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit(BASE_URL);
  });
});

describe('перехват запроса', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', (req) => {
      req.reply({
        fixture: 'ingredients.json'
      });
    }).as('getIngredients');
  });
});

describe('корректная работа конструктора', () => {
  const props = [
    {
      categoryName: 'Булки',
      chosenIngredient: 'булки'
    },
    {
      categoryName: 'Начинки',
      chosenIngredient: 'начинку'
    },
    {
      categoryName: 'Соусы',
      chosenIngredient: 'начинку'
    }
  ];

  props.forEach((prop) => {
    it(`${prop.categoryName}: добавление в конструктор`, () => {
      cy.visit(BASE_URL);

      const category = cy.get('h3').contains(prop.categoryName);
      category.next().contains('Добавить').click();

      cy.get('div')
        .contains(`Выберите ${prop.chosenIngredient}`)
        .should('not.exist');
    });
  });
});

describe('корректная работа модального окна ингредиента', () => {
  it('открытие модалки и закрытие по крестику', () => {
    cy.visit(BASE_URL);

    cy.get('img').first().click();
    cy.get('h3').contains('Детали ингредиента').next('button').click();
    cy.get('div').contains('Детали ингредиента').should('have.not.exist');
  });

  it('открытие модалки и закрытие по оверлею', () => {
    cy.visit(BASE_URL);

    cy.get('img').first().click();
    //cy.get('h3').contains('Детали ингредиента').next('button').click(500, 0);
    cy.get('div').contains('Детали ингредиента').should('have.not.exist');
  });
});
