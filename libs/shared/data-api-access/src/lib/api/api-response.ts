import { JsonProperty } from 'json2typescript';

export class ApiResponse {
  // TODO: change to enum type
  @JsonProperty('status', String)
  readonly status!: string;

  @JsonProperty('msg', String)
  readonly message!: string;

  @JsonProperty('data')
  readonly data!: any;

  // ignore 'paramData', do not use it!
}
