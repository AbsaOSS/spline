import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  private errorText: string;

  constructor(private route: ActivatedRoute, private errorService: ErrorService) { }

  ngOnInit() {
    let httpCode = this.route.snapshot.paramMap.get("httpCode")
    this.errorText = this.errorService.getTextError(httpCode)
  }

}
