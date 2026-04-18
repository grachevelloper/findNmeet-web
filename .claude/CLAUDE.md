# FinDnMeeT Web

## Stack
- React 19 + TypeScript + Vite 8
- pnpm (always use pnpm, never npm/yarn)
- FSD (Feature-Sliced Design) architecture
- React Compiler enabled (babel-plugin-react-compiler)

## Architecture: FSD Layers
```
src/
  app/          # init: providers, router, styles
  pages/        # route-level components
  widgets/      # composite UI blocks
  features/     # user interactions
  entities/     # business entities (user, event)
  shared/       # reusable: api, lib, ui, config, types
```

FSD rule: layers import only from layers below them. No cross-imports within the same layer.

## Key Files
- `src/app/providers/index.tsx` — AppProviders (AntD → QueryClient → RouterProvider)
- `src/app/router.tsx` — createBrowserRouter, maps URLs to pages/
- `src/shared/api/axios.ts` — axios instance (Bearer token + 401 handler)
- `src/shared/lib/index.ts` — barrel: useCookie, useLocalStorage, useSessionStorage

## Commands
```
pnpm dev       # dev server
pnpm build     # tsc -b && vite build
pnpm lint      # eslint
```

## Conventions
- Barrel exports via index.ts in every FSD slice
- Hooks: [value, setter, remover] tuple pattern
- Env vars: VITE_API_URL for backend base URL
- Token stored in localStorage under key "token"
- Husky: pre-commit runs eslint, pre-push runs build
