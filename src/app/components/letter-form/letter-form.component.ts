import { Component, OnInit, Input } from '@angular/core';
import { TypeOfTown as TownType, LetterStatus, Letter, ApiService, StreetType } from 'src/app/api.service';
import * as jsPDF from 'jspdf';
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

  constructor(private apiSrvice: ApiService) {

  }

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
    //обязательно сделать так, чтобы первой цифрой не мог быть 0!!!
    let result = '';
    const characters  = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  /*
Девятая цифра (9) — контрольная цифра, рассчитываемая по формуле[2];

каждая из первых восьми цифр номера умножается соответственно на 8, 6, 4, 2, 3, 5, 9, 7;
полученные значения суммируются;
промежуточный результат делится на 11, чтобы получить остаток;
остаток вычитается из 11;
полученный конечный результат является контрольной цифрой, если она больше или равна 1, 
но меньше или равен 9. Если конечный результат равен 10, то контрольная цифра равна 0; 
если этот результат равен 11, то контрольная цифра равна 5.

  */
  // getChecksum(){
    
  //   return null;
  // }
  // createMailID() {

  //   let firstPath = "RZ";
  //   let secondPath: string = this.getTestHash(8);
  //   let thirdPath = getСhecksum() {
      
  //     const uniqueDepartureNumber: string = secondPath;
  //     const factors = [8, 6, 4, 2, 3, 5, 9, 7];

  //     let arrayNumbers = (uniqueDepartureNumber as string).split('');
  //     let sum: number;  
  //     for (let i = 0; i < arrayNumbers.length - 1 && i < factors.length; i++) { 
  //       sum +=  +arrayNumbers[i] * factors[i];
  //     }

  //     console.log(arrayNumbers);

  //     const checkDigit;
  //     return check digit;
  //   };

    

  //   thirdPath('11111');

  //   let fourthPath = "BY";

  //   const result = '' + firstPath + secondPath + thirdPath  + fourthPath;

  //   return result;
  // }
  // . Первые две латинские буквы (XX) обозначают тип почтового отправления:

  // Возможно передавать только одну букву для описания типа отправления (R, L, V, C, E, U, Z) 
  // в таком случае вторую букву от A до Z можно использовать для придания уникальности 
  // или некой смысловой нагрузкни, например разбивка по регионам

  // RA-RZ — регистрируемое отправление письменной корреспонденции (заказная карточка, письмо, бандероль, мелкий пакет (до 2 кг), заказной мешок «М» — международное отправление с большим объемом печатной продукции: бумагами, книгами, журналами);
  // LA-LZ — отслеживаемое письмо, несколько подтипов; использование LZ требует двустороннего соглашения
  // VA-VZ — письмо с объявленной ценностью;
  // CA-CZ — международная посылка (более 2 кг);
  // EA-EZ — экспресс-отправления (EMS от Express Mail Service);
  // UA-UZ — нерегистрируемые и неотслеживаемые отправления, которые обязаны проходить таможенные процедуры;
  // ZA-ZZ — SRM-отправление (от simplified registered mail), простой регистрируемый пакет.


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
//110*220 5/5 5/115 115/5 220/220 7 мм расстояние между строками конверта
  downloadPDF(){

    const doc = new jsPDF(
      {
        orientation: 'l',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
       }
    );


    
    // doc.text(this.letter.receiverAddress.komu.surname + " " + this.letter.receiverAddress.komu.otchestvo, 140, 72);
    doc.line(5, 5, 225, 5);
    doc.line(225, 5, 225, 115);
    doc.line(225, 115, 5, 115);
    doc.line(5, 115, 5, 5);

    doc.text(this.letter.hash, 10, 10);
    doc.text(this.letter.receiverAddress.komu.name.toString, 140, 65);

    doc.save('First.pdf');
  }
}



// this.letter = {
//       id: null,
//       hash: this.getTestHash(16),
//       status: LetterStatus.withoutStatus,
//       isMejdunarond: 'false',
//       receiverAddress: {
//         komu: {
//           name: 'Иван',
//           surname: 'Иванов',
//           otchestvo: 'Иванович'
//         },
//         kuda: {
//           streetName: 'Кальварийская',
//           streetType: StreetType.ulica,
//           numberOfFlat: '24',
//           numberOfHouse: '3',
//           numberOfKorpus: ''
//         },
//         index: '220100',
//         nasPunktName: {
//           oblast: 'Минская', // область
//           region: '', // район
//           townName: 'Минск', // город (название населеного пункта)
//           typeOfTown: TownType.city
//         }
//       },
//       otpravitelAddress: {
//         otKogo: {
//           name: 'Иван',
//           surname: 'Иванов',
//           otchestvo: 'Иванович'
//         },
//         adress: {
//           streetName: 'Частная',
//           streetType: StreetType.ulica,
//           numberOfFlat: '',
//           numberOfHouse: '24',
//           numberOfKorpus: '',
//           oblast: 'Гомельская', // область
//           region: '', // район
//           townName: 'Гомель', // город (название населеного пункта)
//           typeOfTown: TownType.city
//         }
//       },
//       dateAndTimeOfStartWay: (new Date()).getMilliseconds()
//     };
