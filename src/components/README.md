# Components

This folder contains reusable React components, organized by role.

## Structure

- **layouts/**: Route-level shells and top-level layout pieces (e.g.,
  `MainLayout`, `Navbar`).
- **shared/**: Reusable building blocks with behavior (e.g., `Button`, `Loader`,
  `Toaster`).
- **ui/**: Small, mostly presentational components (e.g., `ButtonTheme`).

## Conventions

- **Naming**: PascalCase for component files and exported symbols.
- **Exports**: Each folder exposes an `index.ts` barrel. Prefer importing from
  the folder barrel:
  - `@/components/layouts`
  - `@/components/shared`
  - `@/components/ui`
- **Styling**: Tailwind utility classes inline. Use `cn()` when composing
  classes.
- **Imports**: Prefer `@/` alias for cross-folder imports.

## Examples

```ts
import { Button } from '@/components/shared'
import { ButtonTheme } from '@/components/ui'
import { MainLayout } from '@/components/layouts'
```

## Testing (future)

Co-locate tests and stories next to each component when the test/stories setup
is added:

- `Button.test.tsx`
- `Button.stories.tsx`
