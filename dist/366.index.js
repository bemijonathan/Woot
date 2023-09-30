"use strict";
exports.id = 366;
exports.ids = [366];
exports.modules = {

/***/ 113:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ getEndpoint)
/* harmony export */ });
/**
 * This function generates an endpoint URL for (Azure) OpenAI
 * based on the configuration parameters provided.
 *
 * @param {OpenAIEndpointConfig} config - The configuration object for the (Azure) endpoint.
 *
 * @property {string} config.azureOpenAIApiDeploymentName - The deployment name of Azure OpenAI.
 * @property {string} config.azureOpenAIApiInstanceName - The instance name of Azure OpenAI.
 * @property {string} config.azureOpenAIApiKey - The API Key for Azure OpenAI.
 * @property {string} config.azureOpenAIBasePath - The base path for Azure OpenAI.
 * @property {string} config.baseURL - Some other custom base path URL.
 *
 * The function operates as follows:
 * - If both `azureOpenAIBasePath` and `azureOpenAIApiDeploymentName` (plus `azureOpenAIApiKey`) are provided, it returns an URL combining these two parameters (`${azureOpenAIBasePath}/${azureOpenAIApiDeploymentName}`).
 * - If `azureOpenAIApiKey` is provided, it checks for `azureOpenAIApiInstanceName` and `azureOpenAIApiDeploymentName` and throws an error if any of these is missing. If both are provided, it generates an URL incorporating these parameters.
 * - If none of the above conditions are met, return any custom `baseURL`.
 * - The function returns the generated URL as a string, or undefined if no custom paths are specified.
 *
 * @throws Will throw an error if the necessary parameters for generating the URL are missing.
 *
 * @returns {string | undefined} The generated (Azure) OpenAI endpoint URL.
 */
function getEndpoint(config) {
    const { azureOpenAIApiDeploymentName, azureOpenAIApiInstanceName, azureOpenAIApiKey, azureOpenAIBasePath, baseURL, } = config;
    if (azureOpenAIApiKey &&
        azureOpenAIBasePath &&
        azureOpenAIApiDeploymentName) {
        return `${azureOpenAIBasePath}/${azureOpenAIApiDeploymentName}`;
    }
    if (azureOpenAIApiKey) {
        if (!azureOpenAIApiInstanceName) {
            throw new Error("azureOpenAIApiInstanceName is required when using azureOpenAIApiKey");
        }
        if (!azureOpenAIApiDeploymentName) {
            throw new Error("azureOpenAIApiDeploymentName is a required parameter when using azureOpenAIApiKey");
        }
        return `https://${azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${azureOpenAIApiDeploymentName}`;
    }
    return baseURL;
}


/***/ }),

/***/ 8311:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ wrapOpenAIClientError)
/* harmony export */ });
/* harmony import */ var openai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapOpenAIClientError(e) {
    let error;
    if (e.constructor.name === openai__WEBPACK_IMPORTED_MODULE_0__/* .APIConnectionTimeoutError.name */ .zo.name) {
        error = new Error(e.message);
        error.name = "TimeoutError";
    }
    else if (e.constructor.name === openai__WEBPACK_IMPORTED_MODULE_0__/* .APIUserAbortError.name */ .Qr.name) {
        error = new Error(e.message);
        error.name = "AbortError";
    }
    else {
        error = e;
    }
    return error;
}


/***/ }),

/***/ 2306:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "r": () => (/* binding */ promptLayerTrackRequest)
/* harmony export */ });
const promptLayerTrackRequest = async (callerFunc, functionName, kwargs, plTags, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
requestResponse, startTime, endTime, apiKey) => {
    // https://github.com/MagnivOrg/promptlayer-js-helper
    const promptLayerResp = await callerFunc.call(fetch, "https://api.promptlayer.com/track-request", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            function_name: functionName,
            provider: "langchain",
            kwargs,
            tags: plTags,
            request_response: requestResponse,
            request_start_time: Math.floor(startTime / 1000),
            request_end_time: Math.floor(endTime / 1000),
            api_key: apiKey,
        }),
    });
    return promptLayerResp.json();
};


/***/ }),

/***/ 37:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "zo": () => (/* binding */ openai_APIConnectionTimeoutError),
  "Qr": () => (/* binding */ openai_APIUserAbortError),
  "Pp": () => (/* binding */ OpenAI)
});

// UNUSED EXPORTS: APIConnectionError, APIError, AuthenticationError, BadRequestError, ConflictError, InternalServerError, NotFoundError, PermissionDeniedError, RateLimitError, UnprocessableEntityError, default, fileFromPath, toFile

// NAMESPACE OBJECT: ./node_modules/openai/error.mjs
var error_namespaceObject = {};
__webpack_require__.r(error_namespaceObject);
__webpack_require__.d(error_namespaceObject, {
  "APIConnectionError": () => (APIConnectionError),
  "APIConnectionTimeoutError": () => (APIConnectionTimeoutError),
  "APIError": () => (APIError),
  "APIUserAbortError": () => (APIUserAbortError),
  "AuthenticationError": () => (AuthenticationError),
  "BadRequestError": () => (BadRequestError),
  "ConflictError": () => (ConflictError),
  "InternalServerError": () => (InternalServerError),
  "NotFoundError": () => (NotFoundError),
  "PermissionDeniedError": () => (PermissionDeniedError),
  "RateLimitError": () => (RateLimitError),
  "UnprocessableEntityError": () => (UnprocessableEntityError)
});

;// CONCATENATED MODULE: ./node_modules/openai/version.mjs
const VERSION = '4.4.0'; // x-release-please-version
//# sourceMappingURL=version.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/streaming.mjs
class Stream {
  constructor(response, controller) {
    this.response = response;
    this.controller = controller;
    this.decoder = new SSEDecoder();
  }
  async *iterMessages() {
    if (!this.response.body) {
      this.controller.abort();
      throw new Error(`Attempted to iterate over a response with no body`);
    }
    const lineDecoder = new LineDecoder();
    const iter = readableStreamAsyncIterable(this.response.body);
    for await (const chunk of iter) {
      for (const line of lineDecoder.decode(chunk)) {
        const sse = this.decoder.decode(line);
        if (sse) yield sse;
      }
    }
    for (const line of lineDecoder.flush()) {
      const sse = this.decoder.decode(line);
      if (sse) yield sse;
    }
  }
  async *[Symbol.asyncIterator]() {
    let done = false;
    try {
      for await (const sse of this.iterMessages()) {
        if (done) continue;
        if (sse.data.startsWith('[DONE]')) {
          done = true;
          continue;
        }
        if (sse.event === null) {
          try {
            yield JSON.parse(sse.data);
          } catch (e) {
            console.error(`Could not parse message into JSON:`, sse.data);
            console.error(`From chunk:`, sse.raw);
            throw e;
          }
        }
      }
      done = true;
    } catch (e) {
      // If the user calls `stream.controller.abort()`, we should exit without throwing.
      if (e instanceof Error && e.name === 'AbortError') return;
      throw e;
    } finally {
      // If the user `break`s, abort the ongoing request.
      if (!done) this.controller.abort();
    }
  }
}
class SSEDecoder {
  constructor() {
    this.event = null;
    this.data = [];
    this.chunks = [];
  }
  decode(line) {
    if (line.endsWith('\r')) {
      line = line.substring(0, line.length - 1);
    }
    if (!line) {
      // empty line and we didn't previously encounter any messages
      if (!this.event && !this.data.length) return null;
      const sse = {
        event: this.event,
        data: this.data.join('\n'),
        raw: this.chunks,
      };
      this.event = null;
      this.data = [];
      this.chunks = [];
      return sse;
    }
    this.chunks.push(line);
    if (line.startsWith(':')) {
      return null;
    }
    let [fieldname, _, value] = partition(line, ':');
    if (value.startsWith(' ')) {
      value = value.substring(1);
    }
    if (fieldname === 'event') {
      this.event = value;
    } else if (fieldname === 'data') {
      this.data.push(value);
    }
    return null;
  }
}
/**
 * A re-implementation of httpx's `LineDecoder` in Python that handles incrementally
 * reading lines from text.
 *
 * https://github.com/encode/httpx/blob/920333ea98118e9cf617f246905d7b202510941c/httpx/_decoders.py#L258
 */
class LineDecoder {
  constructor() {
    this.buffer = [];
    this.trailingCR = false;
  }
  decode(chunk) {
    let text = this.decodeText(chunk);
    if (this.trailingCR) {
      text = '\r' + text;
      this.trailingCR = false;
    }
    if (text.endsWith('\r')) {
      this.trailingCR = true;
      text = text.slice(0, -1);
    }
    if (!text) {
      return [];
    }
    const trailingNewline = LineDecoder.NEWLINE_CHARS.has(text[text.length - 1] || '');
    let lines = text.split(LineDecoder.NEWLINE_REGEXP);
    if (lines.length === 1 && !trailingNewline) {
      this.buffer.push(lines[0]);
      return [];
    }
    if (this.buffer.length > 0) {
      lines = [this.buffer.join('') + lines[0], ...lines.slice(1)];
      this.buffer = [];
    }
    if (!trailingNewline) {
      this.buffer = [lines.pop() || ''];
    }
    return lines;
  }
  decodeText(bytes) {
    var _a;
    if (bytes == null) return '';
    if (typeof bytes === 'string') return bytes;
    // Node:
    if (typeof Buffer !== 'undefined') {
      if (bytes instanceof Buffer) {
        return bytes.toString();
      }
      if (bytes instanceof Uint8Array) {
        return Buffer.from(bytes).toString();
      }
      throw new Error(
        `Unexpected: received non-Uint8Array (${bytes.constructor.name}) stream chunk in an environment with a global "Buffer" defined, which this library assumes to be Node. Please report this error.`,
      );
    }
    // Browser
    if (typeof TextDecoder !== 'undefined') {
      if (bytes instanceof Uint8Array || bytes instanceof ArrayBuffer) {
        (_a = this.textDecoder) !== null && _a !== void 0 ? _a : (this.textDecoder = new TextDecoder('utf8'));
        return this.textDecoder.decode(bytes);
      }
      throw new Error(
        `Unexpected: received non-Uint8Array/ArrayBuffer (${bytes.constructor.name}) in a web platform. Please report this error.`,
      );
    }
    throw new Error(
      `Unexpected: neither Buffer nor TextDecoder are available as globals. Please report this error.`,
    );
  }
  flush() {
    if (!this.buffer.length && !this.trailingCR) {
      return [];
    }
    const lines = [this.buffer.join('')];
    this.buffer = [];
    this.trailingCR = false;
    return lines;
  }
}
// prettier-ignore
LineDecoder.NEWLINE_CHARS = new Set(['\n', '\r', '\x0b', '\x0c', '\x1c', '\x1d', '\x1e', '\x85', '\u2028', '\u2029']);
LineDecoder.NEWLINE_REGEXP = /\r\n|[\n\r\x0b\x0c\x1c\x1d\x1e\x85\u2028\u2029]/g;
function partition(str, delimiter) {
  const index = str.indexOf(delimiter);
  if (index !== -1) {
    return [str.substring(0, index), delimiter, str.substring(index + delimiter.length)];
  }
  return [str, '', ''];
}
/**
 * Most browsers don't yet have async iterable support for ReadableStream,
 * and Node has a very different way of reading bytes from its "ReadableStream".
 *
 * This polyfill was pulled from https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
function readableStreamAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator]) return stream;
  const reader = stream.getReader();
  return {
    async next() {
      try {
        const result = await reader.read();
        if (result === null || result === void 0 ? void 0 : result.done) reader.releaseLock(); // release lock when stream becomes closed
        return result;
      } catch (e) {
        reader.releaseLock(); // release lock when stream becomes errored
        throw e;
      }
    },
    async return() {
      const cancelPromise = reader.cancel();
      reader.releaseLock();
      await cancelPromise;
      return { done: true, value: undefined };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
//# sourceMappingURL=streaming.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/error.mjs
// File generated from our OpenAPI spec by Stainless.

class APIError extends Error {
  constructor(status, error, message, headers) {
    super(APIError.makeMessage(error, message));
    this.status = status;
    this.headers = headers;
    const data = error;
    this.error = data;
    this.code = data === null || data === void 0 ? void 0 : data['code'];
    this.param = data === null || data === void 0 ? void 0 : data['param'];
    this.type = data === null || data === void 0 ? void 0 : data['type'];
  }
  static makeMessage(error, message) {
    return (
      (
        error === null || error === void 0 ? void 0 : error.message
      ) ?
        typeof error.message === 'string' ? error.message
        : JSON.stringify(error.message)
      : error ? JSON.stringify(error)
      : message || 'Unknown error occurred'
    );
  }
  static generate(status, errorResponse, message, headers) {
    if (!status) {
      return new APIConnectionError({ cause: castToError(errorResponse) });
    }
    const error = errorResponse === null || errorResponse === void 0 ? void 0 : errorResponse['error'];
    if (status === 400) {
      return new BadRequestError(status, error, message, headers);
    }
    if (status === 401) {
      return new AuthenticationError(status, error, message, headers);
    }
    if (status === 403) {
      return new PermissionDeniedError(status, error, message, headers);
    }
    if (status === 404) {
      return new NotFoundError(status, error, message, headers);
    }
    if (status === 409) {
      return new ConflictError(status, error, message, headers);
    }
    if (status === 422) {
      return new UnprocessableEntityError(status, error, message, headers);
    }
    if (status === 429) {
      return new RateLimitError(status, error, message, headers);
    }
    if (status >= 500) {
      return new InternalServerError(status, error, message, headers);
    }
    return new APIError(status, error, message, headers);
  }
}
class APIUserAbortError extends APIError {
  constructor({ message } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
    this.status = undefined;
  }
}
class APIConnectionError extends APIError {
  constructor({ message, cause }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    this.status = undefined;
    // in some environments the 'cause' property is already declared
    // @ts-ignore
    if (cause) this.cause = cause;
  }
}
class APIConnectionTimeoutError extends APIConnectionError {
  constructor() {
    super({ message: 'Request timed out.' });
  }
}
class BadRequestError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 400;
  }
}
class AuthenticationError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 401;
  }
}
class PermissionDeniedError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 403;
  }
}
class NotFoundError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 404;
  }
}
class ConflictError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 409;
  }
}
class UnprocessableEntityError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 422;
  }
}
class RateLimitError extends APIError {
  constructor() {
    super(...arguments);
    this.status = 429;
  }
}
class InternalServerError extends APIError {}
//# sourceMappingURL=error.mjs.map

// EXTERNAL MODULE: ./node_modules/agentkeepalive/index.js
var agentkeepalive = __webpack_require__(4623);
// EXTERNAL MODULE: ./node_modules/abort-controller/dist/abort-controller.js
var abort_controller = __webpack_require__(1659);
;// CONCATENATED MODULE: ./node_modules/openai/_shims/agent.node.mjs
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */


const defaultHttpAgent = new agentkeepalive({ keepAlive: true, timeout: 5 * 60 * 1000 });
const defaultHttpsAgent = new agentkeepalive.HttpsAgent({ keepAlive: true, timeout: 5 * 60 * 1000 });
// Polyfill global object if needed.
if (typeof AbortController === 'undefined') {
  AbortController = abort_controller.AbortController;
}
const getDefaultAgent = (url) => {
  if (defaultHttpsAgent && url.startsWith('https')) return defaultHttpsAgent;
  return defaultHttpAgent;
};
//# sourceMappingURL=agent.node.mjs.map

// EXTERNAL MODULE: ./node_modules/node-fetch/lib/index.js
var lib = __webpack_require__(467);
;// CONCATENATED MODULE: ./node_modules/openai/_shims/fetch.node.mjs
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */



const _fetch = lib;
const _Request = lib.Request;
const _Response = lib.Response;
const _Headers = lib.Headers;



const isPolyfilled = true;

// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
;// CONCATENATED MODULE: ./node_modules/web-streams-polyfill/dist/ponyfill.mjs
/**
 * @license
 * web-streams-polyfill v4.0.0-beta.3
 * Copyright 2021 Mattias Buelens, Diwank Singh Tomer and other contributors.
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */
const e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?Symbol:e=>`Symbol(${e})`;function t(){}function r(e){return"object"==typeof e&&null!==e||"function"==typeof e}const o=t;function n(e,t){try{Object.defineProperty(e,"name",{value:t,configurable:!0})}catch(e){}}const a=Promise,i=Promise.prototype.then,l=Promise.resolve.bind(a),s=Promise.reject.bind(a);function u(e){return new a(e)}function c(e){return l(e)}function d(e){return s(e)}function f(e,t,r){return i.call(e,t,r)}function b(e,t,r){f(f(e,t,r),void 0,o)}function h(e,t){b(e,t)}function _(e,t){b(e,void 0,t)}function p(e,t,r){return f(e,t,r)}function m(e){f(e,void 0,o)}let y=e=>{if("function"==typeof queueMicrotask)y=queueMicrotask;else{const e=c(void 0);y=t=>f(e,t)}return y(e)};function g(e,t,r){if("function"!=typeof e)throw new TypeError("Argument is not a function");return Function.prototype.apply.call(e,t,r)}function w(e,t,r){try{return c(g(e,t,r))}catch(e){return d(e)}}class S{constructor(){this._cursor=0,this._size=0,this._front={_elements:[],_next:void 0},this._back=this._front,this._cursor=0,this._size=0}get length(){return this._size}push(e){const t=this._back;let r=t;16383===t._elements.length&&(r={_elements:[],_next:void 0}),t._elements.push(e),r!==t&&(this._back=r,t._next=r),++this._size}shift(){const e=this._front;let t=e;const r=this._cursor;let o=r+1;const n=e._elements,a=n[r];return 16384===o&&(t=e._next,o=0),--this._size,this._cursor=o,e!==t&&(this._front=t),n[r]=void 0,a}forEach(e){let t=this._cursor,r=this._front,o=r._elements;for(;!(t===o.length&&void 0===r._next||t===o.length&&(r=r._next,o=r._elements,t=0,0===o.length));)e(o[t]),++t}peek(){const e=this._front,t=this._cursor;return e._elements[t]}}const v=e("[[AbortSteps]]"),R=e("[[ErrorSteps]]"),T=e("[[CancelSteps]]"),q=e("[[PullSteps]]"),C=e("[[ReleaseSteps]]");function E(e,t){e._ownerReadableStream=t,t._reader=e,"readable"===t._state?O(e):"closed"===t._state?function(e){O(e),j(e)}(e):B(e,t._storedError)}function P(e,t){return Gt(e._ownerReadableStream,t)}function W(e){const t=e._ownerReadableStream;"readable"===t._state?A(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):function(e,t){B(e,t)}(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),t._readableStreamController[C](),t._reader=void 0,e._ownerReadableStream=void 0}function k(e){return new TypeError("Cannot "+e+" a stream using a released reader")}function O(e){e._closedPromise=u(((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r}))}function B(e,t){O(e),A(e,t)}function A(e,t){void 0!==e._closedPromise_reject&&(m(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0)}function j(e){void 0!==e._closedPromise_resolve&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0)}const z=Number.isFinite||function(e){return"number"==typeof e&&isFinite(e)},L=Math.trunc||function(e){return e<0?Math.ceil(e):Math.floor(e)};function F(e,t){if(void 0!==e&&("object"!=typeof(r=e)&&"function"!=typeof r))throw new TypeError(`${t} is not an object.`);var r}function I(e,t){if("function"!=typeof e)throw new TypeError(`${t} is not a function.`)}function D(e,t){if(!function(e){return"object"==typeof e&&null!==e||"function"==typeof e}(e))throw new TypeError(`${t} is not an object.`)}function $(e,t,r){if(void 0===e)throw new TypeError(`Parameter ${t} is required in '${r}'.`)}function M(e,t,r){if(void 0===e)throw new TypeError(`${t} is required in '${r}'.`)}function Y(e){return Number(e)}function Q(e){return 0===e?0:e}function N(e,t){const r=Number.MAX_SAFE_INTEGER;let o=Number(e);if(o=Q(o),!z(o))throw new TypeError(`${t} is not a finite number`);if(o=function(e){return Q(L(e))}(o),o<0||o>r)throw new TypeError(`${t} is outside the accepted range of 0 to ${r}, inclusive`);return z(o)&&0!==o?o:0}function H(e){if(!r(e))return!1;if("function"!=typeof e.getReader)return!1;try{return"boolean"==typeof e.locked}catch(e){return!1}}function x(e){if(!r(e))return!1;if("function"!=typeof e.getWriter)return!1;try{return"boolean"==typeof e.locked}catch(e){return!1}}function V(e,t){if(!Vt(e))throw new TypeError(`${t} is not a ReadableStream.`)}function U(e,t){e._reader._readRequests.push(t)}function G(e,t,r){const o=e._reader._readRequests.shift();r?o._closeSteps():o._chunkSteps(t)}function X(e){return e._reader._readRequests.length}function J(e){const t=e._reader;return void 0!==t&&!!K(t)}class ReadableStreamDefaultReader{constructor(e){if($(e,1,"ReadableStreamDefaultReader"),V(e,"First parameter"),Ut(e))throw new TypeError("This stream has already been locked for exclusive reading by another reader");E(this,e),this._readRequests=new S}get closed(){return K(this)?this._closedPromise:d(ee("closed"))}cancel(e){return K(this)?void 0===this._ownerReadableStream?d(k("cancel")):P(this,e):d(ee("cancel"))}read(){if(!K(this))return d(ee("read"));if(void 0===this._ownerReadableStream)return d(k("read from"));let e,t;const r=u(((r,o)=>{e=r,t=o}));return function(e,t){const r=e._ownerReadableStream;r._disturbed=!0,"closed"===r._state?t._closeSteps():"errored"===r._state?t._errorSteps(r._storedError):r._readableStreamController[q](t)}(this,{_chunkSteps:t=>e({value:t,done:!1}),_closeSteps:()=>e({value:void 0,done:!0}),_errorSteps:e=>t(e)}),r}releaseLock(){if(!K(this))throw ee("releaseLock");void 0!==this._ownerReadableStream&&function(e){W(e);const t=new TypeError("Reader was released");Z(e,t)}(this)}}function K(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_readRequests")&&e instanceof ReadableStreamDefaultReader)}function Z(e,t){const r=e._readRequests;e._readRequests=new S,r.forEach((e=>{e._errorSteps(t)}))}function ee(e){return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`)}Object.defineProperties(ReadableStreamDefaultReader.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),n(ReadableStreamDefaultReader.prototype.cancel,"cancel"),n(ReadableStreamDefaultReader.prototype.read,"read"),n(ReadableStreamDefaultReader.prototype.releaseLock,"releaseLock"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableStreamDefaultReader.prototype,e.toStringTag,{value:"ReadableStreamDefaultReader",configurable:!0});class te{constructor(e,t){this._ongoingPromise=void 0,this._isFinished=!1,this._reader=e,this._preventCancel=t}next(){const e=()=>this._nextSteps();return this._ongoingPromise=this._ongoingPromise?p(this._ongoingPromise,e,e):e(),this._ongoingPromise}return(e){const t=()=>this._returnSteps(e);return this._ongoingPromise?p(this._ongoingPromise,t,t):t()}_nextSteps(){if(this._isFinished)return Promise.resolve({value:void 0,done:!0});const e=this._reader;return void 0===e?d(k("iterate")):f(e.read(),(e=>{var t;return this._ongoingPromise=void 0,e.done&&(this._isFinished=!0,null===(t=this._reader)||void 0===t||t.releaseLock(),this._reader=void 0),e}),(e=>{var t;throw this._ongoingPromise=void 0,this._isFinished=!0,null===(t=this._reader)||void 0===t||t.releaseLock(),this._reader=void 0,e}))}_returnSteps(e){if(this._isFinished)return Promise.resolve({value:e,done:!0});this._isFinished=!0;const t=this._reader;if(void 0===t)return d(k("finish iterating"));if(this._reader=void 0,!this._preventCancel){const r=t.cancel(e);return t.releaseLock(),p(r,(()=>({value:e,done:!0})))}return t.releaseLock(),c({value:e,done:!0})}}const re={next(){return oe(this)?this._asyncIteratorImpl.next():d(ne("next"))},return(e){return oe(this)?this._asyncIteratorImpl.return(e):d(ne("return"))}};function oe(e){if(!r(e))return!1;if(!Object.prototype.hasOwnProperty.call(e,"_asyncIteratorImpl"))return!1;try{return e._asyncIteratorImpl instanceof te}catch(e){return!1}}function ne(e){return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`)}"symbol"==typeof e.asyncIterator&&Object.defineProperty(re,e.asyncIterator,{value(){return this},writable:!0,configurable:!0});const ae=Number.isNaN||function(e){return e!=e};function ie(e,t,r,o,n){new Uint8Array(e).set(new Uint8Array(r,o,n),t)}function le(e){const t=function(e,t,r){if(e.slice)return e.slice(t,r);const o=r-t,n=new ArrayBuffer(o);return ie(n,0,e,t,o),n}(e.buffer,e.byteOffset,e.byteOffset+e.byteLength);return new Uint8Array(t)}function se(e){const t=e._queue.shift();return e._queueTotalSize-=t.size,e._queueTotalSize<0&&(e._queueTotalSize=0),t.value}function ue(e,t,r){if("number"!=typeof(o=r)||ae(o)||o<0||r===1/0)throw new RangeError("Size must be a finite, non-NaN, non-negative number.");var o;e._queue.push({value:t,size:r}),e._queueTotalSize+=r}function ce(e){e._queue=new S,e._queueTotalSize=0}class ReadableStreamBYOBRequest{constructor(){throw new TypeError("Illegal constructor")}get view(){if(!fe(this))throw Be("view");return this._view}respond(e){if(!fe(this))throw Be("respond");if($(e,1,"respond"),e=N(e,"First parameter"),void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated");this._view.buffer,function(e,t){const r=e._pendingPullIntos.peek();if("closed"===e._controlledReadableByteStream._state){if(0!==t)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")}else{if(0===t)throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");if(r.bytesFilled+t>r.byteLength)throw new RangeError("bytesWritten out of range")}r.buffer=r.buffer,qe(e,t)}(this._associatedReadableByteStreamController,e)}respondWithNewView(e){if(!fe(this))throw Be("respondWithNewView");if($(e,1,"respondWithNewView"),!ArrayBuffer.isView(e))throw new TypeError("You can only respond with array buffer views");if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated");e.buffer,function(e,t){const r=e._pendingPullIntos.peek();if("closed"===e._controlledReadableByteStream._state){if(0!==t.byteLength)throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream")}else if(0===t.byteLength)throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");if(r.byteOffset+r.bytesFilled!==t.byteOffset)throw new RangeError("The region specified by view does not match byobRequest");if(r.bufferByteLength!==t.buffer.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest");if(r.bytesFilled+t.byteLength>r.byteLength)throw new RangeError("The region specified by view is larger than byobRequest");const o=t.byteLength;r.buffer=t.buffer,qe(e,o)}(this._associatedReadableByteStreamController,e)}}Object.defineProperties(ReadableStreamBYOBRequest.prototype,{respond:{enumerable:!0},respondWithNewView:{enumerable:!0},view:{enumerable:!0}}),n(ReadableStreamBYOBRequest.prototype.respond,"respond"),n(ReadableStreamBYOBRequest.prototype.respondWithNewView,"respondWithNewView"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableStreamBYOBRequest.prototype,e.toStringTag,{value:"ReadableStreamBYOBRequest",configurable:!0});class ReadableByteStreamController{constructor(){throw new TypeError("Illegal constructor")}get byobRequest(){if(!de(this))throw Ae("byobRequest");return function(e){if(null===e._byobRequest&&e._pendingPullIntos.length>0){const t=e._pendingPullIntos.peek(),r=new Uint8Array(t.buffer,t.byteOffset+t.bytesFilled,t.byteLength-t.bytesFilled),o=Object.create(ReadableStreamBYOBRequest.prototype);!function(e,t,r){e._associatedReadableByteStreamController=t,e._view=r}(o,e,r),e._byobRequest=o}return e._byobRequest}(this)}get desiredSize(){if(!de(this))throw Ae("desiredSize");return ke(this)}close(){if(!de(this))throw Ae("close");if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");const e=this._controlledReadableByteStream._state;if("readable"!==e)throw new TypeError(`The stream (in ${e} state) is not in the readable state and cannot be closed`);!function(e){const t=e._controlledReadableByteStream;if(e._closeRequested||"readable"!==t._state)return;if(e._queueTotalSize>0)return void(e._closeRequested=!0);if(e._pendingPullIntos.length>0){if(e._pendingPullIntos.peek().bytesFilled>0){const t=new TypeError("Insufficient bytes to fill elements in the given buffer");throw Pe(e,t),t}}Ee(e),Xt(t)}(this)}enqueue(e){if(!de(this))throw Ae("enqueue");if($(e,1,"enqueue"),!ArrayBuffer.isView(e))throw new TypeError("chunk must be an array buffer view");if(0===e.byteLength)throw new TypeError("chunk must have non-zero byteLength");if(0===e.buffer.byteLength)throw new TypeError("chunk's buffer must have non-zero byteLength");if(this._closeRequested)throw new TypeError("stream is closed or draining");const t=this._controlledReadableByteStream._state;if("readable"!==t)throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be enqueued to`);!function(e,t){const r=e._controlledReadableByteStream;if(e._closeRequested||"readable"!==r._state)return;const o=t.buffer,n=t.byteOffset,a=t.byteLength,i=o;if(e._pendingPullIntos.length>0){const t=e._pendingPullIntos.peek();t.buffer,0,Re(e),t.buffer=t.buffer,"none"===t.readerType&&ge(e,t)}if(J(r))if(function(e){const t=e._controlledReadableByteStream._reader;for(;t._readRequests.length>0;){if(0===e._queueTotalSize)return;We(e,t._readRequests.shift())}}(e),0===X(r))me(e,i,n,a);else{e._pendingPullIntos.length>0&&Ce(e);G(r,new Uint8Array(i,n,a),!1)}else Le(r)?(me(e,i,n,a),Te(e)):me(e,i,n,a);be(e)}(this,e)}error(e){if(!de(this))throw Ae("error");Pe(this,e)}[T](e){he(this),ce(this);const t=this._cancelAlgorithm(e);return Ee(this),t}[q](e){const t=this._controlledReadableByteStream;if(this._queueTotalSize>0)return void We(this,e);const r=this._autoAllocateChunkSize;if(void 0!==r){let t;try{t=new ArrayBuffer(r)}catch(t){return void e._errorSteps(t)}const o={buffer:t,bufferByteLength:r,byteOffset:0,byteLength:r,bytesFilled:0,elementSize:1,viewConstructor:Uint8Array,readerType:"default"};this._pendingPullIntos.push(o)}U(t,e),be(this)}[C](){if(this._pendingPullIntos.length>0){const e=this._pendingPullIntos.peek();e.readerType="none",this._pendingPullIntos=new S,this._pendingPullIntos.push(e)}}}function de(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_controlledReadableByteStream")&&e instanceof ReadableByteStreamController)}function fe(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")&&e instanceof ReadableStreamBYOBRequest)}function be(e){const t=function(e){const t=e._controlledReadableByteStream;if("readable"!==t._state)return!1;if(e._closeRequested)return!1;if(!e._started)return!1;if(J(t)&&X(t)>0)return!0;if(Le(t)&&ze(t)>0)return!0;if(ke(e)>0)return!0;return!1}(e);if(!t)return;if(e._pulling)return void(e._pullAgain=!0);e._pulling=!0;b(e._pullAlgorithm(),(()=>(e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,be(e)),null)),(t=>(Pe(e,t),null)))}function he(e){Re(e),e._pendingPullIntos=new S}function _e(e,t){let r=!1;"closed"===e._state&&(r=!0);const o=pe(t);"default"===t.readerType?G(e,o,r):function(e,t,r){const o=e._reader._readIntoRequests.shift();r?o._closeSteps(t):o._chunkSteps(t)}(e,o,r)}function pe(e){const t=e.bytesFilled,r=e.elementSize;return new e.viewConstructor(e.buffer,e.byteOffset,t/r)}function me(e,t,r,o){e._queue.push({buffer:t,byteOffset:r,byteLength:o}),e._queueTotalSize+=o}function ye(e,t,r,o){let n;try{n=t.slice(r,r+o)}catch(t){throw Pe(e,t),t}me(e,n,0,o)}function ge(e,t){t.bytesFilled>0&&ye(e,t.buffer,t.byteOffset,t.bytesFilled),Ce(e)}function we(e,t){const r=t.elementSize,o=t.bytesFilled-t.bytesFilled%r,n=Math.min(e._queueTotalSize,t.byteLength-t.bytesFilled),a=t.bytesFilled+n,i=a-a%r;let l=n,s=!1;i>o&&(l=i-t.bytesFilled,s=!0);const u=e._queue;for(;l>0;){const r=u.peek(),o=Math.min(l,r.byteLength),n=t.byteOffset+t.bytesFilled;ie(t.buffer,n,r.buffer,r.byteOffset,o),r.byteLength===o?u.shift():(r.byteOffset+=o,r.byteLength-=o),e._queueTotalSize-=o,Se(e,o,t),l-=o}return s}function Se(e,t,r){r.bytesFilled+=t}function ve(e){0===e._queueTotalSize&&e._closeRequested?(Ee(e),Xt(e._controlledReadableByteStream)):be(e)}function Re(e){null!==e._byobRequest&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=null,e._byobRequest=null)}function Te(e){for(;e._pendingPullIntos.length>0;){if(0===e._queueTotalSize)return;const t=e._pendingPullIntos.peek();we(e,t)&&(Ce(e),_e(e._controlledReadableByteStream,t))}}function qe(e,t){const r=e._pendingPullIntos.peek();Re(e);"closed"===e._controlledReadableByteStream._state?function(e,t){"none"===t.readerType&&Ce(e);const r=e._controlledReadableByteStream;if(Le(r))for(;ze(r)>0;)_e(r,Ce(e))}(e,r):function(e,t,r){if(Se(0,t,r),"none"===r.readerType)return ge(e,r),void Te(e);if(r.bytesFilled<r.elementSize)return;Ce(e);const o=r.bytesFilled%r.elementSize;if(o>0){const t=r.byteOffset+r.bytesFilled;ye(e,r.buffer,t-o,o)}r.bytesFilled-=o,_e(e._controlledReadableByteStream,r),Te(e)}(e,t,r),be(e)}function Ce(e){return e._pendingPullIntos.shift()}function Ee(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0}function Pe(e,t){const r=e._controlledReadableByteStream;"readable"===r._state&&(he(e),ce(e),Ee(e),Jt(r,t))}function We(e,t){const r=e._queue.shift();e._queueTotalSize-=r.byteLength,ve(e);const o=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t._chunkSteps(o)}function ke(e){const t=e._controlledReadableByteStream._state;return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}function Oe(e,t,r){const o=Object.create(ReadableByteStreamController.prototype);let n,a,i;n=void 0!==t.start?()=>t.start(o):()=>{},a=void 0!==t.pull?()=>t.pull(o):()=>c(void 0),i=void 0!==t.cancel?e=>t.cancel(e):()=>c(void 0);const l=t.autoAllocateChunkSize;if(0===l)throw new TypeError("autoAllocateChunkSize must be greater than 0");!function(e,t,r,o,n,a,i){t._controlledReadableByteStream=e,t._pullAgain=!1,t._pulling=!1,t._byobRequest=null,t._queue=t._queueTotalSize=void 0,ce(t),t._closeRequested=!1,t._started=!1,t._strategyHWM=a,t._pullAlgorithm=o,t._cancelAlgorithm=n,t._autoAllocateChunkSize=i,t._pendingPullIntos=new S,e._readableStreamController=t,b(c(r()),(()=>(t._started=!0,be(t),null)),(e=>(Pe(t,e),null)))}(e,o,n,a,i,r,l)}function Be(e){return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`)}function Ae(e){return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`)}function je(e,t){e._reader._readIntoRequests.push(t)}function ze(e){return e._reader._readIntoRequests.length}function Le(e){const t=e._reader;return void 0!==t&&!!Fe(t)}Object.defineProperties(ReadableByteStreamController.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},byobRequest:{enumerable:!0},desiredSize:{enumerable:!0}}),n(ReadableByteStreamController.prototype.close,"close"),n(ReadableByteStreamController.prototype.enqueue,"enqueue"),n(ReadableByteStreamController.prototype.error,"error"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableByteStreamController.prototype,e.toStringTag,{value:"ReadableByteStreamController",configurable:!0});class ReadableStreamBYOBReader{constructor(e){if($(e,1,"ReadableStreamBYOBReader"),V(e,"First parameter"),Ut(e))throw new TypeError("This stream has already been locked for exclusive reading by another reader");if(!de(e._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");E(this,e),this._readIntoRequests=new S}get closed(){return Fe(this)?this._closedPromise:d(De("closed"))}cancel(e){return Fe(this)?void 0===this._ownerReadableStream?d(k("cancel")):P(this,e):d(De("cancel"))}read(e){if(!Fe(this))return d(De("read"));if(!ArrayBuffer.isView(e))return d(new TypeError("view must be an array buffer view"));if(0===e.byteLength)return d(new TypeError("view must have non-zero byteLength"));if(0===e.buffer.byteLength)return d(new TypeError("view's buffer must have non-zero byteLength"));if(e.buffer,void 0===this._ownerReadableStream)return d(k("read from"));let t,r;const o=u(((e,o)=>{t=e,r=o}));return function(e,t,r){const o=e._ownerReadableStream;o._disturbed=!0,"errored"===o._state?r._errorSteps(o._storedError):function(e,t,r){const o=e._controlledReadableByteStream;let n=1;t.constructor!==DataView&&(n=t.constructor.BYTES_PER_ELEMENT);const a=t.constructor,i=t.buffer,l={buffer:i,bufferByteLength:i.byteLength,byteOffset:t.byteOffset,byteLength:t.byteLength,bytesFilled:0,elementSize:n,viewConstructor:a,readerType:"byob"};if(e._pendingPullIntos.length>0)return e._pendingPullIntos.push(l),void je(o,r);if("closed"!==o._state){if(e._queueTotalSize>0){if(we(e,l)){const t=pe(l);return ve(e),void r._chunkSteps(t)}if(e._closeRequested){const t=new TypeError("Insufficient bytes to fill elements in the given buffer");return Pe(e,t),void r._errorSteps(t)}}e._pendingPullIntos.push(l),je(o,r),be(e)}else{const e=new a(l.buffer,l.byteOffset,0);r._closeSteps(e)}}(o._readableStreamController,t,r)}(this,e,{_chunkSteps:e=>t({value:e,done:!1}),_closeSteps:e=>t({value:e,done:!0}),_errorSteps:e=>r(e)}),o}releaseLock(){if(!Fe(this))throw De("releaseLock");void 0!==this._ownerReadableStream&&function(e){W(e);const t=new TypeError("Reader was released");Ie(e,t)}(this)}}function Fe(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")&&e instanceof ReadableStreamBYOBReader)}function Ie(e,t){const r=e._readIntoRequests;e._readIntoRequests=new S,r.forEach((e=>{e._errorSteps(t)}))}function De(e){return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`)}function $e(e,t){const{highWaterMark:r}=e;if(void 0===r)return t;if(ae(r)||r<0)throw new RangeError("Invalid highWaterMark");return r}function Me(e){const{size:t}=e;return t||(()=>1)}function Ye(e,t){F(e,t);const r=null==e?void 0:e.highWaterMark,o=null==e?void 0:e.size;return{highWaterMark:void 0===r?void 0:Y(r),size:void 0===o?void 0:Qe(o,`${t} has member 'size' that`)}}function Qe(e,t){return I(e,t),t=>Y(e(t))}function Ne(e,t,r){return I(e,r),r=>w(e,t,[r])}function He(e,t,r){return I(e,r),()=>w(e,t,[])}function xe(e,t,r){return I(e,r),r=>g(e,t,[r])}function Ve(e,t,r){return I(e,r),(r,o)=>w(e,t,[r,o])}Object.defineProperties(ReadableStreamBYOBReader.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),n(ReadableStreamBYOBReader.prototype.cancel,"cancel"),n(ReadableStreamBYOBReader.prototype.read,"read"),n(ReadableStreamBYOBReader.prototype.releaseLock,"releaseLock"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableStreamBYOBReader.prototype,e.toStringTag,{value:"ReadableStreamBYOBReader",configurable:!0});const Ue="function"==typeof AbortController;class WritableStream{constructor(e={},t={}){void 0===e?e=null:D(e,"First parameter");const r=Ye(t,"Second parameter"),o=function(e,t){F(e,t);const r=null==e?void 0:e.abort,o=null==e?void 0:e.close,n=null==e?void 0:e.start,a=null==e?void 0:e.type,i=null==e?void 0:e.write;return{abort:void 0===r?void 0:Ne(r,e,`${t} has member 'abort' that`),close:void 0===o?void 0:He(o,e,`${t} has member 'close' that`),start:void 0===n?void 0:xe(n,e,`${t} has member 'start' that`),write:void 0===i?void 0:Ve(i,e,`${t} has member 'write' that`),type:a}}(e,"First parameter");var n;(n=this)._state="writable",n._storedError=void 0,n._writer=void 0,n._writableStreamController=void 0,n._writeRequests=new S,n._inFlightWriteRequest=void 0,n._closeRequest=void 0,n._inFlightCloseRequest=void 0,n._pendingAbortRequest=void 0,n._backpressure=!1;if(void 0!==o.type)throw new RangeError("Invalid type is specified");const a=Me(r);!function(e,t,r,o){const n=Object.create(WritableStreamDefaultController.prototype);let a,i,l,s;a=void 0!==t.start?()=>t.start(n):()=>{};i=void 0!==t.write?e=>t.write(e,n):()=>c(void 0);l=void 0!==t.close?()=>t.close():()=>c(void 0);s=void 0!==t.abort?e=>t.abort(e):()=>c(void 0);!function(e,t,r,o,n,a,i,l){t._controlledWritableStream=e,e._writableStreamController=t,t._queue=void 0,t._queueTotalSize=void 0,ce(t),t._abortReason=void 0,t._abortController=function(){if(Ue)return new AbortController}(),t._started=!1,t._strategySizeAlgorithm=l,t._strategyHWM=i,t._writeAlgorithm=o,t._closeAlgorithm=n,t._abortAlgorithm=a;const s=bt(t);nt(e,s);const u=r();b(c(u),(()=>(t._started=!0,dt(t),null)),(r=>(t._started=!0,Ze(e,r),null)))}(e,n,a,i,l,s,r,o)}(this,o,$e(r,1),a)}get locked(){if(!Ge(this))throw _t("locked");return Xe(this)}abort(e){return Ge(this)?Xe(this)?d(new TypeError("Cannot abort a stream that already has a writer")):Je(this,e):d(_t("abort"))}close(){return Ge(this)?Xe(this)?d(new TypeError("Cannot close a stream that already has a writer")):rt(this)?d(new TypeError("Cannot close an already-closing stream")):Ke(this):d(_t("close"))}getWriter(){if(!Ge(this))throw _t("getWriter");return new WritableStreamDefaultWriter(this)}}function Ge(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")&&e instanceof WritableStream)}function Xe(e){return void 0!==e._writer}function Je(e,t){var r;if("closed"===e._state||"errored"===e._state)return c(void 0);e._writableStreamController._abortReason=t,null===(r=e._writableStreamController._abortController)||void 0===r||r.abort(t);const o=e._state;if("closed"===o||"errored"===o)return c(void 0);if(void 0!==e._pendingAbortRequest)return e._pendingAbortRequest._promise;let n=!1;"erroring"===o&&(n=!0,t=void 0);const a=u(((r,o)=>{e._pendingAbortRequest={_promise:void 0,_resolve:r,_reject:o,_reason:t,_wasAlreadyErroring:n}}));return e._pendingAbortRequest._promise=a,n||et(e,t),a}function Ke(e){const t=e._state;if("closed"===t||"errored"===t)return d(new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));const r=u(((t,r)=>{const o={_resolve:t,_reject:r};e._closeRequest=o})),o=e._writer;var n;return void 0!==o&&e._backpressure&&"writable"===t&&Et(o),ue(n=e._writableStreamController,lt,0),dt(n),r}function Ze(e,t){"writable"!==e._state?tt(e):et(e,t)}function et(e,t){const r=e._writableStreamController;e._state="erroring",e._storedError=t;const o=e._writer;void 0!==o&&it(o,t),!function(e){if(void 0===e._inFlightWriteRequest&&void 0===e._inFlightCloseRequest)return!1;return!0}(e)&&r._started&&tt(e)}function tt(e){e._state="errored",e._writableStreamController[R]();const t=e._storedError;if(e._writeRequests.forEach((e=>{e._reject(t)})),e._writeRequests=new S,void 0===e._pendingAbortRequest)return void ot(e);const r=e._pendingAbortRequest;if(e._pendingAbortRequest=void 0,r._wasAlreadyErroring)return r._reject(t),void ot(e);b(e._writableStreamController[v](r._reason),(()=>(r._resolve(),ot(e),null)),(t=>(r._reject(t),ot(e),null)))}function rt(e){return void 0!==e._closeRequest||void 0!==e._inFlightCloseRequest}function ot(e){void 0!==e._closeRequest&&(e._closeRequest._reject(e._storedError),e._closeRequest=void 0);const t=e._writer;void 0!==t&&St(t,e._storedError)}function nt(e,t){const r=e._writer;void 0!==r&&t!==e._backpressure&&(t?function(e){Rt(e)}(r):Et(r)),e._backpressure=t}Object.defineProperties(WritableStream.prototype,{abort:{enumerable:!0},close:{enumerable:!0},getWriter:{enumerable:!0},locked:{enumerable:!0}}),n(WritableStream.prototype.abort,"abort"),n(WritableStream.prototype.close,"close"),n(WritableStream.prototype.getWriter,"getWriter"),"symbol"==typeof e.toStringTag&&Object.defineProperty(WritableStream.prototype,e.toStringTag,{value:"WritableStream",configurable:!0});class WritableStreamDefaultWriter{constructor(e){if($(e,1,"WritableStreamDefaultWriter"),function(e,t){if(!Ge(e))throw new TypeError(`${t} is not a WritableStream.`)}(e,"First parameter"),Xe(e))throw new TypeError("This stream has already been locked for exclusive writing by another writer");this._ownerWritableStream=e,e._writer=this;const t=e._state;if("writable"===t)!rt(e)&&e._backpressure?Rt(this):qt(this),gt(this);else if("erroring"===t)Tt(this,e._storedError),gt(this);else if("closed"===t)qt(this),gt(r=this),vt(r);else{const t=e._storedError;Tt(this,t),wt(this,t)}var r}get closed(){return at(this)?this._closedPromise:d(mt("closed"))}get desiredSize(){if(!at(this))throw mt("desiredSize");if(void 0===this._ownerWritableStream)throw yt("desiredSize");return function(e){const t=e._ownerWritableStream,r=t._state;if("errored"===r||"erroring"===r)return null;if("closed"===r)return 0;return ct(t._writableStreamController)}(this)}get ready(){return at(this)?this._readyPromise:d(mt("ready"))}abort(e){return at(this)?void 0===this._ownerWritableStream?d(yt("abort")):function(e,t){return Je(e._ownerWritableStream,t)}(this,e):d(mt("abort"))}close(){if(!at(this))return d(mt("close"));const e=this._ownerWritableStream;return void 0===e?d(yt("close")):rt(e)?d(new TypeError("Cannot close an already-closing stream")):Ke(this._ownerWritableStream)}releaseLock(){if(!at(this))throw mt("releaseLock");void 0!==this._ownerWritableStream&&function(e){const t=e._ownerWritableStream,r=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");it(e,r),function(e,t){"pending"===e._closedPromiseState?St(e,t):function(e,t){wt(e,t)}(e,t)}(e,r),t._writer=void 0,e._ownerWritableStream=void 0}(this)}write(e){return at(this)?void 0===this._ownerWritableStream?d(yt("write to")):function(e,t){const r=e._ownerWritableStream,o=r._writableStreamController,n=function(e,t){try{return e._strategySizeAlgorithm(t)}catch(t){return ft(e,t),1}}(o,t);if(r!==e._ownerWritableStream)return d(yt("write to"));const a=r._state;if("errored"===a)return d(r._storedError);if(rt(r)||"closed"===a)return d(new TypeError("The stream is closing or closed and cannot be written to"));if("erroring"===a)return d(r._storedError);const i=function(e){return u(((t,r)=>{const o={_resolve:t,_reject:r};e._writeRequests.push(o)}))}(r);return function(e,t,r){try{ue(e,t,r)}catch(t){return void ft(e,t)}const o=e._controlledWritableStream;if(!rt(o)&&"writable"===o._state){nt(o,bt(e))}dt(e)}(o,t,n),i}(this,e):d(mt("write"))}}function at(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")&&e instanceof WritableStreamDefaultWriter)}function it(e,t){"pending"===e._readyPromiseState?Ct(e,t):function(e,t){Tt(e,t)}(e,t)}Object.defineProperties(WritableStreamDefaultWriter.prototype,{abort:{enumerable:!0},close:{enumerable:!0},releaseLock:{enumerable:!0},write:{enumerable:!0},closed:{enumerable:!0},desiredSize:{enumerable:!0},ready:{enumerable:!0}}),n(WritableStreamDefaultWriter.prototype.abort,"abort"),n(WritableStreamDefaultWriter.prototype.close,"close"),n(WritableStreamDefaultWriter.prototype.releaseLock,"releaseLock"),n(WritableStreamDefaultWriter.prototype.write,"write"),"symbol"==typeof e.toStringTag&&Object.defineProperty(WritableStreamDefaultWriter.prototype,e.toStringTag,{value:"WritableStreamDefaultWriter",configurable:!0});const lt={};class WritableStreamDefaultController{constructor(){throw new TypeError("Illegal constructor")}get abortReason(){if(!st(this))throw pt("abortReason");return this._abortReason}get signal(){if(!st(this))throw pt("signal");if(void 0===this._abortController)throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");return this._abortController.signal}error(e){if(!st(this))throw pt("error");"writable"===this._controlledWritableStream._state&&ht(this,e)}[v](e){const t=this._abortAlgorithm(e);return ut(this),t}[R](){ce(this)}}function st(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_controlledWritableStream")&&e instanceof WritableStreamDefaultController)}function ut(e){e._writeAlgorithm=void 0,e._closeAlgorithm=void 0,e._abortAlgorithm=void 0,e._strategySizeAlgorithm=void 0}function ct(e){return e._strategyHWM-e._queueTotalSize}function dt(e){const t=e._controlledWritableStream;if(!e._started)return;if(void 0!==t._inFlightWriteRequest)return;if("erroring"===t._state)return void tt(t);if(0===e._queue.length)return;const r=e._queue.peek().value;r===lt?function(e){const t=e._controlledWritableStream;(function(e){e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0})(t),se(e);const r=e._closeAlgorithm();ut(e),b(r,(()=>(function(e){e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0,"erroring"===e._state&&(e._storedError=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed";const t=e._writer;void 0!==t&&vt(t)}(t),null)),(e=>(function(e,t){e._inFlightCloseRequest._reject(t),e._inFlightCloseRequest=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._reject(t),e._pendingAbortRequest=void 0),Ze(e,t)}(t,e),null)))}(e):function(e,t){const r=e._controlledWritableStream;!function(e){e._inFlightWriteRequest=e._writeRequests.shift()}(r);b(e._writeAlgorithm(t),(()=>{!function(e){e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0}(r);const t=r._state;if(se(e),!rt(r)&&"writable"===t){const t=bt(e);nt(r,t)}return dt(e),null}),(t=>("writable"===r._state&&ut(e),function(e,t){e._inFlightWriteRequest._reject(t),e._inFlightWriteRequest=void 0,Ze(e,t)}(r,t),null)))}(e,r)}function ft(e,t){"writable"===e._controlledWritableStream._state&&ht(e,t)}function bt(e){return ct(e)<=0}function ht(e,t){const r=e._controlledWritableStream;ut(e),et(r,t)}function _t(e){return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`)}function pt(e){return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`)}function mt(e){return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`)}function yt(e){return new TypeError("Cannot "+e+" a stream using a released writer")}function gt(e){e._closedPromise=u(((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r,e._closedPromiseState="pending"}))}function wt(e,t){gt(e),St(e,t)}function St(e,t){void 0!==e._closedPromise_reject&&(m(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected")}function vt(e){void 0!==e._closedPromise_resolve&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved")}function Rt(e){e._readyPromise=u(((t,r)=>{e._readyPromise_resolve=t,e._readyPromise_reject=r})),e._readyPromiseState="pending"}function Tt(e,t){Rt(e),Ct(e,t)}function qt(e){Rt(e),Et(e)}function Ct(e,t){void 0!==e._readyPromise_reject&&(m(e._readyPromise),e._readyPromise_reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected")}function Et(e){void 0!==e._readyPromise_resolve&&(e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled")}Object.defineProperties(WritableStreamDefaultController.prototype,{abortReason:{enumerable:!0},signal:{enumerable:!0},error:{enumerable:!0}}),"symbol"==typeof e.toStringTag&&Object.defineProperty(WritableStreamDefaultController.prototype,e.toStringTag,{value:"WritableStreamDefaultController",configurable:!0});const Pt="undefined"!=typeof DOMException?DOMException:void 0;const Wt=function(e){if("function"!=typeof e&&"object"!=typeof e)return!1;try{return new e,!0}catch(e){return!1}}(Pt)?Pt:function(){const e=function(e,t){this.message=e||"",this.name=t||"Error",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor)};return e.prototype=Object.create(Error.prototype),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,configurable:!0}),e}();function kt(e,t,r,o,n,a){const i=e.getReader(),l=t.getWriter();Vt(e)&&(e._disturbed=!0);let s,_,g,w=!1,S=!1,v="readable",R="writable",T=!1,q=!1;const C=u((e=>{g=e}));let E=Promise.resolve(void 0);return u(((P,W)=>{let k;function O(){if(w)return;const e=u(((e,t)=>{!function r(o){o?e():f(function(){if(w)return c(!0);return f(l.ready,(()=>f(i.read(),(e=>!!e.done||(E=l.write(e.value),m(E),!1)))))}(),r,t)}(!1)}));m(e)}function B(){return v="closed",r?L():z((()=>(Ge(t)&&(T=rt(t),R=t._state),T||"closed"===R?c(void 0):"erroring"===R||"errored"===R?d(_):(T=!0,l.close()))),!1,void 0),null}function A(e){return w||(v="errored",s=e,o?L(!0,e):z((()=>l.abort(e)),!0,e)),null}function j(e){return S||(R="errored",_=e,n?L(!0,e):z((()=>i.cancel(e)),!0,e)),null}if(void 0!==a&&(k=()=>{const e=void 0!==a.reason?a.reason:new Wt("Aborted","AbortError"),t=[];o||t.push((()=>"writable"===R?l.abort(e):c(void 0))),n||t.push((()=>"readable"===v?i.cancel(e):c(void 0))),z((()=>Promise.all(t.map((e=>e())))),!0,e)},a.aborted?k():a.addEventListener("abort",k)),Vt(e)&&(v=e._state,s=e._storedError),Ge(t)&&(R=t._state,_=t._storedError,T=rt(t)),Vt(e)&&Ge(t)&&(q=!0,g()),"errored"===v)A(s);else if("erroring"===R||"errored"===R)j(_);else if("closed"===v)B();else if(T||"closed"===R){const e=new TypeError("the destination writable stream closed before all data could be piped to it");n?L(!0,e):z((()=>i.cancel(e)),!0,e)}function z(e,t,r){function o(){return"writable"!==R||T?n():h(function(){let e;return c(function t(){if(e!==E)return e=E,p(E,t,t)}())}(),n),null}function n(){return e?b(e(),(()=>F(t,r)),(e=>F(!0,e))):F(t,r),null}w||(w=!0,q?o():h(C,o))}function L(e,t){z(void 0,e,t)}function F(e,t){return S=!0,l.releaseLock(),i.releaseLock(),void 0!==a&&a.removeEventListener("abort",k),e?W(t):P(void 0),null}w||(b(i.closed,B,A),b(l.closed,(function(){return S||(R="closed"),null}),j)),q?O():y((()=>{q=!0,g(),O()}))}))}function Ot(e,t){return function(e){try{return e.getReader({mode:"byob"}).releaseLock(),!0}catch(e){return!1}}(e)?function(e){let t,r,o,n,a,i=e.getReader(),l=!1,s=!1,d=!1,f=!1,h=!1,p=!1;const m=u((e=>{a=e}));function y(e){_(e.closed,(t=>(e!==i||(o.error(t),n.error(t),h&&p||a(void 0)),null)))}function g(){l&&(i.releaseLock(),i=e.getReader(),y(i),l=!1),b(i.read(),(e=>{var t,r;if(d=!1,f=!1,e.done)return h||o.close(),p||n.close(),null===(t=o.byobRequest)||void 0===t||t.respond(0),null===(r=n.byobRequest)||void 0===r||r.respond(0),h&&p||a(void 0),null;const l=e.value,u=l;let c=l;if(!h&&!p)try{c=le(l)}catch(e){return o.error(e),n.error(e),a(i.cancel(e)),null}return h||o.enqueue(u),p||n.enqueue(c),s=!1,d?S():f&&v(),null}),(()=>(s=!1,null)))}function w(t,r){l||(i.releaseLock(),i=e.getReader({mode:"byob"}),y(i),l=!0);const u=r?n:o,c=r?o:n;b(i.read(t),(e=>{var t;d=!1,f=!1;const o=r?p:h,n=r?h:p;if(e.done){o||u.close(),n||c.close();const r=e.value;return void 0!==r&&(o||u.byobRequest.respondWithNewView(r),n||null===(t=c.byobRequest)||void 0===t||t.respond(0)),o&&n||a(void 0),null}const l=e.value;if(n)o||u.byobRequest.respondWithNewView(l);else{let e;try{e=le(l)}catch(e){return u.error(e),c.error(e),a(i.cancel(e)),null}o||u.byobRequest.respondWithNewView(l),c.enqueue(e)}return s=!1,d?S():f&&v(),null}),(()=>(s=!1,null)))}function S(){if(s)return d=!0,c(void 0);s=!0;const e=o.byobRequest;return null===e?g():w(e.view,!1),c(void 0)}function v(){if(s)return f=!0,c(void 0);s=!0;const e=n.byobRequest;return null===e?g():w(e.view,!0),c(void 0)}function R(e){if(h=!0,t=e,p){const e=[t,r],o=i.cancel(e);a(o)}return m}function T(e){if(p=!0,r=e,h){const e=[t,r],o=i.cancel(e);a(o)}return m}const q=new ReadableStream({type:"bytes",start(e){o=e},pull:S,cancel:R}),C=new ReadableStream({type:"bytes",start(e){n=e},pull:v,cancel:T});return y(i),[q,C]}(e):function(e,t){const r=e.getReader();let o,n,a,i,l,s=!1,d=!1,f=!1,h=!1;const p=u((e=>{l=e}));function m(){return s?(d=!0,c(void 0)):(s=!0,b(r.read(),(e=>{if(d=!1,e.done)return f||a.close(),h||i.close(),f&&h||l(void 0),null;const t=e.value,r=t,o=t;return f||a.enqueue(r),h||i.enqueue(o),s=!1,d&&m(),null}),(()=>(s=!1,null))),c(void 0))}function y(e){if(f=!0,o=e,h){const e=[o,n],t=r.cancel(e);l(t)}return p}function g(e){if(h=!0,n=e,f){const e=[o,n],t=r.cancel(e);l(t)}return p}const w=new ReadableStream({start(e){a=e},pull:m,cancel:y}),S=new ReadableStream({start(e){i=e},pull:m,cancel:g});return _(r.closed,(e=>(a.error(e),i.error(e),f&&h||l(void 0),null))),[w,S]}(e)}class ReadableStreamDefaultController{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!Bt(this))throw Dt("desiredSize");return Lt(this)}close(){if(!Bt(this))throw Dt("close");if(!Ft(this))throw new TypeError("The stream is not in a state that permits close");!function(e){if(!Ft(e))return;const t=e._controlledReadableStream;e._closeRequested=!0,0===e._queue.length&&(jt(e),Xt(t))}(this)}enqueue(e){if(!Bt(this))throw Dt("enqueue");if(!Ft(this))throw new TypeError("The stream is not in a state that permits enqueue");return function(e,t){if(!Ft(e))return;const r=e._controlledReadableStream;if(Ut(r)&&X(r)>0)G(r,t,!1);else{let r;try{r=e._strategySizeAlgorithm(t)}catch(t){throw zt(e,t),t}try{ue(e,t,r)}catch(t){throw zt(e,t),t}}At(e)}(this,e)}error(e){if(!Bt(this))throw Dt("error");zt(this,e)}[T](e){ce(this);const t=this._cancelAlgorithm(e);return jt(this),t}[q](e){const t=this._controlledReadableStream;if(this._queue.length>0){const r=se(this);this._closeRequested&&0===this._queue.length?(jt(this),Xt(t)):At(this),e._chunkSteps(r)}else U(t,e),At(this)}[C](){}}function Bt(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_controlledReadableStream")&&e instanceof ReadableStreamDefaultController)}function At(e){const t=function(e){const t=e._controlledReadableStream;if(!Ft(e))return!1;if(!e._started)return!1;if(Ut(t)&&X(t)>0)return!0;if(Lt(e)>0)return!0;return!1}(e);if(!t)return;if(e._pulling)return void(e._pullAgain=!0);e._pulling=!0;b(e._pullAlgorithm(),(()=>(e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,At(e)),null)),(t=>(zt(e,t),null)))}function jt(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0,e._strategySizeAlgorithm=void 0}function zt(e,t){const r=e._controlledReadableStream;"readable"===r._state&&(ce(e),jt(e),Jt(r,t))}function Lt(e){const t=e._controlledReadableStream._state;return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}function Ft(e){return!e._closeRequested&&"readable"===e._controlledReadableStream._state}function It(e,t,r,o){const n=Object.create(ReadableStreamDefaultController.prototype);let a,i,l;a=void 0!==t.start?()=>t.start(n):()=>{},i=void 0!==t.pull?()=>t.pull(n):()=>c(void 0),l=void 0!==t.cancel?e=>t.cancel(e):()=>c(void 0),function(e,t,r,o,n,a,i){t._controlledReadableStream=e,t._queue=void 0,t._queueTotalSize=void 0,ce(t),t._started=!1,t._closeRequested=!1,t._pullAgain=!1,t._pulling=!1,t._strategySizeAlgorithm=i,t._strategyHWM=a,t._pullAlgorithm=o,t._cancelAlgorithm=n,e._readableStreamController=t,b(c(r()),(()=>(t._started=!0,At(t),null)),(e=>(zt(t,e),null)))}(e,n,a,i,l,r,o)}function Dt(e){return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`)}function $t(e,t,r){return I(e,r),r=>w(e,t,[r])}function Mt(e,t,r){return I(e,r),r=>w(e,t,[r])}function Yt(e,t,r){return I(e,r),r=>g(e,t,[r])}function Qt(e,t){if("bytes"!==(e=`${e}`))throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);return e}function Nt(e,t){if("byob"!==(e=`${e}`))throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);return e}function Ht(e,t){F(e,t);const r=null==e?void 0:e.preventAbort,o=null==e?void 0:e.preventCancel,n=null==e?void 0:e.preventClose,a=null==e?void 0:e.signal;return void 0!==a&&function(e,t){if(!function(e){if("object"!=typeof e||null===e)return!1;try{return"boolean"==typeof e.aborted}catch(e){return!1}}(e))throw new TypeError(`${t} is not an AbortSignal.`)}(a,`${t} has member 'signal' that`),{preventAbort:Boolean(r),preventCancel:Boolean(o),preventClose:Boolean(n),signal:a}}function xt(e,t){F(e,t);const r=null==e?void 0:e.readable;M(r,"readable","ReadableWritablePair"),function(e,t){if(!H(e))throw new TypeError(`${t} is not a ReadableStream.`)}(r,`${t} has member 'readable' that`);const o=null==e?void 0:e.writable;return M(o,"writable","ReadableWritablePair"),function(e,t){if(!x(e))throw new TypeError(`${t} is not a WritableStream.`)}(o,`${t} has member 'writable' that`),{readable:r,writable:o}}Object.defineProperties(ReadableStreamDefaultController.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},desiredSize:{enumerable:!0}}),n(ReadableStreamDefaultController.prototype.close,"close"),n(ReadableStreamDefaultController.prototype.enqueue,"enqueue"),n(ReadableStreamDefaultController.prototype.error,"error"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableStreamDefaultController.prototype,e.toStringTag,{value:"ReadableStreamDefaultController",configurable:!0});class ReadableStream{constructor(e={},t={}){void 0===e?e=null:D(e,"First parameter");const r=Ye(t,"Second parameter"),o=function(e,t){F(e,t);const r=e,o=null==r?void 0:r.autoAllocateChunkSize,n=null==r?void 0:r.cancel,a=null==r?void 0:r.pull,i=null==r?void 0:r.start,l=null==r?void 0:r.type;return{autoAllocateChunkSize:void 0===o?void 0:N(o,`${t} has member 'autoAllocateChunkSize' that`),cancel:void 0===n?void 0:$t(n,r,`${t} has member 'cancel' that`),pull:void 0===a?void 0:Mt(a,r,`${t} has member 'pull' that`),start:void 0===i?void 0:Yt(i,r,`${t} has member 'start' that`),type:void 0===l?void 0:Qt(l,`${t} has member 'type' that`)}}(e,"First parameter");var n;if((n=this)._state="readable",n._reader=void 0,n._storedError=void 0,n._disturbed=!1,"bytes"===o.type){if(void 0!==r.size)throw new RangeError("The strategy for a byte stream cannot have a size function");Oe(this,o,$e(r,0))}else{const e=Me(r);It(this,o,$e(r,1),e)}}get locked(){if(!Vt(this))throw Kt("locked");return Ut(this)}cancel(e){return Vt(this)?Ut(this)?d(new TypeError("Cannot cancel a stream that already has a reader")):Gt(this,e):d(Kt("cancel"))}getReader(e){if(!Vt(this))throw Kt("getReader");return void 0===function(e,t){F(e,t);const r=null==e?void 0:e.mode;return{mode:void 0===r?void 0:Nt(r,`${t} has member 'mode' that`)}}(e,"First parameter").mode?new ReadableStreamDefaultReader(this):function(e){return new ReadableStreamBYOBReader(e)}(this)}pipeThrough(e,t={}){if(!H(this))throw Kt("pipeThrough");$(e,1,"pipeThrough");const r=xt(e,"First parameter"),o=Ht(t,"Second parameter");if(this.locked)throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");if(r.writable.locked)throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");return m(kt(this,r.writable,o.preventClose,o.preventAbort,o.preventCancel,o.signal)),r.readable}pipeTo(e,t={}){if(!H(this))return d(Kt("pipeTo"));if(void 0===e)return d("Parameter 1 is required in 'pipeTo'.");if(!x(e))return d(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));let r;try{r=Ht(t,"Second parameter")}catch(e){return d(e)}return this.locked?d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")):e.locked?d(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")):kt(this,e,r.preventClose,r.preventAbort,r.preventCancel,r.signal)}tee(){if(!H(this))throw Kt("tee");if(this.locked)throw new TypeError("Cannot tee a stream that already has a reader");return Ot(this)}values(e){if(!H(this))throw Kt("values");return function(e,t){const r=e.getReader(),o=new te(r,t),n=Object.create(re);return n._asyncIteratorImpl=o,n}(this,function(e,t){F(e,t);const r=null==e?void 0:e.preventCancel;return{preventCancel:Boolean(r)}}(e,"First parameter").preventCancel)}}function Vt(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")&&e instanceof ReadableStream)}function Ut(e){return void 0!==e._reader}function Gt(e,r){if(e._disturbed=!0,"closed"===e._state)return c(void 0);if("errored"===e._state)return d(e._storedError);Xt(e);const o=e._reader;if(void 0!==o&&Fe(o)){const e=o._readIntoRequests;o._readIntoRequests=new S,e.forEach((e=>{e._closeSteps(void 0)}))}return p(e._readableStreamController[T](r),t)}function Xt(e){e._state="closed";const t=e._reader;if(void 0!==t&&(j(t),K(t))){const e=t._readRequests;t._readRequests=new S,e.forEach((e=>{e._closeSteps()}))}}function Jt(e,t){e._state="errored",e._storedError=t;const r=e._reader;void 0!==r&&(A(r,t),K(r)?Z(r,t):Ie(r,t))}function Kt(e){return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`)}function Zt(e,t){F(e,t);const r=null==e?void 0:e.highWaterMark;return M(r,"highWaterMark","QueuingStrategyInit"),{highWaterMark:Y(r)}}Object.defineProperties(ReadableStream.prototype,{cancel:{enumerable:!0},getReader:{enumerable:!0},pipeThrough:{enumerable:!0},pipeTo:{enumerable:!0},tee:{enumerable:!0},values:{enumerable:!0},locked:{enumerable:!0}}),n(ReadableStream.prototype.cancel,"cancel"),n(ReadableStream.prototype.getReader,"getReader"),n(ReadableStream.prototype.pipeThrough,"pipeThrough"),n(ReadableStream.prototype.pipeTo,"pipeTo"),n(ReadableStream.prototype.tee,"tee"),n(ReadableStream.prototype.values,"values"),"symbol"==typeof e.toStringTag&&Object.defineProperty(ReadableStream.prototype,e.toStringTag,{value:"ReadableStream",configurable:!0}),"symbol"==typeof e.asyncIterator&&Object.defineProperty(ReadableStream.prototype,e.asyncIterator,{value:ReadableStream.prototype.values,writable:!0,configurable:!0});const er=e=>e.byteLength;n(er,"size");class ByteLengthQueuingStrategy{constructor(e){$(e,1,"ByteLengthQueuingStrategy"),e=Zt(e,"First parameter"),this._byteLengthQueuingStrategyHighWaterMark=e.highWaterMark}get highWaterMark(){if(!rr(this))throw tr("highWaterMark");return this._byteLengthQueuingStrategyHighWaterMark}get size(){if(!rr(this))throw tr("size");return er}}function tr(e){return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`)}function rr(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_byteLengthQueuingStrategyHighWaterMark")&&e instanceof ByteLengthQueuingStrategy)}Object.defineProperties(ByteLengthQueuingStrategy.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),"symbol"==typeof e.toStringTag&&Object.defineProperty(ByteLengthQueuingStrategy.prototype,e.toStringTag,{value:"ByteLengthQueuingStrategy",configurable:!0});const or=()=>1;n(or,"size");class CountQueuingStrategy{constructor(e){$(e,1,"CountQueuingStrategy"),e=Zt(e,"First parameter"),this._countQueuingStrategyHighWaterMark=e.highWaterMark}get highWaterMark(){if(!ar(this))throw nr("highWaterMark");return this._countQueuingStrategyHighWaterMark}get size(){if(!ar(this))throw nr("size");return or}}function nr(e){return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`)}function ar(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_countQueuingStrategyHighWaterMark")&&e instanceof CountQueuingStrategy)}function ir(e,t,r){return I(e,r),r=>w(e,t,[r])}function lr(e,t,r){return I(e,r),r=>g(e,t,[r])}function sr(e,t,r){return I(e,r),(r,o)=>w(e,t,[r,o])}Object.defineProperties(CountQueuingStrategy.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),"symbol"==typeof e.toStringTag&&Object.defineProperty(CountQueuingStrategy.prototype,e.toStringTag,{value:"CountQueuingStrategy",configurable:!0});class TransformStream{constructor(e={},t={},r={}){void 0===e&&(e=null);const o=Ye(t,"Second parameter"),n=Ye(r,"Third parameter"),a=function(e,t){F(e,t);const r=null==e?void 0:e.flush,o=null==e?void 0:e.readableType,n=null==e?void 0:e.start,a=null==e?void 0:e.transform,i=null==e?void 0:e.writableType;return{flush:void 0===r?void 0:ir(r,e,`${t} has member 'flush' that`),readableType:o,start:void 0===n?void 0:lr(n,e,`${t} has member 'start' that`),transform:void 0===a?void 0:sr(a,e,`${t} has member 'transform' that`),writableType:i}}(e,"First parameter");if(void 0!==a.readableType)throw new RangeError("Invalid readableType specified");if(void 0!==a.writableType)throw new RangeError("Invalid writableType specified");const i=$e(n,0),l=Me(n),s=$e(o,1),f=Me(o);let b;!function(e,t,r,o,n,a){function i(){return t}function l(t){return function(e,t){const r=e._transformStreamController;if(e._backpressure){return p(e._backpressureChangePromise,(()=>{if("erroring"===(Ge(e._writable)?e._writable._state:e._writableState))throw Ge(e._writable)?e._writable._storedError:e._writableStoredError;return pr(r,t)}))}return pr(r,t)}(e,t)}function s(t){return function(e,t){return cr(e,t),c(void 0)}(e,t)}function u(){return function(e){const t=e._transformStreamController,r=t._flushAlgorithm();return hr(t),p(r,(()=>{if("errored"===e._readableState)throw e._readableStoredError;gr(e)&&wr(e)}),(t=>{throw cr(e,t),e._readableStoredError}))}(e)}function d(){return function(e){return fr(e,!1),e._backpressureChangePromise}(e)}function f(t){return dr(e,t),c(void 0)}e._writableState="writable",e._writableStoredError=void 0,e._writableHasInFlightOperation=!1,e._writableStarted=!1,e._writable=function(e,t,r,o,n,a,i){return new WritableStream({start(r){e._writableController=r;try{const t=r.signal;void 0!==t&&t.addEventListener("abort",(()=>{"writable"===e._writableState&&(e._writableState="erroring",t.reason&&(e._writableStoredError=t.reason))}))}catch(e){}return p(t(),(()=>(e._writableStarted=!0,Cr(e),null)),(t=>{throw e._writableStarted=!0,Rr(e,t),t}))},write:t=>(function(e){e._writableHasInFlightOperation=!0}(e),p(r(t),(()=>(function(e){e._writableHasInFlightOperation=!1}(e),Cr(e),null)),(t=>{throw function(e,t){e._writableHasInFlightOperation=!1,Rr(e,t)}(e,t),t}))),close:()=>(function(e){e._writableHasInFlightOperation=!0}(e),p(o(),(()=>(function(e){e._writableHasInFlightOperation=!1;"erroring"===e._writableState&&(e._writableStoredError=void 0);e._writableState="closed"}(e),null)),(t=>{throw function(e,t){e._writableHasInFlightOperation=!1,e._writableState,Rr(e,t)}(e,t),t}))),abort:t=>(e._writableState="errored",e._writableStoredError=t,n(t))},{highWaterMark:a,size:i})}(e,i,l,u,s,r,o),e._readableState="readable",e._readableStoredError=void 0,e._readableCloseRequested=!1,e._readablePulling=!1,e._readable=function(e,t,r,o,n,a){return new ReadableStream({start:r=>(e._readableController=r,t().catch((t=>{Sr(e,t)}))),pull:()=>(e._readablePulling=!0,r().catch((t=>{Sr(e,t)}))),cancel:t=>(e._readableState="closed",o(t))},{highWaterMark:n,size:a})}(e,i,d,f,n,a),e._backpressure=void 0,e._backpressureChangePromise=void 0,e._backpressureChangePromise_resolve=void 0,fr(e,!0),e._transformStreamController=void 0}(this,u((e=>{b=e})),s,f,i,l),function(e,t){const r=Object.create(TransformStreamDefaultController.prototype);let o,n;o=void 0!==t.transform?e=>t.transform(e,r):e=>{try{return _r(r,e),c(void 0)}catch(e){return d(e)}};n=void 0!==t.flush?()=>t.flush(r):()=>c(void 0);!function(e,t,r,o){t._controlledTransformStream=e,e._transformStreamController=t,t._transformAlgorithm=r,t._flushAlgorithm=o}(e,r,o,n)}(this,a),void 0!==a.start?b(a.start(this._transformStreamController)):b(void 0)}get readable(){if(!ur(this))throw yr("readable");return this._readable}get writable(){if(!ur(this))throw yr("writable");return this._writable}}function ur(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")&&e instanceof TransformStream)}function cr(e,t){Sr(e,t),dr(e,t)}function dr(e,t){hr(e._transformStreamController),function(e,t){e._writableController.error(t);"writable"===e._writableState&&Tr(e,t)}(e,t),e._backpressure&&fr(e,!1)}function fr(e,t){void 0!==e._backpressureChangePromise&&e._backpressureChangePromise_resolve(),e._backpressureChangePromise=u((t=>{e._backpressureChangePromise_resolve=t})),e._backpressure=t}Object.defineProperties(TransformStream.prototype,{readable:{enumerable:!0},writable:{enumerable:!0}}),"symbol"==typeof e.toStringTag&&Object.defineProperty(TransformStream.prototype,e.toStringTag,{value:"TransformStream",configurable:!0});class TransformStreamDefaultController{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!br(this))throw mr("desiredSize");return vr(this._controlledTransformStream)}enqueue(e){if(!br(this))throw mr("enqueue");_r(this,e)}error(e){if(!br(this))throw mr("error");var t;t=e,cr(this._controlledTransformStream,t)}terminate(){if(!br(this))throw mr("terminate");!function(e){const t=e._controlledTransformStream;gr(t)&&wr(t);const r=new TypeError("TransformStream terminated");dr(t,r)}(this)}}function br(e){return!!r(e)&&(!!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")&&e instanceof TransformStreamDefaultController)}function hr(e){e._transformAlgorithm=void 0,e._flushAlgorithm=void 0}function _r(e,t){const r=e._controlledTransformStream;if(!gr(r))throw new TypeError("Readable side is not in a state that permits enqueue");try{!function(e,t){e._readablePulling=!1;try{e._readableController.enqueue(t)}catch(t){throw Sr(e,t),t}}(r,t)}catch(e){throw dr(r,e),r._readableStoredError}const o=function(e){return!function(e){if(!gr(e))return!1;if(e._readablePulling)return!0;if(vr(e)>0)return!0;return!1}(e)}(r);o!==r._backpressure&&fr(r,!0)}function pr(e,t){return p(e._transformAlgorithm(t),void 0,(t=>{throw cr(e._controlledTransformStream,t),t}))}function mr(e){return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`)}function yr(e){return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`)}function gr(e){return!e._readableCloseRequested&&"readable"===e._readableState}function wr(e){e._readableState="closed",e._readableCloseRequested=!0,e._readableController.close()}function Sr(e,t){"readable"===e._readableState&&(e._readableState="errored",e._readableStoredError=t),e._readableController.error(t)}function vr(e){return e._readableController.desiredSize}function Rr(e,t){"writable"!==e._writableState?qr(e):Tr(e,t)}function Tr(e,t){e._writableState="erroring",e._writableStoredError=t,!function(e){return e._writableHasInFlightOperation}(e)&&e._writableStarted&&qr(e)}function qr(e){e._writableState="errored"}function Cr(e){"erroring"===e._writableState&&qr(e)}Object.defineProperties(TransformStreamDefaultController.prototype,{enqueue:{enumerable:!0},error:{enumerable:!0},terminate:{enumerable:!0},desiredSize:{enumerable:!0}}),n(TransformStreamDefaultController.prototype.enqueue,"enqueue"),n(TransformStreamDefaultController.prototype.error,"error"),n(TransformStreamDefaultController.prototype.terminate,"terminate"),"symbol"==typeof e.toStringTag&&Object.defineProperty(TransformStreamDefaultController.prototype,e.toStringTag,{value:"TransformStreamDefaultController",configurable:!0});

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/isFunction.js
const isFunction = (value) => (typeof value === "function");

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/blobHelpers.js
/*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank */

