"use strict";
exports.id = 657;
exports.ids = [657];
exports.modules = {

/***/ 8882:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ BaseCallbackHandler)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1273);
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4432);


/**
 * Abstract class that provides a set of optional methods that can be
 * overridden in derived classes to handle various events during the
 * execution of a LangChain application.
 */
class BaseCallbackHandlerMethodsClass {
}
/**
 * Abstract base class for creating callback handlers in the LangChain
 * framework. It provides a set of optional methods that can be overridden
 * in derived classes to handle various events during the execution of a
 * LangChain application.
 */
class BaseCallbackHandler extends BaseCallbackHandlerMethodsClass {
    get lc_namespace() {
        return ["langchain", "callbacks", this.name];
    }
    get lc_secrets() {
        return undefined;
    }
    get lc_attributes() {
        return undefined;
    }
    get lc_aliases() {
        return undefined;
    }
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */
    static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */
    get lc_id() {
        return [
            ...this.lc_namespace,
            (0,_load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .get_lc_unique_name */ .j)(this.constructor),
        ];
    }
    constructor(input) {
        super();
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ignoreLLM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ignoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "awaitHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.LANGCHAIN_CALLBACKS_BACKGROUND !== "true"
                : true
        });
        this.lc_kwargs = input || {};
        if (input) {
            this.ignoreLLM = input.ignoreLLM ?? this.ignoreLLM;
            this.ignoreChain = input.ignoreChain ?? this.ignoreChain;
            this.ignoreAgent = input.ignoreAgent ?? this.ignoreAgent;
            this.ignoreRetriever = input.ignoreRetriever ?? this.ignoreRetriever;
        }
    }
    copy() {
        return new this.constructor(this);
    }
    toJSON() {
        return _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable.prototype.toJSON.call */ .i.prototype.toJSON.call(this);
    }
    toJSONNotImplemented() {
        return _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable.prototype.toJSONNotImplemented.call */ .i.prototype.toJSONNotImplemented.call(this);
    }
    static fromMethods(methods) {
        class Handler extends BaseCallbackHandler {
            constructor() {
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: uuid__WEBPACK_IMPORTED_MODULE_1__.v4()
                });
                Object.assign(this, methods);
            }
        }
        return new Handler();
    }
}


/***/ }),

/***/ 8763:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BaseTracer)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8882);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
class BaseTracer extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseCallbackHandler */ .E {
    constructor(_fields) {
        super(...arguments);
        Object.defineProperty(this, "runMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    copy() {
        return this;
    }
    _addChildRun(parentRun, childRun) {
        parentRun.child_runs.push(childRun);
    }
    async _startTrace(run) {
        if (run.parent_run_id !== undefined) {
            const parentRun = this.runMap.get(run.parent_run_id);
            if (parentRun) {
                this._addChildRun(parentRun, run);
                parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
            }
        }
        this.runMap.set(run.id, run);
        await this.onRunCreate?.(run);
    }
    async _endTrace(run) {
        const parentRun = run.parent_run_id !== undefined && this.runMap.get(run.parent_run_id);
        if (parentRun) {
            parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
        }
        else {
            await this.persistRun(run);
        }
        this.runMap.delete(run.id);
        await this.onRunUpdate?.(run);
    }
    _getExecutionOrder(parentRunId) {
        const parentRun = parentRunId !== undefined && this.runMap.get(parentRunId);
        // If a run has no parent then execution order is 1
        if (!parentRun) {
            return 1;
        }
        return parentRun.child_execution_order + 1;
    }
    async handleLLMStart(llm, prompts, runId, parentRunId, extraParams, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata
            ? { ...extraParams, metadata }
            : extraParams;
        const run = {
            id: runId,
            name: name ?? llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { prompts },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || [],
        };
        await this._startTrace(run);
        await this.onLLMStart?.(run);
        return run;
    }
    async handleChatModelStart(llm, messages, runId, parentRunId, extraParams, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const finalExtraParams = metadata
            ? { ...extraParams, metadata }
            : extraParams;
        const run = {
            id: runId,
            name: name ?? llm.id[llm.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: llm,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { messages },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: finalExtraParams ?? {},
            tags: tags || [],
        };
        await this._startTrace(run);
        await this.onLLMStart?.(run);
        return run;
    }
    async handleLLMEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.outputs = output;
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onLLMEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleLLMError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onLLMError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleChainStart(chain, inputs, runId, parentRunId, tags, metadata, runType, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? chain.id[chain.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: chain,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs,
            execution_order,
            child_execution_order: execution_order,
            run_type: runType ?? "chain",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        await this._startTrace(run);
        await this.onChainStart?.(run);
        return run;
    }
    async handleChainEnd(outputs, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.outputs = _coerceToDict(outputs, "output");
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        if (kwargs?.inputs !== undefined) {
            run.inputs = _coerceToDict(kwargs.inputs, "input");
        }
        await this.onChainEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleChainError(error, runId, _parentRunId, _tags, kwargs) {
        const run = this.runMap.get(runId);
        if (!run) {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        if (kwargs?.inputs !== undefined) {
            run.inputs = _coerceToDict(kwargs.inputs, "input");
        }
        await this.onChainError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleToolStart(tool, input, runId, parentRunId, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? tool.id[tool.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: tool,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { input },
            execution_order,
            child_execution_order: execution_order,
            run_type: "tool",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        await this._startTrace(run);
        await this.onToolStart?.(run);
        return run;
    }
    async handleToolEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.outputs = { output };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onToolEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleToolError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onToolError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleAgentAction(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        const agentRun = run;
        agentRun.actions = agentRun.actions || [];
        agentRun.actions.push(action);
        agentRun.events.push({
            name: "agent_action",
            time: new Date().toISOString(),
            kwargs: { action },
        });
        await this.onAgentAction?.(run);
    }
    async handleAgentEnd(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        run.events.push({
            name: "agent_end",
            time: new Date().toISOString(),
            kwargs: { action },
        });
        await this.onAgentEnd?.(run);
    }
    async handleRetrieverStart(retriever, query, runId, parentRunId, tags, metadata, name) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const start_time = Date.now();
        const run = {
            id: runId,
            name: name ?? retriever.id[retriever.id.length - 1],
            parent_run_id: parentRunId,
            start_time,
            serialized: retriever,
            events: [
                {
                    name: "start",
                    time: new Date(start_time).toISOString(),
                },
            ],
            inputs: { query },
            execution_order,
            child_execution_order: execution_order,
            run_type: "retriever",
            child_runs: [],
            extra: metadata ? { metadata } : {},
            tags: tags || [],
        };
        await this._startTrace(run);
        await this.onRetrieverStart?.(run);
        return run;
    }
    async handleRetrieverEnd(documents, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
        }
        run.end_time = Date.now();
        run.outputs = { documents };
        run.events.push({
            name: "end",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onRetrieverEnd?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleRetrieverError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "retriever") {
            throw new Error("No retriever run to end");
        }
        run.end_time = Date.now();
        run.error = error.message;
        run.events.push({
            name: "error",
            time: new Date(run.end_time).toISOString(),
        });
        await this.onRetrieverError?.(run);
        await this._endTrace(run);
        return run;
    }
    async handleText(text, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        run.events.push({
            name: "text",
            time: new Date().toISOString(),
            kwargs: { text },
        });
        await this.onText?.(run);
    }
    async handleLLMNewToken(token, idx, runId, _parentRunId, _tags, fields) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error(`Invalid "runId" provided to "handleLLMNewToken" callback.`);
        }
        run.events.push({
            name: "new_token",
            time: new Date().toISOString(),
            kwargs: { token, idx, chunk: fields?.chunk },
        });
        await this.onLLMNewToken?.(run, token);
        return run;
    }
}


/***/ }),

/***/ 6009:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Ye": () => (/* binding */ CallbackManager),
  "QH": () => (/* binding */ parseCallbackConfigArg)
});

// UNUSED EXPORTS: BaseCallbackManager, CallbackManagerForChainRun, CallbackManagerForLLMRun, CallbackManagerForRetrieverRun, CallbackManagerForToolRun, TraceGroup, traceAsGroup

// EXTERNAL MODULE: ./node_modules/langchain/node_modules/uuid/wrapper.mjs
var wrapper = __webpack_require__(1273);
// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/base.js
var base = __webpack_require__(8882);
// EXTERNAL MODULE: ./node_modules/langchain/node_modules/ansi-styles/index.js
var ansi_styles = __webpack_require__(8964);
// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/handlers/tracer.js
var tracer = __webpack_require__(8763);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/handlers/console.js


function wrap(style, text) {
    return `${style.open}${text}${style.close}`;
}
function tryJsonStringify(obj, fallback) {
    try {
        return JSON.stringify(obj, null, 2);
    }
    catch (err) {
        return fallback;
    }
}
function elapsed(run) {
    if (!run.end_time)
        return "";
    const elapsed = run.end_time - run.start_time;
    if (elapsed < 1000) {
        return `${elapsed}ms`;
    }
    return `${(elapsed / 1000).toFixed(2)}s`;
}
const { color } = ansi_styles;
/**
 * A tracer that logs all events to the console. It extends from the
 * `BaseTracer` class and overrides its methods to provide custom logging
 * functionality.
 */
