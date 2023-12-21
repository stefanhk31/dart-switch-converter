const sinon = require("sinon");
var proxyquire = require("proxyquire");

import * as assert from 'assert';
import * as vscode from 'vscode';
import { afterEach, beforeEach } from "mocha";
import { convertSwitch } from '../../commands/convert-switch';

suite('activate', () => {
	let vscodeStub: any;
	let extension: any;
	let context: any;
	
	beforeEach(() => {
		vscodeStub = {
			commands: {
				registerCommand: sinon.stub(),
				executeCommand: sinon.stub(),
			},
		};

		extension = proxyquire("../../extension", {
			vscode: vscodeStub
		});
		context = { subscriptions: [] }; 
	});

	afterEach(() => {
		sinon.restore();
	});

	test('does not throw', async () => {
		const extension = vscode.extensions.getExtension(
			"shodgeskluck.dart-switch-converter"
		) as vscode.Extension<any>;

		assert.doesNotThrow(async () => await extension.activate());
	});

	test('registers convertSwitch', () => {
		extension.activate(context);

		sinon.assert.calledWith(
			vscodeStub.commands.registerCommand,
			"dart-switch-converter.convertSwitch",
			convertSwitch,
		);
	});
});
