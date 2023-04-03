import { TestBed } from '@angular/core/testing';
import { DepartmentsResolver } from './departments.resolver';

describe('GuardsResolver', () => {
  let resolver: DepartmentsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DepartmentsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
