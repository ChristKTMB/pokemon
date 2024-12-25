import { MonsterType } from "../utils/monster.utils";

export class Monster {
    name: string = "Monster";
    image: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6M0UszTj4Yn3axCsol0rGQi1Zn9H_1OGphQ&s";
    type: MonsterType = MonsterType.PLANT;
    hp: number = 10;
    figureCaption: string = "N°001 Monster"
    attackName: string = "Standard Attack"
    attackStrength: number = 10;
    attackDescription: string = "A standard attack";

}