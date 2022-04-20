import { makePublicRouterInstance } from "next/router"
import { useEffect, useState } from "react"
import useSWR from "swr"
import DashboardLayout from "../../components/DashboardLayout"
import Layout from "../../components/Layout"
import OrganisationApplicationModal from "../../components/OrganisationApplicationModal"
import Head from 'next/head'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Organisations({}) {
  let { data: dataOrganisations, error: errorOrganisations, mutate: mutateOrganisations } = useSWR('/api/organisations')
  let { data: dataApplications, error: errorApplications, mutate: mutateApplications } = useSWR('/api/organisations/applications')
  let [ openApplication, setOpenApplication ] = useState(null)

  let mutate = () => {
    mutateOrganisations()
    mutateApplications()
  }

  let prettyType = {
    'support': 'Support Agency',
    'supplier': 'Supplier'
  }

  return (
    <DashboardLayout>
      <Head>
        <title>Organisations</title>
      </Head>
      <div className='m-2 flex flex-col'>
        <h1 className='text-xl font-bold text-center'>Organisations</h1>
        <h2 className='underline mb-2'>Applications</h2>
        { !dataApplications || dataApplications.length === 0 ? <p>No pending applications</p> :
        <table className='border-collapse border'>
          <thead>
            <tr>
              <th className='border p-2'>Name</th>
              <th className='border p-2'>Type</th>
              <th className='border p-2'>Address</th>
              <th className='border p-2'>Applicant</th>
            </tr>
          </thead>
          <tbody>
            {dataApplications.map((organisation) => {
              return <tr key={organisation.OrganisationId} className='' onClick={() => setOpenApplication(organisation.OrganisationId)}>
                <td className='border px-2'>{ organisation.OrganisationName }</td>
                <td className='border px-2'>{ prettyType[organisation.OrganisationType] }</td>
                <td className='border px-1 hidden md:table-cell'>{ organisation.OrganisationAddressLineOne }</td>
                <td className='border px-2'>{ organisation.OrganisationApplicantForename }</td>
              </tr>
            })}
          </tbody>
        </table>
        } 
        <h2 className='underline my-2'>Organisations</h2>
        { !dataOrganisations ? <p>Loading...</p> :
        <table className='border border-collapse'>
          <thead>
            <tr>
              <th className="border">Name</th>
              <th className='border'>Type</th>
              <th className='border'>Manager</th>
              <th className='border' colSpan={4}>Address</th>
            </tr>
          </thead>
          <tbody>
            {dataOrganisations.map((organisation) => {
              return <tr>
                <td className='border p-2'>{ organisation.OrganisationName }</td>
                <td className='border p-2'>{ prettyType[organisation.OrganisationType] }</td>
                <td className='border p-2'>{ organisation.OrganisationManagerForename } { organisation.OrganisationApplicantSurname }</td>
                <td className='border p-2 hidden md:table-cell'>{ organisation.OrganisationAddressLineOne }</td>
                <td className='border p-2 hidden md:table-cell'>{ organisation.OrganisationAddressLineTwo }</td>
                <td className='border p-2 hidden md:table-cell'>{ organisation.OrganisationAddressTown }</td>
                <td className='border p-2 hidden md:table-cell'>{ organisation.OrganisationAddressPostcode }</td>
              </tr>
            })}
          </tbody>
        </table>
        }
        { openApplication ? <OrganisationApplicationModal id={openApplication} closeModal={() => { setOpenApplication(null); mutate() }} /> : ''}
      </div>
    </DashboardLayout>
  )
}