const CHUNK_SIZE = 65536;
async function* clonePart(part) {
    const end = part.byteOffset + part.byteLength;
    let position = part.byteOffset;
    while (position !== end) {
        const size = Math.min(end - position, CHUNK_SIZE);
        const chunk = part.buffer.slice(position, position + size);
        position += chunk.byteLength;
        yield new Uint8Array(chunk);
    }
}
async function* consumeNodeBlob(blob) {
    let position = 0;
    while (position !== blob.size) {
        const chunk = blob.slice(position, Math.min(blob.size, position + CHUNK_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
    }
}
async function* consumeBlobParts(parts, clone = false) {
    for (const part of parts) {
        if (ArrayBuffer.isView(part)) {
            if (clone) {
                yield* clonePart(part);
            }
            else {
                yield part;
            }
        }
        else if (isFunction(part.stream)) {
            yield* part.stream();
        }
        else {
            yield* consumeNodeBlob(part);
        }
    }
}
function* sliceBlob(blobParts, blobSize, start = 0, end) {
    end !== null && end !== void 0 ? end : (end = blobSize);
    let relativeStart = start < 0
        ? Math.max(blobSize + start, 0)
        : Math.min(start, blobSize);
    let relativeEnd = end < 0
        ? Math.max(blobSize + end, 0)
        : Math.min(end, blobSize);
    const span = Math.max(relativeEnd - relativeStart, 0);
    let added = 0;
    for (const part of blobParts) {
        if (added >= span) {
            break;
        }
        const partSize = ArrayBuffer.isView(part) ? part.byteLength : part.size;
        if (relativeStart && partSize <= relativeStart) {
            relativeStart -= partSize;
            relativeEnd -= partSize;
        }
        else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
                chunk = part.subarray(relativeStart, Math.min(partSize, relativeEnd));
                added += chunk.byteLength;
            }
            else {
                chunk = part.slice(relativeStart, Math.min(partSize, relativeEnd));
                added += chunk.size;
            }
            relativeEnd -= partSize;
            relativeStart = 0;
            yield chunk;
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/Blob.js
/*! Based on fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> & David Frank */
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Blob_parts, _Blob_type, _Blob_size;



class Blob {
    constructor(blobParts = [], options = {}) {
        _Blob_parts.set(this, []);
        _Blob_type.set(this, "");
        _Blob_size.set(this, 0);
        options !== null && options !== void 0 ? options : (options = {});
        if (typeof blobParts !== "object" || blobParts === null) {
            throw new TypeError("Failed to construct 'Blob': "
                + "The provided value cannot be converted to a sequence.");
        }
        if (!isFunction(blobParts[Symbol.iterator])) {
            throw new TypeError("Failed to construct 'Blob': "
                + "The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && !isFunction(options)) {
            throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        const encoder = new TextEncoder();
        for (const raw of blobParts) {
            let part;
            if (ArrayBuffer.isView(raw)) {
                part = new Uint8Array(raw.buffer.slice(raw.byteOffset, raw.byteOffset + raw.byteLength));
            }
            else if (raw instanceof ArrayBuffer) {
                part = new Uint8Array(raw.slice(0));
            }
            else if (raw instanceof Blob) {
                part = raw;
            }
            else {
                part = encoder.encode(String(raw));
            }
            __classPrivateFieldSet(this, _Blob_size, __classPrivateFieldGet(this, _Blob_size, "f") + (ArrayBuffer.isView(part) ? part.byteLength : part.size), "f");
            __classPrivateFieldGet(this, _Blob_parts, "f").push(part);
        }
        const type = options.type === undefined ? "" : String(options.type);
        __classPrivateFieldSet(this, _Blob_type, /^[\x20-\x7E]*$/.test(type) ? type : "", "f");
    }
    static [(_Blob_parts = new WeakMap(), _Blob_type = new WeakMap(), _Blob_size = new WeakMap(), Symbol.hasInstance)](value) {
        return Boolean(value
            && typeof value === "object"
            && isFunction(value.constructor)
            && (isFunction(value.stream)
                || isFunction(value.arrayBuffer))
            && /^(Blob|File)$/.test(value[Symbol.toStringTag]));
    }
    get type() {
        return __classPrivateFieldGet(this, _Blob_type, "f");
    }
    get size() {
        return __classPrivateFieldGet(this, _Blob_size, "f");
    }
    slice(start, end, contentType) {
        return new Blob(sliceBlob(__classPrivateFieldGet(this, _Blob_parts, "f"), this.size, start, end), {
            type: contentType
        });
    }
    async text() {
        const decoder = new TextDecoder();
        let result = "";
        for await (const chunk of consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"))) {
            result += decoder.decode(chunk, { stream: true });
        }
        result += decoder.decode();
        return result;
    }
    async arrayBuffer() {
        const view = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"))) {
            view.set(chunk, offset);
            offset += chunk.length;
        }
        return view.buffer;
    }
    stream() {
        const iterator = consumeBlobParts(__classPrivateFieldGet(this, _Blob_parts, "f"), true);
        return new ReadableStream({
            async pull(controller) {
                const { value, done } = await iterator.next();
                if (done) {
                    return queueMicrotask(() => controller.close());
                }
                controller.enqueue(value);
            },
            async cancel() {
                await iterator.return();
            }
        });
    }
    get [Symbol.toStringTag]() {
        return "Blob";
    }
}
Object.defineProperties(Blob.prototype, {
    type: { enumerable: true },
    size: { enumerable: true },
    slice: { enumerable: true },
    stream: { enumerable: true },
    text: { enumerable: true },
    arrayBuffer: { enumerable: true }
});

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/File.js
var File_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var File_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _File_name, _File_lastModified;

class File extends Blob {
    constructor(fileBits, name, options = {}) {
        super(fileBits, options);
        _File_name.set(this, void 0);
        _File_lastModified.set(this, 0);
        if (arguments.length < 2) {
            throw new TypeError("Failed to construct 'File': 2 arguments required, "
                + `but only ${arguments.length} present.`);
        }
        File_classPrivateFieldSet(this, _File_name, String(name), "f");
        const lastModified = options.lastModified === undefined
            ? Date.now()
            : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
            File_classPrivateFieldSet(this, _File_lastModified, lastModified, "f");
        }
    }
    static [(_File_name = new WeakMap(), _File_lastModified = new WeakMap(), Symbol.hasInstance)](value) {
        return value instanceof Blob
            && value[Symbol.toStringTag] === "File"
            && typeof value.name === "string";
    }
    get name() {
        return File_classPrivateFieldGet(this, _File_name, "f");
    }
    get lastModified() {
        return File_classPrivateFieldGet(this, _File_lastModified, "f");
    }
    get webkitRelativePath() {
        return "";
    }
    get [Symbol.toStringTag]() {
        return "File";
    }
}

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/isFile.js

const isFile = (value) => value instanceof File;

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/isBlob.js

const isBlob = (value) => value instanceof Blob;

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/deprecateConstructorEntries.js

const deprecateConstructorEntries = (0,external_util_.deprecate)(() => { }, "Constructor \"entries\" argument is not spec-compliant "
    + "and will be removed in next major release.");

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/FormData.js
var FormData_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormData_instances, _FormData_entries, _FormData_setEntry;






class FormData {
    constructor(entries) {
        _FormData_instances.add(this);
        _FormData_entries.set(this, new Map());
        if (entries) {
            deprecateConstructorEntries();
            entries.forEach(({ name, value, fileName }) => this.append(name, value, fileName));
        }
    }
    static [(_FormData_entries = new WeakMap(), _FormData_instances = new WeakSet(), Symbol.hasInstance)](value) {
        return Boolean(value
            && isFunction(value.constructor)
            && value[Symbol.toStringTag] === "FormData"
            && isFunction(value.append)
            && isFunction(value.set)
            && isFunction(value.get)
            && isFunction(value.getAll)
            && isFunction(value.has)
            && isFunction(value.delete)
            && isFunction(value.entries)
            && isFunction(value.values)
            && isFunction(value.keys)
            && isFunction(value[Symbol.iterator])
            && isFunction(value.forEach));
    }
    append(name, value, fileName) {
        FormData_classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
            name,
            fileName,
            append: true,
            rawValue: value,
            argsLength: arguments.length
        });
    }
    set(name, value, fileName) {
        FormData_classPrivateFieldGet(this, _FormData_instances, "m", _FormData_setEntry).call(this, {
            name,
            fileName,
            append: false,
            rawValue: value,
            argsLength: arguments.length
        });
    }
    get(name) {
        const field = FormData_classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
        if (!field) {
            return null;
        }
        return field[0];
    }
    getAll(name) {
        const field = FormData_classPrivateFieldGet(this, _FormData_entries, "f").get(String(name));
        if (!field) {
            return [];
        }
        return field.slice();
    }
    has(name) {
        return FormData_classPrivateFieldGet(this, _FormData_entries, "f").has(String(name));
    }
    delete(name) {
        FormData_classPrivateFieldGet(this, _FormData_entries, "f").delete(String(name));
    }
    *keys() {
        for (const key of FormData_classPrivateFieldGet(this, _FormData_entries, "f").keys()) {
            yield key;
        }
    }
    *entries() {
        for (const name of this.keys()) {
            const values = this.getAll(name);
            for (const value of values) {
                yield [name, value];
            }
        }
    }
    *values() {
        for (const [, value] of this) {
            yield value;
        }
    }
    [(_FormData_setEntry = function _FormData_setEntry({ name, rawValue, append, fileName, argsLength }) {
        const methodName = append ? "append" : "set";
        if (argsLength < 2) {
            throw new TypeError(`Failed to execute '${methodName}' on 'FormData': `
                + `2 arguments required, but only ${argsLength} present.`);
        }
        name = String(name);
        let value;
        if (isFile(rawValue)) {
            value = fileName === undefined
                ? rawValue
                : new File([rawValue], fileName, {
                    type: rawValue.type,
                    lastModified: rawValue.lastModified
                });
        }
        else if (isBlob(rawValue)) {
            value = new File([rawValue], fileName === undefined ? "blob" : fileName, {
                type: rawValue.type
            });
        }
        else if (fileName) {
            throw new TypeError(`Failed to execute '${methodName}' on 'FormData': `
                + "parameter 2 is not of type 'Blob'.");
        }
        else {
            value = String(rawValue);
        }
        const values = FormData_classPrivateFieldGet(this, _FormData_entries, "f").get(name);
        if (!values) {
            return void FormData_classPrivateFieldGet(this, _FormData_entries, "f").set(name, [value]);
        }
        if (!append) {
            return void FormData_classPrivateFieldGet(this, _FormData_entries, "f").set(name, [value]);
        }
        values.push(value);
    }, Symbol.iterator)]() {
        return this.entries();
    }
    forEach(callback, thisArg) {
        for (const [name, value] of this) {
            callback.call(thisArg, value, name, this);
        }
    }
    get [Symbol.toStringTag]() {
        return "FormData";
    }
    [external_util_.inspect.custom]() {
        return this[Symbol.toStringTag];
    }
}

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/index.js




;// CONCATENATED MODULE: ./node_modules/openai/_shims/formdata.node.mjs
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */





const formdata_node_isPolyfilled = true;

// EXTERNAL MODULE: external "node:stream"
var external_node_stream_ = __webpack_require__(4492);
;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/createBoundary.js
const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
function createBoundary() {
    let size = 16;
    let res = "";
    while (size--) {
        res += alphabet[(Math.random() * alphabet.length) << 0];
    }
    return res;
}
/* harmony default export */ const util_createBoundary = (createBoundary);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/isPlainObject.js
const getType = (value) => (Object.prototype.toString.call(value).slice(8, -1).toLowerCase());
function isPlainObject(value) {
    if (getType(value) !== "object") {
        return false;
    }
    const pp = Object.getPrototypeOf(value);
    if (pp === null || pp === undefined) {
        return true;
    }
    const Ctor = pp.constructor && pp.constructor.toString();
    return Ctor === Object.toString();
}
/* harmony default export */ const util_isPlainObject = (isPlainObject);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/normalizeValue.js
const normalizeValue = (value) => String(value)
    .replace(/\r|\n/g, (match, i, str) => {
    if ((match === "\r" && str[i + 1] !== "\n")
        || (match === "\n" && str[i - 1] !== "\r")) {
        return "\r\n";
    }
    return match;
});
/* harmony default export */ const util_normalizeValue = (normalizeValue);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/escapeName.js
const escapeName = (name) => String(name)
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A")
    .replace(/"/g, "%22");
/* harmony default export */ const util_escapeName = (escapeName);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/isFunction.js
const isFunction_isFunction = (value) => (typeof value === "function");
/* harmony default export */ const util_isFunction = (isFunction_isFunction);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/isFileLike.js

const isFileLike = (value) => Boolean(value
    && typeof value === "object"
    && util_isFunction(value.constructor)
    && value[Symbol.toStringTag] === "File"
    && util_isFunction(value.stream)
    && value.name != null
    && value.size != null
    && value.lastModified != null);

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/util/isFormData.js

const isFormData = (value) => Boolean(value
    && util_isFunction(value.constructor)
    && value[Symbol.toStringTag] === "FormData"
    && util_isFunction(value.append)
    && util_isFunction(value.getAll)
    && util_isFunction(value.entries)
    && util_isFunction(value[Symbol.iterator]));
const isFormDataLike = (/* unused pure expression or super */ null && (isFormData));

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/FormDataEncoder.js
var FormDataEncoder_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var FormDataEncoder_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FormDataEncoder_instances, _FormDataEncoder_CRLF, _FormDataEncoder_CRLF_BYTES, _FormDataEncoder_CRLF_BYTES_LENGTH, _FormDataEncoder_DASHES, _FormDataEncoder_encoder, _FormDataEncoder_footer, _FormDataEncoder_form, _FormDataEncoder_options, _FormDataEncoder_getFieldHeader;






const defaultOptions = {
    enableAdditionalHeaders: false
};
class FormDataEncoder {
    constructor(form, boundaryOrOptions, options) {
        _FormDataEncoder_instances.add(this);
        _FormDataEncoder_CRLF.set(this, "\r\n");
        _FormDataEncoder_CRLF_BYTES.set(this, void 0);
        _FormDataEncoder_CRLF_BYTES_LENGTH.set(this, void 0);
        _FormDataEncoder_DASHES.set(this, "-".repeat(2));
        _FormDataEncoder_encoder.set(this, new TextEncoder());
        _FormDataEncoder_footer.set(this, void 0);
        _FormDataEncoder_form.set(this, void 0);
        _FormDataEncoder_options.set(this, void 0);
        if (!isFormData(form)) {
            throw new TypeError("Expected first argument to be a FormData instance.");
        }
        let boundary;
        if (util_isPlainObject(boundaryOrOptions)) {
            options = boundaryOrOptions;
        }
        else {
            boundary = boundaryOrOptions;
        }
        if (!boundary) {
            boundary = util_createBoundary();
        }
        if (typeof boundary !== "string") {
            throw new TypeError("Expected boundary argument to be a string.");
        }
        if (options && !util_isPlainObject(options)) {
            throw new TypeError("Expected options argument to be an object.");
        }
        FormDataEncoder_classPrivateFieldSet(this, _FormDataEncoder_form, form, "f");
        FormDataEncoder_classPrivateFieldSet(this, _FormDataEncoder_options, { ...defaultOptions, ...options }, "f");
        FormDataEncoder_classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES, FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")), "f");
        FormDataEncoder_classPrivateFieldSet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f").byteLength, "f");
        this.boundary = `form-data-boundary-${boundary}`;
        this.contentType = `multipart/form-data; boundary=${this.boundary}`;
        FormDataEncoder_classPrivateFieldSet(this, _FormDataEncoder_footer, FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`), "f");
        this.contentLength = String(this.getContentLength());
        this.headers = Object.freeze({
            "Content-Type": this.contentType,
            "Content-Length": this.contentLength
        });
        Object.defineProperties(this, {
            boundary: { writable: false, configurable: false },
            contentType: { writable: false, configurable: false },
            contentLength: { writable: false, configurable: false },
            headers: { writable: false, configurable: false }
        });
    }
    getContentLength() {
        let length = 0;
        for (const [name, raw] of FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_form, "f")) {
            const value = isFileLike(raw) ? raw : FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(util_normalizeValue(raw));
            length += FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value).byteLength;
            length += isFileLike(value) ? value.size : value.byteLength;
            length += FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES_LENGTH, "f");
        }
        return length + FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_footer, "f").byteLength;
    }
    *values() {
        for (const [name, raw] of FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_form, "f").entries()) {
            const value = isFileLike(raw) ? raw : FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(util_normalizeValue(raw));
            yield FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_instances, "m", _FormDataEncoder_getFieldHeader).call(this, name, value);
            yield value;
            yield FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF_BYTES, "f");
        }
        yield FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_footer, "f");
    }
    async *encode() {
        for (const part of this.values()) {
            if (isFileLike(part)) {
                yield* part.stream();
            }
            else {
                yield part;
            }
        }
    }
    [(_FormDataEncoder_CRLF = new WeakMap(), _FormDataEncoder_CRLF_BYTES = new WeakMap(), _FormDataEncoder_CRLF_BYTES_LENGTH = new WeakMap(), _FormDataEncoder_DASHES = new WeakMap(), _FormDataEncoder_encoder = new WeakMap(), _FormDataEncoder_footer = new WeakMap(), _FormDataEncoder_form = new WeakMap(), _FormDataEncoder_options = new WeakMap(), _FormDataEncoder_instances = new WeakSet(), _FormDataEncoder_getFieldHeader = function _FormDataEncoder_getFieldHeader(name, value) {
        let header = "";
        header += `${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_DASHES, "f")}${this.boundary}${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
        header += `Content-Disposition: form-data; name="${util_escapeName(name)}"`;
        if (isFileLike(value)) {
            header += `; filename="${util_escapeName(value.name)}"${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}`;
            header += `Content-Type: ${value.type || "application/octet-stream"}`;
        }
        if (FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_options, "f").enableAdditionalHeaders === true) {
            header += `${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f")}Content-Length: ${isFileLike(value) ? value.size : value.byteLength}`;
        }
        return FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_encoder, "f").encode(`${header}${FormDataEncoder_classPrivateFieldGet(this, _FormDataEncoder_CRLF, "f").repeat(2)}`);
    }, Symbol.iterator)]() {
        return this.values();
    }
    [Symbol.asyncIterator]() {
        return this.encode();
    }
}
const Encoder = (/* unused pure expression or super */ null && (FormDataEncoder));

