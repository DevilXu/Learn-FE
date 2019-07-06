function compile(vm, html) {
  const REG_ValueDom = /{{[\s]*(\w+?)[\s]*}}/;
  const renderDom = html.match(REG_ValueDom)[1];
  document.querySelector(`#${vm.$el}`).innerHTML = vm[renderDom]; // 刷新页面元素
  new Watcher(vm, renderDom, () => { // 定义watch 进行依赖收集
    document.querySelector(`#${vm.$el}`).innerHTML = vm[renderDom];
  });
}