class ConsoleCallbackHandler extends tracer/* BaseTracer */.Z {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "console_callback_handler"
        });
    }
    /**
     * Method used to persist the run. In this case, it simply returns a
     * resolved promise as there's no persistence logic.
     * @param _run The run to persist.
     * @returns A resolved promise.
     */
    persistRun(_run) {
        return Promise.resolve();
    }
    // utility methods
    /**
     * Method used to get all the parent runs of a given run.
     * @param run The run whose parents are to be retrieved.
     * @returns An array of parent runs.
     */
    getParents(run) {
        const parents = [];
        let currentRun = run;
        while (currentRun.parent_run_id) {
            const parent = this.runMap.get(currentRun.parent_run_id);
            if (parent) {
                parents.push(parent);
                currentRun = parent;
            }
            else {
                break;
            }
        }
        return parents;
    }
    /**
     * Method used to get a string representation of the run's lineage, which
     * is used in logging.
     * @param run The run whose lineage is to be retrieved.
     * @returns A string representation of the run's lineage.
     */
    getBreadcrumbs(run) {
        const parents = this.getParents(run).reverse();
        const string = [...parents, run]
            .map((parent, i, arr) => {
            const name = `${parent.execution_order}:${parent.run_type}:${parent.name}`;
            return i === arr.length - 1 ? wrap(ansi_styles.bold, name) : name;
        })
            .join(" > ");
        return wrap(color.grey, string);
    }
    // logging methods
    /**
     * Method used to log the start of a chain run.
     * @param run The chain run that has started.
     * @returns void
     */
    onChainStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[chain/start]")} [${crumbs}] Entering Chain run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a chain run.
     * @param run The chain run that has ended.
     * @returns void
     */
    onChainEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[chain/end]")} [${crumbs}] [${elapsed(run)}] Exiting Chain run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a chain run.
     * @param run The chain run that has errored.
     * @returns void
     */
    onChainError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[chain/error]")} [${crumbs}] [${elapsed(run)}] Chain run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of an LLM run.
     * @param run The LLM run that has started.
     * @returns void
     */
    onLLMStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        const inputs = "prompts" in run.inputs
            ? { prompts: run.inputs.prompts.map((p) => p.trim()) }
            : run.inputs;
        console.log(`${wrap(color.green, "[llm/start]")} [${crumbs}] Entering LLM run with input: ${tryJsonStringify(inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of an LLM run.
     * @param run The LLM run that has ended.
     * @returns void
     */
    onLLMEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[llm/end]")} [${crumbs}] [${elapsed(run)}] Exiting LLM run with output: ${tryJsonStringify(run.outputs, "[response]")}`);
    }
    /**
     * Method used to log any errors of an LLM run.
     * @param run The LLM run that has errored.
     * @returns void
     */
    onLLMError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[llm/error]")} [${crumbs}] [${elapsed(run)}] LLM run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a tool run.
     * @param run The tool run that has started.
     * @returns void
     */
    onToolStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[tool/start]")} [${crumbs}] Entering Tool run with input: "${run.inputs.input?.trim()}"`);
    }
    /**
     * Method used to log the end of a tool run.
     * @param run The tool run that has ended.
     * @returns void
     */
    onToolEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[tool/end]")} [${crumbs}] [${elapsed(run)}] Exiting Tool run with output: "${run.outputs?.output?.trim()}"`);
    }
    /**
     * Method used to log any errors of a tool run.
     * @param run The tool run that has errored.
     * @returns void
     */
    onToolError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[tool/error]")} [${crumbs}] [${elapsed(run)}] Tool run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the start of a retriever run.
     * @param run The retriever run that has started.
     * @returns void
     */
    onRetrieverStart(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.green, "[retriever/start]")} [${crumbs}] Entering Retriever run with input: ${tryJsonStringify(run.inputs, "[inputs]")}`);
    }
    /**
     * Method used to log the end of a retriever run.
     * @param run The retriever run that has ended.
     * @returns void
     */
    onRetrieverEnd(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.cyan, "[retriever/end]")} [${crumbs}] [${elapsed(run)}] Exiting Retriever run with output: ${tryJsonStringify(run.outputs, "[outputs]")}`);
    }
    /**
     * Method used to log any errors of a retriever run.
     * @param run The retriever run that has errored.
     * @returns void
     */
    onRetrieverError(run) {
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.red, "[retriever/error]")} [${crumbs}] [${elapsed(run)}] Retriever run errored with error: ${tryJsonStringify(run.error, "[error]")}`);
    }
    /**
     * Method used to log the action selected by the agent.
     * @param run The run in which the agent action occurred.
     * @returns void
     */
    onAgentAction(run) {
        const agentRun = run;
        const crumbs = this.getBreadcrumbs(run);
        console.log(`${wrap(color.blue, "[agent/action]")} [${crumbs}] Agent selected action: ${tryJsonStringify(agentRun.actions[agentRun.actions.length - 1], "[action]")}`);
    }
}

// EXTERNAL MODULE: ./node_modules/langsmith/node_modules/uuid/dist/index.js
var dist = __webpack_require__(9097);
;// CONCATENATED MODULE: ./node_modules/langsmith/node_modules/uuid/wrapper.mjs

const v1 = dist.v1;
const v3 = dist.v3;
const v4 = dist.v4;
const v5 = dist.v5;
const NIL = dist.NIL;
const version = dist.version;
const validate = dist.validate;
const stringify = dist.stringify;
const parse = dist.parse;

// EXTERNAL MODULE: ./node_modules/p-retry/index.js
var p_retry = __webpack_require__(2548);
// EXTERNAL MODULE: ./node_modules/p-queue/dist/index.js
var p_queue_dist = __webpack_require__(8983);
;// CONCATENATED MODULE: ./node_modules/langsmith/dist/utils/async_caller.js


const STATUS_NO_RETRY = [
    400,
    401,
    403,
    404,
    405,
    406,
    407,
    408,
    409, // Conflict
];
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */
class AsyncCaller {
    constructor(params) {
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        const PQueue =  true ? p_queue_dist["default"] : p_queue_dist;
        this.queue = new PQueue({ concurrency: this.maxConcurrency });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        return this.queue.add(() => p_retry(() => callable(...args).catch((error) => {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            }
            else {
                throw new Error(error);
            }
        }), {
            onFailedAttempt(error) {
                if (error.message.startsWith("Cancel") ||
                    error.message.startsWith("TimeoutError") ||
                    error.message.startsWith("AbortError")) {
                    throw error;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (error?.code === "ECONNABORTED") {
                    throw error;
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const status = error?.response?.status;
                if (status && STATUS_NO_RETRY.includes(+status)) {
                    throw error;
                }
            },
            retries: this.maxRetries,
            randomize: true,
            // If needed we can change some of the defaults here,
            // but they're quite sensible.
        }), { throwOnTimeout: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject) => {
                    options.signal?.addEventListener("abort", () => {
                        reject(new Error("AbortError"));
                    });
                }),
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(() => fetch(...args).then((res) => (res.ok ? res : Promise.reject(res))));
    }
}

;// CONCATENATED MODULE: ./node_modules/langsmith/dist/utils/messages.js
function isLangChainMessage(message) {
    return typeof message?._getType === "function";
}
function convertLangChainMessageToExample(message) {
    const converted = {
        type: message._getType(),
        data: { content: message.content },
    };
    // Check for presence of keys in additional_kwargs
    if (message?.additional_kwargs &&
        Object.keys(message.additional_kwargs).length > 0) {
        converted.data.additional_kwargs = { ...message.additional_kwargs };
    }
    return converted;
}

;// CONCATENATED MODULE: ./node_modules/langsmith/dist/utils/env.js
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = () => typeof globalThis === "object" &&
    globalThis.constructor &&
    globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = () => (typeof window !== "undefined" && window.name === "nodejs") ||
    (typeof navigator !== "undefined" &&
        (navigator.userAgent.includes("Node.js") ||
            navigator.userAgent.includes("jsdom")));
// Supabase Edge Function provides a `Deno` global object
// without `version` property
const isDeno = () => typeof Deno !== "undefined";
// Mark not-as-node if in Supabase Edge Function
const isNode = () => typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined" &&
    !isDeno();
const getEnv = () => {
    let env;
    if (isBrowser()) {
        env = "browser";
    }
    else if (isNode()) {
        env = "node";
    }
    else if (isWebWorker()) {
        env = "webworker";
    }
    else if (isJsDom()) {
        env = "jsdom";
    }
    else if (isDeno()) {
        env = "deno";
    }
    else {
        env = "other";
    }
    return env;
};
let runtimeEnvironment;
async function env_getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        const releaseEnv = getShas();
        runtimeEnvironment = {
            library: "langsmith",
            runtime: env,
            ...releaseEnv,
        };
    }
    return runtimeEnvironment;
}
/**
 * Retrieves the LangChain-specific environment variables from the current runtime environment.
 * Sensitive keys (containing the word "key") have their values redacted for security.
 *
 * @returns {Record<string, string>}
 *  - A record of LangChain-specific environment variables.
 */
function getLangChainEnvVars() {
    const allEnvVars = getEnvironmentVariables() || {};
    const envVars = {};
    for (const [key, value] of Object.entries(allEnvVars)) {
        if (key.startsWith("LANGCHAIN_") && typeof value === "string") {
            envVars[key] = value;
        }
    }
    for (const key in envVars) {
        if (key.toLowerCase().includes("key") && typeof envVars[key] === "string") {
            const value = envVars[key];
            envVars[key] =
                value.slice(0, 2) + "*".repeat(value.length - 4) + value.slice(-2);
        }
    }
    return envVars;
}
/**
 * Retrieves the environment variables from the current runtime environment.
 *
 * This function is designed to operate in a variety of JS environments,
 * including Node.js, Deno, browsers, etc.
 *
 * @returns {Record<string, string> | undefined}
 *  - A record of environment variables if available.
 *  - `undefined` if the environment does not support or allows access to environment variables.
 */
function getEnvironmentVariables() {
    try {
        // Check for Node.js environment
        // eslint-disable-next-line no-process-env
        if (typeof process !== "undefined" && process.env) {
            // eslint-disable-next-line no-process-env
            Object.entries(process.env).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {});
        }
        // For browsers and other environments, we may not have direct access to env variables
        // Return undefined or any other fallback as required.
        return undefined;
    }
    catch (e) {
        // Catch any errors that might occur while trying to access environment variables
        return undefined;
    }
}
function env_getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/hwchase17/langchainjs/issues/1412
    try {
        return typeof process !== "undefined"
            ? // eslint-disable-next-line no-process-env
                process.env?.[name]
            : undefined;
    }
    catch (e) {
        return undefined;
    }
}
function setEnvironmentVariable(name, value) {
    if (typeof process !== "undefined") {
        // eslint-disable-next-line no-process-env
        process.env[name] = value;
    }
}
let cachedCommitSHAs;
/**
 * Get the Git commit SHA from common environment variables
 * used by different CI/CD platforms.
 * @returns {string | undefined} The Git commit SHA or undefined if not found.
 */
function getShas() {
    if (cachedCommitSHAs !== undefined) {
        return cachedCommitSHAs;
    }
    const common_release_envs = [
        "VERCEL_GIT_COMMIT_SHA",
        "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
        "COMMIT_REF",
        "RENDER_GIT_COMMIT",
        "CI_COMMIT_SHA",
        "CIRCLE_SHA1",
        "CF_PAGES_COMMIT_SHA",
        "REACT_APP_GIT_SHA",
        "SOURCE_VERSION",
        "GITHUB_SHA",
        "TRAVIS_COMMIT",
        "GIT_COMMIT",
        "BUILD_VCS_NUMBER",
        "bamboo_planRepository_revision",
        "Build.SourceVersion",
        "BITBUCKET_COMMIT",
        "DRONE_COMMIT_SHA",
        "SEMAPHORE_GIT_SHA",
        "BUILDKITE_COMMIT",
    ];
    const shas = {};
    for (const env of common_release_envs) {
        const envVar = env_getEnvironmentVariable(env);
        if (envVar !== undefined) {
            shas[env] = envVar;
        }
    }
    cachedCommitSHAs = shas;
    return shas;
}

;// CONCATENATED MODULE: ./node_modules/langsmith/dist/client.js




// utility functions
const isLocalhost = (url) => {
    const strippedUrl = url.replace("http://", "").replace("https://", "");
    const hostname = strippedUrl.split("/")[0].split(":")[0];
    return (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1");
};
const raiseForStatus = async (response, operation) => {
    // consume the response body to release the connection
    // https://undici.nodejs.org/#/?id=garbage-collection
    const body = await response.text();
    if (!response.ok) {
        throw new Error(`Failed to ${operation}: ${response.status} ${response.statusText} ${body}`);
    }
};
async function toArray(iterable) {
    const result = [];
    for await (const item of iterable) {
        result.push(item);
    }
    return result;
}
function trimQuotes(str) {
    if (str === undefined) {
        return undefined;
    }
    return str
        .trim()
        .replace(/^"(.*)"$/, "$1")
        .replace(/^'(.*)'$/, "$1");
}
function hideInputs(inputs) {
    if (env_getEnvironmentVariable("LANGCHAIN_HIDE_INPUTS") === "true") {
        return {};
    }
    return inputs;
}
function hideOutputs(outputs) {
    if (env_getEnvironmentVariable("LANGCHAIN_HIDE_OUTPUTS") === "true") {
        return {};
    }
    return outputs;
}
class client_Client {
    constructor(config = {}) {
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "webUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout_ms", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_tenantId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        const defaultConfig = client_Client.getDefaultClientConfig();
        this.apiUrl = trimQuotes(config.apiUrl ?? defaultConfig.apiUrl) ?? "";
        this.apiKey = trimQuotes(config.apiKey ?? defaultConfig.apiKey);
        this.webUrl = trimQuotes(config.webUrl ?? defaultConfig.webUrl);
        this.validateApiKeyIfHosted();
        this.timeout_ms = config.timeout_ms ?? 4000;
        this.caller = new AsyncCaller(config.callerOptions ?? {});
    }
    static getDefaultClientConfig() {
        const apiKey = env_getEnvironmentVariable("LANGCHAIN_API_KEY");
        const apiUrl = env_getEnvironmentVariable("LANGCHAIN_ENDPOINT") ??
            (apiKey ? "https://api.smith.langchain.com" : "http://localhost:1984");
        return {
            apiUrl: apiUrl,
            apiKey: apiKey,
            webUrl: undefined,
        };
    }
    validateApiKeyIfHosted() {
        const isLocal = isLocalhost(this.apiUrl);
        if (!isLocal && !this.apiKey) {
            throw new Error("API key must be provided when using hosted LangSmith API");
        }
    }
    getHostUrl() {
        if (this.webUrl) {
            return this.webUrl;
        }
        else if (isLocalhost(this.apiUrl)) {
            this.webUrl = "http://localhost";
            return "http://localhost";
        }
        else if (this.apiUrl.split(".", 1)[0].includes("dev")) {
            this.webUrl = "https://dev.smith.langchain.com";
            return "https://dev.smith.langchain.com";
        }
        else {
            this.webUrl = "https://smith.langchain.com";
            return "https://smith.langchain.com";
        }
    }
    get headers() {
        const headers = {};
        if (this.apiKey) {
            headers["x-api-key"] = `${this.apiKey}`;
        }
        return headers;
    }
    async _get(path, queryParams) {
        const paramsString = queryParams?.toString() ?? "";
        const url = `${this.apiUrl}${path}?${paramsString}`;
        const response = await this.caller.call(fetch, url, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
        }
        return response.json();
    }
    async *_getPaginated(path, queryParams = new URLSearchParams()) {
        let offset = Number(queryParams.get("offset")) || 0;
        const limit = Number(queryParams.get("limit")) || 100;
        while (true) {
            queryParams.set("offset", String(offset));
            queryParams.set("limit", String(limit));
            const url = `${this.apiUrl}${path}?${queryParams}`;
            const response = await this.caller.call(fetch, url, {
                method: "GET",
                headers: this.headers,
                signal: AbortSignal.timeout(this.timeout_ms),
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
            }
            const items = await response.json();
            if (items.length === 0) {
                break;
            }
            yield items;
            if (items.length < limit) {
                break;
            }
            offset += items.length;
        }
    }
    async createRun(run) {
        const headers = { ...this.headers, "Content-Type": "application/json" };
        const extra = run.extra ?? {};
        const runtimeEnv = await env_getRuntimeEnvironment();
        const session_name = run.project_name;
        delete run.project_name;
        const runCreate = {
            session_name,
            ...run,
            extra: {
                ...run.extra,
                runtime: {
                    ...runtimeEnv,
                    ...extra.runtime,
                },
            },
        };
        runCreate.inputs = hideInputs(runCreate.inputs);
        if (runCreate.outputs) {
            runCreate.outputs = hideOutputs(runCreate.outputs);
        }
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs`, {
            method: "POST",
            headers,
            body: JSON.stringify(runCreate),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, "create run");
    }
    async updateRun(runId, run) {
        if (run.inputs) {
            run.inputs = hideInputs(run.inputs);
        }
        if (run.outputs) {
            run.outputs = hideOutputs(run.outputs);
        }
        const headers = { ...this.headers, "Content-Type": "application/json" };
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}`, {
            method: "PATCH",
            headers,
            body: JSON.stringify(run),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, "update run");
    }
    async readRun(runId, { loadChildRuns } = { loadChildRuns: false }) {
        let run = await this._get(`/runs/${runId}`);
        if (loadChildRuns && run.child_run_ids) {
            run = await this._loadChildRuns(run);
        }
        return run;
    }
    async getRunUrl({ runId, run, projectOpts, }) {
        if (run !== undefined) {
            let sessionId;
            if (run.session_id) {
                sessionId = run.session_id;
            }
            else if (projectOpts?.projectName) {
                sessionId = (await this.readProject({ projectName: projectOpts?.projectName })).id;
            }
            else if (projectOpts?.projectId) {
                sessionId = projectOpts?.projectId;
            }
            else {
                const project = await this.readProject({
                    projectName: env_getEnvironmentVariable("LANGCHAIN_PROJECT") || "default",
                });
                sessionId = project.id;
            }
            const tenantId = await this._getTenantId();
            return `${this.getHostUrl()}/o/${tenantId}/projects/p/${sessionId}/r/${run.id}?poll=true`;
        }
        else if (runId !== undefined) {
            const run_ = await this.readRun(runId);
            if (!run_.app_path) {
                throw new Error(`Run ${runId} has no app_path`);
            }
            const baseUrl = this.getHostUrl();
            return `${baseUrl}${run_.app_path}`;
        }
        else {
            throw new Error("Must provide either runId or run");
        }
    }
    async _loadChildRuns(run) {
        const childRuns = await toArray(this.listRuns({ id: run.child_run_ids }));
        const treemap = {};
        const runs = {};
        // TODO: make dotted order required when the migration finishes
        childRuns.sort((a, b) => (a?.dotted_order ?? "").localeCompare(b?.dotted_order ?? ""));
        for (const childRun of childRuns) {
            if (childRun.parent_run_id === null ||
                childRun.parent_run_id === undefined) {
                throw new Error(`Child run ${childRun.id} has no parent`);
            }
            if (!(childRun.parent_run_id in treemap)) {
                treemap[childRun.parent_run_id] = [];
            }
            treemap[childRun.parent_run_id].push(childRun);
            runs[childRun.id] = childRun;
        }
        run.child_runs = treemap[run.id] || [];
        for (const runId in treemap) {
            if (runId !== run.id) {
                runs[runId].child_runs = treemap[runId];
            }
        }
        return run;
    }
    async *listRuns({ projectId, projectName, parentRunId, referenceExampleId, startTime, executionOrder, runType, error, id, limit, offset, query, filter, }) {
        const queryParams = new URLSearchParams();
        let projectId_ = projectId;
        if (projectName) {
            if (projectId) {
                throw new Error("Only one of projectId or projectName may be given");
            }
            projectId_ = (await this.readProject({ projectName })).id;
        }
        if (projectId_) {
            queryParams.append("session", projectId_);
        }
        if (parentRunId) {
            queryParams.append("parent_run", parentRunId);
        }
        if (referenceExampleId) {
            queryParams.append("reference_example", referenceExampleId);
        }
        if (startTime) {
            queryParams.append("start_time", startTime.toISOString());
        }
        if (executionOrder) {
            queryParams.append("execution_order", executionOrder.toString());
        }
        if (runType) {
            queryParams.append("run_type", runType);
        }
        if (error !== undefined) {
            queryParams.append("error", error.toString());
        }
        if (id !== undefined) {
            for (const id_ of id) {
                queryParams.append("id", id_);
            }
        }
        if (limit !== undefined) {
            queryParams.append("limit", limit.toString());
        }
        if (offset !== undefined) {
            queryParams.append("offset", offset.toString());
        }
        if (query !== undefined) {
            queryParams.append("query", query);
        }
        if (filter !== undefined) {
            queryParams.append("filter", filter);
        }
        for await (const runs of this._getPaginated("/runs", queryParams)) {
            yield* runs;
        }
    }
    async shareRun(runId, { shareId } = {}) {
        const data = {
            run_id: runId,
            share_token: shareId || v4(),
        };
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) {
            throw new Error("Invalid response from server");
        }
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async unshareRun(runId) {
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, "unshare run");
    }
    async readRunSharedLink(runId) {
        const response = await this.caller.call(fetch, `${this.apiUrl}/runs/${runId}/share`, {
            method: "GET",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        const result = await response.json();
        if (result === null || !("share_token" in result)) {
            return undefined;
        }
        return `${this.getHostUrl()}/public/${result["share_token"]}/r`;
    }
    async createProject({ projectName, projectExtra, upsert, referenceDatasetId, }) {
        const upsert_ = upsert ? `?upsert=true` : "";
        const endpoint = `${this.apiUrl}/sessions${upsert_}`;
        const body = {
            name: projectName,
        };
        if (projectExtra !== undefined) {
            body["extra"] = projectExtra;
        }
        if (referenceDatasetId !== undefined) {
            body["reference_dataset_id"] = referenceDatasetId;
        }
        const response = await this.caller.call(fetch, endpoint, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to create session ${projectName}: ${response.status} ${response.statusText}`);
        }
        return result;
    }
    async readProject({ projectId, projectName, }) {
        let path = "/sessions";
        const params = new URLSearchParams();
        if (projectId !== undefined && projectName !== undefined) {
            throw new Error("Must provide either projectName or projectId, not both");
        }
        else if (projectId !== undefined) {
            path += `/${projectId}`;
        }
        else if (projectName !== undefined) {
            params.append("name", projectName);
        }
        else {
            throw new Error("Must provide projectName or projectId");
        }
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) {
                throw new Error(`Project[id=${projectId}, name=${projectName}] not found`);
            }
            result = response[0];
        }
        else {
            result = response;
        }
        return result;
    }
    async _getTenantId() {
        if (this._tenantId !== null) {
            return this._tenantId;
        }
        const queryParams = new URLSearchParams({ limit: "1" });
        for await (const projects of this._getPaginated("/sessions", queryParams)) {
            this._tenantId = projects[0].tenant_id;
            return projects[0].tenant_id;
        }
        throw new Error("No projects found to resolve tenant.");
    }
    async *listProjects({ projectIds, name, nameContains, referenceDatasetId, referenceDatasetName, referenceFree, } = {}) {
        const params = new URLSearchParams();
        if (projectIds !== undefined) {
            for (const projectId of projectIds) {
                params.append("id", projectId);
            }
        }
        if (name !== undefined) {
            params.append("name", name);
        }
        if (nameContains !== undefined) {
            params.append("name_contains", nameContains);
        }
        if (referenceDatasetId !== undefined) {
            params.append("reference_dataset", referenceDatasetId);
        }
        else if (referenceDatasetName !== undefined) {
            const dataset = await this.readDataset({
                datasetName: referenceDatasetName,
            });
            params.append("reference_dataset", dataset.id);
        }
        if (referenceFree !== undefined) {
            params.append("reference_free", referenceFree.toString());
        }
        for await (const projects of this._getPaginated("/sessions", params)) {
            yield* projects;
        }
    }
    async deleteProject({ projectId, projectName, }) {
        let projectId_;
        if (projectId === undefined && projectName === undefined) {
            throw new Error("Must provide projectName or projectId");
        }
        else if (projectId !== undefined && projectName !== undefined) {
            throw new Error("Must provide either projectName or projectId, not both");
        }
        else if (projectId === undefined) {
            projectId_ = (await this.readProject({ projectName })).id;
        }
        else {
            projectId_ = projectId;
        }
        const response = await this.caller.call(fetch, `${this.apiUrl}/sessions/${projectId_}`, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, `delete session ${projectId_} (${projectName})`);
    }
    async uploadCsv({ csvFile, fileName, inputKeys, outputKeys, description, dataType, name, }) {
        const url = `${this.apiUrl}/datasets/upload`;
        const formData = new FormData();
        formData.append("file", csvFile, fileName);
        inputKeys.forEach((key) => {
            formData.append("input_keys", key);
        });
        outputKeys.forEach((key) => {
            formData.append("output_keys", key);
        });
        if (description) {
            formData.append("description", description);
        }
        if (dataType) {
            formData.append("data_type", dataType);
        }
        if (name) {
            formData.append("name", name);
        }
        const response = await this.caller.call(fetch, url, {
            method: "POST",
            headers: this.headers,
            body: formData,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            const result = await response.json();
            if (result.detail && result.detail.includes("already exists")) {
                throw new Error(`Dataset ${fileName} already exists`);
            }
            throw new Error(`Failed to upload CSV: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async createDataset(name, { description, dataType, } = {}) {
        const body = {
            name,
            description,
        };
        if (dataType) {
            body.data_type = dataType;
        }
        const response = await this.caller.call(fetch, `${this.apiUrl}/datasets`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            const result = await response.json();
            if (result.detail && result.detail.includes("already exists")) {
                throw new Error(`Dataset ${name} already exists`);
            }
            throw new Error(`Failed to create dataset ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async readDataset({ datasetId, datasetName, }) {
        let path = "/datasets";
        // limit to 1 result
        const params = new URLSearchParams({ limit: "1" });
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId !== undefined) {
            path += `/${datasetId}`;
        }
        else if (datasetName !== undefined) {
            params.append("name", datasetName);
        }
        else {
            throw new Error("Must provide datasetName or datasetId");
        }
        const response = await this._get(path, params);
        let result;
        if (Array.isArray(response)) {
            if (response.length === 0) {
                throw new Error(`Dataset[id=${datasetId}, name=${datasetName}] not found`);
            }
            result = response[0];
        }
        else {
            result = response;
        }
        return result;
    }
    async *listDatasets({ limit = 100, offset = 0, datasetIds, datasetName, datasetNameContains, } = {}) {
        const path = "/datasets";
        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: offset.toString(),
        });
        if (datasetIds !== undefined) {
            for (const id_ of datasetIds) {
                params.append("id", id_);
            }
        }
        if (datasetName !== undefined) {
            params.append("name", datasetName);
        }
        if (datasetNameContains !== undefined) {
            params.append("name_contains", datasetNameContains);
        }
        for await (const datasets of this._getPaginated(path, params)) {
            yield* datasets;
        }
    }
    async deleteDataset({ datasetId, datasetName, }) {
        let path = "/datasets";
        let datasetId_ = datasetId;
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        if (datasetId_ !== undefined) {
            path += `/${datasetId_}`;
        }
        else {
            throw new Error("Must provide datasetName or datasetId");
        }
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        }
        await response.json();
    }
    async createExample(inputs, outputs, { datasetId, datasetName, createdAt, exampleId }) {
        let datasetId_ = datasetId;
        if (datasetId_ === undefined && datasetName === undefined) {
            throw new Error("Must provide either datasetName or datasetId");
        }
        else if (datasetId_ !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId_ === undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        const createdAt_ = createdAt || new Date();
        const data = {
            dataset_id: datasetId_,
            inputs,
            outputs,
            created_at: createdAt_.toISOString(),
            id: exampleId,
        };
        const response = await this.caller.call(fetch, `${this.apiUrl}/examples`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to create example: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async createLLMExample(input, generation, options) {
        return this.createExample({ input }, { output: generation }, options);
    }
    async createChatExample(input, generations, options) {
        const finalInput = input.map((message) => {
            if (isLangChainMessage(message)) {
                return convertLangChainMessageToExample(message);
            }
            return message;
        });
        const finalOutput = isLangChainMessage(generations)
            ? convertLangChainMessageToExample(generations)
            : generations;
        return this.createExample({ input: finalInput }, { output: finalOutput }, options);
    }
    async readExample(exampleId) {
        const path = `/examples/${exampleId}`;
        return await this._get(path);
    }
    async *listExamples({ datasetId, datasetName, exampleIds, } = {}) {
        let datasetId_;
        if (datasetId !== undefined && datasetName !== undefined) {
            throw new Error("Must provide either datasetName or datasetId, not both");
        }
        else if (datasetId !== undefined) {
            datasetId_ = datasetId;
        }
        else if (datasetName !== undefined) {
            const dataset = await this.readDataset({ datasetName });
            datasetId_ = dataset.id;
        }
        else {
            throw new Error("Must provide a datasetName or datasetId");
        }
        const params = new URLSearchParams({ dataset: datasetId_ });
        if (exampleIds !== undefined) {
            for (const id_ of exampleIds) {
                params.append("id", id_);
            }
        }
        for await (const examples of this._getPaginated("/examples", params)) {
            yield* examples;
        }
    }
    async deleteExample(exampleId) {
        const path = `/examples/${exampleId}`;
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        }
        await response.json();
    }
    async updateExample(exampleId, update) {
        const response = await this.caller.call(fetch, `${this.apiUrl}/examples/${exampleId}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(update),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to update example ${exampleId}: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    }
    async evaluateRun(run, evaluator, { sourceInfo, loadChildRuns, } = { loadChildRuns: false }) {
        let run_;
        if (typeof run === "string") {
            run_ = await this.readRun(run, { loadChildRuns });
        }
        else if (typeof run === "object" && "id" in run) {
            run_ = run;
        }
        else {
            throw new Error(`Invalid run type: ${typeof run}`);
        }
        let referenceExample = undefined;
        if (run_.reference_example_id !== null &&
            run_.reference_example_id !== undefined) {
            referenceExample = await this.readExample(run_.reference_example_id);
        }
        const feedbackResult = await evaluator.evaluateRun(run_, referenceExample);
        let sourceInfo_ = sourceInfo ?? {};
        if (feedbackResult.evaluatorInfo) {
            sourceInfo_ = { ...sourceInfo_, ...feedbackResult.evaluatorInfo };
        }
        return await this.createFeedback(run_.id, feedbackResult.key, {
            score: feedbackResult.score,
            value: feedbackResult.value,
            comment: feedbackResult.comment,
            correction: feedbackResult.correction,
            sourceInfo: sourceInfo_,
            feedbackSourceType: "model",
        });
    }
    async createFeedback(runId, key, { score, value, correction, comment, sourceInfo, feedbackSourceType = "api", sourceRunId, feedbackId, }) {
        const feedback_source = {
            type: feedbackSourceType ?? "api",
            metadata: sourceInfo ?? {},
        };
        if (sourceRunId !== undefined &&
            feedback_source?.metadata !== undefined &&
            !feedback_source.metadata["__run"]) {
            feedback_source.metadata["__run"] = { run_id: sourceRunId };
        }
        const feedback = {
            id: feedbackId ?? v4(),
            run_id: runId,
            key,
            score,
            value,
            correction,
            comment,
            feedback_source: feedback_source,
        };
        const response = await this.caller.call(fetch, `${this.apiUrl}/feedback`, {
            method: "POST",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(feedback),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, "create feedback");
        return feedback;
    }
    async updateFeedback(feedbackId, { score, value, correction, comment, }) {
        const feedbackUpdate = {};
        if (score !== undefined && score !== null) {
            feedbackUpdate["score"] = score;
        }
        if (value !== undefined && value !== null) {
            feedbackUpdate["value"] = value;
        }
        if (correction !== undefined && correction !== null) {
            feedbackUpdate["correction"] = correction;
        }
        if (comment !== undefined && comment !== null) {
            feedbackUpdate["comment"] = comment;
        }
        const response = await this.caller.call(fetch, `${this.apiUrl}/feedback/${feedbackId}`, {
            method: "PATCH",
            headers: { ...this.headers, "Content-Type": "application/json" },
            body: JSON.stringify(feedbackUpdate),
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        await raiseForStatus(response, "update feedback");
    }
    async readFeedback(feedbackId) {
        const path = `/feedback/${feedbackId}`;
        const response = await this._get(path);
        return response;
    }
    async deleteFeedback(feedbackId) {
        const path = `/feedback/${feedbackId}`;
        const response = await this.caller.call(fetch, this.apiUrl + path, {
            method: "DELETE",
            headers: this.headers,
            signal: AbortSignal.timeout(this.timeout_ms),
        });
        if (!response.ok) {
            throw new Error(`Failed to delete ${path}: ${response.status} ${response.statusText}`);
        }
        await response.json();
    }
    async *listFeedback({ runIds, feedbackKeys, feedbackSourceTypes, } = {}) {
        const queryParams = new URLSearchParams();
        if (runIds) {
            queryParams.append("run", runIds.join(","));
        }
        if (feedbackKeys) {
            for (const key of feedbackKeys) {
                queryParams.append("key", key);
            }
        }
        if (feedbackSourceTypes) {
            for (const type of feedbackSourceTypes) {
                queryParams.append("source", type);
            }
        }
        for await (const feedbacks of this._getPaginated("/feedback", queryParams)) {
            yield* feedbacks;
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/langsmith/dist/run_trees.js



const warnedMessages = {};
function warnOnce(message) {
    if (!warnedMessages[message]) {
        console.warn(message);
        warnedMessages[message] = true;
    }
}
class RunTree {
    constructor(config) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "run_type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "project_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent_run", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_runs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "child_execution_order", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "start_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "end_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "extra", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serialized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "reference_example_id", {
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
        Object.defineProperty(this, "events", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const defaultConfig = RunTree.getDefaultConfig();
        Object.assign(this, { ...defaultConfig, ...config });
    }
    static getDefaultConfig() {
        return {
            id: uuid.v4(),
            project_name: getEnvironmentVariable("LANGCHAIN_PROJECT") ??
                getEnvironmentVariable("LANGCHAIN_SESSION") ?? // TODO: Deprecate
                "default",
            child_runs: [],
            execution_order: 1,
            child_execution_order: 1,
            api_url: getEnvironmentVariable("LANGCHAIN_ENDPOINT") ?? "http://localhost:1984",
            api_key: getEnvironmentVariable("LANGCHAIN_API_KEY"),
            caller_options: {},
            start_time: Date.now(),
            serialized: {},
            inputs: {},
            extra: {},
            client: new Client({}),
        };
    }
    async createChild(config) {
        const child = new RunTree({
            ...config,
            parent_run: this,
            project_name: this.project_name,
            client: this.client,
            execution_order: this.child_execution_order + 1,
            child_execution_order: this.child_execution_order + 1,
        });
        this.child_runs.push(child);
        return child;
    }
    async end(outputs, error, endTime = Date.now()) {
        this.outputs = outputs;
        this.error = error;
        this.end_time = endTime;
        if (this.parent_run) {
            this.parent_run.child_execution_order = Math.max(this.parent_run.child_execution_order, this.child_execution_order);
        }
    }
    async _convertToCreate(run, excludeChildRuns = true) {
        const runExtra = run.extra ?? {};
        if (!runExtra.runtime) {
            runExtra.runtime = {};
        }
        const runtimeEnv = await getRuntimeEnvironment();
        for (const [k, v] of Object.entries(runtimeEnv)) {
            if (!runExtra.runtime[k]) {
                runExtra.runtime[k] = v;
            }
        }
        let child_runs;
        let parent_run_id;
        if (!excludeChildRuns) {
            child_runs = await Promise.all(run.child_runs.map((child_run) => this._convertToCreate(child_run, excludeChildRuns)));
            parent_run_id = undefined;
        }
        else {
            parent_run_id = run.parent_run?.id;
            child_runs = [];
        }
        const persistedRun = {
            id: run.id,
            name: run.name,
            start_time: run.start_time,
            end_time: run.end_time,
            run_type: run.run_type,
            reference_example_id: run.reference_example_id,
            extra: runExtra,
            execution_order: run.execution_order,
            serialized: run.serialized,
            error: run.error,
            inputs: run.inputs,
            outputs: run.outputs,
            session_name: run.project_name,
            child_runs: child_runs,
            parent_run_id: parent_run_id,
        };
        return persistedRun;
    }
    async postRun(excludeChildRuns = true) {
        const runCreate = await this._convertToCreate(this, true);
        await this.client.createRun(runCreate);
        if (!excludeChildRuns) {
            warnOnce("Posting with excludeChildRuns=false is deprecated and will be removed in a future version.");
            for (const childRun of this.child_runs) {
                await childRun.postRun(false);
            }
        }
    }
    async patchRun() {
        const runUpdate = {
            end_time: this.end_time,
            error: this.error,
            outputs: this.outputs,
            parent_run_id: this.parent_run?.id,
            reference_example_id: this.reference_example_id,
            extra: this.extra,
            events: this.events,
        };
        await this.client.updateRun(this.id, runUpdate);
    }
}

;// CONCATENATED MODULE: ./node_modules/langsmith/dist/index.js



;// CONCATENATED MODULE: ./node_modules/langsmith/index.js

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/env.js
var env = __webpack_require__(5785);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/handlers/tracer_langchain.js



class tracer_langchain_LangChainTracer extends tracer/* BaseTracer */.Z {
    constructor(fields = {}) {
        super(fields);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "projectName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exampleId", {
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
        const { exampleId, projectName, client } = fields;
        this.projectName =
            projectName ??
                (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_PROJECT") ??
                (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_SESSION");
        this.exampleId = exampleId;
        this.client = client ?? new client_Client({});
    }
    async _convertToCreate(run, example_id = undefined) {
        return {
            ...run,
            extra: {
                ...run.extra,
                runtime: await (0,env/* getRuntimeEnvironment */.sA)(),
            },
            child_runs: undefined,
            session_name: this.projectName,
            reference_example_id: run.parent_run_id ? undefined : example_id,
        };
    }
    async persistRun(_run) { }
    async _persistRunSingle(run) {
        const persistedRun = await this._convertToCreate(run, this.exampleId);
        await this.client.createRun(persistedRun);
    }
    async _updateRunSingle(run) {
        const runUpdate = {
            end_time: run.end_time,
            error: run.error,
            outputs: run.outputs,
            events: run.events,
            inputs: run.inputs,
        };
        await this.client.updateRun(run.id, runUpdate);
    }
    async onRetrieverStart(run) {
        await this._persistRunSingle(run);
    }
    async onRetrieverEnd(run) {
        await this._updateRunSingle(run);
    }
    async onRetrieverError(run) {
        await this._updateRunSingle(run);
    }
    async onLLMStart(run) {
        await this._persistRunSingle(run);
    }
    async onLLMEnd(run) {
        await this._updateRunSingle(run);
    }
    async onLLMError(run) {
        await this._updateRunSingle(run);
    }
    async onChainStart(run) {
        await this._persistRunSingle(run);
    }
    async onChainEnd(run) {
        await this._updateRunSingle(run);
    }
    async onChainError(run) {
        await this._updateRunSingle(run);
    }
    async onToolStart(run) {
        await this._persistRunSingle(run);
    }
    async onToolEnd(run) {
        await this._updateRunSingle(run);
    }
    async onToolError(run) {
        await this._updateRunSingle(run);
    }
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/memory/base.js
var memory_base = __webpack_require__(790);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/handlers/tracer_langchain_v1.js



class LangChainTracerV1 extends tracer/* BaseTracer */.Z {
    constructor() {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "langchain_tracer"
        });
        Object.defineProperty(this, "endpoint", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_ENDPOINT") || "http://localhost:1984"
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                "Content-Type": "application/json",
            }
        });
        Object.defineProperty(this, "session", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_API_KEY");
        if (apiKey) {
            this.headers["x-api-key"] = apiKey;
        }
    }
    async newSession(sessionName) {
        const sessionCreate = {
            start_time: Date.now(),
            name: sessionName,
        };
        const session = await this.persistSession(sessionCreate);
        this.session = session;
        return session;
    }
    async loadSession(sessionName) {
        const endpoint = `${this.endpoint}/sessions?name=${sessionName}`;
        return this._handleSessionResponse(endpoint);
    }
    async loadDefaultSession() {
        const endpoint = `${this.endpoint}/sessions?name=default`;
        return this._handleSessionResponse(endpoint);
    }
    async convertV2RunToRun(run) {
        const session = this.session ?? (await this.loadDefaultSession());
        const serialized = run.serialized;
        let runResult;
        if (run.run_type === "llm") {
            const prompts = run.inputs.prompts
                ? run.inputs.prompts
                : run.inputs.messages.map((x) => (0,memory_base/* getBufferString */.zs)(x));
            const llmRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                prompts,
                response: run.outputs,
            };
            runResult = llmRun;
        }
        else if (run.run_type === "chain") {
            const child_runs = await Promise.all(run.child_runs.map((child_run) => this.convertV2RunToRun(child_run)));
            const chainRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                inputs: run.inputs,
                outputs: run.outputs,
                child_llm_runs: child_runs.filter((child_run) => child_run.type === "llm"),
                child_chain_runs: child_runs.filter((child_run) => child_run.type === "chain"),
                child_tool_runs: child_runs.filter((child_run) => child_run.type === "tool"),
            };
            runResult = chainRun;
        }
        else if (run.run_type === "tool") {
            const child_runs = await Promise.all(run.child_runs.map((child_run) => this.convertV2RunToRun(child_run)));
            const toolRun = {
                uuid: run.id,
                start_time: run.start_time,
                end_time: run.end_time,
                execution_order: run.execution_order,
                child_execution_order: run.child_execution_order,
                serialized,
                type: run.run_type,
                session_id: session.id,
                tool_input: run.inputs.input,
                output: run.outputs?.output,
                action: JSON.stringify(serialized),
                child_llm_runs: child_runs.filter((child_run) => child_run.type === "llm"),
                child_chain_runs: child_runs.filter((child_run) => child_run.type === "chain"),
                child_tool_runs: child_runs.filter((child_run) => child_run.type === "tool"),
            };
            runResult = toolRun;
        }
        else {
            throw new Error(`Unknown run type: ${run.run_type}`);
        }
        return runResult;
    }
    async persistRun(run) {
        let endpoint;
        let v1Run;
        if (run.run_type !== undefined) {
            v1Run = await this.convertV2RunToRun(run);
        }
        else {
            v1Run = run;
        }
        if (v1Run.type === "llm") {
            endpoint = `${this.endpoint}/llm-runs`;
        }
        else if (v1Run.type === "chain") {
            endpoint = `${this.endpoint}/chain-runs`;
        }
        else {
            endpoint = `${this.endpoint}/tool-runs`;
        }
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(v1Run),
        });
        if (!response.ok) {
            console.error(`Failed to persist run: ${response.status} ${response.statusText}`);
        }
    }
    async persistSession(sessionCreate) {
        const endpoint = `${this.endpoint}/sessions`;
        const response = await fetch(endpoint, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(sessionCreate),
        });
        if (!response.ok) {
            console.error(`Failed to persist session: ${response.status} ${response.statusText}, using default session.`);
            return {
                id: 1,
                ...sessionCreate,
            };
        }
        return {
            id: (await response.json()).id,
            ...sessionCreate,
        };
    }
    async _handleSessionResponse(endpoint) {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: this.headers,
        });
        let tracerSession;
        if (!response.ok) {
            console.error(`Failed to load session: ${response.status} ${response.statusText}`);
            tracerSession = {
                id: 1,
                start_time: Date.now(),
            };
            this.session = tracerSession;
            return tracerSession;
        }
        const resp = (await response.json());
        if (resp.length === 0) {
            tracerSession = {
                id: 1,
                start_time: Date.now(),
            };
            this.session = tracerSession;
            return tracerSession;
        }
        [tracerSession] = resp;
        this.session = tracerSession;
        return tracerSession;
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/handlers/initialize.js


/**
 * Function that returns an instance of `LangChainTracerV1`. If a session
 * is provided, it loads that session into the tracer; otherwise, it loads
 * a default session.
 * @param session Optional session to load into the tracer.
 * @returns An instance of `LangChainTracerV1`.
 */
async function getTracingCallbackHandler(session) {
    const tracer = new LangChainTracerV1();
    if (session) {
        await tracer.loadSession(session);
    }
    else {
        await tracer.loadDefaultSession();
    }
    return tracer;
}
/**
 * Function that returns an instance of `LangChainTracer`. It does not
 * load any session data.
 * @returns An instance of `LangChainTracer`.
 */
async function getTracingV2CallbackHandler() {
    return new tracer_langchain_LangChainTracer();
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/promises.js

let queue;
/**
 * Creates a queue using the p-queue library. The queue is configured to
 * auto-start and has a concurrency of 1, meaning it will process tasks
 * one at a time.
 */
function createQueue() {
    const PQueue =  true ? p_queue_dist["default"] : p_queue_dist;
    return new PQueue({
        autoStart: true,
        concurrency: 1,
    });
}
/**
 * Consume a promise, either adding it to the queue or waiting for it to resolve
 * @param promise Promise to consume
 * @param wait Whether to wait for the promise to resolve or resolve immediately
 */
async function consumeCallback(promiseFn, wait) {
    if (wait === true) {
        await promiseFn();
    }
    else {
        if (typeof queue === "undefined") {
            queue = createQueue();
        }
        void queue.add(promiseFn);
    }
}
/**
 * Waits for all promises in the queue to resolve. If the queue is
 * undefined, it immediately resolves a promise.
 */
function awaitAllCallbacks() {
    return typeof queue !== "undefined" ? queue.onIdle() : Promise.resolve();
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/manager.js








function parseCallbackConfigArg(arg) {
    if (!arg) {
        return {};
    }
    else if (Array.isArray(arg) || "name" in arg) {
        return { callbacks: arg };
    }
    else {
        return arg;
    }
}
/**
 * Manage callbacks from different components of LangChain.
 */
class BaseCallbackManager {
    setHandler(handler) {
        return this.setHandlers([handler]);
    }
}
/**
 * Base class for run manager in LangChain.
 */
class BaseRunManager {
    constructor(runId, handlers, inheritableHandlers, tags, inheritableTags, metadata, inheritableMetadata, _parentRunId) {
        Object.defineProperty(this, "runId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: runId
        });
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: handlers
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableHandlers
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tags
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableTags
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: metadata
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: inheritableMetadata
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _parentRunId
        });
    }
    async handleText(text) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            try {
                await handler.handleText?.(text, this.runId, this._parentRunId, this.tags);
            }
            catch (err) {
                console.error(`Error in handler ${handler.constructor.name}, handleText: ${err}`);
            }
        }, handler.awaitHandlers)));
    }
}
/**
 * Manages callbacks for retriever runs.
 */
class CallbackManagerForRetrieverRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleRetrieverEnd(documents) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
                try {
                    await handler.handleRetrieverEnd?.(documents, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetriever`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleRetrieverError(err) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
                try {
                    await handler.handleRetrieverError?.(err, this.runId, this._parentRunId, this.tags);
                }
                catch (error) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetrieverError: ${error}`);
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForLLMRun extends BaseRunManager {
    async handleLLMNewToken(token, idx, _runId, _parentRunId, _tags, fields) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMNewToken?.(token, idx ?? { prompt: 0, completion: 0 }, this.runId, this._parentRunId, this.tags, fields);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMNewToken: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleLLMError(err) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMError?.(err, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMError: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleLLMEnd(output) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreLLM) {
                try {
                    await handler.handleLLMEnd?.(output, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleLLMEnd: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForChainRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleChainError(err, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
                try {
                    await handler.handleChainError?.(err, this.runId, this._parentRunId, this.tags, kwargs);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainError: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleChainEnd(output, _runId, _parentRunId, _tags, kwargs) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
                try {
                    await handler.handleChainEnd?.(output, this.runId, this._parentRunId, this.tags, kwargs);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainEnd: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleAgentAction(action) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleAgentAction?.(action, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentAction: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleAgentEnd(action) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleAgentEnd?.(action, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleAgentEnd: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManagerForToolRun extends BaseRunManager {
    getChild(tag) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const manager = new CallbackManager(this.runId);
        manager.setHandlers(this.inheritableHandlers);
        manager.addTags(this.inheritableTags);
        manager.addMetadata(this.inheritableMetadata);
        if (tag) {
            manager.addTags([tag], false);
        }
        return manager;
    }
    async handleToolError(err) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleToolError?.(err, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolError: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
    async handleToolEnd(output) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleToolEnd?.(output, this.runId, this._parentRunId, this.tags);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolEnd: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
    }
}
class CallbackManager extends BaseCallbackManager {
    constructor(parentRunId) {
        super();
        Object.defineProperty(this, "handlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inheritableHandlers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "inheritableTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "inheritableMetadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "callback_manager"
        });
        Object.defineProperty(this, "_parentRunId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.handlers = [];
        this.inheritableHandlers = [];
        this._parentRunId = parentRunId;
    }
    async handleLLMStart(llm, prompts, _runId = undefined, _parentRunId = undefined, extraParams = undefined) {
        return Promise.all(prompts.map(async (prompt) => {
            const runId = (0,wrapper.v4)();
            await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
                if (!handler.ignoreLLM) {
                    try {
                        await handler.handleLLMStart?.(llm, [prompt], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                    }
                    catch (err) {
                        console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                    }
                }
            }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChatModelStart(llm, messages, _runId = undefined, _parentRunId = undefined, extraParams = undefined) {
        return Promise.all(messages.map(async (messageGroup) => {
            const runId = (0,wrapper.v4)();
            await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
                if (!handler.ignoreLLM) {
                    try {
                        if (handler.handleChatModelStart)
                            await handler.handleChatModelStart?.(llm, [messageGroup], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                        else if (handler.handleLLMStart) {
                            const messageString = (0,memory_base/* getBufferString */.zs)(messageGroup);
                            await handler.handleLLMStart?.(llm, [messageString], runId, this._parentRunId, extraParams, this.tags, this.metadata);
                        }
                    }
                    catch (err) {
                        console.error(`Error in handler ${handler.constructor.name}, handleLLMStart: ${err}`);
                    }
                }
            }, handler.awaitHandlers)));
            return new CallbackManagerForLLMRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
        }));
    }
    async handleChainStart(chain, inputs, runId = (0,wrapper.v4)(), runType = undefined) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreChain) {
                try {
                    await handler.handleChainStart?.(chain, inputs, runId, this._parentRunId, this.tags, this.metadata, runType);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleChainStart: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
        return new CallbackManagerForChainRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleToolStart(tool, input, runId = (0,wrapper.v4)()) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreAgent) {
                try {
                    await handler.handleToolStart?.(tool, input, runId, this._parentRunId, this.tags, this.metadata);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleToolStart: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
        return new CallbackManagerForToolRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    async handleRetrieverStart(retriever, query, runId = (0,wrapper.v4)(), _parentRunId = undefined) {
        await Promise.all(this.handlers.map((handler) => consumeCallback(async () => {
            if (!handler.ignoreRetriever) {
                try {
                    await handler.handleRetrieverStart?.(retriever, query, runId, this._parentRunId, this.tags, this.metadata);
                }
                catch (err) {
                    console.error(`Error in handler ${handler.constructor.name}, handleRetrieverStart: ${err}`);
                }
            }
        }, handler.awaitHandlers)));
        return new CallbackManagerForRetrieverRun(runId, this.handlers, this.inheritableHandlers, this.tags, this.inheritableTags, this.metadata, this.inheritableMetadata, this._parentRunId);
    }
    addHandler(handler, inherit = true) {
        this.handlers.push(handler);
        if (inherit) {
            this.inheritableHandlers.push(handler);
        }
    }
    removeHandler(handler) {
        this.handlers = this.handlers.filter((_handler) => _handler !== handler);
        this.inheritableHandlers = this.inheritableHandlers.filter((_handler) => _handler !== handler);
    }
    setHandlers(handlers, inherit = true) {
        this.handlers = [];
        this.inheritableHandlers = [];
        for (const handler of handlers) {
            this.addHandler(handler, inherit);
        }
    }
    addTags(tags, inherit = true) {
        this.removeTags(tags); // Remove duplicates
        this.tags.push(...tags);
        if (inherit) {
            this.inheritableTags.push(...tags);
        }
    }
    removeTags(tags) {
        this.tags = this.tags.filter((tag) => !tags.includes(tag));
        this.inheritableTags = this.inheritableTags.filter((tag) => !tags.includes(tag));
    }
    addMetadata(metadata, inherit = true) {
        this.metadata = { ...this.metadata, ...metadata };
        if (inherit) {
            this.inheritableMetadata = { ...this.inheritableMetadata, ...metadata };
        }
    }
    removeMetadata(metadata) {
        for (const key of Object.keys(metadata)) {
            delete this.metadata[key];
            delete this.inheritableMetadata[key];
        }
    }
    copy(additionalHandlers = [], inherit = true) {
        const manager = new CallbackManager(this._parentRunId);
        for (const handler of this.handlers) {
            const inheritable = this.inheritableHandlers.includes(handler);
            manager.addHandler(handler, inheritable);
        }
        for (const tag of this.tags) {
            const inheritable = this.inheritableTags.includes(tag);
            manager.addTags([tag], inheritable);
        }
        for (const key of Object.keys(this.metadata)) {
            const inheritable = Object.keys(this.inheritableMetadata).includes(key);
            manager.addMetadata({ [key]: this.metadata[key] }, inheritable);
        }
        for (const handler of additionalHandlers) {
            if (
            // Prevent multiple copies of console_callback_handler
            manager.handlers
                .filter((h) => h.name === "console_callback_handler")
                .some((h) => h.name === handler.name)) {
                continue;
            }
            manager.addHandler(handler, inherit);
        }
        return manager;
    }
    static fromHandlers(handlers) {
        class Handler extends base/* BaseCallbackHandler */.E {
            constructor() {
                super();
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (0,wrapper.v4)()
                });
                Object.assign(this, handlers);
            }
        }
        const manager = new this();
        manager.addHandler(new Handler());
        return manager;
    }
    static async configure(inheritableHandlers, localHandlers, inheritableTags, localTags, inheritableMetadata, localMetadata, options) {
        let callbackManager;
        if (inheritableHandlers || localHandlers) {
            if (Array.isArray(inheritableHandlers) || !inheritableHandlers) {
                callbackManager = new CallbackManager();
                callbackManager.setHandlers(inheritableHandlers?.map(ensureHandler) ?? [], true);
            }
            else {
                callbackManager = inheritableHandlers;
            }
            callbackManager = callbackManager.copy(Array.isArray(localHandlers)
                ? localHandlers.map(ensureHandler)
                : localHandlers?.handlers, false);
        }
        const verboseEnabled = (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_VERBOSE") || options?.verbose;
        const tracingV2Enabled = (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_TRACING_V2") === "true";
        const tracingEnabled = tracingV2Enabled ||
            ((0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_TRACING") ?? false);
        if (verboseEnabled || tracingEnabled) {
            if (!callbackManager) {
                callbackManager = new CallbackManager();
            }
            if (verboseEnabled &&
                !callbackManager.handlers.some((handler) => handler.name === ConsoleCallbackHandler.prototype.name)) {
                const consoleHandler = new ConsoleCallbackHandler();
                callbackManager.addHandler(consoleHandler, true);
            }
            if (tracingEnabled &&
                !callbackManager.handlers.some((handler) => handler.name === "langchain_tracer")) {
                if (tracingV2Enabled) {
                    callbackManager.addHandler(await getTracingV2CallbackHandler(), true);
                }
                else {
                    const session = (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_PROJECT") &&
                        (0,env/* getEnvironmentVariable */.lS)("LANGCHAIN_SESSION");
                    callbackManager.addHandler(await getTracingCallbackHandler(session), true);
                }
            }
        }
        if (inheritableTags || localTags) {
            if (callbackManager) {
                callbackManager.addTags(inheritableTags ?? []);
                callbackManager.addTags(localTags ?? [], false);
            }
        }
        if (inheritableMetadata || localMetadata) {
            if (callbackManager) {
                callbackManager.addMetadata(inheritableMetadata ?? {});
                callbackManager.addMetadata(localMetadata ?? {}, false);
            }
        }
        return callbackManager;
    }
}
function ensureHandler(handler) {
    if ("name" in handler) {
        return handler;
    }
    return base/* BaseCallbackHandler.fromMethods */.E.fromMethods(handler);
}
class TraceGroup {
    constructor(groupName, options) {
        Object.defineProperty(this, "groupName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: groupName
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "runManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    async getTraceGroupCallbackManager(group_name, inputs, options) {
        const cb = new LangChainTracer(options);
        const cm = await CallbackManager.configure([cb]);
        const runManager = await cm?.handleChainStart({
            lc: 1,
            type: "not_implemented",
            id: ["langchain", "callbacks", "groups", group_name],
        }, inputs ?? {});
        if (!runManager) {
            throw new Error("Failed to create run group callback manager.");
        }
        return runManager;
    }
    async start(inputs) {
        if (!this.runManager) {
            this.runManager = await this.getTraceGroupCallbackManager(this.groupName, inputs, this.options);
        }
        return this.runManager.getChild();
    }
    async error(err) {
        if (this.runManager) {
            await this.runManager.handleChainError(err);
            this.runManager = undefined;
        }
    }
    async end(output) {
        if (this.runManager) {
            await this.runManager.handleChainEnd(output ?? {});
            this.runManager = undefined;
        }
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function traceAsGroup(groupOptions, enclosedCode, ...args) {
    const traceGroup = new TraceGroup(groupOptions.name, groupOptions);
    const callbackManager = await traceGroup.start({ ...args });
    try {
        const result = await enclosedCode(callbackManager, ...args);
        await traceGroup.end(_coerceToDict(result, "output"));
        return result;
    }
    catch (err) {
        await traceGroup.error(err);
        throw err;
    }
}


/***/ }),

/***/ 4432:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "i": () => (/* binding */ Serializable),
  "j": () => (/* binding */ get_lc_unique_name)
});

// EXTERNAL MODULE: ./node_modules/decamelize/index.js
var decamelize = __webpack_require__(159);
// EXTERNAL MODULE: ./node_modules/langchain/node_modules/camelcase/index.js
var camelcase = __webpack_require__(996);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/load/map_keys.js


function keyToJson(key, map) {
    return map?.[key] || decamelize(key);
}
function keyFromJson(key, map) {
    return map?.[key] || camelCase(key);
}
function mapKeys(fields, mapper, map) {
    const mapped = {};
    for (const key in fields) {
        if (Object.hasOwn(fields, key)) {
            mapped[mapper(key, map)] = fields[key];
        }
    }
    return mapped;
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/load/serializable.js

function shallowCopy(obj) {
    return Array.isArray(obj) ? [...obj] : { ...obj };
}
function replaceSecrets(root, secretsMap) {
    const result = shallowCopy(root);
    for (const [path, secretId] of Object.entries(secretsMap)) {
        const [last, ...partsReverse] = path.split(".").reverse();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current = result;
        for (const part of partsReverse.reverse()) {
            if (current[part] === undefined) {
                break;
            }
            current[part] = shallowCopy(current[part]);
            current = current[part];
        }
        if (current[last] !== undefined) {
            current[last] = {
                lc: 1,
                type: "secret",
                id: [secretId],
            };
        }
    }
    return result;
}
/**
 * Get a unique name for the module, rather than parent class implementations.
 * Should not be subclassed, subclass lc_name above instead.
 */
function get_lc_unique_name(
// eslint-disable-next-line @typescript-eslint/no-use-before-define
serializableClass) {
    // "super" here would refer to the parent class of Serializable,
    // when we want the parent class of the module actually calling this method.
    const parentClass = Object.getPrototypeOf(serializableClass);
    const lcNameIsSubclassed = typeof serializableClass.lc_name === "function" &&
        (typeof parentClass.lc_name !== "function" ||
            serializableClass.lc_name() !== parentClass.lc_name());
    if (lcNameIsSubclassed) {
        return serializableClass.lc_name();
    }
    else {
        return serializableClass.name;
    }
}
class Serializable {
    /**
     * The name of the serializable. Override to provide an alias or
     * to preserve the serialized module name in minified environments.
     *
     * Implemented as a static method to support loading logic.
     */
    static lc_name() {
        return this.name;
    }
    /**
     * The final serialized identifier for the module.
     */
    get lc_id() {
        return [
            ...this.lc_namespace,
            get_lc_unique_name(this.constructor),
        ];
    }
    /**
     * A map of secrets, which will be omitted from serialization.
     * Keys are paths to the secret in constructor args, e.g. "foo.bar.baz".
     * Values are the secret ids, which will be used when deserializing.
     */
    get lc_secrets() {
        return undefined;
    }
    /**
     * A map of additional attributes to merge with constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the attribute values, which will be serialized.
     * These attributes need to be accepted by the constructor as arguments.
     */
    get lc_attributes() {
        return undefined;
    }
    /**
     * A map of aliases for constructor args.
     * Keys are the attribute names, e.g. "foo".
     * Values are the alias that will replace the key in serialization.
     * This is used to eg. make argument names match Python.
     */
    get lc_aliases() {
        return undefined;
    }
    constructor(kwargs, ..._args) {
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lc_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.lc_kwargs = kwargs || {};
    }
    toJSON() {
        if (!this.lc_serializable) {
            return this.toJSONNotImplemented();
        }
        if (
        // eslint-disable-next-line no-instanceof/no-instanceof
        this.lc_kwargs instanceof Serializable ||
            typeof this.lc_kwargs !== "object" ||
            Array.isArray(this.lc_kwargs)) {
            // We do not support serialization of classes with arg not a POJO
            // I'm aware the check above isn't as strict as it could be
            return this.toJSONNotImplemented();
        }
        const aliases = {};
        const secrets = {};
        const kwargs = Object.keys(this.lc_kwargs).reduce((acc, key) => {
            acc[key] = key in this ? this[key] : this.lc_kwargs[key];
            return acc;
        }, {});
        // get secrets, attributes and aliases from all superclasses
        for (
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let current = Object.getPrototypeOf(this); current; current = Object.getPrototypeOf(current)) {
            Object.assign(aliases, Reflect.get(current, "lc_aliases", this));
            Object.assign(secrets, Reflect.get(current, "lc_secrets", this));
            Object.assign(kwargs, Reflect.get(current, "lc_attributes", this));
        }
        // include all secrets used, even if not in kwargs,
        // will be replaced with sentinel value in replaceSecrets
        Object.keys(secrets).forEach((keyPath) => {
            // eslint-disable-next-line @typescript-eslint/no-this-alias, @typescript-eslint/no-explicit-any
            let read = this;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let write = kwargs;
            const [last, ...partsReverse] = keyPath.split(".").reverse();
            for (const key of partsReverse.reverse()) {
                if (!(key in read) || read[key] === undefined)
                    return;
                if (!(key in write) || write[key] === undefined) {
                    if (typeof read[key] === "object" && read[key] != null) {
                        write[key] = {};
                    }
                    else if (Array.isArray(read[key])) {
                        write[key] = [];
                    }
                }
                read = read[key];
                write = write[key];
            }
            if (last in read && read[last] !== undefined) {
                write[last] = write[last] || read[last];
            }
        });
        return {
            lc: 1,
            type: "constructor",
            id: this.lc_id,
            kwargs: mapKeys(Object.keys(secrets).length ? replaceSecrets(kwargs, secrets) : kwargs, keyToJson, aliases),
        };
    }
    toJSONNotImplemented() {
        return {
            lc: 1,
            type: "not_implemented",
            id: this.lc_id,
        };
    }
}


/***/ }),

/***/ 790:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zs": () => (/* binding */ getBufferString)
/* harmony export */ });
/* unused harmony exports BaseMemory, getInputValue, getOutputValue, getPromptInputKey */
/**
 * Abstract base class for memory in LangChain's Chains. Memory refers to
 * the state in Chains. It can be used to store information about past
 * executions of a Chain and inject that information into the inputs of
 * future executions of the Chain.
 */
class BaseMemory {
}
const getValue = (values, key) => {
    if (key !== undefined) {
        return values[key];
    }
    const keys = Object.keys(values);
    if (keys.length === 1) {
        return values[keys[0]];
    }
};
/**
 * This function is used by memory classes to select the input value
 * to use for the memory. If there is only one input value, it is used.
 * If there are multiple input values, the inputKey must be specified.
 */
const getInputValue = (inputValues, inputKey) => {
    const value = getValue(inputValues, inputKey);
    if (!value) {
        const keys = Object.keys(inputValues);
        throw new Error(`input values have ${keys.length} keys, you must specify an input key or pass only 1 key as input`);
    }
    return value;
};
/**
 * This function is used by memory classes to select the output value
 * to use for the memory. If there is only one output value, it is used.
 * If there are multiple output values, the outputKey must be specified.
 * If no outputKey is specified, an error is thrown.
 */
const getOutputValue = (outputValues, outputKey) => {
    const value = getValue(outputValues, outputKey);
    if (!value) {
        const keys = Object.keys(outputValues);
        throw new Error(`output values have ${keys.length} keys, you must specify an output key or pass only 1 key as output`);
    }
    return value;
};
/**
 * This function is used by memory classes to get a string representation
 * of the chat message history, based on the message content and role.
 */
function getBufferString(messages, humanPrefix = "Human", aiPrefix = "AI") {
    const string_messages = [];
    for (const m of messages) {
        let role;
        if (m._getType() === "human") {
            role = humanPrefix;
        }
        else if (m._getType() === "ai") {
            role = aiPrefix;
        }
        else if (m._getType() === "system") {
            role = "System";
        }
        else if (m._getType() === "function") {
            role = "Function";
        }
        else if (m._getType() === "generic") {
            role = m.role;
        }
        else {
            throw new Error(`Got unsupported message type: ${m}`);
        }
        const nameStr = m.name ? `${m.name}, ` : "";
        string_messages.push(`${role}: ${nameStr}${m.content}`);
    }
    return string_messages.join("\n");
}
/**
 * Function used by memory classes to get the key of the prompt input,
 * excluding any keys that are memory variables or the "stop" key. If
 * there is not exactly one prompt input key, an error is thrown.
 */
function getPromptInputKey(inputs, memoryVariables) {
    const promptInputKeys = Object.keys(inputs).filter((key) => !memoryVariables.includes(key) && key !== "stop");
    if (promptInputKeys.length !== 1) {
        throw new Error(`One input key expected, but got ${promptInputKeys.length}`);
    }
    return promptInputKeys[0];
}


/***/ }),

/***/ 5411:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Al": () => (/* binding */ BaseStringPromptTemplate),
/* harmony export */   "dy": () => (/* binding */ BasePromptTemplate),
/* harmony export */   "nw": () => (/* binding */ StringPromptValue)
/* harmony export */ });
/* unused harmony export BaseExampleSelector */
/* harmony import */ var _schema_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8102);
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4432);
/* harmony import */ var _schema_runnable_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1972);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.



/**
 * Represents a prompt value as a string. It extends the BasePromptValue
 * class and overrides the toString and toChatMessages methods.
 */
class StringPromptValue extends _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .BasePromptValue */ .MJ {
    constructor(value) {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", "base"]
        });
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
    toString() {
        return this.value;
    }
    toChatMessages() {
        return [new _schema_index_js__WEBPACK_IMPORTED_MODULE_0__/* .HumanMessage */ .xk(this.value)];
    }
}
/**
 * Base class for prompt templates. Exposes a format method that returns a
 * string prompt given a set of input values.
 */
class BasePromptTemplate extends _schema_runnable_index_js__WEBPACK_IMPORTED_MODULE_2__/* .Runnable */ .eq {
    get lc_attributes() {
        return {
            partialVariables: undefined, // python doesn't support this yet
        };
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", this._getPromptType()]
        });
        Object.defineProperty(this, "inputVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "partialVariables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { inputVariables } = input;
        if (inputVariables.includes("stop")) {
            throw new Error("Cannot have an input variable named 'stop', as it is used internally, please rename.");
        }
        Object.assign(this, input);
    }
    /**
     * Merges partial variables and user variables.
     * @param userVariables The user variables to merge with the partial variables.
     * @returns A Promise that resolves to an object containing the merged variables.
     */
    async mergePartialAndUserVariables(userVariables) {
        const partialVariables = this.partialVariables ?? {};
        const partialValues = {};
        for (const [key, value] of Object.entries(partialVariables)) {
            if (typeof value === "string") {
                partialValues[key] = value;
            }
            else {
                partialValues[key] = await value();
            }
        }
        const allKwargs = {
            ...partialValues,
            ...userVariables,
        };
        return allKwargs;
    }
    /**
     * Invokes the prompt template with the given input and options.
     * @param input The input to invoke the prompt template with.
     * @param options Optional configuration for the callback.
     * @returns A Promise that resolves to the output of the prompt template.
     */
    async invoke(input, options) {
        return this._callWithConfig((input) => this.formatPromptValue(input), input, { ...options, runType: "prompt" });
    }
    /**
     * Return a json-like object representing this prompt template.
     * @deprecated
     */
    serialize() {
        throw new Error("Use .toJSON() instead");
    }
    /**
     * @deprecated
     * Load a prompt template from a json-like object describing it.
     *
     * @remarks
     * Deserializing needs to be async because templates (e.g. {@link FewShotPromptTemplate}) can
     * reference remote resources that we read asynchronously with a web
     * request.
     */
    static async deserialize(data) {
        switch (data._type) {
            case "prompt": {
                const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4095));
                return PromptTemplate.deserialize(data);
            }
            case undefined: {
                const { PromptTemplate } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 4095));
                return PromptTemplate.deserialize({ ...data, _type: "prompt" });
            }
            case "few_shot": {
                const { FewShotPromptTemplate } = await __webpack_require__.e(/* import() */ 806).then(__webpack_require__.bind(__webpack_require__, 609));
                return FewShotPromptTemplate.deserialize(data);
            }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}
/**
 * Base class for string prompt templates. It extends the
 * BasePromptTemplate class and overrides the formatPromptValue method to
 * return a StringPromptValue.
 */
class BaseStringPromptTemplate extends BasePromptTemplate {
    /**
     * Formats the prompt given the input values and returns a formatted
     * prompt value.
     * @param values The input values to format the prompt.
     * @returns A Promise that resolves to a formatted prompt value.
     */
    async formatPromptValue(values) {
        const formattedPrompt = await this.format(values);
        return new StringPromptValue(formattedPrompt);
    }
}
/**
 * Base class for example selectors.
 */
class BaseExampleSelector extends (/* unused pure expression or super */ null && (Serializable)) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "prompts", "selectors"]
        });
    }
}


/***/ }),

/***/ 4095:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PromptTemplate": () => (/* binding */ PromptTemplate)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5411);
/* harmony import */ var _template_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(837);
// Default generic "any" values are for backwards compatibility.
// Replace with "string" when we are comfortable with a breaking change.


/**
 * Schema to represent a basic prompt for an LLM.
 * @augments BasePromptTemplate
 * @augments PromptTemplateInput
 *
 * @example
 * ```ts
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = new PromptTemplate({
 *   inputVariables: ["foo"],
 *   template: "Say {foo}",
 * });
 * ```
 */
class PromptTemplate extends _base_js__WEBPACK_IMPORTED_MODULE_0__/* .BaseStringPromptTemplate */ .Al {
    static lc_name() {
        return "PromptTemplate";
    }
    constructor(input) {
        super(input);
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "templateFormat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "f-string"
        });
        Object.defineProperty(this, "validateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.assign(this, input);
        if (this.validateTemplate) {
            let totalInputVariables = this.inputVariables;
            if (this.partialVariables) {
                totalInputVariables = totalInputVariables.concat(Object.keys(this.partialVariables));
            }
            (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .checkValidTemplate */ .af)(this.template, this.templateFormat, totalInputVariables);
        }
    }
    _getPromptType() {
        return "prompt";
    }
    /**
     * Formats the prompt template with the provided values.
     * @param values The values to be used to format the prompt template.
     * @returns A promise that resolves to a string which is the formatted prompt.
     */
    async format(values) {
        const allValues = await this.mergePartialAndUserVariables(values);
        return (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .renderTemplate */ .SM)(this.template, this.templateFormat, allValues);
    }
    /**
     * Take examples in list format with prefix and suffix to create a prompt.
     *
     * Intended to be used a a way to dynamically create a prompt from examples.
     *
     * @param examples - List of examples to use in the prompt.
     * @param suffix - String to go after the list of examples. Should generally set up the user's input.
     * @param inputVariables - A list of variable names the final prompt template will expect
     * @param exampleSeparator - The separator to use in between examples
     * @param prefix - String that should go before any examples. Generally includes examples.
     *
     * @returns The final prompt template generated.
     */
    static fromExamples(examples, suffix, inputVariables, exampleSeparator = "\n\n", prefix = "") {
        const template = [prefix, ...examples, suffix].join(exampleSeparator);
        return new PromptTemplate({
            inputVariables,
            template,
        });
    }
    /**
     * Load prompt template from a template f-string
     */
    static fromTemplate(template, { templateFormat = "f-string", ...rest } = {}) {
        if (templateFormat === "jinja2") {
            throw new Error("jinja2 templates are not currently supported.");
        }
        const names = new Set();
        (0,_template_js__WEBPACK_IMPORTED_MODULE_1__/* .parseTemplate */ .$M)(template, templateFormat).forEach((node) => {
            if (node.type === "variable") {
                names.add(node.name);
            }
        });
        return new PromptTemplate({
            // Rely on extracted types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            inputVariables: [...names],
            templateFormat,
            template,
            ...rest,
        });
    }
    /**
     * Partially applies values to the prompt template.
     * @param values The values to be partially applied to the prompt template.
     * @returns A new instance of PromptTemplate with the partially applied values.
     */
    async partial(values) {
        const newInputVariables = this.inputVariables.filter((iv) => !(iv in values));
        const newPartialVariables = {
            ...(this.partialVariables ?? {}),
            ...values,
        };
        const promptDict = {
            ...this,
            inputVariables: newInputVariables,
            partialVariables: newPartialVariables,
        };
        return new PromptTemplate(promptDict);
    }
    serialize() {
        if (this.outputParser !== undefined) {
            throw new Error("Cannot serialize a prompt template with an output parser");
        }
        return {
            _type: this._getPromptType(),
            input_variables: this.inputVariables,
            template: this.template,
            template_format: this.templateFormat,
        };
    }
    static async deserialize(data) {
        if (!data.template) {
            throw new Error("Prompt template must have a template");
        }
        const res = new PromptTemplate({
            inputVariables: data.input_variables,
            template: data.template,
            templateFormat: data.template_format,
        });
        return res;
    }
}


/***/ }),

/***/ 837:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$M": () => (/* binding */ parseTemplate),
/* harmony export */   "SM": () => (/* binding */ renderTemplate),
/* harmony export */   "af": () => (/* binding */ checkValidTemplate)
/* harmony export */ });
/* unused harmony exports parseFString, interpolateFString, DEFAULT_FORMATTER_MAPPING, DEFAULT_PARSER_MAPPING */
const parseFString = (template) => {
    // Core logic replicated from internals of pythons built in Formatter class.
    // https://github.com/python/cpython/blob/135ec7cefbaffd516b77362ad2b2ad1025af462e/Objects/stringlib/unicode_format.h#L700-L706
    const chars = template.split("");
    const nodes = [];
    const nextBracket = (bracket, start) => {
        for (let i = start; i < chars.length; i += 1) {
            if (bracket.includes(chars[i])) {
                return i;
            }
        }
        return -1;
    };
    let i = 0;
    while (i < chars.length) {
        if (chars[i] === "{" && i + 1 < chars.length && chars[i + 1] === "{") {
            nodes.push({ type: "literal", text: "{" });
            i += 2;
        }
        else if (chars[i] === "}" &&
            i + 1 < chars.length &&
            chars[i + 1] === "}") {
            nodes.push({ type: "literal", text: "}" });
            i += 2;
        }
        else if (chars[i] === "{") {
            const j = nextBracket("}", i);
            if (j < 0) {
                throw new Error("Unclosed '{' in template.");
            }
            nodes.push({
                type: "variable",
                name: chars.slice(i + 1, j).join(""),
            });
            i = j + 1;
        }
        else if (chars[i] === "}") {
            throw new Error("Single '}' in template.");
        }
        else {
            const next = nextBracket("{}", i);
            const text = (next < 0 ? chars.slice(i) : chars.slice(i, next)).join("");
            nodes.push({ type: "literal", text });
            i = next < 0 ? chars.length : next;
        }
    }
    return nodes;
};
const interpolateFString = (template, values) => parseFString(template).reduce((res, node) => {
    if (node.type === "variable") {
        if (node.name in values) {
            return res + values[node.name];
        }
        throw new Error(`Missing value for input ${node.name}`);
    }
    return res + node.text;
}, "");
const DEFAULT_FORMATTER_MAPPING = {
    "f-string": interpolateFString,
    jinja2: (_, __) => "",
};
const DEFAULT_PARSER_MAPPING = {
    "f-string": parseFString,
    jinja2: (_) => [],
};
const renderTemplate = (template, templateFormat, inputValues) => DEFAULT_FORMATTER_MAPPING[templateFormat](template, inputValues);
const parseTemplate = (template, templateFormat) => DEFAULT_PARSER_MAPPING[templateFormat](template);
const checkValidTemplate = (template, templateFormat, inputVariables) => {
    if (!(templateFormat in DEFAULT_FORMATTER_MAPPING)) {
        const validFormats = Object.keys(DEFAULT_FORMATTER_MAPPING);
        throw new Error(`Invalid template format. Got \`${templateFormat}\`;
                         should be one of ${validFormats}`);
    }
    try {
        const dummyInputs = inputVariables.reduce((acc, v) => {
            acc[v] = "foo";
            return acc;
        }, {});
        renderTemplate(template, templateFormat, dummyInputs);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (e) {
        throw new Error(`Invalid prompt schema: ${e.message}`);
    }
};


/***/ }),