;// CONCATENATED MODULE: ./node_modules/form-data-encoder/lib/esm/index.js






;// CONCATENATED MODULE: ./node_modules/openai/_shims/getMultipartRequestOptions.node.mjs
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */



async function getMultipartRequestOptions_node_getMultipartRequestOptions(form, opts) {
  const encoder = new FormDataEncoder(form);
  const readable = external_node_stream_.Readable.from(encoder);
  const body = new MultipartBody(readable);
  const headers = {
    ...opts.headers,
    ...encoder.headers,
    'Content-Length': encoder.contentLength,
  };
  return { ...opts, body: body, headers };
}
//# sourceMappingURL=getMultipartRequestOptions.node.mjs.map

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
// EXTERNAL MODULE: ./node_modules/node-domexception/index.js
var node_domexception = __webpack_require__(7760);
;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/isPlainObject.js
const isPlainObject_getType = (value) => (Object.prototype.toString.call(value).slice(8, -1).toLowerCase());
function isPlainObject_isPlainObject(value) {
    if (isPlainObject_getType(value) !== "object") {
        return false;
    }
    const pp = Object.getPrototypeOf(value);
    if (pp === null || pp === undefined) {
        return true;
    }
    const Ctor = pp.constructor && pp.constructor.toString();
    return Ctor === Object.toString();
}
/* harmony default export */ const esm_isPlainObject = (isPlainObject_isPlainObject);

