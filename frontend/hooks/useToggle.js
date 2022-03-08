import { useState } from 'react'

export function useToggle(defaultState) {
  let [state, setState] = useState(defaultState || false)

  let toggle = () => {
    setState(!state)
  }

  return [state, toggle]
}