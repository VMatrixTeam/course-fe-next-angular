import { JsonProperty } from 'json2typescript';

export class ApiResponse {
  // TODO: change to enum type
  @JsonProperty('status', String)
  status!: string;

  @JsonProperty('msg', String)
  message!: string;

  @JsonProperty('data')
  data!: any;

  // ignore 'paramData', do not use it!
}
