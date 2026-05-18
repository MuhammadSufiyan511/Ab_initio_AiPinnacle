import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from '@/layouts/AuthLayout'
import { DashboardLayout } from '@/layouts/DashboardLayout'
import LoginPage from '@/pages/auth/LoginPage'
import SignupPage from '@/pages/auth/SignupPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import CourseListPage from '@/pages/courses/CourseListPage'
import CourseDetailPage from '@/pages/courses/CourseDetailPage'
import LessonPlayerPage from '@/pages/learning/LessonPlayerPage'
import MockTestsPage from '@/pages/tests/MockTestsPage'
import QuizPage from '@/pages/quiz/QuizPage'
import QuizInstructionsPage from '@/pages/quiz/QuizInstructionsPage'
import FPSCExamPage from '@/pages/quiz/FPSCExamPage'
import QuizResultPage from '@/pages/quiz/QuizResultPage'
import AssignmentsPage from '@/pages/assignments/AssignmentsPage'
import AssignmentDetailPage from '@/pages/assignments/AssignmentDetailPage'
import MessagesPage from '@/pages/messages/MessagesPage'
import AnalyticsPage from '@/pages/analytics/AnalyticsPage'
import ProfilePage from '@/pages/profile/ProfilePage'
import SettingsPage from '@/pages/settings/SettingsPage'
import CertificatesPage from '@/pages/certificates/CertificatesPage'
import CalendarPage from '@/pages/calendar/CalendarPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login',           element: <LoginPage /> },
      { path: '/signup',          element: <SignupPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: '/dashboard',                         element: <DashboardPage /> },
      { path: '/courses',                           element: <CourseListPage /> },
      { path: '/courses/:id',                       element: <CourseDetailPage /> },
      { path: '/learn/:courseId/:lessonId',         element: <LessonPlayerPage /> },
      { path: '/test-preparations',                 element: <MockTestsPage /> },
      { path: '/test-preparations/exam/:testId', element: <FPSCExamPage /> },
      { path: '/test-preparations/:id',             element: <QuizInstructionsPage /> },
      { path: '/test-preparations/:id/take',        element: <QuizPage /> },
      { path: '/test-preparations/:id/results',     element: <QuizResultPage /> },
      { path: '/assignments',                       element: <AssignmentsPage /> },
      { path: '/assignments/:id',                   element: <AssignmentDetailPage /> },
      { path: '/messages',                          element: <MessagesPage /> },
      { path: '/analytics',                         element: <AnalyticsPage /> },
      { path: '/profile',                           element: <ProfilePage /> },
      { path: '/settings',                          element: <SettingsPage /> },
      { path: '/certificates',                      element: <CertificatesPage /> },
      { path: '/calendar',                          element: <CalendarPage /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])
