import useSWR from "swr"

// https://swr.vercel.app/docs/getting-started
function useUser() {
  let { data, error } = useSWR(`/api/users/`)

  return {
    user: data,
    isLoading: !error && !data,
    isError: error
  }
}

export default useUser