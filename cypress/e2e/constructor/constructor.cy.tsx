/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
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

    cy.visit(BASE_URL);
  });
});

describe('корректная работа конструктора', () => {

});
