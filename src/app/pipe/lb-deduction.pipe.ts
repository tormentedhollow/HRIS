import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lbDeduction'
})
export class LbDeductionPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    //1 day = 8 hrs
    var d_h = 1/8;
    var d_m = (1/8)/60;
    value.m = (Math.round((value.m * d_m)*1000))/1000;
    value.h = (Math.round((value.h * d_h)*1000))/1000;
    return (value.d+value.h+value.m);
  }

}
