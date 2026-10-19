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
    ├── HistorySection
    └── PageFooter
```

`main.jsx` inicializa o React e renderiza `App` dentro do elemento `root`. `App` mantém os dados que precisam ser compartilhados e fornece valores e callbacks aos componentes por props.

## Componentes

| Componente | Arquivo JSX | CSS Module planejado | Responsabilidade | Principais props | Estado atual | Relação |
| --- | --- | --- | --- | --- | --- | --- |
| `App` | `src/App.jsx` | `src/App.module.css` | Compor a página, carregar moedas e manter o par selecionado para compartilhamento. | — | `currencies`, `fromCurrency`, `toCurrency`, loading, erro e tentativa de recarga, controlados com `useState`. | Renderiza `Header`, `Hero`, `ConverterForm`, `HistorySection` e `PageFooter`. |
| `Header` | `src/components/Header.jsx` | `src/components/Header.module.css` | Exibir a marca e a identificação da aplicação. | `brandName` | Nenhum. | Filho de `App`. |
| `Hero` | `src/components/Hero.jsx` | `src/components/Hero.module.css` | Apresentar o título e a descrição da ferramenta. | `eyebrow`, `titleStart`, `titleHighlight`, `description` | Nenhum. | Filho de `App`. |
| `ConverterForm` | `src/components/ConverterForm.jsx` | `src/components/ConverterForm.module.css` | Capturar o valor, permitir selecionar ou inverter moedas, buscar a taxa atual e calcular a conversão. | `currencies`, `fromCurrency`, `toCurrency`, callbacks de alteração/inversão, `initialAmount`, estado de carregamento das moedas. | Valor, cotação, loading e erros da cotação, resultado e erro de validação. | Filho de `App`; renderiza `ResultPanel`. |
| `ResultPanel` | `src/components/ResultPanel.jsx` | `src/components/ResultPanel.module.css` | Exibir o resultado, a taxa utilizada, a data efetiva e estados de carregamento/erro da cotação. | Moedas, resultado, taxa, data, estados e callback de nova tentativa. | Nenhum. Recebe dados por props. | Filho de `ConverterForm`. |
| `HistorySection` | `src/components/HistorySection.jsx` | `src/components/HistorySection.module.css` | Selecionar o período, consultar o histórico do par, filtrar os registros e exibir resumo, gráfico e tabela. | `fromCurrency`, `toCurrency` | Período, registros, filtros, loading, erro e tentativa de recarga. | Filho de `App`; compartilha o par selecionado com `ConverterForm`. |
| `PageFooter` | `src/components/PageFooter.jsx` | `src/components/PageFooter.module.css` | Exibir a identificação e a descrição do projeto no rodapé. | `projectName`, `description` | Nenhum. | Filho de `App`. |

## Props e fluxo atual de dados

1. `App` consulta a lista de moedas por `getCurrencies` em `src/services/frankfurter.js`.
2. `App` mantém origem e destino em estado e passa os valores e callbacks para `ConverterForm` e `HistorySection`.
3. `ConverterForm` envia alterações de seleção ao `App`; o botão de inversão troca o par no estado compartilhado.
4. Quando o par muda, `ConverterForm` consulta a taxa atual com `getLatestRate` e `HistorySection` consulta a série histórica com `getHistoricalRates`.
5. `HistorySection` mantém o período e os filtros, recalcula o intervalo de datas antes de buscar dados e aplica filtros combinados à tabela; o gráfico continua usando toda a série recebida.
6. Ao enviar o formulário, `ConverterForm` calcula o valor usando a taxa recebida e passa cotação, data e resultado para `ResultPanel`.

Esse fluxo aplica lifting state up: o par está no ancestral comum (`App`) para ser compartilhado entre o conversor e a análise histórica.

## Serviços e utilitários

`src/services/frankfurter.js` centraliza as requisições à API. `getCurrencies` normaliza opções para os seletores, `getLatestRate` retorna uma cotação atual e `getHistoricalRates` retorna as observações para o intervalo informado. `src/utils/dateRanges.js` calcula datas iniciais para os períodos disponíveis. O gráfico histórico é renderizado com Recharts.

## CSS Modules

Atualmente, os estilos estão em `src/App.css` e `src/index.css`, portanto ainda são globais. O briefing exige CSS Modules. A coluna "CSS Module planejado" registra a organização proposta para a migração; os módulos correspondentes ainda não foram criados. `index.css` poderá permanecer com estilos globais mínimos, como reset e variáveis de tema.

## Convenções

- Componentes de interface são funções React com nomes em PascalCase.
- Cada componente é exportado e importado explicitamente.
- Props configuram os componentes e fornecem dados; estado guarda dados que mudam durante o uso.
- Listas de opções são renderizadas a partir dos dados recebidos, com uma `key` estável por item.
- Lógica de API, processamento e exportação poderá ser extraída para `services`, `hooks` e `utils` conforme essas responsabilidades forem implementadas.
