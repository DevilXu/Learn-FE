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
    let start = 0; // 起始的转化为一维数组的开始索引
    let end = sourceLen - 1; // 起始的转化为一维数组的结束索引
    return binarySearch(target, source, start, end, colLen);
  }
}
function binarySearch(target, source, start, end, colLen) {
  while(start <= end) {
    let midIndex = start + getDivisorNum(end - start);
    let midRowIndex = getDivisorNum(midIndex, colLen);
    let midColIndex = midIndex % colLen;
    if (source[midRowIndex][midColIndex] === target) return true;
    else if (source[midRowIndex][midColIndex] < target) return binarySearch(target, source, midIndex + 1, end, colLen);
    else return binarySearch(target, source, start, midIndex - 1, colLen);
  }
  return false;
}
/**
 * [getDivisorNum 传入的数据除以除数，取整数]
 *
 * @param   {[type]}  num  [num 传入的源参数]
 * @param   {[type]}  num  [num 传入的源参数]
 * @return  {[type]}       [return 返回处理后的数据]
 */
function getDivisorNum(num, divisor = 2) {
  return parseInt(num / divisor);
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