// Raw Data from JSON file ------------------------------------------

export interface RawImage {
  png: string;
  webp: string;
}
export interface RawComment {
  id: string;
  content: string;
  createdAt: number;
  editedAt: number;
  displayedDate: string;
  score: { [s: string]: number };
  username: string;
  hasReplies: boolean;
}

export interface RawReply {
  id: string;
  content: string;
  createdAt: number;
  editedAt: number;
  displayedDate: string;
  score: { [s: string]: number };
  replyingTo: string;
  username: string;
}

