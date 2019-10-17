import { ConfigurationObj } from './types';
/**
 * Get the documentation compiler
 * @param param0 Documentation generator parameters
 * @returns The single and multi file compilers, ready for usage
 */
export declare const getCompiler: ({ apiDocPath, template, prepend }: Pick<ConfigurationObj, "template" | "apiDocPath" | "prepend">) => Promise<{
    singleCompiler: () => {
        name: string;
        content: string;
    }[];
    multiCompiler: () => {
        name: any;
        content: string;
    }[];
}>;
/**
 * Generate mardown documentation. If single file, key `name` will be `main`
 * @param param0 Generator configuration
 * @returns Generated documentation
 */
export declare const generateMarkdown: ({ apiDocPath, template, prepend, multi }: Pick<ConfigurationObj, "template" | "apiDocPath" | "prepend" | "multi">) => Promise<{
    name: any;
    content: string;
}[]>;
/**
 * Generate mardown documentation and create output files
 * @param param0 Generator configuration
 * @returns Generated documentation data
 */
export declare const generateMarkdownFile: ({ apiDocPath, output, template, prepend, multi, createPath }: ConfigurationObj) => Promise<{
    outputFile: string;
    content: string;
} | {
    outputFile: string;
    content: string;
}[]>;
//# sourceMappingURL=generator.d.ts.map