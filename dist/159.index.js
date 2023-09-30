export const id = 159;
export const ids = [159,273];
export const modules = {

/***/ 6159:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "APIChain": () => (/* binding */ APIChain)
});

// EXTERNAL MODULE: ./node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(3197);
// EXTERNAL MODULE: ./node_modules/langchain/dist/chains/llm_chain.js + 2 modules
var llm_chain = __webpack_require__(7273);
// EXTERNAL MODULE: ./node_modules/langchain/dist/prompts/prompt.js
var prompts_prompt = __webpack_require__(4095);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/chains/api/prompts.js
/* eslint-disable spaced-comment */

const API_URL_RAW_PROMPT_TEMPLATE = `You are given the below API Documentation:
{api_docs}
Using this documentation, generate the full API url to call for answering the user question.
You should build the API url in order to get a response that is as short as possible, while still getting the necessary information to answer the question. Pay attention to deliberately exclude any unnecessary pieces of data in the API call.

Question:{question}
API url:`;
const API_URL_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    inputVariables: ["api_docs", "question"],
    template: API_URL_RAW_PROMPT_TEMPLATE,
});
const API_RESPONSE_RAW_PROMPT_TEMPLATE = `${API_URL_RAW_PROMPT_TEMPLATE} {api_url}

Here is the response from the API:

{api_response}

Summarize this response to answer the original question.

Summary:`;
const API_RESPONSE_PROMPT_TEMPLATE = /* #__PURE__ */ new prompts_prompt.PromptTemplate({
    inputVariables: ["api_docs", "question", "api_url", "api_response"],
    template: API_RESPONSE_RAW_PROMPT_TEMPLATE,
});

;// CONCATENATED MODULE: ./node_modules/langchain/dist/chains/api/api_chain.js



/**
 * Class that extends BaseChain and represents a chain specifically
 * designed for making API requests and processing API responses.
 */
class APIChain extends base/* BaseChain */.l {
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "apiAnswerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiRequestChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "question"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        this.apiRequestChain = fields.apiRequestChain;
        this.apiAnswerChain = fields.apiAnswerChain;
        this.apiDocs = fields.apiDocs;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.headers = fields.headers ?? this.headers;
    }
    /** @ignore */
    async _call(values, runManager) {
        const question = values[this.inputKey];
        const api_url = await this.apiRequestChain.predict({ question, api_docs: this.apiDocs }, runManager?.getChild("request"));
        const res = await fetch(api_url, { headers: this.headers });
        const api_response = await res.text();
        const answer = await this.apiAnswerChain.predict({ question, api_docs: this.apiDocs, api_url, api_response }, runManager?.getChild("response"));
        return { [this.outputKey]: answer };
    }
    _chainType() {
        return "api_chain";
    }
    static async deserialize(data) {
        const { api_request_chain, api_answer_chain, api_docs } = data;
        if (!api_request_chain) {
            throw new Error("LLMChain must have api_request_chain");
        }
        if (!api_answer_chain) {
            throw new Error("LLMChain must have api_answer_chain");
        }
        if (!api_docs) {
            throw new Error("LLMChain must have api_docs");
        }
        return new APIChain({
            apiAnswerChain: await llm_chain.LLMChain.deserialize(api_answer_chain),
            apiRequestChain: await llm_chain.LLMChain.deserialize(api_request_chain),
            apiDocs: api_docs,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            api_answer_chain: this.apiAnswerChain.serialize(),
            api_request_chain: this.apiRequestChain.serialize(),
            api_docs: this.apiDocs,
        };
    }
    /**
     * Static method to create a new APIChain from a BaseLanguageModel and API
     * documentation.
     * @param llm BaseLanguageModel instance.
     * @param apiDocs API documentation.
     * @param options Optional configuration options for the APIChain.
     * @returns New APIChain instance.
     */
    static fromLLMAndAPIDocs(llm, apiDocs, options = {}) {
        const { apiUrlPrompt = API_URL_PROMPT_TEMPLATE, apiResponsePrompt = API_RESPONSE_PROMPT_TEMPLATE, } = options;
        const apiRequestChain = new llm_chain.LLMChain({ prompt: apiUrlPrompt, llm });
        const apiAnswerChain = new llm_chain.LLMChain({ prompt: apiResponsePrompt, llm });
        return new this({
            apiAnswerChain,
            apiRequestChain,
            apiDocs,
            ...options,
        });
    }
}


/***/ }),

/***/ 7273:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "LLMChain": () => (/* binding */ LLMChain)
});

// EXTERNAL MODULE: ./node_modules/langchain/dist/chains/base.js
var base = __webpack_require__(3197);
// EXTERNAL MODULE: ./node_modules/langchain/dist/prompts/base.js
var prompts_base = __webpack_require__(5411);
// EXTERNAL MODULE: ./node_modules/langchain/dist/base_language/index.js + 2 modules
var base_language = __webpack_require__(7679);
// EXTERNAL MODULE: ./node_modules/langchain/dist/schema/runnable/index.js + 10 modules
var runnable = __webpack_require__(1972);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/output_parser.js

