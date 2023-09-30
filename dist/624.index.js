"use strict";
exports.id = 624;
exports.ids = [624];
exports.modules = {

/***/ 4624:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "OpenAI": () => (/* binding */ OpenAI),
  "OpenAIChat": () => (/* reexport */ OpenAIChat),
  "PromptLayerOpenAI": () => (/* binding */ PromptLayerOpenAI),
  "PromptLayerOpenAIChat": () => (/* reexport */ PromptLayerOpenAIChat)
});

// EXTERNAL MODULE: ./node_modules/openai/index.mjs + 53 modules
var openai = __webpack_require__(37);
// EXTERNAL MODULE: ./node_modules/langchain/dist/base_language/count_tokens.js
var count_tokens = __webpack_require__(8393);
// EXTERNAL MODULE: ./node_modules/langchain/dist/schema/index.js
var schema = __webpack_require__(8102);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/azure.js
var azure = __webpack_require__(113);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/util/chunk.js
const chunkArray = (arr, chunkSize) => arr.reduce((chunks, elem, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    const chunk = chunks[chunkIndex] || [];
    // eslint-disable-next-line no-param-reassign
    chunks[chunkIndex] = chunk.concat([elem]);
    return chunks;
}, []);

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/env.js
var env = __webpack_require__(5785);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/prompt-layer.js
var prompt_layer = __webpack_require__(2306);
// EXTERNAL MODULE: ./node_modules/langchain/dist/base_language/index.js + 2 modules
var base_language = __webpack_require__(7679);
// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/manager.js + 13 modules
var manager = __webpack_require__(6009);
// EXTERNAL MODULE: ./node_modules/langchain/dist/memory/base.js
var base = __webpack_require__(790);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/llms/base.js




/**
 * LLM Wrapper. Provides an {@link call} (an {@link generate}) function that takes in a prompt (or prompts) and returns a string.
 */
