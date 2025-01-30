import { inject, Injectable } from '@angular/core';
import { Monster } from '../../models/monster.model';
import { HttpClient } from '@angular/common/http';
import { IMonster } from '../../interfaces/monster.interface';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  private http = inject(HttpClient);
  private BASE_URL = 'http://localhost:8000/monsters/';

  getAll(): Observable<Monster[]> {
		return this.http.get<IMonster[]>(this.BASE_URL).pipe(
			map(monsterJsonArray => {
				return monsterJsonArray.map<Monster>(
					monsterJson => Monster.fromJSON(monsterJson)
				)
			})
		);
	}

	getById(id: number): Observable<Monster> {
		return this.http.get<IMonster>(this.BASE_URL + id + '/').pipe(
			map(monsterJson => Monster.fromJSON(monsterJson))
		);
	}

	add(monster: Monster): Observable<Monster> {
		return this.http.post<IMonster>(this.BASE_URL, monster.toJSON()).pipe(
			map(monsterJson => Monster.fromJSON(monsterJson))
		);
	}

	update(monster: Monster): Observable<Monster> {
		return this.http.put<IMonster>(this.BASE_URL + monster.id + '/', monster.toJSON()).pipe(
			map(monsterJson => Monster.fromJSON(monsterJson))
		);
	}

	delete(id: number): Observable<void> {
		return this.http.delete<void>(this.BASE_URL + id + '/');
	}

}
