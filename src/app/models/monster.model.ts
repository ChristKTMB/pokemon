import { IMonster } from "../interfaces/monster.interface";
import { MonsterType } from "../utils/monster.utils";

export class Monster implements IMonster{
    id: number = -1;
	name: string = "Monster";
	image: string = "assets/img/pik.png"
	type: MonsterType = MonsterType.ELECTRIC;
	hp: number = 60;
	figureCaption: string = "N°001 Monster";

	attackName: string = "Standard Attack";
	attackStrength: number = 10;
	attackDescription: string = "This is an attack description...";

	copy(): Monster {
		return Object.assign(new Monster(), this);
	}

	static fromJSON(json: IMonster): Monster {
		return Object.assign(new Monster(), json);
	}

    toJSON(): IMonster {
		const jsonObject: IMonster = Object.assign({}, this);
		delete jsonObject.id;
		return jsonObject;
	}
}