import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../services/voice-recognition.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
  providers: [VoiceRecognitionService]
})
export class PokedexComponent  implements OnInit {

  constructor(public voiceService: VoiceRecognitionService, public photoService: PhotoService) { }

  ngOnInit() {
  }

  searchVoiceTerm() {
    this.voiceService.searchVoiceTerm();
  }
}
