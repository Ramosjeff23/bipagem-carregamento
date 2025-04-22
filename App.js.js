import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { motion } from "framer-motion";

export default function App() {
  const [step, setStep] = useState(1);
  const [motorista, setMotorista] = useState("");
  const [placa, setPlaca] = useState("");
  const [codigos, setCodigos] = useState([]);
  const [codigoAtual, setCodigoAtual] = useState("");

  const handleScan = () => {
    if (codigoAtual.trim()) {
      setCodigos([...codigos, { codigo: codigoAtual, hora: new Date().toLocaleTimeString() }]);
      setCodigoAtual("");
    }
  };

  const dataAtual = new Date().toLocaleString();

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="max-w-md mx-auto space-y-4">
        {step === 1 && (
          <Card className="p-4">
            <h1 className="text-xl font-bold mb-4">Início do Carregamento</h1>
            <Input
              placeholder="Nome do Motorista"
              value={motorista}
              onChange={(e) => setMotorista(e.target.value)}
              className="mb-2"
            />
            <Input
              placeholder="Placa do Veículo"
              value={placa}
              onChange={(e) => setPlaca(e.target.value)}
              className="mb-4"
            />
            <Button onClick={() => setStep(2)} disabled={!motorista || !placa}>
              Iniciar Carregamento
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-4">
            <h1 className="text-xl font-bold mb-4">Bipagem de Pacotes</h1>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Escaneie ou digite o código"
                value={codigoAtual}
                onChange={(e) => setCodigoAtual(e.target.value)}
              />
              <Button onClick={handleScan}>
                <QrCode className="w-5 h-5 mr-2" /> Bipar
              </Button>
            </div>
            <ul className="bg-white rounded p-2 h-40 overflow-auto text-sm mb-4">
              {codigos.map((item, idx) => (
                <li key={idx}>{item.codigo} - {item.hora}</li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <span>Total: {codigos.length} pacotes</span>
              <Button onClick={() => setStep(3)} variant="outline">
                Finalizar
              </Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-4">
            <h1 className="text-xl font-bold mb-4">Relatório de Carregamento</h1>
            <p><strong>Motorista:</strong> {motorista}</p>
            <p><strong>Placa:</strong> {placa}</p>
            <p><strong>Data:</strong> {dataAtual}</p>
            <p className="mt-4 font-semibold">Pacotes Bipados ({codigos.length}):</p>
            <ul className="bg-white rounded p-2 h-40 overflow-auto text-sm">
              {codigos.map((item, idx) => (
                <li key={idx}>{item.codigo} - {item.hora}</li>
              ))}
            </ul>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Novo Carregamento
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
