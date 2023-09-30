"use strict";
exports.id = 130;
exports.ids = [130,197,273];
exports.modules = {

/***/ 3197:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ BaseChain)
/* harmony export */ });
/* harmony import */ var _schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8102);
/* harmony import */ var _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6009);
/* harmony import */ var _base_language_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7679);



/**
 * Base interface that all chains must implement.
 */
class BaseChain extends _base_language_index_js__WEBPACK_IMPORTED_MODULE_2__/* .BaseLangChain */ .BD {
    get lc_namespace() {
        return ["langchain", "chains", this._chainType()];
    }
    constructor(fields, 
    /** @deprecated */
    verbose, 
    /** @deprecated */
    callbacks) {
        if (arguments.length === 1 &&
            typeof fields === "object" &&
            !("saveContext" in fields)) {
            // fields is not a BaseMemory
            const { memory, callbackManager, ...rest } = fields;
            super({ ...rest, callbacks: callbackManager ?? rest.callbacks });
            this.memory = memory;
        }
        else {
            // fields is a BaseMemory
            super({ verbose, callbacks });
            this.memory = fields;
        }
    }
    /** @ignore */
    _selectMemoryInputs(values) {
        const valuesForMemory = { ...values };
        if ("signal" in valuesForMemory) {
            delete valuesForMemory.signal;
        }
        if ("timeout" in valuesForMemory) {
            delete valuesForMemory.timeout;
        }
        return valuesForMemory;
    }
    /**
     * Invoke the chain with the provided input and returns the output.
     * @param input Input values for the chain run.
     * @param config Optional configuration for the Runnable.
     * @returns Promise that resolves with the output of the chain run.
     */
    async invoke(input, config) {
        return this.call(input, config);
    }
    /**
     * Return a json-like object representing this chain.
     */
    serialize() {
        throw new Error("Method not implemented.");
    }
    async run(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input, config) {
        const inputKeys = this.inputKeys.filter((k) => !this.memory?.memoryKeys.includes(k) ?? true);
        const isKeylessInput = inputKeys.length <= 1;
        if (!isKeylessInput) {
            throw new Error(`Chain ${this._chainType()} expects multiple inputs, cannot use 'run' `);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const values = inputKeys.length ? { [inputKeys[0]]: input } : {};
        const returnValues = await this.call(values, config);
        const keys = Object.keys(returnValues);
        if (keys.length === 1) {
            return returnValues[keys[0]];
        }
        throw new Error("return values have multiple keys, `run` only supported when one key currently");
    }
    async _formatValues(values) {
        const fullValues = { ...values };
        if (fullValues.timeout && !fullValues.signal) {
            fullValues.signal = AbortSignal.timeout(fullValues.timeout);
            delete fullValues.timeout;
        }
        if (!(this.memory == null)) {
            const newValues = await this.memory.loadMemoryVariables(this._selectMemoryInputs(values));
            for (const [key, value] of Object.entries(newValues)) {
                fullValues[key] = value;
            }
        }
        return fullValues;
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    async call(values, config, 
    /** @deprecated */
    tags) {
        const fullValues = await this._formatValues(values);
        const parsedConfig = (0,_callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__/* .parseCallbackConfigArg */ .QH)(config);
        const callbackManager_ = await _callbacks_manager_js__WEBPACK_IMPORTED_MODULE_1__/* .CallbackManager.configure */ .Ye.configure(parsedConfig.callbacks, this.callbacks, parsedConfig.tags || tags, this.tags, parsedConfig.metadata, this.metadata, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), fullValues);
        let outputValues;
        try {
            outputValues = await (values.signal
                ? Promise.race([
                    this._call(fullValues, runManager),
                    new Promise((_, reject) => {
                        values.signal?.addEventListener("abort", () => {
                            reject(new Error("AbortError"));
                        });
                    }),
                ])
                : this._call(fullValues, runManager));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        if (!(this.memory == null)) {
            await this.memory.saveContext(this._selectMemoryInputs(values), outputValues);
        }
        await runManager?.handleChainEnd(outputValues);
        // add the runManager's currentRunId to the outputValues
        Object.defineProperty(outputValues, _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .RUN_KEY */ .WH, {
            value: runManager ? { runId: runManager?.runId } : undefined,
            configurable: true,
        });
        return outputValues;
    }
    /**
     * Call the chain on all inputs in the list
     */
    async apply(inputs, config) {
        return Promise.all(inputs.map(async (i, idx) => this.call(i, config?.[idx])));
    }
    /**
     * Load a chain from a json-like object describing it.
     */
    static async deserialize(data, values = {}) {
        switch (data._type) {
            case "llm_chain": {
                const { LLMChain } = await __webpack_require__.e(/* import() */ 273).then(__webpack_require__.bind(__webpack_require__, 7273));
                return LLMChain.deserialize(data);
            }
            case "sequential_chain": {
                const { SequentialChain } = await __webpack_require__.e(/* import() */ 210).then(__webpack_require__.bind(__webpack_require__, 7210));
                return SequentialChain.deserialize(data);
            }
            case "simple_sequential_chain": {
                const { SimpleSequentialChain } = await __webpack_require__.e(/* import() */ 210).then(__webpack_require__.bind(__webpack_require__, 7210));
                return SimpleSequentialChain.deserialize(data);
            }
            case "stuff_documents_chain": {
                const { StuffDocumentsChain } = await __webpack_require__.e(/* import() */ 608).then(__webpack_require__.bind(__webpack_require__, 3608));
                return StuffDocumentsChain.deserialize(data);
            }
            case "map_reduce_documents_chain": {
                const { MapReduceDocumentsChain } = await __webpack_require__.e(/* import() */ 608).then(__webpack_require__.bind(__webpack_require__, 3608));
                return MapReduceDocumentsChain.deserialize(data);
            }
            case "refine_documents_chain": {
                const { RefineDocumentsChain } = await __webpack_require__.e(/* import() */ 608).then(__webpack_require__.bind(__webpack_require__, 3608));
                return RefineDocumentsChain.deserialize(data);
            }
            case "vector_db_qa": {
                const { VectorDBQAChain } = await Promise.all(/* import() */[__webpack_require__.e(608), __webpack_require__.e(214)]).then(__webpack_require__.bind(__webpack_require__, 5214));
                return VectorDBQAChain.deserialize(data, values);
            }
            case "api_chain": {
                const { APIChain } = await __webpack_require__.e(/* import() */ 159).then(__webpack_require__.bind(__webpack_require__, 6159));
                return APIChain.deserialize(data);
            }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
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
;