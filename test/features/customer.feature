Feature: Customers API

  Scenario: Create a new customer
    Given I have a customer with name "John Doe" and email "john@example.com" and CPF "12345678900"
    When I send a POST request to "/customers" with the customer data
    Then the response status code should be 201
    And the response body should contain the created customer

# Antigo
Funcionalidade: Gerenciar clientes da lanchonete

    Cenário: Registrar um novo cliente
        Dado que o cliente fornece informações válidas de registro
        Quando o cliente se registra no sistema
        Então o cliente é adicionado à base de dados da lanchonete

    Cenário: Cliente tenta se registrar com informações inválidas
        Dado que o cliente fornece informações inválidas de registro
        Quando o cliente tenta se registrar no sistema
        Então o sistema deve retornar uma mensagem de erro indicando que as informações fornecidas são inválidas

    Cenário: Cliente tenta se registrar, mas já existe um cliente com o mesmo e-mail
        Dado que o cliente fornece informações válidas de registro
        E já existe um cliente registrado com o mesmo e-mail
        Quando o cliente tenta se registrar no sistema
        Então o sistema deve retornar uma mensagem de erro indicando que o e-mail fornecido já está em uso

    Cenário: Cliente tenta se registrar, mas ocorre um erro interno no sistema
        Dado que o cliente fornece informações válidas de registro
        Quando o cliente tenta se registrar no sistema
        E ocorre um erro interno no sistema
        Então o sistema deve retornar uma mensagem de erro indicando que ocorreu um problema interno

