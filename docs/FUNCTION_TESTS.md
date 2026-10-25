# Testes funcionais

Este documento registra verificações de funções e cenários da interface do Currency Exchange App. O projeto ainda não tem um framework de testes configurado. Os resultados são separados entre verificações executadas por comando e conferências manuais pendentes; um caso não é considerado aprovado sem execução.

## Verificações executadas

| ID | Função/cenário | Entrada | Resultado observado | Método |
| --- | --- | --- | --- | --- |
| FT-01 | Intervalos de todos os períodos | Referência `2026-10-25`; `7d`, `15d`, `30d`, `3m`, `6m`, `1y`, `5y`, `10y` | Aprovado em 25/10/2026; os oito intervalos corresponderam aos limites esperados. | Script Node com data fixa e comparação dos limites. |
| FT-02 | Rejeição de período desconhecido | `2w` | Aprovado em 25/10/2026; `getDateRange` lançou erro de período inválido. | Script Node verificou a exceção. |
| FT-03 | Build de produção | Aplicação completa | Aprovado em 25/10/2026; permanece o aviso do bundle JavaScript acima de 500 kB. | `npm.cmd run build` após as mudanças de CSS Modules. |
| FT-04 | Lint | Aplicação completa | Aprovado em 25/10/2026. | `npm.cmd run lint` após as mudanças de CSS Modules. |

## Conferências manuais pendentes

Conferência manual concluída pelo usuário em 25/10/2026, conforme relato durante a retomada do projeto. Os resultados individuais, cotações/par usados e eventuais falhas não foram detalhados nesta sessão; por isso não são inventados aqui.

| ID | Cenário | Passos/entradas | Resultado esperado |
| --- | --- | --- | --- |
| FT-05 | Conversão válida | Usar um valor positivo, por exemplo `100`, e um par distinto. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-06 | Entrada vazia, zero e negativa | Tentar enviar cada valor no campo de conversão. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-07 | Valor decimal | Converter um valor como `12.50`. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-08 | Moeda igual e inversão | Selecionar a mesma moeda nos dois lados; depois inverter um par distinto. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-09 | Atualização dos oito períodos | Selecionar `7d`, `15d`, `30d`, `3m`, `6m`, `1y`, `5y` e `10y`. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-10 | Filtros da tabela | Aplicar cada filtro separadamente e combinações; testar data inicial posterior à final e cotação mínima maior que a máxima. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-11 | Ordenação | Ordenar por data e cotação em ambas as direções, com filtros ativos. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-12 | Exportação CSV | Baixar CSV após filtrar e ordenar; repetir sem resultados. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-13 | Falhas e ausência de dados | Simular falha de rede/HTTP e consultar um intervalo sem resultados, quando possível. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |
| FT-14 | Responsividade e CSS Modules | Conferir conversor, gráfico, filtros, tabela e rodapé em desktop e viewport estreita. | Validado pelo usuário em 25/10/2026; resultado individual não detalhado. |

## Como registrar a execução manual

Se os detalhes forem necessários para rastreabilidade, completar cada ID manual com `Aprovado` ou `Falhou`, data, observações úteis, par e período usados e data retornada pela API. Para falhas de rede, descrever como foram simuladas. A validação manual acima foi registrada a partir do relato do usuário, não como execução do agente.
