function Watcher(vm, key, cb) {
  this.$vm = vm;
  this.key = key;
  this.$cb = cb;
  this.value = this.get();
  this.update = () => {
    this.$cb.call(vm, vm.key);
  }
}
Watcher.prototype.get = function() {
  Target_Obj = this.$cb;
  const value = this.$vm[this.key];
  Target_Obj = null;
  return value;
}