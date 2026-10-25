# Guia de continuidade — Currency Exchange App

Este arquivo registra o estado do projeto, o que já foi feito e os próximos passos. Consulte-o ao retomar o trabalho para continuar do ponto correto sem refazer etapas.

## Como continuar

1. Leia este documento e confira `git status` antes de editar.
2. Continue pelo próximo item da lista, explicando a implementação em etapas para que o funcionamento e os conceitos de React fiquem claros.
3. Ao concluir uma etapa, apresente como conferir o resultado e avise que é um ponto de commit.
4. **O usuário faz todos os commits e pushes. Não executar commit ou push.** Usar mensagens de commit em português.

## Estado atual

- Aplicação React 19 + Vite na branch `main`.
- A instalação de Recharts foi concluída. Dependência registrada como `recharts` em `package.json` e `package-lock.json`.
- O gráfico histórico já compilou com `npm.cmd run build`. O build apresentou um aviso de bundle acima de 500 kB; não bloqueou a compilação e pode ser avaliado depois.
- Último commit observado: `8daf25d refactor: migra estilos para CSS Modules`.
- Na última conferência, `main` estava sincronizada com `origin/main`; `docs/CONTINUATION.md` permanecia não rastreado. Confirmar o estado real do Git ao retomar.
- Não há commit automático. Confirmar o estado real do Git ao retomar, pois ele pode ter mudado.

## Funcionalidades já implementadas

- Interface inicial azul e branca em React/JSX, com componentes `Header`, `Hero`, `ConverterForm`, `ResultPanel` e `PageFooter`.
- Lista de moedas carregada por `fetch` da Frankfurter, com loading, erro e tentativa de recarga.
- Cotação atual consultada para o par selecionado; conversão calculada no navegador com a taxa recebida; exibição da taxa e da data efetiva.
- Inversão de moedas. O par está elevado ao `App` e chega por props ao formulário e à análise histórica.
- Histórico da Frankfurter nos períodos de 7, 15 e 30 dias; 3 e 6 meses; 1, 5 e 10 anos.
- Gráfico de linha com Recharts e tabela de registros históricos com data, moeda de origem, moeda de destino e cotação.
- Filtros combináveis de data inicial/final e cotação mínima/máxima, validação dos intervalos, limpeza e contagem de resultados. Os filtros afetam a tabela; o gráfico mantém a série completa.
- Ordenação crescente/decrescente por data ou cotação, aplicada após os filtros.
- Exportação CSV no navegador da mesma lista filtrada e ordenada mostrada na tabela; botão desativado sem resultados.
- Estados de loading, erro e ausência de registros para as consultas históricas.
- Hooks `useCurrencies` e `useHistoricalRates` para encapsular consultas e estados.
- CSS Modules por componente; `index.css` guarda apenas estilos globais básicos.
- `docs/REQUIREMENTS.md`, `docs/COMPONENTS.md`, `docs/FIGMA.md`, `docs/API_TESTS.md` e collection do Postman em `docs/postman/`.
- Wireframes e protótipos SVG desktop/mobile, além de SVG com estados de interface, em `docs/figma/`.

## Próximo passo de implementação

### Revisão final do Figma

Revisar as telas mobile, os estados de carregamento/erro/sem dados, a separação entre wireframe e protótipo e os exemplos fictícios. O link do Figma não ficou acessível pela ferramenta desta sessão; retomar quando houver capturas/exportações do arquivo ou acesso compatível. Não criar evidências que pareçam capturas reais sem obtê-las do Figma.

## Demais pendências do escopo

### Arquitetura e organização

- [x] Criar hooks customizados `useCurrencies` e `useHistoricalRates` para encapsular consultas e estados.
- [x] Migrar estilos para CSS Modules por componente e manter em `src/index.css` apenas regras globais básicas.
- [x] Revisar `docs/COMPONENTS.md` depois da extração dos hooks e da migração dos estilos.

### Testes e validação

- [x] Planejar validação/testes das funções de cálculo, intervalos de data, filtros, ordenação e exportação; o projeto ainda não tem framework de testes configurado.
- [x] Criar `docs/FUNCTION_TESTS.md` com funções/casos/entradas/resultados e estado de execução.
- [x] Conferir conversão, inversão, troca de par, todos os períodos, filtros individuais/combinados, limpeza, ordenação e CSV. Validação manual informada pelo usuário em 25/10/2026; detalhes individuais em `docs/FUNCTION_TESTS.md`.
- [x] Conferir entrada vazia, zero, negativa, valores decimais, moeda igual, API indisponível, erro HTTP, resposta vazia e períodos longos. Validação manual informada pelo usuário em 25/10/2026; detalhes individuais em `docs/FUNCTION_TESTS.md`.
- [x] Conferir responsividade e estados de loading/erro/sem dados em desktop e celular. Validação manual informada pelo usuário em 25/10/2026; detalhes individuais em `docs/FUNCTION_TESTS.md`.
- [x] Rodar build e lint após as alterações desta etapa. Ambos passaram em 25/10/2026; o build mantém aviso de bundle acima de 500 kB. Não afirmar que algo foi testado sem executá-lo.

### Figma e documentação

- [ ] Revisar no Figma as telas mobile, os estados de loading/erro/sem dados e a separação entre wireframe e protótipo; `docs/FIGMA.md` registra essas conferências como pendentes.
- [ ] Salvar capturas/exportações de evidência em `docs/figma/evidencias/` e referenciá-las em `docs/FIGMA.md`.
- [x] Criar `docs/AI_USAGE.md` com registro transparente do uso de IA neste ciclo.
- [x] Atualizar o `README.md` com funcionalidades implementadas, arquitetura real, instruções e protótipos visuais locais. Capturas reais da aplicação ainda dependem de exportação após revisão visual.
- [x] Revisar links/nomes da API no README para refletir a Frankfurter v2 em uso.
- [x] Manter `docs/API_TESTS.md` e a collection do Postman alinhados com as chamadas efetivamente usadas; corrigido também o título do caso API-03.

### Ponto de atenção sobre datas da API

No teste Postman de 18/10/2026, a consulta de cotação mais recente EUR/USD devolveu `date: 2026-10-19`. A documentação oficial do projeto explica que o relógio da API é UTC, as observações seguem os calendários das fontes e alguns provedores publicam datas do dia seguinte. O provedor daquele resultado não foi registrado; preservar a data devolvida pela API e não atribuir a observação a uma fonte específica sem evidência. A análise está em `docs/API_TESTS.md`.

## Estrutura relevante atual

```text
src/
  components/
    ConverterForm.jsx
    HistorySection.jsx
    ResultPanel.jsx
    Header.jsx
    Hero.jsx
    PageFooter.jsx
  services/
    frankfurter.js
  hooks/
    useCurrencies.js
    useHistoricalRates.js
  utils/
    dateRanges.js
  App.jsx
  App.module.css
  index.css
docs/
  API_TESTS.md
  COMPONENTS.md
  FIGMA.md
  FUNCTION_TESTS.md
  REQUIREMENTS.md
  postman/Frankfurter-API.postman_collection.json
  figma/
```

## Comandos úteis no PowerShell

Neste ambiente, `npm` pode ser bloqueado pela política de execução do PowerShell. Use `npm.cmd`:

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
```

## Mensagem para retomar

> Vamos continuar o Currency Exchange App. Leia `docs/CONTINUATION.md`, confira o estado atual do Git e siga o próximo passo: concluir a revisão do Figma e salvar evidências reais. O link ainda não ficou acessível; não invente capturas. Explique cada parte e não faça commit ou push; eu mesmo farei os commits.
