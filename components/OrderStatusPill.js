export default function OrderStatusPill({ status }) {
  return (
    <span className={`rounded-full p-1 px-2 ${status === 'open' ? 'bg-green-500' : status === 'ready' ? 'bg-orange-500' : 'bg-gray-500' } text-white`}>{ status.substring(0, 1).toUpperCase() }{ status.substring(1) }</span>
  )
}
