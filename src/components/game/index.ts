import { GameCellPos } from "./Game";
import { GameLogic } from "./GameLogic";

export * from "./Game";



export function makeGameLogic( cells: GameCellPos[]) {
    return new GameLogic(cells);
}