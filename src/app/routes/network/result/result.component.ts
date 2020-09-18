import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import {ReuseTabService} from '@delon/abc';
import {ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';

@Component({
  selector: 'app-network-result',
  templateUrl: './result.component.html',
})
export class NetworkResultComponent implements OnInit {

  @Input() getDoneRes:any;

  constructor(
    private http: _HttpClient,
    private reuseTabService: ReuseTabService,
  ) { }

  ngOnInit() {
  }

  closeOf4Phase() {
    this.reuseTabService.close('/network/generateProject');
  }

}
