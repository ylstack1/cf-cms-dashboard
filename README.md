# CF CMS Admin Dashboard

A modern, fully-featured CMS admin dashboard built with Next.js 16, React 19, and TypeScript. This dashboard provides a comprehensive interface for managing content, media, users, collections, plugins, and system settings.

## Features

- 🔐 **Authentication** - Secure login with Bearer token authentication
- 📝 **Content Management** - Create, edit, delete, and publish content
- 📁 **Collections** - Organize content into collections
- 🖼️ **Media Library** - Upload and manage media files
- 👥 **User Management** - Manage team members and permissions
- 🔌 **Plugin System** - Extend functionality with plugins
- ⚙️ **Settings** - Configure CMS behavior and appearance
- 🎨 **Dark Theme** - Beautiful dark UI with Tailwind CSS
- 📱 **Responsive Design** - Mobile-first responsive layout

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **React:** React 19
- **TypeScript:** Full type safety
- **State Management:** Zustand with persist middleware
- **Data Fetching:** SWR for server state management
- **HTTP Client:** Axios with interceptors
- **UI Components:** Radix UI primitives
- **Styling:** Tailwind CSS 4
- **Icons:** Lucide React
- **Fonts:** Geist Sans & Geist Mono

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env.local` file:

```bash
cp .env.example .env.local
```

4. Update the API base URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to access the dashboard.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with auth guard
│   │   ├── dashboard/          # Dashboard page
│   │   ├── content/            # Content management
│   │   ├── collections/        # Collections management
│   │   ├── media/              # Media library
│   │   ├── users/              # User management
│   │   ├── plugins/            # Plugin management
│   │   └── settings/           # System settings
│   ├── login/                  # Login page
│   └── layout.tsx              # Root layout
├── components/
│   ├── admin/                  # Admin-specific components
│   │   └── admin-sidebar.tsx  # Dynamic sidebar with plugins
│   ├── ui/                     # Reusable UI components
│   └── providers.tsx           # SWR and Theme providers
├── hooks/                      # Custom hooks for data fetching
│   ├── useDashboard.ts
│   ├── useContent.ts
│   ├── useCollections.ts
│   ├── useMedia.ts
│   ├── useUsers.ts
│   ├── usePlugins.ts
│   └── useSettings.ts
├── lib/
│   ├── api.ts                  # API client with auth
│   ├── constants.ts            # App constants
│   └── utils.ts                # Utility functions
├── store/
│   └── authStore.ts            # Zustand auth store
├── types/
│   └── index.ts                # TypeScript type definitions
└── middleware.ts               # Auth middleware

```

## API Endpoints

The dashboard integrates with the following backend API endpoints:

### Authentication
- `POST /admin/auth/login` - User login
- `POST /admin/auth/logout` - User logout
- `GET /admin/auth/me` - Get current user

### Dashboard
- `GET /admin/dashboard/stats` - Dashboard statistics
- `GET /admin/dashboard/recent-activity` - Recent activity feed

### Content
- `GET /admin/content` - List content (with pagination & filters)
- `POST /admin/content` - Create content
- `GET /admin/content/:id` - Get content by ID
- `PUT /admin/content/:id` - Update content
- `DELETE /admin/content/:id` - Delete content

### Collections
- `GET /admin/collections` - List collections
- `GET /admin/collections/:id` - Get collection by ID
- `POST /admin/collections` - Create collection
- `PUT /admin/collections/:id` - Update collection

### Media
- `GET /admin/media` - List media files
- `POST /admin/media` - Upload media file(s)
- `DELETE /admin/media/:id` - Delete media file

### Users
- `GET /admin/users` - List users
- `POST /admin/users` - Create user
- `PUT /admin/users/:id` - Update user
- `DELETE /admin/users/:id` - Delete user

### Plugins
- `GET /admin/plugins` - List plugins
- `GET /admin/plugins/:id` - Get plugin by ID
- `PATCH /admin/plugins/:id` - Toggle plugin enabled state
- `GET /admin/plugins/:id/settings` - Get plugin settings
- `PUT /admin/plugins/:id/settings` - Update plugin settings

### Settings
- `GET /admin/settings` - Get system settings
- `PUT /admin/settings` - Update system settings

## Authentication

The dashboard uses Bearer token authentication with the following flow:

1. User logs in via `/login` page
2. Token is stored in Zustand store (localStorage) and cookie
3. All API requests include `Authorization: Bearer {token}` header
4. On 401 response, user is logged out and redirected to login
5. Middleware protects `/admin/*` routes

## Features

### Dynamic Sidebar

The sidebar automatically loads and displays menu items from enabled plugins, allowing for extensible navigation.

### Error Handling

- API errors are caught and displayed to users
- Loading states for all async operations
- Proper error boundaries

### Theme Support

Dark theme is enabled by default with support for system theme preferences.

## Customization

### API Base URL

Configure the backend API URL in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
```

### Theme

Modify Tailwind CSS configuration in `app/globals.css` to customize colors and styles.

## License

MIT

## Support

For issues and questions, please open an issue on the repository.