/**
 * Abstract base class for parsing the output of a Large Language Model
 * (LLM) call. It provides methods for parsing the result of an LLM call
 * and invoking the parser with a given input.
 */
class BaseLLMOutputParser extends runnable/* Runnable */.eq {
    /**
     * Parses the result of an LLM call with a given prompt. By default, it
     * simply calls `parseResult`.
     * @param generations The generations from an LLM call.
     * @param _prompt The prompt used in the LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parseResultWithPrompt(generations, _prompt, callbacks) {
        return this.parseResult(generations, callbacks);
    }
    /**
     * Calls the parser with a given input and optional configuration options.
     * If the input is a string, it creates a generation with the input as
     * text and calls `parseResult`. If the input is a `BaseMessage`, it
     * creates a generation with the input as a message and the content of the
     * input as text, and then calls `parseResult`.
     * @param input The input to the parser, which can be a string or a `BaseMessage`.
     * @param options Optional configuration options.
     * @returns A promise of the parsed output.
     */
    async invoke(input, options) {
        if (typeof input === "string") {
            return this._callWithConfig(async (input) => this.parseResult([{ text: input }]), input, { ...options, runType: "parser" });
        }
        else {
            return this._callWithConfig(async (input) => this.parseResult([{ message: input, text: input.content }]), input, { ...options, runType: "parser" });
        }
    }
}
/**
 * Class to parse the output of an LLM call.
 */
class BaseOutputParser extends BaseLLMOutputParser {
    parseResult(generations, callbacks) {
        return this.parse(generations[0].text, callbacks);
    }
    async parseWithPrompt(text, _prompt, callbacks) {
        return this.parse(text, callbacks);
    }
    /**
     * Return the string type key uniquely identifying this class of parser
     */
    _type() {
        throw new Error("_type not implemented");
    }
}
/**
 * Class to parse the output of an LLM call that also allows streaming inputs.
 */
class BaseTransformOutputParser extends (/* unused pure expression or super */ null && (BaseOutputParser)) {
    async *_transform(inputGenerator) {
        for await (const chunk of inputGenerator) {
            if (typeof chunk === "string") {
                yield this.parseResult([{ text: chunk }]);
            }
            else {
                yield this.parseResult([{ message: chunk, text: chunk.content }]);
            }
        }
    }
    /**
     * Transforms an asynchronous generator of input into an asynchronous
     * generator of parsed output.
     * @param inputGenerator An asynchronous generator of input.
     * @param options A configuration object.
     * @returns An asynchronous generator of parsed output.
     */
    async *transform(inputGenerator, options) {
        yield* this._transformStreamWithConfig(inputGenerator, this._transform.bind(this), {
            ...options,
            runType: "parser",
        });
    }
}
/**
 * OutputParser that parses LLMResult into the top likely string.
 */
class StringOutputParser extends (/* unused pure expression or super */ null && (BaseTransformOutputParser)) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "output_parser"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "StrOutputParser";
    }
    /**
     * Parses a string output from an LLM call. This method is meant to be
     * implemented by subclasses to define how a string output from an LLM
     * should be parsed.
     * @param text The string output from an LLM call.
     * @param callbacks Optional callbacks.
     * @returns A promise of the parsed output.
     */
    parse(text) {
        return Promise.resolve(text);
    }
    getFormatInstructions() {
        return "";
    }
}
/**
 * OutputParser that parses LLMResult into the top likely string and
 * encodes it into bytes.
 */
class BytesOutputParser extends (/* unused pure expression or super */ null && (BaseTransformOutputParser)) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "output_parser"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "textEncoder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new TextEncoder()
        });
    }
    static lc_name() {
        return "BytesOutputParser";
    }
    parse(text) {
        return Promise.resolve(this.textEncoder.encode(text));
    }
    getFormatInstructions() {
        return "";
    }
}
/**
 * Exception that output parsers should raise to signify a parsing error.
 *
 * This exists to differentiate parsing errors from other code or execution errors
 * that also may arise inside the output parser. OutputParserExceptions will be
 * available to catch and handle in ways to fix the parsing error, while other
 * errors will be raised.
 *
 * @param message - The error that's being re-raised or an error message.
 * @param llmOutput - String model output which is error-ing.
 * @param observation - String explanation of error which can be passed to a
 *     model to try and remediate the issue.
 * @param sendToLLM - Whether to send the observation and llm_output back to an Agent
 *     after an OutputParserException has been raised. This gives the underlying
 *     model driving the agent the context that the previous output was improperly
 *     structured, in the hopes that it will update the output to the correct
 *     format.
 */
