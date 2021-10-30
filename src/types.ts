export declare interface ConfigurationObject {
  /** apiDoc project JSON data object (`apidoc.json`) file content) */
  apiDocProjectData: Record<string, any>

  /** apiDoc documentation JSON data object (`api_data.json` file content) */
  apiDocApiData: Array<Record<string, any>>

  /** Name of template to be used (`default`, `bitbucket`)
   * or path to EJS template file
   * or raw EJS plain text template
   * (will use default template if ommitted). */
  template?: string

  /** Content to add at the top of the documentation */
  header?: string

  /** Content to add at the bottom of the documentation */
  footer?: string

  /** Content to add before route groups documentation */
  prepend?: string

  /** Generate one documentation output per group */
  multi?: boolean
}

export declare interface ConfigurationObjectCLI {
  /** Input source files path */
  input: string

  /** Output file or directory to write output to */
  output: string

  /** Name of template to be used (`default`, `bitbucket`)
   * or path to EJS template file
   * or raw EJS plain text template
   * (will use default template if ommitted). */
  template?: string

  /** Path to file content to add at the top of the documentation */
  header?: string

  /** Path to file content to add at the bottom of the documentation */
  footer?: string

  /** Path to file content to add before route groups documentation */
  prepend?: string

  /** Output one file per group to the `output` directory */
  multi?: boolean

  /** Recursively create directory arborescence to the `output` directory */
  createPath?: boolean
}

export const availableTemplates = {
  default: 'default',
  bitbucket: 'bitbucket'
} as const
