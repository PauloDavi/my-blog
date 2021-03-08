---
title: 'Operações básicas com array'
description: 'Operações básicas com array de números utilizando soluções funcionais e otimizadas no javascript'
date: '2021/03/07'
modified_date: '2021/03/07'
image: '/assets/images/posts/sum-numbers.jpg'
width: '5184'
height: '3456'
tags: '["array","soma","funcional"]'
---
Diferente do python, javascript não tem soluções especificas para trabalhar com arrays numericos, como por exemplo, a somatoria de um array de números.

## Somatoria</h1>

````javascript
const array = [1, 2, 3, 4];

const soma = array.reduce((a, b) => a + b, 0);

console.log(soma); // soma = 10
````

A função `array.reduce(callback, valorInicial)` é perfeita para essa função, poís ela funciona da seguinte forma. Usando o segundo argumento da função como o valor inicial ela chama a função de callback que recebe o ultimo valor que foi retornado da função de callback ou no caso do primeiro item do array ele utiliza o valor inicial e o valor do array. Usando essa logica é possivel fazer uma operação entre todos os itens do array, como no exemplo acima, uma somatoria.

A definição da função é a seguinte:

````javascript
Array<T>.reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: T, array: T[]) => T, initialValue: T): T
````

## Exemplos

````javascript
const array = [2, 2];

const subtracao = array.reduce((a, b) => a - b, 0);
const multiplicacao = array.reduce((a, b) => a * b, 0);
const divisao = array.reduce((a, b) => a / b, 0);

console.log(subtracao); // subtracao = 10
console.log(multiplicacao); // multiplicacao = 10
console.log(divisao); // divisao = 10
````

## Bônus

Tambem é possivel usar essa função para manipular arrays de objetos, por exemplo, imaginando que você tem uma array de objetos com nome e email de clientes (algo comum em APIs) e você quer criar um objeto em que a chave é o nome do cliente e o valor é email. É possível utilizar essa solução funcional:

```javascript
const clientes = [
  { name: "fulano", email: "fulano@email.com" },
  { name: "sicrano", email: "sicrano@email.com" },
];

const emails = clientes.reduce((a, b) => ({...a, [b.name]: b.email}), {});

console.log(emails); // { fulano: "fulano@email.com", sicrano: "sicrano@email.com" }
```
