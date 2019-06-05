import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(items: any, procuraTexto: string, status:string): any {
    if (!items) return[];
    if (!procuraTexto && status=='') 
      return items;
    if (!procuraTexto) {
      return items.filter( it => it.status == status); 
    }
    procuraTexto = procuraTexto.toLowerCase();

    return items.filter( it => {
      return (it.title.toLowerCase().includes(procuraTexto) && (it.status == status || status == ''));
    });
  }

}
