import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioNuevoComponent } from './inventario-nuevo.component';

describe('PedidosComponent', () => {
  let component: InventarioNuevoComponent;
  let fixture: ComponentFixture<InventarioNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
