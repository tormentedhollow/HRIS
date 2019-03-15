import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lb'
})
export class LbPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //1 month = 1.25
     var m_el =1.25;
     var date =new Date(value);
     var todate =new Date();
     var y1 = date.getFullYear();
     var m1 = date.getMonth()+1;
     var d1 = date.getDate();

     var y2 = todate.getFullYear();
     var m2 = todate.getMonth();
     
     d1 = (Math.round(((m_el/30)*((30-d1)+1))*1000))/1000;

     m1 = (Math.round((m_el*(12-m1))*1000))/1000;

     y1 = (Math.round(((m_el*12)*((y2-y1)-1))*1000))/1000;

     m2 = (Math.round((m_el*(12-m2))*1000))/1000;

    return d1+m1+y1+m2;
  }

}
