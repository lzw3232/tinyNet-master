import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkResultComponent } from './result.component';

describe('NetworkResultComponent', () => {
  let component: NetworkResultComponent;
  let fixture: ComponentFixture<NetworkResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
