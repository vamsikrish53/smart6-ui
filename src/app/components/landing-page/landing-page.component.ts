import { Component, OnInit } from '@angular/core';
import { IplserviceService } from '../../services/iplservice.service';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.less']
})
export class LandingPageComponent implements OnInit {

  constructor(private iplService: IplserviceService) { }
  iplSchedule: Array<any>;
  ngOnInit() {
    return this.iplService.getIplSchedule().subscribe((res) => {
      this.iplSchedule = res;
  });
}
}
