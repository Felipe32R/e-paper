"use client";

import React, { useState } from "react";
import { FileCheck, FileUp, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type FileInputProps = {
  onFileChange: (file: File | null) => void;
};

const MAX_FILE_SIZE_MB = 10;

const FileInput: React.FC<FileInputProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`O arquivo excede o tamanho máximo de ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const droppedFile = event.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        simulateUpload(droppedFile);
        onFileChange(droppedFile);
      }
    }
  };

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        simulateUpload(selectedFile);
        onFileChange(selectedFile);
        return;
      }
      onFileChange(null);
      return setFile(null);
    }
  };

  const simulateUpload = (file: File) => {
    const fileSizeMB = file.size / (1024 * 1024); // Converte para MB
    let uploadedMB = 0;
    const uploadSpeedMBps = 1; // Simulação de upload de 1MB/s

    const interval = setInterval(() => {
      uploadedMB += uploadSpeedMBps;
      const percentage = Math.min((uploadedMB / fileSizeMB) * 100, 100);
      setProgress(percentage);

      if (uploadedMB >= fileSizeMB) {
        clearInterval(interval);
        setProgress(100); // Garante que o progresso finalize corretamente
      }
    }, 80);
  };

  const formatMB = (value: number) => {
    return value > 1 ? Math.round(value) : value.toFixed(3);
  };

  function resetProgress() {
    setFile(null);
    onFileChange(null);
    setProgress(0);
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      {!file && (
        <div
          className={`w-full h-full rounded-lg border-2 border-dashed border-green-primary-main ${
            isDragging ? "bg-green-100" : "bg-gray-50"
          } flex flex-col justify-center items-center p-4 space-y-4`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <FileUp size={35} className="text-green-500" />
          <p className="text-center text-lg font-medium text-gray-800">
            Arraste e solte aqui ou selecione o arquivo para upload
          </p>
          <label className="bg-white border border-gray-300 rounded-md py-2 px-4 font-semibold cursor-pointer">
            <input
              type="file"
              onChange={handleFileInputChange}
              className="hidden"
            />
            Procurar e selecionar arquivo
          </label>
          <p className="text-sm text-gray-600">Tamanho max.: 10MB</p>
          {error && (
            <p className="text-sm text-red-500 font-medium mt-2">{error}</p>
          )}
        </div>
      )}
      {file && (
        <div className="w-full mt-4 p-4 border border-gray-300 rounded-md">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex items-center justify-center rounded-full h-16 w-16 bg-gray-100",
                progress === 100 && "bg-green-primary-lighter"
              )}
            >
              {progress === 100 ? (
                <FileCheck size={24} className="text-green-500" />
              ) : (
                <FileUp size={24} className="text-gray-500" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium w-full flex items-center justify-between">
                {file.name}{" "}
                <X
                  size={20}
                  className="cursor-pointer text-text-secondary"
                  onClick={resetProgress}
                />
              </p>
              <p className="text-sm text-gray-600">
                {formatMB((progress / 100) * (file.size / (1024 * 1024)))} MB de{" "}
                {formatMB(file.size / (1024 * 1024))} MB
              </p>
              <Progress
                value={progress}
                className="w-full mt-1"
                indicatorColor="bg-green-primary-main"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
