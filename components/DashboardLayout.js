import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  let { data: session, status } = useSession()
  let router = useRouter()

  if (status === 'loading') {
    return (
      <div></div>
    )
  }

  if (status === 'unauthenticated' || session.user.type != 'staff') {
    return (<div className='p-5 text-xl text-center'>Unauthorised</div>)
  }

  let apps = [
    {title: "Inventory", icon: 'store', href: '/dashboard/inventory'},
    {title: "Parcels", icon: 'box', href: '/dashboard/parcels'},
    {title: "Users", icon: 'user-group', href: '/dashboard/users'},
    {title: "Referrals", icon: 'ticket', href: '/dashboard/referrals'},
    {title: "Orders", icon: 'box', href: '/dashboard/orders'}
  ]

  if (session.user.admin) {
    apps = [
      ...apps,
      {title: "Organisations", icon: 'building', href: '/dashboard/organisations'},
      {title: "Staff", icon: 'user-group', href: '/dashboard/staff'},
      {title: "Donations", icon: 'money-bill', href: '/dashboard/donations'}
    ]
  }

  return (
    <div className='h-full grow grid grid-cols-[50px_auto] md:grid-cols-[175px_auto] grid-rows-1'>
      <div className='flex flex-col border-r md:pr-1'>
        { apps.map((app, i) => (
          <Link key={i} href={app.href}>
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
  )
}