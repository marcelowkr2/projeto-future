## Instruções de uso.<br>

- Tenha em sua máquina instalado uma versão do Python.<br>
- Faça download nesse link https://www.python.org/downloads/<br>
- Baixe o projeto em sua máquina e desconpacte<br>
- Abra o projeto no Vscode ou outra IDE de sua preferência.
- No terminal do Vscode acesse os diretórios Backend e Frontend
- Ex: PS C:\Users\seu-usuario\diretorio-do-projeto\cybersec-project> cd backend  e em outro terminal cd frontend.<br>
- Em PS C:\Users\ResTIC16\Documents\cybersec-project\backend> pip install "Esse comando vai instalar as depepndencias do Python"
- Em PS C:\Users\ResTIC16\Documents\cybersec-project\frontend> npm install "Esse comando vai instalar as dependencias do React"
- Para subir o servidor local no Backend PS C:\Users\ResTIC16\Documents\cybersec-project\backend> python manage.py runserver
- Para subir o servidor local Frontend PS C:\Users\ResTIC16\Documents\cybersec-project\frontend> npm run dev
- Acesse seu navegador localhost:3000


## Estrutura do Projeto.
```
/cybersec-maturity-platform
│── backend/                  # Diretório do Backend (Django)
│   ├── config/               # Configurações do Django (settings, urls, wsgi, asgi)
│   ├── core/                 # Aplicação principal com autenticação e permissões
│   ├── assessments/          # Módulo de avaliação de maturidade
│   ├── reports/              # Módulo de geração de relatórios
│   ├── compliance/           # Módulo de conformidade e normas (NIST, ISO, LGPD, etc.)
│   ├── users/                # Gerenciamento de usuários e permissões
│   ├── api/                  # Definição das APIs REST usando Django Rest Framework
│   ├── tests/                # Testes unitários e de integração
│   ├── manage.py             # Arquivo de gerenciamento do Django
│   ├── requirements.txt      # Dependências do backend
│   ├── .env                  # Variáveis de ambiente (Banco, API Keys, JWT Secret)
│
frontend/                 # Diretório do Frontend (React/Next.js)
│  ├── components/        # Componentes reutilizáveis
│  │   ├── ui/            # Botões, Inputs, Modais
│  │   ├── forms/         # Formulários e validações
│  │   ├── charts/        # Gráficos e visualizações
│  ├── context/           # Context API para gerenciar estados globais
│  ├── hooks/             # Hooks personalizados para autenticação, estado
│  ├── pages/             # Páginas principais (Dashboard, Relatórios, Configurações)
│  ├── services/          # Consumo da API (axios/fetch)
│  ├── utils/             # Funções auxiliares e helpers
│  ├── config/            # Configurações globais, como URLs da API
│  ├── assets/            # Ícones, imagens, estilos globais
│  ├── styles/            # Arquivos CSS/SASS
│  ├── next.config.js     # Configuração do Next.js
│  ├── package.json       # Dependências do frontend
│
│── database/                 # Scripts e migrações do Banco de Dados
│   ├── migrations/           # Migrações geradas pelo Django
│   ├── seed_data.py          # Script para popular o banco com dados iniciais
│
│── infra/                    # Infraestrutura e DevOps
│   ├── docker/               # Configuração do Docker para o projeto
│   ├── nginx/                # Configuração do Nginx para deploy
│   ├── terraform/            # Scripts IaC para provisionamento de infraestrutura na cloud
│
│── docs/                     # Documentação do Projeto
│   ├── API_Documentation.md  # Documentação das APIs REST
│   ├── System_Architecture.md # Arquitetura do sistema
│   ├── Compliance_Guide.md   # Diretrizes para conformidade com normas (NIST, ISO, etc.)
│
│── tests/                    # Testes automatizados e manuais
│   ├── backend_tests/        # Testes unitários e de integração do backend
│   ├── frontend_tests/       # Testes unitários e e2e do frontend
│   ├── security_tests/       # Testes de segurança (Pentests, validação LGPD/GDPR)
│
│── .gitignore                # Arquivos ignorados pelo Git
│── docker-compose.yml        # Arquivo de configuração para rodar com Docker
│── README.md                 # Instruções gerais do projeto
```
