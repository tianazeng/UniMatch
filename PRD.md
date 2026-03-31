# Project Upgrade: UniMatch - Columbia Edition

## 1. Goal
Refactor the current application into a multi-section dashboard with a Columbia University aesthetic.

## 2. Visual Style (Columbia University Theme)
* **Color Palette:** - Primary: #C4D8E2 (Columbia Blue)
    - Secondary: #75AADB (Darker Blue)
    - Background: #F8FAFC (Off-white)
    - Accent: #1D2232 (Slate/Navy)
* **Aesthetics:** Elegant, academic, clean. Use card-based layouts with subtle borders (border-[#C4D8E2]/30).

## 3. New App Structure (Navigation & Sections)
Please implement a Tab-based or Sidebar-based navigation to switch between these three sections:

### Section A: Discover & Search (Discovery Hub)
* A search bar at the top to filter clubs by name or tags.
* A grid view displaying all clubs from `clubs.json`.
* Filter chips: "Sports", "Tech", "Arts", etc.

### Section B: AI Matching (The Oracle)
* A dedicated chat interface.
* Bot starts: "Welcome to UniMatch. Let's find your tribe. Tell me, what's your dream weekend activity?"
* Logic: After 3 questions, show "Match Results" with a smooth transition.

### Section C: My Profile & Progress (Student Dashboard)
* **User Profile:** Show a mock user (e.g., "Roar-lee Lion", Major: Comp Sci).
* **Application Status:** A list showing applied clubs and their status using colored badges:
    - "Robotics Club": [Pending] (Yellow)
    - "Debate Society": [Interview Scheduled] (Blue)
    - "Film Club": [Accepted] (Green)

## 4. Technical Requirements
* Use a single-page layout with React state to switch between sections (no hard page reloads).
* Ensure the navigation bar stays at the bottom (for mobile) or top (for desktop).
* Add a "Columbia Lion" emoji or a placeholder logo in the header.

Please refactor the existing code to follow this new structure.