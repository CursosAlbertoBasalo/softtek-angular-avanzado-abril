import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

export type Action = { type: string; payload: unknown };
export type Change<T> = { action: Action; current: T; next: T };

export class AtomicStore<T> {
  private state$: BehaviorSubject<T>;
  private changes$: ReplaySubject<Change<T>>;

  constructor(initialValue: T) {
    this.state$ = new BehaviorSubject(this.clone(initialValue));
    this.changes$ = new ReplaySubject();
  }

  set(payload: Partial<T>): void {
    this.dispatch({ type: 'SetState', payload });
  }

  dispatch(action: Action): void {
    const payload = action.payload as Partial<T>;
    if (payload) {
      const current = this.get();
      const next = { ...current, ...payload };
      this.state$.next(next);
      this.changes$.next({ action, current, next });
    }
  }

  get(): T {
    return this.clone(this.state$.value);
  }

  get$(): Observable<T> {
    return this.state$.asObservable();
  }

  private clone(state: T): T {
    return JSON.parse(JSON.stringify(state));
  }
}