/***/ 8102:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cr": () => (/* binding */ FunctionMessageChunk),
/* harmony export */   "E1": () => (/* binding */ coerceMessageLikeToMessage),
/* harmony export */   "GC": () => (/* binding */ AIMessageChunk),
/* harmony export */   "H2": () => (/* binding */ BaseCache),
/* harmony export */   "HD": () => (/* binding */ ChatMessageChunk),
/* harmony export */   "J": () => (/* binding */ ChatMessage),
/* harmony export */   "Ls": () => (/* binding */ ChatGenerationChunk),
/* harmony export */   "MJ": () => (/* binding */ BasePromptValue),
/* harmony export */   "QW": () => (/* binding */ isBaseMessage),
/* harmony export */   "WH": () => (/* binding */ RUN_KEY),
/* harmony export */   "b6": () => (/* binding */ GenerationChunk),
/* harmony export */   "gY": () => (/* binding */ AIMessage),
/* harmony export */   "jN": () => (/* binding */ SystemMessage),
/* harmony export */   "ku": () => (/* binding */ BaseMessage),
/* harmony export */   "ro": () => (/* binding */ HumanMessageChunk),
/* harmony export */   "xk": () => (/* binding */ HumanMessage),
/* harmony export */   "xq": () => (/* binding */ SystemMessageChunk)
/* harmony export */ });
/* unused harmony exports BaseMessageChunk, BaseChatMessage, HumanChatMessage, AIChatMessage, SystemChatMessage, FunctionMessage, mapStoredMessageToChatMessage, BaseChatMessageHistory, BaseListChatMessageHistory, BaseFileStore, BaseEntityStore, Docstore */
/* harmony import */ var _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4432);

