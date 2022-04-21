export default function ErrorLine({ error }) {
  if (error !== '') {
    return <p className='text-sm text-danger text-center'>{ error }</p>
  } else {
    return <></>
  }
}
