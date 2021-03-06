'use strict';

var _index = require('../index');

var _reducer = require('../reducer');

var _redux = require('redux');

var _jsCookie = require('js-cookie');

var Cookies = _interopRequireWildcard(_jsCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

jest.mock('localforage');

var localforage = require('localforage');
var __setError = localforage.__setError,
    __setSession = localforage.__setSession,
    __setUser = localforage.__setUser;


describe('API functions', function () {
  var store = void 0;
  var user = { email: 'test@test.com', firstName: 'test', lastName: 'test' };
  var session = { token: '12341234' };
  beforeEach(function (done) {
    store = (0, _redux.createStore)(_index.sessionReducer, _reducer.initialState);
    var options = { driver: 'LOCALFORAGE' };
    _index.sessionService.initSessionService(store, options).then(done);
  });

  describe('refreshFromLocalStorage', function () {
    describe('without any item in the storage', function () {
      test('change authenticated flag to false and the user to empty object', function (done) {
        // wait for change the redux store
        var unsubscribe = store.subscribe(function () {
          var state = store.getState();
          expect(state.authenticated).toEqual(false);
          expect(state.user).toEqual({});
          unsubscribe();
          done();
        });

        _index.sessionService.refreshFromLocalStorage();
      });
    });

    describe('with session and without user in the storage', function () {
      test('change authenticated flag to true', function (done) {
        __setSession(session);

        // wait for change the redux store
        var unsubscribe = store.subscribe(function () {
          var state = store.getState();
          expect(state.authenticated).toEqual(true);
          expect(state.user).toEqual({});
          unsubscribe();
          done();
        });

        _index.sessionService.refreshFromLocalStorage();
      });
    });

    describe('with session and user in the storage', function () {
      test('change authenticated flag to true and save the user', function (done) {
        __setUser(user);
        __setSession(session);

        // wait for change the redux store
        var unsubscribe = store.subscribe(function () {
          var state = store.getState();
          expect(state.authenticated).toEqual(true);
          // wait to change the user
          var user = state.user;

          if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
            expect(state.user).toMatchObject(user);
            unsubscribe();
            done();
          }
        });

        _index.sessionService.refreshFromLocalStorage();
      });

      describe('with invalid session', function () {
        beforeEach(function (done) {
          var options = { driver: 'LOCALFORAGE', validateSession: function validateSession() {
              return false;
            } };
          _index.sessionService.initSessionService(store, options).then(done);
        });

        test('change to invalid session', function (done) {
          __setUser(user);
          __setSession(session);

          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            var state = store.getState();
            expect(state.invalid).toEqual(true);
            unsubscribe();
            done();
          });

          _index.sessionService.refreshFromLocalStorage();
        });
      });
    });
  });

  describe('checkAuth', function () {
    var nextState = void 0;
    var replace = void 0;
    var next = void 0;
    beforeEach(function () {
      nextState = { location: { pathname: 'test' } };
      replace = jest.fn();
      next = jest.fn();
    });

    describe('with logged user', function () {
      beforeEach(function () {
        __setUser(user);
        __setSession(session);
      });

      test('does call next function', function (done) {
        var next = jest.fn(function () {
          expect(next).toHaveBeenCalled();
          done();
        });
        _index.sessionService.checkAuth(nextState, replace, next);
      });

      describe('with option refreshOnCheckAuth enable', function () {
        test('change authenticated flag to true and save the user', function (done) {
          _index.sessionService.setOptions(store, { refreshOnCheckAuth: true });
          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            var state = store.getState();
            expect(state.authenticated).toEqual(true);
            // wait to change the user
            var user = state.user;

            if (!(Object.keys(user).length === 0 && user.constructor === Object)) {
              expect(state.user).toMatchObject(user);
              unsubscribe();
              done();
            }
          });

          _index.sessionService.checkAuth(nextState, replace, next);
        });
      });
    });

    describe('without logged user', function () {
      beforeEach(function () {
        __setUser(undefined);
        __setSession(undefined);
        _index.sessionService.setOptions(store, { refreshOnCheckAuth: false, redirectPath: 'redirectionPath' });
      });

      test('does call replace function', function (done) {
        var replace = jest.fn(function () {
          expect(replace).toHaveBeenCalled();
          done();
        });
        _index.sessionService.checkAuth(nextState, replace, next);
      });

      test('does redirect to the redirectPath', function (done) {
        var expectedArg = {
          pathname: 'redirectionPath',
          state: { nextPathname: nextState.location.pathname }
        };
        var replace = jest.fn(function () {
          expect(replace).toHaveBeenCalledWith(expectedArg);
          done();
        });
        _index.sessionService.checkAuth(nextState, replace, next);
      });

      describe('with option refreshOnCheckAuth enable', function () {
        test('change authenticated flag to false and the user to empty object', function (done) {
          _index.sessionService.setOptions(store, { refreshOnCheckAuth: true });
          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            var state = store.getState();
            expect(state.authenticated).toEqual(false);
            // wait to empty the user
            var user = state.user;

            if (Object.keys(user).length === 0 && user.constructor === Object) {
              expect(state.user).toEqual({});
              unsubscribe();
              done();
            }
          });

          _index.sessionService.checkAuth(nextState, replace, next);
        });
      });
    });
  });

  describe('saveSession', function () {
    describe('with localforage', function () {
      describe('localforage returns success', function () {
        test('change authenticated flag to true value', function (done) {
          __setError(false);
          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            expect(store.getState().authenticated).toEqual(true);
            unsubscribe();
            done();
          });

          _index.sessionService.saveSession(session);
        });
      });

      describe('localforage returns error', function () {
        beforeEach(function () {
          __setError(true);
        });

        test('call the cookies service to save the data', function () {
          Cookies.set = jest.fn(function () {
            expect(Cookies.set).toHaveBeenCalled();
          });
          _index.sessionService.saveSession(session);
        });
      });
    });

    describe('with cookies', function () {
      beforeEach(function () {
        _index.sessionService.setOptions(store, { driver: 'COOKIES' });
      });

      afterEach(function () {
        _index.sessionService.setOptions(store);
      });

      test('change authenticated flag to true value', function (done) {
        // wait for change the redux store
        var unsubscribe = store.subscribe(function () {
          expect(store.getState().authenticated).toEqual(true);
          unsubscribe();
          done();
        });

        _index.sessionService.saveSession(session);
      });
    });
  });

  describe('loadSession', function () {
    describe('with localforage', function () {
      describe('localforage returns success', function () {
        test('return the correct value of the session stored', function () {
          __setSession(session);
          return _index.sessionService.loadSession().then(function (currentSession) {
            expect(currentSession).toMatchObject(session);
          });
        });
      });

      describe('localforage returns error', function () {
        test('return an error', function () {
          __setSession(undefined);
          return _index.sessionService.loadSession().catch(function (error) {
            expect(error).toEqual('Session not found');
          });
        });
      });
    });

    describe('with cookies', function () {
      beforeEach(function () {
        _index.sessionService.setOptions(store, { driver: 'COOKIES' });
      });

      afterEach(function () {
        _index.sessionService.setOptions(store);
      });

      test('return the correct value of the session stored', function () {
        return _index.sessionService.loadSession().then(function (currentSession) {
          expect(currentSession).toMatchObject(session);
        });
      });
    });
  });

  describe('deleteSession', function () {
    test('change authenticated flag to false value', function (done) {
      // wait for change the redux store
      var unsubscribe = store.subscribe(function () {
        expect(store.getState().authenticated).toEqual(false);
        unsubscribe();
        done();
      });

      _index.sessionService.deleteSession();
    });
  });

  describe('saveUser', function () {
    describe('with localforage', function () {
      describe('localforage returns success', function () {
        test('change user in store to the user data', function (done) {
          __setError(false);
          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            expect(store.getState().user).toMatchObject(user);
            unsubscribe();
            done();
          });

          _index.sessionService.saveUser(user);
        });
      });

      describe('localforage returns error', function () {
        test('change user in store to an empty object', function (done) {
          __setError(true);
          // wait for change the redux store
          var unsubscribe = store.subscribe(function () {
            expect(store.getState().user).toMatchObject({});
            unsubscribe();
            done();
          });

          _index.sessionService.saveUser(user);
        });
      });
    });

    describe('with cookies', function () {
      beforeEach(function () {
        _index.sessionService.setOptions(store, { driver: 'COOKIES' });
      });

      afterEach(function () {
        _index.sessionService.setOptions(store);
      });

      test('change user in store to the user data', function (done) {
        // wait for change the redux store
        var unsubscribe = store.subscribe(function () {
          expect(store.getState().user).toMatchObject(user);
          unsubscribe();
          done();
        });

        _index.sessionService.saveUser(user);
      });
    });
  });

  describe('loadUser', function () {
    describe('with localforage', function () {
      describe('localforage returns success', function () {
        test('return the correct value of the user stored', function () {
          __setUser(user);
          return _index.sessionService.loadUser().then(function (currentUser) {
            expect(currentUser).toMatchObject(user);
          });
        });
      });

      describe('localforage returns error', function () {
        test('return an error', function () {
          __setUser(undefined);
          return _index.sessionService.loadUser().catch(function (error) {
            expect(error).toEqual('User not found');
          });
        });
      });
    });

    describe('with cookies', function () {
      beforeEach(function () {
        _index.sessionService.setOptions(store, { driver: 'COOKIES' });
      });

      afterEach(function () {
        _index.sessionService.setOptions(store);
      });

      test('return the correct value of the user stored', function () {
        return _index.sessionService.loadUser().then(function (currentUser) {
          expect(currentUser).toMatchObject(user);
        });
      });
    });
  });

  describe('deleteUser', function () {
    test('change user in store to an empty object', function (done) {
      // wait for change the redux store
      var unsubscribe = store.subscribe(function () {
        expect(store.getState().user).toEqual({});
        unsubscribe();
        done();
      });

      _index.sessionService.deleteUser();
    });
  });
});