;// CONCATENATED MODULE: ./node_modules/formdata-node/lib/esm/fileFromPath.js
var fileFromPath_classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var fileFromPath_classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FileFromPath_path, _FileFromPath_start;






const MESSAGE = "The requested file could not be read, "
    + "typically due to permission problems that have occurred after a reference "
    + "to a file was acquired.";
class FileFromPath {
    constructor(input) {
        _FileFromPath_path.set(this, void 0);
        _FileFromPath_start.set(this, void 0);
        fileFromPath_classPrivateFieldSet(this, _FileFromPath_path, input.path, "f");
        fileFromPath_classPrivateFieldSet(this, _FileFromPath_start, input.start || 0, "f");
        this.name = (0,external_path_.basename)(fileFromPath_classPrivateFieldGet(this, _FileFromPath_path, "f"));
        this.size = input.size;
        this.lastModified = input.lastModified;
    }
    slice(start, end) {
        return new FileFromPath({
            path: fileFromPath_classPrivateFieldGet(this, _FileFromPath_path, "f"),
            lastModified: this.lastModified,
            size: end - start,
            start
        });
    }
    async *stream() {
        const { mtimeMs } = await external_fs_.promises.stat(fileFromPath_classPrivateFieldGet(this, _FileFromPath_path, "f"));
        if (mtimeMs > this.lastModified) {
            throw new node_domexception(MESSAGE, "NotReadableError");
        }
        if (this.size) {
            yield* (0,external_fs_.createReadStream)(fileFromPath_classPrivateFieldGet(this, _FileFromPath_path, "f"), {
                start: fileFromPath_classPrivateFieldGet(this, _FileFromPath_start, "f"),
                end: fileFromPath_classPrivateFieldGet(this, _FileFromPath_start, "f") + this.size - 1
            });
        }
    }
    get [(_FileFromPath_path = new WeakMap(), _FileFromPath_start = new WeakMap(), Symbol.toStringTag)]() {
        return "File";
    }
}
function createFileFromPath(path, { mtimeMs, size }, filenameOrOptions, options = {}) {
    let filename;
    if (esm_isPlainObject(filenameOrOptions)) {
        [options, filename] = [filenameOrOptions, undefined];
    }
    else {
        filename = filenameOrOptions;
    }
    const file = new FileFromPath({ path, size, lastModified: mtimeMs });
    if (!filename) {
        filename = file.name;
    }
    return new File([file], filename, {
        ...options, lastModified: file.lastModified
    });
}
function fileFromPathSync(path, filenameOrOptions, options = {}) {
    const stats = statSync(path);
    return createFileFromPath(path, stats, filenameOrOptions, options);
}
async function fileFromPath(path, filenameOrOptions, options) {
    const stats = await external_fs_.promises.stat(path);
    return createFileFromPath(path, stats, filenameOrOptions, options);
}