const RUN_KEY = "__run";
/**
 * Chunk of a single generation. Used for streaming.
 */
class GenerationChunk {
    constructor(fields) {
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "generationInfo", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = fields.text;
        this.generationInfo = fields.generationInfo;
    }
    concat(chunk) {
        return new GenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
        });
    }
}
/**
 * Base class for all types of messages in a conversation. It includes
 * properties like `content`, `name`, and `additional_kwargs`. It also
 * includes methods like `toDict()` and `_getType()`.
 */
class BaseMessage extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .i {
    /**
     * @deprecated
     * Use {@link BaseMessage.content} instead.
     */
    get text() {
        return this.content;
    }
    constructor(fields, 
    /** @deprecated */
    kwargs) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign
            fields = { content: fields, additional_kwargs: kwargs };
        }
        // Make sure the default value for additional_kwargs is passed into super() for serialization
        if (!fields.additional_kwargs) {
            // eslint-disable-next-line no-param-reassign
            fields.additional_kwargs = {};
        }
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        /** The text of the message. */
        Object.defineProperty(this, "content", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** Additional keyword arguments */
        Object.defineProperty(this, "additional_kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.content = fields.content;
        this.additional_kwargs = fields.additional_kwargs;
    }
    toDict() {
        return {
            type: this._getType(),
            data: this.toJSON()
                .kwargs,
        };
    }
}
/**
 * Represents a chunk of a message, which can be concatenated with other
 * message chunks. It includes a method `_merge_kwargs_dict()` for merging
 * additional keyword arguments from another `BaseMessageChunk` into this
 * one. It also overrides the `__add__()` method to support concatenation
 * of `BaseMessageChunk` instances.
 */
