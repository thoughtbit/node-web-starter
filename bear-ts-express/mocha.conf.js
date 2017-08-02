/*
This file is loaded in mocha.opts and is used only for loading appropriate modules into global scope
when running tests to reduce boilerplate
*/

'use strict';

var chai = require('chai');
global.expect = chai.expect;

