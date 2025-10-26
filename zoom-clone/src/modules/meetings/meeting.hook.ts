import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { currentUserAtom } from "../auth/current-user.state"

export interface Participant {
  id:string,
  name:string,
  stream:MediaStream | null,
  cameraOn:boolean,
  voiceOn:boolean
}
//カスタムフック useMeeting
export const useMeeting = () => {
  const [localStream,setLocalStream] = useState<MediaStream[]>([])
  const currentUser = useAtom(currentUserAtom)
  const [me,setMe] = useState<Participant>({
    id:currentUser!.id,
    name:currentUser!.name,
    stream:localStream[0],
    cameraOn:true,
    voiceOn:true
  })

  useEffect(() =>{
    setMe((prev) => ({...prev,stream:localStream[0]})) //streamだけ更新
  },[localStream])

  const getStream = async() =>{
    // 1️⃣ カメラ映像を取得
    const stream = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:true
    })
    setLocalStream((prev) =>[...prev,stream])
  }

  const toggleVideo = () =>{
    let cameraOn = false
    const localStream = me.stream
    if(localStream != null){
      const videoTracks = localStream.getVideoTracks()
      videoTracks.forEach((track) => {
        //現在の値と反対にする 映像切り替え
        track.enabled = !track.enabled
      })
      cameraOn = videoTracks[0]?.enabled
    }
    setMe((prev) => ({...prev,cameraOn}))
  }

  const toggleVoice = () =>{
    let voiceOn = false
    const localStream = me.stream
    if(localStream != null){
      const audioTracks = localStream.getAudioTracks()
      audioTracks.forEach((track) => {
        //現在の値と反対にする 映像切り替え
        track.enabled = !track.enabled
      })
    voiceOn = audioTracks[0]?.enabled
    }
    setMe((prev) => ({...prev,voiceOn}))
  }



  

  return {me,getStream,toggleVideo,toggleVoice}
}