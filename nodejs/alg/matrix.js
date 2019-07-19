/**
 * [matrixSearch 矩阵搜索方法(二分查找), 采用闭包的方式实现]
 *
 * @param   {[type]}  source  [搜索的目标矩阵对象]
 *
 */
function matrixSearch(source) {
  return function(target) { // 返回一个新函数，需要传入搜索对象
    if (typeof target === 'string' || target === undefined) return false; // 如果目标为空或者为字符串，则直接返回false
    if (source.length === 0 || !source[0] || source[0].length === 0) return false; // 如果矩阵有为空的情况，则直接返回false
    const rowLen = source.length; // 矩阵行的长度
    const colLen = source[0].length; // 矩阵列的长度
    const sourceLen = rowLen * colLen; // 矩阵的数据数量
    let sourceMid = getDivisorNum(sourceLen - 1); // 取中间位置的元素，按照转化为一纬数组来算
    let midRowIndex = getDivisorNum(sourceMid, colLen); // 根据中间位置的元素换算成行索引
    let midColIndex = sourceMid % colLen; // 根据中间位置的元素换算成列索引
    if (source[midRowIndex][midColIndex] === target) return true; // 如果找到目标，则返回true
    let start = 0; // 起始的转化为一维数组的开始索引
    let end = sourceLen - 1; // 起始的转化为一维数组的结束索引
    return binSearch(source, sourceLen, midRowIndex, midColIndex, start, end, target, colLen); // 进行二分查找
  }
}
/**
 * [binSearch 二分查找]
 *
 * @param   {[type]}  source  [搜索的目标矩阵对象]
 * @param   {[type]}  sourceMid  [以为一维数组的中间值]
 * @param   {[type]}  midRowIndex  [本次的行索引]
 * @param   {[type]}  midColIndex  [本次的列索引]
 * @param   {[type]}  start  [本次开始索引]
 * @param   {[type]}  end  [本次结束索引]
 * @param   {[type]}  target  [搜索的目标对象]
 * @param   {[type]}  colLen  [转化为一纬的长度]
 * */
function binSearch(source, sourceMid, midRowIndex, midColIndex, start, end, target, colLen) {
  let diff; // 暂存两个数据之间的距离 
  if(source[midRowIndex][midColIndex] > target) { // 当获取的元素比目标元素大
    end = sourceMid; // 将比较的范围设置为0～sourceMid
    diff = sourceMid - start; // 计算起始数据下标的距离
    sourceMid = diff === 1 ? 0 : getDivisorNum(sourceMid - start); // 再取到中间数
    midRowIndex = getDivisorNum(sourceMid, colLen); // 换算成对应的行索引
    midColIndex = sourceMid % colLen; // 换算成对应的列索引
  }
  if(source[midRowIndex][midColIndex] < target) {// 当获取的元素比目标元素小
    start = sourceMid; // 将搜索范围改造为 sourceMid~end
    diff = end - sourceMid; // 计算起始数据下标的距离
    sourceMid = getDivisorNum(end - sourceMid) + sourceMid + (diff  === 1 ? 1 : 0); // 计算下一次中间值
    midRowIndex = getDivisorNum(sourceMid, colLen); // 换算成对应的行索引
    midColIndex = sourceMid % colLen; // 换算成对应的列索引
  }
  if (source[midRowIndex][midColIndex] === target) return true; // 如果找到目标，则返回true
  if (end - start <= 1) return false; // 如果起始位置相邻小于1，表示已结束循环，退出返回false
  return binSearch(source, sourceMid, midRowIndex, midColIndex, start, end, target, colLen); // 递归调用
}
/**
 * [getDivisorNum 传入的数据除以除数，如果是小数，则只取整数]
 *
 * @param   {[type]}  num  [num 传入的源参数]
 * @param   {[type]}  num  [num 传入的源参数]
 * @return  {[type]}       [return 返回处理后的数据]
 */
function getDivisorNum(num, divisor = 2) {
  return Math.floor(num / divisor);
}

// 测试用例1
const test1 = [];
const search1 = matrixSearch(test1);
console.log(search1(1) === false);
console.log(search1() === false);
// 测试用例2
const test2 = [[1]];
const search2 = matrixSearch(test2);
console.log(search2(1) === true);
console.log(search2('abc') === false);
// 测试用例3
const test3 = [[-10,-8,-6,-4,-3],[0,2,3,4,5],[8,9,10,10,12]];
const search3 = matrixSearch(test3);
console.log(search3() === false);
console.log(search3(0) === true);
console.log(search3(111) === false);
// 测试用例4
const test4 = [[]];
const search4 = matrixSearch(test4);
console.log(search4(1) === false);
console.log(search4() === false);