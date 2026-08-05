import { Link, useLocation } from 'react-router-dom'
import { User } from '../../types'
import { UserMenu } from '../Auth/UserMenu'

interface HeaderProps {
  user?: User
}

export const Header = ({ user }: HeaderProps) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  if (!user) {
    return (
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Welcome, Login !
          </Link>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/chat" className="text-2xl font-bold text-primary-600">
            Legal
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/chat"
              className={`text-sm font-medium transition-colors ${
                isActive('/chat')
                  ? 'text-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Chat
            </Link>
          </nav>

          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}
