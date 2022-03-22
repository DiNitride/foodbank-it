import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"
import useSWR from "swr"

import Modal from './Modal'

export default function OrganisationApplicationModal({ id, closeModal }) {
  let { data, error } = useSWR(`/api/organisations/${id}`)

  let handleApprove = async (e) => {
    e.preventDefault()
    let res = await fetch(`/api/organisations/approve/${id}`)
    closeModal()
  }

  let handleReject = async (e) => {
    e.preventDefault()
    let res = await fetch(`/api/organisations/${id}`, {
      method: 'DELETE'
    })
    closeModal()
  }

  return (
    <Modal closeModal={closeModal}>
      { !data ? <h1>Loading organisation...</h1> :
      <div>
        <h1 className='text-xl font-bold'>{ data.OrganisationName }</h1>
        <h2 className='text text-gray-900'>{ data.OrganisationType === 'support' ? 'Referal Agency' : 'Supplier' }</h2>

        <h2 className='font-bold mt-2'>Description</h2>
        <p>{ data.OrganisationDescription }</p>

        <h2 className='font-bold mt-2'>Address</h2>
        <p>{ data.OrganisationAddressLineOne }</p>
        <p>{ data.OrganisationAddressLineTwo }</p>
        <p>{ data.OrganisationAddressTown }</p>
        <p>{ data.OrganisationAddressPostcode }</p>

        <h2 className='font-bold mt-2'>Applicant</h2>
        <p>{ data.OrganisationApplicantForename } { data.OrganisationApplicantForename }</p>
        <p><FontAwesomeIcon icon='envelope' className="pr-2" />{ data.OrganisationApplicantEmail }</p>
        <p><FontAwesomeIcon icon='phone' className="pr-2" />{ data.OrganisationApplicantPhone }</p>


        <div className="flex justify-around mt-5">
          <button className='bg-success w-full mr-1 p-2 rounded' onClick={handleApprove}>Approve</button>
          <button className='bg-danger text-white w-full mr-1 p-2 rounded' onClick={handleReject}>Reject</button>
        </div>
      </div>
      }
    </Modal>
  )
}