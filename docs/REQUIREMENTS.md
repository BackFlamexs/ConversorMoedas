# Requisitos do Currency Exchange App

## 1. Contexto

O projeto propõe uma Single Page Application (SPA) para reunir em uma única interface a consulta de taxas de câmbio, a conversão de valores e a análise histórica de um par de moedas. A aplicação será desenvolvida individualmente com React e consumirá a API Frankfurter, sem back-end próprio.

## 2. Público-alvo

Pessoas que precisam consultar ou comparar valores entre moedas e analisar a variação histórica de uma taxa de câmbio. A aplicação tem finalidade informativa e educacional; não realiza operações financeiras.

## 3. Objetivo

Permitir que a pessoa usuária selecione moedas, converta um valor com uma taxa obtida da API Frankfurter e analise a evolução histórica dessa taxa em um gráfico e em uma tabela. Os registros da tabela poderão ser filtrados, ordenados e exportados em CSV.

## 4. Escopo

### Incluído

- Conversão entre moedas disponíveis na API Frankfurter.
- Exibição do valor convertido, da taxa usada e da data efetiva da cotação.
- Inversão entre as moedas de origem e destino.
- Histórico do par selecionado nos períodos de 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos e 10 anos.
- Visualização do histórico em gráfico e tabela.
- Filtros combináveis por intervalo de datas e por cotação mínima e máxima.
- Ordenação por data e por cotação.
- Exportação dos registros filtrados para CSV no navegador.
- Estados de carregamento, erro, dados vazios e validação de entrada.
- Interface responsiva para desktop e celular.

### Fora do escopo

- Autenticação ou cadastro de usuários.
- Back-end próprio ou banco de dados.
- Pagamentos, compra, venda ou execução de operações cambiais.

## 5. Requisitos funcionais

| ID | Requisito |
| --- | --- |
| RF-01 | A aplicação deve consultar e apresentar as moedas disponíveis na API Frankfurter. |
| RF-02 | A pessoa usuária deve poder selecionar uma moeda de origem e uma moeda de destino. |
| RF-03 | A pessoa usuária deve poder informar o valor que deseja converter. |
| RF-04 | A aplicação deve obter a taxa do par selecionado e calcular o valor convertido no navegador a partir dessa taxa. |
| RF-05 | O resultado deve apresentar o valor convertido, a taxa utilizada e a data efetiva informada pela API. |
| RF-06 | A pessoa usuária deve poder inverter as moedas de origem e destino. |
| RF-07 | A aplicação deve validar valores vazios, não numéricos, iguais ou inferiores a zero e impedir uma conversão inválida. |
| RF-08 | A pessoa usuária deve poder selecionar um dos períodos: 7 dias, 15 dias, 30 dias, 3 meses, 6 meses, 1 ano, 5 anos ou 10 anos. |
| RF-09 | O gráfico e a tabela devem atualizar quando o par de moedas ou o período selecionado mudar. |
| RF-10 | O gráfico deve representar as cotações históricas retornadas para o par e período selecionados. |
| RF-11 | A tabela deve apresentar, no mínimo, data, moeda de origem, moeda de destino e cotação. |
| RF-12 | A tabela deve permitir filtrar os registros por data inicial e final. |
| RF-13 | A tabela deve permitir filtrar os registros por cotação mínima e máxima. |
| RF-14 | Os filtros de data e cotação devem poder ser aplicados em conjunto e limpos. |
| RF-15 | A tabela deve permitir ordenar os registros por data e por cotação. |
| RF-16 | A aplicação deve informar a quantidade de registros após a aplicação dos filtros. |
| RF-17 | A pessoa usuária deve poder exportar para CSV somente os registros que correspondam aos filtros ativos. |
| RF-18 | O CSV deve conter cabeçalhos, ser gerado no navegador e ter um nome de arquivo identificável. |
| RF-19 | A exportação deve ser impedida quando não houver registros correspondentes aos filtros. |
| RF-20 | A aplicação deve informar visualmente os estados de carregamento, erro e ausência de dados, sem confundi-los entre si. |

## 6. Requisitos não funcionais

