import { useAtom } from "jotai"
import { useEffect, useState, useRef } from "react"
import { currentUserAtom } from "../auth/current-user.state"
import io, { Socket } from "socket.io-client"
import Peer from "peerjs"
import { useNavigate } from "react-router-dom"
import { useFlashMessage } from "../ui/ui.state"

export interface Participant {
  id:string,
  name:string,
  stream:MediaStream | null,
  cameraOn:boolean,
  voiceOn:boolean,
  isHost?:boolean,
}

//カスタムフック useMeeting
export const useMeeting = (meetingId:string) => {
  const [localStream,setLocalStream] = useState<MediaStream[]>([])
  const [currentUser] = useAtom(currentUserAtom)
  
  const [me,setMe] = useState<Participant>({
    id:currentUser!.id,
    name:currentUser!.name,
    stream:localStream[0],
    cameraOn:true,
    voiceOn:true
  })



  const socketRef = useRef<Socket | null>(null)
  const peerRef = useRef<Peer | null>(null)

  const [participants,setParticipants] = useState<Map<string,Participant>>(
    new Map()
  )

  const navigate = useNavigate()
  const {addMessage} = useFlashMessage()

  useEffect(() =>{
    setMe((prev) => ({...prev,stream:localStream[0]})) //streamだけ更新
    console.log(me)
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
    console.log('ビデオの変更')
    socketRef.current?.emit('updated-participant',meetingId,{
      id:me.id,
      name:me.name,
      voiceOn:me.voiceOn,
      cameraOn,
    })
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
    socketRef.current?.emit('update-participant',meetingId,{
      id:me.id,
      name:me.name,
      voiceOn,
      cameraOn:me.cameraOn,
    },
    )
    console.log(voiceOn)
  }

  const join = async() => {
    const localStream = me.stream
    if(localStream == null || currentUser == null) return
    //クライアントがSocketサーバに接続する
    socketRef.current = io(import.meta.env.VITE_API_URL)//socket接続を確立
    const socket = socketRef.current

    //Socketサーバーからクライアントに接続
    const handleSocketConnected = (localStream:MediaStream) => {
      const socket = socketRef.current
      if(socket == null) return

      //PeerJSサーバーに接続して自分のIDを発行
      peerRef.current = new Peer(me.id,{
        host: '0.peerjs.com',
        port: 443,
        secure: true,
      })

      const peer = peerRef.current
     //Peer接続が開いたら（自分の通話番号が確定）
      peer.on('open',() => {
        //クライアントがSocketサーバーにミーティングに参加することを通知
        socket.emit('join-meeting',meetingId,{
          id:me.id,
          name:me.name,
          cameraOn:me.cameraOn,
          voiceOn:me.voiceOn
        })    
      })
      //もし誰かから電話が来たら自分の映像を返して応答する
      peer.on('call',(mediaConn) => {
        console.log('相手')
        mediaConn.answer(localStream)
      })
    }

    //新しい参加者がミーティングに入ったときに、その情報を受け取って、Peer通話をかける
    const handleJoined = (data:any,localStream:MediaStream) => {
     if (peerRef.current == null) return
     data.participants.forEach((participant:any) => {
      if(participant.id != me.id){
        //相手のpeerIDに自分の映像を送る
        const call = peerRef.current!.call(participant.id,localStream)
        call.on('stream',(remoteStream) => {
          setParticipants((prev) => {
            const newMap = new Map(prev)
            newMap.set(participant.id,{
              ...participant,
              stream:remoteStream,
            })
            return newMap
          })
        })
      }else{
        setMe((prev) => ({
          ...prev,
          isHost:participant.isHost
        }))
      }
     })
    }
    
    //Socketサーバーからクライアントに接続が確立したらハンドラーを呼び出す
    socket.on('connect',() => {
      handleSocketConnected(localStream)
    })
    //新しい参加者がミーティングに入ったときに、その情報を受け取って、全クライアントに通知
    socket.on('participant-joined',(data) => {
      console.log('参加者が追加されました', data)
      handleJoined(data,localStream)
    })

    socket.on('existing-participants', (data) => {
      console.log('既存の参加者一覧', data)
      handleJoined(data, localStream)
    })

    socket.on('participant-updated',(data) => {
      setParticipants((prev) => {
        const newMap = new Map(prev)
        newMap.set(data.participant.id, {
          ...data.participant,
          stream:prev.get(data.participant.id)?.stream
        })
        return newMap
      })
    })

    socket.on('updated-participant', (meetingId, data) => {
      console.log('受信:', meetingId, data)
    })

    socket.on('participant-left',(data) => {
      setParticipants((prev) => {
        const newMap = new Map(prev)
        newMap.delete(data.leftParticipantId)
        return newMap
      })
    })

    socket.on('close',() =>{
      clear()
      addMessage({message:'ミーティングが終了しました',type:'success'})
      navigate('/')
    })
  }

  const clear = () =>{
    socketRef.current?.emit('leave-meeting',meetingId,me.id)

    localStream.forEach((stream) =>{
      stream.getTracks().forEach((track) => track.stop())
    })

    setLocalStream([])

    peerRef.current?.destroy()
    socketRef.current?.disconnect()

  }



  

  return {me,getStream,toggleVideo,toggleVoice,join,participants,clear}
}