# 🟢 MoNNi

> **Modern, Production-Grade Expense Tracking Dashboard**
> Built with scalable architecture, modular backend design, and mobile-first UI principles.

MoNNi is a full-stack expense management platform designed with production patterns in mind.
It emphasizes clean architecture, scalable backend modules, and a responsive, modern user interface.

This is not a demo project — it is engineered as a modular SaaS-style system.

---

## 🚀 Tech Stack

### Frontend

* React (Vite)
* TailwindCSS (Utility-first styling)
* Framer Motion (Swipe & animation interactions)
* Lucide Icons
* IntersectionObserver (Infinite Scroll)

### Backend

* Node.js
* Express.js
* MySQL
* Zod (Validation)
* Modular Service/Controller Architecture

---

## 🏗 Architecture Overview

### High-Level Structure

```
client
├── public
│   ├── DashBoardPreviewDemo.webp
│   ├── DeveloperProfilePicture.jpeg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── MoNNi.svg
│   └── NavbarProfileImage.png
├── README.md
├── src
│   ├── api
│   │   ├── auth.api.js
│   │   └── http.js
│   ├── app
│   │   ├── App.jsx
│   │   └── router.jsx
│   ├── components
│   │   ├── DashboarPreviewSection.jsx
│   │   ├── DeveloperSection.jsx
│   │   ├── Footer.jsx
│   │   ├── LoaderPage.jsx
│   │   ├── nabars
│   │   │   ├── AppNavigationBar.jsx
│   │   │   └── PublicNavigationBar.jsx
│   │   ├── Testimonial.jsx
│   │   ├── ThemeWrapper.jsx
│   │   ├── ToastContainer.jsx
│   │   ├── ToastItem.jsx
│   │   └── ui
│   │       ├── Counter.jsx
│   │       ├── FeatureCard.jsx
│   │       └── StepCard.jsx
│   ├── constants
│   │   ├── categories.js
│   │   └── paymentMethods.js
│   ├── context
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── features
│   │   ├── auth
│   │   │   ├── components
│   │   │   │   ├── AuthCard.jsx
│   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   └── ResetPasswordForm.jsx
│   │   │   ├── hooks
│   │   │   │   ├── useForgotPassword.js
│   │   │   │   ├── useLogin.js
│   │   │   │   ├── useRegister.js
│   │   │   │   └── useResetPassword.js
│   │   │   ├── pages
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Register.jsx
│   │   │   │   └── ResetPassword.jsx
│   │   │   ├── schemas
│   │   │   │   ├── forgot.schema.js
│   │   │   │   ├── login.schema.js
│   │   │   │   ├── register.schema.js
│   │   │   │   └── reset.shema.js
│   │   │   └── services
│   │   │       └── auth.api.js
│   │   ├── budget
│   │   │   └── Budget.jsx
│   │   ├── dashboard
│   │   │   ├── components
│   │   │   │   ├── AddExpenseButton.jsx
│   │   │   │   ├── AIInsights.jsx
│   │   │   │   ├── AnalyticsSkeleton.jsx
│   │   │   │   ├── DonutChartSection.jsx
│   │   │   │   ├── ExpenseSection.jsx
│   │   │   │   ├── expensetable
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── ExpenseCard.jsx
│   │   │   │   │   │   └── ExpenseCardSkeleton.jsx
│   │   │   │   │   ├── ExpenseList.jsx
│   │   │   │   │   ├── ExpenseModal.jsx
│   │   │   │   │   ├── ExpenseTable.jsx
│   │   │   │   │   ├── SentineLoader.jsx
│   │   │   │   │   └── TableFilterBar.jsx
│   │   │   │   ├── FilterBar.jsx
│   │   │   │   ├── SummaryGrid.jsx
│   │   │   │   ├── TrendCharts.jsx
│   │   │   │   └── ui
│   │   │   │       ├── GrowthBadge.jsx
│   │   │   │       └── SummaryCard.jsx
│   │   │   ├── hooks
│   │   │   │   ├── useDashboardFilter.js
│   │   │   │   ├── useDashboard.js
│   │   │   │   └── useExpense.js
│   │   │   ├── pages
│   │   │   │   └── Overview.jsx
│   │   │   ├── sections
│   │   │   │   ├── AnalyticalSection.jsx
│   │   │   │   └── TopSection.jsx
│   │   │   └── services
│   │   │       ├── dashboard.api.js
│   │   │       └── expenses.api.js
│   │   └── profile
│   │       └── Profile.jsx
│   ├── hooks
│   │   ├── useCategories.js
│   │   ├── useForm.js
│   │   └── useReveal.js
│   ├── index.css
│   ├── layouts
│   │   ├── AppLayout.jsx
│   │   └── PublicLayout.jsx
│   ├── main.jsx
│   ├── pages
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   ├── routes
│   │   └── ProtectedRoute.jsx
│   └── utils
└── vite.config.js
```

