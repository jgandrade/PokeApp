const sort = function quicksort(arr: any): any {
  if (arr.length === 0) return arr;

  let pivot = Math.floor(arr.length / 2);
  let left: any = [];
  let right: any = [];

  const pivotMatch = arr[pivot]?.url.match(/species\/(\d+)/);
  let pivotValue = 0;
  if (pivotMatch) {
    pivotValue = Number(pivotMatch[1]);
  }

  for (let i = 0; i < arr.length; i++) {
    if (i === pivot) continue;
    const match = arr[i]?.url.match(/species\/(\d+)/);
    let value = 0;
    if (match) {
      value = Number(match[1]);
    }
    if (value < pivotValue) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quicksort(left), arr[pivot], ...quicksort(right)];
};

export default sort;
