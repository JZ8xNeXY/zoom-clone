import api from '../../lib/api'

export const meetingRepository = {
  async createMeeting():Promise<{meetingId:string}>{
    const result = await api.post('/meetings')
    return result.data
  },
  async joinMeeting(meetingId:string):Promise<{meetingId:string}>{
    const result = await api.post(`meetings/join/${meetingId}`)
    return result.data
  }
  }