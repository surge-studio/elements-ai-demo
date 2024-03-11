# Elements AI Demo

[Next.js](https://nextjs.org/) application demonstrating implementation of an [Elements AI Visual](https://elements.surge.studio) using [Rive](https://rive.app).

## AI Visual

`/components/ai-visual.tsx` contains the component that renders the visual element using `useRive` from `@rive-app/react-canvas-lite`.

The AI visual 'Command' is included in this repo at `/public/command-1.0.0-preview.riv`.

## Development

Rename `.env.example` and populate environment variables.

Install with `pnpm i` and run development environment with `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Learn more

To learn more about the parts of this application read any of the following resources:

- [Rive Guide](https://help.rive.app/getting-started/introduction) - learn about the Rive application and features.
- [Rive Runtimes](https://rive.app/runtimes) - learn about Rive Runtimes.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Vercel AI SDK](https://sdk.vercel.ai/docs) - An open source library for building AI-powered user interfaces.
