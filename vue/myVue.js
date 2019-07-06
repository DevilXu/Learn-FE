// 简化版 vue 的实现
function MyVue({
  el = '',
  data = '',
  methods = {}
}) {
  this.$el = el;
  typeof data === 'function' ? this.$data = data() : this.$data = data; // data必须是函数
  observerAllData(this, this.$data); // 使用defineProperty监听所有参数
  compile(this, document.querySelector(`#${this.$el}`).innerHTML); // 简单的编译器 非常的简单
}
const shareObjectDefine = { // 定义defineProperty的相关配置
  enumerable: true,
  configurable: true,
  get: undefined,
  set: undefined,
}
function proxy(target, source, key) { // 方法代理，用于将 vm[key] 代理到vm.data[key]
  shareObjectDefine.get = () => { // 代理get方法
    return target[source][key]
  }
  shareObjectDefine.set = (val) => { // 代理set方法
    target[source][key] = val;
  }
  Object.defineProperty(target, key, shareObjectDefine); // 进行数据代理
}
function observerAllData(vm, objects) { // 遍历所有data对象，进行双向绑定
  Object.keys(objects).forEach((key) => {
    defineObject(vm, objects, key, objects[key]);
  })
}
function defineObject(vm, target, key, val) { // 对每个data中的key进行监控
  let value = val;
  const Deps = new Dep(); // 创建依赖
  proxy(vm, `$data`, key); // 代理数据
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: () => {
      Target_Obj && Deps.depend(Target_Obj); // 收集依赖方法
      return value;
    },
    set: (val) => {
      value = val;
      Deps.notify();
    }
  })
}