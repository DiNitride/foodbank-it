
import Head from 'next/head'
import Image from 'next/image'
import Router from 'next/router'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSession, useSession } from 'next-auth/react'


import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAvailableParcels } from '../lib/parcels'

export default function Home({ welcomeSection, supportSection, donateSection, partnerSection  }) {
  let { data: session, status } = useSession()

  return (
    <Layout>
      <Head>
        <title>Aberystwyth Foodbank</title>
      </Head>
      <div className='w-full flex flex-col'>
        <div className='p-2 border-b md:mx-40'>
          <div className='text-xl font-bold md:text-3xl md:mt-5'>{ welcomeSection.splashText }</div>
          <div className='text-right mt-2'>
            <h2 className='underline'>Contact</h2>
            <p>{ welcomeSection.email } <FontAwesomeIcon icon='envelope' /></p>
            <p>{ welcomeSection.phone } <FontAwesomeIcon icon='phone' /> </p>
            <h2 className='underline'>Location <FontAwesomeIcon icon='building' /> </h2>
            <p>{ welcomeSection.addressLineOne }</p>
            <p>{ welcomeSection.addressLineTwo }</p>
            <p>{ welcomeSection.addressTown }</p>
            <p>{ welcomeSection.addressPostcode }</p>
          </div>
          <Link href='/register'><a><div className='bg-secondary p-5 rounded-xl text-center mt-5 md:bg-highlight-one'>Register an Account</div></a></Link>
        </div>
        <div className='md:flex flex-wrap-0'>
          <div className='p-2 border-y border-highlight-one bg-secondary md:w-1/2 md:flex md:flex-col md:justify-between'>
            <h2 className='text-xl underline'>{ supportSection.title }</h2>
            <p>{ supportSection.text }</p>
            <div className='text-xl text-center mt-2 p-3 bg-highlight-one rounded-xl'>
              <FontAwesomeIcon icon='box' /> { supportSection.noParcels } parcels currently available
            </div>
          </div>

          <div className='p-2  md:w-1/2 md:bg-secondary md:border-y md:border-l md:border-highlight-one md:flex md:flex-col md:justify-between'>
            <h2 className='text-xl underline'>{ donateSection.title }</h2>
            <p>{ donateSection.text }</p>
            <Link href={donateSection.href}><a><div className='p-3 mt-2 rounded-xl md:text-xl text-center mt-5 bg-secondary md:bg-highlight-one'>{ donateSection.linkText }</div></a></Link>
          </div>
        </div>
        <div className='p-2 bg-secondary border-y border-highlight-one md:bg-inherit md:border-none'>
          <h2 className='text-xl underline'>{ partnerSection.title }</h2>
          <p>{ partnerSection.text }</p>
          <Link href={partnerSection.href}><a><div className='bg-highlight-one p-5 rounded-xl text-center mt-5'>{ partnerSection.linkText }</div></a></Link>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  let session = await getSession(context)
  let parcels = await getAvailableParcels()

  return {
    props: {
      session: session,
      welcomeSection: {
        splashText: 'Support for residents located in Aberystwyth and surrounding areas',
        addressLineOne: "42 Road Name",
        addressLineTwo: "",
        addressTown: "Aberystwyth",
        addressPostcode: "SY23 8BC",
        phone: '07888 434300',
        email: 'contact@aberfoodbank.example.com'
      },
      supportSection: {
        title: "Requesting Support",
        text: "Support from the foodbank is done via a referral system. If you are in need of support, speak to an agency such as Citizens Advice or Social Services to discuss your situation. They will provide you with referral details to place a request for an emergency 3-day food parcel.",
        noParcels: parcels.length
      },
      donateSection: {
        title: "Support your local Foodbank",
        text: "We rely on donations from the community to keep running and providing the support we do. Cash donations are the most effective way to help out as the money can be spent on what is needed most urgently.",
        linkText: "Donate Here",
        href: '/donate'
      },
      partnerSection: {
        title: "Professional Partners",
        text: "Our partnership with local organistions allows us provide support directly to those who need it most. If you are a local agency responsible for the care of vunerable individuals and would like to become a referring agency, or a local business that wishes to help out with bulk donations or set up a collection point, please fill in our partner application form.",
        linkText: "Learn how to become a partner organisation",
        href: '/partners'
      }
    }
  }
}
