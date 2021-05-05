module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/auth.tsx":
/*!*********************************!*\
  !*** ./src/components/auth.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recoil */ \"recoil\");\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _stores_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ~/stores/auth */ \"./src/stores/auth.ts\");\n/* harmony import */ var _modules_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/modules/firebase */ \"./src/modules/firebase.ts\");\n\n\n\n\n\n\n\nconst Auth = ({\n  children,\n  shouldLoggedIn\n}) => {\n  const [uid, setAuth] = Object(recoil__WEBPACK_IMPORTED_MODULE_2__[\"useRecoilState\"])(_stores_auth__WEBPACK_IMPORTED_MODULE_3__[\"default\"]);\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(() => {\n    const unsubscribe = _modules_firebase__WEBPACK_IMPORTED_MODULE_4__[\"default\"].auth().onAuthStateChanged(user => {\n      var _user$uid;\n\n      setAuth((_user$uid = user === null || user === void 0 ? void 0 : user.uid) !== null && _user$uid !== void 0 ? _user$uid : null);\n    });\n    return () => {\n      unsubscribe();\n    };\n  });\n\n  if (shouldLoggedIn) {\n    return uid ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n      children: children\n    }, void 0, false) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {}, void 0, false);\n  } else {\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n      children: children\n    }, void 0, false);\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Auth);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hdXRoLnRzeD83MDNiIl0sIm5hbWVzIjpbIkF1dGgiLCJjaGlsZHJlbiIsInNob3VsZExvZ2dlZEluIiwidWlkIiwic2V0QXV0aCIsInVzZVJlY29pbFN0YXRlIiwiYXV0aFN0YXRlIiwidXNlRWZmZWN0IiwidW5zdWJzY3JpYmUiLCJmaXJlYmFzZSIsImF1dGgiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJ1c2VyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQU1BLE1BQU1BLElBQWUsR0FBRyxDQUFDO0FBQUVDLFVBQUY7QUFBWUM7QUFBWixDQUFELEtBQWtDO0FBQ3hELFFBQU0sQ0FBQ0MsR0FBRCxFQUFNQyxPQUFOLElBQWlCQyw2REFBYyxDQUFDQyxvREFBRCxDQUFyQztBQUNBQyx5REFBUyxDQUFDLE1BQU07QUFDZCxVQUFNQyxXQUFXLEdBQUdDLHlEQUFRLENBQUNDLElBQVQsR0FBZ0JDLGtCQUFoQixDQUFvQ0MsSUFBRCxJQUFVO0FBQUE7O0FBQy9EUixhQUFPLGNBQUNRLElBQUQsYUFBQ0EsSUFBRCx1QkFBQ0EsSUFBSSxDQUFFVCxHQUFQLGlEQUFjLElBQWQsQ0FBUDtBQUNELEtBRm1CLENBQXBCO0FBR0EsV0FBTyxNQUFNO0FBQ1hLLGlCQUFXO0FBQ1osS0FGRDtBQUdELEdBUFEsQ0FBVDs7QUFRQSxNQUFJTixjQUFKLEVBQW9CO0FBQ2xCLFdBQU9DLEdBQUcsZ0JBQUc7QUFBQSxnQkFBR0Y7QUFBSCxxQkFBSCxnQkFBcUIsdUpBQS9CO0FBQ0QsR0FGRCxNQUVPO0FBQ0wsd0JBQU87QUFBQSxnQkFBR0E7QUFBSCxxQkFBUDtBQUNEO0FBQ0YsQ0FmRDs7QUFpQmVELG1FQUFmIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvYXV0aC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGQywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSZWNvaWxTdGF0ZSB9IGZyb20gXCJyZWNvaWxcIjtcbmltcG9ydCBhdXRoU3RhdGUgZnJvbSBcIn4vc3RvcmVzL2F1dGhcIjtcbmltcG9ydCBmaXJlYmFzZSBmcm9tIFwifi9tb2R1bGVzL2ZpcmViYXNlXCI7XG5cbmludGVyZmFjZSBQcm9wcyB7XG4gIHNob3VsZExvZ2dlZEluPzogYm9vbGVhbjtcbn1cblxuY29uc3QgQXV0aDogRkM8UHJvcHM+ID0gKHsgY2hpbGRyZW4sIHNob3VsZExvZ2dlZEluIH0pID0+IHtcbiAgY29uc3QgW3VpZCwgc2V0QXV0aF0gPSB1c2VSZWNvaWxTdGF0ZShhdXRoU3RhdGUpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gZmlyZWJhc2UuYXV0aCgpLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xuICAgICAgc2V0QXV0aCh1c2VyPy51aWQgPz8gbnVsbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgfSk7XG4gIGlmIChzaG91bGRMb2dnZWRJbikge1xuICAgIHJldHVybiB1aWQgPyA8PntjaGlsZHJlbn08Lz4gOiA8PjwvPjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gPD57Y2hpbGRyZW59PC8+O1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBdXRoO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/auth.tsx\n");

