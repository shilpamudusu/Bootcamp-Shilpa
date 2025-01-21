import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { Dashboard } from '../../components/Dashboard'
import dashboardConfig from '../../../dashboardConfig.json'
import { SignOutButton } from '../../components/SignOutButton'
import { Session } from "next-auth"

type DashboardPageProps = {
  session: Session | null;
}

export default async function DashboardPage() {
  const session: Session | null = await getServerSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Welcome, {session.user?.name || 'User'}</h1>
          <SignOutButton />
        </div>
        <Dashboard config={dashboardConfig.dashboard.components} />
      </div>
    </main>
  )
}
