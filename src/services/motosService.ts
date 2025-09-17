import { Moto } from './api';

// Mock de dados para desenvolvimento
const motosMock: Moto[] = [
  {
    id: '1',
    modelo: 'Honda CG 160',
    placa: 'ABC-1234',
    status: 'Disponível',
    dataEntrada: '2025-04-10',
    patio: 'Pátio A',
    km: 15320,
    manutencao: '2025-05-15',
  },
  {
    id: '2',
    modelo: 'Yamaha Fazer 250',
    placa: 'XYZ-5678',
    status: 'Em manutenção',
    dataEntrada: '2025-04-12',
    patio: 'Pátio B',
    km: 24800,
    manutencao: '2025-06-01',
  },
  {
    id: '3',
    modelo: 'Honda Biz 125',
    placa: 'DEF-9012',
    status: 'Disponível',
    dataEntrada: '2025-04-15',
    patio: 'Pátio A',
    km: 8750,
    manutencao: '2025-07-01',
  },
  {
    id: '4',
    modelo: 'Yamaha Crosser 150',
    placa: 'GHI-3456',
    status: 'Indisponível',
    dataEntrada: '2025-04-08',
    patio: 'Pátio C',
    km: 32100,
    manutencao: '2025-04-20',
  },
];

// Simulação de delay de rede
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const motosService = {
  // Listar todas as motos
  async getAll(): Promise<Moto[]> {
    await delay(1000);
    return motosMock;
  },

  // Buscar moto por placa
  async getByPlaca(placa: string): Promise<Moto | null> {
    await delay(800);
    const moto = motosMock.find(
      (m) => m.placa.toLowerCase() === placa.toLowerCase(),
    );
    return moto || null;
  },

  // Cadastrar nova moto
  async create(moto: Omit<Moto, 'id'>): Promise<Moto> {
    await delay(1500);
    const newMoto: Moto = {
      ...moto,
      id: Date.now().toString(),
    };
    motosMock.push(newMoto);
    return newMoto;
  },

  // Atualizar moto
  async update(id: string, moto: Partial<Moto>): Promise<Moto> {
    await delay(1200);
    const index = motosMock.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error('Moto não encontrada');
    }
    motosMock[index] = { ...motosMock[index], ...moto };
    return motosMock[index];
  },

  // Deletar moto
  async delete(id: string): Promise<void> {
    await delay(800);
    const index = motosMock.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error('Moto não encontrada');
    }
    motosMock.splice(index, 1);
  },
};
