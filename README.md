# Elements AI Demo

[Next.js](https://nextjs.org/) application demonstrating implementation of an [Elements](https://elements.surge.studio) AI visual using [Rive](https://rive.app).

## AI visual

The component `/components/ai-visual.tsx` renders the visual element with `useRive` from `@rive-app/react-canvas-lite`.

The AI visual 'Command' is included in this repo at `/public/command-1.0.0-preview.riv`.

[Elements](https://elements.surge.studio) AI visuals are all setup in a similar way with matching state machines.

Command as an example supports 4 different states: `listening`, `thinking`, `speaking`, `asleep`. By default it can also be configured into 10 different colors. See the enum in `ai-visual.tsx` or visit the website for details.

## Development

Rename `.env.example` and populate environment variables.

Install with `pnpm i` and run development environment with `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) with your browser.

We do not recommend using this repo as a starting template. Please see [Next.js AI Chatbot](https://vercel.com/templates/next.js/nextjs-ai-chatbot) and [Next Forge](https://github.com/haydenbleasel/next-forge) for more complete and fully featured application examples.

## Learn more

Learn more about the different parts of this application:

- [Rive Guide](https://help.rive.app/getting-started/introduction) - learn about the Rive application and features.
- [Rive Runtimes](https://rive.app/runtimes) - learn about Rive Runtimes.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - An open source library for building AI-powered user interfaces.
