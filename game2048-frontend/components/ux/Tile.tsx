import '@/styles/main.scss'
import '@/styles/styles.scss'

interface TileProps {
    tile: {
        value: number;
        mergedInto: boolean;
        row: number;
        column: number;
        isNew: () => boolean;
        hasMoved: () => boolean;
        fromRow: () => number;
        toRow: () => number;
        fromColumn: () => number;
        toColumn: () => number;
    }
}

const Tile: React.FC<TileProps> = ({ tile }) => {

    const classArray = ['tile'];

    classArray.push(`tile${tile.value}`);
    if (!tile.mergedInto) {
        classArray.push(`position_${tile.row}_${tile.column}`);
    }

    if (tile.mergedInto) {
        classArray.push('merged');
    }

    if (tile.isNew()) {
        classArray.push('new');
    }

    if (tile.hasMoved()) {
        classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
        classArray.push(`column_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
        classArray.push('isMoving');
    }


    const classes = classArray.join(' ');

    return (
        <span className={classes}></span>
    )
}

export default Tile