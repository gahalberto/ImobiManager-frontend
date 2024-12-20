# ImobiManager - Frontend

O ImobiManager é um projeto frontend desenvolvido para gerenciar propriedades imobiliárias, integrando com o backend para fornecer uma interface intuitiva e eficiente para usuários. Este projeto utiliza o framework **Next.js 15**, juntamente com várias tecnologias modernas para criar uma experiência de usuário rica e segura.

## Principais Desafios 
Maior desafio foi instalar o NEXT15 e pesquisar as mudanças e melhorias, também foi um desafio trabalhar com imagens, eu tive mais desafios com o backend quando fui fazer testes com JEST E SUPERTEST, eu nunca trabalhei com essas ferramentas e foi um desafio, após assistir vídeos dos meus cursos na rocketseat + YouTube + alura, consegui trabalhar bem os testes mas foi um aprendizado incrível


## Índice

- [Visão Geral](#visão-geral)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)



## Melhoria e Nova Funcionalidade


 Uma melhoria importante do sistema é a **utilização do ChatGPT para criar descrições de imóveis utilizando técnicas avançadas de marketing**. Ao criar um novo imóvel no formulário, o usuário pode clicar em um botão para gerar automaticamente a descrição do imóvel com inteligência artificial, tornando o processo mais eficiente e garantindo uma abordagem atrativa para possíveis clientes.

<b>Para a utilização da função, criar a descrição com Inteligencia Artificial, precisa ter uma chave da API da OpenAI</b>

Também criei um dashboard com dois gráficos

## Tecnologias Utilizadas

- **Next.js 15**: Framework React para renderização de páginas do lado do servidor e cliente.
- **shadcn**: Biblioteca de componentes para estilização e design.
- **NextAuth**: Biblioteca para autenticação de usuários com suporte para provedores diversos.
- **React 19**: Biblioteca JavaScript para criação de interfaces de usuário.
- **Tailwind CSS**: Framework CSS para estilização rápida e eficiente.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Axios**: Cliente HTTP para comunicação com a API backend.
- **Zod**: Biblioteca de validação de dados.
- **Radix UI**: Conjunto de componentes acessíveis para criar uma interface de usuário consistente.
- **React Hook Form**: Gerenciamento de formulários de forma eficiente em React.
- **Recharts**: Biblioteca para criação de gráficos e visualização de dados.

## Estrutura de Diretórios

O projeto possui a seguinte estrutura de diretórios:

- **\_actions**: Contém funções reutilizáveis relacionadas a ações específicas da aplicação.
- **\_components**: Componentes reutilizáveis da aplicação.
- **\_lib**: Bibliotecas auxiliares para lógica compartilhada.
- **\_schemas**: Schemas de validação de dados usando Zod.
- **\_types**: Tipos TypeScript usados ao longo do projeto.
- **\_utils**: Funções utilitárias que são utilizadas em várias partes do código.
- **components**: Componentes específicos da aplicação.
- **pages**: Páginas da aplicação seguindo a estrutura do Next.js.
- **public**: Arquivos públicos, como imagens e ícones.
- **globals.css**: Arquivo global de estilos.
- **layout.tsx**: Layout principal da aplicação.
- **middleware.ts**: Middleware de controle de autenticação e permissões.
- **next.config.ts**: Configurações do Next.js.
- **tailwind.config.ts**: Configuração do Tailwind CSS.

## Capturas de Tela

### Página Inicial
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/home.png" alt="Home" width="200" />

### Dashboard
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/dashboard.png" alt="Dashboard" width="200" />

### Formulário de Cadastro
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/form.png" alt="Formulário" width="200" />
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/form2.png" alt="Formulário - Parte 2" width="200" />

### Página de Login
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/login.png" alt="Login" width="200" />

### Página de Registro
<img src="https://github.com/gahalberto/ImobiManager-frontend/blob/main/public/screenshots/register.png" alt="Registro" width="200" />



## Instalação

Para configurar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/imobimanager-frontend.git
   cd imobimanager-frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` baseado no `.env.example` para configurar as variáveis de ambiente.

## Uso

Para executar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

Para criar uma build de produção:

```bash
npm run build
```

Depois de criar a build, inicie a aplicação:

```bash
npm start
```

## Contribuição

Se desejar contribuir para o desenvolvimento do ImobiManager, siga as etapas abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'Minha nova feature'`
4. Envie para o seu fork: `git push origin minha-feature`
5. Abra um Pull Request.

## Licença

MIT License

---

Este é o frontend do ImobiManager, uma solução moderna para gerenciamento de propriedades imobiliárias. Fique à vontade para contribuir e melhorar o projeto!

