import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
 name: 'searchByName',
 standalone:true
})
export class SearchByNamePipe implements PipeTransform {

 transform(value: any[], searchTerm: string): any[] {
    if (!searchTerm) {
      return value;
    }

    searchTerm = searchTerm.toLowerCase();

    return value.filter(item => {
      return item.Name.toLowerCase().includes(searchTerm);
    });
 }
}