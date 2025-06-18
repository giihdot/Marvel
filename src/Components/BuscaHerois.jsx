import { useState } from 'react';
import DetalhesHeroi from './DetalhesHeroi';

export default function BuscaHeroi({ aoBuscar }) {
  const [busca, setBusca] = useState('');

  function buscar() {
    if (busca.trim() !== '') {
      aoBuscar(busca);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do herói"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{ padding: '8px', width: '70%', marginRight: '10px' }}
      />
      <button
        onClick={buscar}
        style={{ padding: '8px' }}
      >
        Buscar
      </button>
      <DetalhesHeroi/>
    </div>
  );
}
