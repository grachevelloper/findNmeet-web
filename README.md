## FindNMeet Web

### Local Auth Dev

Frontend runs separately from backend compose.

1. Add this host entry:

```text
127.0.0.1 local.findnmeet.ru
```

2. Start the frontend from this repo:

```bash
pnpm dev
```

This uses Vite mode `dev`, so values are loaded from `.env.dev`.

3. Start backend infrastructure and services from `findNmeet-back`:

```bash
pnpm dev:stack
```

4. Open `https://local.findnmeet.ru`.

Vite itself stays on plain HTTP at host port `5173`. Backend `nginx` listens on ports `80` and `443`, redirects `80` to HTTPS, terminates TLS for `local.findnmeet.ru`, proxies `/` to the Vite dev server on `http://host.docker.internal:5173`, and proxies `/api/v1/` to `api-gateway` inside Docker.
