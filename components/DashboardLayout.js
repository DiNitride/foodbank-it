import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "./Layout";

export default function DashboardLayout({ children }) {
  let { data: session, status } = useSession()
  let router = useRouter()

  if (status === 'loading') {
    return (
      <div></div>
    )
  }

  if (status === 'unauthenticated' || session.user.type != 'staff') {
    router.push('/')
    return <div></div>
  }

  let currentPage = router.pathname.slice(11)

  let apps = {
    'inventory': {title: "Inventory", icon: 'store', href: '/dashboard/inventory', admin: 0},
    'parcels': {title: "Parcels", icon: 'box', href: '/dashboard/parcels', admin: 0},
    'users': {title: "Users", icon: 'user-group', href: '/dashboard/users', admin: 0},
    'referrals': {title: "Referrals", icon: 'ticket', href: '/dashboard/referrals', admin: 0},
    'orders': {title: "Orders", icon: 'box', href: '/dashboard/orders', admin: 0},
    'organisations': {title: "Organisations", icon: 'building', href: '/dashboard/organisations', admin: 1},
    'staff': {title: "Staff", icon: 'user-tie', href: '/dashboard/staff', admin: 1},
    'donations': {title: "Donations", icon: 'money-bill', href: '/dashboard/donations', admin: 1},
    'feedback': {title: "Feedback", icon: 'comment', href: '/dashboard/feedback', admin: 1}
  }

  if (currentPage !== '' && apps[currentPage].admin && !session.user.admin) {
    router.push('/dashboard')
    return <div></div>
  }

  let viewedApps = session.user.admin ? apps : Object.entries(apps).reduce((apps, [name, app]) => !app.admin ? { ...apps, [name]: app } : apps, {})

  return (
    <Layout mainStyling='flex flex-col grow'>
      <div className='h-full grow grid grid-cols-[50px_auto] md:grid-cols-[175px_auto] grid-rows-1'>
        <div className='flex flex-col border-r md:pr-1'>
          { Object.entries(viewedApps).map(([name, app]) => (
            <Link key={name} href={app.href}>
              <a className={`flex hover:underline justify-center items-center rounded-r p-1 w-[50px] h-[50px] md:w-auto md:justify-start hover:bg-highlight-one ${router.route === app.href ? 'bg-secondary' : ''}`}>
                <FontAwesomeIcon icon={app.icon} width={32} />
                <p className='hidden md:block'>{app.title}</p>
              </a>
            </Link>
          ))}
        </div>
        <div className='overflow-scroll'>
          { children }
        </div>
      </div>
    </Layout>
  )
}
