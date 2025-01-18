import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-monster',
  imports: [ReactiveFormsModule],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.css'
})
export class MonsterComponent implements OnInit, OnDestroy {

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  monsterId = signal<number | undefined>(undefined);
  routeSubscription: Subscription | null = null;
  name = new FormControl('', [Validators.required]);
  hp = new FormControl(0, [Validators.required, Validators.min(1), Validators.max(200)]);

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.monsterId.set(params['id'] ? parseInt(params['id']) : undefined);
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  next(){
    let nextId = this.monsterId() || 0;
    nextId++;
    this.router.navigate(['/monster/' + nextId]);
  }

  onSubmit(event: Event){
    event.preventDefault();
    console.log('Name:', this.name.value);
    console.log(this.hp.value);

  }

}
