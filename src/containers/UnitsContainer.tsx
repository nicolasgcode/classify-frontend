import { useEffect, useState } from 'react';
import { loadUnits, removeUnit } from '../utils';
import { Unit } from '../types';
import { UnitList } from '../components';
import { AddUnitContainer } from '../containers';
import { useCourseStore } from '../store';

export function UnitsContainer() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const courseId = useCourseStore((state) => state.courseId);

  useEffect(() => {
    if (courseId !== null) {
      loadUnits(courseId, setUnits, setError, setIsLoading);
    }
  }, [courseId]);

  const handleEdit = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleCancelEdit = () => {
    if (selectedUnit !== null) {
      setSelectedUnit(null);
    }
  };

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(event.target.value.toLowerCase());
  }

  const handleDeleteUnit = async (unitId: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this unit?'
    );
    if (!isConfirmed) {
      return;
    }
    try {
      await removeUnit(unitId);
      updateList(unitId);
    } catch (err) {
      setError('Error deleting unit: ' + (err as Error).message);
    }
  };

  const updateList = (unitId: number) => {
    setUnits((prevUnits) => prevUnits.filter((unit) => unit.id !== unitId));
  };

  const filteredUnits = units.filter((unit) =>
    unit.title.toLowerCase().includes(searchTerm)
  );

  console.log(selectedUnit);

  return (
    <div>
      {selectedUnit ? (
        <AddUnitContainer
          unit={selectedUnit}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <UnitList
          units={filteredUnits}
          isLoading={isLoading}
          error={error}
          onEdit={handleEdit}
          handleSearch={handleSearch}
          searchTerm={searchTerm}
          onDelete={handleDeleteUnit}
        />
      )}
    </div>
  );
}
