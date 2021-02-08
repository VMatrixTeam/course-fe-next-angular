/**
 * 表示Angular HTTPClient所支持的请求体类型
 */
export type ApiRequestBody = any;

/**
 * 表示对象类型，它的键值均为`string`类型，因此适合与JSON Object**相互**转换
 */
export type ApiResponseBody = Record<string, any>;
/**
 * 表示构造函数，其中`T`表示构造函数的返回值，必须符合{@link ApiResponseBody}
 *
 * 除了可以是我们自己用`class`声明出来的构造函数之外，
 * 还可以是ES原生类型：`String`、`Number`、`Boolean`等，注意开头大写
 *
 * @see {@link ObjectType}
 */
export type ApiResponseBodyTypeConstructor<T extends ApiResponseBody> = new (...args: any[]) => T;
