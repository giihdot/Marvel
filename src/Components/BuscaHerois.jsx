export default function BuscaHeroi({ setBusca }) {
  return (
    <input
      type="text"
      placeholder="Buscar herói (ex: Spi)"
      onChange={(e) => setBusca(e.target.value)}
      style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
/>
);
}