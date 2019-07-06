let Target_Obj = undefined;
function Dep() {
  this.deps = [];
}
Dep.prototype.depend = function(target) {
  this.deps.push(target);
}
Dep.prototype.notify = function() {
  this.deps.forEach(dep => {
    dep();
  });
}