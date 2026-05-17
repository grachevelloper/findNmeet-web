## FindNMeet Web

### Local Auth Dev

Frontend runs separately from backend compose.

1. Add this host entry:

```text
127.0.0.1 local.findnmeet.ru
```

2. Start the frontend from this repo:

```bash
pnpm dev:local
```

3. Start backend infrastructure and services from `findNmeet-back`:

```bash
pnpm dev:stack
```

4. Open `http://local.findnmeet.ru`.

Backend `nginx` listens on port `80`, proxies `/` to the Vite dev server on host port `5173`, and proxies `/api/v1/` to `api-gateway` inside Docker.
