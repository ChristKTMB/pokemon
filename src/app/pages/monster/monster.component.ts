import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MonsterType } from '../../utils/monster.utils';
import { Monster } from '../../models/monster.model';
import { CardComponent } from '../../components/card/card.component';
import { MonsterService } from '../../services/monster/monster.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMonsterConfirmationDialogComponent } from '../../components/delete-monster-confirmation-dialog/delete-monster-confirmation-dialog.component';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, CardComponent, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private Subscriptions: Subscription = new Subscription();
  private readonly dialog = inject(MatDialog);
  

  formGroup = this.fb.group({
    name: ['', [Validators.required]],
    image: ['', [Validators.required]],
    type: [MonsterType.ELECTRIC, [Validators.required]],
    hp: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    figureCaption: ['', [Validators.required]],
    attackName: ['', [Validators.required]],
    attackStrength: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
    attackDescription: ['', [Validators.required]]
  });

  monsterTypes = Object.values(MonsterType);
  monster: Monster = Object.assign(new Monster(), this.formGroup.value);
  monsterId = -1;

  ngOnInit(): void {
    const formValueSubcription = this.formGroup.valueChanges.subscribe(value => {
      this.monster = Object.assign(new Monster(), value);
    });
    this.Subscriptions.add(formValueSubcription);

    const routeSubscription = this.route.params.pipe(
      switchMap(params => {
        if(params['id']){
          this.monsterId = parseInt(params['id']);
          return this.monsterService.getById(this.monsterId);
        }
        return of(null);
      })
    ).subscribe(monster => {
        if(monster){
          this.monster = monster;
          this.formGroup.patchValue(this.monster);
        }
      }
    );
    this.Subscriptions.add(routeSubscription);
  }

  ngOnDestroy(): void {
    this.Subscriptions?.unsubscribe();
  }


  navigateBack(){
    this.router.navigate(['/']);
  }

  onSubmit(event: Event){
    event.preventDefault();
    let saveObservable = null;
    if (this.monsterId === -1) {
    saveObservable = this.monsterService.add(this.monster);
    }else{
      this.monster.id = this.monsterId;
      saveObservable = this.monsterService.update(this.monster);
    }
    const saveSubscription = saveObservable.subscribe(() => {
      this.navigateBack();
    });
    this.Subscriptions.add(saveSubscription);
  }

  isFieldValid(fieldName: string) {
    const formControl = this.formGroup.get(fieldName);
   return formControl?.invalid && ( formControl?.dirty || formControl?.touched );
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file); reader.onload = () => {
        this.formGroup.patchValue({
          image: reader.result as string
        });
      };
    }
  }

  deleteMonster() {
		const dialogRef = this.dialog.open(DeleteMonsterConfirmationDialogComponent);
		dialogRef.afterClosed().pipe(
      filter(confirmation => confirmation),
      switchMap( _ => this.monsterService.delete(this.monsterId))
    ).subscribe( _ => {
				this.navigateBack();
			}
		)
	}

}
