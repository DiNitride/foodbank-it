export default function ErrorLine({ error }) {
  if (error !== '') {
    return <p className='text-sm text-red-600 text-center'>{ error }</p>
  } else {
    return <></>
  }
}