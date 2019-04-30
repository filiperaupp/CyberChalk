import { Pipe, PipeTransform } from '@angular/core';
import { UserSolicitation } from '../models/userSolicitation';

@Pipe({
  name: 'filterName'
})
export class FilterNamePipe implements PipeTransform {

  transform(items: UserSolicitation[], procuraTexto: string): UserSolicitation[] {
    if (!items) return[];
    if (!procuraTexto) return items;
    console.log(items );
    procuraTexto = procuraTexto.toLowerCase();

    return items.filter( it => {
      return it.name.toLowerCase().includes(procuraTexto);
    });
  }
}