Separation of concerns is strictly enforced:

* ExpenseTable logic is independent of Analytics.
* Backend owns business logic.
* Frontend owns UI state and interaction.
* Pagination state is isolated in custom hooks.

---

## 🔐 Backend Design

The backend follows modular service/controller separation.

```
server
├── package.json
├── package-lock.json
└── src
    ├── app.js
    ├── config
    │   ├── database.js
    │   └── env.js
    ├── errors
    │   └── ApiError.js
    ├── middlewares
    │   ├── auth.middleware.js
    │   ├── error.middleware.js
    │   └── rateLimit.middleware.js
    ├── modules
    │   ├── analytics
    │   │   ├── analytics.controller.js
    │   │   ├── analytics.model.js
    │   │   ├── analytics.routes.js
    │   │   └── analytics.service.js
    │   ├── auth
    │   │   ├── auth.controller.js
    │   │   ├── auth.routes.js
    │   │   └── auth.service.js
    │   ├── expenses
    │   │   ├── expense.model.js
    │   │   ├── expense.routes.js
    │   │   ├── expenses.controller.js
    │   │   └── expense.service.js
    │   └── users
    │       └── user.model.js
    ├── routes.js
    ├── server.js
    ├── utils
    │   ├── asyncHandler.js
    │   ├── email.js
    │   ├── jwt.js
    │   ├── logger.js
    │   ├── password.js
    │   └── resetToken.js
    └── validators
        ├── analytics
        │   └── analytics.query.shema.js
        ├── auth
        │   ├── auth.schema.js
        │   └── reset.schema.js
        ├── expenses
        │   ├── expense.export.schema.js
        │   ├── expense.query.schema.js
        │   ├── expense.schema.js
        │   └── expense.update.schema.js
        └── validate.js

```

### Key Backend Features

* Cursor-based pagination (date + id composite cursor)
* Advanced filtering support:

  * category
  * payment_method
  * search
  * fromDate / toDate
* Distinct category endpoint for filter metadata
* Optimized indexing strategy:

  * `(user_id, expense_date DESC, id DESC)`
  * `(user_id, expense_date)`
* Clean SQL query building
* Zod-based validation middleware
* Auth middleware isolation

---

## 📊 Analytics Engine

The `/dashboard` endpoint returns:

```json
{
  "summary": {},
  "breakdown": [],
  "trend": [],
  "dateRange": { "from": "", "to": "" }
}
```

Features:

* Dynamic date range resolution (backend-owned logic)
* Growth percentage calculation
* Top category detection
* Numeric casting for chart stability
* Parallel data aggregation

Frontend analytics components:

* DonutChartSection (responsive + legend grid)
* SummaryGrid (metric cards)
* TrendCharts (responsive containers)

---

## 📱 Expense Table System

### Custom Card-Based Table

Native `<table>` was intentionally avoided to support:

* Swipe interactions
* Mobile-first layout
* Animation flexibility
* Upgradeability

---

### Interaction Model

| Device  | Interaction                          |
| ------- | ------------------------------------ |
| Mobile  | Swipe left → Edit                    |
| Desktop | Double-click → Edit                  |
| All     | Single click → Open modal            |
| All     | Delete via confirmation inside modal |

---

## 🔄 Infinite Scroll (Cursor Pagination)

