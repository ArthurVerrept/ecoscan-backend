// TODO: read into class-validator npm from tutorial

export class GoogleAuthCodeDto {
  code: string
  scope: string
  authuser: string
  prompt: string
}
 
export default GoogleAuthCodeDto