import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Nível 1', Empresas: 10 },
  { name: 'Nível 2', Empresas: 20 },
  { name: 'Nível 3', Empresas: 15 },
  { name: 'Nível 4', Empresas: 30 },
  { name: 'Nível 5', Empresas: 25 },
];

export default function ReportChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Empresas" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
