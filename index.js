#!/usr/bin/env node

"use strict";

var fs = require('fs'),
	ejs = require('ejs'),
	_ = require('underscore');

var argv = require('optimist')
	.usage('Generate documentation from apidoc data.\nUsage: apidoc-markdown -p [path] -o [output file]')
	.demand(['path', 'output'])
	.alias({
		'path': 'p',
		'output': 'o',
		'template': 't'
	})
	.describe({
		'path': 'Path to generated apidoc output. Where api_data.json & api_project.json resides.',
		'output': 'Output file to write.',
		'template': 'Path to EJS template file, if not specified default template will be used.',
		'prepend': 'Prepend file after TOC.'
	}).argv;

ejs.filters.undef = function (obj) {
	return obj ? obj : '';
};

ejs.filters.mlink = function (obj) {
	return (obj || '').toLowerCase().replace(/\s/g, '-');
};

var tmplFile = argv.template ? argv.template : __dirname + '/templates/default.md',
	apiData = JSON.parse(fs.readFileSync(argv.path + '/api_data.json')),
	projData = JSON.parse(fs.readFileSync(argv.path + '/api_project.json')),
	template = ejs.compile(fs.readFileSync(tmplFile).toString());

apiData = _.filter(apiData, function (entry) {
	return entry.type;
});

var apiByGroup = _.groupBy(apiData, function (entry) {
	return entry.group;
});

var apiByGroupAndName = {};
Object.keys(apiByGroup).forEach(function (key) {
	apiByGroupAndName[key] = _.groupBy(apiByGroup[key], function (entry) {
		return entry.name;
	});
});

var data = {
	project: projData,
	data: apiByGroupAndName
};

data.prepend = argv.prepend ? fs.readFileSync(argv.prepend).toString() : null;
fs.writeFileSync(argv.output, template(data));
console.log('Wrote apidoc-markdown template output to: ' + argv.output);