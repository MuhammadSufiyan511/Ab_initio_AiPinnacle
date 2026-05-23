import { useUserStore } from '@/store/userStore'
import StudentDashboard from './StudentDashboard'
import InstructorDashboard from './InstructorDashboard'
import AdminDashboard from './AdminDashboard'

/** 
 * DashboardPage (Role-aware Router Component):
 * - Reads the `user` state globally from `useUserStore` (Zustand).
 * - Dynamically mounts the appropriate role-based dashboard view:
 *   1) AdminDashboard: Complete administrative analytics, student metrics, and server alerts.
 *   2) InstructorDashboard: Courses overview, active assignments submissions count, and chat logs.
 *   3) StudentDashboard: Current study progress tracks, enrolled certificates, and test catalog.
 * - Supports instant hot-reloading when roles are switched in the TopNavbar user dropdown!
 */
export default function DashboardPage() {
  // Always render the student dashboard view on screens
  return <StudentDashboard />
}
