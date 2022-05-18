import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject } from 'rxjs';

export type Action = { type: string; payload: unknown };
export type Change<T> = { action: Action; current: T; next: T };
export type Reducer<T> = (state: T, payload: any) => T;
export type Selector<T, K> = (state: T) => K;

export class AtomicStore<T> {
  private state$: BehaviorSubject<T>;
  private changes$: ReplaySubject<Change<T>>;

  public reducers: Map<string, Reducer<T>> = new Map();

  private setStateReducer: Reducer<T> = (state, payload) => ({
    ...state,
    ...(payload as Partial<T>),
  });

  constructor(initialValue: T) {
    this.state$ = new BehaviorSubject(this.clone(initialValue));
    this.changes$ = new ReplaySubject();
    this.reducers.set('SetState', this.setStateReducer);
  }

  set(payload: Partial<T>): void {
    this.dispatch({ type: 'SetState', payload });
  }

  dispatch(action: Action): void {
    const reducer = this.reducers.get(action.type);
    if (reducer == null) throw Error('No reducer found for action type ' + action.type);
    const current = this.get();
    const next = reducer(current, action.payload);
    this.state$.next(next);
    this.changes$.next({ action, current, next: this.clone(next) });
  }

  get(): T {
    return this.clone(this.state$.value);
  }

  get$(): Observable<T> {
    return this.state$.asObservable().pipe(map((state) => this.clone(state)));
  }

  select$<K>(selector: Selector<T, K>): Observable<K> {
    return this.get$().pipe(map(selector), distinctUntilChanged());
  }

  getChanges$(): Observable<Change<T>> {
    return this.changes$.asObservable().pipe(map((change) => ({ ...change })));
  }

  private clone(state: T): T {
    return JSON.parse(JSON.stringify(state));
  }
}
