"use strict";
exports.id = 27;
exports.ids = [27];
exports.modules = {

/***/ 27:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ChatOpenAI": () => (/* binding */ ChatOpenAI),
  "PromptLayerChatOpenAI": () => (/* binding */ PromptLayerChatOpenAI)
});

// EXTERNAL MODULE: ./node_modules/openai/index.mjs + 53 modules
var openai = __webpack_require__(37);
// EXTERNAL MODULE: ./node_modules/langchain/dist/base_language/count_tokens.js
var count_tokens = __webpack_require__(8393);
// EXTERNAL MODULE: ./node_modules/langchain/dist/schema/index.js
var schema = __webpack_require__(8102);
// EXTERNAL MODULE: ./node_modules/zod-to-json-schema/index.js
var zod_to_json_schema = __webpack_require__(8707);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/tools/convert_to_openai.js

/**
 * Formats a `StructuredTool` instance into a format that is compatible
 * with OpenAI's ChatCompletionFunctions. It uses the `zodToJsonSchema`
 * function to convert the schema of the `StructuredTool` into a JSON
 * schema, which is then used as the parameters for the OpenAI function.
 */
function formatToOpenAIFunction(tool) {
    return {
        name: tool.name,
        description: tool.description,
        parameters: (0,zod_to_json_schema.zodToJsonSchema)(tool.schema),
    };
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/azure.js
var azure = __webpack_require__(113);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/env.js
var env = __webpack_require__(5785);
// EXTERNAL MODULE: ./node_modules/langchain/dist/util/prompt-layer.js
var prompt_layer = __webpack_require__(2306);
// EXTERNAL MODULE: ./node_modules/langchain/dist/base_language/index.js + 2 modules
var base_language = __webpack_require__(7679);
// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/manager.js + 13 modules
var manager = __webpack_require__(6009);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/chat_models/base.js



/**
 * Creates a transform stream for encoding chat message chunks.
 * @deprecated Use {@link BytesOutputParser} instead
 * @returns A TransformStream instance that encodes chat message chunks.
 */
function createChatMessageChunkEncoderStream() {
    const textEncoder = new TextEncoder();
    return new TransformStream({
        transform(chunk, controller) {
            controller.enqueue(textEncoder.encode(chunk.content));
        },
    });
}
/**
 * Base class for chat models. It extends the BaseLanguageModel class and
 * provides methods for generating chat based on input messages.
 */
class BaseChatModel extends base_language/* BaseLanguageModel */.qV {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "chat_models", this._llmType()]
        });
    }
    _separateRunnableConfigFromCallOptions(options) {
        const [runnableConfig, callOptions] = super._separateRunnableConfigFromCallOptions(options);
        if (callOptions?.timeout && !callOptions.signal) {
            callOptions.signal = AbortSignal.timeout(callOptions.timeout);
        }
        return [runnableConfig, callOptions];
    }
    /**
     * Invokes the chat model with a single input.
     * @param input The input for the language model.
     * @param options The call options.
     * @returns A Promise that resolves to a BaseMessageChunk.
     */
    async invoke(input, options) {
        const promptValue = BaseChatModel._convertInputToPromptValue(input);
        const result = await this.generatePrompt([promptValue], options, options?.callbacks);
        const chatGeneration = result.generations[0][0];
        // TODO: Remove cast after figuring out inheritance
        return chatGeneration.message;
    }
    // eslint-disable-next-line require-yield
    async *_streamResponseChunks(_messages, _options, _runManager) {
        throw new Error("Not implemented.");
    }
    async *_streamIterator(input, options) {
        // Subclass check required to avoid double callbacks with default implementation
        if (this._streamResponseChunks ===
            BaseChatModel.prototype._streamResponseChunks) {
            yield this.invoke(input, options);
        }
        else {
            const prompt = BaseChatModel._convertInputToPromptValue(input);
            const messages = prompt.toChatMessages();
            const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(options);
            const callbackManager_ = await manager/* CallbackManager.configure */.Ye.configure(runnableConfig.callbacks, this.callbacks, runnableConfig.tags, this.tags, runnableConfig.metadata, this.metadata, { verbose: this.verbose });
            const extra = {
                options: callOptions,
                invocation_params: this?.invocationParams(callOptions),
            };
            const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), [messages], undefined, undefined, extra);
            let generationChunk;
            try {
                for await (const chunk of this._streamResponseChunks(messages, callOptions, runManagers?.[0])) {
                    yield chunk.message;
                    if (!generationChunk) {
                        generationChunk = chunk;
                    }
                    else {
                        generationChunk = generationChunk.concat(chunk);
                    }
                }
            }
            catch (err) {
                await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMError(err)));
                throw err;
            }
            await Promise.all((runManagers ?? []).map((runManager) => runManager?.handleLLMEnd({
                // TODO: Remove cast after figuring out inheritance
                generations: [[generationChunk]],
            })));
        }
    }
    /** @ignore */
    async _generateUncached(messages, parsedOptions, handledOptions) {
        const baseMessages = messages.map((messageList) => messageList.map(schema/* coerceMessageLikeToMessage */.E1));
        // create callback manager and start run
        const callbackManager_ = await manager/* CallbackManager.configure */.Ye.configure(handledOptions.callbacks, this.callbacks, handledOptions.tags, this.tags, handledOptions.metadata, this.metadata, { verbose: this.verbose });
        const extra = {
            options: parsedOptions,
            invocation_params: this?.invocationParams(parsedOptions),
        };
        const runManagers = await callbackManager_?.handleChatModelStart(this.toJSON(), baseMessages, undefined, undefined, extra);
        // generate results
        const results = await Promise.allSettled(baseMessages.map((messageList, i) => this._generate(messageList, { ...parsedOptions, promptIndex: i }, runManagers?.[i])));
        // handle results
        const generations = [];
        const llmOutputs = [];
        await Promise.all(results.map(async (pResult, i) => {
            if (pResult.status === "fulfilled") {
                const result = pResult.value;
                generations[i] = result.generations;
                llmOutputs[i] = result.llmOutput;
                return runManagers?.[i]?.handleLLMEnd({
                    generations: [result.generations],
                    llmOutput: result.llmOutput,
                });
            }
            else {
                // status === "rejected"
                await runManagers?.[i]?.handleLLMError(pResult.reason);
                return Promise.reject(pResult.reason);
            }
        }));
        // create combined output
        const output = {
            generations,
            llmOutput: llmOutputs.length
                ? this._combineLLMOutput?.(...llmOutputs)
                : undefined,
        };
        Object.defineProperty(output, schema/* RUN_KEY */.WH, {
            value: runManagers
                ? { runIds: runManagers?.map((manager) => manager.runId) }
                : undefined,
            configurable: true,
        });
        return output;
    }
    /**
     * Generates chat based on the input messages.
     * @param messages An array of arrays of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to an LLMResult.
     */
    async generate(messages, options, callbacks) {
        // parse call options
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else {
            parsedOptions = options;
        }
        const baseMessages = messages.map((messageList) => messageList.map(schema/* coerceMessageLikeToMessage */.E1));
        const [runnableConfig, callOptions] = this._separateRunnableConfigFromCallOptions(parsedOptions);
        runnableConfig.callbacks = runnableConfig.callbacks ?? callbacks;
        if (!this.cache) {
            return this._generateUncached(baseMessages, callOptions, runnableConfig);
        }
        const { cache } = this;
        const llmStringKey = this._getSerializedCacheKeyParametersForCall(callOptions);
        const missingPromptIndices = [];
        const generations = await Promise.all(baseMessages.map(async (baseMessage, index) => {
            // Join all content into one string for the prompt index
            const prompt = BaseChatModel._convertInputToPromptValue(baseMessage).toString();
            const result = await cache.lookup(prompt, llmStringKey);
            if (!result) {
                missingPromptIndices.push(index);
            }
            return result;
        }));
        let llmOutput = {};
        if (missingPromptIndices.length > 0) {
            const results = await this._generateUncached(missingPromptIndices.map((i) => baseMessages[i]), callOptions, runnableConfig);
            await Promise.all(results.generations.map(async (generation, index) => {
                const promptIndex = missingPromptIndices[index];
                generations[promptIndex] = generation;
                // Join all content into one string for the prompt index
                const prompt = BaseChatModel._convertInputToPromptValue(baseMessages[promptIndex]).toString();
                return cache.update(prompt, llmStringKey, generation);
            }));
            llmOutput = results.llmOutput ?? {};
        }
        return { generations, llmOutput };
    }
    /**
     * Get the parameters used to invoke the model
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams(_options) {
        return {};
    }
    _modelType() {
        return "base_chat_model";
    }
    /**
     * @deprecated
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this.invocationParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    /**
     * Generates a prompt based on the input prompt values.
     * @param promptValues An array of BasePromptValue instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to an LLMResult.
     */
    async generatePrompt(promptValues, options, callbacks) {
        const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
        return this.generate(promptMessages, options, callbacks);
    }
    /**
     * Makes a single call to the chat model.
     * @param messages An array of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    async call(messages, options, callbacks) {
        const result = await this.generate([messages.map(schema/* coerceMessageLikeToMessage */.E1)], options, callbacks);
        const generations = result.generations;
        return generations[0][0].message;
    }
    /**
     * Makes a single call to the chat model with a prompt value.
     * @param promptValue The value of the prompt.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    async callPrompt(promptValue, options, callbacks) {
        const promptMessages = promptValue.toChatMessages();
        return this.call(promptMessages, options, callbacks);
    }
    /**
     * Predicts the next message based on the input messages.
     * @param messages An array of BaseMessage instances.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a BaseMessage.
     */
    async predictMessages(messages, options, callbacks) {
        return this.call(messages, options, callbacks);
    }
    /**
     * Predicts the next message based on a text input.
     * @param text The text input.
     * @param options The call options or an array of stop sequences.
     * @param callbacks The callbacks for the language model.
     * @returns A Promise that resolves to a string.
     */
    async predict(text, options, callbacks) {
        const message = new schema/* HumanMessage */.xk(text);
        const result = await this.call([message], options, callbacks);
        return result.content;
    }
}
/**
 * An abstract class that extends BaseChatModel and provides a simple
 * implementation of _generate.
 */
