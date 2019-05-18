export interface UserData {
  user_name: string;
  user_pass: string;
  user_email: string;
  user_url?: string;
  user_image?: string;
  user_bio?: string;
  user_status?: number;
}

export interface UserRo {
  user: UserData
}