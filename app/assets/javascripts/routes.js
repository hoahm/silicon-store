(function() {
  var NodeTypes, ParameterMissing, Utils, defaults,
    __hasProp = {}.hasOwnProperty;

  ParameterMissing = function(message) {
    this.message = message;
  };

  ParameterMissing.prototype = new Error();

  defaults = {
    prefix: "",
    default_url_options: {}
  };

  NodeTypes = {"GROUP":1,"CAT":2,"SYMBOL":3,"OR":4,"STAR":5,"LITERAL":6,"SLASH":7,"DOT":8};

  Utils = {
    serialize: function(obj) {
      var i, key, prop, result, s, val, _i, _len;

      if (!obj) {
        return "";
      }
      if (window.jQuery) {
        result = window.jQuery.param(obj);
        return (!result ? "" : result);
      }
      s = [];
      for (key in obj) {
        if (!__hasProp.call(obj, key)) continue;
        prop = obj[key];
        if (prop != null) {
          if (this.getObjectType(prop) === "array") {
            for (i = _i = 0, _len = prop.length; _i < _len; i = ++_i) {
              val = prop[i];
              s.push("" + key + (encodeURIComponent("[]")) + "=" + (encodeURIComponent(val.toString())));
            }
          } else {
            s.push("" + key + "=" + (encodeURIComponent(prop.toString())));
          }
        }
      }
      if (!s.length) {
        return "";
      }
      return s.join("&");
    },
    clean_path: function(path) {
      var last_index;

      path = path.split("://");
      last_index = path.length - 1;
      path[last_index] = path[last_index].replace(/\/+/g, "/").replace(/\/$/m, "");
      return path.join("://");
    },
    set_default_url_options: function(optional_parts, options) {
      var i, part, _i, _len, _results;

      _results = [];
      for (i = _i = 0, _len = optional_parts.length; _i < _len; i = ++_i) {
        part = optional_parts[i];
        if (!options.hasOwnProperty(part) && defaults.default_url_options.hasOwnProperty(part)) {
          _results.push(options[part] = defaults.default_url_options[part]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    },
    extract_anchor: function(options) {
      var anchor;

      anchor = "";
      if (options.hasOwnProperty("anchor")) {
        anchor = "#" + options.anchor;
        delete options.anchor;
      }
      return anchor;
    },
    extract_options: function(number_of_params, args) {
      var ret_value;

      ret_value = {};
      if (args.length > number_of_params && this.getObjectType(args[args.length - 1]) === "object") {
        ret_value = args.pop();
      }
      return ret_value;
    },
    path_identifier: function(object) {
      var property;

      if (object === 0) {
        return "0";
      }
      if (!object) {
        return "";
      }
      property = object;
      if (this.getObjectType(object) === "object") {
        property = object.to_param || object.id || object;
        if (this.getObjectType(property) === "function") {
          property = property.call(object);
        }
      }
      return property.toString();
    },
    clone: function(obj) {
      var attr, copy, key;

      if ((obj == null) || "object" !== this.getObjectType(obj)) {
        return obj;
      }
      copy = obj.constructor();
      for (key in obj) {
        if (!__hasProp.call(obj, key)) continue;
        attr = obj[key];
        copy[key] = attr;
      }
      return copy;
    },
    prepare_parameters: function(required_parameters, actual_parameters, options) {
      var i, result, val, _i, _len;

      result = this.clone(options) || {};
      for (i = _i = 0, _len = required_parameters.length; _i < _len; i = ++_i) {
        val = required_parameters[i];
        result[val] = actual_parameters[i];
      }
      return result;
    },
    build_path: function(required_parameters, optional_parts, route, args) {
      var opts, parameters, result, url, url_params;

      args = Array.prototype.slice.call(args);
      opts = this.extract_options(required_parameters.length, args);
      if (args.length > required_parameters.length) {
        throw new Error("Too many parameters provided for path");
      }
      parameters = this.prepare_parameters(required_parameters, args, opts);
      this.set_default_url_options(optional_parts, parameters);
      result = "" + (this.get_prefix()) + (this.visit(route, parameters));
      url = Utils.clean_path("" + result + (this.extract_anchor(parameters)));
      if ((url_params = this.serialize(parameters)).length) {
        url += "?" + url_params;
      }
      return url;
    },
    visit: function(route, parameters, optional) {
      var left, left_part, right, right_part, type, value;

      if (optional == null) {
        optional = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return this.visit(left, parameters, true);
        case NodeTypes.STAR:
          return this.visit_globbing(left, parameters, true);
        case NodeTypes.LITERAL:
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
          return left;
        case NodeTypes.CAT:
          left_part = this.visit(left, parameters, optional);
          right_part = this.visit(right, parameters, optional);
          if (optional && !(left_part && right_part)) {
            return "";
          }
          return "" + left_part + right_part;
        case NodeTypes.SYMBOL:
          value = parameters[left];
          if (value != null) {
            delete parameters[left];
            return this.path_identifier(value);
          }
          if (optional) {
            return "";
          } else {
            throw new ParameterMissing("Route parameter missing: " + left);
          }
          break;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    visit_globbing: function(route, parameters, optional) {
      var left, right, type, value;

      type = route[0], left = route[1], right = route[2];
      value = parameters[left];
      if (value == null) {
        return this.visit(route, parameters, optional);
      }
      parameters[left] = (function() {
        switch (this.getObjectType(value)) {
          case "array":
            return value.join("/");
          default:
            return value;
        }
      }).call(this);
      return this.visit(route, parameters, optional);
    },
    get_prefix: function() {
      var prefix;

      prefix = defaults.prefix;
      if (prefix !== "") {
        prefix = (prefix.match("/$") ? prefix : "" + prefix + "/");
      }
      return prefix;
    },
    _classToTypeCache: null,
    _classToType: function() {
      var name, _i, _len, _ref;

      if (this._classToTypeCache != null) {
        return this._classToTypeCache;
      }
      this._classToTypeCache = {};
      _ref = "Boolean Number String Function Array Date RegExp Undefined Null".split(" ");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        this._classToTypeCache["[object " + name + "]"] = name.toLowerCase();
      }
      return this._classToTypeCache;
    },
    getObjectType: function(obj) {
      var strType;

      if (window.jQuery && (window.jQuery.type != null)) {
        return window.jQuery.type(obj);
      }
      strType = Object.prototype.toString.call(obj);
      return this._classToType()[strType] || "object";
    },
    namespace: function(root, namespaceString) {
      var current, parts;

      parts = (namespaceString ? namespaceString.split(".") : []);
      if (!parts.length) {
        return;
      }
      current = parts.shift();
      root[current] = root[current] || {};
      return Utils.namespace(root[current], parts.join("."));
    }
  };

  Utils.namespace(window, "Routes");

  window.Routes = {
// cancel_user_registration => /auth/cancel(.:format)
  cancel_user_registration_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"cancel",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// categories => /categories(.:format)
  categories_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[7,"/",false],[6,"categories",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// category => /categories/:id(.:format)
  category_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"categories",false]],[7,"/",false]],[3,"id",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// ckeditor.pictures => /ckeditor/pictures(.:format)
  ckeditor_pictures_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"ckeditor",false]],[7,"/",false]],[6,"pictures",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// ckeditor.picture => /ckeditor/pictures/:id(.:format)
  ckeditor_picture_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"ckeditor",false]],[7,"/",false]],[6,"pictures",false]],[7,"/",false]],[3,"id",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// ckeditor.attachment_files => /ckeditor/attachment_files(.:format)
  ckeditor_attachment_files_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"ckeditor",false]],[7,"/",false]],[6,"attachment_files",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// ckeditor.attachment_file => /ckeditor/attachment_files/:id(.:format)
  ckeditor_attachment_file_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"ckeditor",false]],[7,"/",false]],[6,"attachment_files",false]],[7,"/",false]],[3,"id",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// destroy_user_session => /auth/sign_out(.:format)
  destroy_user_session_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"sign_out",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// edit_category => /categories/:id/edit(.:format)
  edit_category_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"categories",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"edit",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// edit_product => /products/:id/edit(.:format)
  edit_product_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"products",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"edit",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// edit_user_password => /auth/password/edit(.:format)
  edit_user_password_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"password",false]],[7,"/",false]],[6,"edit",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// edit_user_registration => /auth/edit(.:format)
  edit_user_registration_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"edit",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// home_index => /home/index(.:format)
  home_index_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"home",false]],[7,"/",false]],[6,"index",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_category => /categories/new(.:format)
  new_category_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"categories",false]],[7,"/",false]],[6,"new",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_product => /products/new(.:format)
  new_product_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"products",false]],[7,"/",false]],[6,"new",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_user_confirmation => /auth/confirmation/new(.:format)
  new_user_confirmation_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"confirmation",false]],[7,"/",false]],[6,"new",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_user_password => /auth/password/new(.:format)
  new_user_password_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"password",false]],[7,"/",false]],[6,"new",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_user_registration => /auth/sign_up(.:format)
  new_user_registration_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"sign_up",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// new_user_session => /auth/sign_in(.:format)
  new_user_session_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"sign_in",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// product => /products/:id(.:format)
  product_path: function(_id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["id"], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"products",false]],[7,"/",false]],[3,"id",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// products => /products(.:format)
  products_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[7,"/",false],[6,"products",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.dashboard => /admin/
  rails_admin_dashboard_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], [], [2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]], arguments);
  },
