import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NetworkGenerateProjectComponent } from './generate-project.component';

describe('NetworkGenerateProjectComponent', () => {
  let component: NetworkGenerateProjectComponent;
  let fixture: ComponentFixture<NetworkGenerateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkGenerateProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGenerateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
