/* eslint-disable import/no-extraneous-dependencies */
const assert = require('assert');
const chai = require('chai');
const request = require('supertest');
const sinon = require('sinon');

const { expect } = chai;
const spies = require('chai-spies');

chai.use(spies);

global.chai = chai;
global.assert = assert;
global.expect = expect;
global.request = request;
global.sinon = sinon;
