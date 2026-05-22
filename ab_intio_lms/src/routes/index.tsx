import { Suspense, lazy, type ReactNode } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

const AuthLayout = lazy(() => import('@/layouts/AuthLayout').then((module) => ({ default: module.AuthLayout })))
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout').then((module) => ({ default: module.DashboardLayout })))
const PublicLayout = lazy(() => import('@/layouts/PublicLayout').then((module) => ({ default: module.PublicLayout })))

const WelcomePage = lazy(() => import('@/pages/WelcomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const FAQsPage = lazy(() => import('@/pages/public/FAQsPage'))
const MockTestDetailsPage = lazy(() => import('@/pages/public/MockTestDetailsPage'))
const TermsPage = lazy(() => import('@/pages/public/TermsPage'))
const PrivacyPage = lazy(() => import('@/pages/public/PrivacyPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const CourseListPage = lazy(() => import('@/pages/courses/CourseListPage'))
const CourseDetailPage = lazy(() => import('@/pages/courses/CourseDetailPage'))
const LessonPlayerPage = lazy(() => import('@/pages/learning/LessonPlayerPage'))
const MockTestsPage = lazy(() => import('@/pages/tests/MockTestsPage'))
const TestHistoryPage = lazy(() => import('@/pages/tests/TestHistoryPage'))
const TestReviewPage = lazy(() => import('@/pages/tests/TestReviewPage'))
const QuizPage = lazy(() => import('@/pages/quiz/QuizPage'))
const QuizInstructionsPage = lazy(() => import('@/pages/quiz/QuizInstructionsPage'))
const FPSCExamPage = lazy(() => import('@/pages/quiz/FPSCExamPage'))
const QuizResultPage = lazy(() => import('@/pages/quiz/QuizResultPage'))
const AssignmentsPage = lazy(() => import('@/pages/assignments/AssignmentsPage'))
const AssignmentDetailPage = lazy(() => import('@/pages/assignments/AssignmentDetailPage'))
const MessagesPage = lazy(() => import('@/pages/messages/MessagesPage'))
const AnalyticsPage = lazy(() => import('@/pages/analytics/AnalyticsPage'))
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage'))
const CertificatesPage = lazy(() => import('@/pages/certificates/CertificatesPage'))
const CalendarPage = lazy(() => import('@/pages/calendar/CalendarPage'))

function RouteFallback() {
  return (
    <div className="min-h-[40vh] w-full flex items-center justify-center">
      <div
        className="h-10 w-10 rounded-full border-4 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

function RouteErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-3">
        <p className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Something went wrong while loading this page.
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Please refresh the page. If the problem continues, we can trace the exact failing module next.
        </p>
      </div>
    </div>
  )
}

function withSuspense(node: ReactNode) {
  return <Suspense fallback={<RouteFallback />}>{node}</Suspense>
}

export const router = createBrowserRouter([
  {
    element: withSuspense(<PublicLayout />),
    errorElement: <RouteErrorFallback />,
    children: [
      { path: '/', element: withSuspense(<WelcomePage />) },
      { path: '/about', element: withSuspense(<AboutPage />) },
      { path: '/faqs', element: withSuspense(<FAQsPage />) },
      { path: '/mock-test-details', element: withSuspense(<MockTestDetailsPage />) },
      { path: '/terms', element: withSuspense(<TermsPage />) },
      { path: '/privacy-policy', element: withSuspense(<PrivacyPage />) },
    ],
  },
  {
    element: withSuspense(<AuthLayout />),
    errorElement: <RouteErrorFallback />,
    children: [
      { path: '/login', element: withSuspense(<LoginPage />) },
      { path: '/signup', element: withSuspense(<SignupPage />) },
      { path: '/forgot-password', element: withSuspense(<ForgotPasswordPage />) },
    ],
  },
  {
    element: withSuspense(<DashboardLayout />),
    errorElement: <RouteErrorFallback />,
    children: [
      { path: '/dashboard', element: withSuspense(<DashboardPage />) },
      { path: '/courses', element: withSuspense(<CourseListPage />) },
      { path: '/courses/:id', element: withSuspense(<CourseDetailPage />) },
      { path: '/learn/:courseId/:lessonId', element: withSuspense(<LessonPlayerPage />) },
      { path: '/test-preparations', element: withSuspense(<MockTestsPage />) },
      { path: '/test-preparations/history', element: withSuspense(<TestHistoryPage />) },
      { path: '/test-preparations/history/review/:attemptId', element: withSuspense(<TestReviewPage />) },
      { path: '/test-preparations/exam/:testId', element: withSuspense(<FPSCExamPage />) },
      { path: '/test-preparations/:id', element: withSuspense(<QuizInstructionsPage />) },
      { path: '/test-preparations/:id/take', element: withSuspense(<QuizPage />) },
      { path: '/test-preparations/:id/results', element: withSuspense(<QuizResultPage />) },
      { path: '/assignments', element: withSuspense(<AssignmentsPage />) },
      { path: '/assignments/:id', element: withSuspense(<AssignmentDetailPage />) },
      { path: '/messages', element: withSuspense(<MessagesPage />) },
      { path: '/analytics', element: withSuspense(<AnalyticsPage />) },
      { path: '/profile', element: withSuspense(<ProfilePage />) },
      { path: '/settings', element: withSuspense(<SettingsPage />) },
      { path: '/certificates', element: withSuspense(<CertificatesPage />) },
      { path: '/calendar', element: withSuspense(<CalendarPage />) },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
