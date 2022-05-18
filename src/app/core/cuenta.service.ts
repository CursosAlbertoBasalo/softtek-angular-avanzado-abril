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

cuentaStore.select$<string>((cuenta) => cuenta.IBAN);

// cuentaStore.get$().next();

//(state as any as Cuenta).balance / (state as any as Cuenta).owners.length

function ingresar(current: Cuenta, importe: number): Cuenta {
  const state = { ...current };
  state.balance += importe;
  return state;
}
function retirar(current: Cuenta, importe: number): Cuenta {
  const state = { ...current };
  state.balance -= importe;
  return state;
}
function agregarTitular(current: Cuenta, titular: string): Cuenta {
  const state = { ...current };
  state.owners.push(titular);
  return state;
}

//const cotizaciones = [];

function ingresarBitcoinsReducer(
  current: Cuenta,
  payload: { bitcoins: number; cotización: number }
): Cuenta {
  const state = { ...current };
  const importe = payload.bitcoins * payload.cotización;
  state.balance += importe;
  return state;
}

cuentaStore.reducers.set('Ingresar', ingresar);
cuentaStore.reducers.set('IngresarBitcoin', ingresarBitcoinsReducer);

cuentaStore.dispatch({ type: 'IngresarBitcoin', payload: { bitcoins: 0.005, cotización: 28000 } });
