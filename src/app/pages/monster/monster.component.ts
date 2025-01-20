import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MonsterType } from '../../utils/monster.utils';
import { Monster } from '../../models/monster.model';
import { CardComponent } from '../../components/card/card.component';
import { MonsterService } from '../../services/monster/monster.service';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private monsterService = inject(MonsterService);
  private routeSubscription: Subscription | null = null;
  private formValueSubcription: Subscription | null = null;
  

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
    this.formValueSubcription = this.formGroup.valueChanges.subscribe(value => {
      this.monster = Object.assign(new Monster(), value);
    });
    this.routeSubscription = this.route.params.subscribe(params => {
      if(params['id']){
        this.monsterId = parseInt(params['id']);
        const monsterFound = this.monsterService.getById(this.monsterId);
        if(monsterFound){
          this.monster = monsterFound;
          this.formGroup.patchValue(this.monster);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.formValueSubcription?.unsubscribe();
  }


  navigateBack(){
    this.router.navigate(['/']);
  }

  onSubmit(event: Event){
    event.preventDefault();
    if (this.monsterId === -1) {
      this.monsterService.add(this.monster);
    }else{
      this.monster.id = this.monsterId;
      this.monsterService.update(this.monster);
    }
    this.navigateBack();
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

}
