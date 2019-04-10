"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _pluginSyntaxJsx = _interopRequireDefault(require("@babel/plugin-syntax-jsx"));

var _helperBuilderReactJsx = _interopRequireDefault(require("@babel/helper-builder-react-jsx"));

var _core = require("@babel/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * NOTE: This is a copy-paste of:
 * https://github.com/babel/babel/blob/master/packages/babel-plugin-transform-react-jsx/src/index.js
 * expcept {}s are wrapped in functions (which can then be wrapped with computed(...))
 */
var _default = (0, _helperPluginUtils.declare)((api, options) => {
  api.assertVersion(7);
  const THROW_IF_NAMESPACE = options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace;
  const PRAGMA_DEFAULT = options.pragma || 'mbx.createElement';
  const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || 'mbx.Fragment';
  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
  const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/; // returns a closure that returns an identifier or memberExpression node
  // based on the given id

  const createIdentifierParser = id => () => {
    return id.split('.').map(name => _core.types.identifier(name)).reduce((object, property) => _core.types.memberExpression(object, property));
  };

  const visitor = (0, _helperBuilderReactJsx.default)({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;

      if (_core.types.react.isCompatTag(tagName)) {
        args.push(_core.types.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get('jsxIdentifier')();
    },

    throwIfNamespace: THROW_IF_NAMESPACE
  });
  visitor.Program = {
    enter(path, state) {
      const {
        file
      } = state;
      let pragma = PRAGMA_DEFAULT;
      let pragmaFrag = PRAGMA_FRAG_DEFAULT;
      let pragmaSet = !!options.pragma;
      let pragmaFragSet = !!options.pragmaFrag;

      if (file.ast.comments) {
        for (const comment of file.ast.comments) {
          const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);

          if (jsxMatches) {
            pragma = jsxMatches[1];
            pragmaSet = true;
          }

          const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(comment.value);

          if (jsxFragMatches) {
            pragmaFrag = jsxFragMatches[1];
            pragmaFragSet = true;
          }
        }
      }

      state.set('jsxIdentifier', createIdentifierParser(pragma));
      state.set('jsxFragIdentifier', createIdentifierParser(pragmaFrag));
      state.set('usedFragment', false);
      state.set('pragmaSet', pragmaSet);
      state.set('pragmaFragSet', pragmaFragSet);
    },

    exit(path, state) {
      if (state.get('pragmaSet') && state.get('usedFragment') && !state.get('pragmaFragSet')) {
        throw new Error('transform-react-jsx: pragma has been set but ' + 'pragmafrag has not been set');
      }
    }

  };

  visitor.JSXAttribute = function (path) {
    if (_core.types.isJSXElement(path.node.value)) {
      path.node.value = _core.types.jsxExpressionContainer(path.node.value);
    }
  };

  visitor.JSXExpressionContainer = function (path) {
    if (_core.types.isExpression(path.node.expression)) {
      path.node.expression = _core.types.functionExpression(null, [], _core.types.blockStatement([_core.types.returnStatement(path.node.expression)]));
    }
  };

  return {
    name: 'transform-react-jsx',
    inherits: _pluginSyntaxJsx.default,
    visitor
  };
});

exports.default = _default;
//# sourceMappingURL=index.js.map
