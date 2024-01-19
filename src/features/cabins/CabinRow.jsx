import styled from 'styled-components';
import { HiSquare2Stack } from 'react-icons/hi2';
import { HiPencil } from 'react-icons/hi2';
import { HiTrash } from 'react-icons/hi2';

import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';

import { useDeleteCabin } from './useDeleteCabins';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfrimDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';

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
    <Table.Row>
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
        <Modal>
          <Modal.Open opens='edit'>
            <button>
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name='edit'>
            <CreateCabinForm editCabin={cabin} />
          </Modal.Window>

          <Modal.Open opens='delete'>
            <button>
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfrimDelete
              resourceName='cabins'
              disabled={isLoading}
              onConfirm={() => mutate(cabinId)}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
