# CodeChronicle Website

Marketing, docs, auth, and billing frontend for CodeChronicle.

## Stack

- React + Vite
- React Router
- Tailwind CSS
- Framer Motion

## Run Locally

```bash
npm install
npm run dev
```

## Build and Lint

```bash
npm run lint
npm run build
```

## Route Notes

- `/` public landing page
- `/plans` public pricing/plans page (credits do not expire)
- `/login` login page (supports redirect/next params)
- `/billing` authenticated user billing dashboard
- `/admin/billing` authenticated admin billing dashboard

## Pricing and Billing UX Flow

- Header/footer **Pricing** links route to `/plans`.
- Each plan card has **Buy Now**:
  - authenticated users -> `/billing`
  - unauthenticated users -> `/login?redirect=/billing`
- Login page includes account sync hint for extension users.
- Login back button avoids protected-route redirect loops.

## Notes

- Route transitions force scroll to top on navigation.
- Billing pages use shared dashboard header back navigation.


