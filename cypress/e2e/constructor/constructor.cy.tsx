/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

describe('проверяем доступность приложения', function() {
  it('сервис должен быть доступен по адресу localhost:4000', function() {
    cy.visit(BASE_URL);
  });
});

describe('тестирование функциональности', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', (req) => {
      req.reply({
        fixture: 'ingredients.json'
      });
    }).as('getIngredients');

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'userData.json'
    }).as('getUser');

    cy.setCookie('accessToken', 'accessTokenMock');
    window.localStorage.setItem('refreshToken', 'refreshTokenMock');

    cy.visit(BASE_URL);
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    window.localStorage.setItem('refreshToken', '');
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
      cy.get('img').first().click();
      cy.get('[data-cy=close-button]').click();
      cy.get('div').contains('Детали ингредиента').should('have.not.exist');
    });

    it('открытие модалки и закрытие по оверлею', () => {
      cy.get('img').first().click();
      cy.get('[data-cy=modal-overlay]').click('left', { force: true });
      cy.get('div').contains('Детали ингредиента').should('have.not.exist');
    });
  });

  describe('создание заказа', () => {
    it('оформление заказа', () => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      }).as('postOrders');

      const buns = cy.get('h3').contains('Булки');
      const fillings = cy.get('h3').contains('Начинки');

      buns.next().contains('Добавить').click();
      fillings.next().contains('Добавить').click();

      cy.contains('Оформить заказ').click();
      cy.contains('48315');

      cy.get('[data-cy=close-button]').click();
      cy.get('div').contains('Детали ингредиента').should('have.not.exist');

      cy.contains('Выберите булки').should('have.exist');
      cy.contains('Выберите начинку').should('have.exist');
    });
  });
});
