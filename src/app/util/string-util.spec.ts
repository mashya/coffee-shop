import { StringUtil } from "./string-util";

describe('StringUtil', () => {
    it('should capitalize string provided', () => {
        expect(StringUtil.capitalize('abc')).toEqual('Abc');
        expect(StringUtil.capitalize('Abc')).toEqual('Abc');
        expect(StringUtil.capitalize('ABc')).toEqual('Abc');
        expect(StringUtil.capitalize('ABC')).toEqual('Abc');
    });
});