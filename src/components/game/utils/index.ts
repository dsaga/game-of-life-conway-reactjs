import { GameCellPos } from '../'

export const createCellsFromStageSize = (stageSize: number) => {
    const newCells: GameCellPos[] = [];
    for (let _xi = 0; _xi < stageSize; _xi++) {
        for (let _yi = 0; _yi < stageSize; _yi++) {
            newCells.push({
                x: _xi,
                y: _yi,
                checked: false,
            });
        }
    }

    return newCells;
}
