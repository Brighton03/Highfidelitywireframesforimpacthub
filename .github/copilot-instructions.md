# ImpactHub High-Fidelity Wireframes - AI Coding Instructions

## Project Overview

This is a **high-fidelity wireframe/prototype** for ImpactHub, a volunteer management platform. Built with React + TypeScript + Vite, this project focuses on visual accuracy and user flow demonstration rather than backend integration.

**Source:** Figma design at https://www.figma.com/design/p1phXyfhcHd5a2W9DGKDXE/High-Fidelity-Wireframes-for-ImpactHub

## Architecture & Component Organization

### Dual Component System

The project maintains TWO parallel component systems:

1. **Custom styled components** (`src/components/Button.tsx`, `Badge.tsx`) - Use inline styles matching exact brand colors
2. **shadcn/ui components** (`src/components/ui/*`) - Radix UI-based components with Tailwind

**Critical:** New features should use custom components for consistency. Only use shadcn/ui for complex interactions (dialogs, dropdowns, calendars).

### Application Structure

- **App.tsx**: Top-level tab switcher between user roles (Volunteer, Coordinator, Admin) and flows (Registration, Event Creation, Discovery)
- **Dashboard components**: Role-specific views with sidebar (Coordinator/Admin) or top nav (Volunteer)
- **Flow components**: Multi-step wizards with progress indicators (`RegistrationFlow`, `CreateEventFlow`, `DiscoverJoinFlow`)

Example navigation pattern from `App.tsx`:
```tsx
const [activeTab, setActiveTab] = useState<'volunteer-web' | 'coordinator' | 'admin'>('volunteer-web');
```

## Design System (Strict Adherence Required)

Refer to `src/guidelines/Guidelines.md` for complete specs. Key values:

### Brand Colors (Use Exact Hex Values)
- **Primary**: `#779F8D` (Sage Green) - buttons, progress bars, active states
- **Secondary**: `#2C3E50` (Dark Grey) - text, headings, navigation backgrounds
- **Background**: `#F5F7FA` (Light Grey)
- **Surface**: `#FFFFFF` (White cards/modals)
- **Error/Urgent**: `#E57373` (Soft Red)
- **Warning/Pending**: `#FFB74D` (Orange)
- **Success**: `#81C784` (Green)

### Typography
- **Font**: Inter/Roboto (system defaults via Tailwind)
- **Headings**: Bold (700), `#2C3E50`
- **Body**: Regular (400), `#2C3E50`, 14-16px

### Layout Standards
- **Desktop**: Max-width 1440px, centered with `max-w-[1440px] mx-auto`
- **Spacing**: 8px grid system (8, 16, 24, 32)
- **Border radius**: 8px for cards/buttons, 100px for pills/badges
- **Container padding**: 24-32px desktop, 16px mobile

### Component Patterns

**Inline styles over CSS classes** for color/brand values:
```tsx
// ✅ Correct
<div style={{ backgroundColor: '#779F8D', color: '#FFFFFF' }}>

// ❌ Avoid
<div className="bg-green-500 text-white">
```

**Status badges** follow strict color mapping:
- Success/Confirmed → `#81C784`
- Pending/Waitlist → `#FFB74D`
- Error/Flagged → `#E57373`

## Development Workflow

### Running the Project
```bash
npm i           # Install dependencies
npm run dev     # Start dev server (Vite)
npm run build   # Production build
```

### Logo Usage
The project uses SVG-based logos in different variants:
- **Black logo** (`#2C3E50`) - Used on white/light backgrounds (TopNavigation, Mobile app header)
- **White logo** - Used on dark backgrounds (SidebarNavigation with `#2C3E50` background)
- Logo design: "Impacthub" text with flower icon
- Always use inline SVG data URIs for consistent rendering across all platforms

### Key Dependencies
- **UI Framework**: React 18 with Vite + SWC
- **Icons**: `lucide-react` (used throughout, not custom icons)
- **UI Primitives**: Radix UI (extensive usage in `ui/` folder)
- **Forms**: `react-hook-form` (use for complex forms)
- **Styling**: Tailwind v4 + inline styles for brand colors

### Path Aliases
Vite config includes `@` alias for `./src`:
```tsx
import { Button } from '@/components/ui/button'
```

## Critical Patterns

### 1. User Role Switching
The app simulates different user perspectives via tab switching in `App.tsx`. When adding features, consider which roles should see them:
- **Volunteers**: Top navigation, simplified views
- **Coordinators**: Left sidebar, event management, volunteer rosters
- **Admins**: Left sidebar, analytics, system-wide controls

### 2. State Management
Currently **local useState** only. No Redux/Context. Keep state in parent flow components:
```tsx
// RegistrationFlow.tsx
const [step, setStep] = useState<'registration' | 'otp' | 'profile'>('registration');
```

### 3. Multi-Step Flows
Use progress indicators with exact styling from `RegistrationFlow.tsx`:
- Green (#779F8D) for completed/active steps
- Grey (#E0E0E0) for pending steps
- CheckCircle icon for completed steps

### 4. Navigation Components
- **TopNavigation.tsx**: Horizontal nav for volunteers
- **SidebarNavigation.tsx**: Vertical sidebar for coordinators/admins
- Both accept `activeItem` and `onNavigate` props

### 5. Icon Usage
Always use `lucide-react` icons with consistent sizing:
```tsx
import { Calendar, Clock, MapPin } from 'lucide-react';
<Calendar size={16} style={{ color: '#2C3E50' }} />
```

## Common Wireframe Additions

### Adding a New Dashboard Widget
1. Create card container: `bg-white`, `border-radius: 8px`, `padding: 24px`
2. Use heading style: `color: #2C3E50`, `fontWeight: 700`, `fontSize: 20px`
3. Add relevant Lucide icon in header
4. Follow grid layout pattern from existing dashboards

### Adding a Modal/Dialog
Use `src/components/ui/dialog.tsx` (shadcn) for structure, but style content with brand colors.

### Adding Form Fields
Match `RegistrationFlow.tsx` pattern:
- Label with `fontWeight: 600`, `marginBottom: 8px`
- Input with `border: 1px solid #E0E0E0`, `borderRadius: 8px`
- Icon prefix positioned absolutely

## Testing & Validation

**No automated tests** - this is a prototype. Validate visually against Figma designs.

**Check these on every change:**
1. Colors match exact hex values from Guidelines.md
2. Desktop layout max-width is 1440px
3. Spacing uses 8px increments
4. Icons are from lucide-react, not custom
5. Border radius is 8px (or 100px for pills)

## Anti-Patterns (Avoid)

- ❌ Hardcoded width/height without max-width constraints
- ❌ Using Tailwind color classes (bg-green-500) instead of brand hex values
- ❌ Mixing custom components with shadcn/ui variants arbitrarily
- ❌ Adding backend API calls (this is frontend-only)
- ❌ Creating new styling systems outside the established dual approach
- ❌ Using custom icons instead of lucide-react

## File References

- **Design System**: `src/guidelines/Guidelines.md`
- **Color/Style Examples**: `src/components/Button.tsx`, `Badge.tsx`
- **Layout Patterns**: `src/components/VolunteerDashboard.tsx`, `CoordinatorDashboard.tsx`
- **Flow Patterns**: `src/components/RegistrationFlow.tsx`
- **Attribution**: `src/Attributions.md` (shadcn/ui MIT license, Unsplash images)
