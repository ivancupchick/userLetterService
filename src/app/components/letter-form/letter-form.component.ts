import { Component, OnInit, Input } from '@angular/core';
import { TypeOfTown as TownType, LetterStatus, Letter, ApiService, StreetType } from 'src/app/api.service';
// import { take } from 'rxjs/operators';

@Component({
  selector: 'app-letter-form',
  templateUrl: './letter-form.component.html',
  styleUrls: ['./letter-form.component.sass']
})
export class LetterFormComponent implements OnInit {
  public enumTypeOfTown = TownType;
  public enumStreetType = StreetType;

  @Input() letter: Letter;

  constructor(private apiSrvice: ApiService) { }

  ngOnInit() {
    this.letter = {
      id: null,
      hash: this.getTestHash(16),
      status: LetterStatus.withoutStatus,
      isMejdunarond: '',
      receiverAddress: {
        komu: {
          name: '',
          surname: '',
          otchestvo: ''
        },
        kuda: {
          streetName: '',
          streetType: StreetType.ulica,
          numberOfFlat: '',
          numberOfHouse: '',
          numberOfKorpus: ''
        },
        index: '',
        nasPunktName: {
          oblast: ' ', // область
          region: ' ', // район
          townName: ' ', // город (название населеного пункта)
          typeOfTown: TownType.city
        }
      },
      otpravitelAddress: {
        otKogo: {
          name: ' ',
          surname: ' ',
          otchestvo: ' '
        },
        adress: {
          streetName: '',
          streetType: StreetType.ulica,
          numberOfFlat: '',
          numberOfHouse: '',
          numberOfKorpus: '',
          oblast: '', // область
          region: '', // район
          townName: '', // город (название населеного пункта)
          typeOfTown: TownType.city
        }
      },
      dateAndTimeOfStartWay: (new Date()).getMilliseconds()
    };
  }

  getTestHash(length) {
    let result = '';
    const characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  sendLetter() {
    this.apiSrvice.createLetter(this.letter)
      // .pipe(
      //   take(1)
      // )
      .subscribe((res) => {
        console.log(res);
      });
  }

  sendTestData() {
    this.letter = {
      id: null,
      hash: this.getTestHash(16),
      status: LetterStatus.withoutStatus,
      isMejdunarond: 'false',
      receiverAddress: {
        komu: {
          name: 'Иван',
          surname: 'Иванов',
          otchestvo: 'Иванович'
        },
        kuda: {
          streetName: 'Кальварийская',
          streetType: StreetType.ulica,
          numberOfFlat: '24',
          numberOfHouse: '3',
          numberOfKorpus: ''
        },
        index: '220100',
        nasPunktName: {
          oblast: 'Минская', // область
          region: '', // район
          townName: 'Минск', // город (название населеного пункта)
          typeOfTown: TownType.city
        }
      },
      otpravitelAddress: {
        otKogo: {
          name: 'Иван',
          surname: 'Иванов',
          otchestvo: 'Иванович'
        },
        adress: {
          streetName: 'Частная',
          streetType: StreetType.ulica,
          numberOfFlat: '',
          numberOfHouse: '24',
          numberOfKorpus: '',
          oblast: 'Гомельская', // область
          region: '', // район
          townName: 'Гомель', // город (название населеного пункта)
          typeOfTown: TownType.city
        }
      },
      dateAndTimeOfStartWay: (new Date()).getMilliseconds()
    };
  }
}
