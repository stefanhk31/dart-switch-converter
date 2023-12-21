const sinon = require("sinon");
var proxyquire = require("proxyquire");
import * as assert from "assert";
import { afterEach, beforeEach } from "mocha";


suite('convert switch command', () => {
    let vscodeStub: any;
    let command: any;

    beforeEach(() => {
        vscodeStub = {
            window: {
                activeTextEditor: {
                    document: {
                        getText: sinon.stub(),
                    },
                    edit: sinon.stub(),
                }
            }
        };

        command = proxyquire("../../../commands/convert-switch", {
            vscode: vscodeStub
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    test('returns empty when no active text editor', () => {
        vscodeStub.window.activeTextEditor = undefined;

        assert.strictEqual(command.convertSwitch(), '');
    });

    test('coverts simple return enum', () => {
        vscodeStub.window.activeTextEditor.document.getText.returns(
            `
            switch (enumVal) {
                case MyEnum.first:
                  return 'first';
                case MyEnum.second:
                  return 'second';
                case MyEnum.third:
                  return 'third';
                default:
                  return 'default';
              }  
            `
        );

        assert.equal(command.convertSwitch(),
            `
              return switch (enumVal) {
                MyEnum.first => 'first',
                MyEnum.second => 'second',
                MyEnum.third => 'third',
                _ => 'default',
              };
            `
        );
    });
});