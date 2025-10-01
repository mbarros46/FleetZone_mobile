import { MotoDTO } from '../services/motosService';

export const motosMock: MotoDTO[] = [
  {
    id: 1,
    modelo: 'Honda CG 160',
    placa: 'ABC-1234',
    status: 'Disponível',
  },
  {
    id: 2,
    modelo: 'Yamaha Fazer 250',
    placa: 'DEF-5678',
    status: 'Em manutenção',
  },
  {
    id: 3,
    modelo: 'Honda Biz 125',
    placa: 'GHI-9012',
    status: 'Disponível',
  },
  {
    id: 4,
    modelo: 'Kawasaki Ninja 300',
    placa: 'JKL-3456',
    status: 'Alugada',
  },
  {
    id: 5,
    modelo: 'Suzuki GSX 150',
    placa: 'MNO-7890',
    status: 'Disponível',
  },
];

export const patiosMock = [
  {
    id: 1,
    nome: 'Pátio Central',
    localizacao: 'Centro da cidade',
  },
  {
    id: 2,
    nome: 'Pátio Norte',
    localizacao: 'Zona norte',
  },
  {
    id: 3,
    nome: 'Pátio Sul',
    localizacao: 'Zona sul',
  },
];
