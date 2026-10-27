#Test Automation Suite — Embarca API

Proposta de automação de testes E2E e integração para serviços da **Embarca**, focada na validação de endpoints REST, regras de negócio para reserva e emissão de passagens, e consistência de dados.

---

## Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e Configuração](#-instalação-e-configuração)
- [Executando os Testes](#-executando-os-testes)
- [Relatórios](#-relatórios)
- [Autor](#-autor)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem**: Node.js / JavaScript
- **Framework de Testes**: [Cypress](https://www.cypress.io/) 
- **CI/CD**: GitHub Actions

---

## Estrutura do Projeto

```text
.
├── .github/
│   └── workflows/          # Workflows de CI/CD (GitHub Actions)
├── cypress/                # ou src/ / tests/
│   ├── e2e/                # Especificações e cenários (.feature ou .spec.js)
│   ├── fixtures/           # Massas de dados estáticas (JSON)
│   ├── support/            # Commands, utilitários e Page Objects / API Helpers
│   └── config/             # Configurações de ambiente (dev, hml, prod)
├── .gitignore              # Arquivos e pastas ignorados no versionamento
├── cypress.config.js       # Configurações gerais do Cypress
├── package.json            # Dependências e scripts de execução
└── README.md               # Documentação do projeto

📋 Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (versão >= 18.x)

npm ou yarn

Git
- Instalação e Configuração
Clone o repositório:

Bash
git clone [https://github.com/BrunoNunes96/test-embarca.git](https://github.com/BrunoNunes96/test-embarca.git)
cd test-embarca
Instale as dependências:

Bash
npm install
Configure as variáveis de ambiente:
Crie um arquivo .env na raiz do projeto (com base no .env.example, se disponível) definindo a URL base e credenciais necessárias:

Snippet de código
BASE_URL=[https://api-hml.embarca.com.br](https://api-hml.embarca.com.br)
API_KEY=sua_chave_aqui
🧪 Executando os Testes
Executar todos os testes em modo headless (CLI):

Bash
npm run test
Abrir a interface interativa (Cypress Runner):

Bash
npm run test:open
Executar em um ambiente específico (ex: HML):

Bash
npm run test:hml

- Relatórios
Após a execução dos testes, o relatório de execução é gerado automaticamente na pasta:

- Plaintext
cypress/reports/html/index.html
Abra o arquivo index.html no seu navegador para visualizar o status de cada cenário, tempos de resposta e falhas detalhadas.

- Autor
Desenvolvido por Bruno Nunes.

GitHub: @BrunoNunes96
