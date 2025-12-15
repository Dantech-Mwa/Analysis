# Design Guidelines: Data Analytics Platform

## Design Approach
**System-Based Approach** using principles from Linear (clarity and efficiency), Notion (information hierarchy), and Mode Analytics (data visualization patterns). This is a utility-focused tool where performance, learnability, and information density are paramount.

## Typography System
- **Primary Font**: Inter or Work Sans (via Google Fonts CDN)
- **Monospace Font**: JetBrains Mono or Fira Code for SQL editor
- **Hierarchy**:
  - Headings: font-semibold, text-2xl to text-base
  - Body: text-sm to text-base, font-normal
  - Code/Data: text-sm, font-mono
  - Labels: text-xs, font-medium, uppercase tracking-wide

## Layout System
**Spacing Primitives**: Use Tailwind units of 2, 4, 6, and 8 (p-2, m-4, gap-6, h-8, etc.)

**Application Structure**:
- Fixed sidebar navigation (w-64) with logo, main nav items, and query history
- Main content area with top toolbar (h-16) containing breadcrumbs and action buttons
- Content region uses max-w-full with internal padding of p-6 to p-8
- Bottom status bar (h-10) for query execution feedback

**Grid Systems**:
- Dashboard: 2-column layout (md:grid-cols-2) for visualization cards
- Data table: Full-width responsive table with fixed headers
- Query editor + results: Vertical split (60/40) using flex layout

## Component Library

### Navigation & Layout
- **Sidebar**: Vertical nav with icon + label items, collapsible sections for saved queries/history
- **Toolbar**: Horizontal flex with actions (Run Query, Save, Share, Export)
- **Breadcrumbs**: Small text path showing current view context

### Data Input
- **File Upload Zone**: Dashed border dropzone with icon, drag-and-drop and click-to-browse
- **Natural Language Input**: Large textarea (min-h-24) with AI icon prefix and "Translate to SQL" button
- **SQL Editor**: Monaco/CodeMirror-style with syntax highlighting, line numbers (min-h-64)

### Data Display
- **Data Table**: Striped rows, fixed header, sortable columns, pagination controls at bottom
- **Schema Viewer**: Tree structure showing tables/columns with type badges
- **Query Results**: Tabbed interface (Table View | Visualization | JSON) switching display modes

### Visualizations
- **Chart Cards**: Each chart in elevated card (shadow-sm) with title, chart area, and export button
- **Chart Types**: Use Chart.js or Recharts library components
- **Responsive Sizing**: Charts scale to container, min-h-80 for adequate readability

### Interactive Elements
- **Primary Buttons**: Medium size (px-4 py-2), rounded-md, font-medium
- **Icon Buttons**: Square (w-10 h-10), centered icon from Heroicons
- **Dropdowns**: Standard select menus for chart type, date ranges, export formats
- **Tabs**: Underline style with active indicator, gap-6 between items

### Status & Feedback
- **Loading States**: Skeleton loaders matching content structure
- **Toast Notifications**: Top-right positioned (top-4 right-4), auto-dismiss
- **Query Status**: Inline feedback showing execution time, row count, errors

### Sharing & Export
- **Share Modal**: Dialog with generated link, copy button, and permission settings
- **Export Options**: Dropdown menu offering CSV, JSON, PNG (for charts)

## Interaction Patterns
- **Query Execution**: Run button triggers loading state → results appear below
- **Natural Language Flow**: User types question → clicks translate → SQL appears in editor → user reviews/edits → executes
- **Visualization Creation**: Auto-generate chart from query result type, allow manual chart type selection
- **History Management**: Click history item to load query, star to save permanently

## Icons
Use **Heroicons** via CDN for all interface icons (database, chart-bar, play, share, download, etc.)

## Images
**No hero images** - This is a functional tool, not a marketing page. Focus entirely on interface efficiency and data visualization clarity.

## Layout Proportions
- Sidebar: 256px fixed width
- Editor pane: 60% of remaining space
- Results pane: 40% of remaining space
- Dashboard cards: Equal height rows, 2-column on desktop, 1-column mobile