Pagination is implemented using:

* Composite cursor (`expense_date`, `id`)
* Sentinel-based auto-loading
* IntersectionObserver
* Ref-based cursor tracking (not state-based)

Architecture:

```
useExpenses (hook)
  ├── manages cursorRef
  ├── manages hasMore
  ├── manages loading state
  └── exposes fetchExpenses(reset)
```

Race conditions prevented using internal `fetchingRef`.

StrictMode double-call behavior accounted for.

---

## 🧠 Hybrid Category System

Category architecture avoids unnecessary schema complexity.

### Category Sources

1. Default system categories
2. Distinct categories from DB
3. Custom local categories (limited + persisted)

This ensures:

* Cross-device persistence (via DB categories)
* No schema expansion required
* Clean separation of metadata vs transactional data

---

## 🧾 Expense Modal

Features:

* Responsive sheet-style modal (mobile)
* Centered dialog (desktop)
* Scroll locking
* Delete confirmation state
* Edit mode with controlled form state
* Defensive null-state rendering

---

## 🎨 UI/UX Principles

* Mobile-first design
* No horizontal scroll
* Smooth transitions
* Skeleton loading for initial fetch
* Spinner for incremental fetch
* Controlled scroll containers
* Shadow elevation hierarchy
* Emerald theme consistency

---

## ⚙️ Performance Considerations

* Cursor-based pagination
* Indexed queries
* Avoided unnecessary re-renders
* useRef for pagination control
* Stable filter serialization
* Cleaned query parameters before API calls
* StrictMode-safe fetch architecture

---

## 🔎 Filtering Capabilities

Supported filters:

* Search (description / merchant)
* Category
* Payment Method
* Date range

Filters are:

* Serialized before effect triggers
* Cleaned before sending to backend
* Reset-aware (cursor reset on change)

---

## 🧪 Known Development Behaviors

In development mode:

* React StrictMode causes double effect execution.
* This results in double initial fetch (expected).
* Production build resolves this automatically.

---

## 📦 Project Status

### Completed

* Modular backend
* Cursor pagination
* Infinite scroll
* Hybrid categories
* Advanced filters
* Analytics dashboard
* Premium modal
* Swipe edit interaction
* StrictMode-safe fetch logic

### In Progress

* Real update API wiring
* Real delete API wiring
* Optimistic updates
* Category enhancement features
* Budget module
* Settings module

---

## 🛣 Roadmap

* Budget allocation per category
* Category color tagging
* Export to CSV
* PWA enhancement
* Offline mode
* Role-based access
* SaaS multi-tenant deployment

---

## 🧑‍💻 Development Philosophy

MoNNi is built with:

* Production-ready patterns
* Modular architecture
* Clean separation of concerns
* Scalable backend structure
* Upgrade-friendly frontend design

The goal is not just functionality —
The goal is maintainable, extensible architecture.


---

## 👨‍💻 Developer

**MoNNi** is designed and developed by:

**Abhishek Singh Chauhan**

Full-Stack Developer | Backend-Focused Engineer 

This project reflects a strong focus on:

* Clean Architecture Principles
* Scalable Backend Design
* Modular Frontend Structure
* Production-Oriented Thinking
* Performance & UX Optimization

MoNNi is being built not just as a learning exercise, but as a real-world SaaS-grade system following engineering best practices.

---

## 🤝 Contributions

At the moment, MoNNi is maintained as a personal engineering project.

However, contributions are welcome in the following areas:

* Performance optimization
* UI/UX enhancements
* Accessibility improvements
* Advanced analytics features
* Testing infrastructure (Unit / Integration)
* Documentation improvements
* Feature proposals

If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Commit clean, well-documented changes
4. Open a pull request with a clear description

Please ensure:

* Code follows existing architecture patterns
* No breaking changes are introduced without discussion
* PRs are modular and focused

---

## 💡 Engineering Philosophy

MoNNi values:

* Simplicity over cleverness
* Explicit logic over hidden magic
* Stability over quick hacks
* Scalable patterns over shortcuts

Every feature is implemented with long-term maintainability in mind.

---
