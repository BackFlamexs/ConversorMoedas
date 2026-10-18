# Mapeamento de componentes

Este documento registra a arquitetura atual da interface e a organização planejada para aplicar CSS Modules e compartilhar estado entre componentes. Ele será atualizado conforme a aplicação crescer.

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

`main.jsx` inicializa o React e renderiza `App` dentro do elemento `root`. `App` reúne os componentes e fornece os dados de configuração. Atualmente, `ConverterForm` contém o estado do formulário e renderiza `ResultPanel`, que recebe o resultado por props.

## Componentes

| Componente | Arquivo JSX | CSS Module planejado | Responsabilidade | Principais props | Estado atual | Relação |
| --- | --- | --- | --- | --- | --- | --- |
| `App` | `src/App.jsx` | `src/App.module.css` | Compor a página, manter a configuração inicial de moedas e posicionar as áreas principais. | — | Nenhum. Possui constantes de configuração para moedas e valores iniciais. | Renderiza `Header`, `Hero`, `ConverterForm` e `PageFooter`. |
| `Header` | `src/components/Header.jsx` | `src/components/Header.module.css` | Exibir a marca e a identificação da aplicação. | `brandName` | Nenhum. | Filho de `App`. |
| `Hero` | `src/components/Hero.jsx` | `src/components/Hero.module.css` | Apresentar o título e a descrição da ferramenta. | `eyebrow`, `titleStart`, `titleHighlight`, `description` | Nenhum. | Filho de `App`. |
| `ConverterForm` | `src/components/ConverterForm.jsx` | `src/components/ConverterForm.module.css` | Capturar valor e moedas, validar entrada e executar o cálculo de demonstração atual. | `currencies`, `initialAmount`, `initialFromCurrency`, `initialToCurrency` | `amount`, `fromCurrency`, `toCurrency`, `result` e `error`, controlados com `useState`. | Filho de `App`; atualmente renderiza `ResultPanel`. |
| `ResultPanel` | `src/components/ResultPanel.jsx` | `src/components/ResultPanel.module.css` | Mostrar o valor calculado ou estado vazio e uma mensagem explicativa. | `targetCurrency`, `result`, `message` | Nenhum. Recebe os dados por props. | Filho de `ConverterForm` na arquitetura atual. |
| `PageFooter` | `src/components/PageFooter.jsx` | `src/components/PageFooter.module.css` | Exibir a identificação e a descrição do projeto no rodapé. | `projectName`, `description` | Nenhum. | Filho de `App`. |

## Props e fluxo atual de dados

1. `App` declara a lista de moedas e os valores iniciais.
2. `App` passa esses valores para `ConverterForm` por props.
3. `ConverterForm` inicializa seu estado local com os valores recebidos.
4. Eventos nos campos atualizam o estado local; o envio do formulário calcula uma taxa de demonstração.
5. `ConverterForm` passa resultado, moeda de destino e mensagem para `ResultPanel` por props.

As taxas atuais são exclusivamente demonstrativas e serão substituídas pela taxa obtida da API Frankfurter.

## Próxima evolução: lifting state up

Quando os dados da conversão precisarem ser compartilhados pelo formulário e pelo painel como componentes irmãos, o estado deverá subir para `App`:

```text
App (estado compartilhado)
├── ConverterForm (recebe valores e callbacks por props)
└── ResultPanel (recebe resultado e moeda por props)
```

Nesse desenho, `App` será responsável pelos valores do formulário e pelo resultado. `ConverterForm` receberá os valores e funções de atualização por props; `ResultPanel` receberá os dados do resultado. Essa mudança será feita como etapa de implementação e este documento deverá ser atualizado junto com ela.

## CSS Modules

Atualmente, os estilos estão em `src/App.css` e `src/index.css`, portanto ainda são globais. O briefing exige CSS Modules. A organização da coluna “CSS Module planejado” é uma proposta para a migração; os módulos correspondentes ainda não foram criados. `index.css` poderá permanecer apenas com estilos globais mínimos, como reset e variáveis de tema, se isso fizer sentido após a migração.

## Convenções

- Componentes de interface são funções React com nomes em PascalCase.
- Cada componente é exportado e importado explicitamente.
- Props configuram os componentes e fornecem dados; estado guarda dados que mudam durante o uso.
- Listas de opções são renderizadas a partir dos dados recebidos, com uma `key` estável por item.
- Lógica de API, processamento e exportação poderá ser extraída para `services`, `hooks` e `utils` quando essas responsabilidades forem implementadas.