class BaseMessageChunk extends BaseMessage {
    static _mergeAdditionalKwargs(left, right) {
        const merged = { ...left };
        for (const [key, value] of Object.entries(right)) {
            if (merged[key] === undefined) {
                merged[key] = value;
            }
            else if (typeof merged[key] !== typeof value) {
                throw new Error(`additional_kwargs[${key}] already exists in the message chunk, but with a different type.`);
            }
            else if (typeof merged[key] === "string") {
                merged[key] = merged[key] + value;
            }
            else if (!Array.isArray(merged[key]) &&
                typeof merged[key] === "object") {
                merged[key] = this._mergeAdditionalKwargs(merged[key], value);
            }
            else {
                throw new Error(`additional_kwargs[${key}] already exists in this message chunk.`);
            }
        }
        return merged;
    }
}
/**
 * Represents a human message in a conversation.
 */
class HumanMessage extends BaseMessage {
    static lc_name() {
        return "HumanMessage";
    }
    _getType() {
        return "human";
    }
}
/**
 * Represents a chunk of a human message, which can be concatenated with
 * other human message chunks.
 */
class HumanMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "HumanMessageChunk";
    }
    _getType() {
        return "human";
    }
    concat(chunk) {
        return new HumanMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: HumanMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * Represents an AI message in a conversation.
 */
class AIMessage extends BaseMessage {
    static lc_name() {
        return "AIMessage";
    }
    _getType() {
        return "ai";
    }
}
/**
 * Represents a chunk of an AI message, which can be concatenated with
 * other AI message chunks.
 */
class AIMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "AIMessageChunk";
    }
    _getType() {
        return "ai";
    }
    concat(chunk) {
        return new AIMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: AIMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * Represents a system message in a conversation.
 */
class SystemMessage extends BaseMessage {
    static lc_name() {
        return "SystemMessage";
    }
    _getType() {
        return "system";
    }
}
/**
 * Represents a chunk of a system message, which can be concatenated with
 * other system message chunks.
 */
class SystemMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "SystemMessageChunk";
    }
    _getType() {
        return "system";
    }
    concat(chunk) {
        return new SystemMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: SystemMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
        });
    }
}
/**
 * @deprecated
 * Use {@link BaseMessage} instead.
 */
const BaseChatMessage = (/* unused pure expression or super */ null && (BaseMessage));
/**
 * @deprecated
 * Use {@link HumanMessage} instead.
 */
const HumanChatMessage = (/* unused pure expression or super */ null && (HumanMessage));
/**
 * @deprecated
 * Use {@link AIMessage} instead.
 */
const AIChatMessage = (/* unused pure expression or super */ null && (AIMessage));
/**
 * @deprecated
 * Use {@link SystemMessage} instead.
 */
const SystemChatMessage = (/* unused pure expression or super */ null && (SystemMessage));
/**
 * Represents a function message in a conversation.
 */
class FunctionMessage extends (/* unused pure expression or super */ null && (BaseMessage)) {
    static lc_name() {
        return "FunctionMessage";
    }
    constructor(fields, 
    /** @deprecated */
    name) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, name: name };
        }
        super(fields);
    }
    _getType() {
        return "function";
    }
}
/**
 * Represents a chunk of a function message, which can be concatenated
 * with other function message chunks.
 */
class FunctionMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "FunctionMessageChunk";
    }
    _getType() {
        return "function";
    }
    concat(chunk) {
        return new FunctionMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: FunctionMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            name: this.name ?? "",
        });
    }
}
/**
 * Represents a chat message in a conversation.
 */
class ChatMessage extends BaseMessage {
    static lc_name() {
        return "ChatMessage";
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    static isInstance(message) {
        return message._getType() === "generic";
    }
}
function isBaseMessage(messageLike) {
    return typeof messageLike._getType === "function";
}
function coerceMessageLikeToMessage(messageLike) {
    if (typeof messageLike === "string") {
        return new HumanMessage(messageLike);
    }
    else if (isBaseMessage(messageLike)) {
        return messageLike;
    }
    const [type, content] = messageLike;
    if (type === "human" || type === "user") {
        return new HumanMessage({ content });
    }
    else if (type === "ai" || type === "assistant") {
        return new AIMessage({ content });
    }
    else if (type === "system") {
        return new SystemMessage({ content });
    }
    else {
        throw new Error(`Unable to coerce message from array: only human, AI, or system message coercion is currently supported.`);
    }
}
/**
 * Represents a chunk of a chat message, which can be concatenated with
 * other chat message chunks.
 */
class ChatMessageChunk extends BaseMessageChunk {
    static lc_name() {
        return "ChatMessageChunk";
    }
    constructor(fields, role) {
        if (typeof fields === "string") {
            // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-non-null-assertion
            fields = { content: fields, role: role };
        }
        super(fields);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = fields.role;
    }
    _getType() {
        return "generic";
    }
    concat(chunk) {
        return new ChatMessageChunk({
            content: this.content + chunk.content,
            additional_kwargs: ChatMessageChunk._mergeAdditionalKwargs(this.additional_kwargs, chunk.additional_kwargs),
            role: this.role,
        });
    }
}
class ChatGenerationChunk extends GenerationChunk {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.message = fields.message;
    }
    concat(chunk) {
        return new ChatGenerationChunk({
            text: this.text + chunk.text,
            generationInfo: {
                ...this.generationInfo,
                ...chunk.generationInfo,
            },
            message: this.message.concat(chunk.message),
        });
    }
}
/**
 * Maps messages from an older format (V1) to the current `StoredMessage`
 * format. If the message is already in the `StoredMessage` format, it is
 * returned as is. Otherwise, it transforms the V1 message into a
 * `StoredMessage`. This function is important for maintaining
 * compatibility with older message formats.
 */
function mapV1MessageToStoredMessage(message) {
    // TODO: Remove this mapper when we deprecate the old message format.
    if (message.data !== undefined) {
        return message;
    }
    else {
        const v1Message = message;
        return {
            type: v1Message.type,
            data: {
                content: v1Message.text,
                role: v1Message.role,
                name: undefined,
            },
        };
    }
}
function mapStoredMessageToChatMessage(message) {
    const storedMessage = mapV1MessageToStoredMessage(message);
    switch (storedMessage.type) {
        case "human":
            return new HumanMessage(storedMessage.data);
        case "ai":
            return new AIMessage(storedMessage.data);
        case "system":
            return new SystemMessage(storedMessage.data);
        case "function":
            if (storedMessage.data.name === undefined) {
                throw new Error("Name must be defined for function messages");
            }
            return new FunctionMessage(storedMessage.data);
        case "chat": {
            if (storedMessage.data.role === undefined) {
                throw new Error("Role must be defined for chat messages");
            }
            return new ChatMessage(storedMessage.data);
        }
        default:
            throw new Error(`Got unexpected type: ${storedMessage.type}`);
    }
}
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
class BasePromptValue extends _load_serializable_js__WEBPACK_IMPORTED_MODULE_0__/* .Serializable */ .i {
}
/**
 * Base class for all chat message histories. All chat message histories
 * should extend this class.
 */
class BaseChatMessageHistory extends (/* unused pure expression or super */ null && (Serializable)) {
}
/**
 * Base class for all list chat message histories. All list chat message
 * histories should extend this class.
 */
class BaseListChatMessageHistory extends (/* unused pure expression or super */ null && (Serializable)) {
    addUserMessage(message) {
        return this.addMessage(new HumanMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIMessage(message));
    }
}
/**
 * Base class for all caches. All caches should extend this class.
 */
class BaseCache {
}
/**
 * Base class for all file stores. All file stores should extend this
 * class.
 */
class BaseFileStore extends (/* unused pure expression or super */ null && (Serializable)) {
}
/**
 * Base class for all entity stores. All entity stores should extend this
 * class.
 */
class BaseEntityStore extends (/* unused pure expression or super */ null && (Serializable)) {
}
/**
 * Abstract class for a document store. All document stores should extend
 * this class.
 */
class Docstore {
}


/***/ }),

/***/ 1972:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "eq": () => (/* reexport */ base_Runnable)
});

// UNUSED EXPORTS: RouterRunnable, RunnableBinding, RunnableBranch, RunnableEach, RunnableLambda, RunnableMap, RunnablePassthrough, RunnableRetry, RunnableSequence, RunnableWithFallbacks

// NAMESPACE OBJECT: ./node_modules/langchain/dist/util/fast-json-patch/src/core.js
var core_namespaceObject = {};
__webpack_require__.r(core_namespaceObject);
__webpack_require__.d(core_namespaceObject, {
  "JsonPatchError": () => (JsonPatchError),
  "_areEquals": () => (_areEquals),
  "applyOperation": () => (applyOperation),
  "applyPatch": () => (applyPatch),
  "applyReducer": () => (applyReducer),
  "deepClone": () => (deepClone),
  "getValueByPointer": () => (getValueByPointer),
  "validate": () => (validate),
  "validator": () => (validator)
});

// EXTERNAL MODULE: ./node_modules/p-retry/index.js
var p_retry = __webpack_require__(2548);
// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/manager.js + 13 modules
var manager = __webpack_require__(6009);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/util/fast-json-patch/src/helpers.js
// @ts-nocheck
// Inlined because of ESM import issues
/*!
 * https://github.com/Starcounter-Jack/JSON-Patch
 * (c) 2017-2022 Joachim Wester
 * MIT licensed
 */
