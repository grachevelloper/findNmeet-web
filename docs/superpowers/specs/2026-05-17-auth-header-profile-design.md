# Auth Header Profile Design

## Goal

Add a profile control in the top-right corner of both existing headers:

- `src/pages/home/ui/landingHeader/LandingHeader.tsx`
- `src/widgets/header/ui/header/Header.tsx`

Behavior:

- guest user sees the existing VK login entry point;
- authenticated user sees a profile icon with a dropdown containing `Выйти`;
- VK login must complete backend auth and populate frontend auth state;
- logout must revoke backend session and return the UI to guest state.

Constraints:

- avoid duplicated UI or auth logic;
- follow FSD boundaries.

## Backend Contract

Use existing backend endpoints from the sibling backend repository:

- `POST /api/v1/auth/complete-vk-web-auth` to finish VK login from frontend VK SDK tokens;
- `POST /api/v1/auth/get-user` to resolve current authenticated user from cookies;
- `POST /api/v1/auth/revoke-session` to logout.

Auth remains cookie-based via `withCredentials: true`.

## Recommended Approach

Implement a shared auth model inside `features/auth` and expose a reusable header-side control component.

Why this approach:

- one source of truth for auth state;
- one shared right-side header control used by both headers;
- minimal scope increase beyond the requested UI and flow.

Rejected alternatives:

- local state per header duplicates logic and breaks synchronization;
- full session platform refactor is unnecessary for this task.

## FSD Placement

### `features/auth`

Owns:

- auth state and bootstrap logic;
- VK login completion integration;
- logout action;
- reusable auth control UI for headers.

Suggested structure:

- `features/auth/model` for auth state, actions, and initialization hook/provider;
- `features/auth/api` for `get-user` and `revoke-session` requests in addition to existing VK login request;
- `features/auth/ui` for a reusable `AuthControl` component.

### `widgets/header`

Owns only header composition and styling.

Both header variants should consume the same auth UI component instead of implementing their own dropdown/profile behavior.

### `app/providers`

Owns auth bootstrap wiring if a provider is needed at app root.

## UI Behavior

### Guest state

Both headers render the existing login entry point on the right side.

### Authenticated state

Both headers render the same profile trigger:

- compact profile icon/avatar-style button;
- dropdown menu with one action: `Выйти`.

### Loading state

During initial `get-user` bootstrap, headers should avoid flicker between guest and authenticated states. A neutral placeholder or temporarily disabled guest control is acceptable.

## Data Flow

### App bootstrap

1. App starts.
2. Frontend calls `POST /api/v1/auth/get-user`.
3. If session exists, store authenticated user in shared auth state.
4. If backend returns unauthorized, store guest state.

### VK login

1. User starts VK login from existing UI.
2. Frontend completes VK SDK exchange as already implemented.
3. Frontend sends tokens to `POST /api/v1/auth/complete-vk-web-auth`.
4. Frontend immediately calls `POST /api/v1/auth/get-user`.
5. Shared auth state becomes authenticated.
6. Both headers automatically switch to profile control.

### Logout

1. User clicks `Выйти`.
2. Frontend calls `POST /api/v1/auth/revoke-session`.
3. On success, shared auth state becomes guest.
4. Both headers switch back to VK login entry point.

## Error Handling

- `get-user` unauthorized during bootstrap is treated as guest state, not as an app error.
- VK login failure leaves user in guest state and surfaces existing auth error UX.
- Logout failure should not silently mark the user as logged out before backend confirmation.
- Repeated header-specific error handling must be avoided; error ownership stays in `features/auth`.

## Implementation Notes

- Reuse current axios instance with credentials enabled.
- Keep backend DTO handling inside `features/auth/api`.
- Prefer one reusable dropdown/profile component shared by both headers.
- Avoid placing auth business logic inside page or widget layers.

## Testing Scope

Verify:

- guest sees login control in both headers;
- authenticated user sees profile control in both headers;
- successful VK login updates shared auth state after `get-user`;
- logout calls `revoke-session` and restores guest UI in both headers;
- bootstrap with expired or missing cookies resolves to guest state without crashing.
