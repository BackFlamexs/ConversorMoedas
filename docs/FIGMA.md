# Protótipos no Figma

## Arquivos de referência

Os layouts foram preparados como SVGs vetoriais para serem importados e organizados no Figma. Eles usam a paleta azul e branca do projeto e representam a estrutura proposta para desktop e celular.

| Arquivo | Conteúdo | Dimensões |
| --- | --- | --- |
| `docs/figma/wireframe-desktop.svg` | Wireframe de baixa fidelidade para desktop. | 1440 × 1500 px |
| `docs/figma/wireframe-mobile.svg` | Wireframe de baixa fidelidade para celular. | 390 × 1900 px |
| `docs/figma/prototype-desktop.svg` | Interface de média fidelidade para desktop. | 1440 × 1700 px |
| `docs/figma/prototype-mobile.svg` | Interface de média fidelidade para celular. | 390 × 2340 px |
| `docs/figma/ui-states.svg` | Referências de carregamento, erro e ausência de dados. | 1440 × 620 px |

Os valores de cotação e algumas datas mostrados nos layouts são apenas conteúdo ilustrativo para preencher o protótipo; não representam cotações reais.

## Como importar

1. Crie um arquivo no Figma chamado **Currency Exchange App**.
2. Crie páginas chamadas **Wireframes** e **Protótipo**.
3. Arraste os SVGs deste repositório para o canvas da página correspondente ou use a opção de inserir arquivo do Figma.
4. Posicione os wireframes na página **Wireframes** e as telas de média fidelidade e estados na página **Protótipo**.
5. Organize cada arte em um frame com o mesmo tamanho do SVG e nomeie os frames com o tipo de tela e dispositivo, por exemplo `Wireframe / Desktop` e `UI / Mobile`.
6. Revise fontes e quebras de texto após importar. Se necessário, desagrupe a arte importada para ajustar textos e elementos vetoriais.
7. Gere um link de compartilhamento com acesso de visualização e registre-o abaixo.

## Fluxos que o protótipo deve demonstrar

- Selecionar moedas, informar um valor, converter e inverter o par.
- Escolher um período histórico e observar a mudança do gráfico e da tabela.
- Aplicar e limpar filtros de data e cotação, combinar filtros e alterar ordenação.
- Baixar os registros filtrados em CSV.
- Perceber visualmente os estados de carregamento, erro e ausência de dados.
- Navegar pelos mesmos recursos em uma tela estreita, com rolagem vertical.

Para transformar as telas em protótipo navegável, conecte os controles relevantes às telas ou estados correspondentes no modo **Prototype** do Figma. Os SVGs são a base visual; eles não contêm interações implementadas.

## Link e evidências

- **Arquivo Figma:** [Currency Exchange App Prototype](https://www.figma.com/make/LozXhPWO2w6F5opNgIZ7NQ/Currency-Exchange-App-Prototype?t=yn6ncUYJk8CCZqrb-20&fullscreen=1), compartilhado pelo autor do projeto.
- **Evidências no repositório:** as capturas foram visualizadas nesta revisão, mas ainda não foram salvas na pasta do projeto. Adicionar exportações PNG ou PDF em `docs/figma/evidencias/` quando disponíveis.

## Revisão visual

Em 18/10/2026, foram revisadas capturas da visualização desktop nos estados padrão, cobrindo o conversor, gráfico e tabela.

- A paleta azul e branca corresponde à identidade visual escolhida para a aplicação.
- O conversor apresenta origem, destino, valor, resultado, taxa e data efetiva; a interface identifica os valores como ilustrativos.
- O histórico mostra os oito períodos solicitados e um gráfico para o par ativo.
- A tabela contempla intervalo de datas, cotação mínima e máxima, limpeza de filtros, quantidade de resultados, ordenação e exportação CSV.
- A captura do menu também mostra opções para visualizar estados padrão, carregando, erro e sem dados.

### Revisões pendentes

- Conferir capturas das telas mobile e sua adaptação responsiva.
- Abrir e revisar visualmente os estados de carregamento, erro e ausência de dados.
- Confirmar no Figma que wireframes de baixa fidelidade e telas de média fidelidade estão organizados separadamente.
- Confirmar que os valores de exemplo permanecem identificados como fictícios e que os dados reais ocuparão esses mesmos espaços.

### Acesso nesta etapa

Em 25/10/2026, o link do arquivo Figma não pôde ser aberto pela ferramenta web disponível nesta sessão, e não há integração Figma conectada. Portanto, as telas mobile, a separação entre páginas e os estados no arquivo vivo não foram revisados nesta etapa. Os SVGs locais podem ser consultados, mas não substituem a revisão do arquivo Figma nem evidências exportadas. As capturas continuam pendentes em `docs/figma/evidencias/`.
