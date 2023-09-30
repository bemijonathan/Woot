export const id = 197;
export const ids = [197];
export const modules = {

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


/***/ })

};
