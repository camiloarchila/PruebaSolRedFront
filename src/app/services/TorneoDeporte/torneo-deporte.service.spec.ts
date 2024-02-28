import { TestBed } from '@angular/core/testing';

import { TorneoDeporteService } from './torneo-deporte.service';

describe('TorneoDeporteService', () => {
  let service: TorneoDeporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TorneoDeporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