class BaseLLM extends base_language/* BaseLanguageModel */.qV {
    constructor({ concurrency, ...rest }) {
        super(concurrency ? { maxConcurrency: concurrency, ...rest } : rest);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "llms", this._llmType()]
        });
    }
    /**
     * This method takes an input and options, and returns a string. It
     * converts the input to a prompt value and generates a result based on
     * the prompt.
     * @param input Input for the LLM.
     * @param options Options for the LLM call.
     * @returns A string result based on the prompt.
     */
    async invoke(input, options) {
        const promptValue = BaseLLM._convertInputToPromptValue(input);
        const result = await this.generatePrompt([promptValue], options, options?.callbacks);
        return result.generations[0][0].text;
    }
    // eslint-disable-next-line require-yield
    async *_streamResponseChunks(_input, _options, _runManager) {
        throw new Error("Not implemented.");
    }
    _separateRunnableConfigFromCallOptions(options) {
        const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
        if (callOptions?.timeout && !callOptions.signal) {
            callOptions.signal = AbortSignal.timeout(callOptions.timeout);
        }
        return [runnableConfig, callOptions];
    }
    async *_streamIterator(input, options) {
        // Subclass check required to avoid double callbacks with default implementation
        if (this._streamResponseChunks === BaseLLM.prototype._streamResponseChunks) {
            yield this.invoke(input, options);
        }
        else {
            const prompt = BaseLLM._convertInputToPromptValue(input);
            const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options);
            const callbackManager_ = await manager/* CallbackManager.configure */.Ye.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, { verbose: this.verbose });
            const extra = {
                options: callOptions,
                invocation_params: this?.invocationParams(callOptions),
            };
            const runManagers = await callbackManager_?.handleLLMStart(this.toJSON(), [prompt.toString()], undefined, undefined, extra);
            let generation = new schema/* GenerationChunk */.b6({
                text: "",
            });
            try {
                for await (const chunk of this._streamResponseChunks(input.toString(), callOptions, runManagers?.[0])) {
                    if (!generation) {
                        generation = chunk;
                    }
                    else {
                        generation = generation.concat(chunk);
                    }
                    if (typeof chunk.text === "string") {
                        yield chunk.text;
                    }
                }
            }
            catch (err) {
                await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
                throw err;
            }
            await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMEnd({
                generations: [[generation]],
            })));
        }
    }
    /**
     * This method takes prompt values, options, and callbacks, and generates
     * a result based on the prompts.
     * @param promptValues Prompt values for the LLM.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns An LLMResult based on the prompts.
     */
    async generatePrompt(promptValues, options, callbacks) {
        const prompts = promptValues.map((promptValue) => promptValue.toString());
        return this.generate(prompts, options, callbacks);
    }
    /**
     * Get the parameters used to invoke the model
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams(_options) {
        return {};
    }
    _flattenLLMResult(llmResult) {
        const llmResults = [];
        for (let i = 0; i < llmResult.generations.length; i += 1) {
            const genList = llmResult.generations[i];
            if (i === 0) {
                llmResults.push({
                    generations: [genList],
                    llmOutput: llmResult.llmOutput,
                });
            }
            else {
                const llmOutput = llmResult.llmOutput
                    ? { ...llmResult.llmOutput, tokenUsage: {} }
                    : undefined;
                llmResults.push({
                    generations: [genList],
                    llmOutput,
                });
            }
        }
        return llmResults;
    }
    /** @ignore */
    async _generateUncached(prompts, parsedOptions, handledOptions) {
        const callbackManager_ = await manager/* CallbackManager.configure */.Ye.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, handledOptions.metadata, this.metadata, { verbose: this.verbose });
        const extra = {
            options: parsedOptions,
            invocation_params: this?.invocationParams(parsedOptions),
        };
        const runManagers = await callbackManager_?.handleLLMStart(this.toJSON(), prompts, undefined, undefined, extra);
        let output;
        try {
            output = await this._generate(prompts, parsedOptions, runManagers?.[0]);
        }
        catch (err) {
            await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
            throw err;
        }
        const flattenedOutputs = this._flattenLLMResult(output);
        await Promise.all((runManagers ?? []).map((runManager, i) => runManager?.handleLLMEnd(flattenedOutputs[i])));
        const runIds = runManagers?.map((manager) => manager.runId) || undefined;
        // This defines RUN_KEY as a non-enumerable property on the output object
        // so that it is not serialized when the output is stringified, and so that
        // it isnt included when listing the keys of the output object.
        Object.defineProperty(output, schema/* RUN_KEY */.WH, {
            value: runIds ? { runIds } : undefined,
            configurable: true,
        });
        return output;
    }
    /**
     * Run the LLM on the given prompts and input, handling caching.
     */
    async generate(prompts, options, callbacks) {
        if (!Array.isArray(prompts)) {
            throw new Error("Argument 'prompts' is expected to be a string[]");
        }
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else {
            parsedOptions = options;
        }
        const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(parsedOptions);
        runnableConfig.callbacks = runnableConfig.callbacks ?? callbacks;
        if (!this.cache) {
            return this._generateUncached(prompts, callOptions, runnableConfig);
        }
        const { cache } = this;
        const llmStringKey = this._getSerializedCacheKeyParametersForCall(callOptions);
        const missingPromptIndices = [];
        const generations = await Promise.all(prompts.map(async (prompt, index) => {
            const result = await cache.lookup(prompt, llmStringKey);
            if (!result) {
                missingPromptIndices.push(index);
            }
            return result;
        }));
        let llmOutput = {};
        if (missingPromptIndices.length > 0) {
            const results = await this._generateUncached(missingPromptIndices.map((i) => prompts[i]), callOptions, runnableConfig);
            await Promise.all(results.generations.map(async (generation, index) => {
                const promptIndex = missingPromptIndices[index];
                generations[promptIndex] = generation;
                return cache.update(prompts[promptIndex], llmStringKey, generation);
            }));
            llmOutput = results.llmOutput ?? {};
        }
        return { generations, llmOutput };
    }
    /**
     * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
     */
    async call(prompt, options, callbacks) {
        const { generations } = await this.generate([prompt], options, callbacks);
        return generations[0][0].text;
    }
    /**
     * This method is similar to `call`, but it's used for making predictions
     * based on the input text.
     * @param text Input text for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A prediction based on the input text.
     */
    async predict(text, options, callbacks) {
        return this.call(text, options, callbacks);
    }
    /**
     * This method takes a list of messages, options, and callbacks, and
     * returns a predicted message.
     * @param messages A list of messages for the prediction.
     * @param options Options for the LLM call.
     * @param callbacks Callbacks for the LLM call.
     * @returns A predicted message based on the list of messages.
     */
    async predictMessages(messages, options, callbacks) {
        const text = (0,base/* getBufferString */.zs)(messages);
        const prediction = await this.call(text, options, callbacks);
        return new schema/* AIMessage */.gY(prediction);
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * @deprecated
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    _modelType() {
        return "base_llm";
    }
    /**
     * @deprecated
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_llm") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4624))).OpenAI,
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
}
/**
 * LLM class that provides a simpler interface to subclass than {@link BaseLLM}.
 *
 * Requires only implementing a simpler {@link _call} method instead of {@link _generate}.
 *
 * @augments BaseLLM
 */
class LLM extends BaseLLM {
    async _generate(prompts, options, runManager) {
        const generations = await Promise.all(prompts.map((prompt, promptIndex) => this._call(prompt, { ...options, promptIndex }, runManager).then((text) => [{ text }])));
        return { generations };
    }
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/openai.js
var util_openai = __webpack_require__(8311);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/llms/openai-chat.js







/**
 * Wrapper around OpenAI large language models that use the Chat endpoint.
 *
 * To use you should have the `openai` package installed, with the
 * `OPENAI_API_KEY` environment variable set.
 *
 * To use with Azure you should have the `openai` package installed, with the
 * `AZURE_OPENAI_API_KEY`,
 * `AZURE_OPENAI_API_INSTANCE_NAME`,
 * `AZURE_OPENAI_API_DEPLOYMENT_NAME`
 * and `AZURE_OPENAI_API_VERSION` environment variable set.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/chat/create |
 * `openai.createCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 *
 * @augments BaseLLM
 * @augments OpenAIInput
 * @augments AzureOpenAIChatInput
 */
class OpenAIChat extends LLM {
    static lc_name() {
        return "OpenAIChat";
    }
    get callKeys() {
        return [...super.callKeys, "options", "promptIndex"];
    }
    get lc_secrets() {
        return {
            openAIApiKey: "OPENAI_API_KEY",
            azureOpenAIApiKey: "AZURE_OPENAI_API_KEY",
            organization: "OPENAI_ORGANIZATION",
        };
    }
    get lc_aliases() {
        return {
            modelName: "model",
            openAIApiKey: "openai_api_key",
            azureOpenAIApiVersion: "azure_openai_api_version",
            azureOpenAIApiKey: "azure_openai_api_key",
            azureOpenAIApiInstanceName: "azure_openai_api_instance_name",
            azureOpenAIApiDeploymentName: "azure_openai_api_deployment_name",
        };
    }
    constructor(fields, 
    /** @deprecated */
    configuration) {
        super(fields ?? {});
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
        });
        Object.defineProperty(this, "prefixMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "organization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.openAIApiKey =
            fields?.openAIApiKey ?? (0,env/* getEnvironmentVariable */.lS)("OPENAI_API_KEY");
        this.azureOpenAIApiKey =
            fields?.azureOpenAIApiKey ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_KEY");
        if (!this.azureOpenAIApiKey && !this.openAIApiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
        }
        this.azureOpenAIApiInstanceName =
            fields?.azureOpenAIApiInstanceName ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_INSTANCE_NAME");
        this.azureOpenAIApiDeploymentName =
            (fields?.azureOpenAIApiCompletionsDeploymentName ||
                fields?.azureOpenAIApiDeploymentName) ??
                ((0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME") ||
                    (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_DEPLOYMENT_NAME"));
        this.azureOpenAIApiVersion =
            fields?.azureOpenAIApiVersion ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_VERSION");
        this.azureOpenAIBasePath =
            fields?.azureOpenAIBasePath ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_BASE_PATH");
        this.organization =
            fields?.configuration?.organization ??
                (0,env/* getEnvironmentVariable */.lS)("OPENAI_ORGANIZATION");
        this.modelName = fields?.modelName ?? this.modelName;
        this.prefixMessages = fields?.prefixMessages ?? this.prefixMessages;
        this.modelKwargs = fields?.modelKwargs ?? {};
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.n = fields?.n ?? this.n;
        this.logitBias = fields?.logitBias;
        this.maxTokens = fields?.maxTokens;
        this.stop = fields?.stop;
        this.user = fields?.user;
        this.streaming = fields?.streaming ?? false;
        if (this.n > 1) {
            throw new Error("Cannot use n > 1 in OpenAIChat LLM. Use ChatOpenAI Chat Model instead.");
        }
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName && !this.azureOpenAIBasePath) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
            this.openAIApiKey = this.openAIApiKey ?? "";
        }
        this.clientConfig = {
            apiKey: this.openAIApiKey,
            organization: this.organization,
            baseURL: configuration?.basePath ?? fields?.configuration?.basePath,
            dangerouslyAllowBrowser: true,
            defaultHeaders: configuration?.baseOptions?.headers ??
                fields?.configuration?.baseOptions?.headers,
            defaultQuery: configuration?.baseOptions?.params ??
                fields?.configuration?.baseOptions?.params,
            ...configuration,
            ...fields?.configuration,
        };
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(options) {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            n: this.n,
            logit_bias: this.logitBias,
            max_tokens: this.maxTokens === -1 ? undefined : this.maxTokens,
            stop: options?.stop ?? this.stop,
            user: this.user,
            stream: this.streaming,
            ...this.modelKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig,
        };
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig,
        };
    }
    /**
     * Formats the messages for the OpenAI API.
     * @param prompt The prompt to be formatted.
     * @returns Array of formatted messages.
     */
    formatMessages(prompt) {
        const message = {
            role: "user",
            content: prompt,
        };
        return this.prefixMessages ? [...this.prefixMessages, message] : [message];
    }
    async *_streamResponseChunks(prompt, options, runManager) {
        const params = {
            ...this.invocationParams(options),
            messages: this.formatMessages(prompt),
            stream: true,
        };
        const stream = await this.completionWithRetry(params, options);
        for await (const data of stream) {
            const choice = data?.choices[0];
            if (!choice) {
                continue;
            }
            const { delta } = choice;
            const generationChunk = new schema/* GenerationChunk */.b6({
                text: delta.content ?? "",
            });
            yield generationChunk;
            const newTokenIndices = {
                prompt: options.promptIndex ?? 0,
                completion: choice.index ?? 0,
            };
            // eslint-disable-next-line no-void
            void runManager?.handleLLMNewToken(generationChunk.text ?? "", newTokenIndices);
        }
        if (options.signal?.aborted) {
            throw new Error("AbortError");
        }
    }
    /** @ignore */
    async _call(prompt, options, runManager) {
        const params = this.invocationParams(options);
        if (params.stream) {
            const stream = await this._streamResponseChunks(prompt, options, runManager);
            let finalChunk;
            for await (const chunk of stream) {
                if (finalChunk === undefined) {
                    finalChunk = chunk;
                }
                else {
                    finalChunk = finalChunk.concat(chunk);
                }
            }
            return finalChunk?.text ?? "";
        }
        else {
            const response = await this.completionWithRetry({
                ...params,
                stream: false,
                messages: this.formatMessages(prompt),
            }, {
                signal: options.signal,
                ...options.options,
            });
            return response?.choices[0]?.message?.content ?? "";
        }
    }
    async completionWithRetry(request, options) {
        const requestOptions = this._getClientOptions(options);
        return this.caller.call(async () => {
            try {
                const res = await this.client.chat.completions.create(request, requestOptions);
                return res;
            }
            catch (e) {
                const error = (0,util_openai/* wrapOpenAIClientError */.K)(e);
                throw error;
            }
        });
    }
    /** @ignore */
    _getClientOptions(options) {
        if (!this.client) {
            const openAIEndpointConfig = {
                azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
                azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
                azureOpenAIApiKey: this.azureOpenAIApiKey,
                azureOpenAIBasePath: this.azureOpenAIBasePath,
                baseURL: this.clientConfig.baseURL,
            };
            const endpoint = (0,azure/* getEndpoint */.O)(openAIEndpointConfig);
            const params = {
                ...this.clientConfig,
                baseURL: endpoint,
                timeout: this.timeout,
                maxRetries: 0,
            };
            if (!params.baseURL) {
                delete params.baseURL;
            }
            this.client = new openai/* OpenAI */.Pp(params);
        }
        const requestOptions = {
            ...this.clientConfig,
            ...options,
        };
        if (this.azureOpenAIApiKey) {
            requestOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...requestOptions.headers,
            };
            requestOptions.query = {
                "api-version": this.azureOpenAIApiVersion,
                ...requestOptions.query,
            };
        }
        return requestOptions;
    }
    _llmType() {
        return "openai";
    }
}
/**
 * PromptLayer wrapper to OpenAIChat
 */
