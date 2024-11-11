import { useEffect, useState } from 'react';
import { loadUnits, removeUnit } from '../utils';
import { Unit } from '../types';
import { UnitList } from '../components';

function UnitsContainer() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    loadUnits(setUnits, setError, setIsLoading);
  }, []);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value.toLowerCase());
  }

  const handleDeleteUnit = async (unitId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this unit?');
    if (!isConfirmed) {
      return;
    }
    try {
      await removeUnit(unitId); // Llama al backend para eliminar la unidad
      updateList(unitId); // Actualiza la lista local después de la eliminación
    } catch (err) {
      setError('Error deleting unit: ' + (err as Error).message);
    }
  };

  const updateList = (unitId: number) => {
    // Filtra la unidad eliminada del estado 'units'
    setUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== unitId));
  };

  const removeAndUpdateUnits = async (unitId: number) => {
    handleDeleteUnit(unitId);
    updateList(unitId);
  }

  const filteredUnits = units.filter((unit) =>
    unit.title.toLowerCase().includes(searchTerm)
  );

  return (
    <UnitList
      units={filteredUnits}
      isLoading={isLoading}
      error={error}
      handleSearch={handleSearch}
      searchTerm={searchTerm}
      onDeleteUnit={removeAndUpdateUnits} 
    />
  );
}

export default UnitsContainer;