class OutputParserException extends Error {
    constructor(message, llmOutput, observation, sendToLLM = false) {
        super(message);
        Object.defineProperty(this, "llmOutput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "observation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sendToLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmOutput = llmOutput;
        this.observation = observation;
        this.sendToLLM = sendToLLM;
        if (sendToLLM) {
            if (observation === undefined || llmOutput === undefined) {
                throw new Error("Arguments 'observation' & 'llmOutput' are required if 'sendToLlm' is true");
            }
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/output_parsers/noop.js

/**
 * The NoOpOutputParser class is a type of output parser that does not
 * perform any operations on the output. It extends the BaseOutputParser
 * class and is part of the LangChain's output parsers module. This class
 * is useful in scenarios where the raw output of the Large Language
 * Models (LLMs) is required.
 */
class NoOpOutputParser extends BaseOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "output_parsers", "default"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "NoOpOutputParser";
    }
    /**
     * This method takes a string as input and returns the same string as
     * output. It does not perform any operations on the input string.
     * @param text The input string to be parsed.
     * @returns The same input string without any operations performed on it.
     */
    parse(text) {
        return Promise.resolve(text);
    }
    /**
     * This method returns an empty string. It does not provide any formatting
     * instructions.
     * @returns An empty string, indicating no formatting instructions.
     */
    getFormatInstructions() {
        return "";
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/chains/llm_chain.js




/**
 * Chain to run queries against LLMs.
 *
 * @example
 * ```ts
 * import { LLMChain } from "langchain/chains";
 * import { OpenAI } from "langchain/llms/openai";
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = PromptTemplate.fromTemplate("Tell me a {adjective} joke");
 * const llm = new LLMChain({ llm: new OpenAI(), prompt });
 * ```
 */
class LLMChain extends base/* BaseChain */.l {
    static lc_name() {
        return "LLMChain";
    }
    get inputKeys() {
        return this.prompt.inputVariables;
    }
    get outputKeys() {
        return [this.outputKey];
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llmKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text"
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.prompt = fields.prompt;
        this.llm = fields.llm;
        this.llmKwargs = fields.llmKwargs;
        this.outputKey = fields.outputKey ?? this.outputKey;
        this.outputParser =
            fields.outputParser ?? new NoOpOutputParser();
        if (this.prompt.outputParser) {
            if (fields.outputParser) {
                throw new Error("Cannot set both outputParser and prompt.outputParser");
            }
            this.outputParser = this.prompt.outputParser;
        }
    }
    /** @ignore */
    _selectMemoryInputs(values) {
        const valuesForMemory = super._selectMemoryInputs(values);
        for (const key of this.llm.callKeys) {
            if (key in values) {
                delete valuesForMemory[key];
            }
        }
        return valuesForMemory;
    }
    /** @ignore */
    async _getFinalOutput(generations, promptValue, runManager) {
        let finalCompletion;
        if (this.outputParser) {
            finalCompletion = await this.outputParser.parseResultWithPrompt(generations, promptValue, runManager?.getChild());
        }
        else {
            finalCompletion = generations[0].text;
        }
        return finalCompletion;
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    call(values, config) {
        return super.call(values, config);
    }
    /** @ignore */
    async _call(values, runManager) {
        const valuesForPrompt = { ...values };
        const valuesForLLM = {
            ...this.llmKwargs,
        };
        for (const key of this.llm.callKeys) {
            if (key in values) {
                valuesForLLM[key] = values[key];
                delete valuesForPrompt[key];
            }
        }
        const promptValue = await this.prompt.formatPromptValue(valuesForPrompt);
        const { generations } = await this.llm.generatePrompt([promptValue], valuesForLLM, runManager?.getChild());
        return {
            [this.outputKey]: await this._getFinalOutput(generations[0], promptValue, runManager),
        };
    }
    /**
     * Format prompt with values and pass to LLM
     *
     * @param values - keys to pass to prompt template
     * @param callbackManager - CallbackManager to use
     * @returns Completion from LLM.
     *
     * @example
     * ```ts
     * llm.predict({ adjective: "funny" })
     * ```
     */
    async predict(values, callbackManager) {
        const output = await this.call(values, callbackManager);
        return output[this.outputKey];
    }
    _chainType() {
        return "llm";
    }
    static async deserialize(data) {
        const { llm, prompt } = data;
        if (!llm) {
            throw new Error("LLMChain must have llm");
        }
        if (!prompt) {
            throw new Error("LLMChain must have prompt");
        }
        return new LLMChain({
            llm: await base_language/* BaseLanguageModel.deserialize */.qV.deserialize(llm),
            prompt: await prompts_base/* BasePromptTemplate.deserialize */.dy.deserialize(prompt),
        });
    }
    /** @deprecated */
    serialize() {
        return {
            _type: `${this._chainType()}_chain`,
            llm: this.llm.serialize(),
            prompt: this.prompt.serialize(),
        };
    }
}


/***/ })

};
