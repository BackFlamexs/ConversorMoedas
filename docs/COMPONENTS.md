# Mapeamento de componentes

Este documento registra a arquitetura atual da interface e será atualizado conforme novas funcionalidades forem implementadas.

## Árvore atual

```text
main.jsx
└── App
    ├── Header
    ├── Hero
    ├── ConverterForm
    │   └── ResultPanel
    └── PageFooter
```

`main.jsx` inicializa o React e renderiza `App` dentro do elemento `root`. `App` mantém os dados que precisam ser compartilhados e fornece valores e callbacks aos componentes por props.

## Componentes

| Componente | Arquivo JSX | CSS Module planejado | Responsabilidade | Principais props | Estado atual | Relação |
| --- | --- | --- | --- | --- | --- | --- |
| `App` | `src/App.jsx` | `src/App.module.css` | Compor a página, carregar moedas e manter o par selecionado para compartilhamento. | — | `currencies`, `fromCurrency`, `toCurrency`, loading, erro e tentativa de recarga, controlados com `useState`. | Renderiza `Header`, `Hero`, `ConverterForm` e `PageFooter`. |
| `Header` | `src/components/Header.jsx` | `src/components/Header.module.css` | Exibir a marca e a identificação da aplicação. | `brandName` | Nenhum. | Filho de `App`. |
| `Hero` | `src/components/Hero.jsx` | `src/components/Hero.module.css` | Apresentar o título e a descrição da ferramenta. | `eyebrow`, `titleStart`, `titleHighlight`, `description` | Nenhum. | Filho de `App`. |
| `ConverterForm` | `src/components/ConverterForm.jsx` | `src/components/ConverterForm.module.css` | Capturar o valor, permitir selecionar ou inverter moedas, buscar a taxa atual e calcular a conversão. | `currencies`, `fromCurrency`, `toCurrency`, callbacks de alteração/inversão, `initialAmount`, estado de carregamento das moedas. | Valor, cotação, loading e erros da cotação, resultado e erro de validação. | Filho de `App`; renderiza `ResultPanel`. |
| `ResultPanel` | `src/components/ResultPanel.jsx` | `src/components/ResultPanel.module.css` | Exibir o resultado, a taxa utilizada, a data efetiva e estados de carregamento/erro da cotação. | Moedas, resultado, taxa, data, estados e callback de nova tentativa. | Nenhum. Recebe dados por props. | Filho de `ConverterForm`. |
| `PageFooter` | `src/components/PageFooter.jsx` | `src/components/PageFooter.module.css` | Exibir a identificação e a descrição do projeto no rodapé. | `projectName`, `description` | Nenhum. | Filho de `App`. |

## Props e fluxo atual de dados

1. `App` consulta a lista de moedas pela função `getCurrencies` do serviço `src/services/frankfurter.js`.
2. `App` mantém origem e destino em estado e passa os valores e funções de atualização para `ConverterForm` por props.
3. `ConverterForm` envia as alterações de seleção ao `App`; o botão de inversão troca os dois valores no estado compartilhado.
4. Quando o par muda, `ConverterForm` consulta a taxa atual com `getLatestRate`. O efeito ignora respostas de consultas anteriores após a troca do par.
5. Ao enviar o formulário, `ConverterForm` calcula o valor usando a taxa recebida e passa cotação, data e resultado para `ResultPanel`.

Esse fluxo aplica lifting state up: o estado do par está no ancestral comum (`App`) para poder ser compartilhado com futuras áreas, como histórico, gráfico e tabela.

## Serviços

`src/services/frankfurter.js` centraliza as requisições à API Frankfurter. `getCurrencies` retorna opções normalizadas para os seletores e `getLatestRate` retorna a resposta de cotação para o par solicitado. A lógica de interface permanece nos componentes.

## CSS Modules

Atualmente, os estilos estão em `src/App.css` e `src/index.css`, portanto ainda são globais. O briefing exige CSS Modules. A coluna "CSS Module planejado" registra a organização proposta para a migração; os módulos correspondentes ainda não foram criados. `index.css` poderá permanecer com estilos globais mínimos, como reset e variáveis de tema.

## Convenções

- Componentes de interface são funções React com nomes em PascalCase.
- Cada componente é exportado e importado explicitamente.
- Props configuram os componentes e fornecem dados; estado guarda dados que mudam durante o uso.
- Listas de opções são renderizadas a partir dos dados recebidos, com uma `key` estável por item.
- Lógica de API, processamento e exportação poderá ser extraída para `services`, `hooks` e `utils` conforme essas responsabilidades forem implementadas.
