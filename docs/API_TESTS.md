# Investigação da API Frankfurter no Postman

## Objetivo

Investigar a disponibilidade de moedas, uma cotação de par e uma série histórica antes de integrar a API ao React. Registrar as respostas reais observadas no Postman, incluindo status HTTP, formato do JSON, erros e comportamento em datas sem cotação.

## Referência da API

- Documentação oficial: [Frankfurter API v2](https://frankfurter.dev/)
- API pública: `https://api.frankfurter.dev`
- As requisições abaixo usam `GET` e não precisam de chave de autenticação.
- A documentação atual apresenta a v2 como versão principal e informa que a v1 está depreciada, embora continue funcionando.

## Configuração no Postman

1. Crie uma collection chamada **Currency Exchange App — Frankfurter API**.
2. Para cada caso abaixo, crie uma requisição `GET` com a URL indicada.
3. Não configure autenticação, body ou headers especiais para as respostas JSON iniciais.
4. Envie cada requisição e registre o status HTTP, a data do teste, uma amostra da resposta e o que foi observado.
5. Ao concluir, exporte a collection em JSON e salve-a em `docs/postman/`.

## Casos iniciais

| ID | Investigação | Requisição | Resultado esperado pela documentação | Status do teste |
| --- | --- | --- | --- | --- |
| API-01 | Consultar moedas disponíveis. | `GET https://api.frankfurter.dev/v2/currencies` | JSON em formato de lista, com metadados de cada moeda, incluindo código ISO e nome. Confirmar que BRL, EUR e USD aparecem. | Executado: 200 OK |
| API-02 | Consultar a cotação mais recente de EUR para USD. | `GET https://api.frankfurter.dev/v2/rate/eur/usd` | Um objeto JSON com data, moeda base, moeda cotada e taxa. Registrar a data realmente retornada; ela pode não ser a data do calendário atual. | Executado: 200 OK |
| API-03 | Consultar uma série histórica EUR para USD. | `GET https://api.frankfurter.dev/v2/rates?from=2026-10-01&to=2026-10-15&base=EUR&quotes=USD` | Lista de observações com data, moeda base, moeda cotada e taxa. Conferir a estrutura e as datas incluídas. | Executado: 200 OK; 15 registros, inclusive datas de fim de semana |
| API-04 | Observar datas de fim de semana em um intervalo curto. | `GET https://api.frankfurter.dev/v2/rates?from=2026-10-09&to=2026-10-12&base=EUR&quotes=USD` | Registrar quais datas aparecem e as taxas correspondentes, sem presumir o comportamento antes da resposta. | Executado: 200 OK; 4 registros, inclusive sábado e domingo |
| API-05 | Verificar o tratamento de um código de moeda inválido. | `GET https://api.frankfurter.dev/v2/rate/xxx/usd` | Registrar status HTTP e corpo da resposta de erro, sem presumir previamente o formato. | Executado: 422; erro JSON registrado |

## Registro dos resultados

Resultados registrados a partir das respostas recebidas do Postman. A collection exportada está em `docs/postman/Frankfurter-API.postman_collection.json` e contém as cinco requisições documentadas acima.

| ID | Data do teste | Status HTTP | Observação / trecho da resposta |
| --- | --- | --- | --- |
| API-01 | 18/10/2026 | 200 OK | A resposta recebida é uma lista de objetos com `iso_code`, `iso_numeric`, `name`, `symbol`, `start_date` e `end_date`. Foram encontrados BRL, EUR e USD. Alguns códigos têm `symbol` ou `iso_numeric` vazio/nulo; a lista também inclui metais preciosos, como XAU e XAG. |
| API-02 | 18/10/2026 | 200 OK | JSON: `{"date":"2026-10-19","base":"EUR","quote":"USD","rate":1.1234}`. `base` é a moeda de origem, `quote` é a moeda de destino e `rate` indica quantas unidades de USD correspondem a 1 EUR. A data retornada (19/10/2026) está um dia à frente da data local desta sessão (18/10/2026); investigar o contexto de data e publicação da API antes de definir a apresentação. |
| API-03 | 18/10/2026 | 200 OK | Retornou 15 objetos no intervalo de 01/10/2026 a 15/10/2026, cada um com `date`, `base`, `quote` e `rate`. A resposta inclui datas de fim de semana (03, 04, 10 e 11/10); em 10 e 11/10, a taxa retornada foi 1.122. O teste curto API-04 também retornou as duas datas do fim de semana. |
| API-04 | 18/10/2026 | 200 OK | Retornou 4 objetos para 09, 10, 11 e 12/10/2026. Taxas: 1.1217, 1.122, 1.122 e 1.1203, respectivamente. O retorno inclui sábado e domingo, com a mesma taxa nos dias 10 e 11. A resposta isolada não esclarece se o valor foi repetido pela fonte ou por outra regra; não inferir isso sem validação adicional. |
| API-05 | 18/10/2026 | 422 | JSON: `{"status":422,"message":"invalid currency: XXX"}`. A API sinaliza código inválido com HTTP 422 e uma mensagem identificando a moeda. |

## Observações de implementação a confirmar

- A aplicação calcula o valor convertido no navegador usando o valor informado e a taxa retornada; a API fornece a taxa, não o valor convertido.
- A aplicação deve mostrar a data efetiva associada à taxa recebida.
- Os intervalos históricos devem ser montados com as datas efetivamente retornadas pela API. Não preencher fins de semana ou feriados com cotações inventadas.
- O formato observado para uma taxa única e para um histórico será usado para definir a transformação de dados antes do consumo em React.
- Mensagens e comportamento para códigos inválidos devem ser definidos a partir do status e do corpo de erro observados.
