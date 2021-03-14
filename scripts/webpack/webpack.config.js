"use strict";
const BASE = require("./webpack.base.config");
const CLIENT = require("./webpack.client.config");

/** */
const SERVER_CONFIG = BASE.__BaseConfig("server");
{
	const config = SERVER_CONFIG;
	BASE.__applyCommonNodeConfigSettings(config);
	config.entry["index"] = { import: `./src/server/index.ts` };
}

module.exports = Object.freeze({
	client: CLIENT.CLIENT_CONFIG,
	server: SERVER_CONFIG,
});