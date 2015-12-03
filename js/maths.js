
/*** Helpers ***/
var sqrt = Math.sqrt,
    square = function (val){
    return Math.pow(val, 2);
},
    hyp = function (xx, yy){
    return sqrt( square(xx) + square(yy) ); 
};
// Limit a number to a max value
Number.prototype.max = function(maximum) {
    if (this.valueOf() > maximum){
      return maximum;
    } else {
      return this.valueOf();
    }
};
// Limit a number to a minimum value
Number.prototype.min = function(minimum) {
    if (this.valueOf() < minimum){
      return minimum;
    } else {
      return this.valueOf();
    }
};