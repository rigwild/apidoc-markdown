/**
 * Convert a title to a Markdown-valid relative link
 * @param str Title to convert
 * @returns The valid linkable string
 */
export const toLink = (str: string) => str.replace(/\s+/g, '-')
