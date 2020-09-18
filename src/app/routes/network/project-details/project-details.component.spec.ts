import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkProjectDetailsComponent } from './project-details.component';

describe('NetworkProjectDetailsComponent', () => {
  let component: NetworkProjectDetailsComponent;
  let fixture: ComponentFixture<NetworkProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
