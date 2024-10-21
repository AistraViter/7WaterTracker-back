export const setUpdateOptions = function (next) { 
    this.options.new = true;
    this.options.runValidators = true;
    next();
};