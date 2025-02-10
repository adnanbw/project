import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Building2,
  ShoppingCart,
  BarChart3,
  Settings,
  HelpCircle,
  Clock,
  FolderKanban
} from 'lucide-react';
import type { NavigationItem } from '../types';

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Accounting', href: '/', icon: BookOpen },
  { name: 'HR & Payroll', href: '/hr', icon: Users },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Client', href: '/clients', icon: Building2 },
  { name: 'Time Tracking', href: '/time-tracking', icon: Clock},
  { name: 'Inventory', href: '/inventory', icon: ShoppingCart },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Support', href: '/support', icon: HelpCircle }
];
export function Navigation() {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
        <div className="flex h-16 shrink-0 items-center">
          <Building2 className="h-8 w-8 text-indigo-600" />
          <span className="ml-4 text-xl font-semibold text-gray-900">FinanceFlow</span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                        ${location.pathname === item.href
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}