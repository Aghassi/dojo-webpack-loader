var registered_modules = {};
function dojoRequire(module, cb){
	// If we call from require using ([]) we don't want to treat a single import like an array
	// It may be dynamic in nature still since it could be requirejs.
	if (module instanceof Array && module.length > 1){
		var res = module.map(function(m){ return dojoRequire(m); });
		if (cb) cb.apply(this, res);
	}
	else {
		if (registered_modules[module]) {
			return registered_modules[module];
		}
		else {
			console.warn('Dynamic dojo require is not supported. Trying to require "' + module + '". \n This can be a result of things like dojo-data-types or other modules that are not pre registered with the bundle');
			if (cb) {
				// If we have a callback, we know it is async require
				return window.require([module], cb);
			} else {
				/**
				 * Otherwise, we know it is a sync require.
				 * In the event that we don't have something in the registered_modules
				 * We throw the request up to the global requirejs instance hosted by the window.
				 * This instance will need to have a config that maps whatever module path is being required/
				 * However, we still warn the user that they shouldn't be doing this.
				 * */
				return window.require(module);
			}
		}
	}
}
dojoRequire.async = true;
dojoRequire.toUrl = function(url) {
	return url;
};
dojoRequire.register = function(module_name, module){
	registered_modules[module_name] = module;
	return module;
};
dojoRequire.unregister = function(module_name){
	delete registered_modules[module_name];
};
module.exports = dojoRequire;