class SimpleChatModel extends (/* unused pure expression or super */ null && (BaseChatModel)) {
    async _generate(messages, options, runManager) {
        const text = await this._call(messages, options, runManager);
        const message = new AIMessage(text);
        return {
            generations: [
                {
                    text: message.content,
                    message,
                },
            ],
        };
    }
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/openai.js
var util_openai = __webpack_require__(8311);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/chat_models/openai.js









function extractGenericMessageCustomRole(message) {
    if (message.role !== "system" &&
        message.role !== "assistant" &&
        message.role !== "user" &&
        message.role !== "function") {
        console.warn(`Unknown message role: ${message.role}`);
    }
    return message.role;
}
function messageToOpenAIRole(message) {
    const type = message._getType();
    switch (type) {
        case "system":
            return "system";
        case "ai":
            return "assistant";
        case "human":
            return "user";
        case "function":
            return "function";
        case "generic": {
            if (!schema/* ChatMessage.isInstance */.J.isInstance(message))
                throw new Error("Invalid generic chat message");
            return extractGenericMessageCustomRole(message);
        }
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
function openAIResponseToChatMessage(message) {
    switch (message.role) {
        case "user":
            return new schema/* HumanMessage */.xk(message.content || "");
        case "assistant":
            return new schema/* AIMessage */.gY(message.content || "", {
                function_call: message.function_call,
            });
        case "system":
            return new schema/* SystemMessage */.jN(message.content || "");
        default:
            return new schema/* ChatMessage */.J(message.content || "", message.role ?? "unknown");
    }
}
function _convertDeltaToMessageChunk(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delta, defaultRole) {
    const role = delta.role ?? defaultRole;
    const content = delta.content ?? "";
    let additional_kwargs;
    if (delta.function_call) {
        additional_kwargs = {
            function_call: delta.function_call,
        };
    }
    else {
        additional_kwargs = {};
    }
    if (role === "user") {
        return new schema/* HumanMessageChunk */.ro({ content });
    }
    else if (role === "assistant") {
        return new schema/* AIMessageChunk */.GC({ content, additional_kwargs });
    }
    else if (role === "system") {
        return new schema/* SystemMessageChunk */.xq({ content });
    }
    else if (role === "function") {
        return new schema/* FunctionMessageChunk */.Cr({
            content,
            additional_kwargs,
            name: delta.name,
        });
    }
    else {
        return new schema/* ChatMessageChunk */.HD({ content, role });
    }
}
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
 * `AZURE_OPENAI_BASE_PATH` is optional and will override `AZURE_OPENAI_API_INSTANCE_NAME` if you need to use a custom endpoint.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/chat/create |
 * `openai.createChatCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */
class ChatOpenAI extends BaseChatModel {
    static lc_name() {
        return "ChatOpenAI";
    }
    get callKeys() {
        return [
            ...super.callKeys,
            "options",
            "function_call",
            "functions",
            "tools",
            "promptIndex",
        ];
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
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
        });
        Object.defineProperty(this, "modelKwargs", {
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
        Object.defineProperty(this, "timeout", {
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
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
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
            fields?.azureOpenAIApiDeploymentName ??
                (0,env/* getEnvironmentVariable */.lS)("AZURE_OPENAI_API_DEPLOYMENT_NAME");
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
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.maxTokens = fields?.maxTokens;
        this.n = fields?.n ?? this.n;
        this.logitBias = fields?.logitBias;
        this.stop = fields?.stop;
        this.user = fields?.user;
        this.streaming = fields?.streaming ?? false;
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
            max_tokens: this.maxTokens === -1 ? undefined : this.maxTokens,
            n: this.n,
            logit_bias: this.logitBias,
            stop: options?.stop ?? this.stop,
            user: this.user,
            stream: this.streaming,
            functions: options?.functions ??
                (options?.tools
                    ? options?.tools.map(formatToOpenAIFunction)
                    : undefined),
            function_call: options?.function_call,
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
    async *_streamResponseChunks(messages, options, runManager) {
        const messagesMapped = messages.map((message) => ({
            role: messageToOpenAIRole(message),
            content: message.content,
            name: message.name,
            function_call: message.additional_kwargs
                .function_call,
        }));
        const params = {
            ...this.invocationParams(options),
            messages: messagesMapped,
            stream: true,
        };
        let defaultRole;
        const streamIterable = await this.completionWithRetry(params, options);
        for await (const data of streamIterable) {
            const choice = data?.choices[0];
            if (!choice) {
                continue;
            }
            const { delta } = choice;
            const chunk = _convertDeltaToMessageChunk(delta, defaultRole);
            defaultRole = delta.role ?? defaultRole;
            const newTokenIndices = {
                prompt: options.promptIndex ?? 0,
                completion: choice.index ?? 0,
            };
            const generationChunk = new schema/* ChatGenerationChunk */.Ls({
                message: chunk,
                text: chunk.content,
                generationInfo: newTokenIndices,
            });
            yield generationChunk;
            // eslint-disable-next-line no-void
            void runManager?.handleLLMNewToken(generationChunk.text ?? "", newTokenIndices, undefined, undefined, undefined, { chunk: generationChunk });
        }
        if (options.signal?.aborted) {
            throw new Error("AbortError");
        }
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return this._identifyingParams();
    }
    /** @ignore */
    async _generate(messages, options, runManager) {
        const tokenUsage = {};
        const params = this.invocationParams(options);
        const messagesMapped = messages.map((message) => ({
            role: messageToOpenAIRole(message),
            content: message.content,
            name: message.name,
            function_call: message.additional_kwargs
                .function_call,
        }));
        if (params.stream) {
            const stream = await this._streamResponseChunks(messages, options, runManager);
            const finalChunks = {};
            for await (const chunk of stream) {
                const index = chunk.generationInfo?.completion ?? 0;
                if (finalChunks[index] === undefined) {
                    finalChunks[index] = chunk;
                }
                else {
                    finalChunks[index] = finalChunks[index].concat(chunk);
                }
            }
            const generations = Object.entries(finalChunks)
                .sort(([aKey], [bKey]) => parseInt(aKey, 10) - parseInt(bKey, 10))
                .map(([_, value]) => value);
            return { generations };
        }
        else {
            const data = await this.completionWithRetry({
                ...params,
                stream: false,
                messages: messagesMapped,
            }, {
                signal: options?.signal,
                ...options?.options,
            });
            const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens, } = data?.usage ?? {};
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
            const generations = [];
            for (const part of data?.choices ?? []) {
                const text = part.message?.content ?? "";
                const generation = {
                    text,
                    message: openAIResponseToChatMessage(part.message ?? { role: "assistant" }),
                };
                if (part.finish_reason) {
                    generation.generationInfo = { finish_reason: part.finish_reason };
                }
                generations.push(generation);
            }
            return {
                generations,
                llmOutput: { tokenUsage },
            };
        }
    }
    async getNumTokensFromMessages(messages) {
        let totalCount = 0;
        let tokensPerMessage = 0;
        let tokensPerName = 0;
        // From: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
        if ((0,count_tokens/* getModelNameForTiktoken */._i)(this.modelName) === "gpt-3.5-turbo") {
            tokensPerMessage = 4;
            tokensPerName = -1;
        }
        else if ((0,count_tokens/* getModelNameForTiktoken */._i)(this.modelName).startsWith("gpt-4")) {
            tokensPerMessage = 3;
            tokensPerName = 1;
        }
        const countPerMessage = await Promise.all(messages.map(async (message) => {
            const textCount = await this.getNumTokens(message.content);
            const roleCount = await this.getNumTokens(messageToOpenAIRole(message));
            const nameCount = message.name !== undefined
                ? tokensPerName + (await this.getNumTokens(message.name))
                : 0;
            const count = textCount + tokensPerMessage + roleCount + nameCount;
            totalCount += count;
            return count;
        }));
        totalCount += 3; // every reply is primed with <|start|>assistant<|message|>
        return { totalCount, countPerMessage };
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
    /** @ignore */
    _combineLLMOutput(...llmOutputs) {
        return llmOutputs.reduce((acc, llmOutput) => {
            if (llmOutput && llmOutput.tokenUsage) {
                acc.tokenUsage.completionTokens +=
                    llmOutput.tokenUsage.completionTokens ?? 0;
                acc.tokenUsage.promptTokens += llmOutput.tokenUsage.promptTokens ?? 0;
                acc.tokenUsage.totalTokens += llmOutput.tokenUsage.totalTokens ?? 0;
            }
            return acc;
        }, {
            tokenUsage: {
                completionTokens: 0,
                promptTokens: 0,
                totalTokens: 0,
            },
        });
    }
}
class PromptLayerChatOpenAI extends ChatOpenAI {
    constructor(fields) {
        super(fields);
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
        this.promptLayerApiKey =
            fields?.promptLayerApiKey ??
                (typeof process !== "undefined"
                    ? // eslint-disable-next-line no-process-env
                        process.env?.PROMPTLAYER_API_KEY
                    : undefined);
        this.plTags = fields?.plTags ?? [];
        this.returnPromptLayerId = fields?.returnPromptLayerId ?? false;
    }
    async _generate(messages, options, runManager) {
        const requestStartTime = Date.now();
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else if (options?.timeout && !options.signal) {
            parsedOptions = {
                ...options,
                signal: AbortSignal.timeout(options.timeout),
            };
        }
        else {
            parsedOptions = options ?? {};
        }
        const generatedResponses = await super._generate(messages, parsedOptions, runManager);
        const requestEndTime = Date.now();
        const _convertMessageToDict = (message) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let messageDict;
            if (message._getType() === "human") {
                messageDict = { role: "user", content: message.content };
            }
            else if (message._getType() === "ai") {
                messageDict = { role: "assistant", content: message.content };
            }
            else if (message._getType() === "function") {
                messageDict = { role: "assistant", content: message.content };
            }
            else if (message._getType() === "system") {
                messageDict = { role: "system", content: message.content };
            }
            else if (message._getType() === "generic") {
                messageDict = {
                    role: message.role,
                    content: message.content,
                };
            }
            else {
                throw new Error(`Got unknown type ${message}`);
            }
            return messageDict;
        };
        const _createMessageDicts = (messages, callOptions) => {
            const params = {
                ...this.invocationParams(),
                model: this.modelName,
            };
            if (callOptions?.stop) {
                if (Object.keys(params).includes("stop")) {
                    throw new Error("`stop` found in both the input and default params.");
                }
            }
            const messageDicts = messages.map((message) => _convertMessageToDict(message));
            return messageDicts;
        };
        for (let i = 0; i < generatedResponses.generations.length; i += 1) {
            const generation = generatedResponses.generations[i];
            const messageDicts = _createMessageDicts(messages, parsedOptions);
            let promptLayerRequestId;
            const parsedResp = [
                {
                    content: generation.text,
                    role: messageToOpenAIRole(generation.message),
                },
            ];
            const promptLayerRespBody = await (0,prompt_layer/* promptLayerTrackRequest */.r)(this.caller, "langchain.PromptLayerChatOpenAI", { ...this._identifyingParams(), messages: messageDicts, stream: false }, this.plTags, parsedResp, requestStartTime, requestEndTime, this.promptLayerApiKey);
            if (this.returnPromptLayerId === true) {
                if (promptLayerRespBody.success === true) {
                    promptLayerRequestId = promptLayerRespBody.request_id;
                }
                if (!generation.generationInfo ||
                    typeof generation.generationInfo !== "object") {
                    generation.generationInfo = {};
                }
                generation.generationInfo.promptLayerRequestId = promptLayerRequestId;
            }
        }
        return generatedResponses;
    }
}


/***/ })

};
;