// rails_admin.index => /admin/:model_name(.:format)
  rails_admin_index_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.new => /admin/:model_name/new(.:format)
  rails_admin_new_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[6,"new",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.export => /admin/:model_name/export(.:format)
  rails_admin_export_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[6,"export",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.bulk_delete => /admin/:model_name/bulk_delete(.:format)
  rails_admin_bulk_delete_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[6,"bulk_delete",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.history_index => /admin/:model_name/history(.:format)
  rails_admin_history_index_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[6,"history",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.bulk_action => /admin/:model_name/bulk_action(.:format)
  rails_admin_bulk_action_path: function(_model_name, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[6,"bulk_action",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.show => /admin/:model_name/:id(.:format)
  rails_admin_show_path: function(_model_name, _id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name","id"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[3,"id",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.edit => /admin/:model_name/:id/edit(.:format)
  rails_admin_edit_path: function(_model_name, _id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name","id"], ["format"], [2,[2,[2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"edit",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.delete => /admin/:model_name/:id/delete(.:format)
  rails_admin_delete_path: function(_model_name, _id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name","id"], ["format"], [2,[2,[2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"delete",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.show_in_app => /admin/:model_name/:id/show_in_app(.:format)
  rails_admin_show_in_app_path: function(_model_name, _id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name","id"], ["format"], [2,[2,[2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"show_in_app",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_admin.history_show => /admin/:model_name/:id/history(.:format)
  rails_admin_history_show_path: function(_model_name, _id, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["model_name","id"], ["format"], [2,[2,[2,[2,[2,[2,[2,[2,[7,"/",false],[6,"admin",false]],[7,"/",false]],[3,"model_name",false]],[7,"/",false]],[3,"id",false]],[7,"/",false]],[6,"history",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_info => /rails/info(.:format)
  rails_info_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"rails",false]],[7,"/",false]],[6,"info",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_info_properties => /rails/info/properties(.:format)
  rails_info_properties_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"rails",false]],[7,"/",false]],[6,"info",false]],[7,"/",false]],[6,"properties",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_info_routes => /rails/info/routes(.:format)
  rails_info_routes_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"rails",false]],[7,"/",false]],[6,"info",false]],[7,"/",false]],[6,"routes",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// rails_mailers => /rails/mailers(.:format)
  rails_mailers_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"rails",false]],[7,"/",false]],[6,"mailers",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// root => /
  root_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], [], [7,"/",false], arguments);
  },
// user_confirmation => /auth/confirmation(.:format)
  user_confirmation_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"confirmation",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// user_omniauth_authorize => /auth/auth/:provider(.:format)
  user_omniauth_authorize_path: function(_provider, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["provider"], ["format"], [2,[2,[2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"auth",false]],[7,"/",false]],[3,"provider",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// user_omniauth_callback => /auth/auth/:action/callback(.:format)
  user_omniauth_callback_path: function(_action, options) {
  if (!options){ options = {}; }
  return Utils.build_path(["action"], ["format"], [2,[2,[2,[2,[2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"auth",false]],[7,"/",false]],[3,"action",false]],[7,"/",false]],[6,"callback",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// user_password => /auth/password(.:format)
  user_password_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"password",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// user_registration => /auth(.:format)
  user_registration_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[7,"/",false],[6,"auth",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  },
// user_session => /auth/sign_in(.:format)
  user_session_path: function(options) {
  if (!options){ options = {}; }
  return Utils.build_path([], ["format"], [2,[2,[2,[2,[7,"/",false],[6,"auth",false]],[7,"/",false]],[6,"sign_in",false]],[1,[2,[8,".",false],[3,"format",false]],false]], arguments);
  }}
;

  window.Routes.options = defaults;

}).call(this);
