"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickRequest = void 0;
const pickRequest = (obj, keys) => {
    const finalObject = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObject[key] = obj[key];
        }
    }
    return finalObject;
};
exports.pickRequest = pickRequest;
