import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatar'
})
export class AvatarPipe implements PipeTransform {

  transform(value: string| undefined): string {
    if(value == undefined || value == "" || value == null){
    return 'https://static.vecteezy.com/ti/vetor-gratis/p3/2318271-icone-do-perfil-do-usuario-gratis-vetor.jpg';
  }else{
    return value
  }
  }

}