class PromptLayerOpenAIChat extends OpenAIChat {
    get lc_secrets() {
        return {
            promptLayerApiKey: "PROMPTLAYER_API_KEY",
        };
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "promptLayerApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnPromptLayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.plTags = fields?.plTags ?? [];
        this.returnPromptLayerId = fields?.returnPromptLayerId ?? false;
        this.promptLayerApiKey =
            fields?.promptLayerApiKey ??
                (0,env/* getEnvironmentVariable */.lS)("PROMPTLAYER_API_KEY");
        if (!this.promptLayerApiKey) {
            throw new Error("Missing PromptLayer API key");
        }
    }
    async _generate(prompts, options, runManager) {
        let choice;
        const generations = await Promise.all(prompts.map(async (prompt) => {
            const requestStartTime = Date.now();
            const text = await this._call(prompt, options, runManager);
            const requestEndTime = Date.now();
            choice = [{ text }];
            const parsedResp = {
                text,
            };
            const promptLayerRespBody = await (0,prompt_layer/* promptLayerTrackRequest */.r)(this.caller, "langchain.PromptLayerOpenAIChat", 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { ...this._identifyingParams(), prompt }, this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            if (this.returnPromptLayerId === true &&
                promptLayerRespBody.success === true) {
                choice[0].generationInfo = {
                    promptLayerRequestId: promptLayerRespBody.request_id,
                };
            }
            return choice;
        }));
        return { generations };
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/llms/openai.js










/**
 * Wrapper around OpenAI large language models.
 *
 * To use you should have the `openai` package installed, with the
 * `OPENAI_API_KEY` environment variable set.
 *
 * To use with Azure you should have the `openai` package installed, with the
 * `AZURE_OPENAI_API_KEY`,
 * `AZURE_OPENAI_API_INSTANCE_NAME`,
 * `AZURE_OPENAI_API_DEPLOYMENT_NAME`
 * and `AZURE_OPENAI_API_VERSION` environment variable set.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/completions/create |
 * `openai.createCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */
class OpenAI extends BaseLLM {
    static lc_name() {
        return "OpenAI";
    }
    get callKeys() {
        return [...super.callKeys, "options"];
    }
    get lc_secrets() {
        return {
            openAIApiKey: "OPENAI_API_KEY",
            azureOpenAIApiKey: "AZURE_OPENAI_API_KEY",
            organization: "OPENAI_ORGANIZATION",
        };
    }
    get lc_aliases() {
        return {
            modelName: "model",
            openAIApiKey: "openai_api_key",
            azureOpenAIApiVersion: "azure_openai_api_version",
            azureOpenAIApiKey: "azure_openai_api_key",
            azureOpenAIApiInstanceName: "azure_openai_api_instance_name",
            azureOpenAIApiDeploymentName: "azure_openai_api_deployment_name",
        };
    }
    constructor(fields, 
    /** @deprecated */
    configuration) {
        if ((fields?.modelName?.startsWith("gpt-3.5-turbo") ||
            fields?.modelName?.startsWith("gpt-4")) &&
            !fields?.modelName?.includes("-instruct")) {
            // eslint-disable-next-line no-constructor-return
            return new OpenAIChat(fields, configuration);
        }
        super(fields ?? {});
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0.7
        });
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 256
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "bestOf", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-davinci-003"
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 20
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "user", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIBasePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "organization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.openAIApiKey =
            fields?.openAIApiKey ?? (0,env/* getEnvironmentVariable */.lS)("OPENAI_API_KEY");
        this.azureOpenAIApiKey =
            fields?.azureOpenAIApiKey ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_KEY");
        if (!this.azureOpenAIApiKey && !this.openAIApiKey) {
            throw new Error("OpenAI or Azure OpenAI API key not found");
        }
        this.azureOpenAIApiInstanceName =
            fields?.azureOpenAIApiInstanceName ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_INSTANCE_NAME");
        this.azureOpenAIApiDeploymentName =
            (fields?.azureOpenAIApiCompletionsDeploymentName ||
                fields?.azureOpenAIApiDeploymentName) ??
                ((0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_COMPLETIONS_DEPLOYMENT_NAME") ||
                    (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_DEPLOYMENT_NAME"));
        this.azureOpenAIApiVersion =
            fields?.azureOpenAIApiVersion ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_VERSION");
        this.azureOpenAIBasePath =
            fields?.azureOpenAIBasePath ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_BASE_PATH");
        this.organization =
            fields?.configuration?.organization ??
                (0,env/* getEnvironmentVariable */.lS)("OPENAI_ORGANIZATION");
        this.modelName = fields?.modelName ?? this.modelName;
        this.modelKwargs = fields?.modelKwargs ?? {};
        this.batchSize = fields?.batchSize ?? this.batchSize;
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.maxTokens = fields?.maxTokens ?? this.maxTokens;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.n = fields?.n ?? this.n;
        this.bestOf = fields?.bestOf ?? this.bestOf;
        this.logitBias = fields?.logitBias;
        this.stop = fields?.stop;
        this.user = fields?.user;
        this.streaming = fields?.streaming ?? false;
        if (this.streaming && this.bestOf && this.bestOf > 1) {
            throw new Error("Cannot stream results when bestOf > 1");
        }
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName && !this.azureOpenAIBasePath) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
            this.openAIApiKey = this.openAIApiKey ?? "";
        }
        this.clientConfig = {
            apiKey: this.openAIApiKey,
            organization: this.organization,
            baseURL: configuration?.basePath ?? fields?.configuration?.basePath,
            dangerouslyAllowBrowser: true,
            defaultHeaders: configuration?.baseOptions?.headers ??
                fields?.configuration?.baseOptions?.headers,
            defaultQuery: configuration?.baseOptions?.params ??
                fields?.configuration?.baseOptions?.params,
            ...configuration,
            ...fields?.configuration,
        };
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(options) {
        return {
            model: this.modelName,
            temperature: this.temperature,
            max_tokens: this.maxTokens,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            n: this.n,
            best_of: this.bestOf,
            logit_bias: this.logitBias,
            stop: options?.stop ?? this.stop,
            user: this.user,
            stream: this.streaming,
            ...this.modelKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig,
        };
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return this._identifyingParams();
    }
    /**
     * Call out to OpenAI's endpoint with k unique prompts
     *
     * @param [prompts] - The prompts to pass into the model.
     * @param [options] - Optional list of stop words to use when generating.
     * @param [runManager] - Optional callback manager to use when generating.
     *
     * @returns The full LLM output.
     *
     * @example
     * ```ts
     * import { OpenAI } from "langchain/llms/openai";
     * const openai = new OpenAI();
     * const response = await openai.generate(["Tell me a joke."]);
     * ```
     */
    async _generate(prompts, options, runManager) {
        const subPrompts = chunkArray(prompts, this.batchSize);
        const choices = [];
        const tokenUsage = {};
        const params = this.invocationParams(options);
        if (params.max_tokens === -1) {
            if (prompts.length !== 1) {
                throw new Error("max_tokens set to -1 not supported for multiple inputs");
            }
            params.max_tokens = await (0,count_tokens/* calculateMaxTokens */.F1)({
                prompt: prompts[0],
                // Cast here to allow for other models that may not fit the union
                modelName: this.modelName,
            });
        }
        for (let i = 0; i < subPrompts.length; i += 1) {
            const data = params.stream
                ? await (async () => {
                    const choices = [];
                    let response;
                    const stream = await this.completionWithRetry({
                        ...params,
                        stream: true,
                        prompt: subPrompts[i],
                    }, options);
                    for await (const message of stream) {
                        // on the first message set the response properties
                        if (!response) {
                            response = {
                                id: message.id,
                                object: message.object,
                                created: message.created,
                                model: message.model,
                            };
                        }
                        // on all messages, update choice
                        for (const part of message.choices) {
                            if (!choices[part.index]) {
                                choices[part.index] = part;
                            }
                            else {
                                const choice = choices[part.index];
                                choice.text += part.text;
                                choice.finish_reason = part.finish_reason;
                                choice.logprobs = part.logprobs;
                            }
                            void runManager?.handleLLMNewToken(part.text, {
                                prompt: Math.floor(part.index / this.n),
                                completion: part.index % this.n,
                            });
                        }
                    }
                    if (options.signal?.aborted) {
                        throw new Error("AbortError");
                    }
                    return { ...response, choices };
                })()
                : await this.completionWithRetry({
                    ...params,
                    stream: false,
                    prompt: subPrompts[i],
                }, {
                    signal: options.signal,
                    ...options.options,
                });
            choices.push(...data.choices);
            const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens, } = data.usage
                ? data.usage
                : {
                    completion_tokens: undefined,
                    prompt_tokens: undefined,
                    total_tokens: undefined,
                };
            if (completionTokens) {
                tokenUsage.completionTokens =
                    (tokenUsage.completionTokens ?? 0) + completionTokens;
            }
            if (promptTokens) {
                tokenUsage.promptTokens = (tokenUsage.promptTokens ?? 0) + promptTokens;
            }
            if (totalTokens) {
                tokenUsage.totalTokens = (tokenUsage.totalTokens ?? 0) + totalTokens;
            }
        }
        const generations = chunkArray(choices, this.n).map((promptChoices) => promptChoices.map((choice) => ({
            text: choice.text ?? "",
            generationInfo: {
                finishReason: choice.finish_reason,
                logprobs: choice.logprobs,
            },
        })));
        return {
            generations,
            llmOutput: { tokenUsage },
        };
    }
    // TODO(jacoblee): Refactor with _generate(..., {stream: true}) implementation?
    async *_streamResponseChunks(input, options, runManager) {
        const params = {
            ...this.invocationParams(options),
            prompt: input,
            stream: true,
        };
        const stream = await this.completionWithRetry(params, options);
        for await (const data of stream) {
            const choice = data?.choices[0];
            if (!choice) {
                continue;
            }
            const chunk = new schema/* GenerationChunk */.b6({
                text: choice.text,
                generationInfo: {
                    finishReason: choice.finish_reason,
                },
            });
            yield chunk;
            // eslint-disable-next-line no-void
            void runManager?.handleLLMNewToken(chunk.text ?? "");
        }
        if (options.signal?.aborted) {
            throw new Error("AbortError");
        }
    }
    async completionWithRetry(request, options) {
        const requestOptions = this._getClientOptions(options);
        return this.caller.call(async () => {
            try {
                const res = await this.client.completions.create(request, requestOptions);
                return res;
            }
            catch (e) {
                const error = (0,util_openai/* wrapOpenAIClientError */.K)(e);
                throw error;
            }
        });
    }
    /**
     * Calls the OpenAI API with retry logic in case of failures.
     * @param request The request to send to the OpenAI API.
     * @param options Optional configuration for the API call.
     * @returns The response from the OpenAI API.
     */
    _getClientOptions(options) {
        if (!this.client) {
            const openAIEndpointConfig = {
                azureOpenAIApiDeploymentName: this.azureOpenAIApiDeploymentName,
                azureOpenAIApiInstanceName: this.azureOpenAIApiInstanceName,
                azureOpenAIApiKey: this.azureOpenAIApiKey,
                azureOpenAIBasePath: this.azureOpenAIBasePath,
                baseURL: this.clientConfig.baseURL,
            };
            const endpoint = (0,azure/* getEndpoint */.O)(openAIEndpointConfig);
            const params = {
                ...this.clientConfig,
                baseURL: endpoint,
                timeout: this.timeout,
                maxRetries: 0,
            };
            if (!params.baseURL) {
                delete params.baseURL;
            }
            this.client = new openai/* OpenAI */.Pp(params);
        }
        const requestOptions = {
            ...this.clientConfig,
            ...options,
        };
        if (this.azureOpenAIApiKey) {
            requestOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...requestOptions.headers,
            };
            requestOptions.query = {
                "api-version": this.azureOpenAIApiVersion,
                ...requestOptions.query,
            };
        }
        return requestOptions;
    }
    _llmType() {
        return "openai";
    }
}
/**
 * PromptLayer wrapper to OpenAI
 * @augments OpenAI
 */
class PromptLayerOpenAI extends OpenAI {
    get lc_secrets() {
        return {
            promptLayerApiKey: "PROMPTLAYER_API_KEY",
        };
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "promptLayerApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "plTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnPromptLayerId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.plTags = fields?.plTags ?? [];
        this.promptLayerApiKey =
            fields?.promptLayerApiKey ??
                (0,env/* getEnvironmentVariable */.lS)("PROMPTLAYER_API_KEY");
        this.returnPromptLayerId = fields?.returnPromptLayerId;
        if (!this.promptLayerApiKey) {
            throw new Error("Missing PromptLayer API key");
        }
    }
    async _generate(prompts, options, runManager) {
        const requestStartTime = Date.now();
        const generations = await super._generate(prompts, options, runManager);
        for (let i = 0; i < generations.generations.length; i += 1) {
            const requestEndTime = Date.now();
            const parsedResp = {
                text: generations.generations[i][0].text,
                llm_output: generations.llmOutput,
            };
            const promptLayerRespBody = await (0,prompt_layer/* promptLayerTrackRequest */.r)(this.caller, "langchain.PromptLayerOpenAI", 
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { ...this._identifyingParams(), prompt: prompts[i] }, this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            let promptLayerRequestId;
            if (this.returnPromptLayerId === true) {
                if (promptLayerRespBody && promptLayerRespBody.success === true) {
                    promptLayerRequestId = promptLayerRespBody.request_id;
                }
                generations.generations[i][0].generationInfo = {
                    ...generations.generations[i][0].generationInfo,
                    promptLayerRequestId,
                };
            }
        }
        return generations;
    }
}



/***/ })

};
;