| ID | Requisito |
| --- | --- |
| RNF-01 | A aplicação deve ser uma SPA implementada com React, JSX e Vite. |
| RNF-02 | A interface deve funcionar em desktop e celular, adaptando os componentes a telas estreitas. |
| RNF-03 | Os estilos dos componentes devem ser organizados com CSS Modules. |
| RNF-04 | A comunicação com a API deve usar `fetch` e `async/await`, com tratamento de falhas. |
| RNF-05 | Os controles devem possuir rótulos e estados perceptíveis, incluindo foco de teclado e mensagens de validação. |
| RNF-06 | A lógica de apresentação deve permanecer no navegador; não deve depender de um back-end próprio ou banco de dados. |
| RNF-07 | O código deve manter responsabilidades claras entre interface, acesso à API e funções de processamento. |
| RNF-08 | O repositório deve documentar instalação, execução, arquitetura, requisitos, testes e uso de IA conforme os entregáveis do projeto. |

## 7. Regras de negócio

1. A lista de moedas oferecida deve corresponder às moedas disponibilizadas pela API consultada.
2. O valor informado deve ser numérico, finito e maior que zero para permitir conversão.
3. O valor convertido deve ser calculado pela aplicação usando o valor informado e a taxa retornada pela API.
4. A data exibida deve ser a data efetiva da cotação retornada pela API; não se deve apresentar automaticamente a data atual como data da taxa.
5. Gráfico, tabela e conversor devem representar o mesmo par de moedas selecionado.
6. Os períodos de análise disponíveis são exatamente os oito períodos definidos no requisito RF-08.
7. Datas sem cotação publicada não devem ser inventadas ou preenchidas com valores fabricados. A resposta real da API para finais de semana, feriados e intervalos sem dados será investigada no Postman e registrada em `docs/API_TESTS.md`.
8. Os filtros de data e de cotação devem atuar sobre o mesmo conjunto de registros e sua combinação deve produzir a interseção dos critérios selecionados.
9. A data inicial do filtro não pode ser posterior à data final. A cotação mínima não pode ser maior que a cotação máxima. Se uma combinação for inválida, a interface deve explicar o problema e não deve exportar registros incorretos.
10. A ordenação altera apenas a ordem de apresentação; não deve alterar os valores dos registros.
11. A exportação deve usar o conjunto já filtrado e ordenado, conter cabeçalho e não deve ser oferecida quando o conjunto estiver vazio.
12. A aplicação é informativa: as cotações não executam compra, venda ou transferência de dinheiro.

## 8. Critérios de aceite

- [ ] A lista de moedas é carregada da API; durante a consulta, a interface apresenta carregamento e, em caso de falha, apresenta erro compreensível.
- [ ] Uma conversão válida exibe o valor calculado, a taxa efetivamente usada e a data retornada pela API.
- [ ] Entradas vazias, inválidas ou menores ou iguais a zero não geram conversão e recebem mensagem de validação.
- [ ] Inverter as moedas troca origem e destino e atualiza os dados correspondentes.
- [ ] Cada um dos oito períodos pode ser selecionado e atualiza o gráfico e a tabela para o par ativo.
- [ ] Gráfico e tabela refletem dados retornados pela API, inclusive quando não houver registros para o período.
- [ ] A tabela apresenta data, origem, destino e cotação, e permite combinar os filtros de data e cotação.
- [ ] A pessoa usuária consegue limpar filtros, ordenar por data e por cotação e ver a quantidade de registros encontrados.
- [ ] O CSV contém cabeçalhos e somente os registros filtrados; possui nome identificável e não pode ser baixado quando não houver resultados.
- [ ] A aplicação apresenta estados distintos de carregamento, erro e ausência de dados.
- [ ] A interface permanece utilizável em desktop e celular.
- [ ] Uma nova pessoa consegue instalar e executar o projeto seguindo as instruções do README.

## 9. Decisões pendentes de validação

- Confirmar no Postman os endpoints, parâmetros, estrutura das respostas e erros relevantes da API Frankfurter.
- Confirmar como a API representa períodos sem cotação, incluindo finais de semana e feriados, antes de finalizar o comportamento de datas e mensagens.
- Definir no protótipo a disposição final do conversor, gráfico, tabela, filtros e estados da interface.
- Definir e documentar convenções do CSV, incluindo separador, codificação e formato de data, antes da implementação da exportação.
