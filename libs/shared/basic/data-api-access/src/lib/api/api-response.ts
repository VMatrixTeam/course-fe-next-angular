import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('ApiResponse')
export class ApiResponse {
  @JsonProperty('status', String)
  readonly status: string = '';

  @JsonProperty('msg', String)
  readonly message: string = '';

  @JsonProperty('data')
  readonly data: any = undefined;

  // ignore 'paramData', do not use it!
}
