module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/api/session.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/pages/api/session.ts":
/*!**********************************!*\
  !*** ./src/pages/api/session.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\n\n/**\n * This sets `cookie` using the `res` object\n */\nconst setCookie = (res, name, value, options = {}) => {\n  const stringValue = typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value);\n\n  if ('maxAge' in options) {\n    options.expires = new Date(Date.now() + options.maxAge);\n    options.maxAge /= 1000;\n  }\n\n  res.setHeader('Set-Cookie', Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"])(name, String(stringValue), options));\n};\n\nconst handler = (req, res) => {\n  // Calling our pure function using the `res` object, it will add the `set-cookie` header\n  setCookie(res, 'Next.js', 'api-middleware!'); // Return the `set-cookie` header so we can display it in the browser and show that it works!\n\n  res.end(res.getHeader('Set-Cookie'));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (handler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvYXBpL3Nlc3Npb24udHM/Njk4OSJdLCJuYW1lcyI6WyJzZXRDb29raWUiLCJyZXMiLCJuYW1lIiwidmFsdWUiLCJvcHRpb25zIiwic3RyaW5nVmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwiU3RyaW5nIiwiZXhwaXJlcyIsIkRhdGUiLCJub3ciLCJtYXhBZ2UiLCJzZXRIZWFkZXIiLCJzZXJpYWxpemUiLCJoYW5kbGVyIiwicmVxIiwiZW5kIiwiZ2V0SGVhZGVyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFHQTtBQUNBO0FBQ0E7QUFFQSxNQUFNQSxTQUFTLEdBQUcsQ0FDaEJDLEdBRGdCLEVBRWhCQyxJQUZnQixFQUdoQkMsS0FIZ0IsRUFJaEJDLE9BQStCLEdBQUcsRUFKbEIsS0FLYjtBQUNILFFBQU1DLFdBQVcsR0FDZixPQUFPRixLQUFQLEtBQWlCLFFBQWpCLEdBQTRCLE9BQU9HLElBQUksQ0FBQ0MsU0FBTCxDQUFlSixLQUFmLENBQW5DLEdBQTJESyxNQUFNLENBQUNMLEtBQUQsQ0FEbkU7O0FBR0EsTUFBSSxZQUFZQyxPQUFoQixFQUF5QjtBQUN2QkEsV0FBTyxDQUFDSyxPQUFSLEdBQWtCLElBQUlDLElBQUosQ0FBU0EsSUFBSSxDQUFDQyxHQUFMLEtBQWFQLE9BQU8sQ0FBQ1EsTUFBOUIsQ0FBbEI7QUFDQVIsV0FBTyxDQUFDUSxNQUFSLElBQWtCLElBQWxCO0FBQ0Q7O0FBRURYLEtBQUcsQ0FBQ1ksU0FBSixDQUFjLFlBQWQsRUFBNEJDLHdEQUFTLENBQUNaLElBQUQsRUFBT00sTUFBTSxDQUFDSCxXQUFELENBQWIsRUFBNEJELE9BQTVCLENBQXJDO0FBQ0QsQ0FmRDs7QUFpQkEsTUFBTVcsT0FBdUIsR0FBRyxDQUFDQyxHQUFELEVBQU1mLEdBQU4sS0FBYztBQUM1QztBQUNBRCxXQUFTLENBQUNDLEdBQUQsRUFBTSxTQUFOLEVBQWlCLGlCQUFqQixDQUFULENBRjRDLENBRzVDOztBQUNBQSxLQUFHLENBQUNnQixHQUFKLENBQVFoQixHQUFHLENBQUNpQixTQUFKLENBQWMsWUFBZCxDQUFSO0FBQ0QsQ0FMRDs7QUFPZUgsc0VBQWYiLCJmaWxlIjoiLi9zcmMvcGFnZXMvYXBpL3Nlc3Npb24udHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXJpYWxpemUsIENvb2tpZVNlcmlhbGl6ZU9wdGlvbnMgfSBmcm9tICdjb29raWUnXG5pbXBvcnQgeyBOZXh0QXBpUmVzcG9uc2UsIE5leHRBcGlIYW5kbGVyIH0gZnJvbSAnbmV4dCdcblxuLyoqXG4gKiBUaGlzIHNldHMgYGNvb2tpZWAgdXNpbmcgdGhlIGByZXNgIG9iamVjdFxuICovXG5cbmNvbnN0IHNldENvb2tpZSA9IChcbiAgcmVzOiBOZXh0QXBpUmVzcG9uc2UsXG4gIG5hbWU6IHN0cmluZyxcbiAgdmFsdWU6IHVua25vd24sXG4gIG9wdGlvbnM6IENvb2tpZVNlcmlhbGl6ZU9wdGlvbnMgPSB7fVxuKSA9PiB7XG4gIGNvbnN0IHN0cmluZ1ZhbHVlID1cbiAgICB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnID8gJ2o6JyArIEpTT04uc3RyaW5naWZ5KHZhbHVlKSA6IFN0cmluZyh2YWx1ZSlcblxuICBpZiAoJ21heEFnZScgaW4gb3B0aW9ucykge1xuICAgIG9wdGlvbnMuZXhwaXJlcyA9IG5ldyBEYXRlKERhdGUubm93KCkgKyBvcHRpb25zLm1heEFnZSlcbiAgICBvcHRpb25zLm1heEFnZSAvPSAxMDAwXG4gIH1cblxuICByZXMuc2V0SGVhZGVyKCdTZXQtQ29va2llJywgc2VyaWFsaXplKG5hbWUsIFN0cmluZyhzdHJpbmdWYWx1ZSksIG9wdGlvbnMpKVxufVxuXG5jb25zdCBoYW5kbGVyOiBOZXh0QXBpSGFuZGxlciA9IChyZXEsIHJlcykgPT4ge1xuICAvLyBDYWxsaW5nIG91ciBwdXJlIGZ1bmN0aW9uIHVzaW5nIHRoZSBgcmVzYCBvYmplY3QsIGl0IHdpbGwgYWRkIHRoZSBgc2V0LWNvb2tpZWAgaGVhZGVyXG4gIHNldENvb2tpZShyZXMsICdOZXh0LmpzJywgJ2FwaS1taWRkbGV3YXJlIScpXG4gIC8vIFJldHVybiB0aGUgYHNldC1jb29raWVgIGhlYWRlciBzbyB3ZSBjYW4gZGlzcGxheSBpdCBpbiB0aGUgYnJvd3NlciBhbmQgc2hvdyB0aGF0IGl0IHdvcmtzIVxuICByZXMuZW5kKHJlcy5nZXRIZWFkZXIoJ1NldC1Db29raWUnKSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgaGFuZGxlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/pages/api/session.ts\n");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWVcIj8yZDIxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImNvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cookie\n");

/***/ })

/******/ });