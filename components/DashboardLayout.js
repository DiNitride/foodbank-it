import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  let { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div></div>
    )
  }

  if (status === 'unauthenticated' || session.user.type != 'staff') {
    return (<div className='p-5 text-xl text-center'>Unauthorised</div>)
  }

  console.log(session.user)

  let apps = [
    {title: "Inventory", icon: 'store', href: '/dashboard/inventory'},
    {title: "Parcels", icon: 'box', href: '/dashboard/parcels'},
    {title: "Users", icon: 'user-group', href: '/dashboard/users'},
    {title: "Referrals", icon: '', href: '/dashboard/referrals'}
  ]

  if (session.user.admin) {
    apps = [
      ...apps,
      {title: "Organisations", icon: 'building', href: '/dashboard/organisations'},
      {title: "Staff", icon: 'user-group', href: '/dashboard/staff'},
    ]
  }

  return (
    <div className='h-full grid grid-cols-[200px_auto] grid-rows-1'>
      <div className='flex flex-col p-2'>
        { apps.map((app, i) => (
          <Link key={i} href={app.href}>
            <a className='flex hover:underline items-center my-1'>
              <FontAwesomeIcon icon={app.icon} />
              <p className='ml-2'>{app.title}</p>
            </a>
          </Link>
        ))}
      </div>
      <div>
        { children }
      </div>
    </div>
  )
}