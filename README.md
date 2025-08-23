# Workhub App

Workhub é uma plataforma para encontrar e reservar espaços de coworking. Este projeto é construído com [Next.js](https://nextjs.org) e utiliza o App Router.

## Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar a manutenção e escalabilidade:

```
app/
├── actions/         # Server actions para busca de dados
├── api/             # Rotas de API
├── components/      # Componentes React
│   ├── layout/      # Componentes de layout (Container, ClientOnly)
│   ├── listings/    # Componentes relacionados a listagens
│   ├── map/         # Componentes de mapa
│   ├── modals/      # Componentes de modal
│   ├── ui/          # Componentes de UI reutilizáveis
│   │   ├── buttons/ # Botões (Button, HeartButton)
│   │   ├── feedback/# Componentes de feedback (EmptyState, ErrorMessage)
├── hooks/           # Custom hooks
├── libs/           # Bibliotecas e configurações
│   ├── api/         # Funções de API
│   ├── cloudinary/  # Configuração do Cloudinary
│   ├── db/          # Configuração do Prisma
├── providers/       # Provedores de contexto
├── types/           # Definições de tipos TypeScript
├── utils/           # Funções utilitárias
```

## Diretrizes de Código

- **TypeScript**: Use tipos explícitos e evite `any`
- **Componentes**: Prefira componentes funcionais com hooks
- **Estilização**: Use Tailwind CSS para estilização
- **Importações**: Organize as importações em grupos (built-in, externos, internos)
- **Nomeação**: Use PascalCase para componentes e camelCase para funções

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
