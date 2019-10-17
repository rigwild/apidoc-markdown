"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Convert a title to a Markdown-valid relative link
 * @param str Title to convert
 * @returns The valid linkable string
 */
exports.toLink = (str) => str.replace(/\s+/g, '-');
//# sourceMappingURL=utils_template.js.map