;// CONCATENATED MODULE: ./node_modules/openai/_shims/fileFromPath.node.mjs
/**
 * Disclaimer: modules in _shims aren't intended to be imported by SDK users.
 */

let warned = false;
async function fileFromPath_node_fileFromPath(path, ...args) {
  if (!warned) {
    console.warn(`fileFromPath is deprecated; use fs.createReadStream(${JSON.stringify(path)}) instead`);
    warned = true;
  }
  return await fileFromPath(path, ...args);
}
//# sourceMappingURL=fileFromPath.node.mjs.map

// EXTERNAL MODULE: external "node:fs"
var external_node_fs_ = __webpack_require__(7561);
;// CONCATENATED MODULE: ./node_modules/openai/_shims/node-readable.node.mjs

function isFsReadStream(value) {
  return value instanceof external_node_fs_.ReadStream;
}
//# sourceMappingURL=node-readable.node.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/uploads.mjs





const isResponseLike = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.url === 'string' &&
  typeof value.blob === 'function';
const uploads_isFileLike = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.name === 'string' &&
  typeof value.lastModified === 'number' &&
  isBlobLike(value);
/**
 * The BlobLike type omits arrayBuffer() because @types/node-fetch@^2.6.4 lacks it; but this check
 * adds the arrayBuffer() method type because it is available and used at runtime
 */
const isBlobLike = (value) =>
  value != null &&
  typeof value === 'object' &&
  typeof value.size === 'number' &&
  typeof value.type === 'string' &&
  typeof value.text === 'function' &&
  typeof value.slice === 'function' &&
  typeof value.arrayBuffer === 'function';
const isUploadable = (value) => {
  return uploads_isFileLike(value) || isResponseLike(value) || isFsReadStream(value);
};
/**
 * Helper for creating a {@link File} to pass to an SDK upload method from a variety of different data formats
 * @param value the raw content of the file.  Can be an {@link Uploadable}, {@link BlobLikePart}, or {@link AsyncIterable} of {@link BlobLikePart}s
 * @param {string=} name the name of the file. If omitted, toFile will try to determine a file name from bits if possible
 * @param {Object=} options additional properties
 * @param {string=} options.type the MIME type of the content
 * @param {number=} options.lastModified the last modified timestamp
 * @returns a {@link File} with the given properties
 */
async function toFile(value, name, options = {}) {
  var _a, _b, _c;
  // If it's a promise, resolve it.
  value = await value;
  if (isResponseLike(value)) {
    const blob = await value.blob();
    name ||
      (name =
        (_a = new URL(value.url).pathname.split(/[\\/]/).pop()) !== null && _a !== void 0 ?
          _a
        : 'unknown_file');
    return new File([blob], name, options);
  }
  const bits = await getBytes(value);
  name || (name = (_b = getName(value)) !== null && _b !== void 0 ? _b : 'unknown_file');
  if (!options.type) {
    const type = (_c = bits[0]) === null || _c === void 0 ? void 0 : _c.type;
    if (typeof type === 'string') {
      options = { ...options, type };
    }
  }
  return new File(bits, name, options);
}
async function getBytes(value) {
  var _a;
  let parts = [];
  if (
    typeof value === 'string' ||
    ArrayBuffer.isView(value) || // includes Uint8Array, Buffer, etc.
    value instanceof ArrayBuffer
  ) {
    parts.push(value);
  } else if (isBlobLike(value)) {
    parts.push(await value.arrayBuffer());
  } else if (
    isAsyncIterableIterator(value) // includes Readable, ReadableStream, etc.
  ) {
    for await (const chunk of value) {
      parts.push(chunk); // TODO, consider validating?
    }
  } else {
    throw new Error(
      `Unexpected data type: ${typeof value}; constructor: ${
        (_a = value === null || value === void 0 ? void 0 : value.constructor) === null || _a === void 0 ?
          void 0
        : _a.name
      }; props: ${propsForError(value)}`,
    );
  }
  return parts;
}
function propsForError(value) {
  const props = Object.getOwnPropertyNames(value);
  return `[${props.map((p) => `"${p}"`).join(', ')}]`;
}
function getName(value) {
  var _a;
  return (
    getStringFromMaybeBuffer(value.name) ||
    getStringFromMaybeBuffer(value.filename) ||
    // For fs.ReadStream
    ((_a = getStringFromMaybeBuffer(value.path)) === null || _a === void 0 ? void 0 : _a.split(/[\\/]/).pop())
  );
}
const getStringFromMaybeBuffer = (x) => {
  if (typeof x === 'string') return x;
  if (typeof Buffer !== 'undefined' && x instanceof Buffer) return String(x);
  return undefined;
};
const isAsyncIterableIterator = (value) =>
  value != null && typeof value === 'object' && typeof value[Symbol.asyncIterator] === 'function';
class MultipartBody {
  constructor(body) {
    this.body = body;
  }
  get [Symbol.toStringTag]() {
    return 'MultipartBody';
  }
}
const isMultipartBody = (body) =>
  body && typeof body === 'object' && body.body && body[Symbol.toStringTag] === 'MultipartBody';
/**
 * Returns a multipart/form-data request if any part of the given request body contains a File / Blob value.
 * Otherwise returns the request as is.
 */
const maybeMultipartFormRequestOptions = async (opts) => {
  if (!hasUploadableValue(opts.body)) return opts;
  const form = await createForm(opts.body);
  return getMultipartRequestOptions(form, opts);
};
const multipartFormRequestOptions = async (opts) => {
  const form = await createForm(opts.body);
  return getMultipartRequestOptions_node_getMultipartRequestOptions(form, opts);
};
const createForm = async (body) => {
  const form = new FormData();
  await Promise.all(Object.entries(body || {}).map(([key, value]) => addFormValue(form, key, value)));
  return form;
};
const hasUploadableValue = (value) => {
  if (isUploadable(value)) return true;
  if (Array.isArray(value)) return value.some(hasUploadableValue);
  if (value && typeof value === 'object') {
    for (const k in value) {
      if (hasUploadableValue(value[k])) return true;
    }
  }
  return false;
};
const addFormValue = async (form, key, value) => {
  if (value === undefined) return;
  if (value == null) {
    throw new TypeError(
      `Received null for "${key}"; to pass null in FormData, you must use the string 'null'`,
    );
  }
  // TODO: make nested formats configurable
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    form.append(key, String(value));
  } else if (isUploadable(value)) {
    const file = await toFile(value);
    form.append(key, file);
  } else if (Array.isArray(value)) {
    await Promise.all(value.map((entry) => addFormValue(form, key + '[]', entry)));
  } else if (typeof value === 'object') {
    await Promise.all(
      Object.entries(value).map(([name, prop]) => addFormValue(form, `${key}[${name}]`, prop)),
    );
  } else {
    throw new TypeError(
      `Invalid value given to form, expected a string, number, boolean, object, Array, File or Blob but got ${value} instead`,
    );
  }
};
//# sourceMappingURL=uploads.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/core.mjs
var core_classPrivateFieldSet =
  (undefined && undefined.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === 'm') throw new TypeError('Private method is not writable');
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot write private member to an object whose class did not declare it');
    return (
      kind === 'a' ? f.call(receiver, value)
      : f ? (f.value = value)
      : state.set(receiver, value),
      value
    );
  };
var core_classPrivateFieldGet =
  (undefined && undefined.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
    if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError('Cannot read private member from an object whose class did not declare it');
    return (
      kind === 'm' ? f
      : kind === 'a' ? f.call(receiver)
      : f ? f.value
      : state.get(receiver)
    );
  };
var _AbstractPage_client;







const MAX_RETRIES = 2;
async function defaultParseResponse(props) {
  const { response } = props;
  if (props.options.stream) {
    // Note: there is an invariant here that isn't represented in the type system
    // that if you set `stream: true` the response type must also be `Stream<T>`
    return new Stream(response, props.controller);
  }
  const contentType = response.headers.get('content-type');
  if (contentType === null || contentType === void 0 ? void 0 : contentType.includes('application/json')) {
    const json = await response.json();
    debug('response', response.status, response.url, response.headers, json);
    return json;
  }
  // TODO handle blob, arraybuffer, other content types, etc.
  const text = await response.text();
  debug('response', response.status, response.url, response.headers, text);
  return text;
}
/**
 * A subclass of `Promise` providing additional helper methods
 * for interacting with the SDK.
 */
