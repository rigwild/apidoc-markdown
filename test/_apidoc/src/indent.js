/**
 * @apiDefine  indent Indent
 */

/**
 * @api {get} /indent/word Indent a word
 * @apiGroup indent
 * @apiDescription text.
 */

/**
 * @api {get} /indent/trim/single Trim single line
 * @apiGroup indent
 * @apiDescription    Text line 1 (Begin: 3xSpaces (3 removed), End: 1xSpace). 
 */

/**
 * @api {get} /indent/trim/multi/spaces Trim multi line (spaces)
 * @apiGroup indent
 * @apiDescription     Text line 1 (Begin: 4xSpaces (3 removed)).
 *    Text line 2 (Begin: 3xSpaces (3 removed), End: 2xSpaces).  
 */

/**
 * @api {get} /indent/trim/multi/tabs Trim multi line (tabs)
 * @apiGroup indent
 * @apiDescription 			Text line 1 (Begin: 3xTab (2 removed)).
 * 		Text line 2 (Begin: 2x Tab (2 removed), End: 1xTab).	
 */

/**
 * @api {get} /indent/trim/multi/tabs/and/space Trim multi line (tabs and space)
 * @apiGroup indent
 * @apiDescription 	  Text line 1 (Begin: 1xTab, 2xSpaces).
 *    Text line 2 (Begin: 3xSpaces, End: 1xTab).	
 */
