import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('User')
export class User {
  @JsonProperty('user_id', Number)
  userId = -1;

  @JsonProperty('username', String)
  username = '';

  @JsonProperty('realname', String)
  realName = '';

  @JsonProperty('nickname', String)
  nickname = '';
}
