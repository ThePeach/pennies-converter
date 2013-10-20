/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, noarg:true, noempty:true, nonew:true, undef:true, strict:true, browser:true */
/**
 * create default namespace
 * @type {*|{}}
 */
var PENNIES = PENNIES || {};
/**
 * Takes a namespace ns and creates it if it doesn't exist yet.
 *
 * @param {string} ns the namespace
 * @returns {*|{}}
 */
PENNIES.namespace = function (ns) {
    'use strict';

    var parts = ns.split('.'),
        parent = PENNIES,
        i;

    // strip redundant leading global
    if (parts[0] === 'PENNIES') {
        parts = parts.slice(1);
    }

    for (i=0; i < parts.length; i += 1) {
        // create a property if it doesn't exist
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