/***/ }),

/***/ "./src/modules/firebase.ts":
/*!*********************************!*\
  !*** ./src/modules/firebase.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(firebase_app__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(firebase_auth__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst app = firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.apps.length === 0 ? firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializeApp({\n  apiKey: \"AIzaSyBW71BJMzQVlYlp2x1xeHHPl7HODdmRbPY\",\n  authDomain: \"orange-juice-prod.firebaseapp.com\",\n  projectId: \"orange-juice-prod\",\n  storageBucket: \"orange-juice-prod.appspot.com\",\n  messagingSenderId: \"713270469752\",\n  appId: \"1:713270469752:web:b48d4258d4c96ec457f98d\",\n  measurementId: \"G-2YJ9RM0VEH\"\n}) : firebase_app__WEBPACK_IMPORTED_MODULE_0___default.a.apps[0];\n/* harmony default export */ __webpack_exports__[\"default\"] = (app);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvbW9kdWxlcy9maXJlYmFzZS50cz8yNGM3Il0sIm5hbWVzIjpbImFwcCIsImZpcmViYXNlIiwiYXBwcyIsImxlbmd0aCIsImluaXRpYWxpemVBcHAiLCJhcGlLZXkiLCJwcm9jZXNzIiwiYXV0aERvbWFpbiIsInByb2plY3RJZCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImFwcElkIiwibWVhc3VyZW1lbnRJZCIsIk1FQVNVUkVNRU5UX0lEIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVBLE1BQU1BLEdBQUcsR0FDUEMsbURBQVEsQ0FBQ0MsSUFBVCxDQUFjQyxNQUFkLEtBQXlCLENBQXpCLEdBQ0lGLG1EQUFRLENBQUNHLGFBQVQsQ0FBdUI7QUFDckJDLFFBQU0sRUFBRUMseUNBRGE7QUFFckJDLFlBQVUsRUFBRUQsbUNBRlM7QUFHckJFLFdBQVMsRUFBRUYsbUJBSFU7QUFJckJHLGVBQWEsRUFBRUgsK0JBSk07QUFLckJJLG1CQUFpQixFQUFFSixjQUxFO0FBTXJCSyxPQUFLLEVBQUVMLDJDQU5jO0FBT3JCTSxlQUFhLEVBQUVOLGNBQTBCTztBQVBwQixDQUF2QixDQURKLEdBVUlaLG1EQUFRLENBQUNDLElBQVQsQ0FBYyxDQUFkLENBWE47QUFhZUYsa0VBQWYiLCJmaWxlIjoiLi9zcmMvbW9kdWxlcy9maXJlYmFzZS50cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9hcHAnXG5pbXBvcnQgJ2ZpcmViYXNlL2F1dGgnXG5cbmNvbnN0IGFwcCA9XG4gIGZpcmViYXNlLmFwcHMubGVuZ3RoID09PSAwXG4gICAgPyBmaXJlYmFzZS5pbml0aWFsaXplQXBwKHtcbiAgICAgICAgYXBpS2V5OiBwcm9jZXNzLmVudi5BUElfS0VZLFxuICAgICAgICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5BVVRIX0RPTUFJTixcbiAgICAgICAgcHJvamVjdElkOiBwcm9jZXNzLmVudi5QUk9KRUNUX0lELFxuICAgICAgICBzdG9yYWdlQnVja2V0OiBwcm9jZXNzLmVudi5TVE9SQUdFX0JVQ0tFVCxcbiAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk1FU1NBR0lOR19TRU5ERVJfSUQsXG4gICAgICAgIGFwcElkOiBwcm9jZXNzLmVudi5BUFBfSUQsXG4gICAgICAgIG1lYXN1cmVtZW50SWQ6IHByb2Nlc3MuZW52Lk1FQVNVUkVNRU5UX0lELFxuICAgICAgfSlcbiAgICA6IGZpcmViYXNlLmFwcHNbMF07XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/modules/firebase.ts\n");