class APIPromise extends Promise {
  constructor(responsePromise, parseResponse = defaultParseResponse) {
    super((resolve) => {
      // this is maybe a bit weird but this has to be a no-op to not implicitly
      // parse the response body; instead .then, .catch, .finally are overridden
      // to parse the response
      resolve(null);
    });
    this.responsePromise = responsePromise;
    this.parseResponse = parseResponse;
  }
  _thenUnwrap(transform) {
    return new APIPromise(this.responsePromise, async (props) => transform(await this.parseResponse(props)));
  }
  /**
   * Gets the raw `Response` instance instead of parsing the response
   * data.
   *
   * If you want to parse the response body but still get the `Response`
   * instance, you can use {@link withResponse()}.
   */
  asResponse() {
    return this.responsePromise.then((p) => p.response);
  }
  /**
   * Gets the parsed response data and the raw `Response` instance.
   *
   * If you just want to get the raw `Response` instance without parsing it,
   * you can use {@link asResponse()}.
   */
  async withResponse() {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response };
  }
  parse() {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then(this.parseResponse);
    }
    return this.parsedPromise;
  }
  then(onfulfilled, onrejected) {
    return this.parse().then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.parse().catch(onrejected);
  }
  finally(onfinally) {
    return this.parse().finally(onfinally);
  }
}
class APIClient {
  constructor({
    baseURL,
    maxRetries,
    timeout = 600000, // 10 minutes
    httpAgent,
    fetch: overridenFetch,
  }) {
    this.baseURL = baseURL;
    this.maxRetries = validatePositiveInteger(
      'maxRetries',
      maxRetries !== null && maxRetries !== void 0 ? maxRetries : MAX_RETRIES,
    );
    this.timeout = validatePositiveInteger('timeout', timeout);
    this.httpAgent = httpAgent;
    this.fetch = overridenFetch !== null && overridenFetch !== void 0 ? overridenFetch : _fetch;
  }
  authHeaders(opts) {
    return {};
  }
  /**
   * Override this to add your own default headers, for example:
   *
   *  {
   *    ...super.defaultHeaders(),
   *    Authorization: 'Bearer 123',
   *  }
   */
  defaultHeaders(opts) {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': this.getUserAgent(),
      ...getPlatformHeaders(),
      ...this.authHeaders(opts),
    };
  }
  /**
   * Override this to add your own headers validation:
   */
  validateHeaders(headers, customHeaders) {}
  defaultIdempotencyKey() {
    return `stainless-node-retry-${uuid4()}`;
  }
  get(path, opts) {
    return this.methodRequest('get', path, opts);
  }
  post(path, opts) {
    return this.methodRequest('post', path, opts);
  }
  patch(path, opts) {
    return this.methodRequest('patch', path, opts);
  }
  put(path, opts) {
    return this.methodRequest('put', path, opts);
  }
  delete(path, opts) {
    return this.methodRequest('delete', path, opts);
  }
  methodRequest(method, path, opts) {
    return this.request(Promise.resolve(opts).then((opts) => ({ method, path, ...opts })));
  }
  getAPIList(path, Page, opts) {
    return this.requestAPIList(Page, { method: 'get', path, ...opts });
  }
  calculateContentLength(body) {
    if (typeof body === 'string') {
      if (typeof Buffer !== 'undefined') {
        return Buffer.byteLength(body, 'utf8').toString();
      }
      if (typeof TextEncoder !== 'undefined') {
        const encoder = new TextEncoder();
        const encoded = encoder.encode(body);
        return encoded.length.toString();
      }
    }
    return null;
  }
  buildRequest(options) {
    var _a, _b, _c, _d, _e, _f;
    const { method, path, query, headers: headers = {} } = options;
    const body =
      isMultipartBody(options.body) ? options.body.body
      : options.body ? JSON.stringify(options.body, null, 2)
      : null;
    const contentLength = this.calculateContentLength(body);
    const url = this.buildURL(path, query);
    if ('timeout' in options) validatePositiveInteger('timeout', options.timeout);
    const timeout = (_a = options.timeout) !== null && _a !== void 0 ? _a : this.timeout;
    const httpAgent =
      (
        (_c = (_b = options.httpAgent) !== null && _b !== void 0 ? _b : this.httpAgent) !== null &&
        _c !== void 0
      ) ?
        _c
      : getDefaultAgent(url);
    const minAgentTimeout = timeout + 1000;
    if (
      typeof ((
        (_d = httpAgent === null || httpAgent === void 0 ? void 0 : httpAgent.options) === null ||
        _d === void 0
      ) ?
        void 0
      : _d.timeout) === 'number' &&
      minAgentTimeout > ((_e = httpAgent.options.timeout) !== null && _e !== void 0 ? _e : 0)
    ) {
      // Allow any given request to bump our agent active socket timeout.
      // This may seem strange, but leaking active sockets should be rare and not particularly problematic,
      // and without mutating agent we would need to create more of them.
      // This tradeoff optimizes for performance.
      httpAgent.options.timeout = minAgentTimeout;
    }
    if (this.idempotencyHeader && method !== 'get') {
      if (!options.idempotencyKey) options.idempotencyKey = this.defaultIdempotencyKey();
      headers[this.idempotencyHeader] = options.idempotencyKey;
    }
    const reqHeaders = {
      ...(contentLength && { 'Content-Length': contentLength }),
      ...this.defaultHeaders(options),
      ...headers,
    };
    // let builtin fetch set the Content-Type for multipart bodies
    if (isMultipartBody(options.body) && !isPolyfilled) {
      delete reqHeaders['Content-Type'];
    }
    // Strip any headers being explicitly omitted with null
    Object.keys(reqHeaders).forEach((key) => reqHeaders[key] === null && delete reqHeaders[key]);
    const req = {
      method,
      ...(body && { body: body }),
      headers: reqHeaders,
      ...(httpAgent && { agent: httpAgent }),
      // @ts-ignore node-fetch uses a custom AbortSignal type that is
      // not compatible with standard web types
      signal: (_f = options.signal) !== null && _f !== void 0 ? _f : null,
    };
    this.validateHeaders(reqHeaders, headers);
    return { req, url, timeout };
  }
  /**
   * Used as a callback for mutating the given `RequestInit` object.
   *
   * This is useful for cases where you want to add certain headers based off of
   * the request properties, e.g. `method` or `url`.
   */
  async prepareRequest(request, { url, options }) {}
  parseHeaders(headers) {
    return (
      !headers ? {}
      : Symbol.iterator in headers ? Object.fromEntries(Array.from(headers).map((header) => [...header]))
      : { ...headers }
    );
  }
  makeStatusError(status, error, message, headers) {
    return APIError.generate(status, error, message, headers);
  }
  request(options, remainingRetries = null) {
    return new APIPromise(this.makeRequest(options, remainingRetries));
  }
  async makeRequest(optionsInput, retriesRemaining) {
    var _a, _b, _c;
    const options = await optionsInput;
    if (retriesRemaining == null) {
      retriesRemaining = (_a = options.maxRetries) !== null && _a !== void 0 ? _a : this.maxRetries;
    }
    const { req, url, timeout } = this.buildRequest(options);
    await this.prepareRequest(req, { url, options });
    debug('request', url, options, req.headers);
    if ((_b = options.signal) === null || _b === void 0 ? void 0 : _b.aborted) {
      throw new APIUserAbortError();
    }
    const controller = new AbortController();
    const response = await this.fetchWithTimeout(url, req, timeout, controller).catch(castToError);
    if (response instanceof Error) {
      if ((_c = options.signal) === null || _c === void 0 ? void 0 : _c.aborted) {
        throw new APIUserAbortError();
      }
      if (retriesRemaining) {
        return this.retryRequest(options, retriesRemaining);
      }
      if (response.name === 'AbortError') {
        throw new APIConnectionTimeoutError();
      }
      throw new APIConnectionError({ cause: response });
    }
    const responseHeaders = createResponseHeaders(response.headers);
    if (!response.ok) {
      if (retriesRemaining && this.shouldRetry(response)) {
        return this.retryRequest(options, retriesRemaining, responseHeaders);
      }
      const errText = await response.text().catch(() => 'Unknown');
      const errJSON = safeJSON(errText);
      const errMessage = errJSON ? undefined : errText;
      debug('response', response.status, url, responseHeaders, errMessage);
      const err = this.makeStatusError(response.status, errJSON, errMessage, responseHeaders);
      throw err;
    }
    return { response, options, controller };
  }
  requestAPIList(Page, options) {
    const request = this.makeRequest(options, null);
    return new PagePromise(this, request, Page);
  }
  buildURL(path, query) {
    const url =
      isAbsoluteURL(path) ?
        new URL(path)
      : new URL(this.baseURL + (this.baseURL.endsWith('/') && path.startsWith('/') ? path.slice(1) : path));
    const defaultQuery = this.defaultQuery();
    if (!isEmptyObj(defaultQuery)) {
      query = { ...defaultQuery, ...query };
    }
    if (query) {
      url.search = this.stringifyQuery(query);
    }
    return url.toString();
  }
  stringifyQuery(query) {
    return Object.entries(query)
      .filter(([_, value]) => typeof value !== 'undefined')
      .map(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        if (value === null) {
          return `${encodeURIComponent(key)}=`;
        }
        throw new Error(
          `Cannot stringify type ${typeof value}; Expected string, number, boolean, or null. If you need to pass nested query parameters, you can manually encode them, e.g. { query: { 'foo[key1]': value1, 'foo[key2]': value2 } }, and please open a GitHub issue requesting better support for your use case.`,
        );
      })
      .join('&');
  }
  async fetchWithTimeout(url, init, ms, controller) {
    const { signal, ...options } = init || {};
    if (signal) signal.addEventListener('abort', () => controller.abort());
    const timeout = setTimeout(() => controller.abort(), ms);
    return this.getRequestClient()
      .fetch(url, { signal: controller.signal, ...options })
      .finally(() => {
        clearTimeout(timeout);
      });
  }
  getRequestClient() {
    return { fetch: this.fetch };
  }
  shouldRetry(response) {
    // Note this is not a standard header.
    const shouldRetryHeader = response.headers.get('x-should-retry');
    // If the server explicitly says whether or not to retry, obey.
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;
    // Retry on lock timeouts.
    if (response.status === 409) return true;
    // Retry on rate limits.
    if (response.status === 429) return true;
    // Retry internal errors.
    if (response.status >= 500) return true;
    return false;
  }
  async retryRequest(options, retriesRemaining, responseHeaders) {
    var _a;
    retriesRemaining -= 1;
    // About the Retry-After header: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After
    //
    // TODO: we may want to handle the case where the header is using the http-date syntax: "Retry-After: <http-date>".
    // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After#syntax for details.
    const retryAfter = parseInt(
      (responseHeaders === null || responseHeaders === void 0 ? void 0 : responseHeaders['retry-after']) ||
        '',
    );
    const maxRetries = (_a = options.maxRetries) !== null && _a !== void 0 ? _a : this.maxRetries;
    const timeout = this.calculateRetryTimeoutSeconds(retriesRemaining, retryAfter, maxRetries) * 1000;
    await sleep(timeout);
    return this.makeRequest(options, retriesRemaining);
  }
  calculateRetryTimeoutSeconds(retriesRemaining, retryAfter, maxRetries) {
    const initialRetryDelay = 0.5;
    const maxRetryDelay = 2;
    // If the API asks us to wait a certain amount of time (and it's a reasonable amount),
    // just do what it says.
    if (Number.isInteger(retryAfter) && retryAfter <= 60) {
      return retryAfter;
    }
    const numRetries = maxRetries - retriesRemaining;
    // Apply exponential backoff, but not more than the max.
    const sleepSeconds = Math.min(initialRetryDelay * Math.pow(numRetries - 1, 2), maxRetryDelay);
    // Apply some jitter, plus-or-minus half a second.
    const jitter = Math.random() - 0.5;
    return sleepSeconds + jitter;
  }
  getUserAgent() {
    return `${this.constructor.name}/JS ${VERSION}`;
  }
}
class APIResource {
  constructor(client) {
    this.client = client;
    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }
}
class AbstractPage {
  constructor(client, response, body, options) {
    _AbstractPage_client.set(this, void 0);
    core_classPrivateFieldSet(this, _AbstractPage_client, client, 'f');
    this.options = options;
    this.response = response;
    this.body = body;
  }
  hasNextPage() {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageInfo() != null;
  }
  async getNextPage() {
    const nextInfo = this.nextPageInfo();
    if (!nextInfo) {
      throw new Error(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }
    const nextOptions = { ...this.options };
    if ('params' in nextInfo) {
      nextOptions.query = { ...nextOptions.query, ...nextInfo.params };
    } else if ('url' in nextInfo) {
      const params = [...Object.entries(nextOptions.query || {}), ...nextInfo.url.searchParams.entries()];
      for (const [key, value] of params) {
        nextInfo.url.searchParams.set(key, value);
      }
      nextOptions.query = undefined;
      nextOptions.path = nextInfo.url.toString();
    }
    return await core_classPrivateFieldGet(this, _AbstractPage_client, 'f').requestAPIList(
      this.constructor,
      nextOptions,
    );
  }
  async *iterPages() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let page = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }
  async *[((_AbstractPage_client = new WeakMap()), Symbol.asyncIterator)]() {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}
/**
 * This subclass of Promise will resolve to an instantiated Page once the request completes.
 *
 * It also implements AsyncIterable to allow auto-paginating iteration on an unawaited list call, eg:
 *
 *    for await (const item of client.items.list()) {
 *      console.log(item)
 *    }
 */
class PagePromise extends APIPromise {
  constructor(client, request, Page) {
    super(
      request,
      async (props) => new Page(client, props.response, await defaultParseResponse(props), props.options),
    );
  }
  /**
   * Allow auto-paginating iteration on an unawaited list call, eg:
   *
   *    for await (const item of client.items.list()) {
   *      console.log(item)
   *    }
   */
  async *[Symbol.asyncIterator]() {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}
const createResponseHeaders = (headers) => {
  return new Proxy(
    Object.fromEntries(
      // @ts-ignore
      headers.entries(),
    ),
    {
      get(target, name) {
        const key = name.toString();
        return target[key.toLowerCase()] || target[key];
      },
    },
  );
};
// This is required so that we can determine if a given object matches the RequestOptions
// type at runtime. While this requires duplication, it is enforced by the TypeScript
// compiler such that any missing / extraneous keys will cause an error.
const requestOptionsKeys = {
  method: true,
  path: true,
  query: true,
  body: true,
  headers: true,
  maxRetries: true,
  stream: true,
  timeout: true,
  httpAgent: true,
  signal: true,
  idempotencyKey: true,
};
const isRequestOptions = (obj) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !isEmptyObj(obj) &&
    Object.keys(obj).every((k) => hasOwn(requestOptionsKeys, k))
  );
};
const getPlatformProperties = () => {
  if (typeof Deno !== 'undefined' && Deno.build != null) {
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': VERSION,
      'X-Stainless-OS': normalizePlatform(Deno.build.os),
      'X-Stainless-Arch': normalizeArch(Deno.build.arch),
      'X-Stainless-Runtime': 'deno',
      'X-Stainless-Runtime-Version': Deno.version,
    };
  }
  if (typeof EdgeRuntime !== 'undefined') {
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': VERSION,
      'X-Stainless-OS': 'Unknown',
      'X-Stainless-Arch': `other:${EdgeRuntime}`,
      'X-Stainless-Runtime': 'edge',
      'X-Stainless-Runtime-Version': process.version,
    };
  }
  // Check if Node.js
  if (Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]') {
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': VERSION,
      'X-Stainless-OS': normalizePlatform(process.platform),
      'X-Stainless-Arch': normalizeArch(process.arch),
      'X-Stainless-Runtime': 'node',
      'X-Stainless-Runtime-Version': process.version,
    };
  }
  const browserInfo = getBrowserInfo();
  if (browserInfo) {
    return {
      'X-Stainless-Lang': 'js',
      'X-Stainless-Package-Version': VERSION,
      'X-Stainless-OS': 'Unknown',
      'X-Stainless-Arch': 'unknown',
      'X-Stainless-Runtime': `browser:${browserInfo.browser}`,
      'X-Stainless-Runtime-Version': browserInfo.version,
    };
  }
  // TODO add support for Cloudflare workers, etc.
  return {
    'X-Stainless-Lang': 'js',
    'X-Stainless-Package-Version': VERSION,
    'X-Stainless-OS': 'Unknown',
    'X-Stainless-Arch': 'unknown',
    'X-Stainless-Runtime': 'unknown',
    'X-Stainless-Runtime-Version': 'unknown',
  };
};
// Note: modified from https://github.com/JS-DevTools/host-environment/blob/b1ab79ecde37db5d6e163c050e54fe7d287d7c92/src/isomorphic.browser.ts
function getBrowserInfo() {
  if (typeof navigator === 'undefined' || !navigator) {
    return null;
  }
  // NOTE: The order matters here!
  const browserPatterns = [
    { key: 'edge', pattern: /Edge(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'ie', pattern: /MSIE(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'ie', pattern: /Trident(?:.*rv\:(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'chrome', pattern: /Chrome(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'firefox', pattern: /Firefox(?:\W+(\d+)\.(\d+)(?:\.(\d+))?)?/ },
    { key: 'safari', pattern: /(?:Version\W+(\d+)\.(\d+)(?:\.(\d+))?)?(?:\W+Mobile\S*)?\W+Safari/ },
  ];
  // Find the FIRST matching browser
  for (const { key, pattern } of browserPatterns) {
    const match = pattern.exec(navigator.userAgent);
    if (match) {
      const major = match[1] || 0;
      const minor = match[2] || 0;
      const patch = match[3] || 0;
      return { browser: key, version: `${major}.${minor}.${patch}` };
    }
  }
  return null;
}
const normalizeArch = (arch) => {
  // Node docs:
  // - https://nodejs.org/api/process.html#processarch
  // Deno docs:
  // - https://doc.deno.land/deno/stable/~/Deno.build
  if (arch === 'x32') return 'x32';
  if (arch === 'x86_64' || arch === 'x64') return 'x64';
  if (arch === 'arm') return 'arm';
  if (arch === 'aarch64' || arch === 'arm64') return 'arm64';
  if (arch) return `other:${arch}`;
  return 'unknown';
};
const normalizePlatform = (platform) => {
  // Node platforms:
  // - https://nodejs.org/api/process.html#processplatform
  // Deno platforms:
  // - https://doc.deno.land/deno/stable/~/Deno.build
  // - https://github.com/denoland/deno/issues/14799
  platform = platform.toLowerCase();
  // NOTE: this iOS check is untested and may not work
  // Node does not work natively on IOS, there is a fork at
  // https://github.com/nodejs-mobile/nodejs-mobile
  // however it is unknown at the time of writing how to detect if it is running
  if (platform.includes('ios')) return 'iOS';
  if (platform === 'android') return 'Android';
  if (platform === 'darwin') return 'MacOS';
  if (platform === 'win32') return 'Windows';
  if (platform === 'freebsd') return 'FreeBSD';
  if (platform === 'openbsd') return 'OpenBSD';
  if (platform === 'linux') return 'Linux';
  if (platform) return `Other:${platform}`;
  return 'Unknown';
};
let _platformHeaders;
const getPlatformHeaders = () => {
  return _platformHeaders !== null && _platformHeaders !== void 0 ?
      _platformHeaders
    : (_platformHeaders = getPlatformProperties());
};
const safeJSON = (text) => {
  try {
    return JSON.parse(text);
  } catch (err) {
    return undefined;
  }
};
// https://stackoverflow.com/a/19709846
const startsWithSchemeRegexp = new RegExp('^(?:[a-z]+:)?//', 'i');
const isAbsoluteURL = (url) => {
  return startsWithSchemeRegexp.test(url);
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const validatePositiveInteger = (name, n) => {
  if (typeof n !== 'number' || !Number.isInteger(n)) {
    throw new Error(`${name} must be an integer`);
  }
  if (n < 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return n;
};
const castToError = (err) => {
  if (err instanceof Error) return err;
  return new Error(err);
};
const ensurePresent = (value) => {
  if (value == null) throw new Error(`Expected a value to be given but received ${value} instead.`);
  return value;
};
/**
 * Read an environment variable.
 *
 * Will return undefined if the environment variable doesn't exist or cannot be accessed.
 */
const readEnv = (env) => {
  var _a, _b, _c, _d;
  if (typeof process !== 'undefined') {
    return (_b = (_a = process.env) === null || _a === void 0 ? void 0 : _a[env]) !== null && _b !== void 0 ?
        _b
      : undefined;
  }
  if (typeof Deno !== 'undefined') {
    return (_d = (_c = Deno.env) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ?
        void 0
      : _d.call(_c, env);
  }
  return undefined;
};
const coerceInteger = (value) => {
  if (typeof value === 'number') return Math.round(value);
  if (typeof value === 'string') return parseInt(value, 10);
  throw new Error(`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceFloat = (value) => {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return parseFloat(value);
  throw new Error(`Could not coerce ${value} (type: ${typeof value}) into a number`);
};
const coerceBoolean = (value) => {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') return value === 'true';
  return Boolean(value);
};
const maybeCoerceInteger = (value) => {
  if (value === undefined) {
    return undefined;
  }
  return coerceInteger(value);
};
const maybeCoerceFloat = (value) => {
  if (value === undefined) {
    return undefined;
  }
  return coerceFloat(value);
};
const maybeCoerceBoolean = (value) => {
  if (value === undefined) {
    return undefined;
  }
  return coerceBoolean(value);
};
// https://stackoverflow.com/a/34491287
function isEmptyObj(obj) {
  if (!obj) return true;
  for (const _k in obj) return false;
  return true;
}
// https://eslint.org/docs/latest/rules/no-prototype-builtins
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function debug(action, ...args) {
  if (typeof process !== 'undefined' && process.env['DEBUG'] === 'true') {
    console.log(`OpenAI:DEBUG:${action}`, ...args);
  }
}
/**
 * https://stackoverflow.com/a/2117523
 */
const uuid4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
const isRunningInBrowser = () => {
  return (
    // @ts-ignore
    typeof window !== 'undefined' &&
    // @ts-ignore
    typeof window.document !== 'undefined' &&
    // @ts-ignore
    typeof navigator !== 'undefined'
  );
};
const isHeadersProtocol = (headers) => {
  return typeof (headers === null || headers === void 0 ? void 0 : headers.get) === 'function';
};
const getHeader = (headers, key) => {
  const lowerKey = key.toLowerCase();
  if (isHeadersProtocol(headers)) return headers.get(key) || headers.get(lowerKey);
  const value = headers[key] || headers[lowerKey];
  if (Array.isArray(value)) {
    if (value.length <= 1) return value[0];
    console.warn(`Received ${value.length} entries for the ${key} header, using the first entry.`);
    return value[0];
  }
  return value;
};
/**
 * Encodes a string to Base64 format.
 */
const toBase64 = (str) => {
  if (!str) return '';
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str).toString('base64');
  }
  if (typeof btoa !== 'undefined') {
    return btoa(str);
  }
  throw new Error('Cannot generate b64 string; Expected `Buffer` or `btoa` to be defined');
};
//# sourceMappingURL=core.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/pagination.mjs
// File generated from our OpenAPI spec by Stainless.

/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class Page extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.object = body.object;
    this.data = body.data;
  }
  getPaginatedItems() {
    return this.data;
  }
  // @deprecated Please use `nextPageInfo()` instead
  /**
   * This page represents a response that isn't actually paginated at the API level
   * so there will never be any next page params.
   */
  nextPageParams() {
    return null;
  }
  nextPageInfo() {
    return null;
  }
}
class CursorPage extends AbstractPage {
  constructor(client, response, body, options) {
    super(client, response, body, options);
    this.data = body.data;
  }
  getPaginatedItems() {
    return this.data;
  }
  // @deprecated Please use `nextPageInfo()` instead
  nextPageParams() {
    const info = this.nextPageInfo();
    if (!info) return null;
    if ('params' in info) return info.params;
    const params = Object.fromEntries(info.url.searchParams);
    if (!Object.keys(params).length) return null;
    return params;
  }
  nextPageInfo() {
    var _a, _b;
    if (!((_a = this.data) === null || _a === void 0 ? void 0 : _a.length)) {
      return null;
    }
    const next = (_b = this.data[this.data.length - 1]) === null || _b === void 0 ? void 0 : _b.id;
    if (!next) return null;
    return { params: { after: next } };
  }
}
//# sourceMappingURL=pagination.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resource.mjs
// File generated from our OpenAPI spec by Stainless.
class resource_APIResource {
  constructor(client) {
    this.client = client;
    this.get = client.get.bind(client);
    this.post = client.post.bind(client);
    this.patch = client.patch.bind(client);
    this.put = client.put.bind(client);
    this.delete = client.delete.bind(client);
    this.getAPIList = client.getAPIList.bind(client);
  }
}
//# sourceMappingURL=resource.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/audio/transcriptions.mjs
// File generated from our OpenAPI spec by Stainless.


class Transcriptions extends resource_APIResource {
  /**
   * Transcribes audio into the input language.
   */
  create(body, options) {
    return this.post('/audio/transcriptions', multipartFormRequestOptions({ body, ...options }));
  }
}
(function (Transcriptions) {})(Transcriptions || (Transcriptions = {}));
//# sourceMappingURL=transcriptions.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/audio/translations.mjs
// File generated from our OpenAPI spec by Stainless.


class Translations extends resource_APIResource {
  /**
   * Translates audio into English.
   */
  create(body, options) {
    return this.post('/audio/translations', multipartFormRequestOptions({ body, ...options }));
  }
}
(function (Translations) {})(Translations || (Translations = {}));
//# sourceMappingURL=translations.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/audio/index.mjs
// File generated from our OpenAPI spec by Stainless.



//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/audio/audio.mjs
// File generated from our OpenAPI spec by Stainless.




class Audio extends resource_APIResource {
  constructor() {
    super(...arguments);
    this.transcriptions = new Transcriptions(this.client);
    this.translations = new Translations(this.client);
  }
}
(function (Audio) {
  Audio.Transcriptions = Transcriptions;
  Audio.Translations = Translations;
})(Audio || (Audio = {}));
//# sourceMappingURL=audio.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/chat/completions.mjs
// File generated from our OpenAPI spec by Stainless.

class Completions extends resource_APIResource {
  create(body, options) {
    var _a;
    return this.post('/chat/completions', {
      body,
      ...options,
      stream: (_a = body.stream) !== null && _a !== void 0 ? _a : false,
    });
  }
}
(function (Completions) {})(Completions || (Completions = {}));
//# sourceMappingURL=completions.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/chat/index.mjs
// File generated from our OpenAPI spec by Stainless.


//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/chat/chat.mjs
// File generated from our OpenAPI spec by Stainless.



class Chat extends resource_APIResource {
  constructor() {
    super(...arguments);
    this.completions = new Completions(this.client);
  }
}
(function (Chat) {
  Chat.Completions = Completions;
})(Chat || (Chat = {}));
//# sourceMappingURL=chat.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/completions.mjs
// File generated from our OpenAPI spec by Stainless.

class completions_Completions extends resource_APIResource {
  create(body, options) {
    var _a;
    return this.post('/completions', {
      body,
      ...options,
      stream: (_a = body.stream) !== null && _a !== void 0 ? _a : false,
    });
  }
}
(function (Completions) {})(completions_Completions || (completions_Completions = {}));
//# sourceMappingURL=completions.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/embeddings.mjs
// File generated from our OpenAPI spec by Stainless.

class Embeddings extends resource_APIResource {
  /**
   * Creates an embedding vector representing the input text.
   */
  create(body, options) {
    return this.post('/embeddings', { body, ...options });
  }
}
(function (Embeddings) {})(Embeddings || (Embeddings = {}));
//# sourceMappingURL=embeddings.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/edits.mjs
// File generated from our OpenAPI spec by Stainless.

class Edits extends resource_APIResource {
  /**
   * Creates a new edit for the provided input, instruction, and parameters.
   *
   * @deprecated The Edits API is deprecated; please use Chat Completions instead.
   *
   * https://openai.com/blog/gpt-4-api-general-availability#deprecation-of-the-edits-api
   */
  create(body, options) {
    return this.post('/edits', { body, ...options });
  }
}
(function (Edits) {})(Edits || (Edits = {}));
//# sourceMappingURL=edits.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/files.mjs
// File generated from our OpenAPI spec by Stainless.



class Files extends resource_APIResource {
  /**
   * Upload a file that contains document(s) to be used across various
   * endpoints/features. Currently, the size of all the files uploaded by one
   * organization can be up to 1 GB. Please contact us if you need to increase the
   * storage limit.
   */
  create(body, options) {
    return this.post('/files', multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Returns information about a specific file.
   */
  retrieve(fileId, options) {
    return this.get(`/files/${fileId}`, options);
  }
  /**
   * Returns a list of files that belong to the user's organization.
   */
  list(options) {
    return this.getAPIList('/files', FileObjectsPage, options);
  }
  /**
   * Delete a file.
   */
  del(fileId, options) {
    return this.delete(`/files/${fileId}`, options);
  }
  /**
   * Returns the contents of the specified file
   */
  retrieveContent(fileId, options) {
    return this.get(`/files/${fileId}/content`, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options === null || options === void 0 ? void 0 : options.headers),
      },
    });
  }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class FileObjectsPage extends Page {}
(function (Files) {})(Files || (Files = {}));
//# sourceMappingURL=files.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/fine-tunes.mjs
// File generated from our OpenAPI spec by Stainless.


class FineTunes extends resource_APIResource {
  /**
   * Creates a job that fine-tunes a specified model from a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](/docs/guides/legacy-fine-tuning)
   */
  create(body, options) {
    return this.post('/fine-tunes', { body, ...options });
  }
  /**
   * Gets info about the fine-tune job.
   *
   * [Learn more about fine-tuning](/docs/guides/legacy-fine-tuning)
   */
  retrieve(fineTuneId, options) {
    return this.get(`/fine-tunes/${fineTuneId}`, options);
  }
  /**
   * List your organization's fine-tuning jobs
   */
  list(options) {
    return this.getAPIList('/fine-tunes', FineTunesPage, options);
  }
  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(fineTuneId, options) {
    return this.post(`/fine-tunes/${fineTuneId}/cancel`, options);
  }
  listEvents(fineTuneId, query, options) {
    var _a;
    return this.get(`/fine-tunes/${fineTuneId}/events`, {
      query,
      timeout: 86400000,
      ...options,
      stream:
        (_a = query === null || query === void 0 ? void 0 : query.stream) !== null && _a !== void 0 ?
          _a
        : false,
    });
  }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class FineTunesPage extends Page {}
(function (FineTunes) {})(FineTunes || (FineTunes = {}));
//# sourceMappingURL=fine-tunes.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/fine-tuning/jobs.mjs
// File generated from our OpenAPI spec by Stainless.



class Jobs extends resource_APIResource {
  /**
   * Creates a job that fine-tunes a specified model from a given dataset.
   *
   * Response includes details of the enqueued job including job status and the name
   * of the fine-tuned models once complete.
   *
   * [Learn more about fine-tuning](/docs/guides/fine-tuning)
   */
  create(body, options) {
    return this.post('/fine_tuning/jobs', { body, ...options });
  }
  /**
   * Get info about a fine-tuning job.
   *
   * [Learn more about fine-tuning](/docs/guides/fine-tuning)
   */
  retrieve(fineTuningJobId, options) {
    return this.get(`/fine_tuning/jobs/${fineTuningJobId}`, options);
  }
  list(query = {}, options) {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this.getAPIList('/fine_tuning/jobs', FineTuningJobsPage, { query, ...options });
  }
  /**
   * Immediately cancel a fine-tune job.
   */
  cancel(fineTuningJobId, options) {
    return this.post(`/fine_tuning/jobs/${fineTuningJobId}/cancel`, options);
  }
  listEvents(fineTuningJobId, query = {}, options) {
    if (isRequestOptions(query)) {
      return this.listEvents(fineTuningJobId, {}, query);
    }
    return this.getAPIList(`/fine_tuning/jobs/${fineTuningJobId}/events`, FineTuningJobEventsPage, {
      query,
      ...options,
    });
  }
}
class FineTuningJobsPage extends CursorPage {}
class FineTuningJobEventsPage extends CursorPage {}
(function (Jobs) {})(Jobs || (Jobs = {}));
//# sourceMappingURL=jobs.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/fine-tuning/index.mjs
// File generated from our OpenAPI spec by Stainless.


//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/fine-tuning/fine-tuning.mjs
// File generated from our OpenAPI spec by Stainless.



class FineTuning extends resource_APIResource {
  constructor() {
    super(...arguments);
    this.jobs = new Jobs(this.client);
  }
}
(function (FineTuning) {
  FineTuning.Jobs = Jobs;
  FineTuning.FineTuningJobsPage = FineTuningJobsPage;
  FineTuning.FineTuningJobEventsPage = FineTuningJobEventsPage;
})(FineTuning || (FineTuning = {}));
//# sourceMappingURL=fine-tuning.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/images.mjs
// File generated from our OpenAPI spec by Stainless.


class Images extends resource_APIResource {
  /**
   * Creates a variation of a given image.
   */
  createVariation(body, options) {
    return this.post('/images/variations', multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Creates an edited or extended image given an original image and a prompt.
   */
  edit(body, options) {
    return this.post('/images/edits', multipartFormRequestOptions({ body, ...options }));
  }
  /**
   * Creates an image given a prompt.
   */
  generate(body, options) {
    return this.post('/images/generations', { body, ...options });
  }
}
(function (Images) {})(Images || (Images = {}));
//# sourceMappingURL=images.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/models.mjs
// File generated from our OpenAPI spec by Stainless.


class Models extends resource_APIResource {
  /**
   * Retrieves a model instance, providing basic information about the model such as
   * the owner and permissioning.
   */
  retrieve(model, options) {
    return this.get(`/models/${model}`, options);
  }
  /**
   * Lists the currently available models, and provides basic information about each
   * one such as the owner and availability.
   */
  list(options) {
    return this.getAPIList('/models', ModelsPage, options);
  }
  /**
   * Delete a fine-tuned model. You must have the Owner role in your organization.
   */
  del(model, options) {
    return this.delete(`/models/${model}`, options);
  }
}
/**
 * Note: no pagination actually occurs yet, this is for forwards-compatibility.
 */
class ModelsPage extends Page {}
(function (Models) {})(Models || (Models = {}));
//# sourceMappingURL=models.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/moderations.mjs
// File generated from our OpenAPI spec by Stainless.

class Moderations extends resource_APIResource {
  /**
   * Classifies if text violates OpenAI's Content Policy
   */
  create(body, options) {
    return this.post('/moderations', { body, ...options });
  }
}
(function (Moderations) {})(Moderations || (Moderations = {}));
//# sourceMappingURL=moderations.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/resources/index.mjs
// File generated from our OpenAPI spec by Stainless.











//# sourceMappingURL=index.mjs.map

;// CONCATENATED MODULE: ./node_modules/openai/index.mjs
// File generated from our OpenAPI spec by Stainless.
var _a;





/** API Client for interfacing with the OpenAI API. */
class OpenAI extends APIClient {
  /**
   * API Client for interfacing with the OpenAI API.
   *
   * @param {string} [opts.apiKey=process.env['OPENAI_API_KEY']] - The API Key to send to the API.
   * @param {string} [opts.baseURL] - Override the default base URL for the API.
   * @param {number} [opts.timeout=10 minutes] - The maximum amount of time (in milliseconds) the client will wait for a response before timing out.
   * @param {number} [opts.httpAgent] - An HTTP agent used to manage HTTP(s) connections.
   * @param {Core.Fetch} [opts.fetch] - Specify a custom `fetch` function implementation.
   * @param {number} [opts.maxRetries=2] - The maximum number of times the client will retry a request.
   * @param {Core.Headers} opts.defaultHeaders - Default headers to include with every request to the API.
   * @param {Core.DefaultQuery} opts.defaultQuery - Default query parameters to include with every request to the API.
   * @param {boolean} [opts.dangerouslyAllowBrowser=false] - By default, client-side use of this library is not allowed, as it risks exposing your secret API credentials to attackers.
   * @param {string | null} [opts.organization]
   */
  constructor(_b) {
    var _c, _d;
    var {
      apiKey = readEnv('OPENAI_API_KEY'),
      organization = (_c = readEnv('OPENAI_ORG_ID')) !== null && _c !== void 0 ? _c : null,
      ...opts
    } = _b === void 0 ? {} : _b;
    if (apiKey === undefined) {
      throw new Error(
        "The OPENAI_API_KEY environment variable is missing or empty; either provide it, or instantiate the OpenAI client with an apiKey option, like new OpenAI({ apiKey: 'my apiKey' }).",
      );
    }
    const options = {
      apiKey,
      organization,
      baseURL: `https://api.openai.com/v1`,
      ...opts,
    };
    if (!options.dangerouslyAllowBrowser && isRunningInBrowser()) {
      throw new Error(
        "It looks like you're running in a browser-like environment.\n\nThis is disabled by default, as it risks exposing your secret API credentials to attackers.\nIf you understand the risks and have appropriate mitigations in place,\nyou can set the `dangerouslyAllowBrowser` option to `true`, e.g.,\n\nnew OpenAI({ apiKey, dangerouslyAllowBrowser: true });\n\nhttps://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety\n",
      );
    }
    super({
      baseURL: options.baseURL,
      timeout: (_d = options.timeout) !== null && _d !== void 0 ? _d : 600000 /* 10 minutes */,
      httpAgent: options.httpAgent,
      maxRetries: options.maxRetries,
      fetch: options.fetch,
    });
    this.completions = new completions_Completions(this);
    this.chat = new Chat(this);
    this.edits = new Edits(this);
    this.embeddings = new Embeddings(this);
    this.files = new Files(this);
    this.images = new Images(this);
    this.audio = new Audio(this);
    this.moderations = new Moderations(this);
    this.models = new Models(this);
    this.fineTuning = new FineTuning(this);
    this.fineTunes = new FineTunes(this);
    this._options = options;
    this.apiKey = apiKey;
    this.organization = organization;
  }
  defaultQuery() {
    return this._options.defaultQuery;
  }
  defaultHeaders(opts) {
    return {
      ...super.defaultHeaders(opts),
      'OpenAI-Organization': this.organization,
      ...this._options.defaultHeaders,
    };
  }
  authHeaders(opts) {
    return { Authorization: `Bearer ${this.apiKey}` };
  }
}
_a = OpenAI;
OpenAI.OpenAI = _a;
OpenAI.APIError = APIError;
OpenAI.APIConnectionError = APIConnectionError;
OpenAI.APIConnectionTimeoutError = APIConnectionTimeoutError;
OpenAI.APIUserAbortError = APIUserAbortError;
OpenAI.NotFoundError = NotFoundError;
OpenAI.ConflictError = ConflictError;
OpenAI.RateLimitError = RateLimitError;
OpenAI.BadRequestError = BadRequestError;
OpenAI.AuthenticationError = AuthenticationError;
OpenAI.InternalServerError = InternalServerError;
OpenAI.PermissionDeniedError = PermissionDeniedError;
OpenAI.UnprocessableEntityError = UnprocessableEntityError;
const {
  APIError: openai_APIError,
  APIConnectionError: openai_APIConnectionError,
  APIConnectionTimeoutError: openai_APIConnectionTimeoutError,
  APIUserAbortError: openai_APIUserAbortError,
  NotFoundError: openai_NotFoundError,
  ConflictError: openai_ConflictError,
  RateLimitError: openai_RateLimitError,
  BadRequestError: openai_BadRequestError,
  AuthenticationError: openai_AuthenticationError,
  InternalServerError: openai_InternalServerError,
  PermissionDeniedError: openai_PermissionDeniedError,
  UnprocessableEntityError: openai_UnprocessableEntityError,
} = error_namespaceObject;
var openai_toFile = toFile;
var openai_fileFromPath = fileFromPath_node_fileFromPath;
(function (OpenAI) {
  // Helper functions
  OpenAI.toFile = toFile;
  OpenAI.fileFromPath = fileFromPath_node_fileFromPath;
  OpenAI.Page = Page;
  OpenAI.CursorPage = CursorPage;
  OpenAI.Completions = completions_Completions;
  OpenAI.Chat = Chat;
  OpenAI.Edits = Edits;
  OpenAI.Embeddings = Embeddings;
  OpenAI.Files = Files;
  OpenAI.FileObjectsPage = FileObjectsPage;
  OpenAI.Images = Images;
  OpenAI.Audio = Audio;
  OpenAI.Moderations = Moderations;
  OpenAI.Models = Models;
  OpenAI.ModelsPage = ModelsPage;
  OpenAI.FineTuning = FineTuning;
  OpenAI.FineTunes = FineTunes;
  OpenAI.FineTunesPage = FineTunesPage;
})(OpenAI || (OpenAI = {}));
/* harmony default export */ const openai = ((/* unused pure expression or super */ null && (OpenAI)));
//# sourceMappingURL=index.mjs.map


/***/ })

};
;