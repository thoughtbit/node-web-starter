import { PostEntity } from './../../post/post.entity';
import { CommentEntity } from './../../comment/comment.entity';
export interface UserData {
  user_name: string;
  user_email: string;
  user_url?: string;
  user_image?: string;
  user_bio?: string;
  user_status?: number;
}

export interface UserRo {
  id: number;
  user: UserData;
  token?: any;
  posts?: PostEntity[];
  voted?: PostEntity[];
  comments?: CommentEntity[];
}
