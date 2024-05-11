export interface ITrello {
  id: string
  address: string
  badges: Badges
  checkItemStates: string[]
  closed: boolean
  coordinates: string
  creationMethod: string
  dateLastActivity: string
  desc: string
  descData: DescData
  due: string
  dueReminder: string
  idBoard: string
  idChecklists: IdChecklist[]
  idLabels: IdLabel[]
  idList: string
  idMembers: string[]
  idMembersVoted: string[]
  idShort: number
  labels: string[]
  limits: Limits
  locationName: string
  manualCoverAttachment: boolean
  name: string
  pos: number
  shortLink: string
  shortUrl: string
  subscribed: boolean
  url: string
  cover: Cover
}

export interface Badges {
  attachmentsByType: AttachmentsByType
  location: boolean
  votes: number
  viewingMemberVoted: boolean
  subscribed: boolean
  fogbugz: string
  checkItems: number
  checkItemsChecked: number
  comments: number
  attachments: number
  description: boolean
  due: string
  start: string
  dueComplete: boolean
}

export interface AttachmentsByType {
  trello: Trello
}

export interface Trello {
  board: number
  card: number
}

export interface DescData {
  emoji: Emoji
}

export interface Emoji {}

export interface IdChecklist {
  id: string
}

export interface IdLabel {
  id: string
  idBoard: string
  name: string
  color: string
}

export interface Limits {
  attachments: Attachments
}

export interface Attachments {
  perBoard: PerBoard
}

export interface PerBoard {
  status: string
  disableAt: number
  warnAt: number
}

export interface Cover {
  color: string
  idUploadedBackground: boolean
  size: string
  brightness: string
  isTemplate: boolean
}
