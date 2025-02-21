// Type definitions for webpack-stream 3.2
// Project: https://github.com/shama/webpack-stream
// Definitions by: Ian Clanton-Thuon <https://github.com/iclanton>, Benjamin Lim <https://github.com/bumbleblym>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.7

/// <reference types="node" />

import * as webpack from "webpack";

export = webpackStream;

/**
 * Run webpack with the specified configuration and webpack instance
 *
 * @param config - Webpack configuration
 * @param wp - A webpack object
 * @param callback - A callback with the webpack stats and error objects.
 */
declare function webpackStream(
    config?: webpack.Configuration,
    wp?: typeof webpack,
    callback?: webpack.Compiler.Handler,
): NodeJS.ReadWriteStream;

declare namespace webpackStream {
}
