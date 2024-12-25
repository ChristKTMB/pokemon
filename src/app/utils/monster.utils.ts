export enum MonsterType {
    PLANT = 'Plant',
    FIRE = 'Fire',
    WATER = 'Water',
    ELECTRIC = 'Electric',
    ICE = 'Ice',
    DRAGON = 'Dragon',
}

export interface IMonsterProperties{
    imageUrl: string;
    color: string;
}

export const MonsterTypeProperties: {[key: string]: IMonsterProperties} = {
	[MonsterType.PLANT]: {
		imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGiM7hg62xiEIRLeqg_Tr3T0SY4WzZCsYsOw&s",
		color: 'rgba(135, 255, 124)'
	},
	[MonsterType.ELECTRIC]: {
		imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwRKia8ypCppi_FghhnODBjDsoRxxBQuOfw&s",
		color: 'rgb(255, 255, 104)'
	},
	[MonsterType.FIRE]: {
		imageUrl: "https://static.wikia.nocookie.net/monster/images/f/f8/Gengar.png/revision/latest?cb=20190610140622",
		color: 'rgb(255, 104, 104)'
	},
	[MonsterType.WATER]: {
		imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6M0UszTj4Yn3axCsol0rGQi1Zn9H_1OGphQ&s",
		color: 'rgba(118, 234, 255)'
	},
    [MonsterType.ICE]: {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHgsmXHryU3OhK5JN5PllrVylYMvvxGep3EQ&s",
        color: 'rgba(104, 255, 255)'
    },
    [MonsterType.DRAGON]: {
        imageUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.imdb.com%2Ftitle%2Ftt0065979%2F&psig=AOvVaw0",
        color: 'rgba(255, 104, 255)'
    }
}