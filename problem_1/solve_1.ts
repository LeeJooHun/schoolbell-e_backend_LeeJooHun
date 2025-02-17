function solve(arr1: number[], arr2: number[]): number { // 숫자 조합 중 만들 수 있는 가장 큰 수를 만들기 위해 내림차순 정렬
    arr1.sort((a, b) => b - a);
    arr2.sort((a, b) => b - a);
    let n1 = parseInt(arr1.join(''));
    let n2 = parseInt(arr2.join(''));

    return n1 * n2;
}

let arr: number[] = [1, 3, 5, 7, 9];
let mx: number = 0;
let ans1, ans2;
for (let i = 0; i < arr.length; i++) { // (한자리수, 네자리수) 숫자 조합 생성
    let arr1: number[] = [arr[i]];
    let arr2: number[] = arr.filter((_, index) => index !== i);
    let res = solve(arr1, arr2);
    if (res > mx) {
        mx = res;
        ans1 = parseInt(arr1.join(''));
        ans2 = parseInt(arr2.join(''));
    }
}

for (let i = 0; i < arr.length - 1; i++) { // (두자리수, 세자리수) 숫자 조합 생성
    for (let j = i + 1; j < arr.length; j++) {
        let arr1: number[] = [arr[i], arr[j]];
        let arr2: number[] = arr.filter((_, index) => index !== i && index !== j);
        let res = solve(arr1, arr2);
        if (res > mx) {
            mx = res;
            ans1 = parseInt(arr1.join(''));
            ans2 = parseInt(arr2.join(''));
        }
    }
}
console.log(ans1, ans2);

