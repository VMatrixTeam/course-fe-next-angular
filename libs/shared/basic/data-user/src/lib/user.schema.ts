import { JsonProperty } from 'json2typescript';

export class User {
  @JsonProperty('user_id', Number)
  userId!: number;

  @JsonProperty('username', String)
  username!: string;

  @JsonProperty('realname', String)
  realName!: string;

  @JsonProperty('nickname', String)
  nickname!: string;
}
