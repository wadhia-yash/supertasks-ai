# **App Name**: PrioritizeIt

## Core Features:

- Matrix Display: Display a 4-quadrant Eisenhower Matrix with color-coded tasks and a central add button.
- Drag and Drop: Enable drag-and-drop functionality with smooth animations to move tasks between quadrants. Task state persists and syncs with Firestore.
- Local Storage: Store tasks locally for guest users, limited to 5 tasks. Sync with remote data upon login.
- User Authentication: Use Firebase Authentication (Google, Email/Password) for guest mode, authenticated users (7 tasks), and subscribed users (unlimited tasks).
- Access Tiers: Provide tiered access based on authentication status and subscription level: Guest (5 tasks), Authenticated (7 tasks, limited workspace/invite features), Subscribed (unlimited tasks, full workspace/invite features).
- AI Task Prioritization: Suggest task placement using a tool, based on task title/context. Optional for MVP.
- Routing: Public routes: /, /pricing, /about, /feedback. Private routes: /workspace, /workspace/:id, /settings, /invitation.

## Style Guidelines:

- Primary Color: Vibrant Blue #4285F4
- Accent Color: Orange #FF9800
- Background: Light Gray #F5F5F5 (light mode), #121212 (dark mode)
- Poppins (sans-serif)
- Use lucide-react
- Subtle drag-drop and state animations with Framer Motion or Tailwind transitions
- Responsive layout adapting matrix for smaller screens, repositioning central '+' button for mobile.