
import React, {useEffect, useState} from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function App(){
  const [metrics, setMetrics] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(()=>{
    fetch('/api/metrics').then(r=>r.json()).then(setMetrics).catch(()=>{});
    fetch('/api/articles?limit=50').then(r=>r.json()).then(d=>setArticles(d.articles||[])).catch(()=>{});
  },[]);

  const sentData = {
    labels: articles.map(a=>a.title?.slice(0,20)),
    datasets: [{ label: 'Sentimiento', data: articles.map(a=>a.sentiment || 0) }]
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl mb-4">ProyectoTrust — React Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <h3>Total artículos</h3>
          <div className="text-2xl">{metrics?.total_articles ?? '—'}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3>Sentimiento promedio</h3>
          <div className="text-2xl">{(metrics?.average_sentiment ?? 0).toFixed(2)}</div>
        </div>
      </div>
      <div className="p-4 bg-white rounded shadow">
        <Bar data={sentData} />
      </div>
    </div>
  );
}
