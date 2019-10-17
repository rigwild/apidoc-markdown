import { ApiDocData } from './types';
/**
 * Recursively create an arborescence to the given path
 * @param p Path to follow
 */
export declare const mkdirp: (p: string) => Promise<void>;
/**
 * Make array values unique
 * @param arr Source array of strings
 */
export declare const unique: (arr: string[]) => string[];
/**
 * Check a path exists on the file system
 * @param p Path to check existance from
 * @throws Path does not exist
 */
export declare const pathExists: (p: string) => Promise<boolean>;
/**
 * Import apiDoc's project data
 * @param apiDocPath Path to the apiDoc output directory
 * @returns apiDoc project data
 * @throws Path does not exist
 * @throws Not a JSON-valid file
 */
export declare const importApiDocData: (apiDocPath: string) => Promise<ApiDocData>;
//# sourceMappingURL=utils.d.ts.map