# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # dev server at localhost:3000
npm test         # Jest / React Testing Library (watch mode)
npm run build    # production build
```

## Architecture

**Stack**: React 18, React Router v6, TanStack React Query v5, React Hook Form, CSS Modules — bundled with Create React App.

**Backend**: Backendless (`https://alertgiraffe.backendless.app/api/data/`). No local server. Three tables: `zabelejki` (notes), `shoping` (shopping items), `words` (vocabulary). Records use `objectId` as the primary key.

**Service layer**: `src/services.js/` is a directory (the `.js` in the name is intentional). One file per table: `apiList.js`, `apiShoping.js`, `apiWords.js` — plain `fetch` wrappers called by React Query hooks.

**Routing**: All routes nest under `AppLayout` (header nav + `<Outlet>`). Routes: `/` Home, `/list` Notes, `/create` Create note, `/words` Vocabulary, `/shoping` Shopping. Configured with `createBrowserRouter` in `App.js`.

**React Query**: Query keys are `["list"]`, `["shoping"]`, `["words"]`. Default `staleTime: 0`. After mutations, call `queryClient.invalidateQueries({ queryKey: [...] })` to refetch.

**Modal system** (`src/ui/Modal/Modal.js`): Compound component backed by React Context — no library. `Modal.Open` wraps a trigger; `Modal.Window` renders the overlay when its `name` matches the open name. Props `itemID`, `itemName`, `itemShop` and `onClose` are injected into the child via `cloneElement`. Outside clicks close the modal via `useOutsideClick`.

**Forms**: Shopping uses `react-hook-form`; Notes (`Create.js`) use `useState`. New forms should prefer `react-hook-form`.

**Styling**: CSS Modules per component. Global button style: `className="btn-general"`.