/***/ }),

/***/ "./src/pages/index.tsx":
/*!*****************************!*\
  !*** ./src/pages/index.tsx ***!
  \*****************************/
/*! exports provided: getStaticProps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStaticProps\", function() { return getStaticProps; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/components/auth */ \"./src/components/auth.tsx\");\n/* harmony import */ var _templates_home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/templates/home */ \"./src/templates/home.tsx\");\n\n\nvar _jsxFileName = \"/Users/teranyan/workspace/OrangeJuiceWeb/src/pages/index.tsx\";\n\n\nconst getStaticProps = async () => {\n  return {\n    props: {}\n  };\n};\n\nconst Page = () => {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"main\", {\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_components_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_templates_home__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 14,\n          columnNumber: 11\n        }, undefined)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 13,\n        columnNumber: 9\n      }, undefined)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 12,\n      columnNumber: 7\n    }, undefined)\n  }, void 0, false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaW5kZXgudHN4PzQxZTAiXSwibmFtZXMiOlsiZ2V0U3RhdGljUHJvcHMiLCJwcm9wcyIsIlBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBO0FBQ0E7QUFFTyxNQUFNQSxjQUFrQyxHQUFHLFlBQVk7QUFDNUQsU0FBTztBQUFFQyxTQUFLLEVBQUU7QUFBVCxHQUFQO0FBQ0QsQ0FGTTs7QUFJUCxNQUFNQyxJQUFrQixHQUFHLE1BQU07QUFDL0Isc0JBQ0U7QUFBQSwyQkFDRTtBQUFBLDZCQUNFLHFFQUFDLHdEQUFEO0FBQUEsK0JBQ0UscUVBQUMsdURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsbUJBREY7QUFTRCxDQVZEOztBQVllQSxtRUFBZiIsImZpbGUiOiIuL3NyYy9wYWdlcy9pbmRleC50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UGFnZSwgR2V0U3RhdGljUHJvcHMgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IEF1dGggZnJvbSAnfi9jb21wb25lbnRzL2F1dGgnXG5pbXBvcnQgVGVtcGxhdGUgZnJvbSAnfi90ZW1wbGF0ZXMvaG9tZSdcblxuZXhwb3J0IGNvbnN0IGdldFN0YXRpY1Byb3BzOiBHZXRTdGF0aWNQcm9wczx7fT4gPSBhc3luYyAoKSA9PiB7XG4gIHJldHVybiB7IHByb3BzOiB7fSB9O1xufTtcblxuY29uc3QgUGFnZTogTmV4dFBhZ2U8e30+ID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8bWFpbj5cbiAgICAgICAgPEF1dGg+XG4gICAgICAgICAgPFRlbXBsYXRlIC8+XG4gICAgICAgIDwvQXV0aD5cbiAgICAgIDwvbWFpbj5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/index.tsx\n");

/***/ }),

/***/ "./src/stores/auth.ts":
/*!****************************!*\
  !*** ./src/stores/auth.ts ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! recoil */ \"recoil\");\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_firebase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/modules/firebase */ \"./src/modules/firebase.ts\");\nvar _firebase$auth$curren;\n\n\n\nconst state = Object(recoil__WEBPACK_IMPORTED_MODULE_0__[\"atom\"])({\n  key: \"auth\",\n  default: (_firebase$auth$curren = _modules_firebase__WEBPACK_IMPORTED_MODULE_1__[\"default\"].auth().currentUser) === null || _firebase$auth$curren === void 0 ? void 0 : _firebase$auth$curren.uid\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (state);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmVzL2F1dGgudHM/MTIzNyJdLCJuYW1lcyI6WyJzdGF0ZSIsImF0b20iLCJrZXkiLCJkZWZhdWx0IiwiZmlyZWJhc2UiLCJhdXRoIiwiY3VycmVudFVzZXIiLCJ1aWQiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFFQSxNQUFNQSxLQUFLLEdBQUdDLG1EQUFJLENBQVM7QUFDekJDLEtBQUcsRUFBRSxNQURvQjtBQUV6QkMsU0FBTywyQkFBRUMseURBQVEsQ0FBQ0MsSUFBVCxHQUFnQkMsV0FBbEIsMERBQUUsc0JBQTZCQztBQUZiLENBQVQsQ0FBbEI7QUFLZVAsb0VBQWYiLCJmaWxlIjoiLi9zcmMvc3RvcmVzL2F1dGgudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdG9tIH0gZnJvbSBcInJlY29pbFwiO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gXCJ+L21vZHVsZXMvZmlyZWJhc2VcIjtcblxuY29uc3Qgc3RhdGUgPSBhdG9tPHN0cmluZz4oe1xuICBrZXk6IFwiYXV0aFwiLFxuICBkZWZhdWx0OiBmaXJlYmFzZS5hdXRoKCkuY3VycmVudFVzZXI/LnVpZCxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzdGF0ZTsgXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/stores/auth.ts\n");

