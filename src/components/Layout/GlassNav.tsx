import { Link, useLocation } from 'react-router-dom'
import { User } from '../../types'
import { UserMenu } from '../Auth/UserMenu'

interface GlassNavProps {
  user?: User
}

export const GlassNav = ({ user }: GlassNavProps) => {
  const location = useLocation()

  if (!user) {
    return null
  }

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/chat', label: 'Chat' },
  ]

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-nav-pill">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-6 py-2 rounded-full transition-all duration-300 ${
              isActive(item.path)
                ? 'bg-amber-600/30 border border-amber-400/50 text-amber-400'
                : 'text-gray-300 hover:text-amber-400 hover:bg-amber-600/20'
            }`}
            title={item.label}
          >
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}

        <div className="w-px h-6 bg-white/10 mx-1" />

        <UserMenu user={user} />
      </div>
    </div>
  )
}