const _hasOwnProperty = Object.prototype.hasOwnProperty;
function helpers_hasOwnProperty(obj, key) {
    return _hasOwnProperty.call(obj, key);
}
function _objectKeys(obj) {
    if (Array.isArray(obj)) {
        const keys = new Array(obj.length);
        for (let k = 0; k < keys.length; k++) {
            keys[k] = "" + k;
        }
        return keys;
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    let keys = [];
    for (let i in obj) {
        if (helpers_hasOwnProperty(obj, i)) {
            keys.push(i);
        }
    }
    return keys;
}
/**
 * Deeply clone the object.
 * https://jsperf.com/deep-copy-vs-json-stringify-json-parse/25 (recursiveDeepCopy)
 * @param  {any} obj value to clone
 * @return {any} cloned obj
 */
function _deepClone(obj) {
    switch (typeof obj) {
        case "object":
            return JSON.parse(JSON.stringify(obj)); //Faster than ES5 clone - http://jsperf.com/deep-cloning-of-objects/5
        case "undefined":
            return null; //this is how JSON.stringify behaves for array items
        default:
            return obj; //no need to clone primitives
    }
}
//3x faster than cached /^\d+$/.test(str)
function isInteger(str) {
    let i = 0;
    const len = str.length;
    let charCode;
    while (i < len) {
        charCode = str.charCodeAt(i);
        if (charCode >= 48 && charCode <= 57) {
            i++;
            continue;
        }
        return false;
    }
    return true;
}
/**
 * Escapes a json pointer path
 * @param path The raw pointer
 * @return the Escaped path
 */
function escapePathComponent(path) {
    if (path.indexOf("/") === -1 && path.indexOf("~") === -1)
        return path;
    return path.replace(/~/g, "~0").replace(/\//g, "~1");
}
/**
 * Unescapes a json pointer path
 * @param path The escaped pointer
 * @return The unescaped path
 */
function unescapePathComponent(path) {
    return path.replace(/~1/g, "/").replace(/~0/g, "~");
}
function _getPathRecursive(root, obj) {
    let found;
    for (let key in root) {
        if (helpers_hasOwnProperty(root, key)) {
            if (root[key] === obj) {
                return escapePathComponent(key) + "/";
            }
            else if (typeof root[key] === "object") {
                found = _getPathRecursive(root[key], obj);
                if (found != "") {
                    return escapePathComponent(key) + "/" + found;
                }
            }
        }
    }
    return "";
}
function getPath(root, obj) {
    if (root === obj) {
        return "/";
    }
    const path = _getPathRecursive(root, obj);
    if (path === "") {
        throw new Error("Object not found in root");
    }
    return `/${path}`;
}
/**
 * Recursively checks whether an object has any undefined values inside.
 */
function hasUndefined(obj) {
    if (obj === undefined) {
        return true;
    }
    if (obj) {
        if (Array.isArray(obj)) {
            for (let i = 0, len = obj.length; i < len; i++) {
                if (hasUndefined(obj[i])) {
                    return true;
                }
            }
        }
        else if (typeof obj === "object") {
            const objKeys = _objectKeys(obj);
            const objKeysLength = objKeys.length;
            for (var i = 0; i < objKeysLength; i++) {
                if (hasUndefined(obj[objKeys[i]])) {
                    return true;
                }
            }
        }
    }
    return false;
}
function patchErrorMessageFormatter(message, args) {
    const messageParts = [message];
    for (const key in args) {
        const value = typeof args[key] === "object"
            ? JSON.stringify(args[key], null, 2)
            : args[key]; // pretty print
        if (typeof value !== "undefined") {
            messageParts.push(`${key}: ${value}`);
        }
    }
    return messageParts.join("\n");
}
class PatchError extends Error {
    constructor(message, name, index, operation, tree) {
        super(patchErrorMessageFormatter(message, { name, index, operation, tree }));
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "index", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: index
        });
        Object.defineProperty(this, "operation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: operation
        });
        Object.defineProperty(this, "tree", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tree
        });
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain, see https://stackoverflow.com/a/48342359
        this.message = patchErrorMessageFormatter(message, {
            name,
            index,
            operation,
            tree,
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/util/fast-json-patch/src/core.js
// @ts-nocheck

const JsonPatchError = PatchError;
const deepClone = _deepClone;
/* We use a Javascript hash to store each
 function. Each hash entry (property) uses
 the operation identifiers specified in rfc6902.
 In this way, we can map each patch operation
 to its dedicated function in efficient way.
 */
/* The operations applicable to an object */
const objOps = {
    add: function (obj, key, document) {
        obj[key] = this.value;
        return { newDocument: document };
    },
    remove: function (obj, key, document) {
        var removed = obj[key];
        delete obj[key];
        return { newDocument: document, removed };
    },
    replace: function (obj, key, document) {
        var removed = obj[key];
        obj[key] = this.value;
        return { newDocument: document, removed };
    },
    move: function (obj, key, document) {
        /* in case move target overwrites an existing value,
        return the removed value, this can be taxing performance-wise,
        and is potentially unneeded */
        let removed = getValueByPointer(document, this.path);
        if (removed) {
            removed = _deepClone(removed);
        }
        const originalValue = applyOperation(document, {
            op: "remove",
            path: this.from,
        }).removed;
        applyOperation(document, {
            op: "add",
            path: this.path,
            value: originalValue,
        });
        return { newDocument: document, removed };
    },
    copy: function (obj, key, document) {
        const valueToCopy = getValueByPointer(document, this.from);
        // enforce copy by value so further operations don't affect source (see issue #177)
        applyOperation(document, {
            op: "add",
            path: this.path,
            value: _deepClone(valueToCopy),
        });
        return { newDocument: document };
    },
    test: function (obj, key, document) {
        return { newDocument: document, test: _areEquals(obj[key], this.value) };
    },
    _get: function (obj, key, document) {
        this.value = obj[key];
        return { newDocument: document };
    },
};
/* The operations applicable to an array. Many are the same as for the object */
var arrOps = {
    add: function (arr, i, document) {
        if (isInteger(i)) {
            arr.splice(i, 0, this.value);
        }
        else {
            // array props
            arr[i] = this.value;
        }
        // this may be needed when using '-' in an array
        return { newDocument: document, index: i };
    },
    remove: function (arr, i, document) {
        var removedList = arr.splice(i, 1);
        return { newDocument: document, removed: removedList[0] };
    },
    replace: function (arr, i, document) {
        var removed = arr[i];
        arr[i] = this.value;
        return { newDocument: document, removed };
    },
    move: objOps.move,
    copy: objOps.copy,
    test: objOps.test,
    _get: objOps._get,
};
/**
 * Retrieves a value from a JSON document by a JSON pointer.
 * Returns the value.
 *
 * @param document The document to get the value from
 * @param pointer an escaped JSON pointer
 * @return The retrieved value
 */
function getValueByPointer(document, pointer) {
    if (pointer == "") {
        return document;
    }
    var getOriginalDestination = { op: "_get", path: pointer };
    applyOperation(document, getOriginalDestination);
    return getOriginalDestination.value;
}
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the {newDocument, result} of the operation.
 * It modifies the `document` and `operation` objects - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyOperation(document, jsonpatch._deepClone(operation))`.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
 * @return `{newDocument, result}` after the operation
 */
function applyOperation(document, operation, validateOperation = false, mutateDocument = true, banPrototypeModifications = true, index = 0) {
    if (validateOperation) {
        if (typeof validateOperation == "function") {
            validateOperation(operation, 0, document, operation.path);
        }
        else {
            validator(operation, 0);
        }
    }
    /* ROOT OPERATIONS */
    if (operation.path === "") {
        let returnValue = { newDocument: document };
        if (operation.op === "add") {
            returnValue.newDocument = operation.value;
            return returnValue;
        }
        else if (operation.op === "replace") {
            returnValue.newDocument = operation.value;
            returnValue.removed = document; //document we removed
            return returnValue;
        }
        else if (operation.op === "move" || operation.op === "copy") {
            // it's a move or copy to root
            returnValue.newDocument = getValueByPointer(document, operation.from); // get the value by json-pointer in `from` field
            if (operation.op === "move") {
                // report removed item
                returnValue.removed = document;
            }
            return returnValue;
        }
        else if (operation.op === "test") {
            returnValue.test = _areEquals(document, operation.value);
            if (returnValue.test === false) {
                throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
            }
            returnValue.newDocument = document;
            return returnValue;
        }
        else if (operation.op === "remove") {
            // a remove on root
            returnValue.removed = document;
            returnValue.newDocument = null;
            return returnValue;
        }
        else if (operation.op === "_get") {
            operation.value = document;
            return returnValue;
        }
        else {
            /* bad operation */
            if (validateOperation) {
                throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
            }
            else {
                return returnValue;
            }
        }
    } /* END ROOT OPERATIONS */
    else {
        if (!mutateDocument) {
            document = _deepClone(document);
        }
        const path = operation.path || "";
        const keys = path.split("/");
        let obj = document;
        let t = 1; //skip empty element - http://jsperf.com/to-shift-or-not-to-shift
        let len = keys.length;
        let existingPathFragment = undefined;
        let key;
        let validateFunction;
        if (typeof validateOperation == "function") {
            validateFunction = validateOperation;
        }
        else {
            validateFunction = validator;
        }
        while (true) {
            key = keys[t];
            if (key && key.indexOf("~") != -1) {
                key = unescapePathComponent(key);
            }
            if (banPrototypeModifications &&
                (key == "__proto__" ||
                    (key == "prototype" && t > 0 && keys[t - 1] == "constructor"))) {
                throw new TypeError("JSON-Patch: modifying `__proto__` or `constructor/prototype` prop is banned for security reasons, if this was on purpose, please set `banPrototypeModifications` flag false and pass it to this function. More info in fast-json-patch README");
            }
            if (validateOperation) {
                if (existingPathFragment === undefined) {
                    if (obj[key] === undefined) {
                        existingPathFragment = keys.slice(0, t).join("/");
                    }
                    else if (t == len - 1) {
                        existingPathFragment = operation.path;
                    }
                    if (existingPathFragment !== undefined) {
                        validateFunction(operation, 0, document, existingPathFragment);
                    }
                }
            }
            t++;
            if (Array.isArray(obj)) {
                if (key === "-") {
                    key = obj.length;
                }
                else {
                    if (validateOperation && !isInteger(key)) {
                        throw new JsonPatchError("Expected an unsigned base-10 integer value, making the new referenced value the array element with the zero-based index", "OPERATION_PATH_ILLEGAL_ARRAY_INDEX", index, operation, document);
                    } // only parse key when it's an integer for `arr.prop` to work
                    else if (isInteger(key)) {
                        key = ~~key;
                    }
                }
                if (t >= len) {
                    if (validateOperation && operation.op === "add" && key > obj.length) {
                        throw new JsonPatchError("The specified index MUST NOT be greater than the number of elements in the array", "OPERATION_VALUE_OUT_OF_BOUNDS", index, operation, document);
                    }
                    const returnValue = arrOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
                    }
                    return returnValue;
                }
            }
            else {
                if (t >= len) {
                    const returnValue = objOps[operation.op].call(operation, obj, key, document); // Apply patch
                    if (returnValue.test === false) {
                        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
                    }
                    return returnValue;
                }
            }
            obj = obj[key];
            // If we have more keys in the path, but the next value isn't a non-null object,
            // throw an OPERATION_PATH_UNRESOLVABLE error instead of iterating again.
            if (validateOperation && t < len && (!obj || typeof obj !== "object")) {
                throw new JsonPatchError("Cannot perform operation at the desired path", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
            }
        }
    }
}
/**
 * Apply a full JSON Patch array on a JSON document.
 * Returns the {newDocument, result} of the patch.
 * It modifies the `document` object and `patch` - it gets the values by reference.
 * If you would like to avoid touching your values, clone them:
 * `jsonpatch.applyPatch(document, jsonpatch._deepClone(patch))`.
 *
 * @param document The document to patch
 * @param patch The patch to apply
 * @param validateOperation `false` is without validation, `true` to use default jsonpatch's validation, or you can pass a `validateOperation` callback to be used for validation.
 * @param mutateDocument Whether to mutate the original document or clone it before applying
 * @param banPrototypeModifications Whether to ban modifications to `__proto__`, defaults to `true`.
 * @return An array of `{newDocument, result}` after the patch
 */
function applyPatch(document, patch, validateOperation, mutateDocument = true, banPrototypeModifications = true) {
    if (validateOperation) {
        if (!Array.isArray(patch)) {
            throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
    }
    if (!mutateDocument) {
        document = _deepClone(document);
    }
    const results = new Array(patch.length);
    for (let i = 0, length = patch.length; i < length; i++) {
        // we don't need to pass mutateDocument argument because if it was true, we already deep cloned the object, we'll just pass `true`
        results[i] = applyOperation(document, patch[i], validateOperation, true, banPrototypeModifications, i);
        document = results[i].newDocument; // in case root was replaced
    }
    results.newDocument = document;
    return results;
}
/**
 * Apply a single JSON Patch Operation on a JSON document.
 * Returns the updated document.
 * Suitable as a reducer.
 *
 * @param document The document to patch
 * @param operation The operation to apply
 * @return The updated document
 */
function applyReducer(document, operation, index) {
    const operationResult = applyOperation(document, operation);
    if (operationResult.test === false) {
        // failed test
        throw new JsonPatchError("Test operation failed", "TEST_OPERATION_FAILED", index, operation, document);
    }
    return operationResult.newDocument;
}
/**
 * Validates a single operation. Called from `jsonpatch.validate`. Throws `JsonPatchError` in case of an error.
 * @param {object} operation - operation object (patch)
 * @param {number} index - index of operation in the sequence
 * @param {object} [document] - object where the operation is supposed to be applied
 * @param {string} [existingPathFragment] - comes along with `document`
 */
function validator(operation, index, document, existingPathFragment) {
    if (typeof operation !== "object" ||
        operation === null ||
        Array.isArray(operation)) {
        throw new JsonPatchError("Operation is not an object", "OPERATION_NOT_AN_OBJECT", index, operation, document);
    }
    else if (!objOps[operation.op]) {
        throw new JsonPatchError("Operation `op` property is not one of operations defined in RFC-6902", "OPERATION_OP_INVALID", index, operation, document);
    }
    else if (typeof operation.path !== "string") {
        throw new JsonPatchError("Operation `path` property is not a string", "OPERATION_PATH_INVALID", index, operation, document);
    }
    else if (operation.path.indexOf("/") !== 0 && operation.path.length > 0) {
        // paths that aren't empty string should start with "/"
        throw new JsonPatchError('Operation `path` property must start with "/"', "OPERATION_PATH_INVALID", index, operation, document);
    }
    else if ((operation.op === "move" || operation.op === "copy") &&
        typeof operation.from !== "string") {
        throw new JsonPatchError("Operation `from` property is not present (applicable in `move` and `copy` operations)", "OPERATION_FROM_REQUIRED", index, operation, document);
    }
    else if ((operation.op === "add" ||
        operation.op === "replace" ||
        operation.op === "test") &&
        operation.value === undefined) {
        throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_REQUIRED", index, operation, document);
    }
    else if ((operation.op === "add" ||
        operation.op === "replace" ||
        operation.op === "test") &&
        hasUndefined(operation.value)) {
        throw new JsonPatchError("Operation `value` property is not present (applicable in `add`, `replace` and `test` operations)", "OPERATION_VALUE_CANNOT_CONTAIN_UNDEFINED", index, operation, document);
    }
    else if (document) {
        if (operation.op == "add") {
            var pathLen = operation.path.split("/").length;
            var existingPathLen = existingPathFragment.split("/").length;
            if (pathLen !== existingPathLen + 1 && pathLen !== existingPathLen) {
                throw new JsonPatchError("Cannot perform an `add` operation at the desired path", "OPERATION_PATH_CANNOT_ADD", index, operation, document);
            }
        }
        else if (operation.op === "replace" ||
            operation.op === "remove" ||
            operation.op === "_get") {
            if (operation.path !== existingPathFragment) {
                throw new JsonPatchError("Cannot perform the operation at a path that does not exist", "OPERATION_PATH_UNRESOLVABLE", index, operation, document);
            }
        }
        else if (operation.op === "move" || operation.op === "copy") {
            var existingValue = {
                op: "_get",
                path: operation.from,
                value: undefined,
            };
            var error = validate([existingValue], document);
            if (error && error.name === "OPERATION_PATH_UNRESOLVABLE") {
                throw new JsonPatchError("Cannot perform the operation from a path that does not exist", "OPERATION_FROM_UNRESOLVABLE", index, operation, document);
            }
        }
    }
}
/**
 * Validates a sequence of operations. If `document` parameter is provided, the sequence is additionally validated against the object document.
 * If error is encountered, returns a JsonPatchError object
 * @param sequence
 * @param document
 * @returns {JsonPatchError|undefined}
 */
function validate(sequence, document, externalValidator) {
    try {
        if (!Array.isArray(sequence)) {
            throw new JsonPatchError("Patch sequence must be an array", "SEQUENCE_NOT_AN_ARRAY");
        }
        if (document) {
            //clone document and sequence so that we can safely try applying operations
            applyPatch(_deepClone(document), _deepClone(sequence), externalValidator || true);
        }
        else {
            externalValidator = externalValidator || validator;
            for (var i = 0; i < sequence.length; i++) {
                externalValidator(sequence[i], i, document, undefined);
            }
        }
    }
    catch (e) {
        if (e instanceof JsonPatchError) {
            return e;
        }
        else {
            throw e;
        }
    }
}
// based on https://github.com/epoberezkin/fast-deep-equal
// MIT License
// Copyright (c) 2017 Evgeny Poberezkin
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
function _areEquals(a, b) {
    if (a === b)
        return true;
    if (a && b && typeof a == "object" && typeof b == "object") {
        var arrA = Array.isArray(a), arrB = Array.isArray(b), i, length, key;
        if (arrA && arrB) {
            length = a.length;
            if (length != b.length)
                return false;
            for (i = length; i-- !== 0;)
                if (!_areEquals(a[i], b[i]))
                    return false;
            return true;
        }
        if (arrA != arrB)
            return false;
        var keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length)
            return false;
        for (i = length; i-- !== 0;)
            if (!b.hasOwnProperty(keys[i]))
                return false;
        for (i = length; i-- !== 0;) {
            key = keys[i];
            if (!_areEquals(a[key], b[key]))
                return false;
        }
        return true;
    }
    return a !== a && b !== b;
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/util/fast-json-patch/index.js


/**
 * Default export for backwards compat
 */


/* harmony default export */ const fast_json_patch = ({
    ...core_namespaceObject,
    // ...duplex,
    JsonPatchError: PatchError,
    deepClone: _deepClone,
    escapePathComponent: escapePathComponent,
    unescapePathComponent: unescapePathComponent,
});

// EXTERNAL MODULE: ./node_modules/langchain/dist/callbacks/handlers/tracer.js
var tracer = __webpack_require__(8763);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/util/stream.js
/*
 * Support async iterator syntax for ReadableStreams in all environments.
 * Source: https://github.com/MattiasBuelens/web-streams-polyfill/pull/122#issuecomment-1627354490
 */
class IterableReadableStream extends ReadableStream {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "reader", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    ensureReader() {
        if (!this.reader) {
            this.reader = this.getReader();
        }
    }
    async next() {
        this.ensureReader();
        try {
            const result = await this.reader.read();
            if (result.done)
                this.reader.releaseLock(); // release lock when stream becomes closed
            return result;
        }
        catch (e) {
            this.reader.releaseLock(); // release lock when stream becomes errored
            throw e;
        }
    }
    async return() {
        this.ensureReader();
        const cancelPromise = this.reader.cancel(); // cancel first, but don't await yet
        this.reader.releaseLock(); // release lock first
        await cancelPromise; // now await it
        return { done: true, value: undefined }; // This cast fixes TS typing, and convention is to ignore chunk value anyway
    }
    [Symbol.asyncIterator]() {
        return this;
    }
    static fromReadableStream(stream) {
        // From https://developer.mozilla.org/en-US/docs/Web/API/Streams_API/Using_readable_streams#reading_the_stream
        const reader = stream.getReader();
        return new IterableReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({ done, value }) => {
                        // When no more data needs to be consumed, close the stream
                        if (done) {
                            controller.close();
                            return;
                        }
                        // Enqueue the next data chunk into our target stream
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
        });
    }
    static fromAsyncGenerator(generator) {
        return new IterableReadableStream({
            async pull(controller) {
                const { value, done } = await generator.next();
                if (done) {
                    controller.close();
                }
                else if (value) {
                    controller.enqueue(value);
                }
            },
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/callbacks/handlers/log_stream.js



/**
 * List of jsonpatch JSONPatchOperations, which describe how to create the run state
 * from an empty dict. This is the minimal representation of the log, designed to
 * be serialized as JSON and sent over the wire to reconstruct the log on the other
 * side. Reconstruction of the state can be done with any jsonpatch-compliant library,
 * see https://jsonpatch.com for more information.
 */
class RunLogPatch {
    constructor(fields) {
        Object.defineProperty(this, "ops", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.ops = fields.ops;
    }
    concat(other) {
        const ops = this.ops.concat(other.ops);
        const states = applyPatch({}, ops);
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunLog({
            ops,
            state: states[states.length - 1].newDocument,
        });
    }
}
class RunLog extends RunLogPatch {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.state = fields.state;
    }
    concat(other) {
        const ops = this.ops.concat(other.ops);
        const states = applyPatch(this.state, other.ops);
        return new RunLog({ ops, state: states[states.length - 1].newDocument });
    }
}
/**
 * Class that extends the `BaseTracer` class from the
 * `langchain.callbacks.tracers.base` module. It represents a callback
 * handler that logs the execution of runs and emits `RunLog` instances to a
 * `RunLogStream`.
 */
class LogStreamCallbackHandler extends tracer/* BaseTracer */.Z {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "autoClose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "includeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "includeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTypes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "excludeTags", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "indexMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {}
        });
        Object.defineProperty(this, "transformStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "writer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "receiveStream", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "log_stream_tracer"
        });
        this.autoClose = fields?.autoClose ?? true;
        this.includeNames = fields?.includeNames;
        this.includeTypes = fields?.includeTypes;
        this.includeTags = fields?.includeTags;
        this.excludeNames = fields?.excludeNames;
        this.excludeTypes = fields?.excludeTypes;
        this.excludeTags = fields?.excludeTags;
        this.transformStream = new TransformStream();
        this.writer = this.transformStream.writable.getWriter();
        this.receiveStream = IterableReadableStream.fromReadableStream(this.transformStream.readable);
    }
    [Symbol.asyncIterator]() {
        return this.receiveStream;
    }
    async persistRun(_run) {
        // This is a legacy method only called once for an entire run tree
        // and is therefore not useful here
    }
    _includeRun(run) {
        if (run.parent_run_id === undefined) {
            return false;
        }
        const runTags = run.tags ?? [];
        let include = this.includeNames === undefined &&
            this.includeTags === undefined &&
            this.includeTypes === undefined;
        if (this.includeNames !== undefined) {
            include = include || this.includeNames.includes(run.name);
        }
        if (this.includeTypes !== undefined) {
            include = include || this.includeTypes.includes(run.run_type);
        }
        if (this.includeTags !== undefined) {
            include =
                include ||
                    runTags.find((tag) => this.includeTags?.includes(tag)) !== undefined;
        }
        if (this.excludeNames !== undefined) {
            include = include && !this.excludeNames.includes(run.name);
        }
        if (this.excludeTypes !== undefined) {
            include = include && !this.excludeTypes.includes(run.run_type);
        }
        if (this.excludeTags !== undefined) {
            include =
                include && runTags.every((tag) => !this.excludeTags?.includes(tag));
        }
        return include;
    }
    async onRunCreate(run) {
        if (run.parent_run_id === undefined) {
            await this.writer.write(new RunLogPatch({
                ops: [
                    {
                        op: "replace",
                        path: "",
                        value: {
                            id: run.id,
                            streamed_output: [],
                            final_output: undefined,
                            logs: [],
                        },
                    },
                ],
            }));
        }
        if (!this._includeRun(run)) {
            return;
        }
        this.indexMap[run.id] = Math.max(...Object.values(this.indexMap), -1) + 1;
        const logEntry = {
            id: run.id,
            name: run.name,
            type: run.run_type,
            tags: run.tags ?? [],
            metadata: run.extra?.metadata ?? {},
            start_time: new Date(run.start_time).toISOString(),
            streamed_output_str: [],
            final_output: undefined,
            end_time: undefined,
        };
        await this.writer.write(new RunLogPatch({
            ops: [
                {
                    op: "add",
                    path: `/logs/${this.indexMap[run.id]}`,
                    value: logEntry,
                },
            ],
        }));
    }
    async onRunUpdate(run) {
        try {
            const index = this.indexMap[run.id];
            if (index === undefined) {
                return;
            }
            const ops = [
                {
                    op: "add",
                    path: `/logs/${index}/final_output`,
                    value: run.outputs,
                },
            ];
            if (run.end_time !== undefined) {
                ops.push({
                    op: "add",
                    path: `/logs/${index}/end_time`,
                    value: new Date(run.end_time).toISOString(),
                });
            }
            const patch = new RunLogPatch({ ops });
            await this.writer.write(patch);
        }
        finally {
            if (run.parent_run_id === undefined) {
                const patch = new RunLogPatch({
                    ops: [
                        {
                            op: "replace",
                            path: "/final_output",
                            value: run.outputs,
                        },
                    ],
                });
                await this.writer.write(patch);
                if (this.autoClose) {
                    await this.writer.close();
                }
            }
        }
    }
    async onLLMNewToken(run, token) {
        const index = this.indexMap[run.id];
        if (index === undefined) {
            return;
        }
        const patch = new RunLogPatch({
            ops: [
                {
                    op: "add",
                    path: `/logs/${index}/streamed_output_str/-`,
                    value: token,
                },
            ],
        });
        await this.writer.write(patch);
    }
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/load/serializable.js + 1 modules
var serializable = __webpack_require__(4432);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/config.js

async function getCallbackMangerForConfig(config) {
    return manager/* CallbackManager.configure */.Ye.configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata);
}

// EXTERNAL MODULE: ./node_modules/langchain/dist/util/async_caller.js
var async_caller = __webpack_require__(2723);
;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/base.js







// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _coerceToDict(value, defaultKey) {
    return value && !Array.isArray(value) && typeof value === "object"
        ? value
        : { [defaultKey]: value };
}
/**
 * A Runnable is a generic unit of work that can be invoked, batched, streamed, and/or
 * transformed.
 */
class base_Runnable extends serializable/* Serializable */.i {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    /**
     * Bind arguments to a Runnable, returning a new Runnable.
     * @param kwargs
     * @returns A new RunnableBinding that, when invoked, will apply the bound args.
     */
    bind(kwargs) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({ bound: this, kwargs, config: {} });
    }
    /**
     * Return a new Runnable that maps a list of inputs to a list of outputs,
     * by calling invoke() with each input.
     */
    map() {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableEach({ bound: this });
    }
    /**
     * Add retry logic to an existing runnable.
     * @param kwargs
     * @returns A new RunnableRetry that, when invoked, will retry according to the parameters.
     */
    withRetry(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableRetry({
            bound: this,
            kwargs: {},
            config: {},
            maxAttemptNumber: fields?.stopAfterAttempt,
            ...fields,
        });
    }
    /**
     * Bind config to a Runnable, returning a new Runnable.
     * @param config New configuration parameters to attach to the new runnable.
     * @returns A new RunnableBinding with a config matching what's passed.
     */
    withConfig(config) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableBinding({
            bound: this,
            config,
            kwargs: {},
        });
    }
    /**
     * Create a new runnable from the current one that will try invoking
     * other passed fallback runnables if the initial invocation fails.
     * @param fields.fallbacks Other runnables to call if the runnable errors.
     * @returns A new RunnableWithFallbacks.
     */
    withFallbacks(fields) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableWithFallbacks({
            runnable: this,
            fallbacks: fields.fallbacks,
        });
    }
    _getOptionsList(options, length = 0) {
        if (Array.isArray(options)) {
            if (options.length !== length) {
                throw new Error(`Passed "options" must be an array with the same length as the inputs, but got ${options.length} options for ${length} inputs`);
            }
            return options;
        }
        return Array.from({ length }, () => options);
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const caller = new async_caller/* AsyncCaller */.L({
            maxConcurrency: batchOptions?.maxConcurrency,
            onFailedAttempt: (e) => {
                throw e;
            },
        });
        const batchCalls = inputs.map((input, i) => caller.call(async () => {
            try {
                const result = await this.invoke(input, configList[i]);
                return result;
            }
            catch (e) {
                if (batchOptions?.returnExceptions) {
                    return e;
                }
                throw e;
            }
        }));
        return Promise.all(batchCalls);
    }
    /**
     * Default streaming implementation.
     * Subclasses should override this method if they support streaming output.
     * @param input
     * @param options
     */
    async *_streamIterator(input, options) {
        yield this.invoke(input, options);
    }
    /**
     * Stream output in chunks.
     * @param input
     * @param options
     * @returns A readable stream that is also an iterable.
     */
    async stream(input, options) {
        return IterableReadableStream.fromAsyncGenerator(this._streamIterator(input, options));
    }
    _separateRunnableConfigFromCallOptions(options = {}) {
        const runnableConfig = {
            callbacks: options.callbacks,
            tags: options.tags,
            metadata: options.metadata,
        };
        const callOptions = { ...options };
        delete callOptions.callbacks;
        delete callOptions.tags;
        delete callOptions.metadata;
        return [runnableConfig, callOptions];
    }
    async _callWithConfig(func, input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"), undefined, options?.runType);
        let output;
        try {
            output = await func.bind(this)(input, options, runManager);
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(output, "output"));
        return output;
    }
    /**
     * Internal method that handles batching and configuration for a runnable
     * It takes a function, input values, and optional configuration, and
     * returns a promise that resolves to the output values.
     * @param func The function to be executed for each input value.
     * @param input The input values to be processed.
     * @param config Optional configuration for the function execution.
     * @returns A promise that resolves to the output values.
     */
    async _batchWithConfig(func, inputs, options, batchOptions) {
        const configs = this._getOptionsList((options ?? {}), inputs.length);
        const callbackManagers = await Promise.all(configs.map(getCallbackMangerForConfig));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        let outputs;
        try {
            outputs = await func(inputs, configs, runManagers, batchOptions);
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainEnd(_coerceToDict(outputs, "output"))));
        return outputs;
    }
    /**
     * Helper method to transform an Iterator of Input values into an Iterator of
     * Output values, with callbacks.
     * Use this to implement `stream()` or `transform()` in Runnable subclasses.
     */
    async *_transformStreamWithConfig(inputGenerator, transformer, options) {
        let finalInput;
        let finalInputSupported = true;
        let finalOutput;
        let finalOutputSupported = true;
        const callbackManager_ = await getCallbackMangerForConfig(options);
        let runManager;
        const serializedRepresentation = this.toJSON();
        async function* wrapInputForTracing() {
            for await (const chunk of inputGenerator) {
                if (!runManager) {
                    // Start the run manager AFTER the iterator starts to preserve
                    // tracing order
                    runManager = await callbackManager_?.handleChainStart(serializedRepresentation, { input: "" }, undefined, options?.runType);
                }
                if (finalInputSupported) {
                    if (finalInput === undefined) {
                        finalInput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalInput = finalInput.concat(chunk);
                        }
                        catch {
                            finalInput = undefined;
                            finalInputSupported = false;
                        }
                    }
                }
                yield chunk;
            }
        }
        const wrappedInputGenerator = wrapInputForTracing();
        try {
            const outputIterator = transformer(wrappedInputGenerator, runManager, options);
            for await (const chunk of outputIterator) {
                yield chunk;
                if (finalOutputSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = finalOutput.concat(chunk);
                        }
                        catch {
                            finalOutput = undefined;
                            finalOutputSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e, undefined, undefined, undefined, {
                inputs: _coerceToDict(finalInput, "input"),
            });
            throw e;
        }
        await runManager?.handleChainEnd(finalOutput ?? {}, undefined, undefined, undefined, { inputs: _coerceToDict(finalInput, "input") });
    }
    _patchConfig(config = {}, callbackManager = undefined) {
        return { ...config, callbacks: callbackManager };
    }
    /**
     * Create a new runnable sequence that runs each individual runnable in series,
     * piping the output of one runnable into another runnable or runnable-like.
     * @param coerceable A runnable, function, or object whose values are functions or runnables.
     * @returns A new runnable sequence.
     */
    pipe(coerceable) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return new RunnableSequence({
            first: this,
            last: base_coerceToRunnable(coerceable),
        });
    }
    /**
     * Default implementation of transform, which buffers input and then calls stream.
     * Subclasses should override this method if they can start producing output while
     * input is still being generated.
     * @param generator
     * @param options
     */
    async *transform(generator, options) {
        let finalChunk;
        for await (const chunk of generator) {
            if (finalChunk === undefined) {
                finalChunk = chunk;
            }
            else {
                // Make a best effort to gather, for any type that supports concat.
                // This method should throw an error if gathering fails.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                finalChunk = finalChunk.concat(chunk);
            }
        }
        yield* this._streamIterator(finalChunk, options);
    }
    /**
     * Stream all output from a runnable, as reported to the callback system.
     * This includes all inner runs of LLMs, Retrievers, Tools, etc.
     * Output is streamed as Log objects, which include a list of
     * jsonpatch ops that describe how the state of the run has changed in each
     * step, and the final state of the run.
     * The jsonpatch ops can be applied in order to construct state.
     * @param input
     * @param options
     * @param streamOptions
     */
    async *streamLog(input, options, streamOptions) {
        const stream = new LogStreamCallbackHandler({
            ...streamOptions,
            autoClose: false,
        });
        const config = options ?? {};
        const { callbacks } = config;
        if (callbacks === undefined) {
            config.callbacks = [stream];
        }
        else if (Array.isArray(callbacks)) {
            config.callbacks = callbacks.concat([stream]);
        }
        else {
            const copiedCallbacks = callbacks.copy();
            copiedCallbacks.inheritableHandlers.push(stream);
            config.callbacks = copiedCallbacks;
        }
        const runnableStream = await this.stream(input, config);
        async function consumeRunnableStream() {
            try {
                for await (const chunk of runnableStream) {
                    const patch = new RunLogPatch({
                        ops: [
                            {
                                op: "add",
                                path: "/streamed_output/-",
                                value: chunk,
                            },
                        ],
                    });
                    await stream.writer.write(patch);
                }
            }
            finally {
                await stream.writer.close();
            }
        }
        const runnableStreamPromise = consumeRunnableStream();
        try {
            for await (const log of stream) {
                yield log;
            }
        }
        finally {
            await runnableStreamPromise;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnable(thing) {
        return thing.lc_runnable;
    }
}
/**
 * A runnable that delegates calls to another runnable with a set of kwargs.
 */
class RunnableBinding extends base_Runnable {
    static lc_name() {
        return "RunnableBinding";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "kwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
        this.kwargs = fields.kwargs;
        this.config = fields.config;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _mergeConfig(options) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const copy = { ...this.config };
        if (options) {
            for (const key of Object.keys(options)) {
                if (key === "metadata") {
                    copy[key] = { ...copy[key], ...options[key] };
                }
                else if (key === "tags") {
                    copy[key] = (copy[key] ?? []).concat(options[key] ?? []);
                }
                else {
                    copy[key] = options[key] ?? copy[key];
                }
            }
        }
        return copy;
    }
    bind(kwargs) {
        return this.constructor({
            bound: this.bound,
            kwargs: { ...this.kwargs, ...kwargs },
            config: this.config,
        });
    }
    withConfig(config) {
        return this.constructor({
            bound: this.bound,
            kwargs: this.kwargs,
            config: { ...this.config, ...config },
        });
    }
    withRetry(fields) {
        return this.constructor({
            bound: this.bound.withRetry(fields),
            kwargs: this.kwargs,
            config: this.config,
        });
    }
    async invoke(input, options) {
        return this.bound.invoke(input, this._mergeConfig({ ...options, ...this.kwargs }));
    }
    async batch(inputs, options, batchOptions) {
        const mergedOptions = Array.isArray(options)
            ? options.map((individualOption) => this._mergeConfig({
                ...individualOption,
                ...this.kwargs,
            }))
            : this._mergeConfig({ ...options, ...this.kwargs });
        return this.bound.batch(inputs, mergedOptions, batchOptions);
    }
    async *_streamIterator(input, options) {
        yield* this.bound._streamIterator(input, this._mergeConfig({ ...options, ...this.kwargs }));
    }
    async stream(input, options) {
        return this.bound.stream(input, this._mergeConfig({ ...options, ...this.kwargs }));
    }
    async *transform(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    generator, options) {
        yield* this.bound.transform(generator, this._mergeConfig({ ...options, ...this.kwargs }));
    }
    static isRunnableBinding(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        return thing.bound && base_Runnable.isRunnable(thing.bound);
    }
}
/**
 * A runnable that delegates calls to another runnable
 * with each element of the input sequence.
 */
class RunnableEach extends base_Runnable {
    static lc_name() {
        return "RunnableEach";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "bound", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bound = fields.bound;
    }
    /**
     * Binds the runnable with the specified arguments.
     * @param args The arguments to bind the runnable with.
     * @returns A new instance of the `RunnableEach` class that is bound with the specified arguments.
     */
    bind(kwargs) {
        return new RunnableEach({
            bound: this.bound.bind(kwargs),
        });
    }
    /**
     * Invokes the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(inputs, config) {
        return this._callWithConfig(this._invoke, inputs, config);
    }
    /**
     * A helper method that is used to invoke the runnable with the specified input and configuration.
     * @param input The input to invoke the runnable with.
     * @param config The configuration to invoke the runnable with.
     * @returns A promise that resolves to the output of the runnable.
     */
    async _invoke(inputs, config, runManager) {
        return this.bound.batch(inputs, this._patchConfig(config, runManager?.getChild()));
    }
}
/**
 * Base class for runnables that can be retried a
 * specified number of times.
 */
class RunnableRetry extends RunnableBinding {
    static lc_name() {
        return "RunnableRetry";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "maxAttemptNumber", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => { }
        });
        this.maxAttemptNumber = fields.maxAttemptNumber ?? this.maxAttemptNumber;
        this.onFailedAttempt = fields.onFailedAttempt ?? this.onFailedAttempt;
    }
    _patchConfigForRetry(attempt, config, runManager) {
        const tag = attempt > 1 ? `retry:attempt:${attempt}` : undefined;
        return this._patchConfig(config, runManager?.getChild(tag));
    }
    async _invoke(input, config, runManager) {
        return p_retry((attemptNumber) => super.invoke(input, this._patchConfigForRetry(attemptNumber, config, runManager)), {
            onFailedAttempt: this.onFailedAttempt,
            retries: Math.max(this.maxAttemptNumber - 1, 0),
            randomize: true,
        });
    }
    /**
     * Method that invokes the runnable with the specified input, run manager,
     * and config. It handles the retry logic by catching any errors and
     * recursively invoking itself with the updated config for the next retry
     * attempt.
     * @param input The input for the runnable.
     * @param runManager The run manager for the runnable.
     * @param config The config for the runnable.
     * @returns A promise that resolves to the output of the runnable.
     */
    async invoke(input, config) {
        return this._callWithConfig(this._invoke, input, config);
    }
    async _batch(inputs, configs, runManagers, batchOptions) {
        const resultsMap = {};
        try {
            await p_retry(async (attemptNumber) => {
                const remainingIndexes = inputs
                    .map((_, i) => i)
                    .filter((i) => resultsMap[i.toString()] === undefined ||
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    resultsMap[i.toString()] instanceof Error);
                const remainingInputs = remainingIndexes.map((i) => inputs[i]);
                const patchedConfigs = remainingIndexes.map((i) => this._patchConfigForRetry(attemptNumber, configs?.[i], runManagers?.[i]));
                const results = await super.batch(remainingInputs, patchedConfigs, {
                    ...batchOptions,
                    returnExceptions: true,
                });
                let firstException;
                for (let i = 0; i < results.length; i += 1) {
                    const result = results[i];
                    const resultMapIndex = remainingIndexes[i];
                    // eslint-disable-next-line no-instanceof/no-instanceof
                    if (result instanceof Error) {
                        if (firstException === undefined) {
                            firstException = result;
                        }
                    }
                    resultsMap[resultMapIndex.toString()] = result;
                }
                if (firstException) {
                    throw firstException;
                }
                return results;
            }, {
                onFailedAttempt: this.onFailedAttempt,
                retries: Math.max(this.maxAttemptNumber - 1, 0),
                randomize: true,
            });
        }
        catch (e) {
            if (batchOptions?.returnExceptions !== true) {
                throw e;
            }
        }
        return Object.keys(resultsMap)
            .sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
            .map((key) => resultsMap[parseInt(key, 10)]);
    }
    async batch(inputs, options, batchOptions) {
        return this._batchWithConfig(this._batch.bind(this), inputs, options, batchOptions);
    }
}
/**
 * A sequence of runnables, where the output of each is the input of the next.
 */
class RunnableSequence extends base_Runnable {
    static lc_name() {
        return "RunnableSequence";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "first", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "middle", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Object.defineProperty(this, "last", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        this.first = fields.first;
        this.middle = fields.middle ?? this.middle;
        this.last = fields.last;
    }
    get steps() {
        return [this.first, ...this.middle, this.last];
    }
    async invoke(input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        let finalOutput;
        try {
            const initialSteps = [this.first, ...this.middle];
            for (let i = 0; i < initialSteps.length; i += 1) {
                const step = initialSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
            // TypeScript can't detect that the last output of the sequence returns RunOutput, so call it out of the loop here
            finalOutput = await this.last.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${this.steps.length}`)));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
        return finalOutput;
    }
    async batch(inputs, options, batchOptions) {
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map(getCallbackMangerForConfig));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let nextStepInputs = inputs;
        let finalOutputs;
        try {
            const initialSteps = [this.first, ...this.middle];
            for (let i = 0; i < initialSteps.length; i += 1) {
                const step = initialSteps[i];
                nextStepInputs = await step.batch(nextStepInputs, runManagers.map((runManager, j) => this._patchConfig(configList[j], runManager?.getChild(`seq:step:${i + 1}`))), batchOptions);
            }
            finalOutputs = await this.last.batch(nextStepInputs, runManagers.map((runManager) => this._patchConfig(configList[this.steps.length - 1], runManager?.getChild(`seq:step:${this.steps.length}`))), batchOptions);
        }
        catch (e) {
            await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(e)));
            throw e;
        }
        await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict(finalOutputs[i], "output"))));
        return finalOutputs;
    }
    async *_streamIterator(input, options) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let nextStepInput = input;
        const steps = [this.first, ...this.middle, this.last];
        // Find the index of the last runnable in the sequence that doesn't have an overridden .transform() method
        // and start streaming from there
        const streamingStartStepIndex = Math.min(steps.length - 1, steps.length -
            [...steps].reverse().findIndex((step) => {
                const isDefaultImplementation = step.transform === base_Runnable.prototype.transform;
                const boundRunnableIsDefaultImplementation = RunnableBinding.isRunnableBinding(step) &&
                    step.bound?.transform === base_Runnable.prototype.transform;
                return (isDefaultImplementation || boundRunnableIsDefaultImplementation);
            }) -
            1);
        try {
            const invokeSteps = steps.slice(0, streamingStartStepIndex);
            for (let i = 0; i < invokeSteps.length; i += 1) {
                const step = invokeSteps[i];
                nextStepInput = await step.invoke(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${i + 1}`)));
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        let concatSupported = true;
        let finalOutput;
        try {
            let finalGenerator = await steps[streamingStartStepIndex]._streamIterator(nextStepInput, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + 1}`)));
            const finalSteps = steps.slice(streamingStartStepIndex + 1);
            for (let i = 0; i < finalSteps.length; i += 1) {
                const step = finalSteps[i];
                finalGenerator = await step.transform(finalGenerator, this._patchConfig(options, runManager?.getChild(`seq:step:${streamingStartStepIndex + i + 2}`)));
            }
            for await (const chunk of finalGenerator) {
                yield chunk;
                if (concatSupported) {
                    if (finalOutput === undefined) {
                        finalOutput = chunk;
                    }
                    else {
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            finalOutput = finalOutput.concat(chunk);
                        }
                        catch (e) {
                            finalOutput = undefined;
                            concatSupported = false;
                        }
                    }
                }
            }
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(_coerceToDict(finalOutput, "output"));
    }
    pipe(coerceable) {
        if (RunnableSequence.isRunnableSequence(coerceable)) {
            return new RunnableSequence({
                first: this.first,
                middle: this.middle.concat([
                    this.last,
                    coerceable.first,
                    ...coerceable.middle,
                ]),
                last: coerceable.last,
            });
        }
        else {
            return new RunnableSequence({
                first: this.first,
                middle: [...this.middle, this.last],
                last: base_coerceToRunnable(coerceable),
            });
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static isRunnableSequence(thing) {
        return Array.isArray(thing.middle) && base_Runnable.isRunnable(thing);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from([first, ...runnables]) {
        return new RunnableSequence({
            first: base_coerceToRunnable(first),
            middle: runnables.slice(0, -1).map(base_coerceToRunnable),
            last: base_coerceToRunnable(runnables[runnables.length - 1]),
        });
    }
}
/**
 * A runnable that runs a mapping of runnables in parallel,
 * and returns a mapping of their outputs.
 */
class RunnableMap extends base_Runnable {
    static lc_name() {
        return "RunnableMap";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.steps = {};
        for (const [key, value] of Object.entries(fields.steps)) {
            this.steps[key] = base_coerceToRunnable(value);
        }
    }
    async invoke(input, options
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) {
        const callbackManager_ = await getCallbackMangerForConfig(options);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), {
            input,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const output = {};
        try {
            await Promise.all(Object.entries(this.steps).map(async ([key, runnable]) => {
                output[key] = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild(key)));
            }));
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        await runManager?.handleChainEnd(output);
        return output;
    }
}
/**
 * A runnable that runs a callable.
 */
class RunnableLambda extends base_Runnable {
    static lc_name() {
        return "RunnableLambda";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.func = fields.func;
    }
    async _invoke(input, config, runManager) {
        let output = await this.func(input);
        if (output && base_Runnable.isRunnable(output)) {
            output = await output.invoke(input, this._patchConfig(config, runManager?.getChild()));
        }
        return output;
    }
    async invoke(input, options) {
        return this._callWithConfig(this._invoke, input, options);
    }
}
/**
 * A Runnable that can fallback to other Runnables if it fails.
 */
class RunnableWithFallbacks extends base_Runnable {
    static lc_name() {
        return "RunnableWithFallbacks";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fallbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnable = fields.runnable;
        this.fallbacks = fields.fallbacks;
    }
    *runnables() {
        yield this.runnable;
        for (const fallback of this.fallbacks) {
            yield fallback;
        }
    }
    async invoke(input, options) {
        const callbackManager_ = await manager/* CallbackManager.configure */.Ye.configure(options?.callbacks, undefined, options?.tags, undefined, options?.metadata);
        const runManager = await callbackManager_?.handleChainStart(this.toJSON(), _coerceToDict(input, "input"));
        let firstError;
        for (const runnable of this.runnables()) {
            try {
                const output = await runnable.invoke(input, this._patchConfig(options, runManager?.getChild()));
                await runManager?.handleChainEnd(_coerceToDict(output, "output"));
                return output;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (firstError === undefined) {
            throw new Error("No error stored at end of fallback.");
        }
        await runManager?.handleChainError(firstError);
        throw firstError;
    }
    async batch(inputs, options, batchOptions) {
        if (batchOptions?.returnExceptions) {
            throw new Error("Not implemented.");
        }
        const configList = this._getOptionsList(options ?? {}, inputs.length);
        const callbackManagers = await Promise.all(configList.map((config) => manager/* CallbackManager.configure */.Ye.configure(config?.callbacks, undefined, config?.tags, undefined, config?.metadata)));
        const runManagers = await Promise.all(callbackManagers.map((callbackManager, i) => callbackManager?.handleChainStart(this.toJSON(), _coerceToDict(inputs[i], "input"))));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let firstError;
        for (const runnable of this.runnables()) {
            try {
                const outputs = await runnable.batch(inputs, runManagers.map((runManager, j) => this._patchConfig(configList[j], runManager?.getChild())), batchOptions);
                await Promise.all(runManagers.map((runManager, i) => runManager?.handleChainEnd(_coerceToDict(outputs[i], "output"))));
                return outputs;
            }
            catch (e) {
                if (firstError === undefined) {
                    firstError = e;
                }
            }
        }
        if (!firstError) {
            throw new Error("No error stored at end of fallbacks.");
        }
        await Promise.all(runManagers.map((runManager) => runManager?.handleChainError(firstError)));
        throw firstError;
    }
}
// TODO: Figure out why the compiler needs help eliminating Error as a RunOutput type
function base_coerceToRunnable(coerceable) {
    if (typeof coerceable === "function") {
        return new RunnableLambda({ func: coerceable });
    }
    else if (base_Runnable.isRunnable(coerceable)) {
        return coerceable;
    }
    else if (!Array.isArray(coerceable) && typeof coerceable === "object") {
        const runnables = {};
        for (const [key, value] of Object.entries(coerceable)) {
            runnables[key] = base_coerceToRunnable(value);
        }
        return new RunnableMap({
            steps: runnables,
        });
    }
    else {
        throw new Error(`Expected a Runnable, function or object.\nInstead got an unsupported type.`);
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/passthrough.js

/**
 * A runnable that passes through the input.
 */
class RunnablePassthrough extends (/* unused pure expression or super */ null && (Runnable)) {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
    }
    static lc_name() {
        return "RunnablePassthrough";
    }
    async invoke(input, options) {
        return this._callWithConfig((input) => Promise.resolve(input), input, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/router.js

/**
 * A runnable that routes to a set of runnables based on Input['key'].
 * Returns the output of the selected runnable.
 */
class RouterRunnable extends (/* unused pure expression or super */ null && (Runnable)) {
    static lc_name() {
        return "RouterRunnable";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "schema", "runnable"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "runnables", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.runnables = fields.runnables;
    }
    async invoke(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) {
            throw new Error(`No runnable associated with key "${key}".`);
        }
        return runnable.invoke(actualInput, options);
    }
    async batch(inputs, options, batchOptions) {
        const keys = inputs.map((input) => input.key);
        const actualInputs = inputs.map((input) => input.input);
        const missingKey = keys.find((key) => this.runnables[key] === undefined);
        if (missingKey !== undefined) {
            throw new Error(`One or more keys do not have a corresponding runnable.`);
        }
        const runnables = keys.map((key) => this.runnables[key]);
        const optionsList = this._getOptionsList(options ?? {}, inputs.length);
        const batchSize = batchOptions?.maxConcurrency && batchOptions.maxConcurrency > 0
            ? batchOptions?.maxConcurrency
            : inputs.length;
        const batchResults = [];
        for (let i = 0; i < actualInputs.length; i += batchSize) {
            const batchPromises = actualInputs
                .slice(i, i + batchSize)
                .map((actualInput, i) => runnables[i].invoke(actualInput, optionsList[i]));
            const batchResult = await Promise.all(batchPromises);
            batchResults.push(batchResult);
        }
        return batchResults.flat();
    }
    async stream(input, options) {
        const { key, input: actualInput } = input;
        const runnable = this.runnables[key];
        if (runnable === undefined) {
            throw new Error(`No runnable associated with key "${key}".`);
        }
        return runnable.stream(actualInput, options);
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/branch.js

/**
 * Class that represents a runnable branch. The RunnableBranch is
 * initialized with an array of branches and a default branch. When invoked,
 * it evaluates the condition of each branch in order and executes the
 * corresponding branch if the condition is true. If none of the conditions
 * are true, it executes the default branch.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class RunnableBranch extends (/* unused pure expression or super */ null && (Runnable)) {
    static lc_name() {
        return "RunnableBranch";
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "lc_namespace", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ["langchain", "runnable", "branch"]
        });
        Object.defineProperty(this, "lc_serializable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "default", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "branches", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.branches = fields.branches;
        this.default = fields.default;
    }
    /**
     * Convenience method for instantiating a RunnableBranch from
     * RunnableLikes (objects, functions, or Runnables).
     *
     * Each item in the input except for the last one should be a
     * tuple with two items. The first is a "condition" RunnableLike that
     * returns "true" if the second RunnableLike in the tuple should run.
     *
     * The final item in the input should be a RunnableLike that acts as a
     * default branch if no other branches match.
     *
     * @example
     * ```ts
     * import { RunnableBranch } from "langchain/schema/runnable";
     *
     * const branch = RunnableBranch.from([
     *   [(x: number) => x > 0, (x: number) => x + 1],
     *   [(x: number) => x < 0, (x: number) => x - 1],
     *   (x: number) => x
     * ]);
     * ```
     * @param branches An array where the every item except the last is a tuple of [condition, runnable]
     *   pairs. The last item is a default runnable which is invoked if no other condition matches.
     * @returns A new RunnableBranch.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static from(branches) {
        if (branches.length < 1) {
            throw new Error("RunnableBranch requires at least one branch");
        }
        const branchLikes = branches.slice(0, -1);
        const coercedBranches = branchLikes.map(([condition, runnable]) => [
            _coerceToRunnable(condition),
            _coerceToRunnable(runnable),
        ]);
        const defaultBranch = _coerceToRunnable(branches[branches.length - 1]);
        return new this({
            branches: coercedBranches,
            default: defaultBranch,
        });
    }
    async _invoke(input, config, runManager) {
        let result;
        for (let i = 0; i < this.branches.length; i += 1) {
            const [condition, branchRunnable] = this.branches[i];
            const conditionValue = await condition.invoke(input, this._patchConfig(config, runManager?.getChild(`condition:${i + 1}`)));
            if (conditionValue) {
                result = await branchRunnable.invoke(input, this._patchConfig(config, runManager?.getChild(`branch:${i + 1}`)));
                break;
            }
        }
        if (!result) {
            result = await this.default.invoke(input, this._patchConfig(config, runManager?.getChild("default")));
        }
        return result;
    }
    async invoke(input, config = {}) {
        return this._callWithConfig(this._invoke, input, config);
    }
}

;// CONCATENATED MODULE: ./node_modules/langchain/dist/schema/runnable/index.js






/***/ }),

/***/ 2723:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ AsyncCaller)
/* harmony export */ });
/* harmony import */ var p_retry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2548);
/* harmony import */ var p_queue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8983);