/***/ }),

/***/ "./src/templates/home.tsx":
/*!********************************!*\
  !*** ./src/templates/home.tsx ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _stores_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/stores/auth */ \"./src/stores/auth.ts\");\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recoil */ \"recoil\");\n/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _modules_firebase__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ~/modules/firebase */ \"./src/modules/firebase.ts\");\n/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/functions */ \"firebase/functions\");\n/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(firebase_functions__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! nookies */ \"nookies\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_6__);\n\n\nvar _jsxFileName = \"/Users/teranyan/workspace/OrangeJuiceWeb/src/templates/home.tsx\";\n\n\n\n\n\n\n\nconst Template = () => {\n  const uid = Object(recoil__WEBPACK_IMPORTED_MODULE_3__[\"useRecoilValue\"])(_stores_auth__WEBPACK_IMPORTED_MODULE_2__[\"default\"]);\n  const {\n    0: email,\n    1: setEmail\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])('');\n  const {\n    0: password,\n    1: setPassword\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])('');\n  const signIn = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(() => {\n    _modules_firebase__WEBPACK_IMPORTED_MODULE_4__[\"default\"].auth().signInWithEmailAndPassword(email, password);\n  }, [email, password]);\n  const getToken = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useCallback\"])(async () => {\n    const res = await _modules_firebase__WEBPACK_IMPORTED_MODULE_4__[\"default\"].functions(\"asia-northeast1\").httpsCallable(\"http-sessionCookie\")();\n    Object(nookies__WEBPACK_IMPORTED_MODULE_6__[\"setCookie\"])(null, \"Cloud-CDN-Cookie\", res.data.token, {\n      domain: res.data.domain,\n      path: res.data.path,\n      expires: new Date(res.data.expires)\n    });\n  }, []);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: uid ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        onClick: getToken,\n        children: \"get token\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 20,\n        columnNumber: 3\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"audio\", {\n        controls: true,\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"source\", {\n          src: \"https://media.orange-juice.app/video/private/XCfWJkbGGvT08umQBaMl5ufL10u2/test.mp3\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 22,\n          columnNumber: 5\n        }, undefined)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 21,\n        columnNumber: 3\n      }, undefined)]\n    }, void 0, true) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"input\", {\n        type: \"mail\",\n        placeholder: \"mail\",\n        onChange: e => setEmail(e.target.value),\n        value: email\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 25,\n        columnNumber: 3\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"input\", {\n        type: \"password\",\n        placeholder: \"password\",\n        onChange: e => setPassword(e.target.value),\n        value: password\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 26,\n        columnNumber: 3\n      }, undefined), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"button\", {\n        onClick: signIn,\n        children: \"signin\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 27,\n        columnNumber: 3\n      }, undefined)]\n    }, void 0, true)\n  }, void 0, false);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Template);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGVzL2hvbWUudHN4PzkyZWYiXSwibmFtZXMiOlsiVGVtcGxhdGUiLCJ1aWQiLCJ1c2VSZWNvaWxWYWx1ZSIsImF1dGhTdGF0ZSIsImVtYWlsIiwic2V0RW1haWwiLCJ1c2VTdGF0ZSIsInBhc3N3b3JkIiwic2V0UGFzc3dvcmQiLCJzaWduSW4iLCJ1c2VDYWxsYmFjayIsImZpcmViYXNlIiwiYXV0aCIsInNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiZ2V0VG9rZW4iLCJyZXMiLCJmdW5jdGlvbnMiLCJodHRwc0NhbGxhYmxlIiwic2V0Q29va2llIiwiZGF0YSIsInRva2VuIiwiZG9tYWluIiwicGF0aCIsImV4cGlyZXMiLCJEYXRlIiwiZSIsInRhcmdldCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU1BLFFBQVksR0FBRyxNQUFNO0FBQ3pCLFFBQU1DLEdBQUcsR0FBR0MsNkRBQWMsQ0FBQ0Msb0RBQUQsQ0FBMUI7QUFDQSxRQUFNO0FBQUEsT0FBQ0MsS0FBRDtBQUFBLE9BQVFDO0FBQVIsTUFBb0JDLHNEQUFRLENBQUMsRUFBRCxDQUFsQztBQUNBLFFBQU07QUFBQSxPQUFDQyxRQUFEO0FBQUEsT0FBV0M7QUFBWCxNQUEwQkYsc0RBQVEsQ0FBQyxFQUFELENBQXhDO0FBQ0EsUUFBTUcsTUFBTSxHQUFHQyx5REFBVyxDQUFDLE1BQUk7QUFDN0JDLDZEQUFRLENBQUNDLElBQVQsR0FBZ0JDLDBCQUFoQixDQUEyQ1QsS0FBM0MsRUFBa0RHLFFBQWxEO0FBQ0QsR0FGeUIsRUFFeEIsQ0FBQ0gsS0FBRCxFQUFRRyxRQUFSLENBRndCLENBQTFCO0FBR0EsUUFBTU8sUUFBUSxHQUFHSix5REFBVyxDQUFDLFlBQVU7QUFDckMsVUFBTUssR0FBRyxHQUFHLE1BQU1KLHlEQUFRLENBQUNLLFNBQVQsQ0FBbUIsaUJBQW5CLEVBQXNDQyxhQUF0QyxDQUFvRCxvQkFBcEQsR0FBbEI7QUFDQUMsNkRBQVMsQ0FBQyxJQUFELEVBQU8sa0JBQVAsRUFBMkJILEdBQUcsQ0FBQ0ksSUFBSixDQUFTQyxLQUFwQyxFQUEyQztBQUFFQyxZQUFNLEVBQUVOLEdBQUcsQ0FBQ0ksSUFBSixDQUFTRSxNQUFuQjtBQUEyQkMsVUFBSSxFQUFFUCxHQUFHLENBQUNJLElBQUosQ0FBU0csSUFBMUM7QUFBZ0RDLGFBQU8sRUFBRSxJQUFJQyxJQUFKLENBQVNULEdBQUcsQ0FBQ0ksSUFBSixDQUFTSSxPQUFsQjtBQUF6RCxLQUEzQyxDQUFUO0FBQ0QsR0FIMkIsRUFHMUIsRUFIMEIsQ0FBNUI7QUFJQSxzQkFBTztBQUFBLGNBQUd0QixHQUFHLGdCQUFHO0FBQUEsOEJBQ2hCO0FBQVEsZUFBTyxFQUFFYSxRQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEZ0IsZUFFaEI7QUFBUSxnQkFBUSxNQUFoQjtBQUFBLCtCQUNFO0FBQVEsYUFBRyxFQUFDO0FBQVo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRmdCO0FBQUEsb0JBQUgsZ0JBS047QUFBQSw4QkFDUDtBQUFPLFlBQUksRUFBQyxNQUFaO0FBQW1CLG1CQUFXLEVBQUMsTUFBL0I7QUFBc0MsZ0JBQVEsRUFBRVcsQ0FBQyxJQUFFcEIsUUFBUSxDQUFDb0IsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVYsQ0FBM0Q7QUFBNkUsYUFBSyxFQUFFdkI7QUFBcEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFETyxlQUVQO0FBQU8sWUFBSSxFQUFDLFVBQVo7QUFBdUIsbUJBQVcsRUFBQyxVQUFuQztBQUE4QyxnQkFBUSxFQUFFcUIsQ0FBQyxJQUFFakIsV0FBVyxDQUFDaUIsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLEtBQVYsQ0FBdEU7QUFBd0YsYUFBSyxFQUFFcEI7QUFBL0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFGTyxlQUdQO0FBQVEsZUFBTyxFQUFFRSxNQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFITztBQUFBO0FBTEEsbUJBQVA7QUFVRCxDQXJCRDs7QUF1QmVULHVFQUFmIiwiZmlsZSI6Ii4vc3JjL3RlbXBsYXRlcy9ob21lLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZDLCB1c2VDYWxsYmFjaywgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBhdXRoU3RhdGUgZnJvbSAnfi9zdG9yZXMvYXV0aCdcbmltcG9ydCB7IHVzZVJlY29pbFZhbHVlIH0gZnJvbSAncmVjb2lsJ1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ34vbW9kdWxlcy9maXJlYmFzZSdcbmltcG9ydCAnZmlyZWJhc2UvZnVuY3Rpb25zJ1xuaW1wb3J0IHtzZXRDb29raWV9IGZyb20gJ25vb2tpZXMnXG5cbmNvbnN0IFRlbXBsYXRlOiBGQyA9ICgpID0+IHtcbiAgY29uc3QgdWlkID0gdXNlUmVjb2lsVmFsdWUoYXV0aFN0YXRlKVxuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKVxuICBjb25zdCBzaWduSW4gPSB1c2VDYWxsYmFjaygoKT0+e1xuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChlbWFpbCwgcGFzc3dvcmQpO1xuICB9LFtlbWFpbCwgcGFzc3dvcmRdKVxuICBjb25zdCBnZXRUb2tlbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpPT57XG4gICAgY29uc3QgcmVzID0gYXdhaXQgZmlyZWJhc2UuZnVuY3Rpb25zKFwiYXNpYS1ub3J0aGVhc3QxXCIpLmh0dHBzQ2FsbGFibGUoXCJodHRwLXNlc3Npb25Db29raWVcIikoKVxuICAgIHNldENvb2tpZShudWxsLCBcIkNsb3VkLUNETi1Db29raWVcIiwgcmVzLmRhdGEudG9rZW4sIHsgZG9tYWluOiByZXMuZGF0YS5kb21haW4sIHBhdGg6IHJlcy5kYXRhLnBhdGgsIGV4cGlyZXM6IG5ldyBEYXRlKHJlcy5kYXRhLmV4cGlyZXMpLCB9KVxuICB9LFtdKVxuICByZXR1cm4gPD57dWlkID8gPD5cbiAgPGJ1dHRvbiBvbkNsaWNrPXtnZXRUb2tlbn0+Z2V0IHRva2VuPC9idXR0b24+XG4gIDxhdWRpbyAgY29udHJvbHM+XG4gICAgPHNvdXJjZSBzcmM9XCJodHRwczovL21lZGlhLm9yYW5nZS1qdWljZS5hcHAvdmlkZW8vcHJpdmF0ZS9YQ2ZXSmtiR0d2VDA4dW1RQmFNbDV1ZkwxMHUyL3Rlc3QubXAzXCIgLz5cbiAgPC9hdWRpbz5cbiAgIDwvPiA6IDw+XG4gIDxpbnB1dCB0eXBlPVwibWFpbFwiIHBsYWNlaG9sZGVyPVwibWFpbFwiIG9uQ2hhbmdlPXtlPT5zZXRFbWFpbChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXtlbWFpbH0vPlxuICA8aW5wdXQgdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCJwYXNzd29yZFwiIG9uQ2hhbmdlPXtlPT5zZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9IHZhbHVlPXtwYXNzd29yZH0vPlxuICA8YnV0dG9uIG9uQ2xpY2s9e3NpZ25Jbn0+c2lnbmluPC9idXR0b24+XG4gIDwvPn08Lz5cbn0gXG5cbmV4cG9ydCBkZWZhdWx0IFRlbXBsYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/templates/home.tsx\n");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase/app\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9hcHBcIj9hZDQ4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImZpcmViYXNlL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2FwcFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///firebase/app\n");

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase/auth\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9hdXRoXCI/Mjc2NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJmaXJlYmFzZS9hdXRoLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmlyZWJhc2UvYXV0aFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///firebase/auth\n");

/***/ }),

/***/ "firebase/functions":
/*!*************************************!*\
  !*** external "firebase/functions" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase/functions\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmaXJlYmFzZS9mdW5jdGlvbnNcIj8wNjMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImZpcmViYXNlL2Z1bmN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZpcmViYXNlL2Z1bmN0aW9uc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///firebase/functions\n");

/***/ }),

/***/ "nookies":
/*!**************************!*\
  !*** external "nookies" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"nookies\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJub29raWVzXCI/ZDk3NCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJub29raWVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibm9va2llc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///nookies\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "recoil":
/*!*************************!*\
  !*** external "recoil" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"recoil\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWNvaWxcIj82YTYwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlY29pbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlY29pbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///recoil\n");

/***/ })

/******/ });