define(function (require) {
    'use strict';

    var withState = require('lib/with-batch');

    describe('withBatch', function () {

        describe('batch', function () {
            it('should call passed functions later', function () {
                var it = {};
                withState.call(it);
                var spy = jasmine.createSpy('batch call');

                it.batch(spy);

                waits(50);
                runs(function () {
                    expect(spy).toHaveBeenCalled();
                });
            });

            it('should call with correct context', function () {
                var it = {};
                withState.call(it);
                var spy = jasmine.createSpy('batch context').andCallFake(function () {
                    expect(this).toBe(it);
                });

                it.batch(spy);

                waits(50);
                runs(function () {
                    expect(spy).toHaveBeenCalled();
                });
            });
        });

        describe('batchify', function () {
            it('should make a function', function () {
                var it = {};
                it.spy = jasmine.createSpy('batchify');
                withState.call(it);

                expect(typeof it.batchify('spy')).toBe('function');
            });

            it('should batch the selected method when called', function () {
                var it = {};
                it.spy = jasmine.createSpy('batchify call');
                withState.call(it);

                var fn = it.batchify('spy');
                fn();

                waits(50);
                runs(function () {
                    expect(it.spy).toHaveBeenCalled();
                });
            });

            it('throws if method does not exist', function () {
                var it = {};
                withState.call(it);

                expect(function () {
                   it.batchify('spy');
                }).toThrow();
            });
        });

    });
});