const STATUS_NO_RETRY = [
    400,
    401,
    402,
    403,
    404,
    405,
    406,
    407,
    408,
    409, // Conflict
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const defaultFailedAttemptHandler = (error) => {
    if (error.message.startsWith("Cancel") ||
        error.message.startsWith("TimeoutError") ||
        error.name === "TimeoutError" ||
        error.message.startsWith("AbortError") ||
        error.name === "AbortError") {
        throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.code === "ECONNABORTED") {
        throw error;
    }
    const status = 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?.response?.status ?? error?.status;
    if (status && STATUS_NO_RETRY.includes(+status)) {
        throw error;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (error?.error?.code === "insufficient_quota") {
        const err = new Error(error?.message);
        err.name = "InsufficientQuotaError";
        throw err;
    }
};
/**
 * A class that can be used to make async calls with concurrency and retry logic.
 *
 * This is useful for making calls to any kind of "expensive" external resource,
 * be it because it's rate-limited, subject to network issues, etc.
 *
 * Concurrent calls are limited by the `maxConcurrency` parameter, which defaults
 * to `Infinity`. This means that by default, all calls will be made in parallel.
 *
 * Retries are limited by the `maxRetries` parameter, which defaults to 6. This
 * means that by default, each call will be retried up to 6 times, with an
 * exponential backoff between each attempt.
 */
class AsyncCaller {
    constructor(params) {
        Object.defineProperty(this, "maxConcurrency", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onFailedAttempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxConcurrency = params.maxConcurrency ?? Infinity;
        this.maxRetries = params.maxRetries ?? 6;
        this.onFailedAttempt =
            params.onFailedAttempt ?? defaultFailedAttemptHandler;
        const PQueue =  true ? p_queue__WEBPACK_IMPORTED_MODULE_1__["default"] : p_queue__WEBPACK_IMPORTED_MODULE_1__;
        this.queue = new PQueue({ concurrency: this.maxConcurrency });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    call(callable, ...args) {
        return this.queue.add(() => p_retry__WEBPACK_IMPORTED_MODULE_0__(() => callable(...args).catch((error) => {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            }
            else {
                throw new Error(error);
            }
        }), {
            onFailedAttempt: this.onFailedAttempt,
            retries: this.maxRetries,
            randomize: true,
            // If needed we can change some of the defaults here,
            // but they're quite sensible.
        }), { throwOnTimeout: true });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callWithOptions(options, callable, ...args) {
        // Note this doesn't cancel the underlying request,
        // when available prefer to use the signal option of the underlying call
        if (options.signal) {
            return Promise.race([
                this.call(callable, ...args),
                new Promise((_, reject) => {
                    options.signal?.addEventListener("abort", () => {
                        reject(new Error("AbortError"));
                    });
                }),
            ]);
        }
        return this.call(callable, ...args);
    }
    fetch(...args) {
        return this.call(() => fetch(...args).then((res) => (res.ok ? res : Promise.reject(res))));
    }
}


/***/ }),

/***/ 5785:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lS": () => (/* binding */ getEnvironmentVariable),
/* harmony export */   "sA": () => (/* binding */ getRuntimeEnvironment)
/* harmony export */ });
/* unused harmony exports isBrowser, isWebWorker, isJsDom, isDeno, isNode, getEnv */
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
const isWebWorker = () => typeof globalThis === "object" &&
    globalThis.constructor &&
    globalThis.constructor.name === "DedicatedWorkerGlobalScope";
