export declare interface ConfigurationObj {
    /** Path to generated apiDoc output directory. Where `api_data.json` and `api_project.json` resides */
    apiDocPath: string;
    /** Output file or directory to write output to */
    output: string;
    /** Path to EJS template file './templates/default.md' */
    template: string;
    /** Path to file content to add before route groups documentation */
    prepend?: string | null;
    /** Output one file per group to the `output` directory */
    multi?: boolean;
    /** Recursively create directory arborescence to the `output` directory */
    createPath?: boolean;
}
export declare interface ApiDocData {
    /** apiDoc project's data */
    projectData: {
        [key: string]: any;
    };
    /** apiDoc documentation data */
    apiData: {
        [key: string]: any;
    }[];
}
//# sourceMappingURL=types.d.ts.map