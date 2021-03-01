---
title: 'CLI com nodeJS'
description: 'Tenho certeza que você ja pensou em automatizar a criação dos arquivos dos seus projetos. Usando o framework gluegun é possível criar uma CLI de form'
date: '2021/02/28'
modified_date: '2021/02/28'
image: '/assets/images/posts/command-line.jpg'
width: '6000'
height: '4000'
tags: '["cli","nodeJS"]'
---
## CLI com GlueGun

Com o framework de criação de CLI [gluegun](https://github.com/infinitered/gluegun) é muito fácil criar a sua propia CLI. Ela conta com uma otima documentação e trás uma estrutura de pastas simple e funcional.

## Iniciando Projeto

Para iniciar um projeto com a estrutura e todas as bibliotecas necessarias pasta rodar o comando

```bash
npx gluegun new
```

Escolher o template typescript e preencher com algumas informação como o nome do projeto e do autor.

## Estrutura de pastas

```bash
cli-project
  └─src
    │ cli.ts
    │
    ├─commands
    │   command.ts
    │
    ├─extensions
    │   my-first-extension.ts
    │
    ├─interfaces
    │   extended-gluegun-toolbox.ts
    │
    └─templates
        template.ts.ejs
```

### cli.ts

O arquivo principal do projeto, dificilmente é necessário edita-ló já que o templete já tras ele pronto para utilizar.

### commands

A pasta commands é onde ficaram todos os comandos da nossa CLI, e o nome do arquivo representa o nome do comando da CLI.

Os comando devem seguis o padrão:

```ts
import { ExtendedGluegunToolbox } from '../interfaces/extended-gluegun-toolbox';

module.exports = {
  // Nome do comando que deve ser o mesmo do arquivo
  name: 'first-command',
  // Atalhos que podem ser usados para chamar o comando, esse campo é opcional
  alias: ['first'],
  // Se o comando deve ser mostrado no comando de ajuda (-h), esse campo é opcional
  hidden: true,
  // descrição que será mostrada no comando de ajuda (-h)
  description: 'New Command',
  // função que o comando vai executar, OBS: ela sempre deve ser asíncrona
  run: async (toolbox: ExtendedGluegunToolbox) => { 
    const {
      print: { success },
    } = toolbox;  

    success('Primeiro Comando')
  }
};
```

A toolbox contem uma grande variedade de funções uteis como por exemplo a função 

```ts
prompt.ask({ type: 'input', name: 'myInput', message: 'Digite um valor: '})
```

que facilita a entrada de dados do usuario, podendo chamar um input simples, ou uma pergunta de sim/não ou até mesmo a seleção de itens em uma lista. Para mais detalhes sobre como utilizar essa função veja a [documentação](https://infinitered.github.io/gluegun/#/toolbox-prompt?id=ask).

### extensions

As extensões são funcionalidades recorrentes que podemos acrecentar na nossa toolbox, como por exemplo, a criação de um arquivo a partir de um template que é utilizada em mais de um comando. Uma extensão deve seguir o padrão:

```ts
import { ExtendedGluegunToolbox } from './../interfaces/extended-gluegun-toolbox';

export class MyFirstExtension {
  constructor(protected toolbox: ExtendedGluegunToolbox) {}

  // Essa função que vai ser acrescentada a toolbox e ela deve ser sempre assíncrona
  public async runExtension() {
    const {
      print: { success }
    } = this.toolbox; // Aqui você tem acesso a toolbox

    success('Your first extension is very nice 👏');
  }
}

export default (toolbox: ExtendedGluegunToolbox) => {
  toolbox.myExtension = new MyFirstExtension(toolbox);
};
```

### interfaces

Para que as nossas extensões possam ter o auto complete do typescript é necessário adicionar ela nessa pasta para que o gluegun saiba o tipo das extensões customizadas.

### templates

Os templates serão utilizados para a criação de arquivos com inserção de variáveis.



```ts
await template.generate({
  // Nome do template que esta na pasta templates
  template: 'post.ts.ejs',
  // Local e nome do arquivo que deve ser gerado
  target: `_posts/${formatTitle}.md`,
  // Variáveis que serão passadas para o modelo
  props: { 
    title,
    name,
  }
});
```

Já o modelo deve ser feito feito com a extensão .ejs (Embedded JavaScript) que tem uma ótima [documentação](https://ejs.co/#install). Ela ja vem instalada no template e funciona da seguinte maneira:

```ts
// Esse arquivo pode conter qualquer código javascript
const my_object = {
  title: '<%= props.title %>'
  description: '<%= props.description %>'
  date: '<%= props.date %>'
  modified_date: '<%= props.modified_date %>'
  image: '<%= props.image %>'
  width: '<%= props.width %>'
  height: '<%= props.height %>'
  tags: '<%- JSON.stringify(props.tags) %>'
}

export default my_object
```

Onde a notação **<%= props.field %>** é substituida pela variável que foi passada ao modelo. Sendo possível também interagir com essa variável na hora da inserção, como por exemplo, **<%- JSON.stringify(props.tags) %>** que é substituido por um array em formato string.