const isJsDom = () => (typeof window !== "undefined" && window.name === "nodejs") ||
    (typeof navigator !== "undefined" &&
        (navigator.userAgent.includes("Node.js") ||
            navigator.userAgent.includes("jsdom")));
// Supabase Edge Function provides a `Deno` global object
// without `version` property
const isDeno = () => typeof Deno !== "undefined";
// Mark not-as-node if in Supabase Edge Function
const isNode = () => typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined" &&
    !isDeno();
const getEnv = () => {
    let env;
    if (isBrowser()) {
        env = "browser";
    }
    else if (isNode()) {
        env = "node";
    }
    else if (isWebWorker()) {
        env = "webworker";
    }
    else if (isJsDom()) {
        env = "jsdom";
    }
    else if (isDeno()) {
        env = "deno";
    }
    else {
        env = "other";
    }
    return env;
};
let runtimeEnvironment;
async function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = getEnv();
        runtimeEnvironment = {
            library: "langchain-js",
            runtime: env,
        };
    }
    return runtimeEnvironment;
}
function getEnvironmentVariable(name) {
    // Certain Deno setups will throw an error if you try to access environment variables
    // https://github.com/hwchase17/langchainjs/issues/1412
    try {
        return typeof process !== "undefined"
            ? // eslint-disable-next-line no-process-env
                process.env?.[name]
            : undefined;
    }
    catch (e) {
        return undefined;
    }
}


/***/ }),

/***/ 1273:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v4": () => (/* binding */ v4)
/* harmony export */ });
/* unused harmony exports v1, v3, v5, NIL, version, validate, stringify, parse */
/* harmony import */ var _dist_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8655);

const v1 = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.v1;
const v3 = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.v3;
const v4 = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.v4;
const v5 = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.v5;
const NIL = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.NIL;
const version = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.version;
const validate = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.validate;
const stringify = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.stringify;
const parse = _dist_index_js__WEBPACK_IMPORTED_MODULE_0__.parse;


/***/ })

};
;