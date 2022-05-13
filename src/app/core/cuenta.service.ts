import { AtomicStore } from './atomic.store';

type Cuenta = { IBAN: string; balance: number; owners: string[] };

const miCuenta = { IBAN: '21345798765AD', balance: 0, owners: [] };

const cuentaStore = new AtomicStore<Cuenta>(miCuenta);

console.log(cuentaStore.get()); // 0
miCuenta.balance = 5;

console.log(cuentaStore.get()); // 5

const x = cuentaStore.get();
x.balance = 666;

console.log(cuentaStore.get()); // 0

cuentaStore.get$().subscribe((cuenta) => console.log(cuenta.balance)); // 6000
cuentaStore.set({ IBAN: '65465', balance: 6000, owners: [] });
cuentaStore.get$().subscribe((cuenta) => console.log(cuenta.balance));
console.log(cuentaStore.get()); // 6000

// cuentaStore.get$().next();
