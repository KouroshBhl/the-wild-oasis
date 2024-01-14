import styled from 'styled-components';
import { HiSquare2Stack } from 'react-icons/hi2';
import { HiPencil } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi2';

import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';

import { useDeleteCabin } from './useDeleteCabins';
import { useCreateCabin } from './useCreateCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [editing, setEditing] = useState(false);
  const { isLoading, mutate } = useDeleteCabin();
  const { isCreating, mutateCreateCabin } = useCreateCabin();

  const {
    id: cabinId,
    image,
    name,
    maxCapacity,
    discount,
    regularPrice,
    description,
  } = cabin;

  function handleDuplicate() {
    mutateCreateCabin({
      image,
      name: `duplicate of ${name}`,
      maxCapacity,
      discount,
      regularPrice,
      description,
    });
  }

  return (
    <>
      <TableRow role='row'>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setEditing((edit) => !edit)}>
            <HiPencil />
          </button>
          <button onClick={() => mutate(cabinId)} disabled={isLoading}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {editing && <CreateCabinForm editCabin={cabin} />}
    </>
  );
}

export default CabinRow;
