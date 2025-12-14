"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replacer = void 0;
function replacer(key, value) {
    if (value instanceof Map) {
        if (value.size !== 0) {
            return Object.fromEntries(value);
        }
        else {
            return 0;
        }
    }
    else {
        return value;
    }
}
exports.replacer = replacer;
//# sourceMappingURL=utils.js.map