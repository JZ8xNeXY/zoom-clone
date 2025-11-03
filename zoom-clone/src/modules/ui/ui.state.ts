import {atom, useAtom} from 'jotai'

interface FlashMessage{
  message:string
  type:'success' | 'error'
}

const FlashMessageAtom = atom<FlashMessage | null>()

export const useFlashMessage = () => {
  const [flashMessage,setFlashMessage] = useAtom(FlashMessageAtom)

  const addMessage = (message:FlashMessage) =>{
    setFlashMessage(message)
    setTimeout(() =>{
      setFlashMessage(null)
    },3000)
  }

  const removeMessage = () =>{
    setFlashMessage(null)
  }

  return {flashMessage,addMessage,removeMessage}
}


