let dy: number[] = [-1, -1, -1, 0, 1, 1, 1, 0]; // bfs에서 y 좌표 증감
let dx: number[] = [-1, 0, 1, 1, 1, 0, -1, -1]; // bfs에서 x 좌표 증감
let board: number[][] = [
    [1, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0],
];
let visit: number[][] = new Array(board.length).fill(0).map(() => new Array(board[0].length).fill(0)); // 해당 칸에 방문했는지 확인하기 위한 visit 배열 선언 및 초기화
let ans = 0; // 섬의 개수

for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == 0 || visit[i][j]) // 만약 해당 칸이 바다거나 방문했으면 건너뜀
            continue;
        visit[i][j] = 1;
        let stack: [number, number][] = [[i, j]]; // dfs 사용하기 위한 stack
        ans++;
        while (stack.length > 0) {
            let [y, x] = stack.pop()!;
            for (let k = 0; k < 8; k++) {
                let ny = y + dy[k];
                let nx = x + dx[k];
                if (ny < 0 || nx < 0 || ny >= board.length || nx >= board[0].length) // 다음에 방문할 곳이 범위를 벗어나면 건너뜀
                    continue;
                if (board[ny][nx] == 0 || visit[ny][nx]) // 만약 해당 칸이 바다거나 방문했으면 건너뜀
                    continue;
                visit[ny][nx] = 1;
                stack.push([ny, nx]);
            }
        }
    }
}

console.log(ans);
