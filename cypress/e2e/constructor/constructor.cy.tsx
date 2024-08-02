/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(BASE_URL);
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit(BASE_URL);
  });
});

describe('Перехват запроса', () => {
  it('Тест перехвата запроса по эндпоинту', () => {
    cy.intercept('GET', '/api/ingredients', (req) => {
      cy.fixture('ingredients.json').then((ingredients) => {
        req.reply({
          statusCode: 200,
          body: ingredients
        });
      });
    }).as('getIngredients');

    cy.visit('http://localhost:4000/');
  });
});
