Frontend – Recommendation UI

This repository contains the Next.js frontend for the recommendation system.

The UI allows users to request recommendations and displays results returned by the backend API.

Responsibilities

Render product listings

Trigger recommendation requests

Display recommendation results and metadata

Remain free of business or ML logic

All business rules and fallback behavior are handled by the backend service.

Key Design Choice

The frontend communicates with the backend via an API proxy to:

avoid CORS issues

keep backend URLs private

simplify environment configuration

Technology

Next.js

TypeScript

Tailwind CSS

Notes

This UI is intentionally simple.
The focus of the project is backend reliability and ML integration, not frontend complexity.
