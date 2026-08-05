import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/auth'
import { User } from '../../types'

interface UserMenuProps {
  user: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounde
d-full hover:bg-amber-600/20 transition-all duration-300 te
xt-amber-400 hover:text-amber-300"
      >
        {user.profile_pic ? (
          <img
            src={user.profile_pic}
            alt={user.name}
            className="w-7 h-7 rounded-full border border-a
mber-400/50 transition-all duration-300"
          />
	) : (
	 <i className="fa-solid fa-circle-user text-2xl text-amber-400"></
i>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 glass-panel z-50">
          <div className="p-3 border-b border-white/10">
            <p className="text-sm font-medium text-gold-400">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}
