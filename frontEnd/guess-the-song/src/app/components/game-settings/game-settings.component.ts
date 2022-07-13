import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
})
export class GameSettingsComponent implements OnInit {
  public typesOfShoes: string[] = [
    'Boots',
    'Clogs',
    'Loafers',
    'Moccasins',
    'Sneakers',
  ];
  public autoTicks = false;
  public showTicks = false;
  public thumbLabel = false;
  public NumberOfQuestionsValue = 5;
  public QuestionTimeValue = 10;
  public tickInterval = 1;

  public roomCode = '9gq4ci3';

  constructor() {}

  ngOnInit(): void {}

  public getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

  public startGame(): void {}
}
